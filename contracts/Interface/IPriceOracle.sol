// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IPriceOracle {
  /**
   * @notice Get the underlying price of a cToken asset
   * @param cToken The cToken to get the underlying price of
   * @return The underlying asset price mantissa (scaled by 1e18).
   *  Zero means the price is unavailable.
   */
  function getUnderlyingPrice(address cToken) external view returns (uint256);

  /**
   * @notice Get the underlying price of cToken asset (normalized)
   * = getUnderlyingPrice * (10 ** (18 - cToken.decimals))
   */
  function getUnderlyingPriceNormalized(address cToken_) external view returns (uint256);
}
