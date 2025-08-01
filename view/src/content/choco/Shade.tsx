//-Path: "react-choco-style/view/src/content/choco/Shade.tsx"
import { CBox, CText, ChocoShade } from '@teachoco-official/react-choco-style';

export default function Shade() {
    return (
        <>
            <CBox dFlex jBetween>
                {new ChocoShade(0xff0000).map((color, key) => (
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
                {new ChocoShade(0xff0000, true).map((color, key) => (
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
