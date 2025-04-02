import { Obj } from '../custom/obj';
import { SxProp } from '../types/style';
import { useTheme } from '../hook/ChocoStyle';
import { useChocoStyle } from '../hook/ChocoResponse';
import { CssKeyType, CssType, StyledType } from '../types/choco';
import { GlobalStyles, Interpolation, Theme } from '@mui/material';

type GlobalStylesType = { [key in CssKeyType]?: StyledType | SxProp };

export function CGlobalStyles({ css }: { css: CssType }) {
    const theme = useTheme();
    const chocoStyle = useChocoStyle();

    const keyCss = Obj.keys(css);
    const styles = keyCss.reduce<GlobalStylesType>((acc, key) => {
        const cs = css[key];
        const style =
            typeof cs === 'function'
                ? chocoStyle(cs({ theme }))
                : chocoStyle(cs ?? {});
        acc[key] = style;
        return acc;
    }, {} as GlobalStylesType);

    return <GlobalStyles styles={styles as Interpolation<Theme>} />;
}
