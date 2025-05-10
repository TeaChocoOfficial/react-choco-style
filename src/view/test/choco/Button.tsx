//-Path: "react-choco-style/src/view/test/choco/Button.tsx"
import { CButton } from '@teachoco-official/react-choco-style';

export default function Button() {
    return (
        <>
            <CButton setClr="main">button</CButton>
            <CButton lowcase setClr="primary">
                button lowcase primary
            </CButton>
            <CButton sz={32} jStart>
                button
            </CButton>
            <CButton outline startIcon="faX">
                button outline secondary
            </CButton>
            <CButton tabIndex={-1} text>
                button text
            </CButton>
            <CButton setClr="success">button</CButton>
            <CButton disabled>button disabled</CButton>
            <CButton setClr="text">button color text</CButton>
            <CButton text setClr='errorText'>
                button error text
            </CButton>
        </>
    );
}
