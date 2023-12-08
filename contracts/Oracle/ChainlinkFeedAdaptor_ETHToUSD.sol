// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import './Interfaces/IChainlinkFeed.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract ChainlinkFeedAdaptor_ETHToUSD is Initializable {
  using SafeMath for uint256;
  address public tokenFeed;
  address public ethFeed;
  uint256 public outDecimals;

  function initialize(address _tokenFeed, address _ethFeed) public initializer {
    tokenFeed = _tokenFeed;
    ethFeed = _ethFeed;
    outDecimals = 8;
  }

  function latestRoundData()
    public
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
  {
    uint256 tokenDecimals = IChainlinkFeed(tokenFeed).decimals();
    (
      uint80 tokenRoundID,
      int256 tokenAnswer,
      uint256 tokenStartedAt,
      uint256 tokenUpdatedAt,
      uint80 tokenAnsweredInRound
    ) = IChainlinkFeed(tokenFeed).latestRoundData();
    require(tokenAnsweredInRound >= tokenRoundID, 'Token Stale price');
    require(tokenAnswer > 0, 'negative price');
    require(block.timestamp <= tokenUpdatedAt + 86400, 'timeout');

    uint256 ethDecimals = IChainlinkFeed(ethFeed).decimals();
    (uint80 ethRoundID, int256 ethAnswer, , uint256 ethUpdatedAt, uint80 ethAnsweredInRound) = IChainlinkFeed(ethFeed)
      .latestRoundData();
    require(ethAnsweredInRound >= ethRoundID, 'ETH Stale price');
    require(ethAnswer > 0, 'negative price');
    require(block.timestamp <= ethUpdatedAt + 86400, 'timeout');

    int256 usdBasedAnswer = int256((uint256(tokenAnswer) * uint256(ethAnswer)));
    if (ethDecimals + tokenDecimals > outDecimals) {
      usdBasedAnswer = int256(uint256(usdBasedAnswer).div(10 ** (ethDecimals + tokenDecimals - outDecimals)));
    } else if (ethDecimals + tokenDecimals < outDecimals) {
      usdBasedAnswer = int256(uint256(usdBasedAnswer).mul(10 ** (outDecimals - ethDecimals - tokenDecimals)));
    }
    return (tokenRoundID, usdBasedAnswer, tokenStartedAt, tokenUpdatedAt, tokenAnsweredInRound);
  }

  function latestRoundDataETH()
    public
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
  {
    (roundId, answer, startedAt, updatedAt, answeredInRound) = IChainlinkFeed(ethFeed).latestRoundData();
    require(answeredInRound >= roundId, 'ETH Stale price');
    require(answer > 0, 'negative price');
    require(block.timestamp <= updatedAt + 86400, 'timeout');
    return (roundId, answer, startedAt, updatedAt, answeredInRound);
  }

  function latestRoundDataToken()
    public
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
  {
    (roundId, answer, startedAt, updatedAt, answeredInRound) = IChainlinkFeed(tokenFeed).latestRoundData();
    require(answeredInRound >= roundId, 'Token Stale price');
    require(answer > 0, 'negative price');
    require(block.timestamp <= updatedAt + 86400, 'timeout');
    return (roundId, answer, startedAt, updatedAt, answeredInRound);
  }

  function decimals() public view returns (uint256) {
    return outDecimals;
  }
}
