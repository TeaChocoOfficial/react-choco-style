//-Path: "react-choco-style/lib/src/hooks/useChocoHook.tsx"
import {
    CsType,
    StyleTypes,
    UseThemeOption,
    ChocoStyleTypes,
} from '../types/choco';
import {
    ChocoHooks,
    FontOption,
    UseSizeType,
    OptionPropsType,
    ChocoStyledProps,
} from '../types/chocoHook';
import Debug from '../config/debug';
import { Size } from '../class/Size';
import { Obj } from '@teachoco-dev/cli';
import { CColor } from '../class/CColor';
import { BaseThemeAtom } from '../temp/temp';
import { useCallback, useMemo } from 'react';
import { ReactTagType } from '../types/style';
import { ChocoProp } from '../class/ChocoProp';
import { ThemeFontsType } from '../types/theme';
import { ChocoColor } from '../class/ChocoColor';
import { ChocoStyle } from '../class/ChocoStyle';
import { SizeOption } from '../class/SizeOption';
import { StyleValue } from '../types/chocoValue';
import { useTheme as useMuiTheme } from '@mui/material';
import { Sizes, SizeType, SizesValue, SizeOptions } from '../types/size';

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
        <Style extends StyleTypes>(
            size?: keyof ThemeFontsType['weight'],
            option?: FontOption,
        ) => {
            const css: StyleTypes = {
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
        (cs?: CsType): ChocoStyleTypes => {
            const option: UseThemeOption = {
                Size,
                theme,
                CColor,
            };
            if (typeof cs === 'function') return { ...cs(option) };
            if (cs instanceof ChocoStyle) return responseCs(cs.cs);
            const styles = { ...(cs ?? {}) };
            return styles;
        },
        [theme],
    );

    const sz: UseSizeType = useCallback(
        (option?: SizeOptions<number>): SizeType<number> => {
            const sizeOption = SizeOption.toSizeOption(option);
            const { cs } = prop;
            const debug = prop?.debug;
            const root = Size.getRoot();
            const chocoStyles = responseCs(cs);

            const sizes = (prop.sz ?? chocoStyles.sz) as
                | Sizes<number>
                | undefined;

            const getSz = (): SizesValue<number> => {
                if (Size.is(sizes)) return sizes.value;
                if (typeof sizes === 'number') return sizes;
                return root;
            };

            const value = getSz();

            const newOption = sizeOption.clone?.set({
                debug,
                check:
                    sizeOption?.check === undefined ? true : sizeOption.check,
            });
            const { sz } = newOption;
            if (sz !== undefined) {
                newOption.set({
                    root: sz,
                    calc: (value, root) => {
                        const newValue = value / root;
                        return sizeOption.calc(newValue, root);
                    },
                });
            }
            const newSz = Size.check(value, newOption);
            Debug.debug(debug, 'sz', {
                propSz: prop['sz'],
                root,
                value,
                newSz,
                option: sizeOption.option,
                newOption: newOption.option,
            });
            // Debug.debug(debug, 'props', {
            //     root,
            //     sizes,
            //     value,
            //     newSz,
            //     newOption,
            // });

            return newSz;
        },
        [prop, responseCs],
    );

    // mergeNestedStyles function
    function mergeNestedStyles(
        style1: ChocoStyleTypes,
        style2: ChocoStyleTypes,
    ): ChocoStyleTypes {
        const result: ChocoStyleTypes = { ...style1 };
        Obj.map(style2, (value, key) => {
            if (Obj.hasOwn(style2, key) && value !== undefined) {
                (result as Record<string, StyleValue>)[key] = value as StyleValue;
            }
        });

        return result;
    }

    // mixCs logic
    const mixCs: ChocoHooks.MixCs = useCallback(
        (...chocoStyles: (CsType | undefined)[]): ChocoStyleTypes => {
            const validStyles = chocoStyles
                .filter((style) => style !== undefined)
                .map((style) => responseCs(style!)); // Non-null assertion since we filtered undefined
            if (validStyles.length === 0) return {};
            return validStyles.reduce<ChocoStyleTypes>(
                (acc, current) => mergeNestedStyles(acc, current),
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
            Size,
            theme,
            mixCs,
            CColor,
            getFont,
            chocoProp,
            responseCs,
            chocoColor,
            ChocoStyle,
        }),
        [sz, theme, mixCs, getFont, chocoProp, responseCs],
    );

    return optionProps;
}
