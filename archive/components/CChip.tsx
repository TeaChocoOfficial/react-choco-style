//-Path: "react-choco-style/lib/src/components/CChip.tsx"
import { Chip as MuiChip } from '@mui/material';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const Chip = createStyled(MuiChip, 'CChip')();

export type CChipProps = ChocoStyledProps<typeof MuiChip>;

export function CChip(prop: CChipProps) {
    return <Chip {...useChocoProps(prop)} />;
}
