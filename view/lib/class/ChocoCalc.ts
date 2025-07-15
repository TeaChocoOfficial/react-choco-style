//-Path: "react-choco-style/lib/src/class/ChocoCalc.ts"
import {
    Sizes,
    SizesType,
    SizeValue,
    SizeOption,
    SizesValue,
} from '../types/size';
import { Size } from './Size';
import { CColor } from './CColor';
import Debug from '../config/debug';
import { SxType } from '../types/style';
import { ChocoColor } from './ChocoColor';
import { useChocoHook } from '../hooks/useChocoHook';
import { ColorsType } from '../types/color';
import { Ary, Obj } from '@teachoco-dev/cli';
import { useTheme } from '../hooks/useTheme';
import { GridType } from '../types/chocoValue';
import { UseChocoThemeType } from '../types/theme';
import { LinesStyleType } from '../types/chocoValue';
import { AllSystemCSSProperties } from '@mui/system';
import { ChocoStyleValue, CsType, StyleTypes } from '../types/choco';

type InsetValue = SizesType<ChocoStyleValue> | undefined;

export class ChocoCalc {
    protected _useTheme: UseChocoThemeType;
    protected _responseCs: (cs?: CsType) => StyleTypes;
    protected _getColor: (color?: ColorsType) => CColor;
    constructor() {
        this._useTheme = useTheme();
        this._getColor = ChocoColor.get;
        this._toColor = this._toColor.bind(this); // Bind _toColor เพื่อรักษา this
        this._responseCs = useChocoHook().responseCs;
    }

    // ฟังก์ชันช่วยแปลง size
    protected _toSize<Value, NewValue extends string = 'none'>(
        value?: SizesType<Value>,
        option: SizeOption<Value> = { unit: 'px', check: true },
        none?: NewValue | boolean,
    ): NewValue | undefined {
        const debug = option.debug;
        const sizes = this._toSizes(value, option, none);
        Debug.if(debug, value, sizes);
        if (innerWidth !== undefined && Size.in(sizes)) {
            const { size } = this._useTheme.breakpoint;
            const breakpoints = Obj.entries(size).sort(([, a], [, b]) => b - a);
            for (const [key, value] of breakpoints)
                if (innerWidth > value) return sizes[key] as NewValue;

            const high = sizes[breakpoints[0][0]];
            const low = sizes[Ary.last(breakpoints)[0]];
            return (high === undefined ? low : high) as NewValue;
        } else {
            return sizes as NewValue;
        }
    }

    // ฟังก์ชันช่วยแปลง sizes
    protected _toSizes<Value, NewValue extends string | number = 'none'>(
        value?: SizesType<Value>,
        option: SizeOption<Value> = { unit: 'px', check: true },
        none?: NewValue | boolean,
    ): SizesValue<NewValue> | undefined {
        const { root, unit = 'px', check = true, debug, ...options } = option;
        // Debug.if(debug, check);
        const sizeOption: SizeOption<Value> = {
            root,
            unit,
            check,
            ...options,
        };
        const Null = none === true ? 'none' : none;
        if (value === undefined) return undefined;
        else if (value === null && none !== undefined) return Null as NewValue;
        else if (typeof value === 'number')
            if (value < 0) {
                return Size.to(value, sizeOption) as SizesValue<NewValue>;
            } else
                return Size.format(
                    value,
                    undefined,
                    sizeOption,
                ) as SizesValue<NewValue>;
        else if (typeof value === 'string') return value as unknown as NewValue;
        else if (Size.is(value))
            return Size.to(
                value.value as unknown as Value,
                sizeOption,
            ) as SizesValue<NewValue>;
        else if (Size.in(value)) return value as SizesValue<NewValue>;
    }

    // ฟังก์ชันช่วยแปลง color
    protected _toColor<Return extends SizesValue<string> | undefined | null>(
        color?: ChocoStyleValue<ColorsType>,
    ): Return {
        try {
            if (color === undefined) return undefined as Return;
            const toHex = (chocoColor: ColorsType): string | undefined | null =>
                chocoColor instanceof CColor ? chocoColor.hex() : chocoColor;
            if (Size.is(color))
                return Size.callback(color, (color: ColorsType) =>
                    toHex(this._getColor(color)),
                ) as Return;
            return toHex(this._getColor(color as ColorsType)) as Return;
        } catch (error) {
            Debug.err(error);
            return null as Return;
        }
    }

    protected _toColors<Return extends SizesValue<string> | undefined | null>(
        color?: SizesType<ChocoStyleValue<ColorsType>>,
    ): Return {
        if (color === undefined) return undefined as Return;
        return Size.use(
            color as ChocoStyleValue<ColorsType>,
            this._toColor,
        ) as Return;
    }

    // ฟังก์ชันตั้งค่า CSS
    protected _setCss(CssProperties: SxType) {
        return (
            key: keyof SxType,
            value: SizesValue<unknown>,
            debug?: boolean,
        ) => {
            if (value !== undefined) {
                Debug.if(debug, `Set css property "${key}"`, value);
                (CssProperties as Record<string, SizesValue>)[key] =
                    value as SizesValue;
                return [key, value];
            }
        };
    }

    // Inset (padding, margin, gap ฯลฯ)
    protected _setInset(
        key: keyof SxType,
        value: InsetValue,
        sides: Record<string, [keyof SxType, InsetValue]>,
        option: SizeOption<InsetValue> = { check: true },
    ): [keyof AllSystemCSSProperties, InsetValue | undefined] {
        const { check = true, ...options } = option;
        if (value) return [key, this._toSize(value, options)];
        Object.entries(sides).forEach(([_, [sideKey, sideVal]]) => {
            if (sideVal !== undefined)
                return [sideKey, this._toSize(sideVal, { ...options, check })];
        });
        return [key, undefined];
    }

    // Border
    protected _toBorder(
        border?: LinesStyleType | string | null,
    ): Sizes<string> | undefined {
        if (border === null) return 'none';
        if (typeof border === 'string') return border;
        if (border) {
            const { width, style = 'solid', color = 'secondary' } = border;
            const borderWidth = (
                typeof width === 'number' && width < 0
                    ? Size.from(-width)
                    : width ?? this._useTheme.root.size.border
            ) as SizesType<SizeValue>;
            const borderSize = this._toSize(borderWidth, {
                response: 'border',
            });
            if (typeof borderSize === 'string') {
                return `${borderSize} ${style} ${this._getColor(color)}`;
            }
            return Size.callback(
                borderSize,
                (s) => `${s?.toString()} ${style} ${this._getColor(color)}`,
            ) as Sizes<string>;
        }
    }

    protected _toBorders(
        border?: SizesType<LinesStyleType | string | null | undefined>,
    ): Sizes<string> | undefined {
        if (border) {
            if (Size.is(border))
                return Size.callback(border, (border) =>
                    this._toBorder(border as string),
                ) as Sizes<string>;
            return this._toBorder(border as LinesStyleType | string | null);
        }
    }

    // Grid Template
    protected _toGridTemplate(template: string | GridType): string {
        return !Ary.is(template)
            ? template
            : template
                  .map((col) => (typeof col === 'number' ? `${col}fr` : col))
                  .join(' ');
    }

    // Grid Template
    protected _toGridTemplates = (template: GridType[]): string => {
        return !Array.isArray(template)
            ? template
            : template?.map((row) => this._toGridTemplate(row)).join(' / ');
    };

    protected _toGridArea(area: string | GridType[]): string {
        return typeof area === 'string'
            ? area
            : area?.map((area) => area.join(' / '))?.join(' / ');
    }

    // Switch
    protected _setSwitch<SxValue extends SxType[keyof SxType]>(
        value: SizesType<ChocoStyleValue> | undefined,
        map: Record<string, SxValue>,
    ): SizesType<SxValue> | void {
        if (value === undefined) return;
        const getMappedValue = (val: unknown): SxValue =>
            val === null ? map['null'] : map[val as keyof SxType];
        if (Size.is(value))
            return Size.callback(value, (sizeValue) =>
                getMappedValue(sizeValue),
            );
        return getMappedValue(value);
    }
}
