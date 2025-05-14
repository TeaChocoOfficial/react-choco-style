//-Path: "react-choco-style/src/components/CDialog.tsx"
import {
    Dialog as MuiDialog,
    DialogTitle as MuiDialogTitle,
    DialogContent as MuiDialogContent,
    DialogActions as MuiDialogActions,
} from '@mui/material';
import React from 'react';
import { CsType } from '../types/choco';
import { CPaper, CPaperProps } from './CPaper';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const Dialog = createStyled(MuiDialog, 'CDialog')();
const DialogTitle = createStyled(MuiDialogTitle, 'CDialogTitle')({ p: 2 });
const DialogContent = createStyled(
    MuiDialogContent,
    'CDialogContent',
)({ px: 2, pb: 2 });
const DialogActions = createStyled(
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

export type CDialogProps = Omit<
    ChocoStyledProps<typeof MuiDialog>,
    'children'
> & {
    children?: CDialogChildrenFunction | React.ReactNode;
    pcs?: CsType;
    paperProp?: CPaperProps;
};

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
            {...useChocoProps(prop, () => ({
                children:
                    typeof children === 'function'
                        ? children(DialogChildren)
                        : children,
            }))}
        />
    );
}
