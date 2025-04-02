//-Path: "react-choco-style/src/view/test/ChocoAll.tsx"
import { useEffect, useState } from 'react';
import {
    CBox,
    CText,
    CPaper,
    CButton,
    CDialog,
    CSelect,
    CNavbar,
    CSkeleton,
    CContainer,
    CIconButton,
    createStyled,
    CGlobalStyles,
    useMixCsProps,
    CDialogChildrenProps,
    useGlobalStyles,
} from '@teachoco-official/react-choco-style';

const Text = createStyled('span')({ clr: 'info' });

export default function ChocoAll() {
    const mixCsProps = useMixCsProps();
    const globalStyles = useGlobalStyles();
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState('');

    useEffect(() => {
        const CsProps = mixCsProps(
            { dp: 'f', clr: 'red' },
            { dp: null, fontS: { v: 64, t: 128 } },
            { '&:hover': { bgClr: 'black' } },
            { '&:hover': { clr: 'blue' } },
            ({ theme }) => ({
                bgClr: theme.palette.info.dark,
            }),
            ({ theme }) => ({
                bgClr: theme.palette.error.dark,
            }),
        );
        console.log('ผลลัพ', CsProps);
    }, []);

    useEffect(() => {
        console.log('option: ', option);
        globalStyles('set bg', {
            body: {
                bgClr: option,
            },
        });
    }, [option]);

    return (
        <>
            <CGlobalStyles
                css={{
                    body: {
                        p: 0,
                        m: 0,
                        bgClr: 'red',
                    },
                }}
            />
            <CNavbar>Choco Navbar</CNavbar>
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
            <CContainer portion="main">
                <CContainer portion="header" jCenter>
                    chocoStyles
                </CContainer>
                <CContainer>
                    <CBox
                        bgClr={null}
                        wh={80}
                        cs={{ dp: { v: null, l: 'f' } }}
                    />
                    <Text>choco styled</Text>
                    <Text trans={10} animate={{ rotate: [0, 360] }}>
                        text animate rotate
                    </Text>
                    <CText
                        dFlex
                        cs={{ clr: 'error' }}
                        animate={{ rotate: [0, 360] }}
                    >
                        CText
                    </CText>
                    <CText dFlex clr="warning" fontS={-64}>
                        CText big
                    </CText>
                    <CText
                        cs={({ theme }) => ({
                            p: theme.method.spacing(1, 1, 1, 1),
                        })}
                    >
                        CText use theme
                    </CText>

                    <CSelect
                        w={300}
                        value={option}
                        label="option select"
                        setValue={(value) => {
                            setOption(value);
                        }}
                        options={[
                            undefined,
                            'red',
                            'blue',
                            'pink',
                            'green',
                            'yellow',
                            'orenage',
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
                    <CButton disabled onClick={() => console.log('click')}>
                        button disabled
                    </CButton>

                    <CPaper>
                        <CIconButton dFlex fa="faPen" />
                    </CPaper>
                </CContainer>
            </CContainer>
        </>
    );
}
