//-Path: "react-choco-style/src/hook/useGetColor.tsx"
import { useCallback } from "react";
import useTheme from "../theme/useTheme";
import { ColorDefaultType, ColorsType } from "../types/color";

export default function useGetColor(): (
    color?: ColorsType,
) => string | undefined {
    const { palette } = useTheme();

    return useCallback(
        (color?: ColorsType): string | undefined => {
            switch (color) {
                case undefined:
                    return;

                case null:
                    return "transparent";

                //*common
                case "paper":
                    return palette.background.paper;

                case "inherit":
                    return palette.background.default;

                //*text
                case "disabled":
                    return palette.text.disabled;

                case "disabledText":
                    return palette.primary.textDisabled;

                case "text":
                    return palette.text.primary;

                //*primary
                case "primary":
                    return palette.primary.main;

                case "primaryText":
                    return palette.primary.text;

                //*secondary
                case "secondary":
                    return palette.secondary.main;

                case "secondaryText":
                    return palette.secondary.text;

                //*error
                case "error":
                    return palette.error.main;

                case "errorText":
                    return palette.error.text;

                //*warning
                case "warning":
                    return palette.warning.main;

                case "warningText":
                    return palette.warning.text;

                //*info
                case "info":
                    return palette.info.main;

                case "infoText":
                    return palette.info.text;

                //*success
                case "success":
                    return palette.success.main;

                case "successText":
                    return palette.success.text;

                default:
                    if (color?.startsWith?.("palette.")) {
                        const paletteColors = color.split(".");
                        let paletteColor: string | string[] | object = palette;
                        for (let i = 1; i < paletteColors.length; i++) {
                            paletteColor = paletteColor[
                                paletteColors[i] as keyof typeof paletteColor
                            ] as string;
                        }
                        if (typeof paletteColor === "string") {
                            return paletteColor;
                        }
                        return undefined;
                    } else {
                        const colors = palette[color as ColorDefaultType];
                        return colors ? colors.main : color;
                    }
            }
        },
        [palette],
    );
}
