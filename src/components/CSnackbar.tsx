//-Path: "react-choco-style/src/components/CSnackbar.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Snackbar as MuiSnackbar } from '@mui/material';

const Snackbar = createStyled(MuiSnackbar, 'CSnackbar')();

export type CSnackbarProps = ChocoStyledProps<typeof MuiSnackbar>;

export function CSnackbar(prop: CSnackbarProps) {
    return <Snackbar {...prop} />;
}
