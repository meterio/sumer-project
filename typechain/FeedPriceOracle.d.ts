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

interface FeedPriceOracleInterface extends ethers.utils.Interface {
  functions: {
    "acceptOwnership()": FunctionFragment;
    "feeds(address)": FunctionFragment;
    "fixedPrices(address)": FunctionFragment;
    "getFeed(address)": FunctionFragment;
    "getFixedPrice(address)": FunctionFragment;
    "getUnderlyingPrice(address)": FunctionFragment;
    "getUnderlyingPrices(address[])": FunctionFragment;
    "isPriceOracle()": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingOwner()": FunctionFragment;
    "removeFeed(address)": FunctionFragment;
    "removeFixedPrice(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setBandFeed(address,address,uint8,string)": FunctionFragment;
    "setChainlinkFeed(address,address)": FunctionFragment;
    "setFixedPrice(address,uint256)": FunctionFragment;
    "setLpOracle(address,address,address)": FunctionFragment;
    "setPythFeed(address,bytes32,address)": FunctionFragment;
    "setWitnetFeed(address,address,uint8)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "feeds", values: [string]): string;
  encodeFunctionData(functionFragment: "fixedPrices", values: [string]): string;
  encodeFunctionData(functionFragment: "getFeed", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getFixedPrice",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getUnderlyingPrice",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getUnderlyingPrices",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "isPriceOracle",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "removeFeed", values: [string]): string;
  encodeFunctionData(
    functionFragment: "removeFixedPrice",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBandFeed",
    values: [string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setChainlinkFeed",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setFixedPrice",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setLpOracle",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setPythFeed",
    values: [string, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setWitnetFeed",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feeds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "fixedPrices",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFeed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFixedPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUnderlyingPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUnderlyingPrices",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPriceOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "removeFeed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeFixedPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBandFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setChainlinkFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFixedPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLpOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPythFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWitnetFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferStarted(address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "SetFeed(address,bytes32,uint8,address,uint8,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferStarted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetFeed"): EventFragment;
}

export type OwnershipTransferStartedEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type SetFeedEvent = TypedEvent<
  [string, string, number, string, number, string] & {
    cToken_: string;
    feedId: string;
    source: number;
    addr: string;
    feedDecimals: number;
    name: string;
  }
>;

export class FeedPriceOracle extends BaseContract {
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

  interface: FeedPriceOracleInterface;

  functions: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    feeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [string, number, string, number, string] & {
        feedId: string;
        source: number;
        addr: string;
        feedDecimals: number;
        name: string;
      }
    >;

    fixedPrices(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getFeed(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<
      [
        [string, number, string, number, string] & {
          feedId: string;
          source: number;
          addr: string;
          feedDecimals: number;
          name: string;
        }
      ]
    >;

    getFixedPrice(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getUnderlyingPrice(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getUnderlyingPrices(
      cTokens: string[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    isPriceOracle(overrides?: CallOverrides): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pendingOwner(overrides?: CallOverrides): Promise<[string]>;

    removeFeed(
      cToken_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeFixedPrice(
      cToken_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBandFeed(
      cToken_: string,
      feed_: string,
      feedDecimals_: BigNumberish,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setChainlinkFeed(
      cToken_: string,
      feed_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFixedPrice(
      cToken_: string,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setLpOracle(
      cToken_: string,
      lpToken: string,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPythFeed(
      cToken_: string,
      feedId: BytesLike,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setWitnetFeed(
      cToken_: string,
      feed_: string,
      feedDecimals_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  feeds(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [string, number, string, number, string] & {
      feedId: string;
      source: number;
      addr: string;
      feedDecimals: number;
      name: string;
    }
  >;

  fixedPrices(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  getFeed(
    cToken_: string,
    overrides?: CallOverrides
  ): Promise<
    [string, number, string, number, string] & {
      feedId: string;
      source: number;
      addr: string;
      feedDecimals: number;
      name: string;
    }
  >;

  getFixedPrice(cToken_: string, overrides?: CallOverrides): Promise<BigNumber>;

  getUnderlyingPrice(
    cToken_: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getUnderlyingPrices(
    cTokens: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  isPriceOracle(overrides?: CallOverrides): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  pendingOwner(overrides?: CallOverrides): Promise<string>;

  removeFeed(
    cToken_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeFixedPrice(
    cToken_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBandFeed(
    cToken_: string,
    feed_: string,
    feedDecimals_: BigNumberish,
    name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setChainlinkFeed(
    cToken_: string,
    feed_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFixedPrice(
    cToken_: string,
    price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setLpOracle(
    cToken_: string,
    lpToken: string,
    addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPythFeed(
    cToken_: string,
    feedId: BytesLike,
    addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setWitnetFeed(
    cToken_: string,
    feed_: string,
    feedDecimals_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    feeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [string, number, string, number, string] & {
        feedId: string;
        source: number;
        addr: string;
        feedDecimals: number;
        name: string;
      }
    >;

    fixedPrices(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    getFeed(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<
      [string, number, string, number, string] & {
        feedId: string;
        source: number;
        addr: string;
        feedDecimals: number;
        name: string;
      }
    >;

    getFixedPrice(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUnderlyingPrice(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUnderlyingPrices(
      cTokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    isPriceOracle(overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    pendingOwner(overrides?: CallOverrides): Promise<string>;

    removeFeed(cToken_: string, overrides?: CallOverrides): Promise<void>;

    removeFixedPrice(cToken_: string, overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setBandFeed(
      cToken_: string,
      feed_: string,
      feedDecimals_: BigNumberish,
      name: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setChainlinkFeed(
      cToken_: string,
      feed_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setFixedPrice(
      cToken_: string,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setLpOracle(
      cToken_: string,
      lpToken: string,
      addr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setPythFeed(
      cToken_: string,
      feedId: BytesLike,
      addr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setWitnetFeed(
      cToken_: string,
      feed_: string,
      feedDecimals_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferStarted(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferStarted(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "SetFeed(address,bytes32,uint8,address,uint8,string)"(
      cToken_?: string | null,
      feedId?: null,
      source?: null,
      addr?: null,
      feedDecimals?: null,
      name?: null
    ): TypedEventFilter<
      [string, string, number, string, number, string],
      {
        cToken_: string;
        feedId: string;
        source: number;
        addr: string;
        feedDecimals: number;
        name: string;
      }
    >;

    SetFeed(
      cToken_?: string | null,
      feedId?: null,
      source?: null,
      addr?: null,
      feedDecimals?: null,
      name?: null
    ): TypedEventFilter<
      [string, string, number, string, number, string],
      {
        cToken_: string;
        feedId: string;
        source: number;
        addr: string;
        feedDecimals: number;
        name: string;
      }
    >;
  };

  estimateGas: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    feeds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    fixedPrices(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    getFeed(cToken_: string, overrides?: CallOverrides): Promise<BigNumber>;

    getFixedPrice(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUnderlyingPrice(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUnderlyingPrices(
      cTokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isPriceOracle(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;

    removeFeed(
      cToken_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeFixedPrice(
      cToken_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBandFeed(
      cToken_: string,
      feed_: string,
      feedDecimals_: BigNumberish,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setChainlinkFeed(
      cToken_: string,
      feed_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFixedPrice(
      cToken_: string,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setLpOracle(
      cToken_: string,
      lpToken: string,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPythFeed(
      cToken_: string,
      feedId: BytesLike,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setWitnetFeed(
      cToken_: string,
      feed_: string,
      feedDecimals_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    feeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fixedPrices(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeed(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFixedPrice(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUnderlyingPrice(
      cToken_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUnderlyingPrices(
      cTokens: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPriceOracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeFeed(
      cToken_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeFixedPrice(
      cToken_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBandFeed(
      cToken_: string,
      feed_: string,
      feedDecimals_: BigNumberish,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setChainlinkFeed(
      cToken_: string,
      feed_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFixedPrice(
      cToken_: string,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setLpOracle(
      cToken_: string,
      lpToken: string,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPythFeed(
      cToken_: string,
      feedId: BytesLike,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setWitnetFeed(
      cToken_: string,
      feed_: string,
      feedDecimals_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
