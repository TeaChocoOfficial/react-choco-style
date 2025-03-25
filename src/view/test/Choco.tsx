//-Path: "react-choco-style/src/view/test/Choco.tsx"
import { useState } from 'react';
import {
    CBox,
    CText,
    CPaper,
    CButton,
    CDialog,
    CSkeleton,
    ChocoStyle,
} from '@teachoco-official/react-choco-style';
import { CIconButton } from '../../components/CIconButton';

const Text = ChocoStyle.styled('span')({ clr: 'info' });

export default function Choco() {
    const [open, setOpen] = useState(false);

    return (
        <CBox>
            <CDialog open={open} />
            <CPaper dFlex gaps={4} column p={16} m={16} elevation={1}>
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
                <CText dFlex clr="warning">
                    CText
                </CText>
                <CText skeleton>skeleton</CText>
                <CSkeleton />
                <CSkeleton variant="rounded" />
                <CSkeleton variant="rectangular" />
                <CButton setColor="success">button</CButton>
                <CButton outline setColor="secondary">
                    button outline secondary
                </CButton>
                <CButton lowcase setColor="primary">
                    button lowcase primary
                </CButton>
                <CButton text>button text</CButton>
                <CButton disabled>button disabled</CButton>
            </CPaper>
            <CIconButton dFlex fa="fa0" sz={64} />
        </CBox>
    );
}
