//-Path: "react-choco-style/src/view/test/choco/Shade.tsx"
import { CBox, CText, ChocoColor } from '@teachoco-official/react-choco-style';

export default function Shade() {
    return (
        <>
            <CBox dFlex jBetween>
                {ChocoColor.shades(0xff0000).map((color, key) => (
                    <CBox
                        dFlex
                        column
                        aCenter
                        jCenter
                        key={key}
                        wh={-100}
                        bgClr={color}
                    >
                        <CText sz={-16}>{key}</CText>
                        <CText sz={-12}>{color.hex()}</CText>
                    </CBox>
                ))}
            </CBox>
            <CBox dFlex jBetween>
                {ChocoColor.shades(0xff0000, true).map((color, key) => (
                    <CBox
                        dFlex
                        column
                        aCenter
                        jCenter
                        key={key}
                        wh={-100}
                        bgClr={color}
                    >
                        <CText sz={-16}>{key}</CText>
                        <CText sz={-12}>{color.hex()}</CText>
                    </CBox>
                ))}
            </CBox>
        </>
    );
}
