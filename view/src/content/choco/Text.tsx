//-Path: "react-choco-style/view/src/content/choco/Text.tsx"
import { ChocoStyle, CText } from '@teachoco-official/react-choco-style';

const MyText = ChocoStyle.styled('span')({ clr: 'info' });

export default function Text() {
    return (
        <>
            <MyText>choco styled</MyText>
            <MyText trans={10} motion={{ animate: { rotate: [0, 360] } }}>
                text animate rotate
            </MyText>
            <CText
                cs={({ theme }) => ({
                    p: theme.method.spacing(1, 1, 1, 1),
                })}
            >
                CText use theme
            </CText>
            <CText
                dFlex
                cs={{ clr: 'error' }}
                motion={{ animate: { rotate: [0, 360] } }}
            >
                CText
            </CText>
            <CText dFlex clr="warning" fontS={-64}>
                CText big
            </CText>
            <CText
                dFlex
                cs={({ theme }) => {
                    return {
                        bgClr: theme.palette.main.info[5],
                    };
                }}
            >
                text dark info
            </CText>
        </>
    );
}
