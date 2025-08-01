//-Path: "react-choco-style/view/src/content/choco/Color.tsx"
import {
    CBox,
    CText,
    CInput,
    CColor,
    useTheme,
    ColorMainType,
} from '@teachoco-official/react-choco-style';
import { useEffect, useState } from 'react';

const setColors = [
    'inherit',
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
] as ColorMainType[];

export default function Color() {
    const { palette } = useTheme();
    const [alpha, setAlpha] = useState(0.5);
    const [darker, setDarker] = useState(2.5);
    const [lighter, setLighter] = useState(2.5);
    const [color, setColor] = useState('0xffffff');

    useEffect(() => {
        const clr = new CColor(0xfedcba, 0.5);
        // console.log(clr, `${clr}`);
        // console.log(clr.alpha(1), `${clr.alpha(1)}`);
        // console.log(`${new ChocoColor(0x111)}`);
        // console.log(`${ChocoColor.call()}`);
    }, []);

    return (
        <>
            <CText>input: {color}</CText>
            <CText>number: {Number(color)}</CText>
            <CText>base 16: {Number(color).toString(16)}</CText>
            <CText>length: {Number(color).toString(16).length}</CText>
            <CText color={CColor.from(Number(color), Number(alpha)).toString()}>
                Hex: {CColor.from(Number(color), Number(alpha)).toString()}
            </CText>
            <CText>alpha: {alpha}</CText>
            <CText color={new CColor(Number(color)).darker(darker).toString()}>
                darker: {new CColor(Number(color)).darker(darker).toString()}
            </CText>
            <CText
                color={new CColor(Number(color)).lighter(lighter).toString()}
            >
                lighter: {new CColor(Number(color)).lighter(lighter).toString()}
            </CText>
            <CInput label="color" value={color} setValue={setColor} />
            <CInput
                type="number"
                label="alpha"
                value={alpha}
                setValue={setAlpha}
            />
            <CInput
                type="number"
                label="darker"
                value={darker}
                setValue={setDarker}
            />
            <CInput
                type="number"
                label="lighter"
                value={lighter}
                setValue={setLighter}
            />
            <CBox
                dGrid
                g={-1}
                jiCenter
                gridT={[
                    [1],
                    Array.from({ length: setColors.length }).map(() => 1),
                ]}
            >
                {setColors.map((setClr, index) => (
                    <CBox key={index} dFlex g={-1} column>
                        <CText sz={-24} clr={setClr} tCenter>
                            {setClr}
                        </CText>
                        <CBox dFlex g={-1}>
                            <CBox dGrid jiCenter g={-1}>
                                {palette.main[setClr].map((color, key) => {
                                    // console.log(color);
                                    return (
                                        <CBox
                                            dFlex
                                            column
                                            center
                                            key={key}
                                            wh={-80}
                                            bgClr={palette.text[setClr][key]}
                                        >
                                            <CText clr={color}>{key}</CText>
                                            <CText sz={-12} clr={color}>
                                                {palette.text[setClr][
                                                    key
                                                ].hex()}
                                            </CText>
                                        </CBox>
                                    );
                                })}
                            </CBox>
                            <CBox key={index} dGrid jiCenter g={-1}>
                                {palette.main[setClr].map((color, key) => {
                                    // console.log(color);
                                    return (
                                        <CBox
                                            dFlex
                                            column
                                            center
                                            key={key}
                                            wh={-80}
                                            bgClr={color}
                                        >
                                            <CText
                                                clr={palette.text[setClr][key]}
                                            >
                                                {key}
                                            </CText>
                                            <CText
                                                sz={-12}
                                                clr={palette.text[setClr][key]}
                                            >
                                                {color.hex()}
                                            </CText>
                                        </CBox>
                                    );
                                })}
                            </CBox>
                        </CBox>
                    </CBox>
                ))}
            </CBox>
        </>
    );
}
