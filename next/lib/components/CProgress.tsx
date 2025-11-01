//-Path: "react-choco-style/src/components/CProgress.tsx"
import {
    LinearProgress as MuiLinearProgress,
    CircularProgress as MuiCircularProgress,
} from '@mui/material';
import { ChocoStyle } from '../class/style/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const LinearProgress = ChocoStyle.styled(MuiLinearProgress, 'CProgress')();
const CircularProgress = ChocoStyle.styled(MuiCircularProgress, 'CProgress')();

export type CProgressProps = ChocoStyledProps<
    typeof LinearProgress & typeof CircularProgress,
    { line?: boolean | 'determinate' | 'buffer' }
>;

export function CProgress({ line, ...prop }: CProgressProps) {
    return line ? (
        <LinearProgress
            {...ChocoStyle.props(prop, () => {
                return {};
            })}
        />
    ) : (
        <CircularProgress
            {...ChocoStyle.props(prop, () => {
                return {};
            })}
        />
    );
}
