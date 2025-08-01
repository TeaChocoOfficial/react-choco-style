//-Path: "react-choco-style/view/src/content/choco/Switch.tsx"
import { CBox, CSwitch } from '@teachoco-official/react-choco-style';

export default function Switch() {
    return (
        <>
            <CSwitch label="switch" sz={64} />
            <CBox>
                <CSwitch
                    label="labelPlacement start switch"
                    labelPlacement="start"
                />
            </CBox>
            <CSwitch required label="text required" />
            <CSwitch disabled label="text disabled" />

            <CSwitch setClr="text" />
            <CSwitch defaultChecked setClr="text" />
            <CSwitch setClr="secondary" />
            <CSwitch defaultChecked setClr="secondary" />
            <CSwitch setClr="primary" />
            <CSwitch defaultChecked setClr="primary" />
            <CSwitch setClr="info" />
            <CSwitch defaultChecked setClr="info" />
            <CSwitch setClr="error" />
            <CSwitch defaultChecked setClr="error" />
            <CSwitch setClr="warning" />
            <CSwitch defaultChecked setClr="warning" />
            <CSwitch setClr="success" />
            <CSwitch defaultChecked setClr="success" />
        </>
    );
}
