//-Path: "react-choco-style/lib/src/components/CSnackbar.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Snackbar as MuiSnackbar } from '@mui/material';

const Snackbar = ChocoStyle.styled(MuiSnackbar, 'CSnackbar')();

export type CSnackbarProps = ChocoStyledProps<typeof MuiSnackbar>;

export function CSnackbar(prop: CSnackbarProps) {
    return <Snackbar {...ChocoStyle.props(prop)} />;
}
