/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface UnderwriterAdminInterface extends ethers.utils.Interface {
  functions: {
    "_borrowGuardianPaused()": FunctionFragment;
    "_getBorrowCapGuardian()": FunctionFragment;
    "_getBorrowPaused(address)": FunctionFragment;
    "_getMarketBorrowCap(address)": FunctionFragment;
    "_getMintPaused(address)": FunctionFragment;
    "_getPauseGuardian()": FunctionFragment;
    "_getSeizePaused()": FunctionFragment;
    "_getTransferPaused()": FunctionFragment;
    "_mintGuardianPaused()": FunctionFragment;
    "_setBorrowCapGuardian(address)": FunctionFragment;
    "_setBorrowPaused(address,bool)": FunctionFragment;
    "_setMarketBorrowCaps(address[],uint256[])": FunctionFragment;
    "_setMintPaused(address,bool)": FunctionFragment;
    "_setPauseGuardian(address)": FunctionFragment;
    "_setSeizePaused(bool)": FunctionFragment;
    "_setTransferPaused(bool)": FunctionFragment;
    "admin()": FunctionFragment;
    "borrowCapGuardian()": FunctionFragment;
    "borrowCaps(address)": FunctionFragment;
    "borrowGuardianPaused(address)": FunctionFragment;
    "eqAssetGroup(uint8)": FunctionFragment;
    "equalAssetsGroupNum()": FunctionFragment;
    "getAssetGroup(uint8)": FunctionFragment;
    "getAssetGroupNum()": FunctionFragment;
    "getCompAddress()": FunctionFragment;
    "governanceToken()": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "mintGuardianPaused(address)": FunctionFragment;
    "pauseGuardian()": FunctionFragment;
    "removeAssetGroup(uint8)": FunctionFragment;
    "seizeGuardianPaused()": FunctionFragment;
    "setAssetGroup(uint8,string,uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "setGovTokenAddress(address)": FunctionFragment;
    "suTokenRateMantissa()": FunctionFragment;
    "transferGuardianPaused()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_borrowGuardianPaused",
    values?: undefined
  ): string;
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
    functionFragment: "_getTransferPaused",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_mintGuardianPaused",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_setBorrowCapGuardian",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_setBorrowPaused",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "_setMarketBorrowCaps",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_setMintPaused",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "_setPauseGuardian",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_setSeizePaused",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "_setTransferPaused",
    values: [boolean]
  ): string;
  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "borrowCapGuardian",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "borrowCaps", values: [string]): string;
  encodeFunctionData(
    functionFragment: "borrowGuardianPaused",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "eqAssetGroup",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "equalAssetsGroupNum",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAssetGroup",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAssetGroupNum",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCompAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governanceToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "mintGuardianPaused",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "pauseGuardian",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeAssetGroup",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "seizeGuardianPaused",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAssetGroup",
    values: [
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setGovTokenAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "suTokenRateMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferGuardianPaused",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "_borrowGuardianPaused",
    data: BytesLike
  ): Result;
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
    functionFragment: "_getTransferPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_mintGuardianPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setBorrowCapGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setBorrowPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setMarketBorrowCaps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setMintPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setPauseGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setSeizePaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setTransferPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "borrowCapGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "borrowCaps", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "borrowGuardianPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eqAssetGroup",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "equalAssetsGroupNum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAssetGroup",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAssetGroupNum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCompAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintGuardianPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pauseGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeAssetGroup",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "seizeGuardianPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAssetGroup",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGovTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "suTokenRateMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferGuardianPaused",
    data: BytesLike
  ): Result;

  events: {
    "ActionPaused(address,string,bool)": EventFragment;
    "NewAssetGroup(uint8,string,uint256,uint256,uint256,uint256,uint256,uint8)": EventFragment;
    "NewBorrowCap(address,uint256)": EventFragment;
    "NewBorrowCapGuardian(address,address)": EventFragment;
    "NewPauseGuardian(address,address)": EventFragment;
    "RemoveAssetGroup(uint8,uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ActionPaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewAssetGroup"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewBorrowCap"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewBorrowCapGuardian"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPauseGuardian"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveAssetGroup"): EventFragment;
}

export type ActionPausedEvent = TypedEvent<
  [string, string, boolean] & {
    cToken: string;
    action: string;
    pauseState: boolean;
  }
>;

export type NewAssetGroupEvent = TypedEvent<
  [
    number,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    number
  ] & {
    groupId: number;
    groupName: string;
    intraCRateMantissa: BigNumber;
    intraMintRateMantissa: BigNumber;
    intraSuRateMantissa: BigNumber;
    interCRateMantissa: BigNumber;
    interSuRateMantissa: BigNumber;
    assetsGroupNum: number;
  }
>;

export type NewBorrowCapEvent = TypedEvent<
  [string, BigNumber] & { cToken: string; newBorrowCap: BigNumber }
>;

export type NewBorrowCapGuardianEvent = TypedEvent<
  [string, string] & {
    oldBorrowCapGuardian: string;
    newBorrowCapGuardian: string;
  }
>;

export type NewPauseGuardianEvent = TypedEvent<
  [string, string] & { oldPauseGuardian: string; newPauseGuardian: string }
>;

export type RemoveAssetGroupEvent = TypedEvent<
  [number, number] & { groupId: number; equalAssetsGroupNum: number }
>;

export class UnderwriterAdmin extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: UnderwriterAdminInterface;

  functions: {
    _borrowGuardianPaused(overrides?: CallOverrides): Promise<[boolean]>;

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
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _getPauseGuardian(overrides?: CallOverrides): Promise<[string]>;

    _getSeizePaused(overrides?: CallOverrides): Promise<[boolean]>;

    _getTransferPaused(overrides?: CallOverrides): Promise<[boolean]>;

    _mintGuardianPaused(overrides?: CallOverrides): Promise<[boolean]>;

    _setBorrowCapGuardian(
      newBorrowCapGuardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setBorrowPaused(
      cToken: string,
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setMarketBorrowCaps(
      cTokens: string[],
      newBorrowCaps: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setMintPaused(
      cToken: string,
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setPauseGuardian(
      newPauseGuardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setSeizePaused(
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setTransferPaused(
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    admin(overrides?: CallOverrides): Promise<[string]>;

    borrowCapGuardian(overrides?: CallOverrides): Promise<[string]>;

    borrowCaps(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    borrowGuardianPaused(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    eqAssetGroup(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        groupId: number;
        groupName: string;
        intraCRateMantissa: BigNumber;
        intraMintRateMantissa: BigNumber;
        intraSuRateMantissa: BigNumber;
        interCRateMantissa: BigNumber;
        interSuRateMantissa: BigNumber;
      }
    >;

    equalAssetsGroupNum(overrides?: CallOverrides): Promise<[number]>;

    getAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          number,
          string,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ] & {
          groupId: number;
          groupName: string;
          intraCRateMantissa: BigNumber;
          intraMintRateMantissa: BigNumber;
          intraSuRateMantissa: BigNumber;
          interCRateMantissa: BigNumber;
          interSuRateMantissa: BigNumber;
        }
      ]
    >;

    getAssetGroupNum(overrides?: CallOverrides): Promise<[number]>;

    getCompAddress(overrides?: CallOverrides): Promise<[string]>;

    governanceToken(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _gov: string,
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintGuardianPaused(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    pauseGuardian(overrides?: CallOverrides): Promise<[string]>;

    removeAssetGroup(
      groupId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    seizeGuardianPaused(overrides?: CallOverrides): Promise<[boolean]>;

    setAssetGroup(
      groupId: BigNumberish,
      groupName: string,
      intraCRateMantissa: BigNumberish,
      intraMintRateMantissa: BigNumberish,
      intraSuRateMantissa: BigNumberish,
      interCRateMantissa: BigNumberish,
      interSuRateMantissa: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGovTokenAddress(
      _governanceToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    suTokenRateMantissa(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferGuardianPaused(overrides?: CallOverrides): Promise<[boolean]>;
  };

  _borrowGuardianPaused(overrides?: CallOverrides): Promise<boolean>;

  _getBorrowCapGuardian(overrides?: CallOverrides): Promise<string>;

  _getBorrowPaused(cToken: string, overrides?: CallOverrides): Promise<boolean>;

  _getMarketBorrowCap(
    cToken: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getMintPaused(cToken: string, overrides?: CallOverrides): Promise<boolean>;

  _getPauseGuardian(overrides?: CallOverrides): Promise<string>;

  _getSeizePaused(overrides?: CallOverrides): Promise<boolean>;

  _getTransferPaused(overrides?: CallOverrides): Promise<boolean>;

  _mintGuardianPaused(overrides?: CallOverrides): Promise<boolean>;

  _setBorrowCapGuardian(
    newBorrowCapGuardian: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setBorrowPaused(
    cToken: string,
    state: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setMarketBorrowCaps(
    cTokens: string[],
    newBorrowCaps: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setMintPaused(
    cToken: string,
    state: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setPauseGuardian(
    newPauseGuardian: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setSeizePaused(
    state: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setTransferPaused(
    state: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  admin(overrides?: CallOverrides): Promise<string>;

  borrowCapGuardian(overrides?: CallOverrides): Promise<string>;

  borrowCaps(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  borrowGuardianPaused(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  eqAssetGroup(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [number, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      groupId: number;
      groupName: string;
      intraCRateMantissa: BigNumber;
      intraMintRateMantissa: BigNumber;
      intraSuRateMantissa: BigNumber;
      interCRateMantissa: BigNumber;
      interSuRateMantissa: BigNumber;
    }
  >;

  equalAssetsGroupNum(overrides?: CallOverrides): Promise<number>;

  getAssetGroup(
    groupId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [number, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      groupId: number;
      groupName: string;
      intraCRateMantissa: BigNumber;
      intraMintRateMantissa: BigNumber;
      intraSuRateMantissa: BigNumber;
      interCRateMantissa: BigNumber;
      interSuRateMantissa: BigNumber;
    }
  >;

  getAssetGroupNum(overrides?: CallOverrides): Promise<number>;

  getCompAddress(overrides?: CallOverrides): Promise<string>;

  governanceToken(overrides?: CallOverrides): Promise<string>;

  initialize(
    _gov: string,
    _admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintGuardianPaused(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  pauseGuardian(overrides?: CallOverrides): Promise<string>;

  removeAssetGroup(
    groupId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  seizeGuardianPaused(overrides?: CallOverrides): Promise<boolean>;

  setAssetGroup(
    groupId: BigNumberish,
    groupName: string,
    intraCRateMantissa: BigNumberish,
    intraMintRateMantissa: BigNumberish,
    intraSuRateMantissa: BigNumberish,
    interCRateMantissa: BigNumberish,
    interSuRateMantissa: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGovTokenAddress(
    _governanceToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  suTokenRateMantissa(overrides?: CallOverrides): Promise<BigNumber>;

  transferGuardianPaused(overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    _borrowGuardianPaused(overrides?: CallOverrides): Promise<boolean>;

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

    _getTransferPaused(overrides?: CallOverrides): Promise<boolean>;

    _mintGuardianPaused(overrides?: CallOverrides): Promise<boolean>;

    _setBorrowCapGuardian(
      newBorrowCapGuardian: string,
      overrides?: CallOverrides
    ): Promise<void>;

    _setBorrowPaused(
      cToken: string,
      state: boolean,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _setMarketBorrowCaps(
      cTokens: string[],
      newBorrowCaps: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    _setMintPaused(
      cToken: string,
      state: boolean,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _setPauseGuardian(
      newPauseGuardian: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _setSeizePaused(
      state: boolean,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _setTransferPaused(
      state: boolean,
      overrides?: CallOverrides
    ): Promise<boolean>;

    admin(overrides?: CallOverrides): Promise<string>;

    borrowCapGuardian(overrides?: CallOverrides): Promise<string>;

    borrowCaps(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    borrowGuardianPaused(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    eqAssetGroup(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        groupId: number;
        groupName: string;
        intraCRateMantissa: BigNumber;
        intraMintRateMantissa: BigNumber;
        intraSuRateMantissa: BigNumber;
        interCRateMantissa: BigNumber;
        interSuRateMantissa: BigNumber;
      }
    >;

    equalAssetsGroupNum(overrides?: CallOverrides): Promise<number>;

    getAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        groupId: number;
        groupName: string;
        intraCRateMantissa: BigNumber;
        intraMintRateMantissa: BigNumber;
        intraSuRateMantissa: BigNumber;
        interCRateMantissa: BigNumber;
        interSuRateMantissa: BigNumber;
      }
    >;

    getAssetGroupNum(overrides?: CallOverrides): Promise<number>;

    getCompAddress(overrides?: CallOverrides): Promise<string>;

    governanceToken(overrides?: CallOverrides): Promise<string>;

    initialize(
      _gov: string,
      _admin: string,
      overrides?: CallOverrides
    ): Promise<void>;

    mintGuardianPaused(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    pauseGuardian(overrides?: CallOverrides): Promise<string>;

    removeAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    seizeGuardianPaused(overrides?: CallOverrides): Promise<boolean>;

    setAssetGroup(
      groupId: BigNumberish,
      groupName: string,
      intraCRateMantissa: BigNumberish,
      intraMintRateMantissa: BigNumberish,
      intraSuRateMantissa: BigNumberish,
      interCRateMantissa: BigNumberish,
      interSuRateMantissa: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setGovTokenAddress(
      _governanceToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    suTokenRateMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    transferGuardianPaused(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    "ActionPaused(address,string,bool)"(
      cToken?: null,
      action?: null,
      pauseState?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { cToken: string; action: string; pauseState: boolean }
    >;

    ActionPaused(
      cToken?: null,
      action?: null,
      pauseState?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { cToken: string; action: string; pauseState: boolean }
    >;

    "NewAssetGroup(uint8,string,uint256,uint256,uint256,uint256,uint256,uint8)"(
      groupId?: BigNumberish | null,
      groupName?: string | null,
      intraCRateMantissa?: null,
      intraMintRateMantissa?: null,
      intraSuRateMantissa?: null,
      interCRateMantissa?: null,
      interSuRateMantissa?: null,
      assetsGroupNum?: null
    ): TypedEventFilter<
      [
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        number
      ],
      {
        groupId: number;
        groupName: string;
        intraCRateMantissa: BigNumber;
        intraMintRateMantissa: BigNumber;
        intraSuRateMantissa: BigNumber;
        interCRateMantissa: BigNumber;
        interSuRateMantissa: BigNumber;
        assetsGroupNum: number;
      }
    >;

    NewAssetGroup(
      groupId?: BigNumberish | null,
      groupName?: string | null,
      intraCRateMantissa?: null,
      intraMintRateMantissa?: null,
      intraSuRateMantissa?: null,
      interCRateMantissa?: null,
      interSuRateMantissa?: null,
      assetsGroupNum?: null
    ): TypedEventFilter<
      [
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        number
      ],
      {
        groupId: number;
        groupName: string;
        intraCRateMantissa: BigNumber;
        intraMintRateMantissa: BigNumber;
        intraSuRateMantissa: BigNumber;
        interCRateMantissa: BigNumber;
        interSuRateMantissa: BigNumber;
        assetsGroupNum: number;
      }
    >;

    "NewBorrowCap(address,uint256)"(
      cToken?: string | null,
      newBorrowCap?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { cToken: string; newBorrowCap: BigNumber }
    >;

    NewBorrowCap(
      cToken?: string | null,
      newBorrowCap?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { cToken: string; newBorrowCap: BigNumber }
    >;

    "NewBorrowCapGuardian(address,address)"(
      oldBorrowCapGuardian?: null,
      newBorrowCapGuardian?: null
    ): TypedEventFilter<
      [string, string],
      { oldBorrowCapGuardian: string; newBorrowCapGuardian: string }
    >;

    NewBorrowCapGuardian(
      oldBorrowCapGuardian?: null,
      newBorrowCapGuardian?: null
    ): TypedEventFilter<
      [string, string],
      { oldBorrowCapGuardian: string; newBorrowCapGuardian: string }
    >;

    "NewPauseGuardian(address,address)"(
      oldPauseGuardian?: null,
      newPauseGuardian?: null
    ): TypedEventFilter<
      [string, string],
      { oldPauseGuardian: string; newPauseGuardian: string }
    >;

    NewPauseGuardian(
      oldPauseGuardian?: null,
      newPauseGuardian?: null
    ): TypedEventFilter<
      [string, string],
      { oldPauseGuardian: string; newPauseGuardian: string }
    >;

    "RemoveAssetGroup(uint8,uint8)"(
      groupId?: BigNumberish | null,
      equalAssetsGroupNum?: null
    ): TypedEventFilter<
      [number, number],
      { groupId: number; equalAssetsGroupNum: number }
    >;

    RemoveAssetGroup(
      groupId?: BigNumberish | null,
      equalAssetsGroupNum?: null
    ): TypedEventFilter<
      [number, number],
      { groupId: number; equalAssetsGroupNum: number }
    >;
  };

  estimateGas: {
    _borrowGuardianPaused(overrides?: CallOverrides): Promise<BigNumber>;

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
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPauseGuardian(overrides?: CallOverrides): Promise<BigNumber>;

    _getSeizePaused(overrides?: CallOverrides): Promise<BigNumber>;

    _getTransferPaused(overrides?: CallOverrides): Promise<BigNumber>;

    _mintGuardianPaused(overrides?: CallOverrides): Promise<BigNumber>;

    _setBorrowCapGuardian(
      newBorrowCapGuardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setBorrowPaused(
      cToken: string,
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setMarketBorrowCaps(
      cTokens: string[],
      newBorrowCaps: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setMintPaused(
      cToken: string,
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setPauseGuardian(
      newPauseGuardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setSeizePaused(
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setTransferPaused(
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    admin(overrides?: CallOverrides): Promise<BigNumber>;

    borrowCapGuardian(overrides?: CallOverrides): Promise<BigNumber>;

    borrowCaps(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    borrowGuardianPaused(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    eqAssetGroup(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    equalAssetsGroupNum(overrides?: CallOverrides): Promise<BigNumber>;

    getAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAssetGroupNum(overrides?: CallOverrides): Promise<BigNumber>;

    getCompAddress(overrides?: CallOverrides): Promise<BigNumber>;

    governanceToken(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _gov: string,
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintGuardianPaused(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pauseGuardian(overrides?: CallOverrides): Promise<BigNumber>;

    removeAssetGroup(
      groupId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    seizeGuardianPaused(overrides?: CallOverrides): Promise<BigNumber>;

    setAssetGroup(
      groupId: BigNumberish,
      groupName: string,
      intraCRateMantissa: BigNumberish,
      intraMintRateMantissa: BigNumberish,
      intraSuRateMantissa: BigNumberish,
      interCRateMantissa: BigNumberish,
      interSuRateMantissa: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGovTokenAddress(
      _governanceToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    suTokenRateMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    transferGuardianPaused(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _borrowGuardianPaused(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

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
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPauseGuardian(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getSeizePaused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getTransferPaused(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _mintGuardianPaused(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _setBorrowCapGuardian(
      newBorrowCapGuardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setBorrowPaused(
      cToken: string,
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setMarketBorrowCaps(
      cTokens: string[],
      newBorrowCaps: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setMintPaused(
      cToken: string,
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setPauseGuardian(
      newPauseGuardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setSeizePaused(
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setTransferPaused(
      state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    borrowCapGuardian(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    borrowCaps(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    borrowGuardianPaused(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    eqAssetGroup(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    equalAssetsGroupNum(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAssetGroupNum(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCompAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    governanceToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _gov: string,
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintGuardianPaused(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pauseGuardian(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeAssetGroup(
      groupId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    seizeGuardianPaused(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setAssetGroup(
      groupId: BigNumberish,
      groupName: string,
      intraCRateMantissa: BigNumberish,
      intraMintRateMantissa: BigNumberish,
      intraSuRateMantissa: BigNumberish,
      interCRateMantissa: BigNumberish,
      interSuRateMantissa: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGovTokenAddress(
      _governanceToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    suTokenRateMantissa(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferGuardianPaused(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
