//-Path: "lib/src/class/option/CsOption.ts"
import {
    UnitType,
    NoneValue,
    OptionCalcs,
    OptionBooleans,
    ValueOptionType,
} from '../../types/chocoValue';
import { Ary } from '@teachoco-dev/cli';
import { KeyRootTheme } from '../../types/theme';
import { CsOptions } from '../../types/chocoHook';

export class CsOption {
    private _optionKeys: Array<keyof ValueOptionType> = [
        'sz',
        'kit',
        'boo',
        'root',
        'none',
        'unit',
        'check',
        'priority',
        'multiply',
        'debug',
        'calcs',
    ];
    option: Partial<ValueOptionType>;
    constructor(option?: CsOptions) {
        this.option = this.toValueOption(option);
    }
    toValueOption(option: CsOptions = {}): Partial<ValueOptionType> {
        return option instanceof CsOption ? option.clone.option : { ...option };
    }
    assign(option?: Partial<ValueOptionType>): this {
        this.option = Object.assign(this.option, option);
        return this;
    }
    def(option: Partial<ValueOptionType>): this {
        this.option = this._optionKeys.reduce((acc, key) => {
            const value = this.option[key];
            const newValue = option[key];
            if (value === undefined && newValue !== undefined) {
                acc[key] = newValue as any;
            } else if (value !== undefined) {
                acc[key] = value as any;
            }
            return acc;
        }, {} as Partial<ValueOptionType>);
        return this;
    }
    can(...keys: (keyof ValueOptionType)[]): boolean {
        return keys.find((key) => this.option[key] !== undefined) !== undefined;
    }
    get clone(): CsOption {
        return new CsOption({ ...this.option });
    }
    get options(): ValueOptionType {
        return {
            sz: this.sz,
            kit: this.kit,
            boo: this.boo,
            root: this.root,
            none: this.none,
            unit: this.unit,
            check: this.check,
            debug: this.debug,
            calcs: this.calcs,
            priority: this.priority,
            multiply: this.multiply,
        };
    }
    get sz(): number | KeyRootTheme | undefined {
        return this.option.sz;
    }
    get kit(): KeyRootTheme | number {
        return this.option.kit ?? 'base';
    }
    get boo(): OptionBooleans {
        return this.option.boo ?? {};
    }
    get root(): KeyRootTheme | number {
        return this.option.root ?? this.kit;
    }
    get none(): NoneValue | string {
        const { none } = this.option;
        return none === true ? 'none' : none === false ? 'unset' : none ?? '';
    }
    get unit(): UnitType {
        if (this.option.unit !== undefined) return this.option.unit;
        if (typeof this.option.kit === 'string')
            return `$${this.option.kit as KeyRootTheme}`;
        return '*';
    }
    get check(): boolean {
        return this.option.check ?? false;
    }
    get calcs(): OptionCalcs {
        return this.option.calcs ?? [];
    }
    get debug(): boolean {
        const { debug } = this.option;
        return debug === true || Ary.is(debug);
    }
    get priority(): number {
        return this.option.priority ?? 0;
    }
    get multiply(): boolean {
        return this.option.multiply ?? this.option.kit !== undefined;
    }
    static mix(...csOptions: CsOptions[]): CsOption {
        // แปลงทุก option เป็น CsOption
        const options: CsOption[] = csOptions.map((option) =>
            option instanceof CsOption ? option.clone : new CsOption(option),
        );
        // เรียง options ตาม priority จากน้อยไปมาก (น้อยสำคัญน้อย, มากสำคัญมาก)
        options.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
        // รวม options โดย Object.assign จากซ้ายไปขวา (ค่าหลังสุดสำคัญสุด)
        const mergedOptions = options.reduce(
            (acc, opt) => Object.assign(acc, opt.option),
            {} as Partial<ValueOptionType>,
        );
        return new CsOption(mergedOptions);
    }
}
