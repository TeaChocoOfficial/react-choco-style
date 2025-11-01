//-Path: "lib/src/class/option/OptionCalc.ts"
import {
    StyleValue,
    OptionCalcs,
    OptionCalcFunc,
} from '../../types/chocoValue';
import { CsValue } from './CsValue';
import { Ary } from '@teachoco-dev/cli';

export class OptionCalc {
    private _functions: OptionCalcFunc[] = [];

    constructor(...functions: (OptionCalcs | OptionCalcFunc)[]) {
        this.set(...functions);
    }

    get functions() {
        return this._functions;
    }

    set(...functions: (OptionCalcs | OptionCalcFunc)[]) {
        this._functions = functions.flatMap((func) =>
            func instanceof OptionCalc
                ? func._functions
                : Ary.is(func)
                ? func
                : [func],
        );
    }

    /**
     * Add one or more calculation functions to the list.
     * @param funcs Functions that take a number and return a number.
     * @returns The current instance for chaining.
     */
    add(...funcs: OptionCalcFunc[]): this {
        this._functions = [...this._functions, ...funcs];
        return this;
    }

    /**
     * Remove and return the last function from the list.
     * @returns The current instance for chaining.
     */
    pop(...funcs: OptionCalcFunc[]): this {
        this._functions = [...funcs, ...this._functions];
        return this;
    }

    /**
     * Mix functions from another OptionCalc or array of OptionCalcFunc into this instance.
     * @param calcs Another OptionCalc instance or array of OptionCalcFunc.
     * @returns The current instance for chaining.
     */
    mix(calcs: OptionCalcs): this {
        const funcs =
            calcs instanceof OptionCalc
                ? calcs.functions
                : Ary.is(calcs)
                ? calcs
                : [calcs];
        this._functions = [...this._functions, ...funcs];
        return this;
    }

    /**
     * Clone this OptionCalc instance and its functions.
     * @returns A new OptionCalc instance with the same functions.
     */
    get clone(): OptionCalc {
        return new OptionCalc(...this._functions);
    }

    /**
     * Clear all stored functions.
     * @returns The current instance for chaining.
     */
    clear(): this {
        this._functions = [];
        return this;
    }

    calculate(after: CsValue, before: CsValue, multiply: number) {
        return this._functions.reduce(
            (acc, func) => new CsValue(func(after, acc, multiply)),
            before,
        );
    }
}
