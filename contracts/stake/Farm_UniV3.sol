// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;

import "./Math/Math.sol";
import "./Math/SafeMath.sol";
import "./ERC20/IERC20.sol";
import "./ERC20/SafeERC20.sol";
import "./Uniswap/TransferHelper.sol";
import "./Uniswap_V3/libraries/TickMath.sol";
import "./Uniswap_V3/libraries/LiquidityAmounts.sol";
import "./Uniswap_V3/IUniswapV3PositionsNFT.sol";
import "./Uniswap_V3/IUniswapV3Pool.sol";
import "./Utils/ReentrancyGuard.sol";
import "./abstract/Owned.sol";

contract Farm_UniV3 is Owned, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    /* ========== STATE VARIABLES ========== */

    // 实例
    IERC20 private veSumer;
    IERC20 private rewardsToken0;
    IUniswapV3PositionsNFT private stakingTokenNFT; // UniV3 uses an NFT
    IUniswapV3Pool private lp_pool;

    // 管理员地址
    address public timelock_address;

    // 各种精度的常量
    uint256 private constant MULTIPLIER_PRECISION = 1e18;
    int256 private constant EMISSION_FACTOR_PRECISION = 1e18;

    // 奖励和期间相关
    uint256 private periodFinish;
    uint256 private lastUpdateTime;
    uint256 public reward_rate_manual;
    uint256 public rewardsDuration = 604800; // 7 * 86400  (7 days)

    // Lock time and multiplier settings
    uint256 public lock_max_multiplier = uint256(3e18); // E18. 1x = 1e18
    uint256 public lock_time_for_max_multiplier = 3 * 365 * 86400; // 3 years
    uint256 public lock_time_min = 86400; // 1 * 86400  (1 day)

    // veSumer related
    uint256 public veSumer_per_sumer_for_max_boost = uint256(4e18); // E18. 4e18 means 4 veSumer must be held by the staker per 1 Sumer
    uint256 public veSumer_max_multiplier = uint256(2e18); // E18. 1x = 1e18
    mapping(address => uint256) private _veSumerMultiplierStored;

    // Uniswap V3 related
    int24 public uni_tick_lower;
    int24 public uni_tick_upper;
    int24 public ideal_tick;
    uint24 public uni_required_fee = 500;
    address public uni_token0;
    address public uni_token1;
    uint32 public twap_duration = 300; // 5 minutes

    // Rewards tracking
    uint256 private rewardPerTokenStored0;
    mapping(address => uint256) private userRewardPerTokenPaid0;
    mapping(address => uint256) private rewards0;
    uint256 private last_gauge_relative_weight;
    uint256 private last_gauge_time_total;

    // Balance, stake, and weight tracking
    uint256 private _total_liquidity_locked;
    uint256 private _total_combined_weight;
    mapping(address => uint256) private _locked_liquidity;
    mapping(address => uint256) private _combined_weights;
    mapping(address => LockedNFT[]) private lockedNFTs;

    // List of valid migrators (set by governance)
    mapping(address => bool) private valid_migrators;
    address[] private valid_migrators_array;

    // Stakers set which migrator(s) they want to use
    mapping(address => mapping(address => bool))
        private staker_allowed_migrators;

    // Greylists
    mapping(address => bool) private greylist;

    // Admin booleans for emergencies, migrations, and overrides
    bool public bypassEmissionFactor;
    bool public migrationsOn; // Used for migrations. Prevents new stakes, but allows LP and reward withdrawals
    bool public stakesUnlocked; // Release locked stakes in case of system migration or emergency
    bool public stakingPaused;
    bool public withdrawalsPaused;
    bool public rewardsCollectionPaused;

    // Struct for the stake
    struct LockedNFT {
        uint256 token_id; // for Uniswap V3 LPs
        uint256 liquidity;
        uint256 start_timestamp;
        uint256 ending_timestamp;
        uint256 lock_multiplier; // 6 decimals of precision. 1x = 1000000
        int24 tick_lower;
        int24 tick_upper;
    }

    /* ========== MODIFIERS ========== */

    modifier onlyByOwnerOrGovernance() {
        require(
            msg.sender == owner || msg.sender == timelock_address,
            "Not owner or timelock"
        );
        _;
    }

    modifier isMigrating() {
        require(migrationsOn == true, "Not in migration");
        _;
    }

    modifier updateRewardAndBalance(address account, bool sync_too) {
        _updateRewardAndBalance(account, sync_too);
        _;
    }

    /* ========== CONSTRUCTOR ========== */
    constructor(
        address _owner,
        address _rewardsToken0,
        address _stakingTokenNFT,
        address _lp_pool_address,
        address _timelock_address,
        address _veSumer_address,
        address _uni_token0,
        address _uni_token1,
        int24 _uni_tick_lower,
        int24 _uni_tick_upper,
        int24 _uni_ideal_tick
    ) Owned(_owner) public{
        rewardsToken0 = IERC20(_rewardsToken0);
        stakingTokenNFT = IUniswapV3PositionsNFT(_stakingTokenNFT);
        lp_pool = IUniswapV3Pool(_lp_pool_address); // call getPool(token0, token1, fee) on the Uniswap V3 Factory (0x1F98431c8aD98523631AE4a59f267346ea31F984) to get this otherwise

        veSumer = IERC20(_veSumer_address);
        lastUpdateTime = block.timestamp;
        timelock_address = _timelock_address;

        // Set the UniV3 addresses
        uni_token0 = _uni_token0;
        uni_token1 = _uni_token1;

        // Tick and Liquidity related
        uni_tick_lower = _uni_tick_lower;
        uni_tick_upper = _uni_tick_upper;

        // Closest tick to 1
        ideal_tick = _uni_ideal_tick;

        // Manual reward rate
        reward_rate_manual = (uint256(365e17)).div(365 * 86400); // 0.1 Sumer per day
    }

    /* ========== VIEWS ========== */

    // User locked liquidity tokens
    function totalLiquidityLocked() external view returns (uint256) {
        return _total_liquidity_locked;
    }

    // Total locked liquidity tokens
    function lockedLiquidityOf(address account)
        external
        view
        returns (uint256)
    {
        return _locked_liquidity[account];
    }

    // Total 'balance' used for calculating the percent of the pool the account owns
    // Takes into account the locked stake time multiplier and veSumer multiplier
    function combinedWeightOf(address account) external view returns (uint256) {
        return _combined_weights[account];
    }

    // Total combined weight
    function totalCombinedWeight() external view returns (uint256) {
        return _total_combined_weight;
    }

    function lockMultiplier(uint256 secs) public view returns (uint256) {
        uint256 lock_multiplier = uint256(MULTIPLIER_PRECISION).add(
            secs.mul(lock_max_multiplier.sub(MULTIPLIER_PRECISION)).div(
                lock_time_for_max_multiplier
            )
        );
        if (lock_multiplier > lock_max_multiplier)
            lock_multiplier = lock_max_multiplier;
        return lock_multiplier;
    }

    function userStakedSumer(address account) public view returns (uint256) {
        uint256 sumer_tally = 0;
        LockedNFT memory thisNFT;
        for (uint256 i = 0; i < lockedNFTs[account].length; i++) {
            thisNFT = lockedNFTs[account][i];
            uint256 this_liq = thisNFT.liquidity;
            if (this_liq > 0) {
                uint160 sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(
                    thisNFT.tick_lower
                );
                uint160 sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(
                    thisNFT.tick_upper
                );
                sumer_tally = sumer_tally.add(
                    LiquidityAmounts.getAmount0ForLiquidity(
                        sqrtRatioAX96,
                        sqrtRatioBX96,
                        uint128(thisNFT.liquidity)
                    )
                );
            }
        }

        return sumer_tally.div(2);
    }

    function emissionFactor() public view returns (uint256 emission_factor) {
        // If the bypass is turned on, return 1x
        if (bypassEmissionFactor) return MULTIPLIER_PRECISION;

        // From https://github.com/charmfinance/alpha-vaults-contracts/blob/main/contracts/AlphaStrategy.sol
        uint32[] memory secondsAgo = new uint32[](2);
        secondsAgo[0] = uint32(twap_duration);
        secondsAgo[1] = 0;

        (int56[] memory tickCumulatives, ) = lp_pool.observe(secondsAgo);
        int24 avg_tick = int24(
            (tickCumulatives[1] - tickCumulatives[0]) / int32(twap_duration)
        );

        if (avg_tick <= uni_tick_lower) return 0;
        if (avg_tick >= uni_tick_upper) return 0;

        // price = (1e18 /1e6) *1.0001^(tick)
        // Tick = Math.Floor(Log[base 1.0001] of (price / (10 ** decimal difference)))
        // Unsafe math, but there is a safety check later
        int256 em_factor_int256;
        if (avg_tick <= ideal_tick) {
            em_factor_int256 =
                (EMISSION_FACTOR_PRECISION * (avg_tick - uni_tick_lower)) /
                (ideal_tick - uni_tick_lower);
        } else {
            em_factor_int256 =
                (EMISSION_FACTOR_PRECISION * (uni_tick_upper - avg_tick)) /
                (uni_tick_upper - ideal_tick);
        }

        // Check for negatives
        if (em_factor_int256 < 0)
            emission_factor = uint256(-1 * em_factor_int256);
        else emission_factor = uint256(em_factor_int256);

        // Sanity checks
        require(
            emission_factor <= MULTIPLIER_PRECISION,
            "Emission factor too high"
        );
        require(emission_factor >= 0, "Emission factor too low");
    }

    function minVeSumerForMaxBoost(address account)
        public
        view
        returns (uint256)
    {
        return
            (userStakedSumer(account)).mul(veSumer_per_sumer_for_max_boost).div(
                MULTIPLIER_PRECISION
            );
    }

    function veSumerMultiplier(address account) public view returns (uint256) {
        // The claimer gets a boost depending on amount of veSumer they have relative to the amount of Sumer 'inside'
        // of their locked LP tokens
        uint256 veSumer_needed_for_max_boost = minVeSumerForMaxBoost(account);
        if (veSumer_needed_for_max_boost > 0) {
            uint256 user_veSumer_fraction = (veSumer.balanceOf(account))
                .mul(MULTIPLIER_PRECISION)
                .div(veSumer_needed_for_max_boost);

            uint256 veSumer_multiplier = (
                (user_veSumer_fraction).mul(veSumer_max_multiplier)
            ).div(MULTIPLIER_PRECISION);

            // Cap the boost to the veSumer_max_multiplier
            if (veSumer_multiplier > veSumer_max_multiplier)
                veSumer_multiplier = veSumer_max_multiplier;

            return veSumer_multiplier;
        } else return 0; // This will happen with the first stake, when user_staked_sumer is 0
    }

    function checkUniV3NFT(uint256 token_id, bool fail_if_false)
        internal
        view
        returns (
            bool is_valid,
            uint256 liquidity,
            int24 tick_lower,
            int24 tick_upper
        )
    {
        (
            ,
            ,
            address token0,
            address token1,
            uint24 fee,
            int24 tickLower,
            int24 tickUpper,
            uint256 _liquidity,
            ,
            ,
            ,

        ) = stakingTokenNFT.positions(token_id);

        // Set initially
        is_valid = false;
        liquidity = _liquidity;

        // Do the checks
        if (
            (token0 == uni_token0) &&
            (token1 == uni_token1) &&
            (fee == uni_required_fee) &&
            (tickLower == uni_tick_lower) &&
            (tickUpper == uni_tick_upper)
        ) {
            is_valid = true;
        } else {
            // More detailed messages removed here to save space
            if (fail_if_false) {
                revert("Wrong token characteristics");
            }
        }
        return (is_valid, liquidity, tickLower, tickUpper);
    }

    // Return all of the locked NFT positions
    function lockedNFTsOf(address account)
        external
        view
        returns (LockedNFT[] memory)
    {
        return lockedNFTs[account];
    }

    function calcCurCombinedWeight(address account)
        public
        view
        returns (
            uint256 old_combined_weight,
            uint256 new_veSumer_multiplier,
            uint256 new_combined_weight
        )
    {
        // Get the old combined weight
        old_combined_weight = _combined_weights[account];

        // Get the veSumer multipliers
        // For the calculations, use the midpoint (analogous to midpoint Riemann sum)
        new_veSumer_multiplier = veSumerMultiplier(account);
        uint256 midpoint_veSumer_multiplier = (
            (new_veSumer_multiplier).add(_veSumerMultiplierStored[account])
        ).div(2);

        // Loop through the locked stakes, first by getting the liquidity * lock_multiplier portion
        new_combined_weight = 0;
        for (uint256 i = 0; i < lockedNFTs[account].length; i++) {
            LockedNFT memory thisNFT = lockedNFTs[account][i];
            uint256 lock_multiplier = thisNFT.lock_multiplier;

            // If the lock period is over, drop the lock multiplier down to 1x for the weight calculations
            if (thisNFT.ending_timestamp <= block.timestamp) {
                lock_multiplier = MULTIPLIER_PRECISION;
            }

            uint256 liquidity = thisNFT.liquidity;
            uint256 combined_boosted_amount = liquidity
                .mul(lock_multiplier.add(midpoint_veSumer_multiplier))
                .div(MULTIPLIER_PRECISION);
            new_combined_weight = new_combined_weight.add(
                combined_boosted_amount
            );
        }
    }

    function lastTimeRewardApplicable() internal view returns (uint256) {
        return Math.min(block.timestamp, periodFinish);
    }

    function rewardPerToken() internal view returns (uint256) {
        if (_total_liquidity_locked == 0 || _total_combined_weight == 0) {
            return rewardPerTokenStored0;
        } else {
            return (
                rewardPerTokenStored0.add(
                    lastTimeRewardApplicable()
                        .sub(lastUpdateTime)
                        .mul(rewardRate0())
                        .mul(emissionFactor())
                        .div(_total_combined_weight) // has 1e18 already
                )
            );
        }
    }

    function earned(address account) public view returns (uint256) {
        uint256 earned_reward_0 = rewardPerToken();
        return (
            _combined_weights[account]
                .mul(earned_reward_0.sub(userRewardPerTokenPaid0[account]))
                .div(1e18)
                .add(rewards0[account])
        );
    }

    function rewardRate0() public view returns (uint256 rwd_rate) {
        rwd_rate = reward_rate_manual;
    }

    function getRewardForDuration() external view returns (uint256) {
        return rewardRate0().mul(rewardsDuration);
    }

    // Needed to indicate that this contract is ERC721 compatible
    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public pure returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function _updateRewardAndBalance(address account, bool sync_too) internal {
        // Need to retro-adjust some things if the period hasn't been renewed, then start a new one
        if (sync_too) {
            sync();
        }

        if (account != address(0)) {
            // To keep the math correct, the user's combined weight must be recomputed to account for their
            // ever-changing veSumer balance.
            (
                uint256 old_combined_weight,
                uint256 new_veSumer_multiplier,
                uint256 new_combined_weight
            ) = calcCurCombinedWeight(account);

            // Calculate the earnings first
            _syncEarned(account);

            // Update the user's stored veSumer multipliers
            _veSumerMultiplierStored[account] = new_veSumer_multiplier;

            // Update the user's and the global combined weights
            if (new_combined_weight >= old_combined_weight) {
                uint256 weight_diff = new_combined_weight.sub(
                    old_combined_weight
                );
                _total_combined_weight = _total_combined_weight.add(
                    weight_diff
                );
                _combined_weights[account] = old_combined_weight.add(
                    weight_diff
                );
            } else {
                uint256 weight_diff = old_combined_weight.sub(
                    new_combined_weight
                );
                _total_combined_weight = _total_combined_weight.sub(
                    weight_diff
                );
                _combined_weights[account] = old_combined_weight.sub(
                    weight_diff
                );
            }
        }
    }

    function _syncEarned(address account) internal {
        if (account != address(0)) {
            // Calculate the earnings
            uint256 earned0 = earned(account);
            rewards0[account] = earned0;
            userRewardPerTokenPaid0[account] = rewardPerTokenStored0;
        }
    }

    // Staker can allow a migrator
    function stakerAllowMigrator(address migrator_address) external {
        require(valid_migrators[migrator_address], "Invalid migrator address");
        staker_allowed_migrators[msg.sender][migrator_address] = true;
    }

    // Staker can disallow a previously-allowed migrator
    function stakerDisallowMigrator(address migrator_address) external {
        // Delete from the mapping
        delete staker_allowed_migrators[msg.sender][migrator_address];
    }

    // Two different stake functions are needed because of delegateCall and msg.sender issues (important for migration)
    function stakeLocked(uint256 token_id, uint256 secs) external nonReentrant {
        _stakeLocked(msg.sender, msg.sender, token_id, secs, block.timestamp);
    }

    // If this were not internal, and source_address had an infinite approve, this could be exploitable
    // (pull funds from source_address and stake for an arbitrary staker_address)
    function _stakeLocked(
        address staker_address,
        address source_address,
        uint256 token_id,
        uint256 secs,
        uint256 start_timestamp
    ) internal updateRewardAndBalance(staker_address, true) {
        require(
            stakingPaused == false || valid_migrators[msg.sender] == true,
            "Staking paused or in migration"
        );
        require(
            greylist[staker_address] == false,
            "Address has been greylisted"
        );
        require(secs >= lock_time_min, "Minimum stake time not met");
        require(
            secs <= lock_time_for_max_multiplier,
            "Trying to lock for too long"
        );
        (
            ,
            uint256 liquidity,
            int24 tick_lower,
            int24 tick_upper
        ) = checkUniV3NFT(token_id, true); // Should throw if false

        {
            uint256 lock_multiplier = lockMultiplier(secs);
            lockedNFTs[staker_address].push(
                LockedNFT(
                    token_id,
                    liquidity,
                    start_timestamp,
                    start_timestamp.add(secs),
                    lock_multiplier,
                    tick_lower,
                    tick_upper
                )
            );
        }

        // Pull the tokens from the source_address
        stakingTokenNFT.safeTransferFrom(
            source_address,
            address(this),
            token_id
        );

        // Update liquidities
        _total_liquidity_locked = _total_liquidity_locked.add(liquidity);
        _locked_liquidity[staker_address] = _locked_liquidity[staker_address]
            .add(liquidity);

        // Need to call again to make sure everything is correct
        _updateRewardAndBalance(staker_address, false);

        emit LockNFT(staker_address, liquidity, token_id, secs, source_address);
    }

    // Two different withdrawLocked functions are needed because of delegateCall and msg.sender issues (important for migration)
    function withdrawLocked(uint256 token_id) external nonReentrant {
        require(withdrawalsPaused == false, "Withdrawals paused");
        _withdrawLocked(msg.sender, msg.sender, token_id);
    }

    // No withdrawer == msg.sender check needed since this is only internally callable and the checks are done in the wrapper
    // functions like migrator_withdraw_locked() and withdrawLocked()
    function _withdrawLocked(
        address staker_address,
        address destination_address,
        uint256 token_id
    ) internal {
        // Collect rewards first and then update the balances
        _getReward(staker_address, destination_address);

        LockedNFT memory thisNFT;
        thisNFT.liquidity = 0;
        uint256 theArrayIndex;
        for (uint256 i = 0; i < lockedNFTs[staker_address].length; i++) {
            if (token_id == lockedNFTs[staker_address][i].token_id) {
                thisNFT = lockedNFTs[staker_address][i];
                theArrayIndex = i;
                break;
            }
        }
        require(thisNFT.token_id == token_id, "Token ID not found");
        require(
            block.timestamp >= thisNFT.ending_timestamp ||
                stakesUnlocked == true ||
                valid_migrators[msg.sender] == true,
            "Stake is still locked!"
        );

        uint256 theLiquidity = thisNFT.liquidity;

        if (theLiquidity > 0) {
            // Update liquidities
            _total_liquidity_locked = _total_liquidity_locked.sub(theLiquidity);
            _locked_liquidity[staker_address] = _locked_liquidity[
                staker_address
            ].sub(theLiquidity);

            // Remove the stake from the array
            delete lockedNFTs[staker_address][theArrayIndex];

            // Need to call again to make sure everything is correct
            _updateRewardAndBalance(staker_address, false);

            // Give the tokens to the destination_address
            stakingTokenNFT.safeTransferFrom(
                address(this),
                destination_address,
                token_id
            );

            emit WithdrawLocked(
                staker_address,
                theLiquidity,
                token_id,
                destination_address
            );
        }
    }

    // Two different getReward functions are needed because of delegateCall and msg.sender issues (important for migration)
    function getReward() external nonReentrant returns (uint256) {
        require(rewardsCollectionPaused == false, "Rewards collection paused");
        return _getReward(msg.sender, msg.sender);
    }

    // No withdrawer == msg.sender check needed since this is only internally callable
    // This distinction is important for the migrator
    // Also collects the LP fees
    function _getReward(address rewardee, address destination_address)
        internal
        updateRewardAndBalance(rewardee, true)
        returns (uint256 reward_0)
    {
        reward_0 = rewards0[rewardee];
        if (reward_0 > 0) {
            rewards0[rewardee] = 0;
            TransferHelper.safeTransfer(
                address(rewardsToken0),
                destination_address,
                reward_0
            );

            // Collect liquidity fees too
            uint256 accumulated_token0 = 0;
            uint256 accumulated_token1 = 0;
            LockedNFT memory thisNFT;
            for (uint256 i = 0; i < lockedNFTs[rewardee].length; i++) {
                thisNFT = lockedNFTs[rewardee][i];

                // Check for null entries
                if (thisNFT.token_id != 0) {
                    IUniswapV3PositionsNFT.CollectParams
                        memory collect_params = IUniswapV3PositionsNFT
                            .CollectParams(
                                thisNFT.token_id,
                                destination_address,
                                type(uint128).max,
                                type(uint128).max
                            );
                    (uint256 tok0_amt, uint256 tok1_amt) = stakingTokenNFT
                        .collect(collect_params);
                    accumulated_token0 = accumulated_token0.add(tok0_amt);
                    accumulated_token1 = accumulated_token1.add(tok1_amt);
                }
            }

            emit RewardPaid(
                rewardee,
                reward_0,
                accumulated_token0,
                accumulated_token1,
                address(rewardsToken0),
                destination_address
            );
        }
    }

    function retroCatchUp() internal {
        require(block.timestamp > periodFinish, "Period has not expired yet!");

        uint256 num_periods_elapsed = uint256(
            block.timestamp.sub(periodFinish)
        ) / rewardsDuration;
        uint256 balance0 = rewardsToken0.balanceOf(address(this));
        require(
            rewardRate0().mul(rewardsDuration).mul(num_periods_elapsed + 1) <=
                balance0,
            "Not enough Sumer available"
        );

        periodFinish = periodFinish.add(
            (num_periods_elapsed.add(1)).mul(rewardsDuration)
        );

        uint256 reward_per_token_0 = rewardPerToken();
        rewardPerTokenStored0 = reward_per_token_0;
        lastUpdateTime = lastTimeRewardApplicable();

        emit RewardsPeriodRenewed(address(stakingTokenNFT));
    }

    function sync() public {
        // Sync the gauge weight, if applicable
        // sync_gauge_weight(false);

        if (block.timestamp > periodFinish) {
            retroCatchUp();
        } else {
            uint256 reward_per_token_0 = rewardPerToken();
            rewardPerTokenStored0 = reward_per_token_0;
            lastUpdateTime = lastTimeRewardApplicable();
        }
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    // Migrator can stake for someone else (they won't be able to withdraw it back though, only staker_address can).
    function migrator_stakeLocked_for(
        address staker_address,
        uint256 token_id,
        uint256 secs,
        uint256 start_timestamp
    ) external isMigrating {
        require(
            staker_allowed_migrators[staker_address][msg.sender] &&
                valid_migrators[msg.sender],
            "Migrator invalid or unapproved"
        );
        _stakeLocked(
            staker_address,
            msg.sender,
            token_id,
            secs,
            start_timestamp
        );
    }

    // Used for migrations
    function migrator_withdraw_locked(address staker_address, uint256 token_id)
        external
        isMigrating
    {
        require(
            staker_allowed_migrators[staker_address][msg.sender] &&
                valid_migrators[msg.sender],
            "Migrator invalid or unapproved"
        );
        _withdrawLocked(staker_address, msg.sender, token_id);
    }

    // Adds supported migrator address
    function addMigrator(address migrator_address)
        external
        onlyByOwnerOrGovernance
    {
        valid_migrators[migrator_address] = true;
    }

    // Remove a migrator address
    function removeMigrator(address migrator_address)
        external
        onlyByOwnerOrGovernance
    {
        // Delete from the mapping
        delete valid_migrators[migrator_address];
    }

    // Added to support recovering LP Rewards and other mistaken tokens from other systems to be distributed to holders
    function recoverERC20(address tokenAddress, uint256 tokenAmount)
        external
        onlyByOwnerOrGovernance
    {
        // Admin cannot withdraw the staking token from the contract unless currently migrating
        if (!migrationsOn) {
            require(
                tokenAddress != address(stakingTokenNFT),
                "Not in migration"
            ); // Only Governance / Timelock can trigger a migration
        }

        // Only the owner address can ever receive the recovery withdrawal
        TransferHelper.safeTransfer(tokenAddress, owner, tokenAmount);
        emit RecoveredERC20(tokenAddress, tokenAmount);
    }

    // Added to support recovering LP Rewards and other mistaken tokens from other systems to be distributed to holders
    function recoverERC721(address tokenAddress, uint256 token_id)
        external
        onlyByOwnerOrGovernance
    {
        // Admin cannot withdraw the staking token from the contract unless currently migrating
        if (!migrationsOn) {
            require(
                tokenAddress != address(stakingTokenNFT),
                "Not in migration"
            ); // Only Governance / Timelock can trigger a migration
        }

        // Only the owner address can ever receive the recovery withdrawal
        // IUniswapV3PositionsNFT inherits IERC721 so the latter does not need to be imported
        IUniswapV3PositionsNFT(tokenAddress).safeTransferFrom(
            address(this),
            owner,
            token_id
        );
        emit RecoveredERC721(tokenAddress, token_id);
    }

    function setMultipliers(
        uint256 _lock_max_multiplier,
        uint256 _veSumer_max_multiplier,
        uint256 _veSumer_per_sumer_for_max_boost
    ) external onlyByOwnerOrGovernance {
        require(
            _lock_max_multiplier >= MULTIPLIER_PRECISION,
            "Mult must be >= MULTIPLIER_PRECISION"
        );
        require(_veSumer_max_multiplier >= 0, "veSumer mul must be >= 0");
        require(
            _veSumer_per_sumer_for_max_boost > 0,
            "veSumer pct max must be >= 0"
        );

        lock_max_multiplier = _lock_max_multiplier;
        veSumer_max_multiplier = _veSumer_max_multiplier;
        veSumer_per_sumer_for_max_boost = _veSumer_per_sumer_for_max_boost;

        emit MaxVeSumerMultiplier(veSumer_max_multiplier);
        emit LockedNFTMaxMultiplierUpdated(lock_max_multiplier);
        emit veSumerPctForMaxBoostUpdated(veSumer_per_sumer_for_max_boost);
    }

    function setLockedNFTTimeForMinAndMaxMultiplier(
        uint256 _lock_time_for_max_multiplier,
        uint256 _lock_time_min
    ) external onlyByOwnerOrGovernance {
        require(
            _lock_time_for_max_multiplier >= 1,
            "Mul max time must be >= 1"
        );
        require(_lock_time_min >= 1, "Mul min time must be >= 1");

        lock_time_for_max_multiplier = _lock_time_for_max_multiplier;
        lock_time_min = _lock_time_min;

        emit LockedNFTTimeForMaxMultiplier(lock_time_for_max_multiplier);
        emit LockedNFTMinTime(_lock_time_min);
    }

    function initializeDefault() external onlyByOwnerOrGovernance {
        lastUpdateTime = block.timestamp;
        periodFinish = block.timestamp.add(rewardsDuration);
        emit DefaultInitialization();
    }

    function greylistAddress(address _address)
        external
        onlyByOwnerOrGovernance
    {
        greylist[_address] = !(greylist[_address]);
    }

    function unlockStakes() external onlyByOwnerOrGovernance {
        stakesUnlocked = !stakesUnlocked;
    }

    function toggleMigrations() external onlyByOwnerOrGovernance {
        migrationsOn = !migrationsOn;
    }

    function setPauses(
        bool _stakingPaused,
        bool _withdrawalsPaused,
        bool _rewardsCollectionPaused
    ) external onlyByOwnerOrGovernance {
        stakingPaused = _stakingPaused;
        withdrawalsPaused = _withdrawalsPaused;
        rewardsCollectionPaused = _rewardsCollectionPaused;
    }

    function setManualRewardRate(uint256 _reward_rate_manual, bool sync_too)
        external
        onlyByOwnerOrGovernance
    {
        reward_rate_manual = _reward_rate_manual;

        if (sync_too) {
            sync();
        }
    }

    function setTWAP(uint32 _new_twap_duration)
        external
        onlyByOwnerOrGovernance
    {
        require(_new_twap_duration <= 3600, "TWAP too long"); // One hour for now. Depends on how many increaseObservationCardinalityNext / observation slots you have
        twap_duration = _new_twap_duration;
    }

    function toggleEmissionFactorBypass() external onlyByOwnerOrGovernance {
        bypassEmissionFactor = !bypassEmissionFactor;
    }

    function setTimelock(address _new_timelock)
        external
        onlyByOwnerOrGovernance
    {
        timelock_address = _new_timelock;
    }

    /* ========== EVENTS ========== */

    event LockNFT(
        address indexed user,
        uint256 liquidity,
        uint256 token_id,
        uint256 secs,
        address source_address
    );
    event WithdrawLocked(
        address indexed user,
        uint256 liquidity,
        uint256 token_id,
        address destination_address
    );
    event RewardPaid(
        address indexed user,
        uint256 farm_reward,
        uint256 liq_tok0_reward,
        uint256 liq_tok1_reward,
        address token_address,
        address destination_address
    );
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 token_id);
    event RewardsPeriodRenewed(address token);
    event DefaultInitialization();
    event LockedNFTMaxMultiplierUpdated(uint256 multiplier);
    event LockedNFTTimeForMaxMultiplier(uint256 secs);
    event LockedNFTMinTime(uint256 secs);
    event MaxVeSumerMultiplier(uint256 multiplier);
    event veSumerPctForMaxBoostUpdated(uint256 scale_factor);
}
