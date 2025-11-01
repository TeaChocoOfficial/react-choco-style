//-Path: "react-choco-style/lib/src/components/CCheckbox.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Checkbox as MuiCheckbox } from '@mui/material';

const Checkbox = ChocoStyle.styled(MuiCheckbox, 'CCheckbox')();

export type CCheckboxProps = ChocoStyledProps<typeof MuiCheckbox>;

export function CCheckbox(prop: CCheckboxProps) {
    return <Checkbox {...ChocoStyle.props(prop)} />;
}
