//-Path: "react-choco-style/src/components/CProgress.tsx"
import {
    LinearProgress as MuiLinearProgress,
    CircularProgress as MuiCircularProgress,
} from '@mui/material';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const LinearProgress = createStyled(MuiLinearProgress, 'CProgress')();
const CircularProgress = createStyled(MuiCircularProgress, 'CProgress')();

export type CProgressProps = ChocoStyledProps<
    typeof LinearProgress & typeof CircularProgress,
    { line?: boolean | 'determinate' | 'buffer' }
>;

export function CProgress({ line, ...prop }: CProgressProps) {
    return line ? (
        <LinearProgress
            {...useChocoProps(prop, () => {
                return {};
            })}
        />
    ) : (
        <CircularProgress
            {...useChocoProps(prop, () => {
                return {};
            })}
        />
    );
}
