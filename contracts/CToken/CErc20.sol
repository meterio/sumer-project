// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;
import './CToken.sol';
import './Interfaces/ICErc20.sol';
import '../utils/Initializable.sol';

/**
 * @title Compound's CErc20 Contract
 * @notice CTokens which wrap an EIP-20 underlying
 * @author Compound
 */
contract CErc20 is CToken, ICErc20, Initializable {
  /**
   * @notice Initialize the new money market
   * @param underlying_ The address of the underlying asset
   * @param comptroller_ The address of the Comptroller
   * @param interestRateModel_ The address of the interest rate model
   * @param initialExchangeRateMantissa_ The initial exchange rate, scaled by 1e18
   * @param name_ ERC-20 name of this token
   * @param symbol_ ERC-20 symbol of this token
   * @param decimals_ ERC-20 decimal precision of this token
   * @param admin Address of the administrator of this token
   */
  function initialize(
    address underlying_,
    address comptroller_,
    address interestRateModel_,
    uint256 initialExchangeRateMantissa_,
    string memory name_,
    string memory symbol_,
    uint8 decimals_,
    address payable admin
  ) public initializer{
    // CToken initialize does the bulk of the work
    super.initialize(
      comptroller_,
      interestRateModel_,
      initialExchangeRateMantissa_,
      name_,
      symbol_,
      decimals_,
      true,
      admin
    );

    isCEther = false;

    // Set underlying and sanity check it
    require(underlying_ != address(0), 'Address is Zero!');
    underlying = underlying_;
    // ICToken(underlying).totalSupply();
  }

  /*** User Interface ***/

  /**
   * @notice Sender supplies assets into the market and receives cTokens in exchange
   * @dev Accrues interest whether or not the operation succeeds, unless reverted
   * @param mintAmount The amount of the underlying asset to supply
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function mint(uint256 mintAmount) external override returns (uint256) {
    (uint256 err, ) = mintInternal(mintAmount);
    return err;
  }

  /**
   * @notice Sender redeems cTokens in exchange for the underlying asset
   * @dev Accrues interest whether or not the operation succeeds, unless reverted
   * @param redeemTokens The number of cTokens to redeem into underlying
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function redeem(uint256 redeemTokens) external override returns (uint256) {
    return redeemInternal(redeemTokens);
  }

  /**
   * @notice Sender redeems cTokens in exchange for a specified amount of underlying asset
   * @dev Accrues interest whether or not the operation succeeds, unless reverted
   * @param redeemAmount The amount of underlying to redeem
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function redeemUnderlying(uint256 redeemAmount) external override returns (uint256) {
    return redeemUnderlyingInternal(redeemAmount);
  }

  /**
   * @notice Sender borrows assets from the protocol to their own address
   * @param borrowAmount The amount of the underlying asset to borrow
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function borrow(uint256 borrowAmount) external override returns (uint256) {
    return borrowInternal(borrowAmount);
  }

  /**
   * @notice Sender repays their own borrow
   * @param repayAmount The amount to repay
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function repayBorrow(uint256 repayAmount) external override returns (uint256) {
    (uint256 err, ) = repayBorrowInternal(repayAmount);
    return err;
  }

  /**
   * @notice Sender repays a borrow belonging to borrower
   * @param borrower the account with the debt being payed off
   * @param repayAmount The amount to repay
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function repayBorrowBehalf(address borrower, uint256 repayAmount) external override returns (uint256) {
    (uint256 err, ) = repayBorrowBehalfInternal(borrower, repayAmount);
    return err;
  }

  /**
   * @notice The sender liquidates the borrowers collateral.
   *  The collateral seized is transferred to the liquidator.
   * @param borrower The borrower of this cToken to be liquidated
   * @param repayAmount The amount of the underlying borrowed asset to repay
   * @param cTokenCollateral The market in which to seize collateral from the borrower
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function liquidateBorrow(
    address borrower,
    uint256 repayAmount,
    address cTokenCollateral
  ) external override returns (uint256) {
    (uint256 err, ) = liquidateBorrowInternal(borrower, repayAmount, cTokenCollateral);
    return err;
  }

  /**
   * @notice A public function to sweep accidental ERC-20 transfers to this contract. Tokens are sent to admin (timelock)
   * @param token The address of the ERC-20 token to sweep
   */
  function sweepToken(address token) external override {
    require(address(token) != underlying, 'CErc20::sweepToken: can not sweep underlying token');
    uint256 underlyingBalanceBefore = ICToken(underlying).balanceOf(address(this));
    uint256 balance = ICToken(token).balanceOf(address(this));
    ICToken(token).transfer(admin, balance);
    uint256 underlyingBalanceAfter = ICToken(underlying).balanceOf(address(this));
    require(underlyingBalanceBefore == underlyingBalanceAfter, 'underlyingBalance error');
  }

  /**
   * @notice The sender adds to reserves.
   * @param addAmount The amount fo underlying token to add as reserves
   * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
   */
  function _addReserves(uint256 addAmount) external override returns (uint256) {
    return _addReservesInternal(addAmount);
  }

  /*** Safe Token ***/

  /**
   * @notice Gets balance of this contract in terms of the underlying
   * @dev This excludes the value of the current message, if any
   * @return The quantity of underlying tokens owned by this contract
   */
  function getCashPrior() internal view override virtual returns (uint256) {
    ICToken token = ICToken(underlying);
    return token.balanceOf(address(this));
  }

  /**
   * @dev Similar to EIP20 transfer, except it handles a False result from `transferFrom` and reverts in that case.
   *      This will revert due to insufficient balance or insufficient allowance.
   *      This function returns the actual amount received,
   *      which may be less than `amount` if there is a fee attached to the transfer.
   *
   *      Note: This wrapper safely handles non-standard ERC-20 tokens that do not return a value.
   *            See here: https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca
   */
  function doTransferIn(address from, uint256 amount) internal virtual override returns (uint256) {
    ICToken token = ICToken(underlying);
    uint256 balanceBefore = ICToken(underlying).balanceOf(address(this));
    token.transferFrom(from, address(this), amount);

    bool success;
    assembly {
      switch returndatasize()
      case 0 {
        // This is a non-standard ERC-20
        success := not(0) // set success to true
      }
      case 32 {
        // This is a compliant ERC-20
        returndatacopy(0, 0, 32)
        success := mload(0) // Set `success = returndata` of external call
      }
      default {
        // This is an excessively non-compliant ERC-20, revert.
        revert(0, 0)
      }
    }
    require(success, 'TOKEN_TRANSFER_IN_FAILED');

    // Calculate the amount that was *actually* transferred
    uint256 balanceAfter = ICToken(underlying).balanceOf(address(this));
    require(balanceAfter >= balanceBefore, 'TOKEN_TRANSFER_IN_OVERFLOW');
    return balanceAfter - balanceBefore; // underflow already checked above, just subtract
  }

  /**
   * @dev Similar to EIP20 transfer, except it handles a False success from `transfer` and returns an explanatory
   *      error code rather than reverting. If caller has not called checked protocol's balance, this may revert due to
   *      insufficient cash held in this contract. If caller has checked protocol's balance prior to this call, and verified
   *      it is >= amount, this should not revert in normal conditions.
   *
   *      Note: This wrapper safely handles non-standard ERC-20 tokens that do not return a value.
   *            See here: https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca
   */
  function doTransferOut(address payable to, uint256 amount) internal virtual override {
    ICToken token = ICToken(underlying);
    token.transfer(to, amount);

    bool success;
    assembly {
      switch returndatasize()
      case 0 {
        // This is a non-standard ERC-20
        success := not(0) // set success to true
      }
      case 32 {
        // This is a compliant ERC-20
        returndatacopy(0, 0, 32)
        success := mload(0) // Set `success = returndata` of external call
      }
      default {
        // This is an excessively non-compliant ERC-20, revert.
        revert(0, 0)
      }
    }
    require(success, 'TOKEN_TRANSFER_OUT_FAILED');
  }
}