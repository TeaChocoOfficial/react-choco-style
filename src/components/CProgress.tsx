//-Path: "react-choco-style/src/components/CProgress.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { CircularProgress as MuiProgress } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Progress = createStyled(MuiProgress, 'CProgress')();

export type CProgressProps = ChocoStyledProps<typeof MuiProgress>;

export function CProgress(prop: CProgressProps) {
    return <Progress {...prop} />;
}
