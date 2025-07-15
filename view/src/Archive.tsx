//-Path: "react-choco-style/view/src/Archive.tsx"
import {
    C,
    useTheme,
    ChocoStyle,
    ChocoResponse,
} from '@teachoco-official/react-choco-style';
import { useEffect, useRef, useState } from 'react';

const CCBox = ChocoStyle.styled('div')();

export default function Archive() {
    const theme = useTheme();
    const [count, setcount] = useState(0);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // console.log(
        //     chocoResponse.chocoStyle({
        //         p: 4,
        //         css: {
        //             " a": {
        //                 m: 8,
        //             },
        //         },
        //     }),
        // );
        // console.log(boxRef.current);
    }, [theme]);

    return (
        <div>
            <p style={{ color: theme.palette.main.secondary[5].hex() }}>
                {count}
            </p>
            <C.Box
                dFlex
                aCenter
                fontS={-64}
                cs={({ theme }) => ({
                    m: 4,
                    a: 'c',
                    clr: theme.palette.main.secondary[5],
                })}
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
                sz={-46}
                bg="red"
                onClick={() => {
                    if (boxRef.current) boxRef.current.className += ' test';
                    setcount((prev) => prev + 1);
                }}
            >
                button
            </C.Button>
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
                        v: theme.palette.main.secondary[5],
                        h: theme.palette.main.info[5],
                    },
                    css: {
                        ' p': {
                            p: 16,
                            clr: 'red',
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
        </div>
    );
}
