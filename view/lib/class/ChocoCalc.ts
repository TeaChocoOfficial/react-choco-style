//-Path: "react-choco-style/lib/src/class/ChocoCalc.ts"
import {
    SizesType,
    SizeValue,
    SizesValue,
    SizeOptions,
    SizeOptionType,
} from '../types/size';
import { Size } from './Size';
import { CColor } from './CColor';
import Debug from '../config/debug';
import { SxType } from '../types/style';
import { ChocoColor } from './ChocoColor';
import { ChocoShade } from './ChocoShade';
import { SizeOption } from './SizeOption';
import { ColorsType } from '../types/color';
import { Ary, Obj } from '@teachoco-dev/cli';
import { useTheme } from '../hooks/useTheme';
import { GridType } from '../types/chocoValue';
import { ChocoHooks } from '../types/chocoHook';
import { UseChocoThemeType } from '../types/theme';
import { useChocoHook } from '../hooks/useChocoHook';
import { LinesStyleType } from '../types/chocoValue';
import { ChocoStylesType } from '../types/chocoStyle';
import { ChocoStyleTypes, ChocoStyleValue } from '../types/choco';

type InsetValue = SizesType<ChocoStyleValue> | undefined;
type CssProperties = [keyof SxType, SizesValue<string | undefined>] | undefined;

export class ChocoCalc {
    _chocoColor: ChocoColor;
    _useTheme: UseChocoThemeType;
    _responseCs: ChocoHooks.ResponseCs;
    constructor() {
        this._useTheme = useTheme();
        const chocoHook = useChocoHook();
        this._chocoColor = new ChocoColor();
        this._responseCs = chocoHook.responseCs;
        this._toColor = this._toColor.bind(this); // Bind _toColor เพื่อรักษา this
    }

    _getToBase(styles: ChocoStyleTypes) {
        const toBase = <Value>(
            keys: (keyof ChocoStylesType)[],
            option: SizeOptions<Value>,
        ): string | undefined => {
            let size: string | undefined;
            keys.forEach((key) => {
                const value = styles[key] as SizesType<Value>;
                if (size === undefined) size = this._toSize(value, option);
            });
            return size;
        };
        return toBase;
    }

    /**
     * ฟังก์ชันช่วยแปลง sizes
     * @param value สิ่งที่จะแปลง
     * @param option ตัวเลือกในการแปลง
     * @param none true is "none" false is "unset" or other value
     * @returns สิ่งที่แปลงแล้ว
     */
    _toSize<Value, NewValue extends string = 'none'>(
        value?: SizesType<Value>,
        option: SizeOptions<Value> = { check: true },
        none?: NewValue | boolean,
    ): NewValue | undefined {
        const sizeOption = SizeOption.toSizeOption(option);
        const sizes = this._toSizes(
            value,
            sizeOption.def({ check: true }),
            none,
        );
        // Debug.debug(debug, 'from toSize in ChocoCalc', {
        //     value,
        //     sizes,
        //     option,
        // });
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

    /**
     * ฟังก์ชันช่วยแปลง sizes
     * @param value สิ่งที่จะแปลง
     * @param option ตัวเลือกในการแปลง
     * @param none true is "none" false is "unset" or other value
     * @returns สิ่งที่แปลงแล้ว
     */
    _toSizes<Value, NewValue extends string | number = 'none'>(
        value?: SizesType<Value>,
        option: SizeOptions<Value> = { check: true },
        none?: NewValue | boolean,
    ): SizesValue<NewValue> | undefined {
        const sizeOption = SizeOption.toSizeOption(option);
        sizeOption.def({ check: true });
        const Null = none === true ? 'none' : none === false ? 'unset' : none;
        // Debug.if(debug, 'from toSizes in ChocoCalc', {
        //     Null,
        //     value,
        //     sizeOption,
        // });
        if (value === null && none !== undefined) return Null as NewValue;
        if (typeof value === 'number' || Size.is(value) || Size.in(value))
            return Size.use(value, (value) =>
                Size.check<Value, NewValue>(value as Value, sizeOption),
            ) as SizesValue<NewValue>;
        else if (typeof value === 'string') return value as unknown as NewValue;
    }

    // ฟังก์ชันช่วยแปลง color
    _toColor<Return extends SizesValue<string> | undefined | null>(
        color?: ChocoStyleValue<ColorsType>,
    ): Return {
        try {
            if (color === undefined) return undefined as Return;
            const toHex = (chocoColor: ColorsType): string | undefined | null =>
                chocoColor instanceof CColor || chocoColor instanceof ChocoShade
                    ? chocoColor.hex()
                    : chocoColor;
            if (Size.is(color))
                return Size.callback(color, (color: ColorsType) =>
                    toHex(this._chocoColor.get(color)),
                ) as Return;
            return toHex(this._chocoColor.get(color as ColorsType)) as Return;
        } catch (error) {
            Debug.err(error);
            return null as Return;
        }
    }

    _toColors<Return extends SizesValue<string | undefined> | undefined>(
        color?: SizesType<ChocoStyleValue<ColorsType>>,
    ): Return {
        if (color === undefined) return undefined as Return;
        return Size.use(
            color as ChocoStyleValue<ColorsType>,
            this._toColor,
        ) as Return;
    }

    // ฟังก์ชันตั้งค่า CSS
    _setCss(CssProperties: SxType) {
        return (
            key: keyof SxType,
            value: SizesValue<number | string | undefined>,
            debug?: boolean,
        ): CssProperties => {
            if (value !== undefined) {
                Debug.if(debug, `Set css property "${key}"`, value);
                const sizesValue = (
                    typeof value === 'number' ? value.toString() : value
                ) as SizesValue<string | undefined>;
                (CssProperties as Record<string, SizesValue>)[key] = sizesValue;
                return [key, sizesValue];
            }
        };
    }

    // Inset (padding, margin, gap ฯลฯ)

    _setInset<CssInsetValue extends [keyof SxType, InsetValue]>(
        setCss: (
            key: keyof SxType,
            value: SizesValue<string | undefined>,
            debug?: boolean,
        ) => CssProperties,
        key: keyof SxType,
        value: InsetValue,
        sides: Record<string, CssInsetValue>,
        option: SizeOption<InsetValue> | SizeOptionType<InsetValue> = {
            check: true,
        },
    ): CssInsetValue | CssInsetValue[] {
        const sizeOption = SizeOption.toSizeOption(option);
        const { check = true } = sizeOption;
        sizeOption.set({ check });
        if (value !== undefined) {
            const output = [
                key,
                this._toSize(value, sizeOption, false),
            ] as CssProperties;
            if (output) {
                setCss(...output);
                return output as CssInsetValue;
            }
        }
        const outputs: CssInsetValue[] = [];
        Object.entries(sides).forEach(([_, [sideKey, sideVal]]) => {
            if (sideVal !== undefined) {
                const output = [
                    sideKey,
                    this._toSize(sideVal, sizeOption, false),
                ] as CssProperties;
                if (output) {
                    setCss(...output);
                    outputs.push(output as CssInsetValue);
                }
            }
        });
        return outputs;
    }

    // Border
    _toBorder(
        border?: LinesStyleType | string | null,
    ): SizesValue<string | undefined> | undefined {
        if (border === null) return 'none';
        if (typeof border === 'string') return border;
        if (border) {
            const { width, style = 'solid', color = 'secondary' } = border;
            const borderWidth = (
                typeof width === 'number' && width < 0
                    ? Size.from(-width)
                    : width ?? this._useTheme.root.size.border
            ) as SizesType<SizeValue>;
            const borderSize = this._toSize(
                borderWidth,
                { response: 'border' },
                false,
            );
            if (typeof borderSize === 'string') {
                return `${borderSize} ${style} ${this._chocoColor.get(color)}`;
            }
            return Size.callback(
                borderSize,
                (size) =>
                    `${size?.toString()} ${style} ${this._chocoColor.get(
                        color,
                    )}`,
            ) as SizesValue<string | undefined>;
        }
    }

    _toBorders(
        border?: SizesType<LinesStyleType | string | null | undefined>,
    ): SizesValue<string | undefined> | undefined {
        if (border) {
            if (Size.is(border))
                return Size.callback(
                    border,
                    (border: LinesStyleType | string | null | undefined) =>
                        this._toBorder(border),
                ) as SizesValue<string | undefined>;
            return this._toBorder(border as LinesStyleType | string | null);
        }
    }

    // Grid Template
    _toGridTemplate(template: string | GridType): string {
        return !Ary.is(template)
            ? template
            : template
                  .map((col) => (typeof col === 'number' ? `${col}fr` : col))
                  .join(' ');
    }

    // Grid Template
    _toGridTemplates = (template: GridType[]): string => {
        return !Array.isArray(template)
            ? template
            : template?.map((row) => this._toGridTemplate(row)).join(' / ');
    };

    _toGridArea(area: string | GridType[]): string {
        return typeof area === 'string'
            ? area
            : area?.map((area) => area.join(' / '))?.join(' / ');
    }

    // Switch
    _setSwitch(
        value: SizesType<ChocoStyleValue> | undefined,
        map: Record<string, string | undefined>,
    ): SizesValue<string | undefined> | undefined {
        if (value === undefined) return;
        const getMappedValue = (val: unknown): string | undefined =>
            val && typeof val === 'string' ? map[val] : map['null'];
        if (Size.is(value))
            return Size.callback(value, (sizeValue) =>
                getMappedValue(sizeValue),
            ) as SizesValue<string | undefined>;
        return getMappedValue(value);
    }
}
