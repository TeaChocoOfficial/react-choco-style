//-Path: "react-choco-style/src/view/test/choco/Grid.tsx"
import { CBox } from '@teachoco-official/react-choco-style';

export default function Grid() {
    return (
        <CBox dGrid center g={-2} p={-2} gridTC={[1, 1, 1, 1, 1, 1]}>
            {Array.from({ length: 100 }).map((_, i) => (
                <CBox key={i} bgClr="info" dFlex center wh={-180} sz={-64}>
                    {i}
                </CBox>
            ))}
        </CBox>
    );
}
