//-Path: "react-choco-style/view/lib/hooks/getInnerSize.tsx"
import { useMemo } from 'react';
import { useTheme } from './useTheme';
import { SizeKey } from '../types/size';
import { Obj } from '@teachoco-dev/cli';
import { InnerWidthAtom } from '../temp/innerWidth';

export function getInnerSize(): SizeKey {
    const theme = useTheme();
    const innerWidth = InnerWidthAtom.get();

    return useMemo(() => {
        const { size } = theme.breakpoint;
        const formatKeys = Obj.keys(size);
        const key =
            formatKeys.reverse().find((key) => {
                if (size[key] <= innerWidth) return key;
            }) ?? formatKeys[0];
        return key;
    }, [theme, innerWidth]);
}
