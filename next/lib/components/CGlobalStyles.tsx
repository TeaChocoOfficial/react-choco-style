//-Path: "lib/src/components/CGlobalStyles.tsx"
import { Obj } from '@teachoco-dev/cli';
import { CssType, CssKeysType } from '../types/choco';
import { ChocoResponse } from '../class/hook/ChocoResponse';
import { GlobalStyles, Interpolation, Theme } from '@mui/material';

export type CGlobalStylesProps = {
    css?: CssType;
};

export function CGlobalStyles({ css }: CGlobalStylesProps) {
    const chocoResponse = new ChocoResponse();

    const styles = Obj.reduce<CssType, Interpolation<Theme>>(
        css ?? {},
        (acc, key, value) => {
            (acc as CssType)[key as CssKeysType] =
                chocoResponse.chocoStyle(value).css;
            return acc;
        },
        {},
    );

    return <GlobalStyles styles={styles as Interpolation<Theme>} />;
}
