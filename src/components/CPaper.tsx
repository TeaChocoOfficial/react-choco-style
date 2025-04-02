//-Path: "react-choco-style/src/components/CPaper.tsx"
import { Paper as MuiPaper } from '@mui/material';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const Paper = createStyled(MuiPaper, 'CPaper')();

export type CPaperProps = ChocoStyledProps<typeof Paper>;

export function CPaper(prop: CPaperProps) {
    const props = useChocoProps(
        prop,
        ({ theme, formatSize, callbackSize }) => ({
            cs: {
                p: formatSize(theme.root.size.padding),
                boxShadow: callbackSize(
                    1,
                    (value: number) =>
                        `0px ${value * 2}px ${value}px -${value}px ${
                            theme.palette.shadow.main
                        }`,
                ),
            },
        }),
    );
    return <Paper {...props} />;
}
