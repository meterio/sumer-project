// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./interface/IFactory.sol";
import "./VoltPair.sol";

contract VoltFactory is IFactory {
    bool public override isPaused;
    address public pauser;
    address public pendingPauser;
    address public override treasury;

    mapping(address => mapping(address => mapping(bool => address)))
        public
        override getPair;
    address[] public allPairs;
    /// @dev Simplified check if its a pair, given that `stable` flag might not be available in peripherals
    mapping(address => bool) public override isPair;

    address internal _temp0;
    address internal _temp1;
    bool internal _temp;

    event PairCreated(
        address indexed token0,
        address indexed token1,
        bool stable,
        address pair,
        uint allPairsLength
    );

    constructor() {
        pauser = msg.sender;
        isPaused = false;
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function setPauser(address _pauser) external {
        require(msg.sender == pauser, "VoltFactory: Not pauser");
        pendingPauser = _pauser;
    }

    function acceptPauser() external {
        require(msg.sender == pendingPauser, "VoltFactory: Not pending pauser");
        pauser = pendingPauser;
    }

    function setPause(bool _state) external {
        require(msg.sender == pauser, "VoltFactory: Not pauser");
        isPaused = _state;
    }

    function setTreasury(address _treasury) external {
        require(msg.sender == pauser, "VoltFactory: Not pauser");
        treasury = _treasury;
    }

    function pairCodeHash() external pure override returns (bytes32) {
        return keccak256(type(VoltPair).creationCode);
    }

    function getInitializable()
        external
        view
        override
        returns (
            address,
            address,
            bool
        )
    {
        return (_temp0, _temp1, _temp);
    }

    function createPair(
        address tokenA,
        address tokenB,
        bool stable
    ) external override returns (address pair) {
        require(tokenA != tokenB, "VoltFactory: IDENTICAL_ADDRESSES");
        (address token0, address token1) = tokenA < tokenB
            ? (tokenA, tokenB)
            : (tokenB, tokenA);
        require(token0 != address(0), "VoltFactory: ZERO_ADDRESS");
        require(
            getPair[token0][token1][stable] == address(0),
            "VoltFactory: PAIR_EXISTS"
        );
        // notice salt includes stable as well, 3 parameters
        bytes32 salt = keccak256(abi.encodePacked(token0, token1, stable));
        (_temp0, _temp1, _temp) = (token0, token1, stable);
        pair = address(new VoltPair{salt: salt}());
        getPair[token0][token1][stable] = pair;
        // populate mapping in the reverse direction
        getPair[token1][token0][stable] = pair;
        allPairs.push(pair);
        isPair[pair] = true;
        emit PairCreated(token0, token1, stable, pair, allPairs.length);
    }
}
