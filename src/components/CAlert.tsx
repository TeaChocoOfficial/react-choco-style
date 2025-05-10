//-Path: "react-choco-style/src/components/CAlert.tsx"
import { Alert as MuiAlert } from '@mui/material';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const Alert = createStyled(MuiAlert, 'CAlert')();

export type CAlertProps = ChocoStyledProps<typeof MuiAlert>;

export function CAlert(prop: CAlertProps) {
    return (
        <Alert
            {...useChocoProps(prop, () => {
                return {};
            })}
        />
    );
}
