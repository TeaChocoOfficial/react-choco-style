//-Path: "view/src/test/Archive.tsx"
import { Button } from '@mui/material';
import C, {
    CsValue,
    CsStyle,
    useTheme,
    CsOption,
    ChocoStyle,
    getInnerSize,
    ChocoResponse,
    getInnerWidth,
} from '@teachoco-official/react-choco-style';
import { useChocoHook } from '../../lib/hooks/useChocoHook';
import { useEffect, useMemo, useRef, useState } from 'react';

const CCBox = ChocoStyle.styled('div')();

export default function Archive() {
    const theme = useTheme();
    const innerSize = getInnerSize();
    const [count, setcount] = useState(0);
    const { responseCs } = useChocoHook();
    const chocoResponse = new ChocoResponse();
    const boxRef = useRef<HTMLDivElement>(null);

    const size = useMemo(() => {
        const fontS = new CsValue(16, { check: true });
        // console.log(fontS);
        const css = {
            fontS,
            p: -2,
            w: -16,
            fontW: 700,
        };
        const cs = new CsStyle(css);
        const style = chocoResponse.chocoStyle(cs);
        console.log(style);

        // console.log(css, cs, resCs);

        // const sizeV = { v: 10, h: 20, t: 30, l: 40, d: 50 };
        // const used = Size.use(sizeV, (value: number, key, index) => {
        //     return value + index;
        // });
        // console.log(new Size(sizeV, { unit: 'px', check: true }));
        // const size = new Size(sizeV);
        // console.log(size);
        // const sizeValue = Size.toValue(size);
        // console.log(sizeValue);
        // return sizeValue;
        //     const size = Size.format(-4, undefined, {
        //         unit: 'px',
        //         check: true,
        //         debug: true,
        //         response: 'padding',
        //     });
        //     console.log(size);
        //     // console.log(
        //     //     chocoResponse.chocoStyle({
        //     //         p: 4,
        //     //         css: {
        //     //             " a": {
        //     //                 m: 8,
        //     //             },
        //     //         },
        //     //     }),
        //     // );
        //     // console.log(boxRef.current);
        // const option = new SizeOption({});
        // console.log(option.can('unit'));
        // option.def({ unit: '*px' });
        // console.log(option.can('unit'));
        // console.log(option.can('unit'));
        // console.log(option.can('calc'));
        // option.do('calc');
        // console.log(option.can('calc'));
    }, [theme, innerSize]);

    return (
        <>
            <C.Box debug wh={-32} posF />
            <p style={{ color: theme.palette.main.secondary[5].hex() }}>
                {count}
            </p>
            <C.Box
                cs={{
                    px: -4,
                    p: new CsValue(4),
                }}
                motion={{
                    transition: { duration: 0.5 },
                    initial: { opacity: 0, x: -100 },
                    whileInView: { opacity: 1, x: 0 },
                }}
            >
                tester
            </C.Box>
            <C.Button
                // debug
                sz={16}
                onClick={() => {
                    if (boxRef.current) boxRef.current.className += ' test';
                    setcount((prev) => prev + 1);
                }}
            >
                button add class
            </C.Button>
            <C.Text fontS={-32}>test</C.Text>
            <Button variant="contained">button</Button>
            <C.Button
                setClr="errorText"
                sz={-16}
                // debug={['custom']}
            >
                button
            </C.Button>
            <C.Button sz={-16}>button</C.Button>
            <C.Icon fa="faX" sz={-32} />
            <C.Icon fa="faX" sz={32} />

            <CCBox p={-16} debug>
                box
            </CCBox>

            <CCBox
                // debug
                dFlex
                aCenter
                fontS={64}
                ref={boxRef}
                cs={({ theme }) => ({
                    m: 4,
                    a: 'c',
                    clr: {
                        h: theme.palette.main.info,
                        v: theme.palette.main.secondary,
                    },
                    css: {
                        ' p': {
                            p: 16,
                        },
                    },
                })}
                motion={{
                    transition: { duration: 0.5 },
                    initial: { opacity: 0, x: -100 },
                    whileInView: { opacity: 1, x: 0 },
                }}
            >
                <p>tester</p>
            </CCBox>
        </>
    );
}
