// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import './FeedPriceOracle.sol';

contract FeedPriceOracleSafe is FeedPriceOracle {
  uint256 public validTimePeriod = 1800;

  function _getPythPrice(FeedData memory feed) internal view override returns (uint256) {
    (bool success, bytes memory message) = feed.addr.staticcall(
      abi.encodeWithSelector(IPyth.getPriceNoOlderThan.selector, feed.feedId, validTimePeriod)
    );
    require(success, 'pyth error!');
    (int64 price, , int32 expo, ) = (abi.decode(message, (int64, uint64, int32, uint256)));
    uint256 decimals = DECIMALS - uint32(expo * -1);
    require(decimals <= DECIMALS, 'DECIMAL UNDERFLOW');
    return uint64(price) * (10 ** decimals);
  }

  function setPythValidTimePeriod(uint256 _validTimePeriod) public onlyOwner {
    require(_validTimePeriod >= 60, 'validTimePeriod >= 60');
    validTimePeriod = _validTimePeriod;
  }
}
