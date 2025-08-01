//-Path: "react-choco-style/lib/src/components/CChip.tsx"
import { ChocoStyle } from '../class/ChocoStyle';
import { Chip as MuiChip } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Chip = ChocoStyle.styled(MuiChip, 'CChip')();

export type CChipProps = ChocoStyledProps<typeof MuiChip>;

export function CChip(prop: CChipProps) {
    return <Chip {...ChocoStyle.props(prop)} />;
}
