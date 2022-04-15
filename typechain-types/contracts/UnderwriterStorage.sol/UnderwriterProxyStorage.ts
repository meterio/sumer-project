/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface UnderwriterProxyStorageInterface extends utils.Interface {
  functions: {
    "admin()": FunctionFragment;
    "implementation()": FunctionFragment;
    "pendingAdmin()": FunctionFragment;
    "pendingImplementation()": FunctionFragment;
    "underWriterAdmin()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "admin"
      | "implementation"
      | "pendingAdmin"
      | "pendingImplementation"
      | "underWriterAdmin"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pendingAdmin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pendingImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "underWriterAdmin",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "underWriterAdmin",
    data: BytesLike
  ): Result;

  events: {};
}

export interface UnderwriterProxyStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: UnderwriterProxyStorageInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    admin(overrides?: CallOverrides): Promise<[string]>;

    implementation(overrides?: CallOverrides): Promise<[string]>;

    pendingAdmin(overrides?: CallOverrides): Promise<[string]>;

    pendingImplementation(overrides?: CallOverrides): Promise<[string]>;

    underWriterAdmin(overrides?: CallOverrides): Promise<[string]>;
  };

  admin(overrides?: CallOverrides): Promise<string>;

  implementation(overrides?: CallOverrides): Promise<string>;

  pendingAdmin(overrides?: CallOverrides): Promise<string>;

  pendingImplementation(overrides?: CallOverrides): Promise<string>;

  underWriterAdmin(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    admin(overrides?: CallOverrides): Promise<string>;

    implementation(overrides?: CallOverrides): Promise<string>;

    pendingAdmin(overrides?: CallOverrides): Promise<string>;

    pendingImplementation(overrides?: CallOverrides): Promise<string>;

    underWriterAdmin(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    admin(overrides?: CallOverrides): Promise<BigNumber>;

    implementation(overrides?: CallOverrides): Promise<BigNumber>;

    pendingAdmin(overrides?: CallOverrides): Promise<BigNumber>;

    pendingImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    underWriterAdmin(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    implementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    underWriterAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
