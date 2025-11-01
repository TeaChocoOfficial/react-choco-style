//-Path: "react-choco-style/lib/src/class/Size.ts"
import {
    Sizes,
    SizeKey,
    SizeType,
    SizeOptions,
    InSizesValue,
    SizesValue as SizesValueType,
} from '../types/size';
import { Temp } from '../temp/temp';
import { SizeOption } from './SizeOption';
import { Ary, Obj } from '@teachoco-dev/cli';
import { StyleValue } from '../types/chocoValue';
import { BreakpointType, KeyRootTheme, RootThemeType } from '../types/theme';

export class Size<
    Value = StyleValue,
    SizesValue extends InSizesValue<Value> = InSizesValue<Value>,
> {
    value = {} as SizesValue;
    constructor(
        value?: Value | SizesValue | Sizes<Value>,
        option?: SizeOptions<Value>,
    ) {
        if (value) this.value = Size.to(value, option) as SizesValue;
    }
    map<Render, MethodValue = Value>(
        method: (
            value: MethodValue,
            key: SizeKey,
            index: number,
            sizeKey: SizeKey[],
        ) => Render,
    ): Render[] {
        return Obj.map(this.value, (value, key, index, array) =>
            method(
                value as MethodValue,
                key as SizeKey,
                index,
                array as SizeKey[],
            ),
        );
    }
    reduce<
        NewValue = Value,
        Render extends InSizesValue<NewValue> = InSizesValue<NewValue>,
    >(
        method: (
            value: Value,
            key: SizeKey,
            index: number,
            array: SizeKey[],
        ) => NewValue,
    ): Render {
        return Size.reduce<Value, NewValue, Render>(this.value, method);
    }

    static reduce<
        Value = StyleValue,
        NewValue = StyleValue,
        Render extends InSizesValue<NewValue> = InSizesValue<NewValue>,
    >(
        value: InSizesValue<Value>,
        method: (
            value: Value,
            key: SizeKey,
            index: number,
            array: SizeKey[],
        ) => NewValue,
    ): Render {
        return Obj.reduce(
            value,
            (acc, key, value, index, array) => {
                const newValue = method(
                    value as Value,
                    key as SizeKey,
                    index,
                    array as SizeKey[],
                ) as InSizesValue[SizeKey];
                acc[key as SizeKey] = newValue;
                return acc;
            },
            value as InSizesValue,
        ) as Render;
    }
    static getRoot(root: null): RootThemeType;
    static getRoot(root?: KeyRootTheme | number): number;
    static getRoot(
        root?: KeyRootTheme | number | null,
    ): RootThemeType | number {
        const roots = { ...Temp.baseTheme.root };
        if (root === null) return roots;
        const { size } = roots;
        if (typeof root === 'number') return root;
        else if (root) return size[root];
        else return size.base;
    }
    private static getBreakpoin(): BreakpointType {
        return { ...Temp.baseTheme.breakpoint };
    }
    static is<
        Value = StyleValue,
        SizesValue extends InSizesValue<Value> = InSizesValue<Value>,
    >(size: unknown): size is Size<Value> {
        if (size instanceof Size) return this.in<Value, SizesValue>(size.value);
        return false;
    }
    static in<
        Value = StyleValue,
        SizesValue extends InSizesValue<Value> = InSizesValue<Value>,
    >(size: unknown): size is SizesValue {
        if (size && typeof size === 'object' && !Ary.is(size))
            return Obj.every(size, (_, key) =>
                Obj.keys(this.getBreakpoin().size).includes(key),
            );
        return false;
    }
    static check<Value = StyleValue, Checked = SizeType<Value>>(
        value: Value | InSizesValue<Value> | Sizes<Value>,
        option?: SizeOptions<Value>,
    ): Checked {
        const newOption = SizeOption.toSizeOption(option);
        const mustCheck =
            newOption.check && typeof value === 'number' && value < 0;
        const checked = mustCheck ? -value : value;
        if (mustCheck) {
            const newValue = this.callback(checked, (value, key) =>
                this.format(
                    value as Value,
                    key,
                    newOption.set({ format: true }),
                ),
            );
            return newValue as Checked;
        }
        return this.use(
            checked as Value | InSizesValue<Value> | Sizes<Value>,
            (value, key) => this.format(value, key, option),
        ) as Checked;
    }

    /**
     * Calculates a value based on a given root value and an optional calculation function.
     *
     * @param value - The value to be calculated.
     * @param option - Optional settings for the calculation, including the root value and a custom calculation function.
     * @returns The calculated value.
     */
    private static calc<Value = StyleValue>(
        value: Value,
        option?: SizeOption<Value>,
    ): StyleValue | Value {
        const root: number =
            typeof option?.root === 'number'
                ? option.root
                : option?.root
                ? this.getRoot(option.root)
                : this.getRoot();
        const calced = option?.can('calc')
            ? option?.calc?.(value, root) ?? value
            : value;
        option?.do('calc');
        return calced;
    }

    /**
     * Adjusts the given value based on a responsive calculation.
     *
     * @param value - The value to be adjusted.
     * @param option - Optional settings for the adjustment, including the root value and response flags.
     * @returns The adjusted value.
     */
    private static response<Value = StyleValue>(
        value: Value,
        option?: SizeOption<Value>,
    ): Value {
        const root: number =
            typeof option?.response === 'number'
                ? option.response
                : option?.response
                ? this.getRoot(option.response)
                : this.getRoot();
        const responsed = (
            option?.can('response') && typeof value === 'number'
                ? value * root
                : value
        ) as Value;
        option?.do('response');
        return responsed;
    }

    /**
     * Appends a unit to the given size value based on the provided options.
     *
     * @param size - The size value to which the unit will be appended.
     * @param option - Optional settings for determining the unit to append.
     * @returns The size value with the appended unit.
     */
    private static unit<Value = StyleValue, NewValue = Value>(
        size: Value,
        option?: SizeOption<Value>,
    ): NewValue {
        const root = this.getRoot(null).unit;
        const keyRoot = option?.unit.slice(1) as KeyRootTheme;
        const unit = option?.unit.startsWith('*')
            ? keyRoot
            : option?.unit.startsWith('$')
            ? root[keyRoot]
            : undefined;
        const newSize = option?.can('unit') && unit ? `${size}${unit}` : size;
        option?.do('unit');
        // Debug.if(option?.debug,size, unit, newSize);
        return newSize as NewValue;
    }

    /**
     * Adjusts the given size value based on a responsive format.
     *
     * @param size - The size value to be adjusted.
     * @param key - An optional key to determine the format size.
     * @param option - Optional settings for the adjustment, including format and check flags.
     * @returns The adjusted size value.
     */
    private static responsive<Value = StyleValue>(
        size: Value,
        key?: SizeKey,
        option?: SizeOption<Value>,
    ): Value {
        const { format } = this.getBreakpoin();
        const formatKeys = Obj.keys(format);
        const formatKey = key ?? formatKeys[formatKeys.length - 1];
        const formatSize = format[formatKey];

        const formated =
            typeof size === 'number' && !option?.done('responsive')
                ? ((formatSize * (size / 100)) as Value)
                : size;
        const autoSize = option?.format || option?.check;
        const newValue = autoSize ? formated : size;
        if (autoSize) option?.do('responsive');
        return newValue;
    }

    static format<Value = StyleValue, NewValue = Value>(
        size: Value,
        key?: SizeKey,
        option?: SizeOptions<Value>,
    ): NewValue {
        const newOption = SizeOption.toSizeOption(option);
        if (!newOption.done('format')) {
            const responsived = this.responsive(size, key, newOption);
            const calced = this.calc(responsived, newOption);
            const responsed = this.response(calced as Value, newOption);
            const united = this.unit<Value, NewValue>(responsed, newOption);
            return united as NewValue;
        }
        return size as unknown as NewValue;
    }

    static to<Value = StyleValue>(
        size: Value | InSizesValue<Value> | Sizes<Value>,
        option?: SizeOptions<Value>,
    ): SizeType<Value> {
        const isDebug = option?.debug;
        const newSize = this.use(size, (value, key) =>
            this.format(value, key, option),
        );

        if (!Size.is(newSize) && !Size.in(newSize)) {
            const sizes = this.callback(newSize);
            const output = Size.reduce(sizes, (value, key) => {
                // console.log(key);
                return this.format(value as Value, key, option);
            });
            // Debug.if(isDebug, 'from Size.to', { size, sizes, output });
            return output as SizeType<Value>;
        }
        if (Size.is(newSize)) return newSize.value as SizeType<Value>;
        return newSize as SizeType<Value>;
    }
    static from<Value = StyleValue>(value: Value): SizeType<Value> {
        const { size } = this.getBreakpoin();
        const output = Obj.reduce<Record<SizeKey, number>, SizeType<Value>>(
            size,
            (acc, key) => ({ ...acc, [key]: value }),
            {},
        );
        return output;
    }
    static toValue<Value, NewValue extends string = 'none'>(
        styleValue?: SizesValueType<Value>,
        none?: NewValue | boolean,
    ): NewValue | undefined {
        const Null = none === true ? 'none' : none === false ? 'unset' : none;
        // Debug.if(debug, 'from toSize in ChocoCalc', value, sizes);
        const sizes = Size.is(styleValue) ? styleValue.value : styleValue;
        if (innerWidth !== undefined && Size.in(sizes)) {
            const { size } = this.getBreakpoin();
            const breakpoints = Obj.entries(size).sort(([, a], [, b]) => b - a);
            for (const [key, value] of breakpoints)
                if (innerWidth > value) return sizes[key] as NewValue;

            const high = size[breakpoints[0][0]];
            const low = sizes[Ary.last(breakpoints)[0]];
            return (high === undefined ? low : high) as NewValue;
        } else {
            return (sizes ?? Null) as NewValue;
        }
    }
    static use<
        Render,
        Renders extends Render | InSizesValue<Render> | Sizes<Render>,
        Value = StyleValue,
        SizesValue extends InSizesValue<Value> = InSizesValue<Value>,
    >(
        size: Value | SizesValue | Sizes<Value>,
        method: (
            value: Value,
            key: SizeKey | undefined,
            index: number,
        ) => Render,
    ): Renders {
        if (this.is(size)) {
            return size.reduce((value, key, index) =>
                method(value as Value, key, index),
            ) as Renders;
        } else if (this.in(size)) {
            return Size.reduce(
                size as InSizesValue<Value>,
                (value, key, index) => method(value as Value, key, index),
            ) as Renders;
        }
        return method(size as Value, undefined, 0) as Renders;
    }
    static callback<MaxSize = StyleValue, Value = StyleValue, Return = StyleValue>(
        size: MaxSize,
        callback?: (value: Value, key: SizeKey) => Return,
        fristValue?: Value,
    ): SizeType<Return> {
        let sizes: SizeType<Return> = {};
        if (typeof size === 'number') {
            sizes = this.from(size as Return); //as SizeType<Return>;
        } else if (Size.is(size)) {
            sizes = Obj.amend<Record<SizeKey, number>, SizeType<Return>>(
                { ...this.getBreakpoin().format },
                (_, value) => {
                    if (value !== undefined) return value as Return;
                },
            ) as SizeType<Return>;
        } else {
            sizes = Obj.amend<Record<SizeKey, number>, SizeType<Return>>(
                { ...this.getBreakpoin().format },
                () => size as unknown as Return,
            ) as SizeType<Return>;
        }

        return Obj.amend<SizeType<Return>, SizeType<Return>>(
            sizes,
            (key, value) => {
                const newValue = (
                    value === undefined ? fristValue : value
                ) as Value;
                fristValue = newValue;
                return (callback?.(newValue, key) ?? newValue) as Return;
            },
        );
    }
}
