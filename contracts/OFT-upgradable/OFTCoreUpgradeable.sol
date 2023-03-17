// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import './interfaces/IOFTCoreUpgradeable.sol';
import './lzApp/NonblockingLzAppUpgradeable.sol';

abstract contract OFTCoreUpgradeable is Initializable, NonblockingLzAppUpgradeable, IOFTCoreUpgradeable {
  uint256 public constant NO_EXTRA_GAS = 0;
  uint256 public constant FUNCTION_TYPE_SEND = 1;
  bool public useCustomAdapterParams;

  event SetUseCustomAdapterParams(bool _useCustomAdapterParams);

  function __OFTCoreUpgradeable_init(address _endpoint) internal onlyInitializing {
    __OFTCoreUpgradeable_init_unchained(_endpoint);
  }

  function __OFTCoreUpgradeable_init_unchained(address _endpoint) internal onlyInitializing {
    __NonblockingLzAppUpgradeable_init_unchained(_endpoint);
  }

  function estimateSendFee(
    uint16 _dstChainId,
    bytes memory _toAddress,
    uint256 _amount,
    bool _useZro,
    bytes memory _adapterParams
  ) public view virtual override returns (uint256 nativeFee, uint256 zroFee) {
    // mock the payload for send()
    bytes memory payload = abi.encode(_toAddress, _amount);
    return lzEndpoint.estimateFees(_dstChainId, address(this), payload, _useZro, _adapterParams);
  }

  function sendFrom(
    address _from,
    uint16 _dstChainId,
    bytes memory _toAddress,
    uint256 _amount,
    address payable _refundAddress,
    address _zroPaymentAddress,
    bytes memory _adapterParams
  ) public payable virtual override {
    _send(_from, _dstChainId, _toAddress, _amount, _refundAddress, _zroPaymentAddress, _adapterParams);
  }

  function _nonblockingLzReceive(
    uint16 _srcChainId,
    bytes memory _srcAddress,
    uint64 _nonce,
    bytes memory _payload
  ) internal virtual override {
    // decode and load the toAddress
    (bytes memory toAddressBytes, uint256 amount) = abi.decode(_payload, (bytes, uint256));
    address toAddress;
    assembly {
      toAddress := mload(add(toAddressBytes, 20))
    }

    _creditTo(_srcChainId, toAddress, amount);

    emit ReceiveFromChain(_srcChainId, _srcAddress, toAddress, amount, _nonce);
  }

  function _send(
    address _from,
    uint16 _dstChainId,
    bytes memory _toAddress,
    uint256 _amount,
    address payable _refundAddress,
    address _zroPaymentAddress,
    bytes memory _adapterParams
  ) internal virtual {
    uint256 amount = _debitFrom(_from, _dstChainId, _toAddress, _amount);

    bytes memory payload = abi.encode(_toAddress, amount);
    if (useCustomAdapterParams) {
      _checkGasLimit(_dstChainId, FUNCTION_TYPE_SEND, _adapterParams, NO_EXTRA_GAS);
    } else {
      require(_adapterParams.length == 0, 'LzApp: _adapterParams must be empty.');
    }
    _lzSend(_dstChainId, payload, _refundAddress, _zroPaymentAddress, _adapterParams);

    uint64 nonce = lzEndpoint.getOutboundNonce(_dstChainId, address(this));
    emit SendToChain(_from, _dstChainId, _toAddress, amount, nonce);
  }

  function setUseCustomAdapterParams(bool _useCustomAdapterParams) external onlyAdmin {
    useCustomAdapterParams = _useCustomAdapterParams;
    emit SetUseCustomAdapterParams(_useCustomAdapterParams);
  }

  function _debitFrom(
    address _from,
    uint16 _dstChainId,
    bytes memory _toAddress,
    uint256 _amount
  ) internal virtual returns (uint256);

  function _creditTo(
    uint16 _srcChainId,
    address _toAddress,
    uint256 _amount
  ) internal virtual;

  /**
   * @dev This empty reserved space is put in place to allow future versions to add new
   * variables without shifting down storage in the inheritance chain.
   * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
   */
  uint256[50] private __gap;
}
