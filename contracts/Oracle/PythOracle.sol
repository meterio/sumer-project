// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
import '@pythnetwork/pyth-sdk-solidity/IPyth.sol';

contract PythOracle {
  bool public constant isPriceOracle = true;
  struct FeedData {
    bytes32 feedId; // Pyth price feed ID
    uint8 tokenDecimals; // token decimals
    address addr; // feed address
    string name;
  }

  address public owner;
  mapping(address => FeedData) public feeds; // cToken -> feed data
  mapping(address => uint256) public fixedPrices; // cToken -> price
  uint8 constant DECIMALS = 36;

  event SetFeed(address indexed cToken_, bytes32 feedId, address addr, string name);

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

  function setFixedPrice(address cToken_, uint256 price) public onlyOwner {
    fixedPrices[cToken_] = price;
  }

  function setFeedId(
    address cToken_,
    bytes32 feedId,
    address addr,
    uint8 tokenDecimals,
    string memory name
  ) public onlyOwner {
    _setFeed(cToken_, feedId, addr, tokenDecimals, name);
  }

  function _setFeed(address cToken_, bytes32 feedId, address addr, uint8 tokenDecimals, string memory name) private {
    require(addr != address(0), 'Address is Zero!');
    require(feedId != bytes32(0), 'feedId is Zero!');

    FeedData memory feedData = FeedData({feedId: feedId, addr: addr, tokenDecimals: tokenDecimals, name: name});
    feeds[cToken_] = feedData;
    emit SetFeed(cToken_, feedId, addr, name);
  }

  function removeFeed(address cToken_) public onlyOwner {
    delete feeds[cToken_];
  }

  function getFeed(address cToken_) public view returns (FeedData memory) {
    return feeds[cToken_];
  }

  function getFixedPrice(address cToken_) public view returns (uint256) {
    return fixedPrices[cToken_];
  }

  function removeFixedPrice(address cToken_) public onlyOwner {
    delete fixedPrices[cToken_];
  }

  function getUnderlyingPrice(address cToken_) public view returns (uint256) {
    if (fixedPrices[cToken_] > 0) {
      return fixedPrices[cToken_];
    } else {
      FeedData memory feed = feeds[cToken_]; // gas savings
      require(feed.feedId != bytes32(0), 'feedId not exist!');

      PythStructs.Price memory price = IPyth(feed.addr).getPriceUnsafe(feed.feedId);

      uint256 decimals = DECIMALS - feed.tokenDecimals - uint32(price.expo * -1);
      require(decimals <= DECIMALS, 'DECIMAL UNDERFLOW');
      return uint64(price.price) * (10 ** decimals);
    }
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
