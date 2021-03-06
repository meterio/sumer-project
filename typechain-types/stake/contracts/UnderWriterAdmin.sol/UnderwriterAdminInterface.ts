/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../../common";

export declare namespace UnderwriterAdminInterface {
  export type EqualAssetsStruct = {
    groupId: BigNumberish;
    groupName: string;
    inGroupCTokenRateMantissa: BigNumberish;
    inGroupSuTokenRateMantissa: BigNumberish;
    interGroupCTokenRateMantissa: BigNumberish;
    interGroupSuTokenRateMantissa: BigNumberish;
  };

  export type EqualAssetsStructOutput = [
    number,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    groupId: number;
    groupName: string;
    inGroupCTokenRateMantissa: BigNumber;
    inGroupSuTokenRateMantissa: BigNumber;
    interGroupCTokenRateMantissa: BigNumber;
    interGroupSuTokenRateMantissa: BigNumber;
  };
}

export interface UnderwriterAdminInterfaceInterface extends utils.Interface {
  functions: {
    "_getBorrowCapGuardian()": FunctionFragment;
    "_getBorrowPaused(address)": FunctionFragment;
    "_getMarketBorrowCap(address)": FunctionFragment;
    "_getMintPaused(address)": FunctionFragment;
    "_getPauseGuardian()": FunctionFragment;
    "_getSeizePaused()": FunctionFragment;
    "_getSuTokenRateMantissa()": FunctionFragment;
    "_getTransferPaused()": FunctionFragment;
    "getCompAddress()": FunctionFragment;
    "getEqAssetGroup(uint8)": FunctionFragment;
    "getEqAssetGroupNum()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_getBorrowCapGuardian"
      | "_getBorrowPaused"
      | "_getMarketBorrowCap"
      | "_getMintPaused"
      | "_getPauseGuardian"
      | "_getSeizePaused"
      | "_getSuTokenRateMantissa"
      | "_getTransferPaused"
      | "getCompAddress"
      | "getEqAssetGroup"
      | "getEqAssetGroupNum"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_getBorrowCapGuardian",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getBorrowPaused",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getMarketBorrowCap",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getMintPaused",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getPauseGuardian",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getSeizePaused",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getSuTokenRateMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getTransferPaused",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCompAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEqAssetGroup",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getEqAssetGroupNum",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "_getBorrowCapGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getBorrowPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getMarketBorrowCap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getMintPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getPauseGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getSeizePaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getSuTokenRateMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getTransferPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCompAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEqAssetGroup",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEqAssetGroupNum",
    data: BytesLike
  ): Result;

  events: {};
}

export interface UnderwriterAdminInterface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: UnderwriterAdminInterfaceInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _getBorrowCapGuardian(overrides?: CallOverrides): Promise<[string]>;

    _getBorrowPaused(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _getMarketBorrowCap(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getMintPaused(
      cToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _getPauseGuardian(overrides?: CallOverrides): Promise<[string]>;

    _getSeizePaused(overrides?: CallOverrides): Promise<[boolean]>;

    _getSuTokenRateMantissa(overrides?: CallOverrides): Promise<[BigNumber]>;

    _getTransferPaused(overrides?: CallOverrides): Promise<[boolean]>;

    getCompAddress(overrides?: CallOverrides): Promise<[string]>;

    getEqAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[UnderwriterAdminInterface.EqualAssetsStructOutput]>;

    getEqAssetGroupNum(overrides?: CallOverrides): Promise<[number]>;
  };

  _getBorrowCapGuardian(overrides?: CallOverrides): Promise<string>;

  _getBorrowPaused(cToken: string, overrides?: CallOverrides): Promise<boolean>;

  _getMarketBorrowCap(
    cToken: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getMintPaused(
    cToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _getPauseGuardian(overrides?: CallOverrides): Promise<string>;

  _getSeizePaused(overrides?: CallOverrides): Promise<boolean>;

  _getSuTokenRateMantissa(overrides?: CallOverrides): Promise<BigNumber>;

  _getTransferPaused(overrides?: CallOverrides): Promise<boolean>;

  getCompAddress(overrides?: CallOverrides): Promise<string>;

  getEqAssetGroup(
    groupId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<UnderwriterAdminInterface.EqualAssetsStructOutput>;

  getEqAssetGroupNum(overrides?: CallOverrides): Promise<number>;

  callStatic: {
    _getBorrowCapGuardian(overrides?: CallOverrides): Promise<string>;

    _getBorrowPaused(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _getMarketBorrowCap(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMintPaused(cToken: string, overrides?: CallOverrides): Promise<boolean>;

    _getPauseGuardian(overrides?: CallOverrides): Promise<string>;

    _getSeizePaused(overrides?: CallOverrides): Promise<boolean>;

    _getSuTokenRateMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    _getTransferPaused(overrides?: CallOverrides): Promise<boolean>;

    getCompAddress(overrides?: CallOverrides): Promise<string>;

    getEqAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<UnderwriterAdminInterface.EqualAssetsStructOutput>;

    getEqAssetGroupNum(overrides?: CallOverrides): Promise<number>;
  };

  filters: {};

  estimateGas: {
    _getBorrowCapGuardian(overrides?: CallOverrides): Promise<BigNumber>;

    _getBorrowPaused(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMarketBorrowCap(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMintPaused(
      cToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _getPauseGuardian(overrides?: CallOverrides): Promise<BigNumber>;

    _getSeizePaused(overrides?: CallOverrides): Promise<BigNumber>;

    _getSuTokenRateMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    _getTransferPaused(overrides?: CallOverrides): Promise<BigNumber>;

    getCompAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getEqAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEqAssetGroupNum(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _getBorrowCapGuardian(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getBorrowPaused(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getMarketBorrowCap(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getMintPaused(
      cToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _getPauseGuardian(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getSeizePaused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getSuTokenRateMantissa(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTransferPaused(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCompAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEqAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEqAssetGroupNum(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
