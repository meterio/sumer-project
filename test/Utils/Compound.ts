import { Fixture } from "ethereum-waffle";
import { ethers, waffle } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import {
  SimplePriceOracle,
  Unitroller,
  Comptroller,
  ComptrollerHarness,
  Comp,
  InterestRateModel,
  PriceOracle,
  ERC20Harness,
  CToken,
  CErc20Storage,
  CErc20Harness,
  UnderwriterAdmin,
  CErc20Delegator
} from "../../typechain-types";
import { BigNumber, utils, Wallet, Contract, constants } from "ethers";
import { encodeParameters, expandTo18Decimals, etherMantissa } from './Ethereum'


export const makeToken = async (
  kind: string = 'erc20',
  quantity: BigNumber = BigNumber.from('10000000000000000000000000'),
  decimals: BigNumber = BigNumber.from(18),
  symbol: string = 'OMG',
  name: string = 'Erc20',
): Promise<ERC20Harness> => {
  return await deploy('ERC20Harness', [quantity, name, decimals, symbol]) as ERC20Harness;
}

const deploy = async (name: string, args: any[] = []): Promise<Contract> => {
  return await (
    await ethers.getContractFactory(name)
  ).deploy(...args)
}


export async function makeInterestRateModel(wallet: Wallet, kind: string = 'harnessed') {

  if (kind == 'false-marker') {
    const borrowRate = etherMantissa(0);
    return await deploy('FalseMarkerMethodInterestRateModel', [borrowRate]) as InterestRateModel;
  } else if (kind == 'white-paper') {
    const baseRate = etherMantissa(0);
    const multiplier = etherMantissa(1e-18);
    return await deploy('WhitePaperInterestRateModel', [baseRate, multiplier]) as InterestRateModel;
  } else if (kind == 'jump-rate') {
    const baseRate = etherMantissa(0);
    const multiplier = etherMantissa(1e-18);
    const jump = etherMantissa(0);
    const kink = etherMantissa(0);
    return await deploy('JumpRateModel', [baseRate, multiplier, jump, kink]) as InterestRateModel;
  } else {
    const borrowRate = etherMantissa(0);
    return await deploy('InterestRateModelHarness', [borrowRate]) as InterestRateModel;
  }
}

export const makePriceOracle = async (kind: string = 'simple'): Promise<SimplePriceOracle> => {
  return await deploy('SimplePriceOracle') as SimplePriceOracle;
};

export async function makeComptroller(wallet: Wallet, kind: string = 'unitroller'): Promise<Comptroller> {
  if (kind == 'bool') {
    return await deploy('BoolComptroller') as Comptroller;
  } else if (kind == 'false-marker') {
    return await deploy('FalseMarkerMethodComptroller') as Comptroller;
  } else if (kind == 'v1-no-proxy') {
    const comptroller = await deploy('ComptrollerHarness') as Comptroller;
    const priceOracle = await makePriceOracle();
    const closeFactor = etherMantissa(.051);

    await comptroller._setCloseFactor(closeFactor)
    await comptroller._setPriceOracle(priceOracle.address)

    return comptroller;
  } else {
    const unitroller = await deploy('Unitroller') as Unitroller;
    const comptrollerHarness = await deploy('ComptrollerHarness')
    const priceOracle = await makePriceOracle();
    const closeFactor = etherMantissa(.051);
    const liquidationIncentive = etherMantissa(1);
    const comp = await deploy('Comp', [wallet.address]);
    const compRate = expandTo18Decimals(1);

    await unitroller._setPendingImplementation(comptrollerHarness.address)
    await comptrollerHarness._become(unitroller.address)
    const comptroller = await ethers.getContractAt("ComptrollerHarness", unitroller.address) as ComptrollerHarness;
    await comptroller._setLiquidationIncentive(liquidationIncentive)
    await comptroller._setCloseFactor(closeFactor)
    await comptroller._setPriceOracle(priceOracle.address)
    await comptroller.setCompAddress(comp.address) // harness only
    await comptroller.harnessSetCompRate(compRate)

    return comptroller;
  }
}

export async function makeCToken(wallet: Wallet, kind: string = 'erc20', opt: string = '', _comptroller: string = '', underlyingPrice: number = 0) {
  const comptroller = _comptroller == '' ? await makeComptroller(wallet) as Comptroller : await ethers.getContractAt("Comptroller", _comptroller);
  const interestRateModel = await makeInterestRateModel(wallet);
  const exchangeRate = etherMantissa(1);
  const decimals = BigNumber.from(8);
  const symbol = (kind === 'cether' ? 'cETH' : 'cOMG');
  const name = `CToken ${symbol}`;
  const admin = wallet.address;

  const comp = await deploy('Comp', [wallet.address]);
  const uwAdmin = await deploy('UnderwriterAdmin', [
    comp.address,
  ]) as UnderwriterAdmin;

  await comptroller._setUnderWriterAdmin(uwAdmin.address);

  let cToken: CToken, underlying: Contract;
  let cDelegator: Contract, cDelegatee: Contract, cDaiMaker: Contract;

  switch (kind) {
    case 'cether':
      cToken = await deploy('CEtherHarness',
        [
          comptroller.address,
          interestRateModel.address,
          exchangeRate,
          name,
          symbol,
          decimals,
          admin
        ]) as CToken
      break;

    case 'cdai':
      cDaiMaker = await deploy('CDaiDelegateMakerHarness');
      underlying = cDaiMaker;
      cDelegatee = await deploy('CDaiDelegateHarness');
      cDelegator = await deploy('CErc20Delegator',
        [
          underlying.address,
          comptroller.address,
          interestRateModel.address,
          exchangeRate,
          name,
          symbol,
          decimals,
          admin,
          cDelegatee.address,
          encodeParameters(['address', 'address'], [cDaiMaker.address, cDaiMaker.address])
        ]
      );
      cToken = await ethers.getContractAt('CToken', cDelegator.address) as CToken;
      break;

    case 'ccomp':
      underlying = await deploy('Comp', [wallet.address]);
      cDelegatee = await deploy('CErc20DelegateHarness');
      cDelegator = await deploy('CErc20Delegator',
        [
          underlying.address,
          comptroller.address,
          interestRateModel.address,
          exchangeRate,
          name,
          symbol,
          decimals,
          admin,
          cDelegatee.address,
          constants.HashZero
        ]
      );
      cToken = await ethers.getContractAt('CToken', cDelegator.address) as CToken;
      break;

    case 'cerc20':
    default:
      underlying = await makeToken();
      cDelegatee = await deploy('CErc20DelegateHarness');
      cDelegator = await deploy('CErc20Delegator',
        [
          underlying.address,
          comptroller.address,
          interestRateModel.address,
          exchangeRate,
          name,
          symbol,
          decimals,
          admin,
          cDelegatee.address,
          constants.HashZero
        ]
      );
      cToken = await ethers.getContractAt('CToken', cDelegator.address) as CToken;
      break;

  }

  if (opt == 'supportMarket') {
    await comptroller._supportMarket(cToken.address, 0)
  }

  if (underlyingPrice != 0) {
    const price = etherMantissa(underlyingPrice);
    const priceOracle = await ethers.getContractAt("SimplePriceOracle", await comptroller.oracle()) as SimplePriceOracle;
    await priceOracle.setUnderlyingPrice(cToken.address, price);
  }

  return cToken;
}
const Error = [
  "NO_ERROR",
  "UNAUTHORIZED",
  "COMPTROLLER_MISMATCH",
  "INSUFFICIENT_SHORTFALL",
  "INSUFFICIENT_LIQUIDITY",
  "INVALID_CLOSE_FACTOR",
  "INVALID_COLLATERAL_FACTOR",
  "INVALID_LIQUIDATION_INCENTIVE",
  "MARKET_NOT_ENTERED",
  "MARKET_NOT_LISTED",
  "MARKET_ALREADY_LISTED",
  "MATH_ERROR",
  "NONZERO_BORROW_BALANCE",
  "PRICE_ERROR",
  "REJECTION",
  "SNAPSHOT_ERROR",
  "TOO_MANY_ASSETS",
  "TOO_MUCH_REPAY"
]

const FailureInfo = [
  "ACCEPT_ADMIN_PENDING_ADMIN_CHECK",
  "ACCEPT_PENDING_IMPLEMENTATION_ADDRESS_CHECK",
  "EXIT_MARKET_BALANCE_OWED",
  "EXIT_MARKET_REJECTION",
  "SET_CLOSE_FACTOR_OWNER_CHECK",
  "SET_CLOSE_FACTOR_VALIDATION",
  "SET_COLLATERAL_FACTOR_OWNER_CHECK",
  "SET_COLLATERAL_FACTOR_NO_EXISTS",
  "SET_COLLATERAL_FACTOR_VALIDATION",
  "SET_COLLATERAL_FACTOR_WITHOUT_PRICE",
  "SET_IMPLEMENTATION_OWNER_CHECK",
  "SET_LIQUIDATION_INCENTIVE_OWNER_CHECK",
  "SET_LIQUIDATION_INCENTIVE_VALIDATION",
  "SET_MAX_ASSETS_OWNER_CHECK",
  "SET_PENDING_ADMIN_OWNER_CHECK",
  "SET_PENDING_IMPLEMENTATION_OWNER_CHECK",
  "SET_PRICE_ORACLE_OWNER_CHECK",
  "SUPPORT_MARKET_EXISTS",
  "SUPPORT_MARKET_OWNER_CHECK",
  "SET_PAUSE_GUARDIAN_OWNER_CHECK",
  "SET_EQUAL_ASSET_GROUP_OWNER_CHECK"
]

export function error(code: string): BigNumber | undefined {
  for (let i = 0; i < Error.length; i++) {
    if (Error[i] == code)
      return BigNumber.from(i);
  }
}
export function failureInfo(code: string): BigNumber | undefined {
  for (let i = 0; i < FailureInfo.length; i++) {
    if (FailureInfo[i] == code)
      return BigNumber.from(i);
  }
}

export async function enterMarkets(cTokens: CToken[], from: Wallet) {
  const comptroller = await ethers.getContractAt("Comptroller", await cTokens[0].comptroller()) as Comptroller;
  let receipt = await comptroller.connect(from).enterMarkets(cTokens.map(c => c.address));
  return receipt;
}

export async function preApprove(cToken: CErc20Storage, from: Wallet, amount: BigNumber, faucet = false) {
  const underlying = await ethers.getContractAt("CErc20Harness", await cToken.underlying()) as CErc20Harness;
  if (faucet == true) {
    await underlying.connect(from).harnessSetBalance(from.address, amount);
  }
  return await underlying.connect(from).approve(cToken.address, amount);
}

export async function fastForward(cToken: CErc20Harness, blocks = 5) {
  return await cToken.harnessFastForward(blocks);
}
export async function quickMint(cToken: CErc20Harness, minter: Wallet, mintAmount: BigNumber, approve = true, exchangeRate = 0) {
  // make sure to accrue interest
  await fastForward(cToken, 1);

  if (approve == true) {
    await preApprove(cToken, minter, mintAmount, true);
  }
  if (exchangeRate != 0) {
    await cToken.harnessSetExchangeRate(etherMantissa(exchangeRate));
  }
  // const underlying = await ethers.getContractAt("CErc20Harness", await cToken.underlying()) as CErc20Harness;
  // await underlying.transfer(minter.address,mintAmount);
  return cToken.connect(minter).mint(mintAmount);
}