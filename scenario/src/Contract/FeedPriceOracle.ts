import {Contract} from '../Contract';
import { encodedNumber } from '../Encoding';
import {Callable, Sendable} from '../Invokation';

export interface FeedPriceOracleMethods {
	changeOwner(owner_: string): Sendable<number>;
	getFeed(cToken_: string): Callable<number>;
	getFixedPrice(cToken_: string): Callable<number>;
	getUnderlyingPrice(cToken_: string): Callable<number>;
	isPriceOracle(): Callable<boolean>;
	owner(): Callable<string>;
	removeFeed(cToken_: string): Sendable<number>;
	removeFixedPrice(cToken_: string): Sendable<number>;
	setFeed(cToken_: string, feed_: string, tokenDecimals_: number): Sendable<number>;
	setFixedPrice(cToken_: string, price: encodedNumber): Sendable<number>;
}

export interface FeedPriceOracle extends Contract {
methods: FeedPriceOracleMethods
name: string
}
      