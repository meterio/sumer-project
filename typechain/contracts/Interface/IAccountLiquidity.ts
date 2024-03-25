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
} from "../../common";

export interface IAccountLiquidityInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getHypotheticalAccountLiquidity"
      | "getHypotheticalSafeLimit"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getHypotheticalAccountLiquidity",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getHypotheticalSafeLimit",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getHypotheticalAccountLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHypotheticalSafeLimit",
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

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

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

  filters: {};
}
