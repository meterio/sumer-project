pragma solidity ^0.5.16;

/**
  * @title  Token
  * @author Sumer
  */
contract TokenStorage {

    /**
     * @dev Possible error codes that we can return
     */
    enum TokenType {
        INVALID_TOKEN,
        SDR_TOKEN,
        SUMER_TOKEN
    }

    /**
     * @dev Guard variable for re-entrancy checks
     */
    bool internal _notEntered;

    /**
     * @notice EIP-20 token name for this token
     */
    string public name;

    /**
     * @notice EIP-20 token symbol for this token
     */
    string public symbol;

    /**
     * @notice EIP-20 token decimals for this token
     */
    uint8 public decimals;

    /**
     * demonstrat the type of token, i.e. sdrToken or suToken
     */
    TokenType public tokenType; 

}

contract TokenInterface is TokenStorage {
    // user API
    function isSdrToken() external returns (bool); 
    function isSuToken() external returns (bool);
}

contract Token is TokenInterface {
    function isSdrToken() external returns (bool) {
        return (this.tokenType == TokenType.SDR_TOKEN);
    }

    function isSuToken() external returns (bool) {
        return (this.tokenType == TokenType.SUMER_TOKEN);
    }
}