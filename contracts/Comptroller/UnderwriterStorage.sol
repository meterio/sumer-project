// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

pragma experimental ABIEncoderV2;
import './Interfaces/ICToken.sol';
import './Interfaces/IUnderwriterAdmin.sol';

contract UnderwriterStorage {
  /**
   * @notice Administrator for this contract
   */
  address public admin;
  address public governanceToken;

  uint256 public suTokenRateMantissa;

  /**
   * @notice eqAssetGroup, cToken -> equal assets info.
   */

  uint8 public equalAssetsGroupNum;
  /**
   * @notice eqAssetGroup, groupId -> equal assets info.
   */
  mapping(uint8 => IUnderwriterAdmin.AssetGroup) public eqAssetGroup;

  /**
   * @notice The Pause Guardian can pause certain actions as a safety mechanism.
   *  Actions which allow users to remove their own assets cannot be paused.
   *  Liquidation / seizing / transfer can only be paused globally, not by market.
   */
  address public pauseGuardian;
  bool public _mintGuardianPaused;
  bool public _borrowGuardianPaused;
  bool public transferGuardianPaused;
  bool public seizeGuardianPaused;
  mapping(address => bool) public mintGuardianPaused;
  mapping(address => bool) public borrowGuardianPaused;

  // @notice The borrowCapGuardian can set borrowCaps to any number for any market. Lowering the borrow cap could disable borrowing on the given market.
  address public borrowCapGuardian;

  // @notice Borrow caps enforced by borrowAllowed for each cToken address. Defaults to zero which corresponds to unlimited borrowing.
  mapping(address => uint256) public borrowCaps;
}
