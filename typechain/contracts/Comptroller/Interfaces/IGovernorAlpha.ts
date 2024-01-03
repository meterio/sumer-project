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

export interface IGovernorAlphaInterface extends Interface {
  getFunction(
    nameOrSignature: "getActions" | "getReceipt" | "proposals"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getActions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getReceipt",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "proposals",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "getActions", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getReceipt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proposals", data: BytesLike): Result;
}

export interface IGovernorAlpha extends BaseContract {
  connect(runner?: ContractRunner | null): IGovernorAlpha;
  waitForDeployment(): Promise<this>;

  interface: IGovernorAlphaInterface;

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

  getActions: TypedContractMethod<
    [proposalId: BigNumberish],
    [
      [string[], bigint[], string[], string[]] & {
        targets: string[];
        values: bigint[];
        signatures: string[];
        calldatas: string[];
      }
    ],
    "view"
  >;

  getReceipt: TypedContractMethod<
    [proposalId: BigNumberish, voter: AddressLike],
    [[boolean, boolean, bigint]],
    "view"
  >;

  proposals: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean,
        boolean
      ] & {
        id: bigint;
        proposer: string;
        eta: bigint;
        startBlock: bigint;
        endBlock: bigint;
        forVotes: bigint;
        againstVotes: bigint;
        canceled: boolean;
        executed: boolean;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getActions"
  ): TypedContractMethod<
    [proposalId: BigNumberish],
    [
      [string[], bigint[], string[], string[]] & {
        targets: string[];
        values: bigint[];
        signatures: string[];
        calldatas: string[];
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getReceipt"
  ): TypedContractMethod<
    [proposalId: BigNumberish, voter: AddressLike],
    [[boolean, boolean, bigint]],
    "view"
  >;
  getFunction(
    nameOrSignature: "proposals"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean,
        boolean
      ] & {
        id: bigint;
        proposer: string;
        eta: bigint;
        startBlock: bigint;
        endBlock: bigint;
        forVotes: bigint;
        againstVotes: bigint;
        canceled: boolean;
        executed: boolean;
      }
    ],
    "view"
  >;

  filters: {};
}
