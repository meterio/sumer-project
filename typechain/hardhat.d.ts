/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AccessControlEnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlEnumerableUpgradeable__factory>;
    getContractFactory(
      name: "AccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlUpgradeable__factory>;
    getContractFactory(
      name: "IAccessControlEnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlEnumerableUpgradeable__factory>;
    getContractFactory(
      name: "IAccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "AccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: "AccessControlEnumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlEnumerable__factory>;
    getContractFactory(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControl__factory>;
    getContractFactory(
      name: "IAccessControlEnumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlEnumerable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Ownable2Step",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable2Step__factory>;
    getContractFactory(
      name: "IERC1822Proxiable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1822Proxiable__factory>;
    getContractFactory(
      name: "IBeacon",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeacon__factory>;
    getContractFactory(
      name: "ERC1967Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Proxy__factory>;
    getContractFactory(
      name: "ERC1967Upgrade",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Upgrade__factory>;
    getContractFactory(
      name: "Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Proxy__factory>;
    getContractFactory(
      name: "ProxyAdmin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ProxyAdmin__factory>;
    getContractFactory(
      name: "TransparentUpgradeableProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TransparentUpgradeableProxy__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "ERC20Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Burnable__factory>;
    getContractFactory(
      name: "ERC20Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Pausable__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC20PresetMinterPauser",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20PresetMinterPauser__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IPyth",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPyth__factory>;
    getContractFactory(
      name: "IPythEvents",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPythEvents__factory>;
    getContractFactory(
      name: "AccountLiquidity",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccountLiquidity__factory>;
    getContractFactory(
      name: "CompLogic",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CompLogic__factory>;
    getContractFactory(
      name: "CompoundLens",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CompoundLens__factory>;
    getContractFactory(
      name: "Comptroller",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Comptroller__factory>;
    getContractFactory(
      name: "IAccountLiquidity",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccountLiquidity__factory>;
    getContractFactory(
      name: "ICompLogic",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICompLogic__factory>;
    getContractFactory(
      name: "ComptrollerStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ComptrollerStorage__factory>;
    getContractFactory(
      name: "IComptroller",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IComptroller__factory>;
    getContractFactory(
      name: "ICToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICToken__factory>;
    getContractFactory(
      name: "IGovernorAlpha",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGovernorAlpha__factory>;
    getContractFactory(
      name: "IGovernorBravo",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGovernorBravo__factory>;
    getContractFactory(
      name: "IPriceOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPriceOracle__factory>;
    getContractFactory(
      name: "IUnitroller",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUnitroller__factory>;
    getContractFactory(
      name: "CErc20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CErc20__factory>;
    getContractFactory(
      name: "CEther",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CEther__factory>;
    getContractFactory(
      name: "CToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CToken__factory>;
    getContractFactory(
      name: "CTokenStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CTokenStorage__factory>;
    getContractFactory(
      name: "ICErc20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICErc20__factory>;
    getContractFactory(
      name: "ICToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICToken__factory>;
    getContractFactory(
      name: "IEIP20NonStandard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IEIP20NonStandard__factory>;
    getContractFactory(
      name: "IInterestRateModel",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IInterestRateModel__factory>;
    getContractFactory(
      name: "SuErc20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SuErc20__factory>;
    getContractFactory(
      name: "ErrorTest",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ErrorTest__factory>;
    getContractFactory(
      name: "TokenErrorReporter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TokenErrorReporter__factory>;
    getContractFactory(
      name: "ERC20MinterBurnerPauser",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20MinterBurnerPauser__factory>;
    getContractFactory(
      name: "BaseJumpRateModelV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseJumpRateModelV2__factory>;
    getContractFactory(
      name: "InterestRateModel",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.InterestRateModel__factory>;
    getContractFactory(
      name: "JumpRateModel",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.JumpRateModel__factory>;
    getContractFactory(
      name: "JumpRateModelV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.JumpRateModelV2__factory>;
    getContractFactory(
      name: "SuTokenRateModel",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SuTokenRateModel__factory>;
    getContractFactory(
      name: "WhitePaperInterestRateModel",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WhitePaperInterestRateModel__factory>;
    getContractFactory(
      name: "ZeroInterestRateModel",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ZeroInterestRateModel__factory>;
    getContractFactory(
      name: "ITimelock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ITimelock__factory>;
    getContractFactory(
      name: "Multicall2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Multicall2__factory>;
    getContractFactory(
      name: "FeedPriceOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FeedPriceOracle__factory>;
    getContractFactory(
      name: "IChainlinkFeed",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IChainlinkFeed__factory>;
    getContractFactory(
      name: "IStdReference",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStdReference__factory>;
    getContractFactory(
      name: "IWitnetFeed",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWitnetFeed__factory>;
    getContractFactory(
      name: "PriceOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PriceOracle__factory>;
    getContractFactory(
      name: "PythOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PythOracle__factory>;
    getContractFactory(
      name: "IWstMTRG",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWstMTRG__factory>;
    getContractFactory(
      name: "WstMTRGOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WstMTRGOracle__factory>;
    getContractFactory(
      name: "SumerProxyAdmin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SumerProxyAdmin__factory>;
    getContractFactory(
      name: "SumerProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SumerProxy__factory>;
    getContractFactory(
      name: "CommunalFarm",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CommunalFarm__factory>;
    getContractFactory(
      name: "FraxGaugeController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FraxGaugeController__factory>;
    getContractFactory(
      name: "VotingEscrow",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VotingEscrow__factory>;
    getContractFactory(
      name: "FraxGaugeFXSRewardsDistributor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FraxGaugeFXSRewardsDistributor__factory>;
    getContractFactory(
      name: "IFraxGaugeController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFraxGaugeController__factory>;
    getContractFactory(
      name: "IFraxGaugeFXSRewardsDistributor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFraxGaugeFXSRewardsDistributor__factory>;
    getContractFactory(
      name: "IUniswapV2Pair",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2Pair__factory>;
    getContractFactory(
      name: "StakingRewardsMultiGauge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakingRewardsMultiGauge__factory>;
    getContractFactory(
      name: "SmartWalletChecker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SmartWalletChecker__factory>;
    getContractFactory(
      name: "VeSumer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VeSumer__factory>;
    getContractFactory(
      name: "ICToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICToken__factory>;
    getContractFactory(
      name: "Timelock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Timelock__factory>;

    getContractAt(
      name: "AccessControlEnumerableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlEnumerableUpgradeable>;
    getContractAt(
      name: "AccessControlUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlUpgradeable>;
    getContractAt(
      name: "IAccessControlEnumerableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlEnumerableUpgradeable>;
    getContractAt(
      name: "IAccessControlUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "ERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: "IERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: "AccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControl>;
    getContractAt(
      name: "AccessControlEnumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlEnumerable>;
    getContractAt(
      name: "IAccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControl>;
    getContractAt(
      name: "IAccessControlEnumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlEnumerable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Ownable2Step",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable2Step>;
    getContractAt(
      name: "IERC1822Proxiable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822Proxiable>;
    getContractAt(
      name: "IBeacon",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeacon>;
    getContractAt(
      name: "ERC1967Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967Proxy>;
    getContractAt(
      name: "ERC1967Upgrade",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967Upgrade>;
    getContractAt(
      name: "Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Proxy>;
    getContractAt(
      name: "ProxyAdmin",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ProxyAdmin>;
    getContractAt(
      name: "TransparentUpgradeableProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TransparentUpgradeableProxy>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Permit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Permit>;
    getContractAt(
      name: "ERC20Burnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Burnable>;
    getContractAt(
      name: "ERC20Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Pausable>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC20PresetMinterPauser",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20PresetMinterPauser>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IPyth",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPyth>;
    getContractAt(
      name: "IPythEvents",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPythEvents>;
    getContractAt(
      name: "AccountLiquidity",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccountLiquidity>;
    getContractAt(
      name: "CompLogic",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CompLogic>;
    getContractAt(
      name: "CompoundLens",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CompoundLens>;
    getContractAt(
      name: "Comptroller",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Comptroller>;
    getContractAt(
      name: "IAccountLiquidity",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccountLiquidity>;
    getContractAt(
      name: "ICompLogic",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICompLogic>;
    getContractAt(
      name: "ComptrollerStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ComptrollerStorage>;
    getContractAt(
      name: "IComptroller",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IComptroller>;
    getContractAt(
      name: "ICToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICToken>;
    getContractAt(
      name: "IGovernorAlpha",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGovernorAlpha>;
    getContractAt(
      name: "IGovernorBravo",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGovernorBravo>;
    getContractAt(
      name: "IPriceOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPriceOracle>;
    getContractAt(
      name: "IUnitroller",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUnitroller>;
    getContractAt(
      name: "CErc20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CErc20>;
    getContractAt(
      name: "CEther",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CEther>;
    getContractAt(
      name: "CToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CToken>;
    getContractAt(
      name: "CTokenStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CTokenStorage>;
    getContractAt(
      name: "ICErc20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICErc20>;
    getContractAt(
      name: "ICToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICToken>;
    getContractAt(
      name: "IEIP20NonStandard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IEIP20NonStandard>;
    getContractAt(
      name: "IInterestRateModel",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IInterestRateModel>;
    getContractAt(
      name: "SuErc20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SuErc20>;
    getContractAt(
      name: "ErrorTest",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ErrorTest>;
    getContractAt(
      name: "TokenErrorReporter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TokenErrorReporter>;
    getContractAt(
      name: "ERC20MinterBurnerPauser",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20MinterBurnerPauser>;
    getContractAt(
      name: "BaseJumpRateModelV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseJumpRateModelV2>;
    getContractAt(
      name: "InterestRateModel",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.InterestRateModel>;
    getContractAt(
      name: "JumpRateModel",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.JumpRateModel>;
    getContractAt(
      name: "JumpRateModelV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.JumpRateModelV2>;
    getContractAt(
      name: "SuTokenRateModel",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SuTokenRateModel>;
    getContractAt(
      name: "WhitePaperInterestRateModel",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WhitePaperInterestRateModel>;
    getContractAt(
      name: "ZeroInterestRateModel",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ZeroInterestRateModel>;
    getContractAt(
      name: "ITimelock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ITimelock>;
    getContractAt(
      name: "Multicall2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Multicall2>;
    getContractAt(
      name: "FeedPriceOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FeedPriceOracle>;
    getContractAt(
      name: "IChainlinkFeed",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IChainlinkFeed>;
    getContractAt(
      name: "IStdReference",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStdReference>;
    getContractAt(
      name: "IWitnetFeed",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWitnetFeed>;
    getContractAt(
      name: "PriceOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PriceOracle>;
    getContractAt(
      name: "PythOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PythOracle>;
    getContractAt(
      name: "IWstMTRG",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWstMTRG>;
    getContractAt(
      name: "WstMTRGOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WstMTRGOracle>;
    getContractAt(
      name: "SumerProxyAdmin",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SumerProxyAdmin>;
    getContractAt(
      name: "SumerProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SumerProxy>;
    getContractAt(
      name: "CommunalFarm",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CommunalFarm>;
    getContractAt(
      name: "FraxGaugeController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FraxGaugeController>;
    getContractAt(
      name: "VotingEscrow",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VotingEscrow>;
    getContractAt(
      name: "FraxGaugeFXSRewardsDistributor",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FraxGaugeFXSRewardsDistributor>;
    getContractAt(
      name: "IFraxGaugeController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IFraxGaugeController>;
    getContractAt(
      name: "IFraxGaugeFXSRewardsDistributor",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IFraxGaugeFXSRewardsDistributor>;
    getContractAt(
      name: "IUniswapV2Pair",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2Pair>;
    getContractAt(
      name: "StakingRewardsMultiGauge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakingRewardsMultiGauge>;
    getContractAt(
      name: "SmartWalletChecker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SmartWalletChecker>;
    getContractAt(
      name: "VeSumer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VeSumer>;
    getContractAt(
      name: "ICToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICToken>;
    getContractAt(
      name: "Timelock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Timelock>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
