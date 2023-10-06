// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import './FeedPriceOracle.sol';
import './Interfaces/ILpOracle.sol';

interface IVoltPair {
  function metadata() external view returns (uint dec0, uint dec1, uint r0, uint r1, bool st, address t0, address t1);

  function token0() external view returns (address);

  function token1() external view returns (address);
}

contract LpOracle is ILpOracle, Ownable2Step, FeedPriceOracle {
  function getPrice(address lpToken) public view returns (uint256) {
    (, , , , , address token0, address token1) = IVoltPair(lpToken).metadata();

    uint256 _balance0 = IERC20(token0).balanceOf(lpToken);
    uint256 _balance1 = IERC20(token1).balanceOf(lpToken);

    uint8 decimals0 = IERC20Metadata(token0).decimals();
    uint8 decimals1 = IERC20Metadata(token1).decimals();

    uint256 _totalSupply = IERC20(token1).totalSupply();
    uint256 amount0 = (_balance0 * 1e18) / _totalSupply;
    uint256 amount1 = (_balance1 * 1e18) / _totalSupply;

    uint256 price0 = getUnderlyingPrice(token0);
    uint256 price1 = getUnderlyingPrice(token1);

    if (decimals0 < 18) amount1 = amount0 * (10 ** (18 - decimals0));
    if (decimals1 < 18) amount1 = amount1 * (10 ** (18 - decimals1));
    return (amount0 * price0) / 1e18 + (amount1 * price1) / 1e18;
  }
}
