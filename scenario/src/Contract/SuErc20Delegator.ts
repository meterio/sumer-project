import { Contract } from '../Contract';
import { Callable, Sendable } from '../Invokation';
import {CTokenMethods} from './CToken'

export interface SuErc20DelegatorMethods extends CTokenMethods {
	_acceptAdmin(): Sendable<number>;
	_setComptroller(newComptroller: string): Sendable<number>;
	_setImplementation(implementation_: string, allowResign: boolean, becomeImplementationData: string): Sendable<number>;
	admin(): Callable<string>;
	allowance(owner: string, spender: string): Callable<number>;
	approve(spender: string, amount: number): Sendable<boolean>;
	implementation(): Callable<string>;
}

export interface SuErc20Delegator extends Contract {
	methods: SuErc20DelegatorMethods;
	name: string;
}