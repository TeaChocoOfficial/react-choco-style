//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/custom/font.ts"
import { ChocoTheme } from "../../theme/theme";
import { ThemeFontsType } from "../../types/theme";

export function getFont(
    size?: keyof ThemeFontsType["weight"],
): React.CSSProperties {
    const { fonts } = ChocoTheme;
    const css: React.CSSProperties = {
        fontFamily: fonts.family,
        fontWeight: fonts.weight[size ?? "regular"],
    };
    return css;
}
