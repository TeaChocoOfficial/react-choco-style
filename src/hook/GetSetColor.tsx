//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/hook/GetSetColor.tsx"
import { useMemo } from "react";
import useTheme from "../theme/useTheme";
import { ColorType, ColorsType, ColorDefaultType } from "../types/color";

export type SetColorType = {
    color?: ColorsType;
    action?: ColorsType;
    bgColor?: ColorsType;
    bgHover?: ColorsType;
};

export default function GetSetColor(): (
    color?: ColorType,
) => SetColorType | undefined {
    const { palette } = useTheme();

    return useMemo(
        () =>
            (color?: ColorType): SetColorType | undefined => {
                switch (color ?? "secondary") {
                    //*common
                    case "paper":
                        return {
                            color: palette.text.primary,
                            action: palette.text.disabled,
                            bgColor: palette.background.paper,
                            bgHover: palette.background.default,
                        };
                    case "inherit":
                        return {
                            bgColor: null,
                            action: palette.text.primary,
                            bgHover: palette.text.disabled,
                            color: palette.background.default,
                        };
                    //*text
                    case "disabled":
                        return {
                            color: palette.text.disabled,
                            action: palette.shadow.light,
                            bgColor: palette.shadow.main,
                            bgHover: `${
                                palette.primary.textDisabled ??
                                palette.primary.disabled ??
                                palette.text.disabled
                            }66`,
                        };
                    case "disabledText":
                        return {
                            bgColor: null,
                            color: palette.text.disabled,
                            action: palette.text.primary,
                            bgHover: `${
                                palette.primary.textDisabled ??
                                palette.primary.disabled ??
                                palette.text.disabled
                            }66`,
                        };
                    case "text":
                        return {
                            color: palette.text.primary,
                            bgColor: null,
                            bgHover: palette.text.disabled,
                            action: palette.primary.textDisabled,
                        };
                    //*primary
                    case "primary":
                        return {
                            color: palette.primary.text,
                            bgColor: palette.primary.main,
                            bgHover: palette.primary.dark,
                            action: palette.primary.textDisabled,
                        };
                    case "primaryText":
                        return {
                            bgColor: null,
                            color: palette.primary.main,
                            action: palette.primary.dark,
                            bgHover: `${
                                palette.primary.dark ?? palette.primary.main
                            }66`,
                        };
                    //*secondary
                    case "secondary":
                        return {
                            color: palette.secondary.text,
                            bgColor: palette.secondary.main,
                            bgHover: palette.secondary.dark,
                            action: palette.secondary.textDisabled,
                        };
                    case "secondaryText":
                        return {
                            bgColor: null,
                            color: palette.secondary.main,
                            action: palette.secondary.dark,
                            bgHover: `${
                                palette.secondary.dark ?? palette.secondary.main
                            }66`,
                        };
                    //*error
                    case "error":
                        return {
                            color: palette.error.text,
                            bgColor: palette.error.main,
                            bgHover: palette.error.dark,
                            action: palette.error.textDisabled,
                        };
                    case "errorText":
                        return {
                            bgColor: null,
                            color: palette.error.main,
                            action: palette.error.dark,
                            bgHover: `${
                                palette.error.dark ?? palette.error.main
                            }66`,
                        };

                    //*warning
                    case "warning":
                        return {
                            color: palette.warning.text,
                            bgColor: palette.warning.main,
                            bgHover: palette.warning.dark,
                            action: palette.warning.textDisabled,
                        };
                    case "warningText":
                        return {
                            bgColor: null,
                            color: palette.warning.main,
                            action: palette.warning.dark,
                            bgHover: `${
                                palette.warning.dark ?? palette.warning.main
                            }66`,
                        };

                    //*info
                    case "info":
                        return {
                            color: palette.info.text,
                            bgColor: palette.info.main,
                            bgHover: palette.info.dark,
                            action: palette.info.textDisabled,
                        };
                    case "infoText":
                        return {
                            bgColor: null,
                            color: palette.info.main,
                            action: palette.info.dark,
                            bgHover: `${
                                palette.info.dark ?? palette.info.main
                            }66`,
                        };

                    //*success
                    case "success":
                        return {
                            color: palette.success.text,
                            bgColor: palette.success.main,
                            bgHover: palette.success.dark,
                            action: palette.success.textDisabled,
                        };
                    case "successText":
                        return {
                            bgColor: null,
                            color: palette.success.main,
                            action: palette.success.dark,
                            bgHover: `${
                                palette.success.dark ?? palette.success.main
                            }66`,
                        };

                    default:
                        const colors = palette[color as ColorDefaultType];
                        return { color: colors ? colors.main : color };
                }
            },
        [palette],
    );
}
