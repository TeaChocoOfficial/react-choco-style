//-Path: "react-choco-style/src/components/CSwitch.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { Switch as MuiSwitch } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Switch = createStyled(MuiSwitch, 'CSwitch')();

export type CSwitchProps = ChocoStyledProps<typeof MuiSwitch>;

export function CSwitch(prop: CSwitchProps) {
    return <Switch {...prop} />;
}
