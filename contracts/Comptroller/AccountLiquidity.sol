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
    uint8 assetsGroupNum = IComptroller(comptroller).getAssetGroupNum();
    AccountGroupLocalVars[] memory groupVars = new AccountGroupLocalVars[](assetsGroupNum);
    IComptroller.AssetGroup[] memory assetGroups = IComptroller(comptroller).getAllAssetGroup();

    uint256 sumCollateral = 0;
    uint256 sumBorrowPlusEffects = 0;
    for (uint256 i = 0; i < assetGroups.length; i++) {
      IComptroller.AssetGroup memory g = assetGroups[i];
      groupVars[i] = AccountGroupLocalVars(
        g.groupId,
        0,
        0,
        0,
        0,
        Exp({mantissa: g.intraCRateMantissa}),
        Exp({mantissa: g.intraMintRateMantissa}),
        Exp({mantissa: g.intraSuRateMantissa}),
        Exp({mantissa: g.interCRateMantissa}),
        Exp({mantissa: g.interSuRateMantissa})
      );
    }

    // For each asset the account is in
    address[] memory assets = comptroller.getAssetsIn(account);

    // loop through tokens to add deposit/borrow for ctoken/sutoken in each group
    for (uint256 i = 0; i < assets.length; ++i) {
      address asset = assets[i];
      uint256 depositVal = 0;
      uint256 borrowVal = 0;

      (, uint8 assetGroupId, ) = comptroller.markets(asset);
      (uint256 oErr, uint256 depositBalance, uint256 borrowBalance, uint256 exchangeRateMantissa) = ICToken(asset)
        .getAccountSnapshot(account);
      require(oErr == 0, 'snapshot error');

      // Get price of asset
      IPriceOracle oracle = IPriceOracle(comptroller.oracle());
      uint256 oraclePriceMantissa = oracle.getUnderlyingPrice(asset);
      require(oraclePriceMantissa > 0, 'price error');

      // normalize price for asset with unit of 1e(36-token decimal)
      Exp memory oraclePrice = Exp({mantissa: oraclePriceMantissa});
      uint8 decimals = ICToken(asset).decimals();
      if (decimals < 18) oraclePrice = oraclePrice.mul_(10 ** (18 - decimals));

      // Pre-compute a conversion factor from tokens -> USD (normalized price value)
      // tokensToDenom = oraclePrice * exchangeRate * discourntRate
      Exp memory exchangeRate = Exp({mantissa: exchangeRateMantissa});
      Exp memory discountRate = Exp({mantissa: ICToken(asset).getDiscountRate()});
      Exp memory tokensToDenom = exchangeRate.mul_(oraclePrice).mul_(discountRate);

      depositVal = tokensToDenom.mul_ScalarTruncateAddUInt(depositBalance, depositVal);
      borrowVal = oraclePrice.mul_ScalarTruncateAddUInt(borrowBalance, borrowVal);
      if (asset == cTokenModify) {
        uint256 redeemVal = tokensToDenom.mul_(redeemTokens).truncate();
        if (redeemVal <= depositVal) {
          // if redeemedVal <= depositVal, absorb it with deposits
          depositVal = depositVal.sub_(redeemVal);
          redeemVal = 0;
        } else {
          // if redeemVal > depositVal
          redeemVal = redeemVal.sub_(depositVal);
          borrowVal = borrowVal.add_(redeemVal);
          depositVal = 0;
        }

        borrowVal = oraclePrice.mul_ScalarTruncateAddUInt(borrowAmount, borrowVal);
      }

      uint8 index = comptroller.assetGroupIdToIndex(assetGroupId);

      if (ICToken(asset).isCToken()) {
        groupVars[index].cDepositVal = depositVal.add_(groupVars[index].cDepositVal);
        groupVars[index].cBorrowVal = borrowVal.add_(groupVars[index].cBorrowVal);
      } else {
        groupVars[index].suDepositVal = depositVal.add_(groupVars[index].suDepositVal);
        groupVars[index].suBorrowVal = borrowVal.add_(groupVars[index].suBorrowVal);
      }
    }
    // end of loop in assets

    AccountGroupLocalVars memory targetGroup;
    // loop in groups to calculate accumulated collateral/liability for two types:
    // inter-group and intra-group for target token
    (, uint8 targetGroupId, ) = comptroller.markets(cTokenModify);
    bool targetIsSuToken = false;
    if ((cTokenModify != address(0)) && !ICToken(cTokenModify).isCToken()) {
      targetIsSuToken = true;
    } else {
      targetIsSuToken = false;
    }

    for (uint8 i = 0; i < assetsGroupNum; ++i) {
      if (groupVars[i].groupId == 0) {
        continue;
      }
      AccountGroupLocalVars memory g = groupVars[i];

      // absorb sutoken loan with ctoken collateral
      if (g.suBorrowVal > 0) {
        (g.cDepositVal, g.suBorrowVal) = absorbLoan(g.cDepositVal, g.suBorrowVal, g.intraMintRate);
      }

      // absorb ctoken loan with ctoken collateral
      if (g.cBorrowVal > 0) {
        (g.cDepositVal, g.cBorrowVal) = absorbLoan(g.cDepositVal, g.cBorrowVal, g.intraCRate);
      }

      // absorb sutoken loan with sutoken collateral
      if (g.suBorrowVal > 0) {
        (g.suDepositVal, g.suBorrowVal) = absorbLoan(g.suDepositVal, g.suBorrowVal, g.intraSuRate);
      }

      // absorb ctoken loan with sutoken collateral
      if (g.cBorrowVal > 0) {
        (g.suDepositVal, g.cBorrowVal) = absorbLoan(g.suDepositVal, g.cBorrowVal, g.intraSuRate);
      }

      if (g.groupId == targetGroupId) {
        targetGroup = groupVars[i];
      } else {
        sumCollateral = g.interCRate.mul_ScalarTruncateAddUInt(g.cDepositVal, sumCollateral);
        sumCollateral = g.interSuRate.mul_ScalarTruncateAddUInt(g.suDepositVal, sumCollateral);
      }

      sumBorrowPlusEffects = sumBorrowPlusEffects.add_(g.cBorrowVal).add_(g.suBorrowVal);
    }
    // end of loop in groups

    // These are safe, as the underflow condition is checked first
    // absorb inter-group loan with inter-group collateral
    if (sumCollateral > sumBorrowPlusEffects) {
      sumCollateral = sumCollateral - sumBorrowPlusEffects;
      sumBorrowPlusEffects = 0;
    } else {
      sumBorrowPlusEffects = sumBorrowPlusEffects - sumCollateral;
      sumCollateral = 0;
    }

    // absorb inter group loan with target group ctoken collateral
    if (sumBorrowPlusEffects > 0) {
      (targetGroup.cDepositVal, sumBorrowPlusEffects) = absorbLoan(
        targetGroup.cDepositVal,
        sumBorrowPlusEffects,
        targetGroup.interCRate
      );
    }

    // absorb inter group loan with target group sutoken collateral
    if (sumBorrowPlusEffects > 0) {
      (targetGroup.suDepositVal, sumBorrowPlusEffects) = absorbLoan(
        targetGroup.suDepositVal,
        sumBorrowPlusEffects,
        targetGroup.interSuRate
      );
    }
    if (targetIsSuToken) {
      // if target is sutoken
      // limit = inter-group limit + intra ctoken collateral * intra mint rate
      sumCollateral = targetGroup.intraMintRate.mul_ScalarTruncateAddUInt(targetGroup.cDepositVal, sumCollateral);
    } else {
      // if target is not sutoken
      // limit = inter-group limit + intra ctoken collateral * intra c rate
      sumCollateral = targetGroup.intraCRate.mul_ScalarTruncateAddUInt(targetGroup.cDepositVal, sumCollateral);
    }

    // limit = inter-group limit + intra-group ctoken limit + intra sutoken collateral * intra su rate
    sumCollateral = targetGroup.intraSuRate.mul_ScalarTruncateAddUInt(targetGroup.suDepositVal, sumCollateral);

    if (sumCollateral > sumBorrowPlusEffects) {
      return (0, sumCollateral - sumBorrowPlusEffects, 0);
    } else {
      return (0, 0, sumBorrowPlusEffects - sumCollateral);
    }
  }

  function absorbLoan(
    uint256 collateralValue,
    uint256 borrowValue,
    Exp memory collateralRate
  ) internal pure returns (uint256, uint256) {
    require(collateralRate.mantissa > 0, 'collateral rate is 0');
    uint256 collateralizedLoan = collateralRate.mul_ScalarTruncate(collateralValue);
    uint256 usedCollateral = borrowValue.div_(collateralRate);
    uint256 newCollateralValue = 0;
    uint256 newBorrowValue = 0;
    if (collateralizedLoan > borrowValue) {
      newCollateralValue = collateralValue.sub_(usedCollateral);
    } else {
      newBorrowValue = borrowValue.sub_(collateralizedLoan);
    }
    return (newCollateralValue, newBorrowValue);
  }
}
