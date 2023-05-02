/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IComptrollerInterface extends ethers.utils.Interface {
  functions: {
    "_getMarketBorrowCap(address)": FunctionFragment;
    "borrowAllowed(address,address,uint256)": FunctionFragment;
    "claimComp(address)": FunctionFragment;
    "closeFactorMantissa()": FunctionFragment;
    "compAccrued(address)": FunctionFragment;
    "enterMarkets(address[])": FunctionFragment;
    "exitMarket(address)": FunctionFragment;
    "getAccountLiquidity(address)": FunctionFragment;
    "getAllMarkets()": FunctionFragment;
    "getAssetsIn(address)": FunctionFragment;
    "getHypotheticalAccountLiquidity(address,address,uint256,uint256)": FunctionFragment;
    "isComptroller()": FunctionFragment;
    "isListed(address)": FunctionFragment;
    "liquidationIncentiveMantissa()": FunctionFragment;
    "marketGroupId(address)": FunctionFragment;
    "markets(address)": FunctionFragment;
    "mintAllowed(address,address,uint256)": FunctionFragment;
    "oracle()": FunctionFragment;
    "redeemAllowed(address,address,uint256)": FunctionFragment;
    "redeemVerify(address,address,uint256,uint256)": FunctionFragment;
    "repayBorrowAllowed(address,address,address,uint256)": FunctionFragment;
    "seizeAllowed(address,address,address,address,uint256)": FunctionFragment;
    "transferAllowed(address,address,address,uint256)": FunctionFragment;
    "underWriterAdmin()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_getMarketBorrowCap",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowAllowed",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "claimComp", values: [string]): string;
  encodeFunctionData(
    functionFragment: "closeFactorMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "compAccrued", values: [string]): string;
  encodeFunctionData(
    functionFragment: "enterMarkets",
    values: [string[]]
  ): string;
  encodeFunctionData(functionFragment: "exitMarket", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getAccountLiquidity",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllMarkets",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getAssetsIn", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getHypotheticalAccountLiquidity",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isComptroller",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "isListed", values: [string]): string;
  encodeFunctionData(
    functionFragment: "liquidationIncentiveMantissa",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "marketGroupId",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "markets", values: [string]): string;
  encodeFunctionData(
    functionFragment: "mintAllowed",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "oracle", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "redeemAllowed",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "redeemVerify",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "repayBorrowAllowed",
    values: [string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "seizeAllowed",
    values: [string, string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferAllowed",
    values: [string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "underWriterAdmin",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "_getMarketBorrowCap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "borrowAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimComp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "closeFactorMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "compAccrued",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enterMarkets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exitMarket", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAccountLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllMarkets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAssetsIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHypotheticalAccountLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isComptroller",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isListed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "liquidationIncentiveMantissa",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "marketGroupId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "markets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "oracle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redeemAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "redeemVerify",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "repayBorrowAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "seizeAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "underWriterAdmin",
    data: BytesLike
  ): Result;

  events: {};
}

export class IComptroller extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IComptrollerInterface;

  functions: {
    _getMarketBorrowCap(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    borrowAllowed(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimComp(
      arg0: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    closeFactorMantissa(overrides?: CallOverrides): Promise<[BigNumber]>;

    compAccrued(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    enterMarkets(
      cTokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exitMarket(
      cToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAccountLiquidity(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber]>;

    getAllMarkets(overrides?: CallOverrides): Promise<[string[]]>;

    getAssetsIn(
      account: string,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getHypotheticalAccountLiquidity(
      account: string,
      cTokenModify: string,
      redeemTokens: BigNumberish,
      borrowAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber]>;

    isComptroller(overrides?: CallOverrides): Promise<[boolean]>;

    isListed(asset: string, overrides?: CallOverrides): Promise<[boolean]>;

    liquidationIncentiveMantissa(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    marketGroupId(asset: string, overrides?: CallOverrides): Promise<[number]>;

    markets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean, number, boolean]>;

    mintAllowed(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    oracle(overrides?: CallOverrides): Promise<[string]>;

    redeemAllowed(
      cToken: string,
      redeemer: string,
      redeemTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    redeemVerify(
      cToken: string,
      redeemer: string,
      redeemAmount: BigNumberish,
      redeemTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    repayBorrowAllowed(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    seizeAllowed(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferAllowed(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    underWriterAdmin(overrides?: CallOverrides): Promise<[string]>;
  };

  _getMarketBorrowCap(
    cToken: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  borrowAllowed(
    cToken: string,
    borrower: string,
    borrowAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimComp(
    arg0: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  closeFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;

  compAccrued(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  enterMarkets(
    cTokens: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exitMarket(
    cToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAccountLiquidity(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber, BigNumber]>;

  getAllMarkets(overrides?: CallOverrides): Promise<string[]>;

  getAssetsIn(account: string, overrides?: CallOverrides): Promise<string[]>;

  getHypotheticalAccountLiquidity(
    account: string,
    cTokenModify: string,
    redeemTokens: BigNumberish,
    borrowAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber, BigNumber]>;

  isComptroller(overrides?: CallOverrides): Promise<boolean>;

  isListed(asset: string, overrides?: CallOverrides): Promise<boolean>;

  liquidationIncentiveMantissa(overrides?: CallOverrides): Promise<BigNumber>;

  marketGroupId(asset: string, overrides?: CallOverrides): Promise<number>;

  markets(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<[boolean, number, boolean]>;

  mintAllowed(
    cToken: string,
    minter: string,
    mintAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  oracle(overrides?: CallOverrides): Promise<string>;

  redeemAllowed(
    cToken: string,
    redeemer: string,
    redeemTokens: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  redeemVerify(
    cToken: string,
    redeemer: string,
    redeemAmount: BigNumberish,
    redeemTokens: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  repayBorrowAllowed(
    cToken: string,
    payer: string,
    borrower: string,
    repayAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  seizeAllowed(
    cTokenCollateral: string,
    cTokenBorrowed: string,
    liquidator: string,
    borrower: string,
    seizeTokens: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferAllowed(
    cToken: string,
    src: string,
    dst: string,
    transferTokens: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  underWriterAdmin(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    _getMarketBorrowCap(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrowAllowed(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimComp(arg0: string, overrides?: CallOverrides): Promise<void>;

    closeFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    compAccrued(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    enterMarkets(
      cTokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    exitMarket(cToken: string, overrides?: CallOverrides): Promise<BigNumber>;

    getAccountLiquidity(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber]>;

    getAllMarkets(overrides?: CallOverrides): Promise<string[]>;

    getAssetsIn(account: string, overrides?: CallOverrides): Promise<string[]>;

    getHypotheticalAccountLiquidity(
      account: string,
      cTokenModify: string,
      redeemTokens: BigNumberish,
      borrowAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber]>;

    isComptroller(overrides?: CallOverrides): Promise<boolean>;

    isListed(asset: string, overrides?: CallOverrides): Promise<boolean>;

    liquidationIncentiveMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    marketGroupId(asset: string, overrides?: CallOverrides): Promise<number>;

    markets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean, number, boolean]>;

    mintAllowed(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    oracle(overrides?: CallOverrides): Promise<string>;

    redeemAllowed(
      cToken: string,
      redeemer: string,
      redeemTokens: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    redeemVerify(
      cToken: string,
      redeemer: string,
      redeemAmount: BigNumberish,
      redeemTokens: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    repayBorrowAllowed(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    seizeAllowed(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferAllowed(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    underWriterAdmin(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    _getMarketBorrowCap(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrowAllowed(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimComp(
      arg0: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    closeFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    compAccrued(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    enterMarkets(
      cTokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exitMarket(
      cToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAccountLiquidity(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllMarkets(overrides?: CallOverrides): Promise<BigNumber>;

    getAssetsIn(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    getHypotheticalAccountLiquidity(
      account: string,
      cTokenModify: string,
      redeemTokens: BigNumberish,
      borrowAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isComptroller(overrides?: CallOverrides): Promise<BigNumber>;

    isListed(asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    liquidationIncentiveMantissa(overrides?: CallOverrides): Promise<BigNumber>;

    marketGroupId(asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    markets(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    mintAllowed(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    oracle(overrides?: CallOverrides): Promise<BigNumber>;

    redeemAllowed(
      cToken: string,
      redeemer: string,
      redeemTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    redeemVerify(
      cToken: string,
      redeemer: string,
      redeemAmount: BigNumberish,
      redeemTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    repayBorrowAllowed(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    seizeAllowed(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferAllowed(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    underWriterAdmin(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _getMarketBorrowCap(
      cToken: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    borrowAllowed(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimComp(
      arg0: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    closeFactorMantissa(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compAccrued(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    enterMarkets(
      cTokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exitMarket(
      cToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAccountLiquidity(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAllMarkets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAssetsIn(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getHypotheticalAccountLiquidity(
      account: string,
      cTokenModify: string,
      redeemTokens: BigNumberish,
      borrowAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isComptroller(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isListed(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    liquidationIncentiveMantissa(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    marketGroupId(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    markets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintAllowed(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    oracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemAllowed(
      cToken: string,
      redeemer: string,
      redeemTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    redeemVerify(
      cToken: string,
      redeemer: string,
      redeemAmount: BigNumberish,
      redeemTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    repayBorrowAllowed(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    seizeAllowed(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferAllowed(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    underWriterAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
