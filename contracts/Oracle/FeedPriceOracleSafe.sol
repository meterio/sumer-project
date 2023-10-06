// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import './FeedPriceOracle.sol';

contract FeedPriceOracleSafe is FeedPriceOracle {
  function _getPythPrice(FeedData memory feed) internal view override returns (uint256) {
    PythStructs.Price memory price = IPyth(feed.addr).getPrice(feed.feedId);
    uint256 decimals = DECIMALS - uint32(price.expo * -1);
    require(decimals <= DECIMALS, 'DECIMAL UNDERFLOW');
    return uint64(price.price) * (10 ** decimals);
  }
}
