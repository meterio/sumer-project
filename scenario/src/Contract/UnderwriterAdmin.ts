import { BigNumber } from 'ethers';
import { Contract } from '../Contract';
import { encodedNumber } from '../Encoding';
import { Callable, Sendable } from '../Invokation';

export interface UnderwriterAdminMethods {
	_borrowGuardianPaused(): Callable<boolean>;
	_getBorrowCapGuardian(): Callable<string>;
	_getBorrowPaused(cToken: string): Callable<boolean>;
	_getMarketBorrowCap(cToken: string): Callable<number>;
	_getMintPaused(cToken: string): Sendable<boolean>;
	_getPauseGuardian(): Callable<string>;
	_getSeizePaused(): Callable<boolean>;
	_getTransferPaused(): Callable<boolean>;
	_mintGuardianPaused(): Callable<boolean>;
	_setBorrowCapGuardian(newBorrowCapGuardian: string): Sendable<number>;
	_setBorrowPaused(cToken: string, state: boolean): Sendable<boolean>;
	_setMarketBorrowCaps(cTokens: string[], newBorrowCaps: number[]): Sendable<number>;
	_setMintPaused(cToken: string, state: boolean): Sendable<boolean>;
	_setPauseGuardian(newPauseGuardian: string): Sendable<number>;
	_setSeizePaused(state: boolean): Sendable<boolean>;
	_setTransferPaused(state: boolean): Sendable<boolean>;
	admin(): Callable<string>;
	borrowCapGuardian(): Callable<string>;
	
	getCompAddress(): Callable<string>;
	getEqAssetGroup(cToken_: string): Callable<[string,number]>;
	governanceToken(): Callable<string>;

	pauseGuardian(): Callable<string>;
	removeEqAssetGroup(cToken_: string): Sendable<number>;
	seizeGuardianPaused(): Callable<boolean>;
	setEqAssetGroup(cToken_: string, groupName: string, rateMantissa: encodedNumber): Sendable<number>;
	setGovTokenAddress(_governanceToken: string): Sendable<number>;
	transferGuardianPaused(): Callable<boolean>;
}


export interface UnderwriterAdmin extends Contract {
	methods: UnderwriterAdminMethods
}
      