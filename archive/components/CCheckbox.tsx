//-Path: "react-choco-style/lib/src/components/CCheckbox.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { Checkbox as MuiCheckbox } from '@mui/material';

const Checkbox = createStyled(MuiCheckbox, 'CCheckbox')();

export type CCheckboxProps = ChocoStyledProps<typeof MuiCheckbox>;

export function CCheckbox(prop: CCheckboxProps) {
    return <Checkbox {...useChocoProps(prop)} />;
}
