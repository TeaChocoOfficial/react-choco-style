//-Path: "react-choco-style/lib/src/class/size.ts"
import {
    SizeKey,
    SizeType,
    SizeValue,
    SizeOption,
    InSizesValue,
    Sizes,
} from '../types/size';
import { Temp } from '../temp/temp';
import { Ary, Obj } from '@teachoco-dev/cli';
import { BreakpointType, KeyRootTheme, RootThemeType } from '../types/theme';

export class Size<
    Value = SizeValue,
    SizesValue extends InSizesValue<Value> = InSizesValue<Value>,
> {
    value = {} as SizesValue;
    constructor(
        value?: Value | SizesValue | Sizes<Value>,
        option?: SizeOption<Value>,
    ) {
        if (value) this.value = Size.to(value, option) as SizesValue;
    }
    map<Render>(
        method: (
            value: Value,
            key: SizeKey,
            index: number,
            sizeKey: SizeKey[],
        ) => Render,
    ) {
        return Obj.map(this.value, (value, key, index, array) =>
            method(value as Value, key as SizeKey, index, array as SizeKey[]),
        );
    }
    reduce<
        NewValue = SizeValue,
        Render extends InSizesValue<NewValue> = InSizesValue<NewValue>,
    >(
        method: (
            value: Render,
            key: SizeKey,
            index: number,
            array: SizeKey[],
        ) => NewValue,
    ): Render {
        return Size.reduce<Value, NewValue, Render>(this.value, method);
    }
    static reduce<
        Value = SizeValue,
        NewValue = SizeValue,
        Render extends InSizesValue<NewValue> = InSizesValue<NewValue>,
    >(
        value: InSizesValue<Value>,
        method: (
            value: Render,
            key: SizeKey,
            index: number,
            array: SizeKey[],
        ) => NewValue,
    ): Render {
        return Obj.reduce(
            value,
            (acc, key, value, index, array) => {
                value;
                const newValue = method(
                    value as Render,
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
    static getRoot(): RootThemeType {
        return { ...Temp.theme.root };
    }
    static getBreakpoin(): BreakpointType {
        return { ...Temp.theme.breakpoint };
    }
    static is<
        Value = SizeValue,
        SizesValue extends InSizesValue<Value> = InSizesValue<Value>,
    >(size: unknown): size is Size<Value> {
        if (size instanceof Size) return this.in<Value, SizesValue>(size.value);
        return false;
    }
    static in<
        Value = SizeValue,
        SizesValue extends InSizesValue<Value> = InSizesValue<Value>,
    >(size: unknown): size is SizesValue {
        if (size && typeof size === 'object' && !Ary.is(size))
            return Obj.every(size, (_, key) =>
                Obj.keys(this.getBreakpoin().size).includes(key),
            );
        return false;
    }
    static format<Value = SizeValue>(
        size: Value,
        key?: SizeKey,
        option?: SizeOption<Value>,
    ): Value {
        const roots = this.getRoot().size;
        const formatKey = Obj.keys(this.getBreakpoin().format);
        const formatSize =
            this.getBreakpoin().format[key ?? formatKey[formatKey.length - 1]];
        const checked: Value = option?.check
            ? typeof size === 'number' && size < 0
                ? (-size as Value)
                : size
            : size;
        const formated =
            typeof checked === 'number'
                ? ((formatSize * (checked / 100)) as Value)
                : checked;
        let newValue =
            typeof checked === 'number' && (option?.format || option?.check)
                ? formated
                : checked;

        const root: number =
            typeof option?.root === 'number'
                ? option.root
                : option?.root
                ? roots[option.root as KeyRootTheme]
                : roots.text;
        // console.log(size, checked, formatSize, formated, newValue);

        if (option?.calc) newValue = option?.calc?.(newValue, root) as Value;
        if (option?.response && typeof newValue === 'number')
            (newValue as number) *=
                typeof option.response === 'number'
                    ? option.response
                    : roots[option.response];
        if (option?.unit && typeof newValue === 'number')
            newValue = `${newValue}${option.unit}` as Value;
        return newValue;
    }
    static to<
        Value = SizeValue,
        SizesValue extends InSizesValue<Value> = InSizesValue<Value>,
    >(
        size: Value | SizesValue | Sizes<Value>,
        option?: SizeOption<Value>,
    ): SizesValue {
        if (this.in<Value, SizesValue>(size)) {
            // console.log('in', size);
            return Size.reduce(size as InSizesValue<Value>, (value, key) =>
                this.format(value as Value, key, option),
            ) as SizesValue;
        } else if (this.is<Value, SizesValue>(size)) {
            // console.log('is', size);
            return size.reduce((value, key) =>
                this.format(value as Value, key, option),
            ) as SizesValue;
        } else if (size !== undefined && size !== null) {
            // console.log('size', size);
            const sizes = this.callback(size) as SizesValue;
            // console.log('sizes', sizes);
            return Size.reduce(sizes as InSizesValue<Value>, (value, key) =>
                this.format(value as Value, key, option),
            ) as SizesValue;
        }
        return size as unknown as SizesValue;
    }
    static from<Value = SizeValue>(value: Value): SizeType<Value> {
        const { theme } = Temp;
        const { size } = theme.breakpoint;

        const output = Obj.reduce<Record<SizeKey, number>, SizeType<Value>>(
            size,
            (acc, key) => ({ ...acc, [key]: value }),
            {},
        );

        return output;
    }
    static callback<MaxSize = SizeValue, Value = SizeValue, Return = SizeValue>(
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
