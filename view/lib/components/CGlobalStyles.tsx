//-Path: "react-choco-style/lib/src/components/CGlobalStyles.tsx"
import { Obj } from '@teachoco-dev/cli';
import { CssType, CsType } from '../types/choco';
import { ChocoResponse } from '../class/ChocoResponse';
import { GlobalStyles, Interpolation, Theme } from '@mui/material';

export function CGlobalStyles({ css }: { css: CssType }) {
    const chocoResponse = new ChocoResponse();

    const styles = Obj.reduce<CssType, Interpolation<Theme>>(
        css,
        (acc, key, value) => {
            (acc as CssType)[key] = chocoResponse.chocoStyle(value) as CsType;
            return acc;
        },
        {},
    );

    return <GlobalStyles styles={styles as Interpolation<Theme>} />;
}
