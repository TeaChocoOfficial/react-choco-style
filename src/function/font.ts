//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/custom/font.ts"
import { ChocoTheme } from "../theme/theme";
import { StyleTypes } from "../types/ChocoStyle";
import { ThemeFontsType } from "../types/theme";

export function getFont(size?: keyof ThemeFontsType["weight"]): StyleTypes {
    const { fonts } = ChocoTheme;
    const css: StyleTypes = {
        fontFamily: fonts.family,
        fontWeight: fonts.weight[size ?? "regular"],
    };
    return css;
}
