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

export interface ComptrollerStorageInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "_borrowGuardianPaused"
      | "_mintGuardianPaused"
      | "accountAssets"
      | "allMarkets"
      | "assetGroupIdToIndex"
      | "borrowCapGuardian"
      | "borrowCaps"
      | "borrowGuardianPaused"
      | "closeFactorMantissa"
      | "governanceToken"
      | "heteroLiquidationIncentiveMantissa"
      | "homoLiquidationIncentiveMantissa"
      | "isComptroller"
      | "markets"
      | "maxSupply"
      | "mintGuardianPaused"
      | "pauseGuardian"
      | "seizeGuardianPaused"
      | "suTokenRateMantissa"
      | "sutokenLiquidationIncentiveMantissa"
      | "transferGuardianPaused"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "MarketEntered"
      | "MarketExited"
      | "MarketListed"
      | "NewCloseFactor"
      | "NewLiquidationIncentive"
      | "NewPriceOracle"
      | "SetMaxSupply"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "_borrowGuardianPaused",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_mintGuardianPaused",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "accountAssets",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allMarkets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "assetGroupIdToIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowCapGuardian",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "borrowCaps",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowGuardianPaused",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "closeFactorMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governanceToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "heteroLiquidationIncentiveMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "homoLiquidationIncentiveMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isComptroller",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "markets",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "maxSupply",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "mintGuardianPaused",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "pauseGuardian",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "seizeGuardianPaused",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "suTokenRateMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sutokenLiquidationIncentiveMantissa",
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
    functionFragment: "_mintGuardianPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "accountAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allMarkets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "assetGroupIdToIndex",
    data: BytesLike
  ): Result;
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
    functionFragment: "closeFactorMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "heteroLiquidationIncentiveMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "homoLiquidationIncentiveMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isComptroller",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "markets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxSupply", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintGuardianPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pauseGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "seizeGuardianPaused",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "suTokenRateMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sutokenLiquidationIncentiveMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferGuardianPaused",
    data: BytesLike
  ): Result;
}

export namespace MarketEnteredEvent {
  export type InputTuple = [cToken: AddressLike, account: AddressLike];
  export type OutputTuple = [cToken: string, account: string];
  export interface OutputObject {
    cToken: string;
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MarketExitedEvent {
  export type InputTuple = [cToken: AddressLike, account: AddressLike];
  export type OutputTuple = [cToken: string, account: string];
  export interface OutputObject {
    cToken: string;
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MarketListedEvent {
  export type InputTuple = [cToken: AddressLike];
  export type OutputTuple = [cToken: string];
  export interface OutputObject {
    cToken: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewCloseFactorEvent {
  export type InputTuple = [
    oldCloseFactorMantissa: BigNumberish,
    newCloseFactorMantissa: BigNumberish
  ];
  export type OutputTuple = [
    oldCloseFactorMantissa: bigint,
    newCloseFactorMantissa: bigint
  ];
  export interface OutputObject {
    oldCloseFactorMantissa: bigint;
    newCloseFactorMantissa: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewLiquidationIncentiveEvent {
  export type InputTuple = [
    oldHeteroIncentive: BigNumberish,
    newHeteroIncentive: BigNumberish,
    oldHomoIncentive: BigNumberish,
    newHomoIncentive: BigNumberish,
    oldSutokenIncentive: BigNumberish,
    newSutokenIncentive: BigNumberish
  ];
  export type OutputTuple = [
    oldHeteroIncentive: bigint,
    newHeteroIncentive: bigint,
    oldHomoIncentive: bigint,
    newHomoIncentive: bigint,
    oldSutokenIncentive: bigint,
    newSutokenIncentive: bigint
  ];
  export interface OutputObject {
    oldHeteroIncentive: bigint;
    newHeteroIncentive: bigint;
    oldHomoIncentive: bigint;
    newHomoIncentive: bigint;
    oldSutokenIncentive: bigint;
    newSutokenIncentive: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewPriceOracleEvent {
  export type InputTuple = [
    oldPriceOracle: AddressLike,
    newPriceOracle: AddressLike
  ];
  export type OutputTuple = [oldPriceOracle: string, newPriceOracle: string];
  export interface OutputObject {
    oldPriceOracle: string;
    newPriceOracle: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetMaxSupplyEvent {
  export type InputTuple = [cToken: AddressLike, amount: BigNumberish];
  export type OutputTuple = [cToken: string, amount: bigint];
  export interface OutputObject {
    cToken: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ComptrollerStorage extends BaseContract {
  connect(runner?: ContractRunner | null): ComptrollerStorage;
  waitForDeployment(): Promise<this>;

  interface: ComptrollerStorageInterface;

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

  _borrowGuardianPaused: TypedContractMethod<[], [boolean], "view">;

  _mintGuardianPaused: TypedContractMethod<[], [boolean], "view">;

  accountAssets: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [string],
    "view"
  >;

  allMarkets: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  assetGroupIdToIndex: TypedContractMethod<
    [arg0: BigNumberish],
    [bigint],
    "view"
  >;

  borrowCapGuardian: TypedContractMethod<[], [string], "view">;

  borrowCaps: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  borrowGuardianPaused: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  closeFactorMantissa: TypedContractMethod<[], [bigint], "view">;

  governanceToken: TypedContractMethod<[], [string], "view">;

  heteroLiquidationIncentiveMantissa: TypedContractMethod<[], [bigint], "view">;

  homoLiquidationIncentiveMantissa: TypedContractMethod<[], [bigint], "view">;

  isComptroller: TypedContractMethod<[], [boolean], "view">;

  markets: TypedContractMethod<
    [arg0: AddressLike],
    [
      [boolean, bigint, boolean] & {
        isListed: boolean;
        assetGroupId: bigint;
        isComped: boolean;
      }
    ],
    "view"
  >;

  maxSupply: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  mintGuardianPaused: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  pauseGuardian: TypedContractMethod<[], [string], "view">;

  seizeGuardianPaused: TypedContractMethod<[], [boolean], "view">;

  suTokenRateMantissa: TypedContractMethod<[], [bigint], "view">;

  sutokenLiquidationIncentiveMantissa: TypedContractMethod<
    [],
    [bigint],
    "view"
  >;

  transferGuardianPaused: TypedContractMethod<[], [boolean], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "_borrowGuardianPaused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "_mintGuardianPaused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "accountAssets"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "allMarkets"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "assetGroupIdToIndex"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "borrowCapGuardian"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "borrowCaps"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "borrowGuardianPaused"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "closeFactorMantissa"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "governanceToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "heteroLiquidationIncentiveMantissa"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "homoLiquidationIncentiveMantissa"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "isComptroller"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "markets"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [boolean, bigint, boolean] & {
        isListed: boolean;
        assetGroupId: bigint;
        isComped: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "maxSupply"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "mintGuardianPaused"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "pauseGuardian"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "seizeGuardianPaused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "suTokenRateMantissa"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "sutokenLiquidationIncentiveMantissa"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transferGuardianPaused"
  ): TypedContractMethod<[], [boolean], "view">;

  getEvent(
    key: "MarketEntered"
  ): TypedContractEvent<
    MarketEnteredEvent.InputTuple,
    MarketEnteredEvent.OutputTuple,
    MarketEnteredEvent.OutputObject
  >;
  getEvent(
    key: "MarketExited"
  ): TypedContractEvent<
    MarketExitedEvent.InputTuple,
    MarketExitedEvent.OutputTuple,
    MarketExitedEvent.OutputObject
  >;
  getEvent(
    key: "MarketListed"
  ): TypedContractEvent<
    MarketListedEvent.InputTuple,
    MarketListedEvent.OutputTuple,
    MarketListedEvent.OutputObject
  >;
  getEvent(
    key: "NewCloseFactor"
  ): TypedContractEvent<
    NewCloseFactorEvent.InputTuple,
    NewCloseFactorEvent.OutputTuple,
    NewCloseFactorEvent.OutputObject
  >;
  getEvent(
    key: "NewLiquidationIncentive"
  ): TypedContractEvent<
    NewLiquidationIncentiveEvent.InputTuple,
    NewLiquidationIncentiveEvent.OutputTuple,
    NewLiquidationIncentiveEvent.OutputObject
  >;
  getEvent(
    key: "NewPriceOracle"
  ): TypedContractEvent<
    NewPriceOracleEvent.InputTuple,
    NewPriceOracleEvent.OutputTuple,
    NewPriceOracleEvent.OutputObject
  >;
  getEvent(
    key: "SetMaxSupply"
  ): TypedContractEvent<
    SetMaxSupplyEvent.InputTuple,
    SetMaxSupplyEvent.OutputTuple,
    SetMaxSupplyEvent.OutputObject
  >;

  filters: {
    "MarketEntered(address,address)": TypedContractEvent<
      MarketEnteredEvent.InputTuple,
      MarketEnteredEvent.OutputTuple,
      MarketEnteredEvent.OutputObject
    >;
    MarketEntered: TypedContractEvent<
      MarketEnteredEvent.InputTuple,
      MarketEnteredEvent.OutputTuple,
      MarketEnteredEvent.OutputObject
    >;

    "MarketExited(address,address)": TypedContractEvent<
      MarketExitedEvent.InputTuple,
      MarketExitedEvent.OutputTuple,
      MarketExitedEvent.OutputObject
    >;
    MarketExited: TypedContractEvent<
      MarketExitedEvent.InputTuple,
      MarketExitedEvent.OutputTuple,
      MarketExitedEvent.OutputObject
    >;

    "MarketListed(address)": TypedContractEvent<
      MarketListedEvent.InputTuple,
      MarketListedEvent.OutputTuple,
      MarketListedEvent.OutputObject
    >;
    MarketListed: TypedContractEvent<
      MarketListedEvent.InputTuple,
      MarketListedEvent.OutputTuple,
      MarketListedEvent.OutputObject
    >;

    "NewCloseFactor(uint256,uint256)": TypedContractEvent<
      NewCloseFactorEvent.InputTuple,
      NewCloseFactorEvent.OutputTuple,
      NewCloseFactorEvent.OutputObject
    >;
    NewCloseFactor: TypedContractEvent<
      NewCloseFactorEvent.InputTuple,
      NewCloseFactorEvent.OutputTuple,
      NewCloseFactorEvent.OutputObject
    >;

    "NewLiquidationIncentive(uint256,uint256,uint256,uint256,uint256,uint256)": TypedContractEvent<
      NewLiquidationIncentiveEvent.InputTuple,
      NewLiquidationIncentiveEvent.OutputTuple,
      NewLiquidationIncentiveEvent.OutputObject
    >;
    NewLiquidationIncentive: TypedContractEvent<
      NewLiquidationIncentiveEvent.InputTuple,
      NewLiquidationIncentiveEvent.OutputTuple,
      NewLiquidationIncentiveEvent.OutputObject
    >;

    "NewPriceOracle(address,address)": TypedContractEvent<
      NewPriceOracleEvent.InputTuple,
      NewPriceOracleEvent.OutputTuple,
      NewPriceOracleEvent.OutputObject
    >;
    NewPriceOracle: TypedContractEvent<
      NewPriceOracleEvent.InputTuple,
      NewPriceOracleEvent.OutputTuple,
      NewPriceOracleEvent.OutputObject
    >;

    "SetMaxSupply(address,uint256)": TypedContractEvent<
      SetMaxSupplyEvent.InputTuple,
      SetMaxSupplyEvent.OutputTuple,
      SetMaxSupplyEvent.OutputObject
    >;
    SetMaxSupply: TypedContractEvent<
      SetMaxSupplyEvent.InputTuple,
      SetMaxSupplyEvent.OutputTuple,
      SetMaxSupplyEvent.OutputObject
    >;
  };
}
