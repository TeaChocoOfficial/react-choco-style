//-Path: "react-choco-style/src/components/CDialog.tsx"
import {
    Dialog as MuiDialog,
    DialogTitle as MuiDialogTitle,
    DialogContent as MuiDialogContent,
    DialogActions as MuiDialogActions,
    DialogContentText as MuiDialogContentText,
} from '@mui/material';
import React from 'react';
import { ChocoProps } from '../hook/ChocoProps';
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Dialog = ChocoStyle.styled(MuiDialog, 'CDialog')();
const DialogTitle = ChocoStyle.styled(MuiDialogTitle, 'CDialogTitle')();
const DialogContent = ChocoStyle.styled(MuiDialogContent, 'CDialogContent')();
const DialogActions = ChocoStyle.styled(MuiDialogActions, 'CDialogActions')();
const DialogContentText = ChocoStyle.styled(
    MuiDialogContentText,
    'CDialogContentText',
)();

export type CDialogChildrenProps = {
    Title: typeof DialogTitle;
    Content: typeof DialogContent;
    Actions: typeof DialogActions;
    ContextText: typeof DialogContentText;
};

export type CDialogChildrenFunction = (
    props: CDialogChildrenProps,
) => React.ReactNode;

export type CDialogProps = Omit<ChocoStyledProps<typeof Dialog>, 'children'> & {
    children?: CDialogChildrenFunction | React.ReactNode;
};

export function CDialog<Props extends CDialogProps>({
    open = false,
    children,
    ...props
}: Props) {
    const DialogChildren: CDialogChildrenProps = {
        Title: DialogTitle,
        Content: DialogContent,
        Actions: DialogActions,
        ContextText: DialogContentText,
    };
    return (
        <Dialog
            open={open}
            {...ChocoProps.useChocoProps(
                props as ChocoStyledProps<typeof Dialog>,
                () => ({
                    children:
                        typeof children === 'function'
                            ? children(DialogChildren)
                            : children,
                }),
                ['open'],
            )}
        />
    );
}
