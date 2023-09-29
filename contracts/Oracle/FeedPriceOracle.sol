// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import './PriceOracle.sol';
import './Interfaces/IStdReference.sol';
import './Interfaces/IWitnetFeed.sol';
import './Interfaces/IChainlinkFeed.sol';
import '@pythnetwork/pyth-sdk-solidity/IPyth.sol';

contract FeedPriceOracle is PriceOracle {
  struct FeedData {
    bytes32 feedId; // Pyth price feed ID
    uint8 source; // 1 - chainlink feed, 2 - witnet router, 3 - Band
    address addr; // feed address
    uint8 feedDecimals; // feed decimals (only used in witnet)
    string name;
  }

  address public owner;
  mapping(address => FeedData) public feeds; // cToken -> feed data
  mapping(address => uint256) public fixedPrices; // cToken -> price
  uint8 constant DECIMALS = 18;

  event SetFeed(address indexed cToken_, bytes32 feedId, uint8 source, address addr, uint8 feedDecimals, string name);

  modifier onlyOwner() {
    require(msg.sender == owner, 'ONLY OWNER');
    _;
  }

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address owner_) public onlyOwner {
    require(owner_ != address(0), 'Address is Zero!');
    owner = owner_;
  }

  function setChainlinkFeed(address cToken_, address feed_) public onlyOwner {
    _setFeed(cToken_, uint8(1), bytes32(0), feed_, 8, '');
  }

  function setWitnetFeed(address cToken_, address feed_, uint8 feedDecimals_) public onlyOwner {
    _setFeed(cToken_, uint8(2), bytes32(0), feed_, feedDecimals_, '');
  }

  function setBandFeed(address cToken_, address feed_, uint8 feedDecimals_, string memory name) public onlyOwner {
    _setFeed(cToken_, uint8(3), bytes32(0), feed_, feedDecimals_, name);
  }

  function setFixedPrice(address cToken_, uint256 price) public onlyOwner {
    fixedPrices[cToken_] = price;
  }

  function setPythFeed(address cToken_, bytes32 feedId, address addr, string memory name) public onlyOwner {
    _setFeed(cToken_, uint8(4), feedId, addr, 18, name);
  }

  function _setFeed(
    address cToken_,
    uint8 source,
    bytes32 feedId,
    address addr,
    uint8 feedDecimals,
    string memory name
  ) private {
    require(addr != address(0), 'Address is Zero!');
    if (feeds[cToken_].source != 0) {
      delete fixedPrices[cToken_];
    }
    FeedData memory feedData = FeedData({
      feedId: feedId,
      source: source,
      addr: addr,
      feedDecimals: feedDecimals,
      name: name
    });
    feeds[cToken_] = feedData;
    emit SetFeed(cToken_, feedId, source, addr, feedDecimals, name);
  }

  function removeFeed(address cToken_) public onlyOwner {
    delete feeds[cToken_];
  }

  function getFeed(address cToken_) public view returns (FeedData memory) {
    return feeds[cToken_];
  }

  function removeFixedPrice(address cToken_) public onlyOwner {
    delete fixedPrices[cToken_];
  }

  function getFixedPrice(address cToken_) public view returns (uint256) {
    return fixedPrices[cToken_];
  }

  function getUnderlyingPrice(address cToken_) public view override returns (uint256) {
    FeedData memory feed = feeds[cToken_]; // gas savings
    if (feed.addr != address(0)) {
      if (feed.source == uint8(1)) {
        uint256 decimals = uint256(DECIMALS - IChainlinkFeed(feed.addr).decimals());
        require(decimals <= DECIMALS, 'DECIMAL UNDERFLOW');
        (uint80 roundID, int256 answer, , uint256 updatedAt, uint80 answeredInRound) = IChainlinkFeed(feed.addr)
          .latestRoundData();
        require(answeredInRound >= roundID, 'Stale price');
        require(answer > 0, 'negative price');
        require(block.timestamp <= updatedAt + 86400, 'timeout');
        return uint256(answer) * (10 ** decimals);
      }
      if (feed.source == uint8(2)) {
        uint256 decimals = uint256(DECIMALS - feed.feedDecimals);
        require(decimals <= DECIMALS, 'DECIMAL UNDERFLOW');
        uint256 _temp = uint256(IWitnetFeed(feed.addr).lastPrice());
        return _temp * (10 ** decimals);
      }
      if (feed.source == uint8(3)) {
        uint256 decimals = uint256(DECIMALS - feed.feedDecimals);
        require(decimals <= DECIMALS, 'DECIMAL UNDERFLOW');
        IStdReference.ReferenceData memory refData = IStdReference(feed.addr).getReferenceData(feed.name, 'USD');
        return refData.rate * (10 ** decimals);
      }
      if (feed.source == uint8(4)) {
        PythStructs.Price memory price = IPyth(feed.addr).getPriceUnsafe(feed.feedId);
        uint256 decimals = DECIMALS - uint32(price.expo * -1);
        require(decimals <= DECIMALS, 'DECIMAL UNDERFLOW');
        return uint64(price.price) * (10 ** decimals);
      }
    }
    return fixedPrices[cToken_];
  }

  function getUnderlyingPrices(address[] memory cTokens) public view returns (uint256[] memory) {
    uint256 length = cTokens.length;
    uint256[] memory results = new uint256[](length);
    for (uint256 i; i < length; ++i) {
      results[i] = getUnderlyingPrice(cTokens[i]);
    }
    return results;
  }
}
