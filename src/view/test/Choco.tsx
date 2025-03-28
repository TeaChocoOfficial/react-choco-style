//-Path: "react-choco-style/src/view/test/Choco.tsx"
import { useState } from 'react';
import {
    CBox,
    CText,
    CPaper,
    CButton,
    CDialog,
    CSelect,
    CSkeleton,
    ChocoStyle,
    CDialogChildrenProps,
} from '@teachoco-official/react-choco-style';
import { CIconButton } from '../../components/CIconButton';

const Text = ChocoStyle.styled('span')({ clr: 'info' });

export default function Choco() {
    const [open, setOpen] = useState(false);

    return (
        <CBox>
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
            <CPaper dFlex gaps={4} column m={16} elevation={1}>
                <Text>choco styled</Text>
                <Text
                    animate={{
                        rotate: [0, 360], // หมุนจาก 0 ถึง 360 องศา
                    }}
                >
                    text animate rotate
                </Text>
                <CText dFlex cs={{ clr: 'error' }}>
                    CText
                </CText>
                <CText dFlex clr="warning" sz={26}>
                    CText
                </CText>
                <CSelect
                    label="option select"
                    outline
                    w={300}
                    options={[
                        'option 1',
                        'option 2',
                        'option 3',
                        'option 4',
                        'option 5',
                        'option 6',
                    ]}
                />
                <CText skeleton>skeleton</CText>
                <CSkeleton />
                <CSkeleton variant="rounded" />
                <CSkeleton variant="rectangular" />
                <CButton
                    setClr="success"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    button
                </CButton>
                <CButton outline setClr="secondary">
                    button outline secondary
                </CButton>
                <CButton lowcase setClr="primary">
                    button lowcase primary
                </CButton>
                <CButton text>button text</CButton>
                <CButton disabled>button disabled</CButton>
            </CPaper>
            <CIconButton dFlex fa="fa0" sz={64} />
        </CBox>
    );
}
