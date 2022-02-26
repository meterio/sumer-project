import { Contract } from '../Contract';
import { Sendable } from '../Invokation';
import { CTokenMethods, CTokenScenarioMethods } from './CToken';

interface SuErc20DelegateMethods extends CTokenMethods {
  _becomeImplementation(data: string): Sendable<void>;
  _resignImplementation(): Sendable<void>;
}

interface SuErc20DelegateScenarioMethods extends CTokenScenarioMethods {
  _becomeImplementation(data: string): Sendable<void>;
  _resignImplementation(): Sendable<void>;
}

export interface SuErc20Delegate extends Contract {
  methods: SuErc20DelegateMethods;
  name: string;
}

export interface SuErc20DelegateScenario extends Contract {
  methods: SuErc20DelegateScenarioMethods;
  name: string;
}
