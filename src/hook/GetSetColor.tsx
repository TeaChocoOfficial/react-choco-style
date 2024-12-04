//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/hook/GetSetColor.tsx"
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

    return (color?: ColorType): SetColorType | undefined => {
        let Color: SetColorType = {};

        switch (color ?? "secondary") {
            //*common
            case "paper":
                Color = {
                    color: palette.text.primary,
                    action: palette.text.disabled,
                    bgColor: palette.background.paper,
                    bgHover: palette.background.default,
                };
                break;
            case "inherit":
                Color = {
                    bgColor: null,
                    action: palette.text.primary,
                    bgHover: palette.text.disabled,
                    color: palette.background.default,
                };
                break;

            //*text
            case "disabled":
                Color = {
                    color: palette.text.disabled,
                    action: palette.shadow.light,
                    bgColor: palette.shadow.main,
                    bgHover: palette.shadow.dark,
                };
                break;
            case "disabledText":
                Color = {
                    bgColor: null,
                    color: palette.shadow.main,
                    action: palette.shadow.light,
                    bgHover: palette.shadow.dark,
                };
                break;
            case "text":
                Color = {
                    color: palette.text.primary,
                    bgColor: null,
                    bgHover: palette.text.disabled,
                    action: palette.primary.textDisabled,
                };
                break;

            //*primary
            case "primary":
                Color = {
                    color: palette.primary.text,
                    bgColor: palette.primary.main,
                    bgHover: palette.primary.dark,
                    action: palette.primary.textDisabled,
                };
                break;
            case "primaryText":
                Color = {
                    bgColor: null,
                    color: palette.primary.main,
                    action: palette.primary.dark,
                    bgHover: `${
                        palette.primary.dark ?? palette.primary.main
                    }66`,
                };
                break;

            //*secondary
            case "secondary":
                Color = {
                    color: palette.secondary.text,
                    bgColor: palette.secondary.main,
                    bgHover: palette.secondary.dark,
                    action: palette.secondary.textDisabled,
                };
                break;
            case "secondaryText":
                Color = {
                    bgColor: null,
                    color: palette.secondary.main,
                    action: palette.secondary.dark,
                    bgHover: `${
                        palette.secondary.dark ?? palette.secondary.main
                    }66`,
                };
                break;

            //*error
            case "error":
                Color = {
                    color: palette.error.text,
                    bgColor: palette.error.main,
                    bgHover: palette.error.dark,
                    action: palette.error.textDisabled,
                };
                break;
            case "errorText":
                Color = {
                    bgColor: null,
                    color: palette.error.main,
                    action: palette.error.dark,
                    bgHover: `${palette.error.dark ?? palette.error.main}66`,
                };
                break;

            //*warning
            case "warning":
                Color = {
                    color: palette.warning.text,
                    bgColor: palette.warning.main,
                    bgHover: palette.warning.dark,
                    action: palette.warning.textDisabled,
                };
                break;
            case "warningText":
                Color = {
                    bgColor: null,
                    color: palette.warning.main,
                    action: palette.warning.dark,
                    bgHover: `${
                        palette.warning.dark ?? palette.warning.main
                    }66`,
                };
                break;

            //*info
            case "info":
                Color = {
                    color: palette.info.text,
                    bgColor: palette.info.main,
                    bgHover: palette.info.dark,
                    action: palette.info.textDisabled,
                };
                break;
            case "infoText":
                Color = {
                    bgColor: null,
                    color: palette.info.main,
                    action: palette.info.dark,
                    bgHover: `${palette.info.dark ?? palette.info.main}66`,
                };
                break;

            //*success
            case "success":
                Color = {
                    color: palette.success.text,
                    bgColor: palette.success.main,
                    bgHover: palette.success.dark,
                    action: palette.success.textDisabled,
                };
                break;
            case "successText":
                Color = {
                    bgColor: null,
                    color: palette.success.main,
                    action: palette.success.dark,
                    bgHover: `${
                        palette.success.dark ?? palette.success.main
                    }66`,
                };
                break;

            default:
                const colors = palette[color as ColorDefaultType];
                Color = { color: colors ? colors.main : color };
                break;
        }

        return Color;
    };
}
