//-Path: "react-choco-style/src/hook/ChocoStyle.tsx"
import {
    ColorType,
    ColorsType,
    SetColorType,
    ColorHexType,
    ColorDefaultType,
} from '../types/color';
import { styled } from '@mui/material';
import { motion } from 'framer-motion';
import { SizeValue } from '../types/size';
import { ChocoProps } from './ChocoProps';
import { ChocoResponse } from './ChocoResponse';
import { CustomStylesType } from '../types/chocoHook';
import { ReactTagType, SxType } from '../types/style';
import { themeAtom, themeModeAtom } from '../theme/theme';
import { keysChocoStyleProps } from '../data/reservedKeywords';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleTypes, StyledType, ChocoStyledType } from '../types/choco';
import { PaletteType, ThemeFontsType, UseChocoThemeType } from '../types/theme';

export class ChocoStyle {
    static useTheme(): UseChocoThemeType {
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
                method: { setMode: (mode) => setMode(mode) },
            }),
            [mode, theme],
        );
    }

    static styled<TagType extends ReactTagType>(
        tag: TagType,
        nameTag?: string,
    ) {
        return (customStyles?: StyleTypes | CustomStylesType) => {
            const getStyles = (): Record<string, SizeValue> => {
                const theme = this.useTheme();
                const chocoStyle = ChocoResponse.useChocoStyle<StyledType>();
                return typeof customStyles === 'function'
                    ? chocoStyle(customStyles({ theme }))
                    : chocoStyle(customStyles ?? {});
            };
            const create = styled(
                tag as unknown as keyof React.JSX.IntrinsicElements,
                { name: nameTag },
            );
            const Component = create(() => getStyles());
            const MotionComponent = motion(Component);
            return forwardRef<
                HTMLElement,
                ChocoStyledType & React.ComponentPropsWithoutRef<TagType>
            >((prop, ref) => {
                const { cs } = prop;
                const chocoStyle = ChocoResponse.useChocoStyle<SxType>();
                const propChocoStyle = ChocoResponse.usePropChocoStyle();
                const { sx, props } = useMemo(() => {
                    const chocoStyleProps = propChocoStyle(prop);
                    return {
                        sx: chocoStyle({
                            ...cs,
                            ...chocoStyleProps,
                        } as StyleTypes),
                        props: ChocoProps.removeReservedProps(
                            [...keysChocoStyleProps, 'sx'],
                            prop,
                        ),
                    };
                }, [prop, chocoStyle, propChocoStyle]);
                const componentProps = props as React.ComponentProps<
                    typeof MotionComponent
                >;
                return (
                    <MotionComponent {...componentProps} sx={sx} ref={ref} />
                );
            });
        };
    }

    static useGetColor(): (color?: ColorsType) => string | undefined {
        const { palette } = this.useTheme();

        return useCallback(
            (color?: ColorsType): string | undefined => {
                if (!color) return undefined;
                const colorMap: Record<string, string | undefined> = {
                    null: 'transparent',

                    //*common
                    paper: palette.background.paper,
                    inherit: palette.background.default,

                    //*text
                    disabled: palette.text.disabled,
                    disabledText: palette.primary.textDisabled,
                    text: palette.text.primary,

                    //*primary
                    primary: palette.primary.main,
                    primaryText: palette.primary.text,

                    //*secondary
                    secondary: palette.secondary.main,
                    secondaryText: palette.secondary.text,

                    //*error
                    error: palette.error.main,
                    errorText: palette.error.text,

                    //*warning
                    warning: palette.warning.main,
                    warningText: palette.warning.text,

                    //*info
                    info: palette.info.main,
                    infoText: palette.info.text,

                    //*success
                    success: palette.success.main,
                    successText: palette.success.text,
                };
                if (color in colorMap) return colorMap[color];
                if (typeof color === 'string' && color.startsWith('palette.')) {
                    const path = color.split('.').slice(1);
                    let result: any = palette;
                    for (const key of path) {
                        result = result?.[key];
                        if (!result) return undefined;
                    }
                    return typeof result === 'string' ? result : undefined;
                }
                const defaultColor = palette[color as ColorDefaultType];
                return defaultColor?.main ?? color;
            },
            [palette],
        );
    }

    static useGetsetClr(): (
        color?: ColorType,
        isText?: boolean,
    ) => SetColorType {
        const { palette } = this.useTheme();

        return useCallback(
            (color?: ColorsType, isText: boolean = false): SetColorType => {
                switch (`${color ?? 'secondary'}${isText ? 'Text' : ''}`) {
                    //*common
                    case 'paper':
                        return {
                            color: palette.text.primary,
                            action: palette.text.disabled,
                            borColor: palette.text.primary,
                            bgColor: palette.background.paper,
                            bgHover: palette.background.default,
                        };
                    case 'inherit':
                        return {
                            bgColor: null,
                            action: palette.text.primary,
                            bgHover: palette.text.disabled,
                            color: palette.background.default,
                            borColor: palette.background.default,
                        };
                    //*text
                    case 'disabled':
                        return {
                            color: palette.text.disabled,
                            action: palette.shadow.light ?? palette.shadow.main,
                            bgColor: palette.shadow.main,
                            borColor: palette.text.disabled,
                            bgHover: `${
                                palette.primary.textDisabled ??
                                palette.primary.disabled
                            }66`,
                        };
                    case 'disabledText':
                        return {
                            bgColor: null,
                            color: palette.text.disabled,
                            action: palette.text.primary,
                            borColor: palette.text.disabled,
                            bgHover: `${
                                palette.primary.textDisabled ??
                                palette.primary.disabled ??
                                palette.text.disabled
                            }66`,
                        };
                    case 'text':
                        return {
                            bgColor: null,
                            color: palette.text.primary,
                            bgHover: palette.text.disabled,
                            borColor: palette.text.primary,
                            action:
                                palette.primary.textDisabled ??
                                palette.text.disabled,
                        };
                    //*primary
                    case 'primary':
                        return {
                            color: palette.primary.text,
                            bgColor: palette.primary.main,
                            borColor: palette.primary.text,
                            bgHover:
                                palette.primary.dark ?? palette.primary.main,
                            action:
                                palette.primary.textDisabled ??
                                palette.text.disabled,
                        };
                    case 'primaryText':
                        return {
                            bgColor: null,
                            color: palette.primary.main,
                            borColor: palette.primary.main,
                            action:
                                palette.primary.dark ?? palette.primary.main,
                            bgHover: `${
                                palette.primary.dark ?? palette.primary.main
                            }66`,
                        };
                    //*secondary
                    case 'secondary':
                        return {
                            color: palette.secondary.text,
                            bgColor: palette.secondary.main,
                            borColor: palette.secondary.text,
                            bgHover:
                                palette.secondary.dark ??
                                palette.secondary.main,
                            action:
                                palette.secondary.textDisabled ??
                                palette.text.disabled,
                        };
                    case 'secondaryText':
                        return {
                            bgColor: null,
                            color: palette.secondary.main,
                            borColor: palette.secondary.main,
                            action:
                                palette.secondary.dark ??
                                palette.secondary.main,
                            bgHover: `${
                                palette.secondary.dark ?? palette.secondary.main
                            }66`,
                        };
                    //*error
                    case 'error':
                        return {
                            color: palette.error.text,
                            bgColor: palette.error.main,
                            borColor: palette.error.text,
                            bgHover: palette.error.dark ?? palette.error.main,
                            action:
                                palette.error.textDisabled ??
                                palette.text.disabled,
                        };
                    case 'errorText':
                        return {
                            bgColor: null,
                            color: palette.error.main,
                            borColor: palette.error.main,
                            action: palette.error.dark ?? palette.error.main,
                            bgHover: `${
                                palette.error.dark ?? palette.error.main
                            }66`,
                        };

                    //*warning
                    case 'warning':
                        return {
                            color: palette.warning.text,
                            bgColor: palette.warning.main,
                            borColor: palette.warning.text,
                            bgHover:
                                palette.warning.dark ?? palette.warning.main,
                            action:
                                palette.warning.textDisabled ??
                                palette.text.disabled,
                        };
                    case 'warningText':
                        return {
                            bgColor: null,
                            color: palette.warning.main,
                            borColor: palette.warning.main,
                            action:
                                palette.warning.dark ?? palette.warning.main,
                            bgHover: `${
                                palette.warning.dark ?? palette.warning.main
                            }66`,
                        };

                    //*info
                    case 'info':
                        return {
                            color: palette.info.text,
                            bgColor: palette.info.main,
                            borColor: palette.info.text,
                            bgHover: palette.info.dark ?? palette.info.main,
                            action:
                                palette.info.textDisabled ??
                                palette.text.disabled,
                        };
                    case 'infoText':
                        return {
                            bgColor: null,
                            color: palette.info.main,
                            borColor: palette.info.main,
                            action: palette.info.dark ?? palette.info.main,
                            bgHover: `${
                                palette.info.dark ?? palette.info.main
                            }66`,
                        };

                    //*success
                    case 'success':
                        return {
                            color: palette.success.text,
                            bgColor: palette.success.main,
                            borColor: palette.success.text,
                            bgHover:
                                palette.success.dark ?? palette.success.main,
                            action:
                                palette.success.textDisabled ??
                                palette.success.text,
                        };
                    case 'successText':
                        return {
                            bgColor: null,
                            color: palette.success.main,
                            borColor: palette.success.main,
                            action:
                                palette.success.dark ?? palette.success.main,
                            bgHover: `${
                                palette.success.dark ?? palette.success.main
                            }66`,
                        };

                    default:
                        const colors = palette[color as ColorDefaultType];
                        return {
                            color: colors ? colors.text : color ?? null,
                            action: colors
                                ? colors.dark ?? colors.main
                                : color ?? null,
                            bgColor: colors ? colors.main : null,
                            bgHover: colors
                                ? `${colors.dark ?? colors.main}66`
                                : null,
                            borColor: colors ? colors.text : color ?? null,
                        };
                }
            },
            [palette],
        );
    }

    static useGetsetClrProps(defaultColor: ColorType = 'secondary') {
        const getSetClr = this.useGetsetClr();

        return useCallback(
            ({
                text,
                focus = true,
                setClr,
                outline,
                disabled,
            }: {
                text?: boolean;
                focus?: boolean;
                setClr?: ColorType;
                outline?: boolean;
                borders?: boolean;
                disabled?: boolean;
            }): {
                styles: StyleTypes;
                setClrs?: SetColorType;
            } => {
                let styles: StyleTypes = {};
                const setClrs = getSetClr(setClr ?? defaultColor, text);

                const disabledColor = 88;
                const getColor = (
                    clr?: ColorsType,
                    disabled: number = disabledColor,
                ): ColorsType | undefined =>
                    typeof clr !== 'string'
                        ? clr
                        : (clr?.length ?? 0) > 7
                        ? clr
                        : clr.startsWith('#')
                        ? `${clr as ColorHexType}${disabled}`
                        : clr;

                const focusStyle: StyleTypes = {
                    '&:focus': {
                        outlines: {
                            size: 4,
                            color: getColor(setClrs?.borColor),
                        },
                        bgClr: disabled
                            ? undefined
                            : outline
                            ? getColor(setClrs?.bgHover, disabledColor / 2)
                            : setClrs?.bgHover,
                    },
                };

                if (outline) {
                    styles = {
                        bgClr: null,
                        borders: {
                            size: 2,
                            style: 'solid',
                            color: setClrs?.bgColor ?? defaultColor,
                        },
                        clr: (disabled
                            ? getColor(setClrs?.bgColor)
                            : setClrs?.bgColor ?? defaultColor) as ColorType,
                        '&:hover': {
                            bgClr: disabled
                                ? undefined
                                : getColor(setClrs?.bgHover, disabledColor / 2),
                        },
                    };
                } else {
                    styles = {
                        border: 'none',
                        clr: (disabled
                            ? getColor(setClrs?.color)
                            : setClrs?.color ?? defaultColor) as ColorType,
                        bgClr: disabled
                            ? getColor(setClrs?.bgColor)
                            : setClrs?.bgColor,
                        '&:hover': {
                            bgClr: disabled ? undefined : setClrs?.bgHover,
                        },
                    };
                    if (focus) {
                        styles = { ...styles, ...focusStyle };
                    }
                }
                return { styles, setClrs };
            },
            [defaultColor, getSetClr],
        );
    }

    static useFont() {
        const { fonts } = this.useTheme();

        return {
            getFont: useCallback(
                (size?: keyof ThemeFontsType['weight']): StyleTypes => {
                    const css: StyleTypes = {
                        fontFamily: fonts.family,
                        fontWeight: fonts.weight[size ?? 'regular'],
                    };
                    return css;
                },
                [fonts],
            ),
        };
    }
}
