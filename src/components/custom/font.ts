//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/custom/font.ts"
import { ChocoTheme } from "../../theme/theme";

export function getFont(): React.CSSProperties {
    const { fonts } = ChocoTheme;
    const css: React.CSSProperties = {
        fontFamily: fonts.family,
        fontWeight: fonts.weight,
    };
    return css;
}
