//-Path: "react-choco-style/src/view/test/Choco.tsx"
import { CText } from '@teachoco-official/react-choco-style';

export default function Choco() {
    return (
        <>
            <CText dFlex cs={{ clr: 'error' }} animate={{ rotate: [0, 360] }}>
                CText
            </CText>
            <CText dFlex clr="warning" fontS={-64}>
                CText big
            </CText>
            <CText
                dFlex
                cs={({ theme }) => {
                    return {
                        bgClr: theme.palette.info.main,
                    };
                }}
            >
                text dark info
            </CText>
        </>
    );
}
