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

interface VoltFactoryInterface extends ethers.utils.Interface {
  functions: {
    "acceptPauser()": FunctionFragment;
    "allPairs(uint256)": FunctionFragment;
    "allPairsLength()": FunctionFragment;
    "createPair(address,address,bool)": FunctionFragment;
    "getInitializable()": FunctionFragment;
    "getPair(address,address,bool)": FunctionFragment;
    "isPair(address)": FunctionFragment;
    "isPaused()": FunctionFragment;
    "pairCodeHash()": FunctionFragment;
    "pauser()": FunctionFragment;
    "pendingPauser()": FunctionFragment;
    "setPause(bool)": FunctionFragment;
    "setPauser(address)": FunctionFragment;
    "setTreasury(address)": FunctionFragment;
    "treasury()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptPauser",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allPairs",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allPairsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createPair",
    values: [string, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getInitializable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPair",
    values: [string, string, boolean]
  ): string;
  encodeFunctionData(functionFragment: "isPair", values: [string]): string;
  encodeFunctionData(functionFragment: "isPaused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pairCodeHash",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "pauser", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingPauser",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setPause", values: [boolean]): string;
  encodeFunctionData(functionFragment: "setPauser", values: [string]): string;
  encodeFunctionData(functionFragment: "setTreasury", values: [string]): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "acceptPauser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allPairs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allPairsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createPair", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getInitializable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isPaused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pairCodeHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pauser", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingPauser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setPause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setPauser", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;

  events: {
    "PairCreated(address,address,bool,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PairCreated"): EventFragment;
}

export type PairCreatedEvent = TypedEvent<
  [string, string, boolean, string, BigNumber] & {
    token0: string;
    token1: string;
    stable: boolean;
    pair: string;
    allPairsLength: BigNumber;
  }
>;

export class VoltFactory extends BaseContract {
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

  interface: VoltFactoryInterface;

  functions: {
    acceptPauser(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    allPairs(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    allPairsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    createPair(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getInitializable(
      overrides?: CallOverrides
    ): Promise<[string, string, boolean]>;

    getPair(
      arg0: string,
      arg1: string,
      arg2: boolean,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isPair(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    isPaused(overrides?: CallOverrides): Promise<[boolean]>;

    pairCodeHash(overrides?: CallOverrides): Promise<[string]>;

    pauser(overrides?: CallOverrides): Promise<[string]>;

    pendingPauser(overrides?: CallOverrides): Promise<[string]>;

    setPause(
      _state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPauser(
      _pauser: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTreasury(
      _treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    treasury(overrides?: CallOverrides): Promise<[string]>;
  };

  acceptPauser(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  allPairs(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

  createPair(
    tokenA: string,
    tokenB: string,
    stable: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getInitializable(
    overrides?: CallOverrides
  ): Promise<[string, string, boolean]>;

  getPair(
    arg0: string,
    arg1: string,
    arg2: boolean,
    overrides?: CallOverrides
  ): Promise<string>;

  isPair(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  isPaused(overrides?: CallOverrides): Promise<boolean>;

  pairCodeHash(overrides?: CallOverrides): Promise<string>;

  pauser(overrides?: CallOverrides): Promise<string>;

  pendingPauser(overrides?: CallOverrides): Promise<string>;

  setPause(
    _state: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPauser(
    _pauser: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTreasury(
    _treasury: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  treasury(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    acceptPauser(overrides?: CallOverrides): Promise<void>;

    allPairs(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

    createPair(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      overrides?: CallOverrides
    ): Promise<string>;

    getInitializable(
      overrides?: CallOverrides
    ): Promise<[string, string, boolean]>;

    getPair(
      arg0: string,
      arg1: string,
      arg2: boolean,
      overrides?: CallOverrides
    ): Promise<string>;

    isPair(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    isPaused(overrides?: CallOverrides): Promise<boolean>;

    pairCodeHash(overrides?: CallOverrides): Promise<string>;

    pauser(overrides?: CallOverrides): Promise<string>;

    pendingPauser(overrides?: CallOverrides): Promise<string>;

    setPause(_state: boolean, overrides?: CallOverrides): Promise<void>;

    setPauser(_pauser: string, overrides?: CallOverrides): Promise<void>;

    setTreasury(_treasury: string, overrides?: CallOverrides): Promise<void>;

    treasury(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "PairCreated(address,address,bool,address,uint256)"(
      token0?: string | null,
      token1?: string | null,
      stable?: null,
      pair?: null,
      allPairsLength?: null
    ): TypedEventFilter<
      [string, string, boolean, string, BigNumber],
      {
        token0: string;
        token1: string;
        stable: boolean;
        pair: string;
        allPairsLength: BigNumber;
      }
    >;

    PairCreated(
      token0?: string | null,
      token1?: string | null,
      stable?: null,
      pair?: null,
      allPairsLength?: null
    ): TypedEventFilter<
      [string, string, boolean, string, BigNumber],
      {
        token0: string;
        token1: string;
        stable: boolean;
        pair: string;
        allPairsLength: BigNumber;
      }
    >;
  };

  estimateGas: {
    acceptPauser(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    allPairs(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

    createPair(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getInitializable(overrides?: CallOverrides): Promise<BigNumber>;

    getPair(
      arg0: string,
      arg1: string,
      arg2: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isPair(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    isPaused(overrides?: CallOverrides): Promise<BigNumber>;

    pairCodeHash(overrides?: CallOverrides): Promise<BigNumber>;

    pauser(overrides?: CallOverrides): Promise<BigNumber>;

    pendingPauser(overrides?: CallOverrides): Promise<BigNumber>;

    setPause(
      _state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPauser(
      _pauser: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTreasury(
      _treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptPauser(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    allPairs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allPairsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createPair(
      tokenA: string,
      tokenB: string,
      stable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getInitializable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPair(
      arg0: string,
      arg1: string,
      arg2: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPair(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPaused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pairCodeHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pauser(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingPauser(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setPause(
      _state: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPauser(
      _pauser: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTreasury(
      _treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
