//-Path: "react-choco-style/lib/src/components/CBox.tsx"
import { Box as MuiBox } from '@mui/material';
import { ChocoStyle } from '../class/style/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Box = ChocoStyle.styled(MuiBox, 'CBox')();

export type CBoxProps = ChocoStyledProps<typeof MuiBox>;

export function CBox(prop: CBoxProps) {
    return <Box {...ChocoStyle.props(prop)} />;
}
