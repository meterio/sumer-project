pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

import "./PriceOracle.sol";

interface ChainlinkFeed {
    function decimals() external view returns (uint8);

    function latestAnswer() external view returns (uint256);
}

interface WitnetFeed {
    function lastPrice() external view returns (int256);
}

contract FeedPriceOracle is PriceOracle {
    struct FeedData {
        uint8 source; // 1 - chainlink feed, 2 - witnet router
        address addr; // feed address
        uint8 tokenDecimals; // token decimals
        uint8 feedDecimals; // feed decimals (only used in witnet)
    }

    address public owner;
    mapping(address => FeedData) public feeds; // cToken -> feed data
    mapping(address => uint256) public fixedPrices; // cToken -> price
    uint8 constant DECIMALS = 36;

    modifier onlyOwner() {
        require(msg.sender == owner, "ONLY OWNER");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address owner_) public onlyOwner {
        owner = owner_;
    }

    // TODO: name this setChainlinkFeed
    function setFeed(
        CToken cToken_,
        address feed_,
        uint8 tokenDecimals_
    ) public onlyOwner {
        feeds[address(cToken_)] = FeedData(uint8(1), feed_, tokenDecimals_, 0);
    }

    function setWitnetFeed(
        CToken cToken_,
        address feed_,
        uint8 tokenDecimals_,
        uint8 feedDecimals_
    ) public onlyOwner {
        feeds[address(cToken_)] = FeedData(
            uint8(2),
            feed_,
            tokenDecimals_,
            feedDecimals_
        );
    }

    function removeFeed(CToken cToken_) public onlyOwner {
        delete feeds[address(cToken_)];
    }

    function getFeed(CToken cToken_) public view returns (FeedData memory) {
        return feeds[address(cToken_)];
    }

    function setFixedPrice(CToken cToken_, uint256 price) public onlyOwner {
        fixedPrices[address(cToken_)] = price;
    }

    function removeFixedPrice(CToken cToken_) public onlyOwner {
        delete fixedPrices[address(cToken_)];
    }

    function getFixedPrice(CToken cToken_) public view returns (uint256) {
        return fixedPrices[address(cToken_)];
    }

    function getUnderlyingPrice(CToken cToken_) public view returns (uint256) {
        FeedData memory feed = feeds[address(cToken_)]; // gas savings
        if (feed.addr != address(0)) {
            if (feed.source == uint8(1)) {
                uint256 decimals = uint256(
                    DECIMALS -
                        feed.tokenDecimals -
                        ChainlinkFeed(feed.addr).decimals()
                );
                require(decimals <= DECIMALS, "DECIMAL UNDERFLOW");
                return ChainlinkFeed(feed.addr).latestAnswer() * (10**decimals);
            }
            if (feed.source == uint8(2)) {
                uint256 decimals = uint256(
                    DECIMALS - feed.tokenDecimals - feed.feedDecimals
                );
                require(decimals <= DECIMALS, "DECIMAL UNDERFLOW");
                uint256 _temp = uint256(WitnetFeed(feed.addr).lastPrice());
                return _temp * (10**decimals);
            }
        }

        return fixedPrices[address(cToken_)];
    }
}
