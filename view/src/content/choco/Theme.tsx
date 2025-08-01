//-Path: "react-choco-style/view/src/content/choco/Theme.tsx"
import { CInput, useTheme } from '@teachoco-official/react-choco-style';
import { useEffect } from 'react';

export default function Theme() {
    const theme = useTheme();

    useEffect(() => {
        console.log(theme);
    }, [theme]);

    return (
        <>
            <CInput
                w={500}
                outline
                setClr="main"
                label="item select"
                defaultValue={theme.mode}
                selects={['dark', 'light']}
                setValue={(value) => {
                    theme.method.setMode(value as 'dark' | 'light');
                }}
            />
        </>
    );
}
