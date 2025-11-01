//-Path: "lib/src/class/option/CsValue.ts"
import { CsOption } from './CsOption';
import { Temp } from '../../temp/temp';
import { OptionCalc } from './OptionCalc';
import { CsOptions } from '../../types/chocoHook';
import { Ary, Num, Obj } from '@teachoco-dev/cli';
import { StyleValue } from '../../types/chocoValue';
import { InSizesValue, SizeKey, SizeType } from '../../types/size';
import { BreakpointType, KeyRootTheme, RootThemeType } from '../../types/theme';

export class CsValue<Value = StyleValue> {
    private _value?: Value;
    private _size?: SizeType<Value>;
    option: CsOption = new CsOption();
    constructor(
        value?: Value | CsValue<Value> | SizeType<Value>,
        option?: CsOptions,
    ) {
        if (value instanceof CsValue) this.set(value.get);
        else this.set(value);
        this.setOption(option, value);
    }

    setOption(
        option?: CsOptions,
        value?: Value | SizeType<Value> | CsValue<Value>,
    ) {
        const newOption =
            option instanceof CsOption ? option : new CsOption(option);
        const csOption =
            value instanceof CsValue ? value.option : new CsOption();
        this.option = CsOption.mix(csOption, newOption);
    }

    addOption(...options: CsOptions[]) {
        this.option = CsOption.mix(this.option, ...options);
    }

    popOption(...options: CsOptions[]) {
        this.option = CsOption.mix(...options, this.option);
    }

    set(value?: Value | SizeType<Value>) {
        if (CsValue.isSize(value)) this._size = value as SizeType<Value>;
        else this._value = value as Value;
    }

    get clone(): CsValue<Value> {
        return new CsValue<Value>(this.get, this.option.clone);
    }

    get get(): InSizesValue<Value> | undefined {
        if (this.isSize) return this._size as InSizesValue<Value>;
        return this._value as InSizesValue<Value>;
    }

    get num(): number {
        return Number(this.get);
    }

    get isSize(): boolean {
        return Boolean(this._size);
    }

    toString(): string {
        return String(this.response);
    }

    static isSize<Value = StyleValue>(size: unknown): size is SizeType<Value> {
        if (size && typeof size === 'object' && !Ary.is(size))
            return Obj.every(size, (_, key) =>
                Obj.keys(this.getBreakpoin().size).includes(key),
            );
        return false;
    }

    use<Render>(
        method: (
            value: StyleValue,
            key: SizeKey | null,
            index: number,
        ) => Render,
    ): InSizesValue<Render> {
        return CsValue.use<Render>(this.get, method);
    }

    get response(): InSizesValue<string> {
        const checked = CsValue.check(this.get, this.option);
        const calced = CsValue.use(
            checked,
            (value) => CsValue.calc(value, this.option).get,
        );
        const booled = CsValue.use(calced, (value) =>
            CsValue.boo<StyleValue>(value, this.option),
        );
        const noned = CsValue.use(booled, (value) =>
            CsValue.none<StyleValue>(value, this.option),
        );
        const united = CsValue.use(noned, (value) =>
            CsValue.unit(value, this.option),
        );
        return united;
    }

    private static getBreakpoin(): BreakpointType {
        return { ...Temp.baseTheme.breakpoint };
    }
    static getRoot(root: null): RootThemeType;
    static getRoot(root?: KeyRootTheme | number): number;
    static getRoot(
        root?: KeyRootTheme | number | null,
    ): RootThemeType | number {
        const roots = { ...Temp.baseTheme.root };
        if (root === null) return roots;
        const { multiply } = roots;
        if (typeof root === 'number') return root;
        else if (root) return multiply[root];
        else return multiply.base;
    }

    static use<Render>(
        value: InSizesValue<StyleValue> | undefined,
        method: (
            value: StyleValue,
            key: SizeKey | null,
            index: number,
        ) => Render,
    ): InSizesValue<Render> {
        if (CsValue.isSize(value))
            return Obj.reduce<SizeType<StyleValue>>(
                value,
                (acc, key, value, index) => ({
                    ...acc,
                    [key]: method(value, key, index) as StyleValue,
                }),
                {},
            ) as InSizesValue<Render>;
        else
            return method(value as StyleValue, null, 0) as InSizesValue<Render>;
    }

    private static getFormat(key?: SizeKey) {
        const { format } = this.getBreakpoin();
        const formatKeys = Obj.keys(format);
        const formatKey = key ?? formatKeys[formatKeys.length - 1];
        const formatSize = format[formatKey];
        return formatSize;
    }

    private static format<Value = StyleValue>(
        value: Value,
        key?: SizeKey,
    ): Value {
        const formatSize = this.getFormat(key);

        const formated =
            typeof value === 'number'
                ? Num.rounding(formatSize * (value / 100), 2)
                : value;
        return formated as Value;
    }

    static size<Size extends StyleValue = StyleValue>(
        size: Size,
    ): SizeType<Size> {
        const sizes = Obj.amend({ ...this.getBreakpoin().format }, (key) =>
            this.format(size as number, key),
        ) as SizeType<Size>;
        return sizes;
    }

    static check(
        value: InSizesValue<StyleValue> | undefined,
        option: CsOption = new CsOption(),
    ): InSizesValue<StyleValue> {
        const mustCheck =
            option.check && typeof value === 'number' && value < 0;
        if (mustCheck) return this.size(-value);
        return value as InSizesValue<StyleValue>;
    }

    private static calc(
        value: StyleValue,
        option: CsOption = new CsOption(),
    ): CsValue {
        const multiply = this.getRoot(option.root);
        const after = this.multiply(value, option);
        const optionCalc = new OptionCalc(option?.calcs);
        const calced = optionCalc.calculate(
            new CsValue(after),
            new CsValue(value),
            multiply,
        );
        return calced;
    }
    private static unit<NewValue = string>(
        value: StyleValue,
        option: CsOption = new CsOption(),
    ): NewValue {
        const root = this.getRoot(null).unit;
        const keyRoot = option.unit.slice(1) as KeyRootTheme;
        const unit = option.unit.startsWith('*')
            ? keyRoot
            : option.unit.startsWith('$')
            ? root[keyRoot]
            : undefined;
        const newSize =
            option.can('kit', 'unit') && unit
                ? `${value?.toString()}${unit}`
                : value;
        // Debug.if(option.debug,value, unit, newSize);
        return newSize as NewValue;
    }

    private static multiply<Value = StyleValue, NewValue = Value>(
        value: Value,
        option: CsOption = new CsOption(),
    ): NewValue {
        const root = this.getRoot(option.root);
        const newValue =
            typeof value === 'number' && option.can('kit', 'multiply')
                ? value * root
                : value;
        return newValue as NewValue;
    }

    private static none<Value = StyleValue>(
        value: Value,
        option: CsOption = new CsOption(),
    ) {
        if (option.can('none') && value === null) return option.none;
        return value;
    }

    private static boo<Value = StyleValue>(
        value: Value,
        option: CsOption = new CsOption(),
    ) {
        if (option.can('boo') && typeof value === 'boolean')
            return value ? option.boo.t : option.boo.f;
        return value;
    }
}
