//-Path: "react-choco-style/lib/src/hooks/test.ts"
// Path: "react-choco-style/lib/src/hooks/useChocoHook.tsx"
import {
    ChocoHooks,
    FontOption,
    UseSizeType,
    OptionPropsType,
    ChocoStyledProps,
} from '../types/chocoHook';
import { Size } from '../class/Size';
import { CColor } from '../class/CColor';
import { useCallback, useMemo } from 'react';
import { ReactTagType } from '../types/style';
import { ChocoProp } from '../class/ChocoProp';
import { ThemeFontsType } from '../types/theme';
import { ChocoColor } from '../class/ChocoColor';
import { ChocoStyle } from '../class/ChocoStyle';
import { CsType, StyleTypes } from '../types/choco';
import { useTheme as useMuiTheme } from '@mui/material';
import { BaseThemeAtom, UseThemeAtom } from '../temp/temp';
import { SizeOption, Sizes, SizesType } from '../types/size';

export function useChocoHook(
    prop: ChocoStyledProps<ReactTagType> = {},
): OptionPropsType {
    // Theme logic
    const muiTheme = useMuiTheme();
    const useTheme = UseThemeAtom.get();
    const baseTheme = BaseThemeAtom.get();
    const elseTheme = useMemo(
        () => ChocoStyle.toUseTheme(baseTheme, muiTheme),
        [baseTheme],
    );

    const theme = useMemo(() => useTheme || elseTheme, [useTheme, baseTheme]);

    // getFont logic
    const getFont: ChocoHooks.GetFont = useCallback(
        <Style extends StyleTypes | CsType>(
            size?: keyof ThemeFontsType['weight'],
            option?: FontOption,
        ) => {
            const css: StyleTypes = {
                fontFamily: theme.fonts.family,
                fontWeight: theme.fonts.weight[size ?? 'regular'],
                textTransform: option?.lowcase ? 'none' : undefined,
            };
            return css as Style;
        },
        [theme],
    );

    // sz logic
    const sz: UseSizeType = useCallback(
        (option?: SizeOption<number>) => {
            const { cs } = prop;
            const chocoStyles = responseCs(cs); // This will be resolved after responseCs is defined
            const getSz = (): Sizes<number> | undefined => {
                const sizes = (prop['sz'] ?? chocoStyles['sz']) as Sizes;

                if (sizes !== undefined) {
                    if (Size.is(sizes)) {
                        return sizes as Size<number>;
                    } else if (typeof sizes === 'number') {
                        if (sizes < 0) return new Size(sizes);
                        else return sizes;
                    }
                }
            };
            const root = option?.root
                ? typeof option.root === 'number'
                    ? option.root
                    : theme.root.size[option.root]
                : theme.root.size.base;
            const response = option?.root
                ? typeof option.root === 'number'
                    ? option.root
                    : theme.root.response[option.root]
                : theme.root.response.base;
            const value = getSz() ?? root;

            const newOption: SizeOption<number> = {
                ...option,
                root,
                calc: (value, root) =>
                    option?.calc?.(value / response, root) ?? value / response,
                check: option?.check === undefined ? true : option.check,
            };
            return new Size<number>(value, newOption) as SizesType<number>;
        },
        [prop, theme], // Remove responseCs from dependencies
    );

    // responseCs logic
    const responseCs: ChocoHooks.ResponseCs = useCallback(
        (cs?: CsType): StyleTypes => {
            if (typeof cs === 'function') {
                const styles = cs({
                    sz,
                    Size,
                    theme,
                    CColor,
                    getFont,
                    chocoProp: new ChocoProp(responseCs), // Create ChocoProp here
                    responseCs,
                    ChocoColor,
                });
                return styles || {};
            }
            const styles = cs || {};
            return styles;
        },
        [theme, getFont, sz], // Add sz to dependencies
    );

    // Construct chocoProp after responseCs is defined
    const chocoProp = useMemo(() => new ChocoProp(responseCs), [responseCs]);

    // Construct optionProps
    const optionProps: OptionPropsType = useMemo(
        () => ({
            sz,
            Size,
            theme,
            CColor,
            getFont,
            chocoProp,
            responseCs,
            ChocoColor,
        }),
        [theme, getFont, sz, chocoProp, responseCs],
    );

    return optionProps;
}
