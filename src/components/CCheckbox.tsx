//-Path: "react-choco-style/src/components/CCheckbox.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Checkbox as MuiCheckbox } from '@mui/material';

const Checkbox = createStyled(MuiCheckbox, 'CCheckbox')();

export type CCheckboxProps = ChocoStyledProps<typeof MuiCheckbox>;

export function CCheckbox(prop: CCheckboxProps) {
    return <Checkbox {...prop} />;
}
