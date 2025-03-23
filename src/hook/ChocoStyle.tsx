//-Path: "react-choco-style/src/hook/ChocoStyle.tsx"
import { styled } from '@mui/material';
import { SxType } from '../types/style';
import { SizeValue } from '../types/size';
import { ChocoProps } from './ChocoProps';
import { ChocoFormat } from './ChocoFormat';
import { ChocoResponse } from './ChocoResponse';
import { CustomStylesType } from '../types/chocoHook';
import { themeAtom, themeModeAtom } from '../theme/theme';
import { ColorDefaultType, ColorsType } from '../types/color';
import { keysChocoStyleProps } from '../data/reservedKeywords';
import { PaletteType, UseChocoThemeType } from '../types/theme';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleTypes, StyledType, ChocoStylePropsType } from '../types/choco';

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

    static styled<TagType extends keyof React.JSX.IntrinsicElements>(
        tag: TagType,
        nameTag?: string,
    ) {
        return (customStyles?: StyleTypes | CustomStylesType) => {
            const getStyles = (): Record<string, SizeValue> => {
                const theme = this.useTheme();
                const chocoStyle = ChocoResponse.useChocoStyle<StyledType>();
                const { formatSize, callbackSize } =
                    ChocoFormat.useFormatSize();
                return typeof customStyles === 'function'
                    ? chocoStyle(
                          customStyles({ theme, formatSize, callbackSize }),
                      )
                    : chocoStyle(customStyles ?? {});
            };
            const create = styled(tag, { name: nameTag });
            const Component = create(() => getStyles());
            return forwardRef<
                HTMLElement,
                ChocoStylePropsType & React.ComponentPropsWithoutRef<TagType>
            >((prop, ref) => {
                const { cs } = prop;
                const chocoStyle = ChocoResponse.useChocoStyle<SxType>();
                const propChocoStyle = ChocoResponse.usePropChocoStyle();
                const { sx, props } = useMemo(() => {
                    const chocoStyleProps = propChocoStyle(prop);
                    return {
                        sx: chocoStyle({ ...cs, ...chocoStyleProps }),
                        props: ChocoProps.removeReservedProps(
                            [...keysChocoStyleProps, 'sx'],
                            prop,
                        ),
                    };
                }, [prop, chocoStyle, propChocoStyle]);
                const componentProps = props as React.ComponentProps<
                    typeof Component
                >;
                return <Component {...componentProps} sx={sx} ref={ref} />;
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
}
