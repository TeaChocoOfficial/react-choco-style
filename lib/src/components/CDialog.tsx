//-Path: "react-choco-style/lib/src/components/CDialog.tsx"
import {
    Dialog as MuiDialog,
    DialogTitle as MuiDialogTitle,
    DialogContent as MuiDialogContent,
    DialogActions as MuiDialogActions,
} from '@mui/material';
import React from 'react';
import { CsType } from '../types/choco';
import { CPaper, CPaperProps } from './CPaper';
import { ChocoStyle } from '../class/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Dialog = ChocoStyle.styled(MuiDialog, 'CDialog')();
const DialogTitle = ChocoStyle.styled(MuiDialogTitle, 'CDialogTitle')({ p: 2 });
const DialogContent = ChocoStyle.styled(
    MuiDialogContent,
    'CDialogContent',
)({ px: 2, pb: 2 });
const DialogActions = ChocoStyle.styled(
    MuiDialogActions,
    'CDialogActions',
)({ p: 2 });

export type CDialogChildrenProps = {
    Title: typeof DialogTitle;
    Content: typeof DialogContent;
    Actions: typeof DialogActions;
};

export type CDialogChildrenFunction = (
    props: CDialogChildrenProps,
) => React.ReactNode;

export type CDialogProps = ChocoStyledProps<
    typeof MuiDialog,
    {
        pcs?: CsType;
        open?: boolean;
        paperProp?: CPaperProps;
        children?: CDialogChildrenFunction | React.ReactNode;
    },
    ['children', 'open']
>;

export function CDialog({
    pcs,
    open = false,
    children,
    paperProp,
    ...prop
}: CDialogProps) {
    const DialogChildren: CDialogChildrenProps = {
        Title: DialogTitle,
        Content: DialogContent,
        Actions: DialogActions,
    };

    return (
        <Dialog
            open={open}
            PaperComponent={({ role, className, children, ...paperProps }) => {
                const arias = {
                    ['aria-modal']: paperProps['aria-modal'],
                    ['aria-labelledby']: paperProps['aria-labelledby'],
                    ['aria-describedby']: paperProps['aria-describedby'],
                };

                return (
                    <CPaper
                        className={className}
                        role={role}
                        {...arias}
                        cs={pcs}
                        {...paperProp}
                    >
                        {children}
                    </CPaper>
                );
            }}
            {...ChocoStyle.props(prop, () => ({}))}
        >
            {typeof children === 'function'
                ? children(DialogChildren)
                : children}
        </Dialog>
    );
}
