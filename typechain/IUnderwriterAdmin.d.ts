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

interface IUnderwriterAdminInterface extends ethers.utils.Interface {
  functions: {
    "_getBorrowPaused(address)": FunctionFragment;
    "_getMarketBorrowCap(address)": FunctionFragment;
    "_getMintPaused(address)": FunctionFragment;
    "_getSeizePaused()": FunctionFragment;
    "_getSuTokenRateMantissa()": FunctionFragment;
    "_getTransferPaused()": FunctionFragment;
    "getCompAddress()": FunctionFragment;
    "getEqAssetGroup(uint8)": FunctionFragment;
    "getEqAssetGroupNum()": FunctionFragment;
  };

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

  events: {
    "ActionPaused(address,string,bool)": EventFragment;
    "EqAssetGroupAdded(uint8,string,uint256,uint256,uint256,uint256,uint8)": EventFragment;
    "EqAssetGroupRemoved(uint8,uint8)": EventFragment;
    "NewBorrowCap(address,uint256)": EventFragment;
    "NewBorrowCapGuardian(address,address)": EventFragment;
    "NewPauseGuardian(address,address)": EventFragment;
    "NewSuTokenRate(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ActionPaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EqAssetGroupAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EqAssetGroupRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewBorrowCap"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewBorrowCapGuardian"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPauseGuardian"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewSuTokenRate"): EventFragment;
}

export type ActionPausedEvent = TypedEvent<
  [string, string, boolean] & {
    cToken: string;
    action: string;
    pauseState: boolean;
  }
>;

export type EqAssetGroupAddedEvent = TypedEvent<
  [number, string, BigNumber, BigNumber, BigNumber, BigNumber, number] & {
    groupId: number;
    groupName: string;
    inGroupCTokenRateMantissa: BigNumber;
    inGroupSuTokenRateMantissa: BigNumber;
    interGroupCTokenRateMantissa: BigNumber;
    interGroupSuTokenRateMantissa: BigNumber;
    equalAssetsGroupNum: number;
  }
>;

export type EqAssetGroupRemovedEvent = TypedEvent<
  [number, number] & { groupId: number; equalAssetsGroupNum: number }
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

export type NewSuTokenRateEvent = TypedEvent<
  [BigNumber, BigNumber] & {
    oldSuTokenRateMantissa: BigNumber;
    newSuTokenRateMantissa: BigNumber;
  }
>;

export class IUnderwriterAdmin extends BaseContract {
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

  interface: IUnderwriterAdminInterface;

  functions: {
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

    _getSeizePaused(overrides?: CallOverrides): Promise<[boolean]>;

    _getSuTokenRateMantissa(overrides?: CallOverrides): Promise<[BigNumber]>;

    _getTransferPaused(overrides?: CallOverrides): Promise<[boolean]>;

    getCompAddress(overrides?: CallOverrides): Promise<[string]>;

    getEqAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [number, string, BigNumber, BigNumber, BigNumber, BigNumber] & {
          groupId: number;
          groupName: string;
          inGroupCTokenRateMantissa: BigNumber;
          inGroupSuTokenRateMantissa: BigNumber;
          interGroupCTokenRateMantissa: BigNumber;
          interGroupSuTokenRateMantissa: BigNumber;
        }
      ]
    >;

    getEqAssetGroupNum(overrides?: CallOverrides): Promise<[number]>;
  };

  _getBorrowPaused(cToken: string, overrides?: CallOverrides): Promise<boolean>;

  _getMarketBorrowCap(
    cToken: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getMintPaused(
    cToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _getSeizePaused(overrides?: CallOverrides): Promise<boolean>;

  _getSuTokenRateMantissa(overrides?: CallOverrides): Promise<BigNumber>;

  _getTransferPaused(overrides?: CallOverrides): Promise<boolean>;

  getCompAddress(overrides?: CallOverrides): Promise<string>;

  getEqAssetGroup(
    groupId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [number, string, BigNumber, BigNumber, BigNumber, BigNumber] & {
      groupId: number;
      groupName: string;
      inGroupCTokenRateMantissa: BigNumber;
      inGroupSuTokenRateMantissa: BigNumber;
      interGroupCTokenRateMantissa: BigNumber;
      interGroupSuTokenRateMantissa: BigNumber;
    }
  >;

  getEqAssetGroupNum(overrides?: CallOverrides): Promise<number>;

  callStatic: {
    _getBorrowPaused(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _getMarketBorrowCap(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMintPaused(cToken: string, overrides?: CallOverrides): Promise<boolean>;

    _getSeizePaused(overrides?: CallOverrides): Promise<boolean>;

    _getSuTokenRateMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    _getTransferPaused(overrides?: CallOverrides): Promise<boolean>;

    getCompAddress(overrides?: CallOverrides): Promise<string>;

    getEqAssetGroup(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [number, string, BigNumber, BigNumber, BigNumber, BigNumber] & {
        groupId: number;
        groupName: string;
        inGroupCTokenRateMantissa: BigNumber;
        inGroupSuTokenRateMantissa: BigNumber;
        interGroupCTokenRateMantissa: BigNumber;
        interGroupSuTokenRateMantissa: BigNumber;
      }
    >;

    getEqAssetGroupNum(overrides?: CallOverrides): Promise<number>;
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

    "EqAssetGroupAdded(uint8,string,uint256,uint256,uint256,uint256,uint8)"(
      groupId?: BigNumberish | null,
      groupName?: string | null,
      inGroupCTokenRateMantissa?: null,
      inGroupSuTokenRateMantissa?: null,
      interGroupCTokenRateMantissa?: null,
      interGroupSuTokenRateMantissa?: null,
      equalAssetsGroupNum?: null
    ): TypedEventFilter<
      [number, string, BigNumber, BigNumber, BigNumber, BigNumber, number],
      {
        groupId: number;
        groupName: string;
        inGroupCTokenRateMantissa: BigNumber;
        inGroupSuTokenRateMantissa: BigNumber;
        interGroupCTokenRateMantissa: BigNumber;
        interGroupSuTokenRateMantissa: BigNumber;
        equalAssetsGroupNum: number;
      }
    >;

    EqAssetGroupAdded(
      groupId?: BigNumberish | null,
      groupName?: string | null,
      inGroupCTokenRateMantissa?: null,
      inGroupSuTokenRateMantissa?: null,
      interGroupCTokenRateMantissa?: null,
      interGroupSuTokenRateMantissa?: null,
      equalAssetsGroupNum?: null
    ): TypedEventFilter<
      [number, string, BigNumber, BigNumber, BigNumber, BigNumber, number],
      {
        groupId: number;
        groupName: string;
        inGroupCTokenRateMantissa: BigNumber;
        inGroupSuTokenRateMantissa: BigNumber;
        interGroupCTokenRateMantissa: BigNumber;
        interGroupSuTokenRateMantissa: BigNumber;
        equalAssetsGroupNum: number;
      }
    >;

    "EqAssetGroupRemoved(uint8,uint8)"(
      groupId?: BigNumberish | null,
      equalAssetsGroupNum?: null
    ): TypedEventFilter<
      [number, number],
      { groupId: number; equalAssetsGroupNum: number }
    >;

    EqAssetGroupRemoved(
      groupId?: BigNumberish | null,
      equalAssetsGroupNum?: null
    ): TypedEventFilter<
      [number, number],
      { groupId: number; equalAssetsGroupNum: number }
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

    "NewSuTokenRate(uint256,uint256)"(
      oldSuTokenRateMantissa?: null,
      newSuTokenRateMantissa?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { oldSuTokenRateMantissa: BigNumber; newSuTokenRateMantissa: BigNumber }
    >;

    NewSuTokenRate(
      oldSuTokenRateMantissa?: null,
      newSuTokenRateMantissa?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { oldSuTokenRateMantissa: BigNumber; newSuTokenRateMantissa: BigNumber }
    >;
  };

  estimateGas: {
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