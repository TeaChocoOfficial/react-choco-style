//-Path: "react-choco-style/next/src/components/Test.tsx"
'use client';
import { Box } from '@mui/material';
import { useEffect, useMemo } from 'react';
import C, {
    CsStyle,
    CsValue,
    ChocoStyle,
    OptionCalc,
    ChocoResponse,
} from '@teachoco-official/react-choco-style';

export default function Test() {
    const chocoResponse = new ChocoResponse();

    // useEffect(() => {
    //     const optionCalc = new OptionCalc([
    //         (before) => {
    //             return before.num * 2;
    //         },
    //     ]);
    //     const value = new CsValue(16, { unit: '*em', calcs: optionCalc });
    //     console.log(optionCalc, value.response, value);
    // }, [chocoResponse]);

    useEffect(() => {
        const size = CsValue.size(1);
        console.log(size);
    }, []);

    const sx = useMemo(() => {
        // const using = CsValue.use(sz, (value, key, index) => 10);
        const sz = { v: 10, h: 20, t: 30, l: 40, d: 50 };
        const size = new CsValue(sz, {
            unit: '*em',
            calcs: [(after) => after.num * 2],
        });
        // const use = new CsValue(size, {
        //     unit: '*%',
        //     calcs: [(after) => after.num * 2],
        // });
        // console.log(size.option, size.response);
        // console.log(use.option, use.response);

        const value = new CsValue(size, {
            calcs: [(after) => after.num / 10],
        });
        // console.log(size.option, value.option);
        // console.log(value.option.unit);

        // console.log(value, value.get, value.response);

        // const csOption = new CsOption({
        //     check: true,
        // });
        // const csOption2 = new CsOption({
        //     check: false,
        //     unit: '*px',
        // });
        // console.log(csOption, csOption2, CsOption.mix(csOption, csOption2));

        const cs = new CsStyle({
            p: value,
            fw: true,
            dp: { v: 'b', h: 'f' },
            clr: new CsValue({
                v: 'secondary',
                h: 'blue',
            }),
            css: {
                ' a': {
                    clr: 'error',
                },
            },
        });
        const css = chocoResponse.chocoStyle(cs);
        console.log(css.css, cs.cs);
        return css.css;
    }, [chocoResponse]);

    return (
        <Box sx={sx}>
            test
            <a>link</a>
        </Box>
    );
}
