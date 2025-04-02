//-Path: "react-choco-style/src/components/CBox.tsx"
import { Box as MuiBox } from '@mui/material';
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Box = createStyled(MuiBox, 'CBox')();

export type CBoxProps = ChocoStyledProps<typeof MuiBox>;

export function CBox(prop: CBoxProps) {
    return <Box {...prop} />;
}
