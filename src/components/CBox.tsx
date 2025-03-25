//-Path: "react-choco-style/src/components/CBox.tsx"
import { Box as MuiBox } from '@mui/material';
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Box = ChocoStyle.styled(MuiBox, 'CBox')();

export type CBoxProps = ChocoStyledProps<typeof Box>;

export function CBox<Props extends CBoxProps>(prop: Props) {
    return <Box {...prop} />;
}
