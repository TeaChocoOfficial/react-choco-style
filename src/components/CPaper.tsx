//-Path: "react-choco-style/src/components/CPaper.tsx"
import { ShadeKey } from '../types/chocoColor';
import { createStyled } from '../hook/ChocoStyle';
import { Paper as MuiPaper } from '@mui/material';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const Paper = createStyled(MuiPaper, 'CPaper')();

export type CPaperProps = ChocoStyledProps<
    typeof Paper,
    { shade?: number },
    ['elevation']
>;

export function CPaper({ shade = 5, ...prop }: CPaperProps) {
    if (shade < 0 || shade > 9) {
        throw new Error('Shade must be between 0 and 9');
    }

    return (
        <Paper
            {...useChocoProps(prop, ({ callbackSize, size }) => ({
                cs: ({ theme }) => ({
                    bgImg: null,
                    p: size(theme.root.size.padding),
                    bgClr: theme.palette.main.primary[shade as ShadeKey].alpha(
                        0.8,
                    ),
                    boxShadow: callbackSize(
                        1,
                        (value: number) =>
                            `0px ${value}px ${value}px -${
                                value * 2
                            }px ${theme.palette.main.primary[5].alpha(0.3)}`,
                    ),
                }),
            }))}
        />
    );
}
