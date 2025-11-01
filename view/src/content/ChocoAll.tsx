//-Path: "react-choco-style/view/src/content/ChocoAll.tsx"
import { useEffect, useState } from 'react';
import {
    CBox,
    CText,
    CTabs,
    CPaper,
    CInput,
    CButton,
    CDialog,
    CDrawer,
    CNavbar,
    CSkeleton,
    ChocoStyle,
    CContainer,
    CNavigation,
    CIconButton,
    useChocoHook,
    CGlobalStyles,
    useGlobalStyles,
    CDialogChildrenProps,
} from '@teachoco-official/react-choco-style';

const Text = ChocoStyle.styled('span')({ clr: 'info' });

export default function ChocoAll() {
    const { mixCs } = useChocoHook();

    const [page, setPage] = useState('');
    const [tabs, setTabs] = useState('1');
    const globalStyles = useGlobalStyles();
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState('');
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        const CsProps = mixCs(
            { dp: 'f', clr: 'red' },
            { dp: null, fontS: { v: 64, t: 128 } },
            { css: { ':hover': { bgClr: 'black' } } },
            { css: { ':hover': { clr: 'blue' } } },
            ({ theme }) => ({
                bgClr: theme.palette.main.info[7],
            }),
            ({ theme }) => ({
                bgClr: theme.palette.main.error[7],
            }),
        );
        console.log('ผลลัพ', CsProps);
    }, []);

    useEffect(() => {
        console.log('option: ', option);
        globalStyles('chocoall set bg', {
            body: {
                bgClr: option,
            },
        });
    }, [option]);

    useEffect(() => {
        console.log('page: ', page);
    }, [page]);

    return (
        <>
            <CGlobalStyles
                css={{
                    body: {
                        p: 0,
                        m: 0,
                        bgClr: 'gray',
                    },
                }}
            />
            <CDrawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                paperCs={({ theme }) => {
                    return { bgClr: theme.palette.main.error[5] };
                }}
            >
                <CText>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </CText>
                <CText>
                    Nulla repellat iste quasi recusandae iure illum odit nam.
                </CText>
                <CText>
                    Sed fugit tempora, cum magni iste minus praesentium. A in
                </CText>
                <CText>numquam ea velit.</CText>
            </CDrawer>
            <CNavbar
                cs={({ theme }) => ({
                    bgImg: `linear-gradient(
                        1deg,
                        ${theme.palette.main.primary[7].alpha(0.5)},
                        ${theme.palette.text.primary[5]}
                    )`,
                })}
            >
                Choco Navbar
                <CNavigation
                    showLabels
                    value={page}
                    setClr="primary"
                    setValue={setPage}
                    options={[
                        {
                            // to: '/mui',
                            label: 'Mui',
                            value: 'mui',
                            fa: 'faCoffee',
                        },
                        'choco',
                        'tea',
                    ]}
                />
                <CNavigation
                    showLabels
                    value={page}
                    setClr="error"
                    setValue={setPage}
                    options={[
                        {
                            // to: '/mui',
                            label: 'Mui',
                            value: 'mui',
                            fa: 'faCoffee',
                        },
                        'choco',
                        'tea',
                    ]}
                />
            </CNavbar>
            <CDialog open={open}>
                {({ Title, Content, Actions }: CDialogChildrenProps) => (
                    <>
                        <Title>Dialog Title</Title>
                        <Content>This is the content</Content>
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
                    <CTabs
                        scrollButtons
                        value={tabs}
                        setClr="errorText"
                        setValue={setTabs}
                        options={[
                            { value: '1', label: 'item 1' },
                            'item 2',
                            'item 3',
                        ]}
                    />
                    <CBox
                        bgClr="red"
                        wh={80}
                        cs={() => ({
                            dp: { v: null, l: 'f' },
                            '& .box-in-box': {
                                m: -1,
                            },
                        })}
                    >
                        <CBox bgClr="info" wh={60} className="box-in-box" />
                    </CBox>
                    <Text>choco styled</Text>
                    <Text trans={10} motion={{ animate: { rotate: [0, 360] } }}>
                        text animate rotate
                    </Text>
                    <CText
                        dFlex
                        cs={{ clr: 'error' }}
                        motion={{ animate: { rotate: [0, 360] } }}
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

                    <CInput
                        w={300}
                        value={option}
                        label="option select"
                        setValue={(value) => {
                            setOption(value);
                        }}
                        selects={[
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
                    <CButton outline setClr="secondary" to="/test/mui">
                        button outline secondary
                    </CButton>
                    <CButton
                        lowcase
                        setClr="primary"
                        onClick={() => setOpenDrawer(true)}
                    >
                        button lowcase primary open OpenDrawer
                    </CButton>
                    <CButton text>button text</CButton>
                    <CButton disabled onClick={() => console.log('click')}>
                        button disabled
                    </CButton>

                    <CPaper>
                        <CIconButton dFlex fa="faPen" p={0} />
                    </CPaper>
                </CContainer>
            </CContainer>
        </>
    );
}
