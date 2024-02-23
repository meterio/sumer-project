// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface ITimelock {
  /** @notice Event emitted when a new time-lock agreement is created
   * @param beneficiary Beneficiary of the claimed agreement
   * @param agreementIndex Index of the created agreement
   * @param actionType Type of action for the time-lock
   * @param asset Address of the asset
   * @param amount  amount
   * @param beneficiary Address of the beneficiary
   * @param releaseTime Timestamp when the assets can be claimed
   */
  event AgreementCreated(
    address indexed beneficiary,
    uint256 indexed agreementIndex,
    address indexed asset,
    TimeLockActionType actionType,
    uint256 amount,
    uint256 releaseTime
  );

  /** @notice Event emitted when a time-lock agreement is claimed
   * @param beneficiary Beneficiary of the claimed agreement
   * @param agreementIndex Index of the claimed agreement
   * @param asset Address of the asset
   * @param actionType Type of action for the time-lock
   * @param amount amount
   * @param beneficiary Address of the beneficiary
   */
  event AgreementClaimed(
    address indexed beneficiary,
    uint256 indexed agreementIndex,
    address indexed asset,
    TimeLockActionType actionType,
    uint256 amount
  );

  /** @notice Event emitted when a time-lock agreement is frozen or unfrozen
   * @param beneficiary Beneficiary of affected agreement
   * @param agreementIndex Index of the affected agreement
   * @param value Indicates whether the agreement is frozen (true) or unfrozen (false)
   */
  event AgreementFrozen(address beneficiary, uint256 agreementIndex, bool value);

  /** @notice Event emitted when the entire TimeLock contract is frozen or unfrozen
   * @param value Indicates whether the contract is frozen (true) or unfrozen (false)
   */
  event TimeLockFrozen(bool value);

  /**
   * @dev Emitted during rescueERC20()
   * @param token The address of the token
   * @param to The address of the recipient
   * @param amount The amount being rescued
   **/
  event RescueERC20(address indexed token, address indexed to, uint256 amount);

  enum TimeLockActionType {
    BORROW,
    REDEEM
  }
  struct Agreement {
    TimeLockActionType actionType;
    bool isFrozen;
    address underlying;
    uint48 releaseTime;
    uint256 amount;
  }

  struct Underlying {
    bool isSupport;
    address cToken;
    uint48 lockDuration;
    uint256 totalBalance;
    uint256 threshold;
  }

  function createAgreement(
    TimeLockActionType actionType,
    address underlying,
    uint256 amount,
    address beneficiary
  ) external returns (uint256);

  function isSupport(address underlying) external view returns (bool);
  function overThreshold(
    address underlying,
    address oracle,
    uint256 usdValue,
    uint8 decimals
  ) external view returns (bool);
}
