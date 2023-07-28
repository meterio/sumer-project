- constructor
  - stakingToken 质押token
  - rewardTokens 奖励token数组
  - rewardRates 奖励比率数组
  - rewardSymbols 奖励symbol
  - 循环rewardTokens数组
  - periodFinish + 7天
- calcCurCombinedWeight view 计算合并权重
  - 循环lockedStakes[account]
  - 如果thisStake过期
    - 如果lastRewardClaimTime[account] < thisStake.ending_timestamp
    - 如果锁在自上次claim后的时间内过期，则本次需要按比例平均权重
      - time_before_expiry = thisStake.ending_timestamp - lastRewardClaimTime[account]
      - time_after_expiry = block.timestamp - thisStake.ending_timestamp
      - 分子 = thisStake.lock_multiplier * time_before_expiry + time_after_expiry * 1e18
      - lock_multiplier = 分子 / time_before_expiry + time_after_expiry
    - 否则
      - lock_multiplier = 1e18
    - combined_boosted_amount = thisStake.liquidity * lock_multiplier / 1e18
    - new_combined_weight += combined_boosted_amount
  - 将每个lock的权重相加
- lockMultiplier lock乘数
  - lock_multiplier = 1e18 + (sec参数 * (3e18 - 1e18)) / 1 year