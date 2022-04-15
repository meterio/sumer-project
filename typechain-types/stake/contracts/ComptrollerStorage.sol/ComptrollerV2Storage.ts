/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
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
} from "../../../common";

export interface ComptrollerV2StorageInterface extends utils.Interface {
  functions: {
    "accountAssets(address,uint256)": FunctionFragment;
    "admin()": FunctionFragment;
    "closeFactorMantissa()": FunctionFragment;
    "comptrollerImplementation()": FunctionFragment;
    "liquidationIncentiveMantissa()": FunctionFragment;
    "markets(address)": FunctionFragment;
    "maxAssets()": FunctionFragment;
    "oracle()": FunctionFragment;
    "pendingAdmin()": FunctionFragment;
    "pendingComptrollerImplementation()": FunctionFragment;
    "underWriterAdmin()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "accountAssets"
      | "admin"
      | "closeFactorMantissa"
      | "comptrollerImplementation"
      | "liquidationIncentiveMantissa"
      | "markets"
      | "maxAssets"
      | "oracle"
      | "pendingAdmin"
      | "pendingComptrollerImplementation"
      | "underWriterAdmin"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "accountAssets",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "closeFactorMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "comptrollerImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "liquidationIncentiveMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "markets", values: [string]): string;
  encodeFunctionData(functionFragment: "maxAssets", values?: undefined): string;
  encodeFunctionData(functionFragment: "oracle", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingAdmin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pendingComptrollerImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "underWriterAdmin",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "accountAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "closeFactorMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "comptrollerImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "liquidationIncentiveMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "markets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxAssets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "oracle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingComptrollerImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "underWriterAdmin",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ComptrollerV2Storage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ComptrollerV2StorageInterface;

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
    accountAssets(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    admin(overrides?: CallOverrides): Promise<[string]>;

    closeFactorMantissa(overrides?: CallOverrides): Promise<[BigNumber]>;

    comptrollerImplementation(overrides?: CallOverrides): Promise<[string]>;

    liquidationIncentiveMantissa(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    markets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [boolean, number, boolean] & {
        isListed: boolean;
        equalAssetGrouId: number;
        isComped: boolean;
      }
    >;

    maxAssets(overrides?: CallOverrides): Promise<[BigNumber]>;

    oracle(overrides?: CallOverrides): Promise<[string]>;

    pendingAdmin(overrides?: CallOverrides): Promise<[string]>;

    pendingComptrollerImplementation(
      overrides?: CallOverrides
    ): Promise<[string]>;

    underWriterAdmin(overrides?: CallOverrides): Promise<[string]>;
  };

  accountAssets(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  admin(overrides?: CallOverrides): Promise<string>;

  closeFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;

  comptrollerImplementation(overrides?: CallOverrides): Promise<string>;

  liquidationIncentiveMantissa(overrides?: CallOverrides): Promise<BigNumber>;

  markets(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [boolean, number, boolean] & {
      isListed: boolean;
      equalAssetGrouId: number;
      isComped: boolean;
    }
  >;

  maxAssets(overrides?: CallOverrides): Promise<BigNumber>;

  oracle(overrides?: CallOverrides): Promise<string>;

  pendingAdmin(overrides?: CallOverrides): Promise<string>;

  pendingComptrollerImplementation(overrides?: CallOverrides): Promise<string>;

  underWriterAdmin(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    accountAssets(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    admin(overrides?: CallOverrides): Promise<string>;

    closeFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    comptrollerImplementation(overrides?: CallOverrides): Promise<string>;

    liquidationIncentiveMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    markets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [boolean, number, boolean] & {
        isListed: boolean;
        equalAssetGrouId: number;
        isComped: boolean;
      }
    >;

    maxAssets(overrides?: CallOverrides): Promise<BigNumber>;

    oracle(overrides?: CallOverrides): Promise<string>;

    pendingAdmin(overrides?: CallOverrides): Promise<string>;

    pendingComptrollerImplementation(
      overrides?: CallOverrides
    ): Promise<string>;

    underWriterAdmin(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    accountAssets(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    admin(overrides?: CallOverrides): Promise<BigNumber>;

    closeFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    comptrollerImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    liquidationIncentiveMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    markets(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    maxAssets(overrides?: CallOverrides): Promise<BigNumber>;

    oracle(overrides?: CallOverrides): Promise<BigNumber>;

    pendingAdmin(overrides?: CallOverrides): Promise<BigNumber>;

    pendingComptrollerImplementation(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    underWriterAdmin(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    accountAssets(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    closeFactorMantissa(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    comptrollerImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    liquidationIncentiveMantissa(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    markets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxAssets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    oracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingComptrollerImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    underWriterAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
