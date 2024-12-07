//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/hook/GetSetColor.tsx"
import { useMemo } from "react";
import useTheme from "../theme/useTheme";
import { ColorType, ColorsType, ColorDefaultType } from "../types/color";

export type SetColorType = {
    color: ColorsType;
    action: ColorsType;
    bgColor: ColorsType;
    bgHover: ColorsType;
    borColor: ColorsType;
};

export default function GetSetColor(): (
    color?: ColorType,
) => SetColorType | undefined {
    const { palette } = useTheme();

    return useMemo(
        () =>
            (color?: ColorsType): SetColorType | undefined => {
                switch (color ?? "secondary") {
                    //*common
                    case "paper":
                        return {
                            color: palette.text.primary,
                            action: palette.text.disabled,
                            borColor: palette.text.primary,
                            bgColor: palette.background.paper,
                            bgHover: palette.background.default,
                        };
                    case "inherit":
                        return {
                            bgColor: null,
                            action: palette.text.primary,
                            bgHover: palette.text.disabled,
                            color: palette.background.default,
                            borColor: palette.background.default,
                        };
                    //*text
                    case "disabled":
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
                    case "disabledText":
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
                    case "text":
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
                    case "primary":
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
                    case "primaryText":
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
                    case "secondary":
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
                    case "secondaryText":
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
                    case "error":
                        return {
                            color: palette.error.text,
                            bgColor: palette.error.main,
                            borColor: palette.error.text,
                            bgHover: palette.error.dark ?? palette.error.main,
                            action:
                                palette.error.textDisabled ??
                                palette.text.disabled,
                        };
                    case "errorText":
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
                    case "warning":
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
                    case "warningText":
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
                    case "info":
                        return {
                            color: palette.info.text,
                            bgColor: palette.info.main,
                            borColor: palette.info.text,
                            bgHover: palette.info.dark ?? palette.info.main,
                            action:
                                palette.info.textDisabled ??
                                palette.text.disabled,
                        };
                    case "infoText":
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
                    case "success":
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
                    case "successText":
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
