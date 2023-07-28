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

interface IFraxGaugeFXSRewardsDistributorInterface
  extends ethers.utils.Interface {
  functions: {
    "acceptOwnership()": FunctionFragment;
    "curator_address()": FunctionFragment;
    "currentReward(address)": FunctionFragment;
    "distributeReward(address)": FunctionFragment;
    "distributionsOn()": FunctionFragment;
    "gauge_whitelist(address)": FunctionFragment;
    "is_middleman(address)": FunctionFragment;
    "last_time_gauge_paid(address)": FunctionFragment;
    "nominateNewOwner(address)": FunctionFragment;
    "nominatedOwner()": FunctionFragment;
    "owner()": FunctionFragment;
    "recoverERC20(address,uint256)": FunctionFragment;
    "setCurator(address)": FunctionFragment;
    "setGaugeController(address)": FunctionFragment;
    "setGaugeState(address,bool,bool)": FunctionFragment;
    "setTimelock(address)": FunctionFragment;
    "timelock_address()": FunctionFragment;
    "toggleDistributions()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "curator_address",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentReward",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "distributeReward",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "distributionsOn",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "gauge_whitelist",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "is_middleman",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "last_time_gauge_paid",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "nominateNewOwner",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "nominatedOwner",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "recoverERC20",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setCurator", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setGaugeController",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setGaugeState",
    values: [string, boolean, boolean]
  ): string;
  encodeFunctionData(functionFragment: "setTimelock", values: [string]): string;
  encodeFunctionData(
    functionFragment: "timelock_address",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "toggleDistributions",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "curator_address",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "distributeReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "distributionsOn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gauge_whitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "is_middleman",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "last_time_gauge_paid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nominateNewOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nominatedOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "recoverERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setCurator", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setGaugeController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGaugeState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTimelock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "timelock_address",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "toggleDistributions",
    data: BytesLike
  ): Result;

  events: {};
}

export class IFraxGaugeFXSRewardsDistributor extends BaseContract {
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

  interface: IFraxGaugeFXSRewardsDistributorInterface;

  functions: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    curator_address(overrides?: CallOverrides): Promise<[string]>;

    currentReward(
      gauge_address: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { reward_amount: BigNumber }>;

    distributeReward(
      gauge_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    distributionsOn(overrides?: CallOverrides): Promise<[boolean]>;

    gauge_whitelist(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    is_middleman(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    last_time_gauge_paid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    nominateNewOwner(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    recoverERC20(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setCurator(
      _new_curator_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGaugeController(
      _gauge_controller_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGaugeState(
      _gauge_address: string,
      _is_middleman: boolean,
      _is_active: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTimelock(
      _new_timelock: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    timelock_address(overrides?: CallOverrides): Promise<[string]>;

    toggleDistributions(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  curator_address(overrides?: CallOverrides): Promise<string>;

  currentReward(
    gauge_address: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  distributeReward(
    gauge_address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  distributionsOn(overrides?: CallOverrides): Promise<boolean>;

  gauge_whitelist(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  is_middleman(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  last_time_gauge_paid(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  nominateNewOwner(
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  recoverERC20(
    tokenAddress: string,
    tokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setCurator(
    _new_curator_address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGaugeController(
    _gauge_controller_address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGaugeState(
    _gauge_address: string,
    _is_middleman: boolean,
    _is_active: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTimelock(
    _new_timelock: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  timelock_address(overrides?: CallOverrides): Promise<string>;

  toggleDistributions(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    curator_address(overrides?: CallOverrides): Promise<string>;

    currentReward(
      gauge_address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    distributeReward(
      gauge_address: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        weeks_elapsed: BigNumber;
        reward_tally: BigNumber;
      }
    >;

    distributionsOn(overrides?: CallOverrides): Promise<boolean>;

    gauge_whitelist(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    is_middleman(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    last_time_gauge_paid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominateNewOwner(_owner: string, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    recoverERC20(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setCurator(
      _new_curator_address: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setGaugeController(
      _gauge_controller_address: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setGaugeState(
      _gauge_address: string,
      _is_middleman: boolean,
      _is_active: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setTimelock(
      _new_timelock: string,
      overrides?: CallOverrides
    ): Promise<void>;

    timelock_address(overrides?: CallOverrides): Promise<string>;

    toggleDistributions(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    curator_address(overrides?: CallOverrides): Promise<BigNumber>;

    currentReward(
      gauge_address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    distributeReward(
      gauge_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    distributionsOn(overrides?: CallOverrides): Promise<BigNumber>;

    gauge_whitelist(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    is_middleman(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    last_time_gauge_paid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominateNewOwner(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    recoverERC20(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setCurator(
      _new_curator_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGaugeController(
      _gauge_controller_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGaugeState(
      _gauge_address: string,
      _is_middleman: boolean,
      _is_active: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTimelock(
      _new_timelock: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    timelock_address(overrides?: CallOverrides): Promise<BigNumber>;

    toggleDistributions(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    curator_address(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currentReward(
      gauge_address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    distributeReward(
      gauge_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    distributionsOn(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gauge_whitelist(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    is_middleman(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    last_time_gauge_paid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    recoverERC20(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setCurator(
      _new_curator_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGaugeController(
      _gauge_controller_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGaugeState(
      _gauge_address: string,
      _is_middleman: boolean,
      _is_active: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTimelock(
      _new_timelock: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    timelock_address(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    toggleDistributions(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}