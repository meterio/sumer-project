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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface VotingEscrowInterface extends ethers.utils.Interface {
  functions: {
    "balanceOf(address)": FunctionFragment;
    "balget_last_user_slopeanceOf(address)": FunctionFragment;
    "locked(address)": FunctionFragment;
    "locked__end(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "balget_last_user_slopeanceOf",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "locked", values: [string]): string;
  encodeFunctionData(functionFragment: "locked__end", values: [string]): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balget_last_user_slopeanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "locked", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "locked__end",
    data: BytesLike
  ): Result;

  events: {};
}

export class VotingEscrow extends BaseContract {
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

  interface: VotingEscrowInterface;

  functions: {
    balanceOf(addr: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    balget_last_user_slopeanceOf(
      addr: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    locked(
      addr: string,
      overrides?: CallOverrides
    ): Promise<
      [[BigNumber, BigNumber] & { amount: BigNumber; end: BigNumber }]
    >;

    locked__end(addr: string, overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  balanceOf(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

  balget_last_user_slopeanceOf(
    addr: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  locked(
    addr: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; end: BigNumber }>;

  locked__end(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    balanceOf(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    balget_last_user_slopeanceOf(
      addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    locked(
      addr: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; end: BigNumber }>;

    locked__end(addr: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    balanceOf(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    balget_last_user_slopeanceOf(
      addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    locked(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    locked__end(addr: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balget_last_user_slopeanceOf(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    locked(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    locked__end(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
