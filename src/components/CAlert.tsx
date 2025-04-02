//-Path: "react-choco-style/src/components/CAlert.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Alert as MuiAlert } from '@mui/material';

const Alert = createStyled(MuiAlert, 'CAlert')();

export type CAlertProps = ChocoStyledProps<typeof MuiAlert>;

export function CAlert(prop: CAlertProps) {
    return <Alert {...prop} />;
}
