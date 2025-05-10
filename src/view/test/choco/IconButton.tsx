//-Path: "react-choco-style/src/view/test/choco/IconButton.tsx"
import { CBox, CIconButton } from '@teachoco-official/react-choco-style';

export default function IconButton() {
    return (
        <>
            <CBox>
                <CIconButton fa="faX" sz={-8} />
                <CIconButton fa="faX" sz={-32} />
                <CIconButton fa="faX" />
                <CIconButton fa="faX" />
            </CBox>
        </>
    );
}
