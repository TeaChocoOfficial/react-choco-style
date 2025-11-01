//-Path: "react-choco-style/next/src/app/page.tsx"
'use client';
import { useEffect } from 'react';
import All from '@/components/All';
import C, { ChocoStyle, CsValue } from '@teachoco-official/react-choco-style';

const Box = ChocoStyle.styled('div')();

export default function Home() {
    useEffect(() => {
        const value = new CsValue(-1, {
            check: true,
        });
        console.log(value.response);
    }, []);

    return (
        <>
            {/* <C.Button sz={32}>test</C.Button>
            <Box
                cs={{
                    fontS: { v: 1, h: 2, t: 3, l: 4, d: 5 },
                }}
            >
                test
            </Box> */}
            <All />
        </>
    );
}
