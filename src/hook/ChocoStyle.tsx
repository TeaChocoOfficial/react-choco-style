//-Path: "react-choco-style/src/hook/ChocoStyle.tsx"
import { motion } from 'framer-motion';
import { SizeValue } from '../types/size';
import { ColorType } from '../types/color';
import { useCallback, useMemo } from 'react';
import { ReactTagType } from '../types/style';
import { GlobalCss } from '../data/globalCss';
import { removeReservedProps } from './ChocoProps';
import { CssType, StyleTypes } from '../types/choco';
import { themeAtom, themeModeAtom } from '../theme/theme';
import { keysChocoStyleProps } from '../data/reservedKeywords';
import { useChocoStyle, usePropChocoStyle } from './ChocoResponse';
import { alpha, styled, useTheme as useMuiTheme } from '@mui/material';
import { ChocoStyledProps, CustomStylesType } from '../types/chocoHook';
import { PaletteType, ThemeFontsType, UseChocoThemeType } from '../types/theme';

// export class ChocoStyle {}

export function useTheme(): UseChocoThemeType {
    const muiTheme = useMuiTheme();
    const theme = themeAtom.get();
    const [mode, setMode] = themeModeAtom.use();

    return useMemo(
        () => ({
            mode,
            root: theme.root,
            fonts: theme.fonts,
            breakpoint: theme.breakpoint,
            styleSheets: theme.styleSheets,
            palette: {
                ...theme.modes.default,
                ...theme.modes[mode],
            } as PaletteType,
            method: {
                transitions: muiTheme.transitions,
                setMode: (mode) => setMode(mode),
                spacing: (...factor) =>
                    factor
                        .map(
                            (f) =>
                                (typeof f === 'number'
                                    ? f * theme.root.size.padding
                                    : f) + theme.root.unit.padding,
                        )
                        .join(' '),
                alpha: (color, value) => {
                    if (color === null) {
                        return alpha('#00000000', value) as ColorType;
                    }
                    return alpha(color as string, value) as ColorType;
                },
            },
        }),
        [mode, theme],
    );
}

export function createStyled<TagType extends ReactTagType>(
    tag: TagType,
    nameTag?: string,
) {
    return (customStyles?: StyleTypes | CustomStylesType) => {
        // สร้าง styled component
        const StyledBase = styled(
            tag as unknown as keyof React.JSX.IntrinsicElements,
            { name: nameTag },
        )(() => {
            const theme = useTheme();
            const chocoStyle = useChocoStyle<StyleTypes>();
            return (
                typeof customStyles === 'function'
                    ? chocoStyle(customStyles({ theme }))
                    : chocoStyle(customStyles ?? {})
            ) as Record<string, SizeValue>;
        });

        // ห่อด้วย motion
        const MotionComponent = motion.create(StyledBase);

        // Component ที่จะ return
        return <Props extends ChocoStyledProps<TagType>>(props: Props) => {
            const sxStyle = useChocoStyle<StyleTypes>();
            const propChocoStyle = usePropChocoStyle();

            const { sx, componentProps } = useMemo(() => {
                const { cs, sx: sxProp, ...restProps } = props;
                const chocoStyleProps = propChocoStyle(restProps);
                const combinedStyles = {
                    ...cs,
                    ...chocoStyleProps,
                } as StyleTypes;

                return {
                    sx: sxProp
                        ? [sxStyle(combinedStyles), sxProp]
                        : sxStyle(combinedStyles),
                    componentProps: removeReservedProps(
                        [...keysChocoStyleProps, 'sx'],
                        restProps,
                    ),
                };
            }, [props, sxStyle, propChocoStyle]);

            return (
                <MotionComponent
                    sx={sx}
                    {...(componentProps as React.ComponentProps<
                        typeof MotionComponent
                    >)}
                />
            );
        };
    };
}

export function useFont() {
    const theme = useTheme();

    return {
        getSize: useCallback(
            (prop: ChocoStyledProps<any>) => {
                const { cs, fontS } = prop;
                let chocoStyles: StyleTypes = {};
                if (typeof cs === 'function') {
                    chocoStyles = cs({ theme });
                } else {
                    chocoStyles = { ...cs };
                }
                const size =
                    typeof fontS === 'number'
                        ? fontS
                        : typeof chocoStyles.fontS === 'number'
                        ? chocoStyles.fontS
                        : theme.root.size.text;
                return size;
            },
            [theme],
        ),
        getFont: useCallback(
            (size?: keyof ThemeFontsType['weight']): StyleTypes => {
                const css: StyleTypes = {
                    fontFamily: theme.fonts.family,
                    fontWeight: theme.fonts.weight[size ?? 'regular'],
                };
                return css;
            },
            [theme],
        ),
    };
}

export function useGlobalStyles() {
    const [globalCss, setGlobalCss] = GlobalCss.use();

    return useCallback(
        (key: string, css: CssType) => {
            setGlobalCss((prev) => new Map(prev).set(key, css));
        },
        [globalCss],
    );
}
