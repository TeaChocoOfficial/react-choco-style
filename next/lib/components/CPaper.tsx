//-Path: "lib/src/components/CPaper.tsx"
import { ShadeKey } from '../types/color';
import { Paper as MuiPaper } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';
import { ChocoStyle } from '../class/style/ChocoStyle';

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
            {...ChocoStyle.props(prop, ({ CsValue, sz }) => ({
                cs: ({ theme }) => ({
                    bgImg: null,
                    p: sz({ sz: 'padding' }),
                    bgClr: theme.palette.main.primary[shade as ShadeKey].alpha(
                        0.8,
                    ),
                    boxShadow: new CsValue(CsValue.size(1), {
                        calcs: [
                            (after) =>
                                `0px ${after.num}px ${after.num}px -${
                                    after.num * 2
                                }px ${theme.palette.main.primary.alpha(0.3)}`,
                        ],
                    }),
                }),
            }))}
        />
    );
}
