//-Path: "react-choco-style/lib/src/hooks/getInnerWidth.tsx"
import { useMemo } from 'react';
import { InnerWidthAtom } from '../temp/innerWidth';

export function getInnerWidth() {
    const innerWidth = InnerWidthAtom.get();

    return useMemo(() => innerWidth, [innerWidth]);
}
