//-Path: "react-choco-style/src/view/test/choco/Dialog.tsx"
import { useState } from 'react';
import {
    CButton,
    CDialog,
    CDialogChildrenProps,
} from '@teachoco-official/react-choco-style';

export default function Dialog() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <CButton onClick={() => setOpen(true)}>open</CButton>
            <CDialog open={open}>
                {({
                    Title,
                    Content,
                    Actions,
                    ContextText,
                }: CDialogChildrenProps) => (
                    <>
                        <Title>Dialog Title</Title>
                        <Content>
                            <ContextText>This is the content</ContextText>
                        </Content>
                        <Actions>
                            <CButton onClick={() => setOpen(false)}>
                                Close
                            </CButton>
                        </Actions>
                    </>
                )}
            </CDialog>
        </>
    );
}
