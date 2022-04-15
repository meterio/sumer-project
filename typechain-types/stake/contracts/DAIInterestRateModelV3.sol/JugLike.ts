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
} from "../../../common";

export interface JugLikeInterface extends utils.Interface {
  functions: {
    "base()": FunctionFragment;
    "ilks(bytes32)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "base" | "ilks"): FunctionFragment;

  encodeFunctionData(functionFragment: "base", values?: undefined): string;
  encodeFunctionData(functionFragment: "ilks", values: [BytesLike]): string;

  decodeFunctionResult(functionFragment: "base", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ilks", data: BytesLike): Result;

  events: {};
}

export interface JugLike extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: JugLikeInterface;

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
    base(overrides?: CallOverrides): Promise<[BigNumber]>;

    ilks(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { duty: BigNumber; rho: BigNumber }>;
  };

  base(overrides?: CallOverrides): Promise<BigNumber>;

  ilks(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { duty: BigNumber; rho: BigNumber }>;

  callStatic: {
    base(overrides?: CallOverrides): Promise<BigNumber>;

    ilks(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { duty: BigNumber; rho: BigNumber }>;
  };

  filters: {};

  estimateGas: {
    base(overrides?: CallOverrides): Promise<BigNumber>;

    ilks(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    base(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ilks(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
