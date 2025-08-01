//-Path: "react-choco-style/lib/src/class/SizeOption.ts"
import {
    UnitType,
    SizeValue,
    SizeOptionType,
    SizeOptionDoneKey,
} from '../types/size';
import { Ary } from '@teachoco-dev/cli';
import { KeyRootTheme } from '../types/theme';

export class SizeOption<ValueSize = SizeValue> {
    private _optionKeys: Array<keyof SizeOptionType<ValueSize>> = [
        'sz',
        'unit',
        'root',
        'debug',
        'check',
        'format',
        'response',
        'responsive',
        'calc',
    ];
    private _done: { [key in keyof SizeOptionType<ValueSize>]?: boolean } = {};
    constructor(private _option: SizeOptionType<ValueSize> = {}) {}
    set(option?: SizeOptionType<ValueSize>) {
        this._option = Object.assign(this._option, option);
        return this;
    }
    def(option: SizeOptionType<ValueSize>): this {
        this._option = this._optionKeys.reduce((acc, key) => {
            const value = this._option[key];
            const newValue = option[key];
            if (value === undefined && newValue !== undefined) {
                acc[key] = newValue as any;
            } else if (value !== undefined) {
                acc[key] = value as any;
            }
            return acc;
        }, {} as SizeOptionType<ValueSize>);
        return this;
    }
    do(key: SizeOptionDoneKey): void {
        this._done[key] = true;
    }
    done(key: SizeOptionDoneKey): boolean {
        const done = this._done[key];
        return done === true;
    }
    can(key: SizeOptionDoneKey): boolean {
        const done = this._done[key];
        return !done && this._option[key] !== undefined;
    }
    get option(): SizeOptionType<ValueSize> {
        return {
            calc: this.calc,
            root: this.root,
            unit: this.unit,
            check: this.check,
            debug: this.debug,
            format: this.format,
            response: this.response,
        };
    }
    get clone(): SizeOption<ValueSize> {
        const clone = new SizeOption({ ...this._option });
        return clone;
    }
    get sz(): number | KeyRootTheme | undefined {
        return this._option.sz;
    }
    get unit(): UnitType {
        return this._option.unit ?? '*';
    }
    get root(): number | KeyRootTheme {
        return this._option.root ?? 'base';
    }
    get check(): boolean {
        return this._option.check ?? false;
    }
    get debug(): boolean {
        const { debug } = this._option;
        return debug === true || Ary.is(debug);
    }
    get format(): boolean {
        return this._option.format ?? false;
    }
    get response(): number | KeyRootTheme {
        return this._option.response ?? 0;
    }
    get responsive(): boolean {
        return this._option.responsive ?? false;
    }
    get calc(): (value: ValueSize, root: number) => SizeValue {
        return this._option.calc ?? ((value) => value as SizeValue);
    }
    static toSizeOption<ValueSize = SizeValue>(
        option?: SizeOption<ValueSize> | SizeOptionType<ValueSize>,
    ): SizeOption<ValueSize> {
        if (option instanceof SizeOption) return option.clone;
        return new SizeOption(option);
    }
}
