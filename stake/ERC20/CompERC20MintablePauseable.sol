// SPDX-License-Identifier: MIT
pragma solidity 0.6.11;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol';
import '@openzeppelin/contracts/drafts/EIP712.sol';
import '@openzeppelin/contracts/cryptography/ECDSA.sol';

contract CompERC20MintablePauseable is ERC20Pausable, ERC20Burnable, EIP712, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
  mapping(address => bool) private blackList;
  // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
  bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
  /// @notice The EIP-712 typehash for the delegation struct used by the contract
  bytes32 public constant DELEGATION_TYPEHASH = keccak256('Delegation(address delegatee,uint256 nonce,uint256 expiry)');
  mapping(address => uint256) public nonces;

  /// @notice A record of each accounts delegate
  mapping(address => address) public delegates;

  /// @notice A checkpoint for marking number of votes from a given block
  struct Checkpoint {
    uint32 fromBlock;
    uint96 votes;
  }

  /// @notice A record of votes checkpoints for each account, by index
  mapping(address => mapping(uint32 => Checkpoint)) public checkpoints;

  /// @notice The number of checkpoints for each account
  mapping(address => uint32) public numCheckpoints;

  /// @notice An event thats emitted when an account changes its delegate
  event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);

  /// @notice An event thats emitted when a delegate account's vote balance changes
  event DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance);

  constructor(
    string memory name,
    string memory symbol,
    address admin
  ) public ERC20(name, symbol) EIP712('PermitToken', '1.0') {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(DEFAULT_ADMIN_ROLE, admin);
    _setupRole(MINTER_ROLE, _msgSender());
    // _mint(owner, initialSupply);
  }

  modifier onlyAdmin() {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), 'forbidden');
    _;
  }

  function addMinter(address account) public onlyAdmin {
    _setupRole(MINTER_ROLE, account);
  }

  function removeMinter(address account) public onlyAdmin {
    revokeRole(MINTER_ROLE, account);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC20, ERC20Pausable) {
    require(!blackList[from], 'forbidden');
    super._beforeTokenTransfer(from, to, amount);
    _moveDelegates(delegates[from], delegates[to], uint96(amount));
  }

  function setBlackList(address account) public onlyAdmin {
    blackList[account] = !blackList[account];
  }

  function getBlackList(address account) public view onlyAdmin returns (bool) {
    return blackList[account];
  }

  function mint(address to, uint256 amount) public virtual {
    require(hasRole(MINTER_ROLE, _msgSender()), 'ERC20PresetMinterPauser: must have minter role to mint');
    _mint(to, amount);
  }

  function pause() public onlyAdmin {
    _pause();
  }

  function unpause() public onlyAdmin {
    _unpause();
  }

  function permit(
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    bytes memory signature
  ) public {
    // hash调用方法和参数
    bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline));
    // 结构化hash
    bytes32 hash = _hashTypedDataV4(structHash);
    // 还原签名人
    address signer = ECDSA.recover(hash, signature);
    require(owner == signer, 'Permit: invalid signature');
    _approve(owner, spender, value);
  }

  /**
   * @notice Delegate votes from `msg.sender` to `delegatee`
   * @param delegatee The address to delegate votes to
   */
  function delegate(address delegatee) public {
    return _delegate(msg.sender, delegatee);
  }

  /**
   * @notice Delegates votes from signatory to `delegatee`
   * @param delegatee The address to delegate votes to
   * @param nonce The contract state required to match the signature
   * @param expiry The time at which to expire the signature
   * @param signature The recovery byte of the signature
   */
  function delegateBySig(
    address delegatee,
    uint256 nonce,
    uint256 expiry,
    bytes memory signature
  ) public {
    bytes32 structHash = keccak256(abi.encode(DELEGATION_TYPEHASH, delegatee, nonce, expiry));
    bytes32 hash = _hashTypedDataV4(structHash);
    address signatory = ECDSA.recover(hash, signature);
    require(signatory != address(0), 'Comp::delegateBySig: invalid signature');
    require(nonce == nonces[signatory]++, 'Comp::delegateBySig: invalid nonce');
    require(now <= expiry, 'Comp::delegateBySig: signature expired');
    return _delegate(signatory, delegatee);
  }

  /**
   * @notice Gets the current votes balance for `account`
   * @param account The address to get votes balance
   * @return The number of current votes for `account`
   */
  function getCurrentVotes(address account) external view returns (uint96) {
    uint32 nCheckpoints = numCheckpoints[account];
    return nCheckpoints > 0 ? checkpoints[account][nCheckpoints - 1].votes : 0;
  }

  /**
   * @notice Determine the prior number of votes for an account as of a block number
   * @dev Block number must be a finalized block or else this function will revert to prevent misinformation.
   * @param account The address of the account to check
   * @param blockNumber The block number to get the vote balance at
   * @return The number of votes the account had as of the given block
   */
  function getPriorVotes(address account, uint256 blockNumber) public view returns (uint96) {
    require(blockNumber < block.number, 'Comp::getPriorVotes: not yet determined');

    uint32 nCheckpoints = numCheckpoints[account];
    if (nCheckpoints == 0) {
      return 0;
    }

    // First check most recent balance
    if (checkpoints[account][nCheckpoints - 1].fromBlock <= blockNumber) {
      return checkpoints[account][nCheckpoints - 1].votes;
    }

    // Next check implicit zero balance
    if (checkpoints[account][0].fromBlock > blockNumber) {
      return 0;
    }

    uint32 lower = 0;
    uint32 upper = nCheckpoints - 1;
    while (upper > lower) {
      uint32 center = upper - (upper - lower) / 2; // ceil, avoiding overflow
      Checkpoint memory cp = checkpoints[account][center];
      if (cp.fromBlock == blockNumber) {
        return cp.votes;
      } else if (cp.fromBlock < blockNumber) {
        lower = center;
      } else {
        upper = center - 1;
      }
    }
    return checkpoints[account][lower].votes;
  }

  function _delegate(address delegator, address delegatee) internal {
    address currentDelegate = delegates[delegator];
    uint96 delegatorBalance = uint96(balanceOf(delegator));
    delegates[delegator] = delegatee;

    emit DelegateChanged(delegator, currentDelegate, delegatee);

    _moveDelegates(currentDelegate, delegatee, delegatorBalance);
  }

  function _moveDelegates(
    address srcRep,
    address dstRep,
    uint96 amount
  ) internal {
    if (srcRep != dstRep && amount > 0) {
      if (srcRep != address(0)) {
        uint32 srcRepNum = numCheckpoints[srcRep];
        uint96 srcRepOld = srcRepNum > 0 ? checkpoints[srcRep][srcRepNum - 1].votes : 0;
        uint96 srcRepNew = sub96(srcRepOld, amount, 'Comp::_moveVotes: vote amount underflows');
        _writeCheckpoint(srcRep, srcRepNum, srcRepOld, srcRepNew);
      }

      if (dstRep != address(0)) {
        uint32 dstRepNum = numCheckpoints[dstRep];
        uint96 dstRepOld = dstRepNum > 0 ? checkpoints[dstRep][dstRepNum - 1].votes : 0;
        uint96 dstRepNew = add96(dstRepOld, amount, 'Comp::_moveVotes: vote amount overflows');
        _writeCheckpoint(dstRep, dstRepNum, dstRepOld, dstRepNew);
      }
    }
  }

  function _writeCheckpoint(
    address delegatee,
    uint32 nCheckpoints,
    uint96 oldVotes,
    uint96 newVotes
  ) internal {
    uint32 blockNumber = safe32(block.number, 'Comp::_writeCheckpoint: block number exceeds 32 bits');

    if (nCheckpoints > 0 && checkpoints[delegatee][nCheckpoints - 1].fromBlock == blockNumber) {
      checkpoints[delegatee][nCheckpoints - 1].votes = newVotes;
    } else {
      checkpoints[delegatee][nCheckpoints] = Checkpoint(blockNumber, newVotes);
      numCheckpoints[delegatee] = nCheckpoints + 1;
    }

    emit DelegateVotesChanged(delegatee, oldVotes, newVotes);
  }

  function safe32(uint256 n, string memory errorMessage) internal pure returns (uint32) {
    require(n < 2**32, errorMessage);
    return uint32(n);
  }

  function safe96(uint256 n, string memory errorMessage) internal pure returns (uint96) {
    require(n < 2**96, errorMessage);
    return uint96(n);
  }

  function add96(
    uint96 a,
    uint96 b,
    string memory errorMessage
  ) internal pure returns (uint96) {
    uint96 c = a + b;
    require(c >= a, errorMessage);
    return c;
  }

  function sub96(
    uint96 a,
    uint96 b,
    string memory errorMessage
  ) internal pure returns (uint96) {
    require(b <= a, errorMessage);
    return a - b;
  }

  function getChainId() internal pure returns (uint256) {
    uint256 chainId;
    assembly {
      chainId := chainid()
    }
    return chainId;
  }
}
