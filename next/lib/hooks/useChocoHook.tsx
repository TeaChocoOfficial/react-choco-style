//-Path: "lib/src/hooks/useChocoHook.tsx"
import {
    ChocoHooks,
    FontOption,
    UseSizeType,
    OptionPropsType,
    ChocoStyledProps,
    CsOptions,
} from '../types/chocoHook';
import Debug from '../config/debug';
import { Obj } from '@teachoco-dev/cli';
import { CColor } from '../class/theme/CColor';
import { CsValue } from '../class/option/CsValue';
import { CsStyle } from '../class/style/CsStyle';
import { CsOption } from '../class/option/CsOption';
import { BaseThemeAtom } from '../temp/temp';
import { useCallback, useMemo } from 'react';
import { ReactTagType } from '../types/style';
import { ChocoProp } from '../class/hook/ChocoProp';
import { ThemeFontsType } from '../types/theme';
import { ChocoColor } from '../class/hook/ChocoColor';
import { ChocoStyle } from '../class/style/ChocoStyle';
import { StyleValue } from '../types/chocoValue';
import { ChocoStylesType } from '../types/chocoStyle';
import { InSizesValue, SizeType } from '../types/size';
import { CsType, UseThemeOption } from '../types/choco';
import { useTheme as useMuiTheme } from '@mui/material';

// Custom Hook to manage theme and option props
export function useChocoHook(
    prop: ChocoStyledProps<ReactTagType> = {},
): OptionPropsType {
    // Theme logic (replaces ChocoHook.useTheme)
    const muiTheme = useMuiTheme();
    const baseTheme = BaseThemeAtom.get();
    const { setMode } = BaseThemeAtom.actions();

    const theme = useMemo(
        () => ChocoStyle.toUseTheme(baseTheme, muiTheme, setMode),
        [baseTheme, muiTheme, setMode],
    );

    const chocoColor = new ChocoColor(theme);

    // getFont logic (replaces ChocoHook.getFont)
    const getFont: ChocoHooks.GetFont = useCallback(
        <Style extends Partial<ChocoStylesType>>(
            size?: keyof ThemeFontsType['weight'],
            option?: FontOption,
        ): Style => {
            const css: Partial<ChocoStylesType> = {
                fontF: theme.fonts.family,
                fontW: theme.fonts.weight[size ?? 'regular'],
                txtTf: option?.lowcase ? null : undefined,
            };
            return css as Style;
        },
        [theme],
    );

    // responseCs logic (replaces ChocoHook.responseCs)
    const responseCs: ChocoHooks.ResponseCs = useCallback(
        (cs?: CsType): CsStyle => {
            const option: UseThemeOption = {
                theme,
                CColor,
                CsStyle,
                CsValue,
                CsOption,
            };
            if (typeof cs === 'function') return new CsStyle({ ...cs(option) });
            if (cs instanceof CsStyle) return cs;
            const styles = { ...(cs ?? {}) };
            return new CsStyle(styles);
        },
        [theme],
    );

    const sz: UseSizeType = useCallback(
        <Value = StyleValue,>(option?: CsOptions): SizeType<Value> => {
            const { cs } = prop;
            const debug = prop?.debug;
            const root = CsValue.getRoot();
            const chocoStyles = responseCs(cs);
            const csOption = new CsOption(option);

            const sizes = new CsValue(prop.sz ?? chocoStyles.cs.sz, csOption);

            const getSz = (): number => {
                const value = sizes.response;
                if (value !== undefined) return value as number;
                return root;
            };

            const value = getSz();

            const newOption = csOption.clone?.assign({
                debug,
                check: csOption?.check === undefined ? true : csOption.check,
            });
            const { sz } = newOption;
            if (sz !== undefined) {
                newOption.assign({
                    root: sz,
                    // calc: (value, root) => {
                    //     const newValue = value / root;
                    //     return sizeOption.calc(newValue, root);
                    // },
                });
            }
            const newSz = CsValue.check(value as InSizesValue, newOption);
            Debug.debug(debug, 'sz', {
                propSz: prop['sz'],
                root,
                value,
                newSz,
                option: csOption.options,
                newOption: newOption.options,
            });
            // Debug.debug(debug, 'props', {
            //     root,
            //     sizes,
            //     value,
            //     newSz,
            //     newOption,
            // });

            return newSz as SizeType<Value>;
        },
        [prop, responseCs],
    );

    // mergeNestedStyles function
    function mergeNestedStyles(
        style1: ChocoStylesType,
        style2: ChocoStylesType,
    ): ChocoStylesType {
        const result: ChocoStylesType = { ...style1 };
        Obj.map(style2, (value, key) => {
            if (Obj.hasOwn(style2, key) && value !== undefined) {
                (result as Record<string, StyleValue>)[key] =
                    value as StyleValue;
            }
        });

        return result;
    }

    // mixCs logic
    const mixCs: ChocoHooks.MixCs = useCallback(
        (...chocoStyles: (CsType | undefined)[]): ChocoStylesType => {
            const validStyles = chocoStyles
                .filter((style) => style !== undefined)
                .map((style) => responseCs(style!)); // Non-null assertion since we filtered undefined
            if (validStyles.length === 0) return {};
            return validStyles.reduce<ChocoStylesType>(
                (acc, current) => mergeNestedStyles(acc, current.cs),
                {},
            );
        },
        [responseCs],
    );

    // Construct chocoProp after responseCs is defined
    const chocoProp = useMemo(() => new ChocoProp(responseCs), [responseCs]);

    // Construct optionProps
    const optionProps: OptionPropsType = useMemo(
        () => ({
            sz,
            theme,
            mixCs,
            CColor,
            getFont,
            CsStyle,
            CsValue,
            CsOption,
            chocoProp,
            responseCs,
            chocoColor,
        }),
        [sz, theme, mixCs, getFont, chocoProp, responseCs],
    );

    return optionProps;
}
