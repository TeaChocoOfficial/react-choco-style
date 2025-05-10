//-Path: "react-choco-style/src/view/test/choco/Theme.tsx"
import { CInput, useTheme } from '@teachoco-official/react-choco-style';

export default function Theme() {
    const theme = useTheme();
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
