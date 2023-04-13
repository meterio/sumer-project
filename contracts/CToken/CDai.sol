// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import './CErc20.sol';

/**
 * @title Compound's CDai Contract
 * @notice CToken which wraps Multi-Collateral DAI
 * @author Compound
 */
contract CDai is CErc20 {
  /**
   * @notice DAI adapter address
   */
  address public daiJoinAddress;

  /**
   * @notice DAI Savings Rate (DSR) pot address
   */
  address public potAddress;

  /**
   * @notice DAI vat address
   */
  address public vatAddress;

  /**
   * @notice Explicit interface to become the implementation
   * @param daiJoinAddress_ DAI adapter address
   * @param potAddress_ DAI Savings Rate (DSR) pot address
   */
  function initialize(
    address daiJoinAddress_,
    address potAddress_,
    address comptroller_,
    address interestRateModel_,
    uint256 initialExchangeRateMantissa_,
    string memory name_,
    string memory symbol_,
    uint8 decimals_,
    address payable admin,
    uint256 discountRateMantissa_
  ) public {
    // Get dai and vat and sanity check the underlying
    DaiJoinLike daiJoin = DaiJoinLike(daiJoinAddress_);
    PotLike pot = PotLike(potAddress_);
    GemLike dai = daiJoin.dai();
    VatLike vat = daiJoin.vat();
    // CToken initialize does the bulk of the work
    super.initialize(
      address(dai),
      comptroller_,
      interestRateModel_,
      initialExchangeRateMantissa_,
      name_,
      symbol_,
      decimals_,
      admin,
      discountRateMantissa_
    );
    // Remember the relevant addresses
    daiJoinAddress = daiJoinAddress_;
    potAddress = potAddress_;
    vatAddress = address(vat);

    // Approve moving our DAI into the vat through daiJoin
    dai.approve(daiJoinAddress, uint256(0));

    // Approve the pot to transfer our funds within the vat
    vat.hope(potAddress);
    vat.hope(daiJoinAddress);

    // Accumulate DSR interest -- must do this in order to doTransferIn
    pot.drip();

    // Transfer all cash in (doTransferIn does this regardless of amount)
    doTransferIn(address(this), 0);
  }

  /**
   * @notice Delegate interface to resign the implementation
   */
  function _resignImplementation() public {
    require(msg.sender == admin, 'only the admin may abandon the implementation');

    // Transfer all cash out of the DSR - note that this relies on self-transfer
    DaiJoinLike daiJoin = DaiJoinLike(daiJoinAddress);
    PotLike pot = PotLike(potAddress);
    VatLike vat = VatLike(vatAddress);

    // Accumulate interest
    pot.drip();

    // Calculate the total amount in the pot, and move it out
    uint256 pie = pot.pie(address(this));
    pot.exit(pie);

    // Checks the actual balance of DAI in the vat after the pot exit
    uint256 bal = vat.dai(address(this));

    // Remove our whole balance
    daiJoin.exit(address(this), bal / RAY);
  }

  /*** CToken Overrides ***/

  /**
   * @notice Accrues DSR then applies accrued interest to total borrows and reserves
   * @dev This calculates interest accrued from the last checkpointed block
   *      up to the current block and writes new checkpoint to storage.
   */
  function accrueInterest() public override returns (uint256) {
    // Accumulate DSR interest
    PotLike(potAddress).drip();

    // Accumulate CToken interest
    return super.accrueInterest();
  }

  /*** Safe Token ***/

  /**
   * @notice Gets balance of this contract in terms of the underlying
   * @dev This excludes the value of the current message, if any
   * @return The quantity of underlying tokens owned by this contract
   */
  function getCashPrior() internal override view returns (uint256) {
    PotLike pot = PotLike(potAddress);
    uint256 pie = pot.pie(address(this));
    return mul(pot.chi(), pie) / RAY;
  }

  /**
   * @notice Transfer the underlying to this contract and sweep into DSR pot
   * @param from Address to transfer funds from
   * @param amount Amount of underlying to transfer
   * @return The actual amount that is transferred
   */
  function doTransferIn(address from, uint256 amount) internal override returns (uint256) {
    // Perform the EIP-20 transfer in
    ICToken token = ICToken(underlying);
    require(token.transferFrom(from, address(this), amount), 'unexpected EIP-20 transfer in return');

    DaiJoinLike daiJoin = DaiJoinLike(daiJoinAddress);
    GemLike dai = GemLike(underlying);
    PotLike pot = PotLike(potAddress);
    VatLike vat = VatLike(vatAddress);

    // Convert all our DAI to internal DAI in the vat
    daiJoin.join(address(this), dai.balanceOf(address(this)));

    // Checks the actual balance of DAI in the vat after the join
    uint256 bal = vat.dai(address(this));

    // Calculate the percentage increase to th pot for the entire vat, and move it in
    // Note: We may leave a tiny bit of DAI in the vat...but we do the whole thing every time
    uint256 pie = bal / pot.chi();
    pot.join(pie);

    return amount;
  }

  /**
   * @notice Transfer the underlying from this contract, after sweeping out of DSR pot
   * @param to Address to transfer funds to
   * @param amount Amount of underlying to transfer
   */
  function doTransferOut(address payable to, uint256 amount) internal override {
    DaiJoinLike daiJoin = DaiJoinLike(daiJoinAddress);
    PotLike pot = PotLike(potAddress);

    // Calculate the percentage decrease from the pot, and move that much out
    // Note: Use a slightly larger pie size to ensure that we get at least amount in the vat
    uint256 pie = add(mul(amount, RAY) / pot.chi(), 1);
    pot.exit(pie);

    daiJoin.exit(to, amount);
  }

  /*** Maker Internals ***/

  uint256 constant RAY = 10**27;

  function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
    require((z = x + y) >= x, 'add-overflow');
  }

  function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
    require(y == 0 || (z = x * y) / y == x, 'mul-overflow');
  }
}

/*** Maker Interfaces ***/

interface PotLike {
  function chi() external view returns (uint256);

  function pie(address) external view returns (uint256);

  function drip() external returns (uint256);

  function join(uint256) external;

  function exit(uint256) external;
}

interface GemLike {
  function approve(address, uint256) external;

  function balanceOf(address) external view returns (uint256);

  function transferFrom(
    address,
    address,
    uint256
  ) external returns (bool);
}

interface VatLike {
  function dai(address) external view returns (uint256);

  function hope(address) external;
}

interface DaiJoinLike {
  function vat() external returns (VatLike);

  function dai() external returns (GemLike);

  function join(address, uint256) external payable;

  function exit(address, uint256) external;
}
