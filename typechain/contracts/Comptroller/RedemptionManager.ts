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
} from "../../common";

export interface RedemptionManagerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "BETA"
      | "DECIMAL_PRECISION"
      | "DEFAULT_ADMIN_ROLE"
      | "MAX_BORROWING_FEE"
      | "MINUTE_DECAY_FACTOR"
      | "REDEMPTION_FEE_FLOOR"
      | "SECONDS_IN_ONE_MINUTE"
      | "baseRate"
      | "calcActualRepayAndSeize"
      | "comptroller"
      | "decayBaseRateFromBorrowing"
      | "getFirstProvider"
      | "getNextProvider"
      | "getRedemptionRate"
      | "getRedemptionRateWithDecay"
      | "getRoleAdmin"
      | "getRoleMember"
      | "getRoleMemberCount"
      | "grantRole"
      | "hasNoProvider"
      | "hasRole"
      | "initialize"
      | "lastFeeOperationTime"
      | "renounceRole"
      | "revokeRole"
      | "setComptroller"
      | "setSortedBorrows"
      | "sortedBorrows"
      | "supportsInterface"
      | "updateBaseRateFromRedemption"
      | "updateSortedBorrows"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "BaseRateUpdated"
      | "Initialized"
      | "LastFeeOpTimeUpdated"
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
  ): EventFragment;

  encodeFunctionData(functionFragment: "BETA", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "DECIMAL_PRECISION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_BORROWING_FEE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MINUTE_DECAY_FACTOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REDEMPTION_FEE_FLOOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SECONDS_IN_ONE_MINUTE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "baseRate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "calcActualRepayAndSeize",
    values: [BigNumberish, AddressLike, AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "comptroller",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "decayBaseRateFromBorrowing",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFirstProvider",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getNextProvider",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRedemptionRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRedemptionRateWithDecay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMember",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMemberCount",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasNoProvider",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "lastFeeOperationTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setComptroller",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setSortedBorrows",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "sortedBorrows",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateBaseRateFromRedemption",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateSortedBorrows",
    values: [AddressLike, AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "BETA", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "DECIMAL_PRECISION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_BORROWING_FEE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MINUTE_DECAY_FACTOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REDEMPTION_FEE_FLOOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SECONDS_IN_ONE_MINUTE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "baseRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calcActualRepayAndSeize",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "comptroller",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decayBaseRateFromBorrowing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFirstProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRedemptionRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRedemptionRateWithDecay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMember",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMemberCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hasNoProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastFeeOperationTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setComptroller",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSortedBorrows",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sortedBorrows",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateBaseRateFromRedemption",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSortedBorrows",
    data: BytesLike
  ): Result;
}

export namespace BaseRateUpdatedEvent {
  export type InputTuple = [_baseRate: BigNumberish];
  export type OutputTuple = [_baseRate: bigint];
  export interface OutputObject {
    _baseRate: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace LastFeeOpTimeUpdatedEvent {
  export type InputTuple = [timestamp: BigNumberish];
  export type OutputTuple = [timestamp: bigint];
  export interface OutputObject {
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface RedemptionManager extends BaseContract {
  connect(runner?: ContractRunner | null): RedemptionManager;
  waitForDeployment(): Promise<this>;

  interface: RedemptionManagerInterface;

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

  BETA: TypedContractMethod<[], [bigint], "view">;

  DECIMAL_PRECISION: TypedContractMethod<[], [bigint], "view">;

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  MAX_BORROWING_FEE: TypedContractMethod<[], [bigint], "view">;

  MINUTE_DECAY_FACTOR: TypedContractMethod<[], [bigint], "view">;

  REDEMPTION_FEE_FLOOR: TypedContractMethod<[], [bigint], "view">;

  SECONDS_IN_ONE_MINUTE: TypedContractMethod<[], [bigint], "view">;

  baseRate: TypedContractMethod<[], [bigint], "view">;

  calcActualRepayAndSeize: TypedContractMethod<
    [
      redeemAmount: BigNumberish,
      provider: AddressLike,
      cToken: AddressLike,
      suToken: AddressLike,
      oracle: AddressLike
    ],
    [[bigint, bigint, bigint, bigint]],
    "nonpayable"
  >;

  comptroller: TypedContractMethod<[], [string], "view">;

  decayBaseRateFromBorrowing: TypedContractMethod<[], [void], "nonpayable">;

  getFirstProvider: TypedContractMethod<
    [_asset: AddressLike],
    [string],
    "view"
  >;

  getNextProvider: TypedContractMethod<
    [_asset: AddressLike, _id: AddressLike],
    [string],
    "view"
  >;

  getRedemptionRate: TypedContractMethod<[], [bigint], "view">;

  getRedemptionRateWithDecay: TypedContractMethod<[], [bigint], "view">;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  getRoleMember: TypedContractMethod<
    [role: BytesLike, index: BigNumberish],
    [string],
    "view"
  >;

  getRoleMemberCount: TypedContractMethod<[role: BytesLike], [bigint], "view">;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  hasNoProvider: TypedContractMethod<[_asset: AddressLike], [boolean], "view">;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  initialize: TypedContractMethod<
    [_admin: AddressLike, _sortedBorrows: AddressLike],
    [void],
    "nonpayable"
  >;

  lastFeeOperationTime: TypedContractMethod<[], [bigint], "view">;

  renounceRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  setComptroller: TypedContractMethod<
    [_comptroller: AddressLike],
    [void],
    "nonpayable"
  >;

  setSortedBorrows: TypedContractMethod<
    [_sortedBorrows: AddressLike],
    [void],
    "nonpayable"
  >;

  sortedBorrows: TypedContractMethod<[], [string], "view">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  updateBaseRateFromRedemption: TypedContractMethod<
    [redeemAmount: BigNumberish, _totalSupply: BigNumberish],
    [bigint],
    "nonpayable"
  >;

  updateSortedBorrows: TypedContractMethod<
    [csuToken: AddressLike, borrower: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "BETA"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "DECIMAL_PRECISION"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "DEFAULT_ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "MAX_BORROWING_FEE"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MINUTE_DECAY_FACTOR"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "REDEMPTION_FEE_FLOOR"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "SECONDS_IN_ONE_MINUTE"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "baseRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "calcActualRepayAndSeize"
  ): TypedContractMethod<
    [
      redeemAmount: BigNumberish,
      provider: AddressLike,
      cToken: AddressLike,
      suToken: AddressLike,
      oracle: AddressLike
    ],
    [[bigint, bigint, bigint, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "comptroller"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "decayBaseRateFromBorrowing"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getFirstProvider"
  ): TypedContractMethod<[_asset: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "getNextProvider"
  ): TypedContractMethod<
    [_asset: AddressLike, _id: AddressLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRedemptionRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getRedemptionRateWithDecay"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "getRoleMember"
  ): TypedContractMethod<
    [role: BytesLike, index: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRoleMemberCount"
  ): TypedContractMethod<[role: BytesLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "grantRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "hasNoProvider"
  ): TypedContractMethod<[_asset: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "hasRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [_admin: AddressLike, _sortedBorrows: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "lastFeeOperationTime"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setComptroller"
  ): TypedContractMethod<[_comptroller: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setSortedBorrows"
  ): TypedContractMethod<[_sortedBorrows: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "sortedBorrows"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "updateBaseRateFromRedemption"
  ): TypedContractMethod<
    [redeemAmount: BigNumberish, _totalSupply: BigNumberish],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateSortedBorrows"
  ): TypedContractMethod<
    [csuToken: AddressLike, borrower: AddressLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "BaseRateUpdated"
  ): TypedContractEvent<
    BaseRateUpdatedEvent.InputTuple,
    BaseRateUpdatedEvent.OutputTuple,
    BaseRateUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "LastFeeOpTimeUpdated"
  ): TypedContractEvent<
    LastFeeOpTimeUpdatedEvent.InputTuple,
    LastFeeOpTimeUpdatedEvent.OutputTuple,
    LastFeeOpTimeUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "RoleAdminChanged"
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleGranted"
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: "RoleRevoked"
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;

  filters: {
    "BaseRateUpdated(uint256)": TypedContractEvent<
      BaseRateUpdatedEvent.InputTuple,
      BaseRateUpdatedEvent.OutputTuple,
      BaseRateUpdatedEvent.OutputObject
    >;
    BaseRateUpdated: TypedContractEvent<
      BaseRateUpdatedEvent.InputTuple,
      BaseRateUpdatedEvent.OutputTuple,
      BaseRateUpdatedEvent.OutputObject
    >;

    "Initialized(uint8)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "LastFeeOpTimeUpdated(uint256)": TypedContractEvent<
      LastFeeOpTimeUpdatedEvent.InputTuple,
      LastFeeOpTimeUpdatedEvent.OutputTuple,
      LastFeeOpTimeUpdatedEvent.OutputObject
    >;
    LastFeeOpTimeUpdated: TypedContractEvent<
      LastFeeOpTimeUpdatedEvent.InputTuple,
      LastFeeOpTimeUpdatedEvent.OutputTuple,
      LastFeeOpTimeUpdatedEvent.OutputObject
    >;

    "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    "RoleGranted(bytes32,address,address)": TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    "RoleRevoked(bytes32,address,address)": TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
  };
}
