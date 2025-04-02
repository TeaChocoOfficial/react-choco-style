//-Path: "react-choco-style/src/components/CInput.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { Input as MuiInput } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Input = createStyled(MuiInput, 'CInput')();

export type CInputProps = ChocoStyledProps<typeof MuiInput>;

export function CInput(prop: CInputProps) {
    return <Input {...prop} />;
}
