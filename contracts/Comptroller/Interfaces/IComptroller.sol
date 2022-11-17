// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

interface IComptroller {
  /*** Assets You Are In ***/
  function isComptroller() external view returns (bool);

  function markets(address) external view returns (bool, uint256);

  function oracle() external view returns (address);

  function underWriterAdmin() external view returns (address);

  function enterMarkets(address[] calldata cTokens) external returns (uint256[] memory);

  function exitMarket(address cToken) external returns (uint256);

  function closeFactorMantissa() external view returns (uint256);

  function getAccountLiquidity(address)
    external
    view
    returns (
      uint256,
      uint256,
      uint256
    );

  // function getAssetsIn(address) external view returns (ICToken[] memory);
  function claimComp(address) external;

  function compAccrued(address) external view returns (uint256);

  function getAssetsIn(address account) external view returns (address[] memory);

  /*** Policy Hooks ***/

  function mintAllowed(
    address cToken,
    address minter,
    uint256 mintAmount
  ) external returns (uint256);

  function redeemAllowed(
    address cToken,
    address redeemer,
    uint256 redeemTokens
  ) external returns (uint256);

  function redeemVerify(
    address cToken,
    address redeemer,
    uint256 redeemAmount,
    uint256 redeemTokens
  ) external;

  function borrowAllowed(
    address cToken,
    address borrower,
    uint256 borrowAmount
  ) external returns (uint256);

  function repayBorrowAllowed(
    address cToken,
    address payer,
    address borrower,
    uint256 repayAmount
  ) external returns (uint256);

  function seizeAllowed(
    address cTokenCollateral,
    address cTokenBorrowed,
    address liquidator,
    address borrower,
    uint256 seizeTokens
  ) external returns (uint256);

  function transferAllowed(
    address cToken,
    address src,
    address dst,
    uint256 transferTokens
  ) external returns (uint256);

  /*** Liquidity/Liquidation Calculations ***/

  function liquidationIncentiveMantissa() external view returns (uint256);

  function isListed(address asset) external view returns (bool);

  function marketGroupId(address asset) external view returns (uint8);

  function getHypotheticalAccountLiquidity(
    address account,
    address cTokenModify,
    uint256 redeemTokens,
    uint256 borrowAmount
  )
    external
    view
    returns (
      uint256,
      uint256,
      uint256
    );
}
