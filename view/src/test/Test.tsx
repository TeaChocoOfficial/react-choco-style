//-Path: "react-choco-style/view/src/test/Test.tsx"
import React, { useEffect, useState } from 'react';
import { Obj } from '@teachoco-dev/cli';
import {
    Size,
    CTabs,
    CText,
    CButton,
    useTheme,
    SizeType,
    ChocoStyle,
    ChocoStyledProps,
    C,
} from '@teachoco-official/react-choco-style';

const SButton = ChocoStyle.styled('button', 'CButton')();

export type CCButtonProps = ChocoStyledProps<'button'>;

function CCButton({ ...prop }: CCButtonProps) {
    return (
        <SButton
            {...ChocoStyle.props(prop, ({ sz }) => {
                return {
                    cs: {
                        p: sz({
                            root: 'padding',
                            calc: (value) => value,
                        }),
                        px: sz({
                            root: 'padding',
                            calc: (value) => value * 3,
                        }),
                    },
                };
            })}
        />
    );
}

export default function Test() {
    const [openSnack, setOpenSnacl] = useState(true);
    // const theme = useTheme();
    // const sizes: SizeType<number> = { v: 0.5, l: 2, d: 5, h: 1.5, t: 3 };
    // const testSize = new Size(sizes, { unit: '*em' });
    // console.log(
    //     // chocoStyle({ p: -4 }),
    //     // Size.to(-16, { check: true, unit: 'px' }),
    //     testSize,

    //     // Size.to(new Size(16), { check: true, unit: 'px' }),
    //     // Size.is(new Size(16))
    // );

    // const newSize = size.reduce<string>((v) => `${v}em`);

    // console.log(size, size.value, newSize);

    // useEffect(() => {
    //     console.log(theme);
    // }, [theme]);

    const handleClose = () => setOpenSnacl(false);

    const action = (
        <React.Fragment>
            <C.Button color="secondary" size="small">
                UNDO
            </C.Button>
            <C.IconButton
                aria-label="close"
                setClr="error"
                fa={'faX'}
                onClick={handleClose}
            />
        </React.Fragment>
    );

    return (
        <>
            <C.Alert>success</C.Alert>
            <C.Avatar />
            <C.Badge />
            <C.Box />
            <C.Breadcrumbs />
            <C.Button>button</C.Button>
            <C.Checkbox />
            <C.Chip />
            <C.Container />
            <C.Dialog />
            <C.Drawer />
            <C.GlobalStyles />
            <C.Icon debug={['sz']} />
            <C.IconButton fa="fa0" />
            <C.Image />
            <C.Input />
            <C.Menu />
            <C.Navbar />
            <C.Navigation />
            <C.Pagination />
            <C.Paper />
            <C.Progress />
            <C.Rating />
            <C.Skeleton />

            <C.Slider />

            <C.Snackbar
                action={action}
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
            />
            <C.Stepper />
            <C.Switch />
            <C.Table />
            <C.Tabs />
            <C.Text sz={16}>text</C.Text>
            <C.Textarea />
            <C.Tooltip />

            {/* {testSize.map((value, key) => {
                console.log(key, value);

                return (
                    <CText key={key} fontS={value}>
                        {key}: {value as number}
                    </CText>
                );
            })} */}
            {/* <CTabs
                sz={16}
                // fullW
                // lowcase
                // setClr="infoText"
                // selectionFollowsFocus
                value="home"
                options={[
                    { value: 'mui', label: 'Mui' },
                    { value: 'home', label: 'Home' },
                    { value: 'choco', label: 'Choco' },
                ]}
            /> */}
            {/* <CText minW={0}>test</CText>
            <CButton sz={-16}>test</CButton>
            <CCButton sz={-32}>tester</CCButton> */}
        </>
    );
}
