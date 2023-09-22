// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import '../Exponential/ExponentialNoError.sol';
import './Interfaces/IComptroller.sol';
import './Interfaces/ICToken.sol';
import './Interfaces/IPriceOracle.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol';

contract AccountLiquidity is AccessControlEnumerableUpgradeable {
  using ExponentialNoError for uint256;
  using ExponentialNoError for Exp;
  using ExponentialNoError for Double;

  IComptroller public comptroller;

  function initialize(address _admin) external initializer {
    _setupRole(DEFAULT_ADMIN_ROLE, _admin);
  }

  function setComptroller(IComptroller _comptroller) external onlyRole(DEFAULT_ADMIN_ROLE) {
    comptroller = _comptroller;
  }

  /**
   * @dev Local vars for avoiding stack-depth limits in calculating account liquidity.
   *  Note that `cTokenBalance` is the number of cTokens the account owns in the market,
   *  whereas `borrowBalance` is the amount of underlying that the account has borrowed.
   */
  struct AccountLiquidityLocalVars {
    uint8 equalAssetsGroupNum;
    uint8 assetGroupId;
    uint256 sumCollateral;
    uint256 sumBorrowPlusEffects;
    uint256 cTokenBalance;
    uint256 borrowBalance;
    uint256 exchangeRateMantissa;
    uint256 oraclePriceMantissa;
    Exp collateralFactor;
    Exp exchangeRate;
    Exp oraclePrice;
    Exp tokensToDenom;
    Exp intraCRate;
    Exp intraMintRate;
    Exp interCRate;
    Exp intraSuRate;
    Exp interSuRate;
    Exp discountRate;
    bool isSuToken;
    uint256 tokenDepositVal;
    uint256 tokenBorrowVal;
  }

  struct AccountGroupLocalVars {
    uint8 groupId;
    uint256 cTokenBalanceSum;
    uint256 cTokenBorrowSum;
    uint256 suTokenBalanceSum;
    uint256 suTokenBorrowSum;
  }

  /**
     * @notice Determine what the account liquidity would be if the given amounts were redeemed/borrowed
     * @param cTokenModify The market to hypothetically redeem/borrow in
     * @param account The account to determine liquidity for
     * @param redeemTokens The number of tokens to hypothetically redeem
     * @param borrowAmount The amount of underlying to hypothetically borrow
     * @dev Note that we calculate the exchangeRateStored for each collateral cToken using stored data,
     *  without calculating accumulated interest.
     * @return (possible error code,
                hypothetical account liquidity in excess of collateral requirements,
     *          hypothetical account shortfall below collateral requirements)
     */
  function getHypotheticalAccountLiquidity(
    address account,
    address cTokenModify,
    uint256 redeemTokens,
    uint256 borrowAmount
  ) public view returns (uint256, uint256, uint256) {
    AccountLiquidityLocalVars memory vars; // Holds all our calculation results
    uint256 oErr;

    vars.equalAssetsGroupNum = IComptroller(comptroller).getAssetGroupNum();
    AccountGroupLocalVars[] memory groupVars = new AccountGroupLocalVars[](vars.equalAssetsGroupNum);

    if ((cTokenModify != address(0)) && !ICToken(cTokenModify).isCToken()) {
      vars.isSuToken = true;
    } else {
      vars.isSuToken = false;
    }

    // For each asset the account is in
    address[] memory assets = comptroller.getAssetsIn(account);
    for (uint256 i = 0; i < assets.length; ++i) {
      address asset = assets[i];
      vars.tokenDepositVal = uint256(0);
      vars.tokenBorrowVal = uint256(0);

      (, uint8 assetGroupId, ) = comptroller.markets(asset);

      // Read the balances and exchange rate from the cToken
      (oErr, vars.cTokenBalance, vars.borrowBalance, vars.exchangeRateMantissa) = ICToken(asset).getAccountSnapshot(
        account
      );
      require(oErr == 0, 'snapshot error');
      vars.exchangeRate = Exp({mantissa: vars.exchangeRateMantissa});
      vars.discountRate = Exp({mantissa: ICToken(asset).getDiscountRate()});

      // Get the normalized price of the asset
      IPriceOracle oracle = IPriceOracle(comptroller.oracle());
      vars.oraclePriceMantissa = oracle.getUnderlyingPrice(asset);
      require(vars.oraclePriceMantissa > 0, 'price error');
      vars.oraclePrice = Exp({mantissa: vars.oraclePriceMantissa});

      // Pre-compute a conversion factor from tokens -> ether (normalized price value)
      // vars.tokensToDenom = vars.exchangeRate.mul_(vars.oraclePriceMantissa).div_(1e18);

      vars.tokensToDenom = vars.exchangeRate.mul_(vars.oraclePrice);
      vars.tokensToDenom = vars.tokensToDenom.mul_(vars.discountRate);
      uint8 decimals = ICToken(asset).decimals();
      if (decimals < 18) vars.tokensToDenom = vars.tokensToDenom.mul_(10 ** (18 - decimals));

      uint8 index;
      for (index = 0; index < vars.equalAssetsGroupNum; ++index) {
        if (groupVars[index].groupId > 0) {
          if (groupVars[index].groupId == assetGroupId) {
            break;
          }
        } else {
          groupVars[index].groupId = assetGroupId;
          break;
        }
      }
      // require(index < vars.equalAssetsGroupNum);
      vars.tokenDepositVal = vars.tokensToDenom.mul_ScalarTruncateAddUInt(vars.cTokenBalance, vars.tokenDepositVal);
      vars.tokenBorrowVal = vars.oraclePrice.mul_ScalarTruncateAddUInt(vars.borrowBalance, vars.tokenBorrowVal);
      if (asset == cTokenModify) {
        uint256 redeemVal = vars.tokensToDenom.mul_(redeemTokens).truncate();
        if (redeemVal <= vars.tokenDepositVal) {
          // if redeemedVal <= tokenDepositVal
          // absorb it with deposits
          // tokenDepositVal -= redeemVal
          vars.tokenDepositVal = vars.tokenDepositVal.sub_(redeemVal);
          redeemVal = 0;
        } else {
          // if redeemVal > tokenDepositVal
          // redeemVal -= tokenDepositVal
          redeemVal = redeemVal.sub_(vars.tokenDepositVal);
          vars.tokenBorrowVal = vars.tokenBorrowVal.add_(redeemVal);
          vars.tokenDepositVal = 0;
        }

        vars.tokenBorrowVal = vars.oraclePrice.mul_ScalarTruncateAddUInt(borrowAmount, vars.tokenBorrowVal);
      }

      if (ICToken(asset).isCToken()) {
        groupVars[index].cTokenBalanceSum = vars.tokenDepositVal.add_(groupVars[index].cTokenBalanceSum);
        groupVars[index].cTokenBorrowSum = vars.tokenBorrowVal.add_(groupVars[index].cTokenBorrowSum);
      } else {
        groupVars[index].suTokenBalanceSum = vars.tokenDepositVal.add_(groupVars[index].suTokenBalanceSum);
        groupVars[index].suTokenBorrowSum = vars.tokenBorrowVal.add_(groupVars[index].suTokenBorrowSum);
      }
    }

    AccountGroupLocalVars memory targetGroup;
    AccountLiquidityLocalVars memory targetVars;
    for (uint8 i = 0; i < vars.equalAssetsGroupNum; ++i) {
      (, uint8 assetGroupId, ) = comptroller.markets(cTokenModify);
      if (groupVars[i].groupId == 0) {
        continue;
      }
      IComptroller.AssetGroup memory equalAssetsGroup = IComptroller(comptroller).getAssetGroup(groupVars[i].groupId);

      vars.intraCRate = Exp({mantissa: equalAssetsGroup.intraCRateMantissa});
      vars.intraMintRate = Exp({mantissa: equalAssetsGroup.intraMintRateMantissa});
      vars.intraSuRate = Exp({mantissa: equalAssetsGroup.intraSuRateMantissa});
      vars.interCRate = Exp({mantissa: equalAssetsGroup.interCRateMantissa});
      vars.interSuRate = Exp({mantissa: equalAssetsGroup.interSuRateMantissa});

      // absorb sutoken loan with ctoken collateral
      if (groupVars[i].suTokenBorrowSum > 0) {
        uint256 collateralizedLoan = vars.intraMintRate.mul_ScalarTruncate(groupVars[i].cTokenBalanceSum);
        if (groupVars[i].suTokenBorrowSum <= collateralizedLoan) {
          // collateral could cover the loan
          uint256 usedCollateral = groupVars[i].suTokenBorrowSum.div_(vars.intraMintRate);
          groupVars[i].cTokenBalanceSum = groupVars[i].cTokenBalanceSum.sub_(usedCollateral);
          groupVars[i].suTokenBorrowSum = 0;
        } else {
          // collateral could not cover the loan
          groupVars[i].suTokenBorrowSum = groupVars[i].suTokenBorrowSum.sub_(collateralizedLoan);
          groupVars[i].cTokenBalanceSum = 0;
        }
      }

      // absorb ctoken loan with ctoken collateral
      if (groupVars[i].cTokenBorrowSum > 0) {
        uint256 collateralizedLoan = vars.intraCRate.mul_ScalarTruncate(groupVars[i].cTokenBalanceSum);
        if (groupVars[i].cTokenBorrowSum <= collateralizedLoan) {
          // collateral could cover the loan
          uint256 usedCollateral = groupVars[i].cTokenBorrowSum.div_(vars.intraCRate);
          groupVars[i].cTokenBalanceSum = groupVars[i].cTokenBalanceSum.sub_(usedCollateral);
          groupVars[i].cTokenBorrowSum = 0;
        } else {
          // collateral could not cover the loan
          groupVars[i].cTokenBalanceSum = 0;
          groupVars[i].cTokenBorrowSum = groupVars[i].cTokenBorrowSum.sub_(collateralizedLoan);
        }
      }

      // absorb sutoken loan with sutoken collateral
      if (groupVars[i].suTokenBorrowSum > 0) {
        uint256 collateralizedLoan = vars.intraSuRate.mul_ScalarTruncate(groupVars[i].suTokenBalanceSum);
        if (groupVars[i].suTokenBorrowSum <= collateralizedLoan) {
          // collateral could cover the loan
          uint256 usedCollateral = groupVars[i].suTokenBorrowSum.div_(vars.intraSuRate);
          groupVars[i].suTokenBalanceSum = groupVars[i].suTokenBalanceSum.sub_(usedCollateral);
          groupVars[i].suTokenBorrowSum = 0;
        } else {
          // collateral could not cover the loan
          groupVars[i].suTokenBalanceSum = 0;
          groupVars[i].suTokenBorrowSum = groupVars[i].suTokenBorrowSum.sub_(collateralizedLoan);
        }
      }

      // absorb ctoken loan with sutoken collateral
      if (groupVars[i].cTokenBorrowSum > 0) {
        uint256 collateralizedLoan = vars.intraSuRate.mul_ScalarTruncate(groupVars[i].suTokenBalanceSum);
        if (groupVars[i].cTokenBorrowSum <= collateralizedLoan) {
          uint256 usedCollateral = groupVars[i].cTokenBorrowSum.div_(vars.intraSuRate);
          groupVars[i].suTokenBalanceSum = groupVars[i].suTokenBalanceSum.sub_(usedCollateral);
          groupVars[i].cTokenBorrowSum = 0;
        } else {
          groupVars[i].suTokenBalanceSum = 0;
          groupVars[i].cTokenBorrowSum = groupVars[i].cTokenBorrowSum.sub_(collateralizedLoan);
        }
      }

      if (groupVars[i].groupId == assetGroupId) {
        targetGroup = groupVars[i];
        targetVars = vars;
      } else {
        vars.sumCollateral = vars.interCRate.mul_ScalarTruncateAddUInt(
          groupVars[i].cTokenBalanceSum,
          vars.sumCollateral
        );
        vars.sumCollateral = vars.interSuRate.mul_ScalarTruncateAddUInt(
          groupVars[i].suTokenBalanceSum,
          vars.sumCollateral
        );
      }

      vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.add_(
        groupVars[i].cTokenBorrowSum.add_(groupVars[i].suTokenBorrowSum)
      );
    }

    // These are safe, as the underflow condition is checked first
    if (vars.sumCollateral > vars.sumBorrowPlusEffects) {
      vars.sumCollateral = vars.sumCollateral - vars.sumBorrowPlusEffects;
      vars.sumBorrowPlusEffects = 0;
    } else {
      vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects - vars.sumCollateral;
      vars.sumCollateral = 0;
    }

    if (vars.sumBorrowPlusEffects > 0) {
      uint256 collateralizedLoan = targetVars.interCRate.mul_ScalarTruncate(targetGroup.cTokenBalanceSum);
      if (collateralizedLoan > vars.sumBorrowPlusEffects) {
        targetGroup.cTokenBalanceSum = targetGroup.cTokenBalanceSum.sub_(
          vars.sumBorrowPlusEffects.div_(targetVars.interCRate)
        );
        vars.sumBorrowPlusEffects = 0;
      } else {
        vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.sub_(collateralizedLoan);
        targetGroup.cTokenBalanceSum = 0;
      }
    }

    if (vars.sumBorrowPlusEffects > 0) {
      uint256 collateralizedLoan = targetVars.interSuRate.mul_ScalarTruncate(targetGroup.suTokenBalanceSum);
      if (collateralizedLoan > vars.sumBorrowPlusEffects) {
        targetGroup.suTokenBalanceSum = targetGroup.suTokenBalanceSum.sub_(
          vars.sumBorrowPlusEffects.div_(targetVars.interSuRate)
        );
        vars.sumBorrowPlusEffects = 0;
      } else {
        vars.sumBorrowPlusEffects = vars.sumBorrowPlusEffects.sub_(collateralizedLoan);
        targetGroup.suTokenBalanceSum = 0;
      }
    }
    if (vars.isSuToken) {
      vars.sumCollateral = vars.intraMintRate.mul_ScalarTruncateAddUInt(
        targetGroup.cTokenBalanceSum,
        vars.sumCollateral
      );
    } else {
      vars.sumCollateral = vars.intraCRate.mul_ScalarTruncateAddUInt(targetGroup.cTokenBalanceSum, vars.sumCollateral);
    }
    vars.sumCollateral = vars.intraSuRate.mul_ScalarTruncateAddUInt(targetGroup.suTokenBalanceSum, vars.sumCollateral);

    if (vars.sumCollateral > vars.sumBorrowPlusEffects) {
      return (0, vars.sumCollateral - vars.sumBorrowPlusEffects, 0);
    } else {
      return (0, 0, vars.sumBorrowPlusEffects - vars.sumCollateral);
    }
  }
}
