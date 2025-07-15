//-Path: "react-choco-style/src/view/test/choco/Global.tsx"
import { useEffect, useState } from 'react';
import {
    CInput,
    CGlobalStyles,
    useGlobalStyles,
} from '@teachoco-official/react-choco-style';

export default function Global() {
    const globalStyles = useGlobalStyles();
    const [option, setOption] = useState('');

    useEffect(() => {
        console.log('option: ', option);
        globalStyles('set bg', {
            '#root': {
                bgClr: option,
            },
        });
    }, [option]);

    return (
        <>
            <CGlobalStyles
                css={{
                    body: {
                        bgClr: 'GrayText',
                    },
                }}
            />
            <CInput
                w={300}
                value={option}
                label="option select"
                setValue={(value) => setOption(value)}
                selects={[
                    undefined,
                    'red',
                    'blue',
                    'pink',
                    'green',
                    'yellow',
                    'orenage',
                ]}
            />
        </>
    );
}
