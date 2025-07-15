//-Path: "react-choco-style/lib/src/class/ChocoColor.tsx"
import { CColor } from './CColor';
import Debug from '../config/debug';
import { useTheme } from '../hooks/useTheme';
import { ColorHex, ColorMainType, ColorsType, ColorType } from '../types/color';

export class ChocoColor {
    static get get() {
        const theme = useTheme();

        return (color?: ColorsType): CColor => {
            try {
                const palette = theme.palette;
                if (color === undefined) return new CColor();
                const colorMap: Record<ColorType, CColor> = {
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
                if (color === null) return new CColor(null);
                if (
                    typeof color === 'string' &&
                    (color as ColorHex).startsWith('#')
                )
                    return new CColor(color);
                if ((color as ColorType) in colorMap)
                    return colorMap[color as ColorType];
                if (typeof color === 'string' && color.startsWith('common.')) {
                    const path = color.split('.').slice(1);
                    let result: any = palette.common;
                    for (const key of path) {
                        result = result?.[key];
                        if (!result) return new CColor();
                    }
                    return result instanceof CColor
                        ? result
                        : typeof result === 'string' && result.startsWith('#')
                        ? new CColor(color)
                        : result;
                }
                if (color instanceof CColor) return color;
                const defaultColor = palette.main[color as ColorMainType];
                return defaultColor?.[5] ?? color;
            } catch (e) {
                Debug.err(e);
                return new CColor();
            }
        };
    }
}
