// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.19;

// ====================================================================
// |     ______                   _______                             |
// |    / _____________ __  __   / ____(_____  ____ _____  ________   |
// |   / /_  / ___/ __ `| |/_/  / /_  / / __ \/ __ `/ __ \/ ___/ _ \  |
// |  / __/ / /  / /_/ _>  <   / __/ / / / / / /_/ / / / / /__/  __/  |
// | /_/   /_/   \__,_/_/|_|  /_/   /_/_/ /_/\__,_/_/ /_/\___/\___/   |
// |                                                                  |
// ====================================================================
// =============================== veFXS ==============================
// ====================================================================
// Frax Finance: https://github.com/FraxFinance

// Original idea and credit:
// Curve Finance's veCRV
// https://resources.curve.fi/faq/vote-locking-boost
// https://github.com/curvefi/curve-dao-contracts/blob/master/contracts/VotingEscrow.vy
// This is a Solidity version converted from Vyper by the Frax team
// Almost all of the logic / algorithms are the Curve team's

// Primary Author(s)
// Travis Moore: https://github.com/FortisFortuna

// Reviewer(s) / Contributor(s)
// Jason Huan: https://github.com/jasonhuan
// Sam Kazemian: https://github.com/samkazemian

//@notice Votes have a weight depending on time, so that users are
//        committed to the future of (whatever they are voting for)
//@dev Vote weight decays linearly over time. Lock time cannot be
//     more than `MAXTIME` (3 years).

// Voting escrow to have time-weighted votes
// Votes have a weight depending on time, so that users are committed
// to the future of (whatever they are voting for).
// The weight in this implementation is linear, and lock cannot be more than maxtime:
// w ^
// 1 +        /
//   |      /
//   |    /
//   |  /
//   |/
// 0 +--------+------> time
//       maxtime (4 years?)

import '@openzeppelin/contracts/utils/math/Math.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import './TransferHelper.sol';

// Inheritance
import '@openzeppelin/contracts/access/Ownable2Step.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

// # Interface for checking whether address belongs to a whitelisted
// # type of a smart wallet.
// # When new types are added - the whole contract is changed
// # The check() method is modifying to be able to use caching
// # for individual wallet addresses
interface SmartWalletChecker {
  function check(address addr) external returns (bool);
}

// We cannot really do block numbers per se b/c slope is per time, not per block
// and per block could be fairly bad b/c Ethereum changes blocktimes.
// What we can do is to extrapolate ***At functions
struct Point {
  int128 bias; // principal Sumer amount locked
  int128 slope; // dweight / dt
  uint256 ts;
  uint256 blk; // block
  uint256 sumer_amt;
}
// We cannot really do block numbers per se b/c slope is per time, not per block
// and per block could be fairly bad b/c Ethereum changes blocktimes.
// What we can do is to extrapolate ***At functions

struct LockedBalance {
  int128 amount;
  uint256 end;
}

contract VeSumer is ReentrancyGuard, Ownable2Step {
  using SafeMath for uint256;
  using SafeERC20 for ERC20;

  /* ========== STATE VARIABLES ========== */
  // Flags
  int128 public constant DEPOSIT_FOR_TYPE = 0;
  int128 public constant CREATE_LOCK_TYPE = 1;
  int128 public constant INCREASE_LOCK_AMOUNT = 2;
  int128 public constant INCREASE_UNLOCK_TIME = 3;
  int128 public constant USER_WITHDRAW = 4;
  int128 public constant TRANSFER_FROM_APP = 5;
  int128 public constant PROXY_ADD = 7;
  int128 public constant PROXY_SLASH = 8;
  int128 public constant CHECKPOINT_ONLY = 9;
  address public constant ZERO_ADDRESS = address(0);

  /* ========== EVENTS ========== */
  event NominateOwnership(address admin);
  event AcceptOwnership(address admin);
  event Deposit(
    address indexed provider,
    address indexed payer_addr,
    uint256 value,
    uint256 indexed locktime,
    int128 _type,
    uint256 ts
  );
  event Withdraw(address indexed provider, address indexed to_addr, uint256 value, uint256 ts);
  event Supply(uint256 prevSupply, uint256 supply);
  event TransferFromApp(address indexed app_addr, address indexed staker_addr, uint256 transfer_amt);
  event ProxyAdd(address indexed staker_addr, address indexed proxy_addr, uint256 add_amt);
  event SmartWalletCheckerComitted(address future_smart_wallet_checker);
  event SmartWalletCheckerApplied(address smart_wallet_checker);
  event AppIncreaseAmountForsToggled(bool appIncreaseAmountForsEnabled);
  event ProxyTransferFromsToggled(bool appTransferFromsEnabled);
  event ProxyTransferTosToggled(bool appTransferTosEnabled);
  event ProxyAddsToggled(bool proxyAddsEnabled);
  event ProxySlashesToggled(bool proxySlashesEnabled);
  event LendingProxySet(address proxy_address);
  event HistoricalProxyToggled(address proxy_address, bool enabled);
  event StakerProxySet(address proxy_address);

  uint256 public constant WEEK = 7 * 86400; // all future times are rounded by week
  uint256 public constant MAXTIME = 4 * 365 * 86400; // 4 years
  int128 public constant MAXTIME_I128 = 4 * 365 * 86400; // 4 years
  uint256 public constant MULTIPLIER = 10 ** 18;
  int128 public constant VOTE_WEIGHT_MULTIPLIER_I128 = 4 - 1; // 4x gives 300% boost at 4 years

  address public token; // Sumer
  uint256 public supply; // Tracked Sumer in the contract

  mapping(address => LockedBalance) public locked; // user -> locked balance position info

  uint256 public epoch;
  Point[100000000000000000] public point_history; // epoch -> unsigned point
  // mapping(uint256 => Point) public point_history; // epoch -> unsigned point
  mapping(address => Point[1000000000]) public user_point_history; // user -> Point[user_epoch]
  // mapping(address => mapping(uint256 => Point)) public user_point_history; // user -> Point[user_epoch]
  mapping(address => uint256) public user_point_epoch; // user -> last week epoch their slope and bias were checkpointed

  // time -> signed slope change. Stored ahead of time so we can keep track of expiring users.
  // Time will always be a multiple of 1 week
  mapping(uint256 => int128) public slope_changes; // time -> signed slope change

  // Misc
  bool public appIncreaseAmountForsEnabled; // Whether the proxy can directly deposit FPIS and increase a particular user's stake
  bool public appTransferFromsEnabled; // Whether Sumer can be received from apps or not
  bool public appTransferTosEnabled; // Whether Sumer can be sent to apps or not
  bool public proxyAddsEnabled; // Whether the proxy can add to the user's position
  bool public proxySlashesEnabled; // Whether the proxy can slash the user's position

  // Emergency Unlock
  bool public emergencyUnlockActive;

  // Proxies (allow withdrawal / deposits for lending protocols, etc.)
  address public current_proxy; // Set by admin. Can only be one at any given time
  mapping(address => bool) public historical_proxies; // Set by admin. Used for paying back / liquidating after the main current_proxy changes
  mapping(address => address) public staker_whitelisted_proxy; // user -> proxy. Set by user
  mapping(address => uint256) public user_proxy_balance; // user -> amount held in proxy

  // veSumer token related
  string public name;
  string public symbol;
  string public version;
  uint256 public decimals;
  // Checker for whitelisted (smart contract) wallets which are allowed to deposit
  // The goal is to prevent tokenizing the escrow
  address public future_smart_wallet_checker;
  address public smart_wallet_checker;

  address public admin; // Can and will be a smart contract
  address public future_admin;

  /* ========== MODIFIERS ========== */


  /* ========== CONSTRUCTOR ========== */
  // token_addr: address, _name: String[64], _symbol: String[32], _version: String[32]
  /**
   * @notice Contract constructor
   * @param sumer `ERC20CRV` token address
   */
  constructor(address sumer) {
    admin = msg.sender;
    token = sumer;
    point_history[0].blk = block.number;
    point_history[0].ts = block.timestamp;
    point_history[0].sumer_amt = 0;
    appTransferFromsEnabled = false;
    appTransferTosEnabled = false;
    proxyAddsEnabled = false;
    proxySlashesEnabled = false;

    uint256 _decimals = ERC20(sumer).decimals();
    assert(_decimals <= 255);
    decimals = _decimals;

    name = 'veSumer';
    symbol = 'veSumer';
    version = 'veSumer0.1';
  }

  /**
   * @notice Set an external contract to check for approved smart contract wallets
   * @param addr Address of Smart contract checker
   */
  function commit_smart_wallet_checker(address addr) external onlyOwner {
    future_smart_wallet_checker = addr;
    emit SmartWalletCheckerComitted(future_smart_wallet_checker);
  }

  /**
   * @notice Apply setting external contract to check approved smart contract wallets
   */
  function apply_smart_wallet_checker() external onlyOwner {
    smart_wallet_checker = future_smart_wallet_checker;
    emit SmartWalletCheckerApplied(smart_wallet_checker);
  }

  function recoverERC20(address token_addr, uint256 amount) external onlyOwner {
    require(token_addr != token, '!token_addr');
    ERC20(token_addr).transfer(admin, amount);
  }

  /**
   * @notice Check if the call is from a whitelisted smart contract, revert if not
   * @param addr Address to be checked
   */
  function assert_not_contract(address addr) internal {
    if (addr != tx.origin) {
      address checker = smart_wallet_checker;
      if (checker != ZERO_ADDRESS) {
        if (SmartWalletChecker(checker).check(addr)) {
          return;
        }
      }
      revert('depositors');
    }
  }

  /* ========== VIEWS ========== */
  /**
   * @notice Get the most recently recorded rate of voting power decrease for `addr`
   * @param addr Address of the user wallet
   * @return Value of the slope
   */
  function get_last_user_slope(address addr) external view returns (int128) {
    uint256 uepoch = user_point_epoch[addr];
    return user_point_history[addr][uepoch].slope;
  }

  function get_last_user_bias(address addr) external view returns (int128) {
    uint256 uepoch = user_point_epoch[addr];
    return user_point_history[addr][uepoch].bias;
  }

  function get_last_user_point(address addr) external view returns (Point memory) {
    uint256 uepoch = user_point_epoch[addr];
    return user_point_history[addr][uepoch];
  }

  /**
   * @notice Get the timestamp for checkpoint `_idx` for `_addr`
   * @param _addr User wallet address
   * @param _idx User epoch number
   * @return Epoch time of the checkpoint
   */
  function user_point_history__ts(address _addr, uint256 _idx) external view returns (uint256) {
    return user_point_history[_addr][_idx].ts;
  }

  function get_last_point() external view returns (Point memory) {
    return point_history[epoch];
  }

  /**
   * @notice Get timestamp when `_addr`'s lock finishes
   * @param _addr User wallet
   * @return Epoch time of the lock end
   */
  function locked__end(address _addr) external view returns (uint256) {
    return locked[_addr].end;
  }

  function locked__amount(address _addr) external view returns (int128) {
    return locked[_addr].amount;
  }

  function curr_period_start() external view returns (uint256) {
    return (block.timestamp / WEEK) * WEEK;
  }

  function next_period_start() external view returns (uint256) {
    return WEEK + (block.timestamp / WEEK) * WEEK;
  }

  // Constant structs not allowed yet, so this will have to do
  function EMPTY_POINT_FACTORY() internal pure returns (Point memory) {
    return Point({bias: 0, slope: 0, ts: 0, blk: 0, sumer_amt: 0});
  }

  /* ========== INTERNAL FUNCTIONS ========== */
  /**
   * @notice Record global and per-user data to checkpoint
   * @param addr User's wallet address. No user checkpoint if 0x0
   * @param old_locked Previous locked amount / end lock time for the user
   * @param new_locked New locked amount / end lock time for the user
   */
  function _checkpoint(
    address addr,
    LockedBalance memory old_locked,
    LockedBalance memory new_locked,
    int128 flag
  ) internal {
    Point memory usr_old_pt = EMPTY_POINT_FACTORY();
    Point memory usr_new_pt = EMPTY_POINT_FACTORY();
    int128 old_gbl_dslope = 0;
    int128 new_gbl_dslope = 0;
    uint256 _epoch = epoch;

    if (addr != ZERO_ADDRESS) {
      // Calculate slopes and biases
      // Kept at zero when they have to
      if ((old_locked.end > block.timestamp) && (old_locked.amount > 0)) {
        usr_old_pt.slope = (old_locked.amount * VOTE_WEIGHT_MULTIPLIER_I128) / MAXTIME_I128;
        usr_old_pt.bias = old_locked.amount + (usr_old_pt.slope * int128(uint128(old_locked.end - block.timestamp)));
      }
      if ((new_locked.end > block.timestamp) && (new_locked.amount > 0)) {
        usr_new_pt.slope = (new_locked.amount * VOTE_WEIGHT_MULTIPLIER_I128) / MAXTIME_I128;
        usr_new_pt.bias = new_locked.amount + (usr_new_pt.slope * int128(uint128(new_locked.end - block.timestamp)));
      }

      // Read values of scheduled changes in the slope
      // old_locked.end can be in the past and in the future
      // new_locked.end can ONLY by in the FUTURE unless everything expired: than zeros
      old_gbl_dslope = slope_changes[old_locked.end];
      if (new_locked.end != 0) {
        if (new_locked.end == old_locked.end) {
          new_gbl_dslope = old_gbl_dslope;
        } else {
          new_gbl_dslope = slope_changes[new_locked.end];
        }
      }
    }

    Point memory last_point = Point({bias: 0, slope: 0, ts: block.timestamp, blk: block.number, sumer_amt: 0});
    if (_epoch > 0) {
      last_point = point_history[_epoch];
    }
    uint256 last_checkpoint = last_point.ts;

    // initial_last_point is used for extrapolation to calculate block number
    // (approximately, for *At methods) and save them
    // as we cannot figure that out exactly from inside the contract
    Point memory initial_last_point = last_point;

    uint256 block_slope = 0; // dblock/dt
    if (block.timestamp > last_point.ts) {
      block_slope = (MULTIPLIER * (block.number - last_point.blk)) / (block.timestamp - last_point.ts);
    }

    // If last point is already recorded in this block, slope=0
    // But that's ok b/c we know the block in such case

    // Go over weeks to fill history and calculate what the current point is
    uint256 latest_checkpoint_ts = (last_checkpoint / WEEK) * WEEK;
    for (uint i = 0; i < 255; i++) {
      // Hopefully it won't happen that this won't get used in 4 years!
      // If it does, users will be able to withdraw but vote weight will be broken
      latest_checkpoint_ts += WEEK;
      int128 d_slope = 0;
      if (latest_checkpoint_ts > block.timestamp) {
        latest_checkpoint_ts = block.timestamp;
      } else {
        d_slope = slope_changes[latest_checkpoint_ts];
      }
      last_point.bias -= last_point.slope * int128(uint128(latest_checkpoint_ts - last_checkpoint));

      last_point.slope += d_slope;

      if (last_point.bias < 0) {
        last_point.bias = 0; // This can happen
      }
      if (last_point.slope < 0) {
        last_point.slope = 0; // This cannot happen - just in case
      }
      last_checkpoint = latest_checkpoint_ts;
      last_point.ts = latest_checkpoint_ts;

      last_point.blk =
        initial_last_point.blk +
        (block_slope * (latest_checkpoint_ts - initial_last_point.ts)) /
        MULTIPLIER;
      _epoch += 1;

      if (latest_checkpoint_ts == block.timestamp) {
        last_point.blk = block.number;
        break;
      } else {
        point_history[_epoch] = last_point;
      }
    }

    epoch = _epoch;
    // Now point_history is filled until t=now

    if (addr != ZERO_ADDRESS) {
      // If last point was in this block, the slope change has been applied already
      // But in such case we have 0 slope(s)
      last_point.slope += (usr_new_pt.slope - usr_old_pt.slope);
      last_point.bias += (usr_new_pt.bias - usr_old_pt.bias);

      if (new_locked.amount > old_locked.amount) {
        last_point.sumer_amt += uint256(uint128(new_locked.amount - old_locked.amount));
        if (new_locked.amount < old_locked.amount) {
          last_point.sumer_amt -= uint256(uint128(old_locked.amount - new_locked.amount));
          // Subtract the bias if you are slashing after expiry
          if (flag == PROXY_SLASH && new_locked.end < block.timestamp) {
            // Net change is the delta
            last_point.bias += new_locked.amount;
            last_point.bias -= old_locked.amount;
          }
          // Remove the offset
          // Corner case to fix issue because emergency unlock allows withdrawal before expiry and disrupts the math
          if (new_locked.amount == 0) {
            if (!emergencyUnlockActive) {
              // Net change is the delta
              // last_point.bias += new_locked.amount WILL BE ZERO
              last_point.bias -= old_locked.amount;
            }
          }
        }
      }
      if (last_point.slope < 0) {
        last_point.slope = 0;
      }
      if (last_point.bias < 0) {
        last_point.bias = 0;
      }
    }

    // Record the changed point into history
    point_history[_epoch] = last_point;

    if (addr != ZERO_ADDRESS) {
      // Schedule the slope changes (slope is going down)
      // We subtract new_user_slope from [new_locked.end]
      // and add old_user_slope to [old_locked.end]
      if (old_locked.end > block.timestamp) {
        // old_gbl_dslope was <something> - usr_old_pt.slope, so we cancel that
        old_gbl_dslope += usr_old_pt.slope;
        if (new_locked.end == old_locked.end) {
          old_gbl_dslope -= usr_new_pt.slope; // It was a new deposit, not extension
        }
        slope_changes[old_locked.end] = old_gbl_dslope;
      }

      if (new_locked.end > block.timestamp) {
        if (new_locked.end > old_locked.end) {
          new_gbl_dslope -= usr_new_pt.slope; // old slope disappeared at this point
          slope_changes[new_locked.end] = new_gbl_dslope;
        }
        // else: we recorded it already in old_gbl_dslope
      }

      uint256 user_epoch = user_point_epoch[addr] + 1;
      user_point_epoch[addr] = user_epoch;
      usr_new_pt.ts = block.timestamp;
      usr_new_pt.blk = block.number;
      usr_new_pt.sumer_amt = uint128(locked[addr].amount);

      if (new_locked.end < block.timestamp) {
        usr_new_pt.bias = locked[addr].amount;
        usr_new_pt.slope = 0;
      }
      user_point_history[addr][user_epoch] = usr_new_pt;
    }
  }

  /**
   * @notice Deposit and lock tokens for a user
   * @param _staker_addr User's wallet address
   * @param _payer_addr Payer's wallet address
   * @param _value Amount to deposit
   * @param unlock_time New time when to unlock the tokens, or 0 if unchanged
   * @param locked_balance Previous locked amount / timestamp
   */
  function _deposit_for(
    address _staker_addr,
    address _payer_addr,
    uint256 _value,
    uint256 unlock_time,
    LockedBalance memory locked_balance,
    int128 flag
  ) internal {
    require(ERC20(token).transferFrom(_payer_addr, address(this), _value), 'transfer failed');

    LockedBalance memory old_locked = locked_balance;
    uint256 supply_before = supply;

    LockedBalance memory new_locked = old_locked;

    supply = supply_before + _value;

    // Adding to existing lock, or if a lock is expired - creating a new one
    new_locked.amount += int128(uint128(_value));
    if (unlock_time != 0) {
      new_locked.end = unlock_time;
    }
    locked[_staker_addr] = new_locked;

    // Possibilities:
    // Both old_locked.end could be current or expired (>/< block.timestamp)
    // value == 0 (extend lock) or value > 0 (add to lock or extend lock)
    // _locked.end > block.timestamp (always)
    _checkpoint(_staker_addr, old_locked, new_locked, flag);

    emit Deposit(_staker_addr, _payer_addr, _value, new_locked.end, flag, block.timestamp);
    emit Supply(supply_before, supply_before + _value);
  }

  /* ========== MUTATIVE FUNCTIONS ========== */

  /**
   * @notice Record global data to checkpoint
   */
  function checkpoint() external {
    _checkpoint(ZERO_ADDRESS, EMPTY_LOCKED_BALANCE_FACTORY(), EMPTY_LOCKED_BALANCE_FACTORY(), 0);
  }

  /**
   * @notice Deposit `_value` tokens for `msg.sender` and lock until `_unlock_time`
   * @param _value Amount to deposit
   * @param _unlock_time Epoch time when tokens unlock, rounded down to whole weeks
   */
  function create_lock(uint256 _value, uint256 _unlock_time) external nonReentrant {
    assert_not_contract(msg.sender);
    uint256 unlock_time = (_unlock_time / WEEK) * WEEK; // Locktime is rounded down to weeks
    LockedBalance memory _locked = locked[msg.sender];

    require(_value > 0, '<=0');
    require(_locked.amount == 0, 'amount=0');
    require(unlock_time > block.timestamp, 'unlock_time');
    require(unlock_time <= block.timestamp + MAXTIME, 'MAXTIME');
    _deposit_for(msg.sender, msg.sender, _value, unlock_time, _locked, CREATE_LOCK_TYPE);
  }

  function _increase_amount(address _staker_addr, address _payer_addr, uint256 _value) internal {
    if (_payer_addr != current_proxy && !historical_proxies[_payer_addr]) {
      assert_not_contract(_payer_addr);
    }
    assert_not_contract(_staker_addr);

    LockedBalance memory _locked = locked[_staker_addr];

    require(_value > 0, '<=0');
    require(_locked.amount == 0, 'amount=0');
    require(_locked.end > block.timestamp, 'locked.end');
    _deposit_for(_staker_addr, _payer_addr, _value, 0, _locked, INCREASE_LOCK_AMOUNT);
  }

  /**
   * @notice Deposit `_value` additional tokens for `msg.sender` without modifying the unlock time
   * @param _value Amount of tokens to deposit and add to the lock
   */
  function increase_amount(uint256 _value) external nonReentrant {
    _increase_amount(msg.sender, msg.sender, _value);
  }

  function increase_amount_for(address _staker_addr, uint256 _value) external nonReentrant {
    require(appIncreaseAmountForsEnabled, 'Currently disabled');
    _increase_amount(_staker_addr, msg.sender, _value);
  }

  function checkpoint_user(address _staker_addr) external nonReentrant {
    LockedBalance memory _locked = locked[_staker_addr];
    require(_locked.amount > 0, '<=0');
    _deposit_for(_staker_addr, _staker_addr, 0, 0, _locked, CHECKPOINT_ONLY);
  }

  /**
   * @notice Extend the unlock time for `msg.sender` to `_unlock_time`
   * @param _unlock_time New epoch time for unlocking
   */
  function increase_unlock_time(uint256 _unlock_time) external nonReentrant {
    assert_not_contract(msg.sender);
    LockedBalance memory _locked = locked[msg.sender];
    uint256 unlock_time = (_unlock_time / WEEK) * WEEK; // Locktime is rounded down to weeks

    require(_locked.end > block.timestamp, 'locked.end');
    require(_locked.amount > 0, '=0');
    require(unlock_time > _locked.end, 'unlock_time');
    require(unlock_time <= block.timestamp + MAXTIME, 'MAXTIME');

    _deposit_for(msg.sender, msg.sender, 0, unlock_time, _locked, INCREASE_UNLOCK_TIME);
  }

  /**
   * @notice Withdraw all tokens for `msg.sender`ime`
   * @dev Only possible if the lock has expired
   */
  function _withdraw(
    address staker_addr,
    address addr_out,
    LockedBalance memory locked_in,
    int128 amount_in,
    int128 flag
  ) internal {
    require(amount_in >= 0 && amount_in <= locked_in.amount, 'amount');

    LockedBalance memory _locked = locked_in;
    // require(block.timestamp >= _locked.end, "The lock didn't expire");
    uint256 value = uint128(_locked.amount);

    LockedBalance memory old_locked = _locked;
    if (amount_in == _locked.amount) {
      _locked.end = 0;
    }
    _locked.amount -= amount_in;

    locked[staker_addr] = _locked;
    uint256 supply_before = supply;
    supply = supply_before - value;

    // old_locked can have either expired <= timestamp or zero end
    // _locked has only 0 end
    // Both can have >= 0 amount
    _checkpoint(staker_addr, old_locked, _locked, flag);

    require(ERC20(token).transfer(msg.sender, value), 'transfer failed');

    emit Withdraw(staker_addr, addr_out, value, block.timestamp);
    emit Supply(supply_before, supply_before - value);
  }

  function proxy_add(address _staker_addr, uint256 _add_amt) external nonReentrant {
    require(proxyAddsEnabled, 'Currently disabled');
    require(msg.sender == current_proxy || historical_proxies[msg.sender], 'Whitelisted[admin level]');
    require(msg.sender == staker_whitelisted_proxy[_staker_addr], 'Whitelisted[staker level]');

    LockedBalance memory old_locked = locked[_staker_addr];
    // uint256 _proxy_balance = user_proxy_balance[_staker_addr];

    require(old_locked.amount > 0, 'No existing lock found');
    require(_add_amt > 0, 'Amount must be non-zero');

    user_proxy_balance[_staker_addr] += _add_amt;
    uint256 supply_before = supply;

    LockedBalance memory new_locked = old_locked;

    supply += _add_amt;

    new_locked.amount += int128(uint128(_add_amt));
    locked[_staker_addr] = new_locked;

    _checkpoint(_staker_addr, old_locked, new_locked, PROXY_ADD);

    emit ProxyAdd(_staker_addr, msg.sender, _add_amt);
    emit Supply(supply_before, supply_before + _add_amt);
  }

  function proxy_slash(address _staker_addr, uint256 _slash_amt) external nonReentrant {
    require(proxyAddsEnabled, 'Currently disabled');
    require(msg.sender == current_proxy || historical_proxies[msg.sender], 'Whitelisted[admin level]');
    require(msg.sender == staker_whitelisted_proxy[_staker_addr], 'whitelisted[staker level]');

    LockedBalance memory old_locked = locked[_staker_addr];
    // uint256 _proxy_balance = user_proxy_balance[_staker_addr];

    require(old_locked.amount > 0, 'No existing lock found');
    require(_slash_amt > 0, 'Amount must be non-zero');

    require(user_proxy_balance[_staker_addr] >= _slash_amt, 'user_proxy_balance');
    user_proxy_balance[_staker_addr] -= _slash_amt;

    uint256 supply_before = supply;

    LockedBalance memory new_locked = old_locked;
    supply -= _slash_amt;

    new_locked.amount -= int128(uint128(_slash_amt));
    locked[_staker_addr] = new_locked;

    _checkpoint(_staker_addr, old_locked, new_locked, PROXY_SLASH);
    emit ProxyAdd(_staker_addr, msg.sender, _slash_amt);
    emit Supply(supply_before, supply_before + _slash_amt);
  }

  function withdraw() external nonReentrant {
    LockedBalance memory _locked = locked[msg.sender];

    require(block.timestamp >= _locked.end || emergencyUnlockActive, 'locked.end');
    require(user_proxy_balance[msg.sender] == 0, 'user_proxy_balance');

    _withdraw(msg.sender, msg.sender, _locked, _locked.amount, USER_WITHDRAW);
  }

  function transfer_from_app(address _staker_addr, address _app_addr, int128 _transfer_amt) external nonReentrant {
    require(appTransferFromsEnabled, 'Currently disabled');
    require(msg.sender == current_proxy || historical_proxies[msg.sender], 'whitelisted[admin level]');
    require(msg.sender == staker_whitelisted_proxy[_staker_addr], 'whitelisted[staker level]');

    LockedBalance memory _locked = locked[_staker_addr];
    require(_locked.amount > 0, '_locked.amount');

    uint256 _value = uint128(_transfer_amt);
    require(user_proxy_balance[_staker_addr] >= _value, 'user_proxy_balance');
    user_proxy_balance[_staker_addr] -= _value;

    require(ERC20(token).transferFrom(_app_addr, address(this), _value), 'transfer failed');
    _checkpoint(_staker_addr, _locked, _locked, TRANSFER_FROM_APP);
    emit TransferFromApp(_app_addr, _staker_addr, _value);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Constant structs not allowed yet, so this will have to do
  function EMPTY_LOCKED_BALANCE_FACTORY() internal pure returns (LockedBalance memory) {
    return LockedBalance({amount: 0, end: 0});
  }

  /**
   * @notice Get the current voting power for `msg.sender` at the specified timestamp
   * @dev Adheres to the ERC20 `balanceOf` interface for Aragon compatibility
   * @param addr User wallet address
   * @param _t Epoch time to return voting power at
   * @return User voting power
   */
  function balanceOf(address addr, uint256 _t) public view returns (uint256) {
    uint256 _epoch = user_point_epoch[addr];
    if (_epoch == 0) {
      return 0;
    } else {
      Point memory last_point = user_point_history[addr][_epoch];
      last_point.bias -= last_point.slope * (int128(uint128(_t)) - int128(uint128(last_point.ts)));
      if (last_point.bias < 0) {
        last_point.bias = 0;
      }
      return uint256(int256(last_point.bias));
    }
  }

  /**
   * @notice Get the current voting power for `msg.sender` at the current timestamp
   * @dev Adheres to the ERC20 `balanceOf` interface for Aragon compatibility
   * @param addr User wallet address
   * @return User voting power
   */
  function balanceOf(address addr) public view returns (uint256) {
    return balanceOf(addr, block.timestamp);
  }

  /**
   * @notice Measure voting power of `addr` at block height `_block`
   * @dev Adheres to MiniMe `balanceOfAt` interface: https://github.com/Giveth/minime
   * @param addr User's wallet address
   * @param _block Block to calculate the voting power at
   * @return Voting power
   */
  function balanceOfAt(address addr, uint256 _block) external view returns (uint256) {
    // Copying and pasting totalSupply code because Vyper cannot pass by
    // reference yet
    require(_block <= block.number);

    // Binary search
    uint256 _min = 0;
    uint256 _max = user_point_epoch[addr];

    // Will be always enough for 128-bit numbers
    for (uint i = 0; i < 128; i++) {
      if (_min >= _max) {
        break;
      }
      uint256 _mid = (_min + _max + 1) / 2;
      if (user_point_history[addr][_mid].blk <= _block) {
        _min = _mid;
      } else {
        _max = _mid - 1;
      }
    }

    Point memory upoint = user_point_history[addr][_min];

    uint256 max_epoch = epoch;
    uint256 _epoch = find_block_epoch(_block, max_epoch);
    Point memory point_0 = point_history[_epoch];
    uint256 d_block = 0;
    uint256 d_t = 0;

    if (_epoch < max_epoch) {
      Point memory point_1 = point_history[_epoch + 1];
      d_block = point_1.blk - point_0.blk;
      d_t = point_1.ts - point_0.ts;
    } else {
      d_block = block.number - point_0.blk;
      d_t = block.timestamp - point_0.ts;
    }

    uint256 block_time = point_0.ts;
    if (d_block != 0) {
      block_time += (d_t * (_block - point_0.blk)) / d_block;
    }

    upoint.bias -= upoint.slope * (int128(uint128(block_time)) - int128(uint128(upoint.ts)));
    if (upoint.bias >= 0) {
      return uint256(int256(upoint.bias));
    } else {
      return 0;
    }
  }

  /**
   * @notice Calculate total voting power at the specified timestamp
   * @dev Adheres to the ERC20 `totalSupply` interface for Aragon compatibility
   * @return Total voting power
   */
  function totalSupply(uint256 t) public view returns (uint256) {
    uint256 _epoch = epoch;
    Point memory last_point = point_history[_epoch];
    return supply_at(last_point, t);
  }

  /**
   * @notice Calculate total voting power at the current timestamp
   * @dev Adheres to the ERC20 `totalSupply` interface for Aragon compatibility
   * @return Total voting power
   */
  function totalSupply() public view returns (uint256) {
    return totalSupply(block.timestamp);
  }

  /**
   * @notice Calculate total voting power at some point in the past
   * @param _block Block to calculate the total voting power at
   * @return Total voting power at `_block`
   */
  function totalSupplyAt(uint256 _block) external view returns (uint256) {
    require(_block <= block.number);
    uint256 _epoch = epoch;
    uint256 target_epoch = find_block_epoch(_block, _epoch);

    Point memory point = point_history[target_epoch];
    uint256 dt = 0;

    if (target_epoch < _epoch) {
      Point memory point_next = point_history[target_epoch + 1];
      if (point.blk != point_next.blk) {
        dt = ((_block - point.blk) * (point_next.ts - point.ts)) / (point_next.blk - point.blk);
      }
    } else {
      if (point.blk != block.number) {
        dt = ((_block - point.blk) * (block.timestamp - point.ts)) / (block.number - point.blk);
      }
    }

    // Now dt contains info on how far are we beyond point
    return supply_at(point, point.ts + dt);
  }

  // The following ERC20/minime-compatible methods are not real balanceOf and supply!
  // They measure the weights for the purpose of voting, so they don't represent
  // real coins.
  /**
   * @notice Binary search to estimate timestamp for block number
   * @param _block Block to find
   * @param max_epoch Don't go beyond this epoch
   * @return Approximate timestamp for block
   */
  function find_block_epoch(uint256 _block, uint256 max_epoch) internal view returns (uint256) {
    // Binary search
    uint256 _min = 0;
    uint256 _max = max_epoch;

    // Will be always enough for 128-bit numbers
    for (uint i = 0; i < 128; i++) {
      if (_min >= _max) {
        break;
      }
      uint256 _mid = (_min + _max + 1) / 2;
      if (point_history[_mid].blk <= _block) {
        _min = _mid;
      } else {
        _max = _mid - 1;
      }
    }

    return _min;
  }

  /**
   * @notice Calculate total voting power at some point in the past
   * @param point The point (bias/slope) to start search from
   * @param t Time to calculate the total voting power at
   * @return Total voting power at that time
   */
  function supply_at(Point memory point, uint256 t) internal view returns (uint256) {
    Point memory last_point = point;
    uint256 t_i = (last_point.ts / WEEK) * WEEK;

    for (uint i = 0; i < 255; i++) {
      t_i += WEEK;
      int128 d_slope = 0;
      if (t_i > t) {
        t_i = t;
      } else {
        d_slope = slope_changes[t_i];
      }
      last_point.bias -= last_point.slope * (int128(uint128(t_i)) - int128(uint128(last_point.ts)));
      if (t_i == t) {
        break;
      }
      last_point.slope += d_slope;
      last_point.ts = t_i;
    }

    if (last_point.bias < 0) {
      last_point.bias = 0;
    }
    return uint256(int256(last_point.bias));
  }

  /**
        * @notice Deposit and lock tokens for a user
        * @dev Anyone (even a smart contract) can deposit for someone else, but
        cannot extend their locktime and deposit for a brand new user
        * @param _addr User's wallet address
        * @param _value Amount to add to user's lock
    */
  function deposit_for(address _addr, uint256 _value) external nonReentrant {
    LockedBalance memory _locked = locked[_addr];
    require(_value > 0, '=0');
    require(_locked.amount > 0, 'locked.amount');
    require(_locked.end > block.timestamp, 'locked.end');
    _deposit_for(_addr, msg.sender, _value, 0, locked[_addr], DEPOSIT_FOR_TYPE);
  }

  /* ========== RESTRICTED FUNCTIONS ========== */
}
