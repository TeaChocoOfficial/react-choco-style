//-Path: "react-choco-style/src/view/test/choco/Skeleton.tsx"
import { CSkeleton, CText } from '@teachoco-official/react-choco-style';

export default function Skeleton() {
    return (
        <>
            <CText skeleton>skeleton</CText>
            <CSkeleton />
            <CSkeleton variant="rounded" />
            <CSkeleton variant="rectangular" />
        </>
    );
}
