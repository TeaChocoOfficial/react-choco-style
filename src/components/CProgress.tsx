//-Path: "react-choco-style/src/components/CProgress.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { CircularProgress as MuiProgress } from '@mui/material';

const Progress = createStyled(MuiProgress, 'CProgress')();

export type CProgressProps = ChocoStyledProps<typeof MuiProgress>;

export function CProgress(prop: CProgressProps) {
    return (
        <Progress
            {...useChocoProps(prop, () => {
                return {};
            })}
        />
    );
}
