//-Path: "react-choco-style/lib/src/components/CBox.tsx"
import { Box as MuiBox } from '@mui/material';
import { ChocoStyle } from '../class/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Box = ChocoStyle.styled(MuiBox, 'CBox')();

export type CBoxProps = ChocoStyledProps<typeof MuiBox>;

export function CBox(prop: CBoxProps) {
    return <Box {...prop} />;
}
