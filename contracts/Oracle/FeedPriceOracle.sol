// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import './PriceOracle.sol';
import './Interfaces/IStdReference.sol';
import './Interfaces/IWitnetFeed.sol';

contract FeedPriceOracle is PriceOracle {
  struct FeedData {
    uint8 source; // 1 - chainlink feed, 2 - witnet router, 3 - Band
    address addr; // feed address
    uint8 tokenDecimals; // token decimals
    uint8 feedDecimals; // feed decimals (only used in witnet)
    string name;
  }

  address public owner;
  mapping(address => FeedData) public feeds; // cToken -> feed data
  mapping(address => uint256) public fixedPrices; // cToken -> price
  uint8 constant DECIMALS = 36;

  event SetFeed(
    address indexed cToken_,
    uint8 source,
    address addr,
    uint8 tokenDecimals,
    uint8 feedDecimals,
    string name
  );

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

  // TODO: name this setChainlinkFeed
  function setChainlinkFeed(
    address cToken_,
    address feed_,
    uint8 tokenDecimals_
  ) public onlyOwner {
    _setFeed(cToken_, uint8(1), feed_, tokenDecimals_, 8, '');
  }

  function setWitnetFeed(
    address cToken_,
    address feed_,
    uint8 tokenDecimals_,
    uint8 feedDecimals_
  ) public onlyOwner {
    _setFeed(cToken_, uint8(2), feed_, tokenDecimals_, feedDecimals_, '');
  }

  function setBandFeed(
    address cToken_,
    address feed_,
    uint8 tokenDecimals_,
    uint8 feedDecimals_,
    string memory name
  ) public onlyOwner {
    _setFeed(cToken_, uint8(3), feed_, tokenDecimals_, feedDecimals_, name);
  }

  function setFixedPrice(address cToken_, uint256 price) public onlyOwner {
    fixedPrices[cToken_] = price;
  }

  function _setFeed(
    address cToken_,
    uint8 source,
    address addr,
    uint8 tokenDecimals,
    uint8 feedDecimals,
    string memory name
  ) private {
    require(addr != address(0), 'Address is Zero!');
    if (feeds[cToken_].source != 0) {
      delete fixedPrices[cToken_];
    }
    FeedData memory feedData = FeedData({
      source: source,
      addr: addr,
      tokenDecimals: tokenDecimals,
      feedDecimals: feedDecimals,
      name: name
    });
    feeds[cToken_] = feedData;
    emit SetFeed(cToken_, source, addr, tokenDecimals, feedDecimals, name);
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
      if (feed.source == uint8(2)) {
        uint256 decimals = uint256(DECIMALS - feed.tokenDecimals - feed.feedDecimals);
        require(decimals <= DECIMALS, 'DECIMAL UNDERFLOW');
        uint256 _temp = uint256(IWitnetFeed(feed.addr).lastPrice());
        return _temp * (10**decimals);
      }
      if (feed.source == uint8(3)) {
        uint256 decimals = uint256(DECIMALS - feed.tokenDecimals - feed.feedDecimals);
        require(decimals <= DECIMALS, 'DECIMAL UNDERFLOW');
        IStdReference.ReferenceData memory refData = IStdReference(feed.addr).getReferenceData(feed.name, 'USD');
        return refData.rate * (10**decimals);
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
