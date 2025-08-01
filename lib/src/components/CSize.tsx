//-Path: "react-choco-style/lib/src/components/CSize.tsx"
import { Size } from '../class/Size';
import React, { useMemo } from 'react';
import { Obj } from '@teachoco-dev/cli';

export type CSizeProps = {
    size: number;
    children?: (size: number) => React.ReactNode;
};

export function CSize({ size, children }: CSizeProps) {
    const sizes = Size.from<number>(size);
    const key = useMemo(() => {
        const keys = Obj.keys(sizes);
        let callback = keys[0];
        keys.forEach((key) => {
            const value = sizes[key];
            if (value !== undefined && value > window.innerWidth) {
                callback = key;
            }
        });
        return callback;
    }, [size]);

    return <>{children?.(sizes[key] as number)}</>;
}
