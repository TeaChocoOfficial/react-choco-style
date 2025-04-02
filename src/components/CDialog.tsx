//-Path: "react-choco-style/src/components/CDialog.tsx"
import {
    Dialog as MuiDialog,
    DialogTitle as MuiDialogTitle,
    DialogContent as MuiDialogContent,
    DialogActions as MuiDialogActions,
    DialogContentText as MuiDialogContentText,
} from '@mui/material';
import React from 'react';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const Dialog = createStyled(MuiDialog, 'CDialog')();
const DialogTitle = createStyled(MuiDialogTitle, 'CDialogTitle')();
const DialogContent = createStyled(MuiDialogContent, 'CDialogContent')();
const DialogActions = createStyled(MuiDialogActions, 'CDialogActions')();
const DialogContentText = createStyled(
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

export type CDialogProps = Omit<
    ChocoStyledProps<typeof MuiDialog>,
    'children'
> & {
    children?: CDialogChildrenFunction | React.ReactNode;
};

export function CDialog({
    open = false,
    children,
    ...prop
}: CDialogProps) {
    const DialogChildren: CDialogChildrenProps = {
        Title: DialogTitle,
        Content: DialogContent,
        Actions: DialogActions,
        ContextText: DialogContentText,
    };
    const props = useChocoProps(prop, () => ({
        children:
            typeof children === 'function'
                ? children(DialogChildren)
                : children,
    }));
    return <Dialog open={open} {...props} />;
}
