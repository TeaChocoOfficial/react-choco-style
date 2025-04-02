//-Path: "react-choco-style/src/components/CChip.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Chip as MuiChip } from '@mui/material';

const Chip = createStyled(MuiChip, 'CChip')();

export type CChipProps = ChocoStyledProps<typeof MuiChip>;

export function CChip(prop: CChipProps) {
    return <Chip {...prop} />;
}
