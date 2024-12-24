//-Path: "react-choco-style/src/hook/useGetSetColorProps.tsx"
import { useCallback } from "react";
import { StyleTypes } from "../types/ChocoStyle";
import useGetSetColor, { SetColorType } from "./useGetSetColor";
import { ColorHexType, ColorsType, ColorType } from "../types/color";

export default function useGetSetColorProps(
    defaultColor: ColorType = "secondary",
) {
    const getSetColor = useGetSetColor();

    return useCallback(
        ({
            setColor,
            outline,
            disabled,
        }: {
            setColor?: ColorType;
            outline?: boolean;
            disabled?: boolean;
        }): {
            styles: StyleTypes;
            setColors?: SetColorType;
        } => {
            let styles: StyleTypes = {};
            const setColors = getSetColor(setColor ?? defaultColor);

            const disabledColor = 88;
            const getColor = (
                clr?: ColorsType,
                disabled: number = disabledColor,
            ): ColorsType | undefined =>
                typeof clr !== "string"
                    ? clr
                    : (clr?.length ?? 0) > 7
                    ? clr
                    : clr.startsWith("#")
                    ? `${clr as ColorHexType}${disabled}`
                    : clr;

            const defStyle: StyleTypes = {
                "&$:focus": {
                    outlines: {
                        size: 4,
                        color: getColor(setColors?.borColor),
                    },
                    bgClr: disabled
                        ? undefined
                        : outline
                        ? getColor(setColors?.bgHover, disabledColor / 2)
                        : setColors?.bgHover,
                },
            };
            if (outline) {
                styles = {
                    bgClr: null,
                    borders: {
                        size: 2,
                        style: "solid",
                        color: setColors?.bgColor ?? defaultColor,
                    },
                    clr: (disabled
                        ? getColor(setColors?.bgColor)
                        : setColors?.bgColor ?? defaultColor) as ColorType,
                    "&$:hover": {
                        bgClr: disabled
                            ? undefined
                            : getColor(setColors?.bgHover, disabledColor / 2),
                    },
                    ...defStyle,
                };
            } else {
                styles = {
                    border: "none",
                    clr: (disabled
                        ? getColor(setColors?.color)
                        : setColors?.color ?? defaultColor) as ColorType,
                    bgClr: disabled
                        ? getColor(setColors?.bgColor)
                        : setColors?.bgColor,
                    "&$:hover": {
                        bgClr: disabled ? undefined : setColors?.bgHover,
                    },
                    ...defStyle,
                };
            }
            return { styles, setColors };
        },
        [defaultColor, getSetColor],
    );
}
