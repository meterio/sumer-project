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

  function getPriceUnsafe(bytes32 id) external view returns (PythStructs.Price memory price) {
    PythStructs.Price memory mtrgPrice = IPyth(mtrgFeed).getPriceUnsafe(feedId);
    uint256 stMTRGPerToken = IWstMTRG(wstMTRG).stMTRGPerToken();
    return
      PythStructs.Price({
        price: int64(int256((uint64(mtrgPrice.price) * stMTRGPerToken) / 1e18)),
        conf: mtrgPrice.conf,
        expo: mtrgPrice.expo,
        publishTime: mtrgPrice.publishTime
      });
  }
}
