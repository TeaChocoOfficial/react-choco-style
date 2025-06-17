//-Path: "react-choco-style/src/components/CGlobalStyles.tsx"
import { Obj } from '../custom/obj';
import { SxProp } from '../types/style';
import { CssKeyType, CssType, StyledType } from '../types/choco';
import { GlobalStyles, Interpolation, Theme } from '@mui/material';
import { useChocoStyle, useResponseCs } from '../hook/ChocoResponse';

type GlobalStylesType = { [key in CssKeyType]?: StyledType | SxProp };

export function CGlobalStyles({ css }: { css: CssType }) {
    const responseCs = useResponseCs();
    const chocoStyle = useChocoStyle();

    const keyCss = Obj.keys(css);
    const styles = keyCss.reduce<GlobalStylesType>((acc, key) => {
        const cs = css[key];
        const style = chocoStyle(responseCs(cs));
        acc[key] = style;
        return acc;
    }, {} as GlobalStylesType);

    return <GlobalStyles styles={styles as Interpolation<Theme>} />;
}
