pragma solidity 0.8.19;

import '../Exponential/ExponentialNoError.sol';

interface IAccountLiquidity {
  struct AccountGroupLocalVars {
    uint8 groupId;
    uint256 cDepositVal;
    uint256 cBorrowVal;
    uint256 suDepositVal;
    uint256 suBorrowVal;
    Exp intraCRate;
    Exp intraMintRate;
    Exp intraSuRate;
    Exp interCRate;
    Exp interSuRate;
  }

  function getHypotheticalAccountLiquidity(
    address account,
    address cTokenModify,
    uint256 redeemTokens,
    uint256 borrowAmount
  ) external view returns (uint256, uint256, uint256);

  function getHypotheticalSafeLimit(
    address account,
    address cTokenModify,
    uint256 intraSafeLimitMantissa,
    uint256 interSafeLimitMantissa
  ) external view returns (uint256);

  // function getIntermediateGroupSummary(
  //   address account,
  //   address cTokenModify,
  //   uint256 redeemTokens,
  //   uint256 borrowAmount
  // ) external view returns (uint256, uint256, AccountGroupLocalVars memory);

  // function getHypotheticalGroupSummary(
  //   address account,
  //   address cTokenModify,
  //   uint256 redeemTokens,
  //   uint256 borrowAmount
  // ) external view returns (uint256, uint256, AccountGroupLocalVars memory);
}
