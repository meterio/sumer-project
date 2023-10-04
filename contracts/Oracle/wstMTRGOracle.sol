// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import '@pythnetwork/pyth-sdk-solidity/IPyth.sol';

interface IWstMTRG {
  function stMTRGPerToken() external view returns (uint256);
}

contract wstMTRGOracle {
  address public immutable wstMTRG;
  address public immutable mtrgFeed;
  bytes32 public immutable feedId;

  constructor(address _wstMTRG, address _mtrgFeed, bytes32 _feedId) {
    wstMTRG = _wstMTRG;
    mtrgFeed = _mtrgFeed;
    feedId = _feedId;
  }

  function _price(PythStructs.Price memory mtrgPrice) private view returns (PythStructs.Price memory price) {
    uint256 stMTRGPerToken = IWstMTRG(wstMTRG).stMTRGPerToken();
    return
      PythStructs.Price({
        price: int64(int256((uint64(mtrgPrice.price) * stMTRGPerToken) / 1e18)),
        conf: mtrgPrice.conf,
        expo: mtrgPrice.expo,
        publishTime: mtrgPrice.publishTime
      });
  }

  function getPriceUnsafe(bytes32 id) external view returns (PythStructs.Price memory price) {
    PythStructs.Price memory mtrgPrice = IPyth(mtrgFeed).getPriceUnsafe(feedId);
    return _price(mtrgPrice);
  }

  function getValidTimePeriod() external view returns (uint validTimePeriod) {
    return IPyth(mtrgFeed).getValidTimePeriod();
  }

  function getPrice(bytes32 id) external view returns (PythStructs.Price memory price) {
    PythStructs.Price memory mtrgPrice = IPyth(mtrgFeed).getPrice(feedId);
    return _price(mtrgPrice);
  }

  function getEmaPrice(bytes32 id) external view returns (PythStructs.Price memory price) {
    PythStructs.Price memory mtrgPrice = IPyth(mtrgFeed).getEmaPrice(feedId);
    return _price(mtrgPrice);
  }

  function getPriceNoOlderThan(bytes32 id, uint age) external view returns (PythStructs.Price memory price) {
    PythStructs.Price memory mtrgPrice = IPyth(mtrgFeed).getPriceNoOlderThan(feedId, age);
    return _price(mtrgPrice);
  }

  function getEmaPriceUnsafe(bytes32 id) external view returns (PythStructs.Price memory price) {
    PythStructs.Price memory mtrgPrice = IPyth(mtrgFeed).getEmaPriceUnsafe(feedId);
    return _price(mtrgPrice);
  }

  function getEmaPriceNoOlderThan(bytes32 id, uint age) external view returns (PythStructs.Price memory price) {
    PythStructs.Price memory mtrgPrice = IPyth(mtrgFeed).getEmaPriceNoOlderThan(feedId, age);
    return _price(mtrgPrice);
  }
}
