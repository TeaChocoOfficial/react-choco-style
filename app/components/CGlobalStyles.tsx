//-Path: "react-choco-style/lib/src/components/CGlobalStyles.tsx"
import { Obj } from '@teachoco-dev/cli';
import { ChocoResponse } from '../class/ChocoResponse';
import { ChocoStyleTypes, CssType } from '../types/choco';
import { GlobalStyles, Interpolation, Theme } from '@mui/material';

export type CGlobalStylesProps = {
    css?: CssType;
};

export function CGlobalStyles({ css }: CGlobalStylesProps) {
    const chocoResponse = new ChocoResponse();

    const styles = Obj.reduce<CssType, Interpolation<Theme>>(
        css ?? {},
        (acc, key, value) => {
            (acc as CssType)[key] =
                chocoResponse.chocoStyle<ChocoStyleTypes>(value);
            return acc;
        },
        {},
    );

    return <GlobalStyles styles={styles as Interpolation<Theme>} />;
}
