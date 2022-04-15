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

export interface WitnetFeedInterface extends utils.Interface {
  functions: {
    "lastPrice()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "lastPrice"): FunctionFragment;

  encodeFunctionData(functionFragment: "lastPrice", values?: undefined): string;

  decodeFunctionResult(functionFragment: "lastPrice", data: BytesLike): Result;

  events: {};
}

export interface WitnetFeed extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WitnetFeedInterface;

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
    lastPrice(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  lastPrice(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    lastPrice(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    lastPrice(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    lastPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
