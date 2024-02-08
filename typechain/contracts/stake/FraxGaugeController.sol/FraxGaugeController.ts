/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export type CorrectedPointStruct = {
  bias: BigNumberish;
  slope: BigNumberish;
  lock_end: BigNumberish;
  fxs_amount: BigNumberish;
};

export type CorrectedPointStructOutput = [
  bias: bigint,
  slope: bigint,
  lock_end: bigint,
  fxs_amount: bigint
] & { bias: bigint; slope: bigint; lock_end: bigint; fxs_amount: bigint };

export interface FraxGaugeControllerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "MULTIPLIER"
      | "WEEK"
      | "WEIGHT_VOTE_DELAY"
      | "add_gauge"
      | "add_type"
      | "admin"
      | "apply_transfer_ownership"
      | "change_gauge_weight"
      | "change_global_emission_rate"
      | "change_type_weight"
      | "changes_sum"
      | "changes_weight"
      | "checkpoint"
      | "checkpoint_gauge"
      | "commit_transfer_ownership"
      | "future_admin"
      | "gauge_relative_weight"
      | "gauge_relative_weight_write"
      | "gauge_type_names"
      | "gauge_types"
      | "gauge_types_"
      | "gauges"
      | "get_corrected_info"
      | "get_gauge_weight"
      | "get_total_weight"
      | "get_type_weight"
      | "get_weights_sum_per_type"
      | "global_emission_rate"
      | "last_user_vote"
      | "n_gauge_types"
      | "n_gauges"
      | "points_sum"
      | "points_total"
      | "points_type_weight"
      | "points_weight"
      | "time_sum"
      | "time_total"
      | "time_type_weight"
      | "time_weight"
      | "token"
      | "vote_for_gauge_weights"
      | "vote_user_power"
      | "vote_user_slopes"
      | "voting_escrow"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AddType"
      | "ApplyOwnership"
      | "CommitOwnership"
      | "NewGauge"
      | "NewGaugeWeight"
      | "NewTypeWeight"
      | "VoteForGauge"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "MULTIPLIER",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "WEEK", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "WEIGHT_VOTE_DELAY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "add_gauge",
    values: [AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "add_type",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "apply_transfer_ownership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "change_gauge_weight",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "change_global_emission_rate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "change_type_weight",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changes_sum",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changes_weight",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "checkpoint",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "checkpoint_gauge",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "commit_transfer_ownership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "future_admin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "gauge_relative_weight",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "gauge_relative_weight_write",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "gauge_type_names",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "gauge_types",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "gauge_types_",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "gauges",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "get_corrected_info",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "get_gauge_weight",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "get_total_weight",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "get_type_weight",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "get_weights_sum_per_type",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "global_emission_rate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "last_user_vote",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "n_gauge_types",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "n_gauges", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "points_sum",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "points_total",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "points_type_weight",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "points_weight",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "time_sum",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "time_total",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "time_type_weight",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "time_weight",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "vote_for_gauge_weights",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "vote_user_power",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "vote_user_slopes",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "voting_escrow",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "MULTIPLIER", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "WEEK", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "WEIGHT_VOTE_DELAY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "add_gauge", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "add_type", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "apply_transfer_ownership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "change_gauge_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "change_global_emission_rate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "change_type_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changes_sum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changes_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "checkpoint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "checkpoint_gauge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commit_transfer_ownership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "future_admin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gauge_relative_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gauge_relative_weight_write",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gauge_type_names",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gauge_types",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gauge_types_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "gauges", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "get_corrected_info",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "get_gauge_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "get_total_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "get_type_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "get_weights_sum_per_type",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "global_emission_rate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "last_user_vote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "n_gauge_types",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "n_gauges", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "points_sum", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "points_total",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "points_type_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "points_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "time_sum", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "time_total", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "time_type_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "time_weight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "vote_for_gauge_weights",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vote_user_power",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vote_user_slopes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "voting_escrow",
    data: BytesLike
  ): Result;
}

export namespace AddTypeEvent {
  export type InputTuple = [name: string, type_id: BigNumberish];
  export type OutputTuple = [name: string, type_id: bigint];
  export interface OutputObject {
    name: string;
    type_id: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ApplyOwnershipEvent {
  export type InputTuple = [admin: AddressLike];
  export type OutputTuple = [admin: string];
  export interface OutputObject {
    admin: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CommitOwnershipEvent {
  export type InputTuple = [admin: AddressLike];
  export type OutputTuple = [admin: string];
  export interface OutputObject {
    admin: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewGaugeEvent {
  export type InputTuple = [
    addr: AddressLike,
    gauge_type: BigNumberish,
    weight: BigNumberish
  ];
  export type OutputTuple = [addr: string, gauge_type: bigint, weight: bigint];
  export interface OutputObject {
    addr: string;
    gauge_type: bigint;
    weight: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewGaugeWeightEvent {
  export type InputTuple = [
    gauge_address: AddressLike,
    time: BigNumberish,
    weight: BigNumberish,
    total_weight: BigNumberish
  ];
  export type OutputTuple = [
    gauge_address: string,
    time: bigint,
    weight: bigint,
    total_weight: bigint
  ];
  export interface OutputObject {
    gauge_address: string;
    time: bigint;
    weight: bigint;
    total_weight: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewTypeWeightEvent {
  export type InputTuple = [
    type_id: BigNumberish,
    time: BigNumberish,
    weight: BigNumberish,
    total_weight: BigNumberish
  ];
  export type OutputTuple = [
    type_id: bigint,
    time: bigint,
    weight: bigint,
    total_weight: bigint
  ];
  export interface OutputObject {
    type_id: bigint;
    time: bigint;
    weight: bigint;
    total_weight: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VoteForGaugeEvent {
  export type InputTuple = [
    time: BigNumberish,
    user: AddressLike,
    gauge_addr: AddressLike,
    weight: BigNumberish
  ];
  export type OutputTuple = [
    time: bigint,
    user: string,
    gauge_addr: string,
    weight: bigint
  ];
  export interface OutputObject {
    time: bigint;
    user: string;
    gauge_addr: string;
    weight: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface FraxGaugeController extends BaseContract {
  connect(runner?: ContractRunner | null): FraxGaugeController;
  waitForDeployment(): Promise<this>;

  interface: FraxGaugeControllerInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  MULTIPLIER: TypedContractMethod<[], [bigint], "view">;

  WEEK: TypedContractMethod<[], [bigint], "view">;

  WEIGHT_VOTE_DELAY: TypedContractMethod<[], [bigint], "view">;

  add_gauge: TypedContractMethod<
    [addr: AddressLike, gauge_type: BigNumberish, weight: BigNumberish],
    [void],
    "nonpayable"
  >;

  add_type: TypedContractMethod<
    [_name: string, weight: BigNumberish],
    [void],
    "nonpayable"
  >;

  admin: TypedContractMethod<[], [string], "view">;

  apply_transfer_ownership: TypedContractMethod<[], [void], "nonpayable">;

  change_gauge_weight: TypedContractMethod<
    [addr: AddressLike, weight: BigNumberish],
    [void],
    "nonpayable"
  >;

  change_global_emission_rate: TypedContractMethod<
    [new_rate: BigNumberish],
    [void],
    "nonpayable"
  >;

  change_type_weight: TypedContractMethod<
    [type_id: BigNumberish, weight: BigNumberish],
    [void],
    "nonpayable"
  >;

  changes_sum: TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [bigint],
    "view"
  >;

  changes_weight: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [bigint],
    "view"
  >;

  checkpoint: TypedContractMethod<[], [bigint], "nonpayable">;

  checkpoint_gauge: TypedContractMethod<
    [addr: AddressLike],
    [void],
    "nonpayable"
  >;

  commit_transfer_ownership: TypedContractMethod<
    [addr: AddressLike],
    [void],
    "nonpayable"
  >;

  future_admin: TypedContractMethod<[], [string], "view">;

  gauge_relative_weight: TypedContractMethod<
    [addr: AddressLike, time: BigNumberish],
    [bigint],
    "view"
  >;

  gauge_relative_weight_write: TypedContractMethod<
    [addr: AddressLike, time: BigNumberish],
    [bigint],
    "nonpayable"
  >;

  gauge_type_names: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  gauge_types: TypedContractMethod<[_addr: AddressLike], [bigint], "view">;

  gauge_types_: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  gauges: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  get_corrected_info: TypedContractMethod<
    [addr: AddressLike],
    [CorrectedPointStructOutput],
    "view"
  >;

  get_gauge_weight: TypedContractMethod<[addr: AddressLike], [bigint], "view">;

  get_total_weight: TypedContractMethod<[], [bigint], "view">;

  get_type_weight: TypedContractMethod<
    [type_id: BigNumberish],
    [bigint],
    "view"
  >;

  get_weights_sum_per_type: TypedContractMethod<
    [type_id: BigNumberish],
    [bigint],
    "view"
  >;

  global_emission_rate: TypedContractMethod<[], [bigint], "view">;

  last_user_vote: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike],
    [bigint],
    "view"
  >;

  n_gauge_types: TypedContractMethod<[], [bigint], "view">;

  n_gauges: TypedContractMethod<[], [bigint], "view">;

  points_sum: TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [[bigint, bigint] & { bias: bigint; slope: bigint }],
    "view"
  >;

  points_total: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  points_type_weight: TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [bigint],
    "view"
  >;

  points_weight: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [[bigint, bigint] & { bias: bigint; slope: bigint }],
    "view"
  >;

  time_sum: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  time_total: TypedContractMethod<[], [bigint], "view">;

  time_type_weight: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  time_weight: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  token: TypedContractMethod<[], [string], "view">;

  vote_for_gauge_weights: TypedContractMethod<
    [_gauge_addr: AddressLike, _user_weight: BigNumberish],
    [void],
    "nonpayable"
  >;

  vote_user_power: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  vote_user_slopes: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike],
    [[bigint, bigint, bigint] & { slope: bigint; power: bigint; end: bigint }],
    "view"
  >;

  voting_escrow: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "MULTIPLIER"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "WEEK"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "WEIGHT_VOTE_DELAY"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "add_gauge"
  ): TypedContractMethod<
    [addr: AddressLike, gauge_type: BigNumberish, weight: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "add_type"
  ): TypedContractMethod<
    [_name: string, weight: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "admin"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "apply_transfer_ownership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "change_gauge_weight"
  ): TypedContractMethod<
    [addr: AddressLike, weight: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "change_global_emission_rate"
  ): TypedContractMethod<[new_rate: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "change_type_weight"
  ): TypedContractMethod<
    [type_id: BigNumberish, weight: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "changes_sum"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "changes_weight"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "checkpoint"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "checkpoint_gauge"
  ): TypedContractMethod<[addr: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "commit_transfer_ownership"
  ): TypedContractMethod<[addr: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "future_admin"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "gauge_relative_weight"
  ): TypedContractMethod<
    [addr: AddressLike, time: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "gauge_relative_weight_write"
  ): TypedContractMethod<
    [addr: AddressLike, time: BigNumberish],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "gauge_type_names"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "gauge_types"
  ): TypedContractMethod<[_addr: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "gauge_types_"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "gauges"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "get_corrected_info"
  ): TypedContractMethod<
    [addr: AddressLike],
    [CorrectedPointStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "get_gauge_weight"
  ): TypedContractMethod<[addr: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "get_total_weight"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "get_type_weight"
  ): TypedContractMethod<[type_id: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "get_weights_sum_per_type"
  ): TypedContractMethod<[type_id: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "global_emission_rate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "last_user_vote"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "n_gauge_types"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "n_gauges"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "points_sum"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [[bigint, bigint] & { bias: bigint; slope: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "points_total"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "points_type_weight"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "points_weight"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [[bigint, bigint] & { bias: bigint; slope: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "time_sum"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "time_total"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "time_type_weight"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "time_weight"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "token"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "vote_for_gauge_weights"
  ): TypedContractMethod<
    [_gauge_addr: AddressLike, _user_weight: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "vote_user_power"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "vote_user_slopes"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike],
    [[bigint, bigint, bigint] & { slope: bigint; power: bigint; end: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "voting_escrow"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "AddType"
  ): TypedContractEvent<
    AddTypeEvent.InputTuple,
    AddTypeEvent.OutputTuple,
    AddTypeEvent.OutputObject
  >;
  getEvent(
    key: "ApplyOwnership"
  ): TypedContractEvent<
    ApplyOwnershipEvent.InputTuple,
    ApplyOwnershipEvent.OutputTuple,
    ApplyOwnershipEvent.OutputObject
  >;
  getEvent(
    key: "CommitOwnership"
  ): TypedContractEvent<
    CommitOwnershipEvent.InputTuple,
    CommitOwnershipEvent.OutputTuple,
    CommitOwnershipEvent.OutputObject
  >;
  getEvent(
    key: "NewGauge"
  ): TypedContractEvent<
    NewGaugeEvent.InputTuple,
    NewGaugeEvent.OutputTuple,
    NewGaugeEvent.OutputObject
  >;
  getEvent(
    key: "NewGaugeWeight"
  ): TypedContractEvent<
    NewGaugeWeightEvent.InputTuple,
    NewGaugeWeightEvent.OutputTuple,
    NewGaugeWeightEvent.OutputObject
  >;
  getEvent(
    key: "NewTypeWeight"
  ): TypedContractEvent<
    NewTypeWeightEvent.InputTuple,
    NewTypeWeightEvent.OutputTuple,
    NewTypeWeightEvent.OutputObject
  >;
  getEvent(
    key: "VoteForGauge"
  ): TypedContractEvent<
    VoteForGaugeEvent.InputTuple,
    VoteForGaugeEvent.OutputTuple,
    VoteForGaugeEvent.OutputObject
  >;

  filters: {
    "AddType(string,int128)": TypedContractEvent<
      AddTypeEvent.InputTuple,
      AddTypeEvent.OutputTuple,
      AddTypeEvent.OutputObject
    >;
    AddType: TypedContractEvent<
      AddTypeEvent.InputTuple,
      AddTypeEvent.OutputTuple,
      AddTypeEvent.OutputObject
    >;

    "ApplyOwnership(address)": TypedContractEvent<
      ApplyOwnershipEvent.InputTuple,
      ApplyOwnershipEvent.OutputTuple,
      ApplyOwnershipEvent.OutputObject
    >;
    ApplyOwnership: TypedContractEvent<
      ApplyOwnershipEvent.InputTuple,
      ApplyOwnershipEvent.OutputTuple,
      ApplyOwnershipEvent.OutputObject
    >;

    "CommitOwnership(address)": TypedContractEvent<
      CommitOwnershipEvent.InputTuple,
      CommitOwnershipEvent.OutputTuple,
      CommitOwnershipEvent.OutputObject
    >;
    CommitOwnership: TypedContractEvent<
      CommitOwnershipEvent.InputTuple,
      CommitOwnershipEvent.OutputTuple,
      CommitOwnershipEvent.OutputObject
    >;

    "NewGauge(address,int128,uint256)": TypedContractEvent<
      NewGaugeEvent.InputTuple,
      NewGaugeEvent.OutputTuple,
      NewGaugeEvent.OutputObject
    >;
    NewGauge: TypedContractEvent<
      NewGaugeEvent.InputTuple,
      NewGaugeEvent.OutputTuple,
      NewGaugeEvent.OutputObject
    >;

    "NewGaugeWeight(address,uint256,uint256,uint256)": TypedContractEvent<
      NewGaugeWeightEvent.InputTuple,
      NewGaugeWeightEvent.OutputTuple,
      NewGaugeWeightEvent.OutputObject
    >;
    NewGaugeWeight: TypedContractEvent<
      NewGaugeWeightEvent.InputTuple,
      NewGaugeWeightEvent.OutputTuple,
      NewGaugeWeightEvent.OutputObject
    >;

    "NewTypeWeight(int128,uint256,uint256,uint256)": TypedContractEvent<
      NewTypeWeightEvent.InputTuple,
      NewTypeWeightEvent.OutputTuple,
      NewTypeWeightEvent.OutputObject
    >;
    NewTypeWeight: TypedContractEvent<
      NewTypeWeightEvent.InputTuple,
      NewTypeWeightEvent.OutputTuple,
      NewTypeWeightEvent.OutputObject
    >;

    "VoteForGauge(uint256,address,address,uint256)": TypedContractEvent<
      VoteForGaugeEvent.InputTuple,
      VoteForGaugeEvent.OutputTuple,
      VoteForGaugeEvent.OutputObject
    >;
    VoteForGauge: TypedContractEvent<
      VoteForGaugeEvent.InputTuple,
      VoteForGaugeEvent.OutputTuple,
      VoteForGaugeEvent.OutputObject
    >;
  };
}