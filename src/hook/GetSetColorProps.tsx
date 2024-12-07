//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/hook/GetSetColorProps.tsx"
import GetSetColor, { SetColorType } from "./GetSetColor";
import ChocoStyleSheets from "../components/custom/StyleSheets";
import { ColorHexType, ColorsType, ColorType } from "../types/color";
import { ChocoStylesType } from "../types/ChocoStyle";

export type GetSetColorPropsType = {
    className: string;
    setColors?: SetColorType;
};

export default function GetSetColorProps(
    defaultColor: ColorType = "secondary",
) {
    const getSetColor = GetSetColor();
    const chocoStyleSheets = ChocoStyleSheets();

    const GetSetColorProps = ({
        setColor,
        outline,
        disabled,
    }: {
        setColor?: ColorType;
        outline?: boolean;
        disabled?: boolean;
    }): GetSetColorPropsType => {
        let className: string;
        const setColors = getSetColor(setColor ?? defaultColor);

        const disabledColor = 88;
        const getColor = (
            color?: ColorsType,
            disabled: number = disabledColor,
        ): ColorsType | undefined =>
            typeof color !== "string"
                ? color
                : (color?.length ?? 0) > 7
                ? color
                : color.startsWith("#")
                ? `${color as ColorHexType}${disabled}`
                : color;

        const defStyle: ChocoStylesType = {
            ":focus": {
                outlines: {
                    size: 4,
                    color: getColor(setColors?.borColor),
                },
                bgColor: disabled
                    ? undefined
                    : outline
                    ? getColor(setColors?.bgHover, disabledColor / 2)
                    : setColors?.bgHover,
            },
        };
        if (outline) {
            className = chocoStyleSheets({
                bgColor: null,
                borders: {
                    size: 2,
                    style: "solid",
                    color: setColors?.bgColor ?? defaultColor,
                },
                color: (disabled
                    ? getColor(setColors?.bgColor)
                    : setColors?.bgColor ?? defaultColor) as ColorType,
                ":hover": {
                    bgColor: disabled
                        ? undefined
                        : getColor(setColors?.bgHover, disabledColor / 2),
                },
                ...defStyle,
            });
        } else {
            className = chocoStyleSheets({
                border: "none",
                color: (disabled
                    ? getColor(setColors?.color)
                    : setColors?.color ?? defaultColor) as ColorType,
                bgColor: disabled
                    ? getColor(setColors?.bgColor)
                    : setColors?.bgColor,
                ":hover": {
                    bgColor: disabled ? undefined : setColors?.bgHover,
                },
                ...defStyle,
            });
        }
        return { className, setColors };
    };

    return GetSetColorProps;
}
