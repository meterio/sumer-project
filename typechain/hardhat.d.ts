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
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "CompoundLens",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CompoundLens__factory>;
    getContractFactory(
      name: "Comptroller",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Comptroller__factory>;
    getContractFactory(
      name: "ComptrollerErrorReporter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ComptrollerErrorReporter__factory>;
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
      name: "IUnderwriterAdmin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUnderwriterAdmin__factory>;
    getContractFactory(
      name: "IUnitroller",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUnitroller__factory>;
    getContractFactory(
      name: "UnderwriterAdmin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UnderwriterAdmin__factory>;
    getContractFactory(
      name: "UnderwriterStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UnderwriterStorage__factory>;
    getContractFactory(
      name: "CDai",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CDai__factory>;
    getContractFactory(
      name: "DaiJoinLike",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DaiJoinLike__factory>;
    getContractFactory(
      name: "GemLike",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GemLike__factory>;
    getContractFactory(
      name: "PotLike",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PotLike__factory>;
    getContractFactory(
      name: "VatLike",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VatLike__factory>;
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
      name: "TokenErrorReporter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TokenErrorReporter__factory>;
    getContractFactory(
      name: "AccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Burnable__factory>;
    getContractFactory(
      name: "ERC20MinterBurnerPauser",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20MinterBurnerPauser__factory>;
    getContractFactory(
      name: "ERC20Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Pausable__factory>;
    getContractFactory(
      name: "ERC20PresetMinterPauser",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20PresetMinterPauser__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "BaseJumpRateModelV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseJumpRateModelV2__factory>;
    getContractFactory(
      name: "DAIInterestRateModelV3",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DAIInterestRateModelV3__factory>;
    getContractFactory(
      name: "JugLike",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.JugLike__factory>;
    getContractFactory(
      name: "PotLike",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PotLike__factory>;
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
      name: "BasedOFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BasedOFT__factory>;
    getContractFactory(
      name: "ILayerZeroEndpoint",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILayerZeroEndpoint__factory>;
    getContractFactory(
      name: "ILayerZeroReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILayerZeroReceiver__factory>;
    getContractFactory(
      name: "ILayerZeroUserApplicationConfig",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILayerZeroUserApplicationConfig__factory>;
    getContractFactory(
      name: "IOFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOFT__factory>;
    getContractFactory(
      name: "IOFTCore",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOFTCore__factory>;
    getContractFactory(
      name: "LzApp",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LzApp__factory>;
    getContractFactory(
      name: "NonblockingLzApp",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NonblockingLzApp__factory>;
    getContractFactory(
      name: "OFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OFT__factory>;
    getContractFactory(
      name: "OFTCore",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OFTCore__factory>;
    getContractFactory(
      name: "SumerOFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SumerOFT__factory>;
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
      name: "ERC1967Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Proxy__factory>;
    getContractFactory(
      name: "ERC1967Upgrade",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Upgrade__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
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
      name: "TransparentUpgradeableProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TransparentUpgradeableProxy__factory>;
    getContractFactory(
      name: "Multicall2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Multicall2__factory>;

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
      name: "ComptrollerErrorReporter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ComptrollerErrorReporter>;
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
      name: "IUnderwriterAdmin",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUnderwriterAdmin>;
    getContractAt(
      name: "IUnitroller",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUnitroller>;
    getContractAt(
      name: "UnderwriterAdmin",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UnderwriterAdmin>;
    getContractAt(
      name: "UnderwriterStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UnderwriterStorage>;
    getContractAt(
      name: "CDai",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CDai>;
    getContractAt(
      name: "DaiJoinLike",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DaiJoinLike>;
    getContractAt(
      name: "GemLike",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GemLike>;
    getContractAt(
      name: "PotLike",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PotLike>;
    getContractAt(
      name: "VatLike",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VatLike>;
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
      name: "TokenErrorReporter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TokenErrorReporter>;
    getContractAt(
      name: "AccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControl>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Burnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Burnable>;
    getContractAt(
      name: "ERC20MinterBurnerPauser",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20MinterBurnerPauser>;
    getContractAt(
      name: "ERC20Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Pausable>;
    getContractAt(
      name: "ERC20PresetMinterPauser",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20PresetMinterPauser>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "BaseJumpRateModelV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseJumpRateModelV2>;
    getContractAt(
      name: "DAIInterestRateModelV3",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DAIInterestRateModelV3>;
    getContractAt(
      name: "JugLike",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.JugLike>;
    getContractAt(
      name: "PotLike",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PotLike>;
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
      name: "BasedOFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BasedOFT>;
    getContractAt(
      name: "ILayerZeroEndpoint",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILayerZeroEndpoint>;
    getContractAt(
      name: "ILayerZeroReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILayerZeroReceiver>;
    getContractAt(
      name: "ILayerZeroUserApplicationConfig",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILayerZeroUserApplicationConfig>;
    getContractAt(
      name: "IOFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOFT>;
    getContractAt(
      name: "IOFTCore",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOFTCore>;
    getContractAt(
      name: "LzApp",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LzApp>;
    getContractAt(
      name: "NonblockingLzApp",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NonblockingLzApp>;
    getContractAt(
      name: "OFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OFT>;
    getContractAt(
      name: "OFTCore",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OFTCore>;
    getContractAt(
      name: "SumerOFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SumerOFT>;
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
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
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
      name: "TransparentUpgradeableProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TransparentUpgradeableProxy>;
    getContractAt(
      name: "Multicall2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Multicall2>;

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
