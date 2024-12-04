//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/hook/GetColor.tsx"
import useTheme from "../theme/useTheme";
import { ColorDefaultType, ColorsType } from "../types/color";

export default function GetColor(): (color?: ColorsType) => string | undefined {
    const { palette } = useTheme();

    return (color?: ColorsType): string | undefined => {
        let Color: undefined | string;

        switch (color) {
            case undefined:
                Color = undefined;
                break;
            case null:
                Color = "transparent";
                break;

            //*common
            case "paper":
                Color = palette.background.paper;
                break;
            case "inherit":
                Color = palette.background.default;
                break;

            //*text
            case "disabled":
                Color = palette.text.disabled;
                break;
            case "disabledText":
                Color = palette.primary.textDisabled;
                break;
            case "text":
                Color = palette.text.primary;
                break;

            //*primary
            case "primary":
                Color = palette.primary.main;
                break;
            case "primaryText":
                Color = palette.primary.text;
                break;

            //*secondary
            case "secondary":
                Color = palette.secondary.main;
                break;
            case "secondaryText":
                Color = palette.secondary.text;
                break;

            //*error
            case "error":
                Color = palette.error.main;
                break;
            case "errorText":
                Color = palette.error.text;
                break;

            //*warning
            case "warning":
                Color = palette.warning.main;
                break;
            case "warningText":
                Color = palette.warning.text;
                break;

            //*info
            case "info":
                Color = palette.info.main;
                break;
            case "infoText":
                Color = palette.info.text;
                break;

            //*success
            case "success":
                Color = palette.success.main;
                break;
            case "successText":
                Color = palette.success.text;
                break;

            default:
                const colors = palette[color as ColorDefaultType];
                Color = colors ? colors.main : color;
                break;
        }

        return Color;
    };
}
