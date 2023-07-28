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

interface ICTokenInterface extends ethers.utils.Interface {
  functions: {
    "_acceptAdmin()": FunctionFragment;
    "_reduceReserves(uint256)": FunctionFragment;
    "_setComptroller(address)": FunctionFragment;
    "_setDiscountRate(uint256)": FunctionFragment;
    "_setInterestRateModel(address)": FunctionFragment;
    "_setPendingAdmin(address)": FunctionFragment;
    "_setReserveFactor(uint256)": FunctionFragment;
    "accrualBlockNumber()": FunctionFragment;
    "accrueInterest()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "balanceOfUnderlying(address)": FunctionFragment;
    "borrowBalanceCurrent(address)": FunctionFragment;
    "borrowBalanceStored(address)": FunctionFragment;
    "borrowRatePerBlock()": FunctionFragment;
    "exchangeRateCurrent()": FunctionFragment;
    "exchangeRateStored()": FunctionFragment;
    "getAccountSnapshot(address)": FunctionFragment;
    "getCash()": FunctionFragment;
    "getDiscountRate()": FunctionFragment;
    "seize(address,address,uint256)": FunctionFragment;
    "supplyRatePerBlock()": FunctionFragment;
    "totalBorrowsCurrent()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_acceptAdmin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_reduceReserves",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_setComptroller",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_setDiscountRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_setInterestRateModel",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_setPendingAdmin",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_setReserveFactor",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "accrualBlockNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "accrueInterest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "balanceOfUnderlying",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowBalanceCurrent",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowBalanceStored",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowRatePerBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeRateCurrent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeRateStored",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAccountSnapshot",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "getCash", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getDiscountRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "seize",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supplyRatePerBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalBorrowsCurrent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "_acceptAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_reduceReserves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setComptroller",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setDiscountRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setInterestRateModel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setPendingAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setReserveFactor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "accrualBlockNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "accrueInterest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfUnderlying",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "borrowBalanceCurrent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "borrowBalanceStored",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "borrowRatePerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeRateCurrent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeRateStored",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccountSnapshot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getCash", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDiscountRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "seize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supplyRatePerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalBorrowsCurrent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;

  events: {
    "AccrueInterest(uint256,uint256,uint256,uint256)": EventFragment;
    "Approval(address,address,uint256)": EventFragment;
    "Borrow(address,uint256,uint256,uint256)": EventFragment;
    "LiquidateBorrow(address,address,uint256,address,uint256)": EventFragment;
    "Mint(address,uint256,uint256)": EventFragment;
    "NewAdmin(address,address)": EventFragment;
    "NewComptroller(address,address)": EventFragment;
    "NewDiscountRate(uint256,uint256)": EventFragment;
    "NewMarketInterestRateModel(address,address)": EventFragment;
    "NewPendingAdmin(address,address)": EventFragment;
    "NewReserveFactor(uint256,uint256)": EventFragment;
    "Redeem(address,uint256,uint256)": EventFragment;
    "RepayBorrow(address,address,uint256,uint256,uint256)": EventFragment;
    "ReservesAdded(address,uint256,uint256)": EventFragment;
    "ReservesReduced(address,uint256,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AccrueInterest"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Borrow"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LiquidateBorrow"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Mint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewAdmin"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewComptroller"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewDiscountRate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewMarketInterestRateModel"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPendingAdmin"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewReserveFactor"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Redeem"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RepayBorrow"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReservesAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReservesReduced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type AccrueInterestEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber] & {
    cashPrior: BigNumber;
    interestAccumulated: BigNumber;
    borrowIndex: BigNumber;
    totalBorrows: BigNumber;
  }
>;

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber] & {
    owner: string;
    spender: string;
    amount: BigNumber;
  }
>;

export type BorrowEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber] & {
    borrower: string;
    borrowAmount: BigNumber;
    accountBorrows: BigNumber;
    totalBorrows: BigNumber;
  }
>;

export type LiquidateBorrowEvent = TypedEvent<
  [string, string, BigNumber, string, BigNumber] & {
    liquidator: string;
    borrower: string;
    repayAmount: BigNumber;
    cTokenCollateral: string;
    seizeTokens: BigNumber;
  }
>;

export type MintEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    minter: string;
    mintAmount: BigNumber;
    mintTokens: BigNumber;
  }
>;

export type NewAdminEvent = TypedEvent<
  [string, string] & { oldAdmin: string; newAdmin: string }
>;

export type NewComptrollerEvent = TypedEvent<
  [string, string] & { oldComptroller: string; newComptroller: string }
>;

export type NewDiscountRateEvent = TypedEvent<
  [BigNumber, BigNumber] & {
    oldDiscountRateMantissa: BigNumber;
    newDiscountRateMantissa: BigNumber;
  }
>;

export type NewMarketInterestRateModelEvent = TypedEvent<
  [string, string] & {
    oldInterestRateModel: string;
    newInterestRateModel: string;
  }
>;

export type NewPendingAdminEvent = TypedEvent<
  [string, string] & { oldPendingAdmin: string; newPendingAdmin: string }
>;

export type NewReserveFactorEvent = TypedEvent<
  [BigNumber, BigNumber] & {
    oldReserveFactorMantissa: BigNumber;
    newReserveFactorMantissa: BigNumber;
  }
>;

export type RedeemEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    redeemer: string;
    redeemAmount: BigNumber;
    redeemTokens: BigNumber;
  }
>;

export type RepayBorrowEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, BigNumber] & {
    payer: string;
    borrower: string;
    repayAmount: BigNumber;
    accountBorrows: BigNumber;
    totalBorrows: BigNumber;
  }
>;

export type ReservesAddedEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    benefactor: string;
    addAmount: BigNumber;
    newTotalReserves: BigNumber;
  }
>;

export type ReservesReducedEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    admin: string;
    reduceAmount: BigNumber;
    newTotalReserves: BigNumber;
  }
>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; amount: BigNumber }
>;

export class ICToken extends BaseContract {
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

  interface: ICTokenInterface;

  functions: {
    _acceptAdmin(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _reduceReserves(
      reduceAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setComptroller(
      newComptroller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setDiscountRate(
      discountRateMantissa: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setInterestRateModel(
      newInterestRateModel: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setPendingAdmin(
      newPendingAdmin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setReserveFactor(
      newReserveFactorMantissa: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    accrualBlockNumber(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    accrueInterest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOfUnderlying(
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    borrowBalanceCurrent(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    borrowBalanceStored(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    borrowRatePerBlock(overrides?: CallOverrides): Promise<[BigNumber]>;

    exchangeRateCurrent(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exchangeRateStored(overrides?: CallOverrides): Promise<[BigNumber]>;

    getAccountSnapshot(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;

    getCash(overrides?: CallOverrides): Promise<[BigNumber]>;

    getDiscountRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    seize(
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supplyRatePerBlock(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalBorrowsCurrent(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      dst: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      src: string,
      dst: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  _acceptAdmin(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _reduceReserves(
    reduceAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setComptroller(
    newComptroller: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setDiscountRate(
    discountRateMantissa: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setInterestRateModel(
    newInterestRateModel: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setPendingAdmin(
    newPendingAdmin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setReserveFactor(
    newReserveFactorMantissa: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  accrualBlockNumber(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  accrueInterest(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  balanceOfUnderlying(
    owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  borrowBalanceCurrent(
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  borrowBalanceStored(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  borrowRatePerBlock(overrides?: CallOverrides): Promise<BigNumber>;

  exchangeRateCurrent(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exchangeRateStored(overrides?: CallOverrides): Promise<BigNumber>;

  getAccountSnapshot(
    account: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;

  getCash(overrides?: CallOverrides): Promise<BigNumber>;

  getDiscountRate(overrides?: CallOverrides): Promise<BigNumber>;

  seize(
    liquidator: string,
    borrower: string,
    seizeTokens: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supplyRatePerBlock(overrides?: CallOverrides): Promise<BigNumber>;

  totalBorrowsCurrent(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    dst: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    src: string,
    dst: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _acceptAdmin(overrides?: CallOverrides): Promise<BigNumber>;

    _reduceReserves(
      reduceAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _setComptroller(
      newComptroller: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _setDiscountRate(
      discountRateMantissa: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _setInterestRateModel(
      newInterestRateModel: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _setPendingAdmin(
      newPendingAdmin: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _setReserveFactor(
      newReserveFactorMantissa: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    accrualBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;

    accrueInterest(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    balanceOfUnderlying(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrowBalanceCurrent(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrowBalanceStored(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrowRatePerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    exchangeRateCurrent(overrides?: CallOverrides): Promise<BigNumber>;

    exchangeRateStored(overrides?: CallOverrides): Promise<BigNumber>;

    getAccountSnapshot(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;

    getCash(overrides?: CallOverrides): Promise<BigNumber>;

    getDiscountRate(overrides?: CallOverrides): Promise<BigNumber>;

    seize(
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supplyRatePerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    totalBorrowsCurrent(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      dst: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      src: string,
      dst: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "AccrueInterest(uint256,uint256,uint256,uint256)"(
      cashPrior?: null,
      interestAccumulated?: null,
      borrowIndex?: null,
      totalBorrows?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber],
      {
        cashPrior: BigNumber;
        interestAccumulated: BigNumber;
        borrowIndex: BigNumber;
        totalBorrows: BigNumber;
      }
    >;

    AccrueInterest(
      cashPrior?: null,
      interestAccumulated?: null,
      borrowIndex?: null,
      totalBorrows?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber],
      {
        cashPrior: BigNumber;
        interestAccumulated: BigNumber;
        borrowIndex: BigNumber;
        totalBorrows: BigNumber;
      }
    >;

    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; amount: BigNumber }
    >;

    Approval(
      owner?: string | null,
      spender?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; amount: BigNumber }
    >;

    "Borrow(address,uint256,uint256,uint256)"(
      borrower?: null,
      borrowAmount?: null,
      accountBorrows?: null,
      totalBorrows?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber],
      {
        borrower: string;
        borrowAmount: BigNumber;
        accountBorrows: BigNumber;
        totalBorrows: BigNumber;
      }
    >;

    Borrow(
      borrower?: null,
      borrowAmount?: null,
      accountBorrows?: null,
      totalBorrows?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber],
      {
        borrower: string;
        borrowAmount: BigNumber;
        accountBorrows: BigNumber;
        totalBorrows: BigNumber;
      }
    >;

    "LiquidateBorrow(address,address,uint256,address,uint256)"(
      liquidator?: null,
      borrower?: null,
      repayAmount?: null,
      cTokenCollateral?: null,
      seizeTokens?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string, BigNumber],
      {
        liquidator: string;
        borrower: string;
        repayAmount: BigNumber;
        cTokenCollateral: string;
        seizeTokens: BigNumber;
      }
    >;

    LiquidateBorrow(
      liquidator?: null,
      borrower?: null,
      repayAmount?: null,
      cTokenCollateral?: null,
      seizeTokens?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string, BigNumber],
      {
        liquidator: string;
        borrower: string;
        repayAmount: BigNumber;
        cTokenCollateral: string;
        seizeTokens: BigNumber;
      }
    >;

    "Mint(address,uint256,uint256)"(
      minter?: null,
      mintAmount?: null,
      mintTokens?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { minter: string; mintAmount: BigNumber; mintTokens: BigNumber }
    >;

    Mint(
      minter?: null,
      mintAmount?: null,
      mintTokens?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { minter: string; mintAmount: BigNumber; mintTokens: BigNumber }
    >;

    "NewAdmin(address,address)"(
      oldAdmin?: null,
      newAdmin?: null
    ): TypedEventFilter<
      [string, string],
      { oldAdmin: string; newAdmin: string }
    >;

    NewAdmin(
      oldAdmin?: null,
      newAdmin?: null
    ): TypedEventFilter<
      [string, string],
      { oldAdmin: string; newAdmin: string }
    >;

    "NewComptroller(address,address)"(
      oldComptroller?: null,
      newComptroller?: null
    ): TypedEventFilter<
      [string, string],
      { oldComptroller: string; newComptroller: string }
    >;

    NewComptroller(
      oldComptroller?: null,
      newComptroller?: null
    ): TypedEventFilter<
      [string, string],
      { oldComptroller: string; newComptroller: string }
    >;

    "NewDiscountRate(uint256,uint256)"(
      oldDiscountRateMantissa?: null,
      newDiscountRateMantissa?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { oldDiscountRateMantissa: BigNumber; newDiscountRateMantissa: BigNumber }
    >;

    NewDiscountRate(
      oldDiscountRateMantissa?: null,
      newDiscountRateMantissa?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { oldDiscountRateMantissa: BigNumber; newDiscountRateMantissa: BigNumber }
    >;

    "NewMarketInterestRateModel(address,address)"(
      oldInterestRateModel?: null,
      newInterestRateModel?: null
    ): TypedEventFilter<
      [string, string],
      { oldInterestRateModel: string; newInterestRateModel: string }
    >;

    NewMarketInterestRateModel(
      oldInterestRateModel?: null,
      newInterestRateModel?: null
    ): TypedEventFilter<
      [string, string],
      { oldInterestRateModel: string; newInterestRateModel: string }
    >;

    "NewPendingAdmin(address,address)"(
      oldPendingAdmin?: null,
      newPendingAdmin?: null
    ): TypedEventFilter<
      [string, string],
      { oldPendingAdmin: string; newPendingAdmin: string }
    >;

    NewPendingAdmin(
      oldPendingAdmin?: null,
      newPendingAdmin?: null
    ): TypedEventFilter<
      [string, string],
      { oldPendingAdmin: string; newPendingAdmin: string }
    >;

    "NewReserveFactor(uint256,uint256)"(
      oldReserveFactorMantissa?: null,
      newReserveFactorMantissa?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      {
        oldReserveFactorMantissa: BigNumber;
        newReserveFactorMantissa: BigNumber;
      }
    >;

    NewReserveFactor(
      oldReserveFactorMantissa?: null,
      newReserveFactorMantissa?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      {
        oldReserveFactorMantissa: BigNumber;
        newReserveFactorMantissa: BigNumber;
      }
    >;

    "Redeem(address,uint256,uint256)"(
      redeemer?: null,
      redeemAmount?: null,
      redeemTokens?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { redeemer: string; redeemAmount: BigNumber; redeemTokens: BigNumber }
    >;

    Redeem(
      redeemer?: null,
      redeemAmount?: null,
      redeemTokens?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { redeemer: string; redeemAmount: BigNumber; redeemTokens: BigNumber }
    >;

    "RepayBorrow(address,address,uint256,uint256,uint256)"(
      payer?: null,
      borrower?: null,
      repayAmount?: null,
      accountBorrows?: null,
      totalBorrows?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber, BigNumber],
      {
        payer: string;
        borrower: string;
        repayAmount: BigNumber;
        accountBorrows: BigNumber;
        totalBorrows: BigNumber;
      }
    >;

    RepayBorrow(
      payer?: null,
      borrower?: null,
      repayAmount?: null,
      accountBorrows?: null,
      totalBorrows?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber, BigNumber],
      {
        payer: string;
        borrower: string;
        repayAmount: BigNumber;
        accountBorrows: BigNumber;
        totalBorrows: BigNumber;
      }
    >;

    "ReservesAdded(address,uint256,uint256)"(
      benefactor?: null,
      addAmount?: null,
      newTotalReserves?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { benefactor: string; addAmount: BigNumber; newTotalReserves: BigNumber }
    >;

    ReservesAdded(
      benefactor?: null,
      addAmount?: null,
      newTotalReserves?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { benefactor: string; addAmount: BigNumber; newTotalReserves: BigNumber }
    >;

    "ReservesReduced(address,uint256,uint256)"(
      admin?: null,
      reduceAmount?: null,
      newTotalReserves?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { admin: string; reduceAmount: BigNumber; newTotalReserves: BigNumber }
    >;

    ReservesReduced(
      admin?: null,
      reduceAmount?: null,
      newTotalReserves?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { admin: string; reduceAmount: BigNumber; newTotalReserves: BigNumber }
    >;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; amount: BigNumber }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; amount: BigNumber }
    >;
  };

  estimateGas: {
    _acceptAdmin(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _reduceReserves(
      reduceAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setComptroller(
      newComptroller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setDiscountRate(
      discountRateMantissa: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setInterestRateModel(
      newInterestRateModel: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setPendingAdmin(
      newPendingAdmin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setReserveFactor(
      newReserveFactorMantissa: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    accrualBlockNumber(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    accrueInterest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    balanceOfUnderlying(
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    borrowBalanceCurrent(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    borrowBalanceStored(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrowRatePerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    exchangeRateCurrent(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exchangeRateStored(overrides?: CallOverrides): Promise<BigNumber>;

    getAccountSnapshot(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCash(overrides?: CallOverrides): Promise<BigNumber>;

    getDiscountRate(overrides?: CallOverrides): Promise<BigNumber>;

    seize(
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supplyRatePerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    totalBorrowsCurrent(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      dst: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      src: string,
      dst: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _acceptAdmin(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _reduceReserves(
      reduceAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setComptroller(
      newComptroller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setDiscountRate(
      discountRateMantissa: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setInterestRateModel(
      newInterestRateModel: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setPendingAdmin(
      newPendingAdmin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setReserveFactor(
      newReserveFactorMantissa: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    accrualBlockNumber(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    accrueInterest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOfUnderlying(
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    borrowBalanceCurrent(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    borrowBalanceStored(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    borrowRatePerBlock(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    exchangeRateCurrent(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exchangeRateStored(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountSnapshot(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getDiscountRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    seize(
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supplyRatePerBlock(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalBorrowsCurrent(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      dst: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      src: string,
      dst: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
