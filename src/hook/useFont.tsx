//-Path: "react-choco-style/src/hook/font.ts"
import { useCallback } from "react";
import useTheme from "../theme/useTheme";
import { ThemeFontsType } from "../types/theme";
import { StyleTypes } from "../types/ChocoStyle";

export default function useFont() {
    const { fonts } = useTheme();

    return {
        getFont: useCallback(
            (size?: keyof ThemeFontsType["weight"]): StyleTypes => {
                const css: StyleTypes = {
                    fontFamily: fonts.family,
                    fontWeight: fonts.weight[size ?? "regular"],
                };
                return css;
            },
            [fonts],
        ),
    };
}
