//-Path: "lib/src/class/style/CssProperties.ts"
import { CsStyle } from './CsStyle';
import { CssStyle } from './CssStyle';
import Debug from '../../config/debug';
import { CColor } from '../theme/CColor';
import { SxType } from '../../types/style';
import { CsValue } from '../option/CsValue';
import { Ary, Obj } from '@teachoco-dev/cli';
import { CsOption } from '../option/CsOption';
import { ColorsType } from '../../types/color';
import { ChocoColor } from '../hook/ChocoColor';
import { ChocoShade } from '../theme/ChocoShade';
import { CsOptions } from '../../types/chocoHook';
import { UseChocoThemeType } from '../../types/theme';
import { ChocoStylesType } from '../../types/chocoStyle';
import { ChocoStyleValue, CssType, CsType } from '../../types/choco';
import { GridType, LinesStyleType, StyleValue } from '../../types/chocoValue';

type CssInsetValue<Value = ChocoStyleValue> = [keyof SxType, Value];
type CssProperties = [keyof SxType, CsValue, CsOptions] | undefined;
type InsetKeys = 'a' | 'x' | 'x2' | 'y' | 'y2' | 'l' | 'r' | 't' | 'b';

export class CssPropertie {
    css: CssStyle;
    constructor(
        private cs: CsStyle,
        private hook: {
            chocoColor: ChocoColor;
            useTheme: UseChocoThemeType;
            chocoStyle(cs?: CsType): CssStyle;
        },
    ) {
        this.css = this._getCssProperties(cs);
    }

    private _getCssProperties(cs: CsStyle): CssStyle {
        const styles = cs.clone.reduce((acc, value, key) => {
            if (key === 'css') {
                return {
                    ...acc,
                    ...this._reduceCssProperties(value as CssType),
                } as SxType;
            }
            return acc as SxType;
        });
        return new CssStyle(styles);
    }

    private _reduceCssProperties(css: CssType): SxType {
        return Obj.reduce<CssType, SxType>(
            css,
            (acc, key, value) => ({
                ...acc,
                [`&${key}`]: this.hook.chocoStyle(new CsStyle(value)).css,
            }),
            {},
        ) as SxType;
    }

    // ฟังก์ชันตั้งค่า CSS
    setCss(
        key: keyof SxType,
        value: ChocoStyleValue,
        option?: CsOptions,
        debug?: boolean,
    ): CssProperties {
        if (value !== undefined) {
            const csValue = new CsValue(value);
            const csOption = new CsOption(option);
            csValue.option.def({ check: true, none: false });
            csValue.addOption(csOption);

            Debug.Fdebug(debug, `Set css property "${key}"`, {
                value,
                csValue,
                res: csValue.response,
            });
            this.css.set(key, csValue.response);
            return [key, csValue.clone, csOption.clone];
        }
    }

    setBase(
        key: keyof SxType,
        keys: (keyof ChocoStylesType)[],
        option?: CsOptions,
        debug?: boolean,
    ) {
        keys.forEach((cKey) =>
            this.setCss(key, this.cs.cs[cKey], option, debug),
        );
    }

    // Inset (padding, margin, gap ฯลฯ)
    setInset(
        insets: { [key in InsetKeys]?: CssInsetValue },
        option?: CsOptions,
    ): CssInsetValue[] {
        const csOption = new CsOption(option);
        const outputs: CssInsetValue[] = [];
        Obj.map(insets, (side) => {
            if (!side) return;
            const [sideKey, sideVal] = side;
            if (sideVal === undefined) return;
            const csValue = new CsValue(sideVal);
            const output: CssProperties = [
                sideKey,
                csValue.clone,
                csOption.clone,
            ];
            if (!output) return;
            this.setCss(...output, csOption.debug);
            outputs.push([sideKey, csValue.clone]);
        });
        return outputs;
    }

    setColor(
        key: keyof SxType,
        value: ChocoStyleValue<ColorsType>,
        option?: CsOptions,
        debug?: boolean,
    ) {
        this.setCss(key, this.toColor(value), option, debug);
    }

    // ฟังก์ชันช่วยแปลง color
    toColor<Return extends ChocoStyleValue<string> | undefined | null>(
        color?: ChocoStyleValue<ColorsType>,
    ): Return {
        try {
            if (color === undefined) return undefined as Return;
            const toHex = (chocoColor: ColorsType): string | undefined | null =>
                chocoColor instanceof CColor || chocoColor instanceof ChocoShade
                    ? chocoColor.hex()
                    : chocoColor;

            const value = new CsValue(color);
            return value.use((value) =>
                toHex(this.hook.chocoColor.get(value as ColorsType)),
            ) as Return;
        } catch (error) {
            Debug.err(error);
            return null as Return;
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

    setGridTemplate(
        key: keyof SxType,
        value?: ChocoStyleValue<string | GridType>,
        option?: CsOptions,
        debug?: boolean,
    ) {}

    setGridTemplates(
        key: keyof SxType,
        value?: ChocoStyleValue<string | [GridType, GridType]>,
        option?: CsOptions,
        debug?: boolean,
    ) {
        const templates = !Ary.is(value)
            ? value
            : value?.map((row) => this._toGridTemplate(row)).join(' / ');
    }

    setGridArea(
        key: keyof SxType,
        value?: ChocoStyleValue<string | GridType>,
        option?: CsOptions,
        debug?: boolean,
    ) {}

    setGridAreas(
        key: keyof SxType,
        value?: ChocoStyleValue<string | GridType[]>,
        option?: CsOptions,
        debug?: boolean,
    ) {
        // const areas =
        //     typeof value === 'string'
        //         ? value
        //         : value?.map((area) => area.join(' / '))?.join(' / ');
    }

    // Border
    _toBorder(
        border?: LinesStyleType | string | null,
    ): ChocoStyleValue<string | undefined> | undefined {
        if (border === null) return 'none';
        if (typeof border === 'string') return border;
        if (border) {
            const { width, style = 'solid', color = 'secondary' } = border;
            // const borderWidth = (
            //     typeof width === 'number' && width < 0
            //         ? Size.from(-width)
            //         : width ?? this._useTheme.root.size.border
            // ) as SizesType<StyleValue>;
            // const borderSize = this._toSize(
            //     borderWidth,
            //     { response: 'border' },
            //     false,
            // );
            // if (typeof borderSize === 'string') {
            //     return `${borderSize} ${style} ${this._chocoColor.get(color)}`;
            // }
            // return Size.callback(
            //     borderSize,
            //     (size) =>
            //         `${size?.toString()} ${style} ${this._chocoColor.get(
            //             color,
            //         )}`,
            // ) as SizesValue<string | undefined>;
        }
    }

    setBorders(
        insets: {
            [key in InsetKeys]?: CssInsetValue<
                LinesStyleType | string | null | undefined
            >;
        },
        option?: CsOptions,
    ) {
        this.setInset(insets, option);
    }

    setSwitch<Value extends StyleValue>(
        key: keyof SxType,
        value?: ChocoStyleValue<Value>,
        switchs?: { [key in string]?: string },
        option?: CsOptions,
        debug?: boolean,
    ) {
        if (value === undefined || switchs === undefined) return;
        const csValue = new CsValue(value);
        const newValue = csValue.use((value) =>
            typeof value === 'string' ? switchs[value] : switchs.null,
        );
        this.setCss(key, newValue, option, debug);
    }
}
