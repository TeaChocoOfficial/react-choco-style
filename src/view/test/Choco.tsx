//-Path: "react-choco-style/src/view/test/Choco.tsx"
// import { useEffect } from 'react';
import {
    CText,
    CSkeleton,
    ChocoStyle,
} from '@teachoco-official/react-choco-style';

const Text = ChocoStyle.styled('span')({
    clr: 'info',
});

export default function Choco() {
    // const SetStyleSheets = useSetStyleSheets();

    // useEffect(() => {
    //     SetStyleSheets({
    //         type: 'style',
    //         selector: 'h1',
    //         style: { color: 'red' },
    //     });
    //     SetStyleSheets({
    //         type: 'media',
    //         important: 1,
    //         selector: '@media (min-width: 600px)',
    //         styles: [
    //             { type: 'style', selector: 'h1', style: { color: 'blue' } },
    //         ],
    //     });
    // }, []);

    return (
        <>
            <Text>choco styled</Text>
            <CText dFlex clr={{ h: 'error' }}>
                CText
            </CText>
            <CText skeleton>skeleton</CText>
            <CSkeleton />
        </>
    );
}
