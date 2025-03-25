//-Path: "react-choco-style/src/components/CDialog.tsx"
import { ChocoProps } from '../hook/ChocoProps';
import { ChocoStyle } from '../hook/ChocoStyle';
import { Dialog as MuiDialog } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Dialog = ChocoStyle.styled(MuiDialog, 'CDialog')();

export type CDialogProps = ChocoStyledProps<typeof Dialog, {}>;

export function CDialog<Props extends CDialogProps>(prop: Props) {
    return (
        <Dialog
            open={prop.open || false}
            {...ChocoProps.useChocoProps(
                prop,
                () => {
                    return {};
                },
                ['open'],
            )}
        />
    );
}
