/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
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
} from "../common";

export interface MaximillionInterface extends utils.Interface {
  functions: {
    "cEther()": FunctionFragment;
    "repayBehalf(address)": FunctionFragment;
    "repayBehalfExplicit(address,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "cEther" | "repayBehalf" | "repayBehalfExplicit"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "cEther", values?: undefined): string;
  encodeFunctionData(functionFragment: "repayBehalf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "repayBehalfExplicit",
    values: [string, string]
  ): string;

  decodeFunctionResult(functionFragment: "cEther", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "repayBehalf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "repayBehalfExplicit",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Maximillion extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MaximillionInterface;

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
    cEther(overrides?: CallOverrides): Promise<[string]>;

    repayBehalf(
      borrower: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    repayBehalfExplicit(
      borrower: string,
      cEther_: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  cEther(overrides?: CallOverrides): Promise<string>;

  repayBehalf(
    borrower: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  repayBehalfExplicit(
    borrower: string,
    cEther_: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    cEther(overrides?: CallOverrides): Promise<string>;

    repayBehalf(borrower: string, overrides?: CallOverrides): Promise<void>;

    repayBehalfExplicit(
      borrower: string,
      cEther_: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    cEther(overrides?: CallOverrides): Promise<BigNumber>;

    repayBehalf(
      borrower: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    repayBehalfExplicit(
      borrower: string,
      cEther_: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cEther(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    repayBehalf(
      borrower: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    repayBehalfExplicit(
      borrower: string,
      cEther_: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
