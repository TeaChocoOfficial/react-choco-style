//-Path: "react-choco-style/lib/src/components/CAlert.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { Alert as MuiAlert } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Alert = ChocoStyle.styled(MuiAlert, 'CAlert')();

export type CAlertProps = ChocoStyledProps<typeof MuiAlert>;

export function CAlert(prop: CAlertProps) {
    return <Alert {...ChocoStyle.props(prop)} />;
}
