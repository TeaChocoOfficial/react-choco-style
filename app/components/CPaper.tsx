//-Path: "react-choco-style/lib/src/components/CPaper.tsx"
import { ShadeKey } from '../types/color';
import { ChocoStyle } from '../class/ChocoStyle';
import { Paper as MuiPaper } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Paper = ChocoStyle.styled(MuiPaper, 'CPaper')();

export type CPaperProps = ChocoStyledProps<
    typeof Paper,
    { shade?: ShadeKey },
    ['elevation']
>;

export function CPaper({ shade = 5, ...prop }: CPaperProps) {
    if (shade < 0 || shade > 9) {
        throw new Error('Shade must be between 0 and 9');
    }

    return (
        <Paper
            {...ChocoStyle.props(prop, ({ Size, sz }) => ({
                cs: ({ theme }) => ({
                    bgImg: null,
                    p: sz({ sz: 'padding' }),
                    bgClr: theme.palette.main.primary[shade as ShadeKey].alpha(
                        0.8,
                    ),
                    boxShadow: Size.callback(
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
