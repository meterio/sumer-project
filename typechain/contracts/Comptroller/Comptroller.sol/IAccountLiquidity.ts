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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export type ExpStruct = { mantissa: BigNumberish };

export type ExpStructOutput = [mantissa: bigint] & { mantissa: bigint };

export declare namespace IAccountLiquidity {
  export type AccountGroupLocalVarsStruct = {
    groupId: BigNumberish;
    cDepositVal: BigNumberish;
    cBorrowVal: BigNumberish;
    suDepositVal: BigNumberish;
    suBorrowVal: BigNumberish;
    intraCRate: ExpStruct;
    intraMintRate: ExpStruct;
    intraSuRate: ExpStruct;
    interCRate: ExpStruct;
    interSuRate: ExpStruct;
  };

  export type AccountGroupLocalVarsStructOutput = [
    groupId: bigint,
    cDepositVal: bigint,
    cBorrowVal: bigint,
    suDepositVal: bigint,
    suBorrowVal: bigint,
    intraCRate: ExpStructOutput,
    intraMintRate: ExpStructOutput,
    intraSuRate: ExpStructOutput,
    interCRate: ExpStructOutput,
    interSuRate: ExpStructOutput
  ] & {
    groupId: bigint;
    cDepositVal: bigint;
    cBorrowVal: bigint;
    suDepositVal: bigint;
    suBorrowVal: bigint;
    intraCRate: ExpStructOutput;
    intraMintRate: ExpStructOutput;
    intraSuRate: ExpStructOutput;
    interCRate: ExpStructOutput;
    interSuRate: ExpStructOutput;
  };
}

export interface IAccountLiquidityInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getGroupVars"
      | "getHypotheticalAccountLiquidity"
      | "getHypotheticalGroupSummary"
      | "getHypotheticalSafeLimit"
      | "getIntermediateGroupSummary"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getGroupVars",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getHypotheticalAccountLiquidity",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getHypotheticalGroupSummary",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getHypotheticalSafeLimit",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getIntermediateGroupSummary",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getGroupVars",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHypotheticalAccountLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHypotheticalGroupSummary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHypotheticalSafeLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIntermediateGroupSummary",
    data: BytesLike
  ): Result;
}

export interface IAccountLiquidity extends BaseContract {
  connect(runner?: ContractRunner | null): IAccountLiquidity;
  waitForDeployment(): Promise<this>;

  interface: IAccountLiquidityInterface;

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

  getGroupVars: TypedContractMethod<
    [
      account: AddressLike,
      cTokenModify: AddressLike,
      intraSafeLimitMantissa: BigNumberish,
      interSafeLimitMantissa: BigNumberish
    ],
    [IAccountLiquidity.AccountGroupLocalVarsStructOutput[]],
    "view"
  >;

  getHypotheticalAccountLiquidity: TypedContractMethod<
    [
      account: AddressLike,
      cTokenModify: AddressLike,
      redeemTokens: BigNumberish,
      borrowAmount: BigNumberish
    ],
    [[bigint, bigint, bigint]],
    "view"
  >;

  getHypotheticalGroupSummary: TypedContractMethod<
    [
      account: AddressLike,
      cTokenModify: AddressLike,
      redeemTokens: BigNumberish,
      borrowAmount: BigNumberish
    ],
    [[bigint, bigint, IAccountLiquidity.AccountGroupLocalVarsStructOutput]],
    "view"
  >;

  getHypotheticalSafeLimit: TypedContractMethod<
    [
      account: AddressLike,
      cTokenModify: AddressLike,
      intraSafeLimitMantissa: BigNumberish,
      interSafeLimitMantissa: BigNumberish
    ],
    [bigint],
    "view"
  >;

  getIntermediateGroupSummary: TypedContractMethod<
    [
      account: AddressLike,
      cTokenModify: AddressLike,
      redeemTokens: BigNumberish,
      borrowAmount: BigNumberish
    ],
    [[bigint, bigint, IAccountLiquidity.AccountGroupLocalVarsStructOutput]],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getGroupVars"
  ): TypedContractMethod<
    [
      account: AddressLike,
      cTokenModify: AddressLike,
      intraSafeLimitMantissa: BigNumberish,
      interSafeLimitMantissa: BigNumberish
    ],
    [IAccountLiquidity.AccountGroupLocalVarsStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getHypotheticalAccountLiquidity"
  ): TypedContractMethod<
    [
      account: AddressLike,
      cTokenModify: AddressLike,
      redeemTokens: BigNumberish,
      borrowAmount: BigNumberish
    ],
    [[bigint, bigint, bigint]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getHypotheticalGroupSummary"
  ): TypedContractMethod<
    [
      account: AddressLike,
      cTokenModify: AddressLike,
      redeemTokens: BigNumberish,
      borrowAmount: BigNumberish
    ],
    [[bigint, bigint, IAccountLiquidity.AccountGroupLocalVarsStructOutput]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getHypotheticalSafeLimit"
  ): TypedContractMethod<
    [
      account: AddressLike,
      cTokenModify: AddressLike,
      intraSafeLimitMantissa: BigNumberish,
      interSafeLimitMantissa: BigNumberish
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getIntermediateGroupSummary"
  ): TypedContractMethod<
    [
      account: AddressLike,
      cTokenModify: AddressLike,
      redeemTokens: BigNumberish,
      borrowAmount: BigNumberish
    ],
    [[bigint, bigint, IAccountLiquidity.AccountGroupLocalVarsStructOutput]],
    "view"
  >;

  filters: {};
}