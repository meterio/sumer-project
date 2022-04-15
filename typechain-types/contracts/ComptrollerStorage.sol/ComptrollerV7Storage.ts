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
} from "../../common";

export interface ComptrollerV7StorageInterface extends utils.Interface {
  functions: {
    "accountAssets(address,uint256)": FunctionFragment;
    "admin()": FunctionFragment;
    "allMarkets(uint256)": FunctionFragment;
    "closeFactorMantissa()": FunctionFragment;
    "compAccrued(address)": FunctionFragment;
    "compBorrowSpeeds(address)": FunctionFragment;
    "compBorrowState(address)": FunctionFragment;
    "compBorrowerIndex(address,address)": FunctionFragment;
    "compContributorSpeeds(address)": FunctionFragment;
    "compRate()": FunctionFragment;
    "compSpeeds(address)": FunctionFragment;
    "compSupplierIndex(address,address)": FunctionFragment;
    "compSupplySpeeds(address)": FunctionFragment;
    "compSupplyState(address)": FunctionFragment;
    "comptrollerImplementation()": FunctionFragment;
    "lastContributorBlock(address)": FunctionFragment;
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
      | "allMarkets"
      | "closeFactorMantissa"
      | "compAccrued"
      | "compBorrowSpeeds"
      | "compBorrowState"
      | "compBorrowerIndex"
      | "compContributorSpeeds"
      | "compRate"
      | "compSpeeds"
      | "compSupplierIndex"
      | "compSupplySpeeds"
      | "compSupplyState"
      | "comptrollerImplementation"
      | "lastContributorBlock"
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
    functionFragment: "allMarkets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "closeFactorMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "compAccrued", values: [string]): string;
  encodeFunctionData(
    functionFragment: "compBorrowSpeeds",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "compBorrowState",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "compBorrowerIndex",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "compContributorSpeeds",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "compRate", values?: undefined): string;
  encodeFunctionData(functionFragment: "compSpeeds", values: [string]): string;
  encodeFunctionData(
    functionFragment: "compSupplierIndex",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "compSupplySpeeds",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "compSupplyState",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "comptrollerImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastContributorBlock",
    values: [string]
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
  decodeFunctionResult(functionFragment: "allMarkets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "closeFactorMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "compAccrued",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "compBorrowSpeeds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "compBorrowState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "compBorrowerIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "compContributorSpeeds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "compRate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "compSpeeds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "compSupplierIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "compSupplySpeeds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "compSupplyState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "comptrollerImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastContributorBlock",
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

export interface ComptrollerV7Storage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ComptrollerV7StorageInterface;

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

    allMarkets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    closeFactorMantissa(overrides?: CallOverrides): Promise<[BigNumber]>;

    compAccrued(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    compBorrowSpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    compBorrowState(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, number] & { index: BigNumber; block: number }>;

    compBorrowerIndex(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    compContributorSpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    compRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    compSpeeds(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    compSupplierIndex(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    compSupplySpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    compSupplyState(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, number] & { index: BigNumber; block: number }>;

    comptrollerImplementation(overrides?: CallOverrides): Promise<[string]>;

    lastContributorBlock(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

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

  allMarkets(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  closeFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;

  compAccrued(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  compBorrowSpeeds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  compBorrowState(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, number] & { index: BigNumber; block: number }>;

  compBorrowerIndex(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  compContributorSpeeds(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  compRate(overrides?: CallOverrides): Promise<BigNumber>;

  compSpeeds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  compSupplierIndex(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  compSupplySpeeds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  compSupplyState(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, number] & { index: BigNumber; block: number }>;

  comptrollerImplementation(overrides?: CallOverrides): Promise<string>;

  lastContributorBlock(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

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

    allMarkets(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    closeFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    compAccrued(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    compBorrowSpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compBorrowState(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, number] & { index: BigNumber; block: number }>;

    compBorrowerIndex(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compContributorSpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compRate(overrides?: CallOverrides): Promise<BigNumber>;

    compSpeeds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    compSupplierIndex(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compSupplySpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compSupplyState(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, number] & { index: BigNumber; block: number }>;

    comptrollerImplementation(overrides?: CallOverrides): Promise<string>;

    lastContributorBlock(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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

    allMarkets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    closeFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    compAccrued(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    compBorrowSpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compBorrowState(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compBorrowerIndex(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compContributorSpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compRate(overrides?: CallOverrides): Promise<BigNumber>;

    compSpeeds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    compSupplierIndex(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compSupplySpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compSupplyState(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    comptrollerImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    lastContributorBlock(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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

    allMarkets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    closeFactorMantissa(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compAccrued(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compBorrowSpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compBorrowState(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compBorrowerIndex(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compContributorSpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    compSpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compSupplierIndex(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compSupplySpeeds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compSupplyState(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    comptrollerImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastContributorBlock(
      arg0: string,
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
