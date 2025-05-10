//-Path: "react-choco-style/src/hook/ChocoColor.tsx"
import {
    ColorMain,
    ColorType,
    ColorsType,
    SetColorsType,
    ColorMainType,
    GetsetClrType,
    SetShadesColorType,
} from '../types/color';
import {
    SetClrPropsType,
    UseGetsetClrPropType,
    UseGetsetClrPropsType,
} from '../types/chocoHook';
import { useCallback } from 'react';
import { useTheme } from './ChocoStyle';
import { ChocoColor } from '../theme/color';
import { StyleTypes } from '../types/choco';
import { ColorHex } from '../types/chocoColor';

export function useGetColor(): (color?: ColorsType) => ChocoColor {
    const { palette } = useTheme();

    return useCallback(
        (color?: ColorsType): ChocoColor => {
            if (color === undefined) return new ChocoColor();
            const colorMap: Record<ColorType, ChocoColor> = {
                main: palette.main.inherit[5],
                text: palette.text.inherit[5],

                //*inherit
                inherit: palette.main.inherit[5],
                inheritText: palette.text.inherit[5],

                //*primary
                primary: palette.main.primary[5],
                primaryText: palette.text.primary[5],

                //*disabled
                disabled: palette.main.disabled[5],
                disabledText: palette.text.disabled[5],

                //*secondary
                secondary: palette.main.secondary[5],
                secondaryText: palette.text.secondary[5],

                //*error
                error: palette.main.error[5],
                errorText: palette.text.error[5],

                //*warning
                warning: palette.main.warning[5],
                warningText: palette.text.warning[5],

                //*info
                info: palette.main.info[5],
                infoText: palette.text.info[5],

                //*success
                success: palette.main.success[5],
                successText: palette.text.success[5],
            };
            if (color === null) return new ChocoColor(null);
            if (
                typeof color === 'string' &&
                (color as ColorHex).startsWith('#')
            )
                return new ChocoColor(color);
            if ((color as ColorType) in colorMap)
                return colorMap[color as ColorType];
            if (typeof color === 'string' && color.startsWith('common.')) {
                const path = color.split('.').slice(1);
                let result: any = palette.common;
                for (const key of path) {
                    result = result?.[key];
                    if (!result) return new ChocoColor();
                }
                return result instanceof ChocoColor
                    ? result
                    : typeof result === 'string' && result.startsWith('#')
                    ? new ChocoColor(color)
                    : result;
            }
            if (color instanceof ChocoColor) return color;
            const defaultColor = palette.main[color as ColorMainType];
            return defaultColor?.[5] ?? color;
        },
        [palette],
    );
}

export function useGetsetClr(): (
    color?: ColorType,
    option?: { text?: boolean },
) => GetsetClrType {
    const getColor = useGetColor();
    const { palette } = useTheme();

    return useCallback(
        (
            color: ColorType = 'secondary',
            option: { text?: boolean } = { text: false },
        ): GetsetClrType => {
            const getSetClor = (setColors: SetColorsType): GetsetClrType => {
                const isContrast = color.toLocaleLowerCase().includes('text');
                const shadesColor: SetShadesColorType = {
                    text: getColor(
                        setColors[isContrast ? 'main' : 'text'],
                    ).shades(),
                    main: getColor(
                        setColors[isContrast ? 'text' : 'main'],
                    ).shades(),
                };

                const { text, main } = shadesColor;
                const { text: isText } = option;

                if (isText) {
                    return {
                        shadesColor,
                        setColor: {
                            bgClr: null,
                            clr: main[5],
                            bor: main[5],
                            hover: main[4],
                            bgActive: null,
                            active: main[3],
                            action: main[5],
                            bgDisabled: null,
                            borHover: main[4],
                            borActive: main[3],
                            focus: main[4].alpha(0.6),
                            bgHover: main[4].alpha(0.2),
                            disabled: main[6].alpha(0.7),
                            borDisabled: main[6].alpha(0.7),
                            disabledHover: main[4].alpha(0.9),
                            bgDisabledHover: main[4].alpha(0.2),
                            borDisabledHover: main[4].alpha(0.9),
                        },
                    };
                }

                return {
                    shadesColor,
                    setColor: {
                        bor: null,
                        clr: text[5],
                        hover: text[4],
                        bgClr: main[5],
                        borHover: null,
                        active: text[3],
                        action: main[5],
                        borActive: null,
                        bgHover: main[4],
                        bgActive: main[3],
                        borDisabled: null,
                        borDisabledHover: null,
                        focus: main[4].alpha(0.6),
                        disabled: text[6].alpha(0.7),
                        bgDisabled: main[6].alpha(0.7),
                        disabledHover: text[4].alpha(0.9),
                        bgDisabledHover: main[4].alpha(0.6),
                    },
                };
            };

            const index = ColorMain.findIndex((clr) => color.startsWith(clr));
            const clr = ColorMain[index];
            const setColors: SetColorsType = color.startsWith(clr)
                ? { main: clr, text: `${clr}Text` }
                : { main: 'main', text: 'text' };

            return getSetClor(setColors);
        },
        [palette],
    );
}

export function useGetsetClrProps(): UseGetsetClrPropsType {
    const theme = useTheme();
    const getSetClr = useGetsetClr();

    return useCallback(
        ({
            text,
            setClr,
            outline,
            isFocus = true,
            isBorder = true,
            defaultColor = 'secondary',
            disabled: isDisabled = false,
        }: UseGetsetClrPropType): SetClrPropsType => {
            let styles: StyleTypes = {};
            const { border } = theme.root.size;
            const { setColor: setClrs, shadesColor } = getSetClr(
                setClr ?? defaultColor,
                { text: text || outline },
            );

            const {
                clr,
                bor,
                hover,
                focus,
                bgClr,
                active,
                bgHover,
                borHover,
                disabled,
                bgActive,
                borActive,
                bgDisabled,
                borDisabled,
                disabledHover,
                bgDisabledHover,
                borDisabledHover,
            } = setClrs;

            if (outline) {
                styles = {
                    clr,
                    bgClr: null,
                    borders: isBorder ? { width: -border, color: bor } : null,
                    '&:hover': {
                        clr: hover,
                        bgClr: bgHover,
                        borders: { width: -border, color: borHover },
                    },
                    '&:active': {
                        clr: active,
                        bgClr: bgActive,
                        borders: { width: -border, color: borActive },
                    },
                };
            } else {
                styles = {
                    clr,
                    bgClr,
                    borders: null,
                    '&:hover': {
                        bgClr: bgHover,
                    },
                    '&:active': {
                        clr: active,
                        bgClr: bgActive,
                    },
                };
            }
            const disableds: StyleTypes = {
                clr: disabled,
                bgClr: outline ? null : bgDisabled,
                borders:
                    outline && isBorder
                        ? { width: -border, color: borDisabled }
                        : null,
                '&:hover': {
                    clr: disabledHover,
                    bgClr: bgDisabledHover,
                    borders:
                        outline && isBorder
                            ? { width: -border, color: borDisabledHover }
                            : null,
                },
            };
            if (isDisabled) {
                styles = {
                    ...styles,
                    event: 'n',
                    ...disableds,
                };
            }
            const focusStyles: StyleTypes = {
                '&:focus': {
                    outlines: { width: -border, color: focus },
                },
            };
            if (isFocus) {
                styles = { ...styles, ...focusStyles };
            }

            const setClrProps: SetClrPropsType = {
                styles,
                setClrs,
                disableds,
                shadesColor,
                hover: styles['&:hover'] as StyleTypes,
                active: styles['&:active'] as StyleTypes,
                focus: focusStyles['&:focus'] as StyleTypes,
            };

            return setClrProps;
        },
        [getSetClr],
    );
}
