//-Path: "react-choco-style/src/components/CSize.tsx"
import { Obj } from '../custom/obj';
import React, { useMemo } from 'react';
import { useFormat } from '../hook/ChocoFormat';

export type CSizeProps = {
    size: number;
    children?: (size: number) => React.ReactNode;
};

export function CSize({ size, children }: CSizeProps) {
    const { formatSize } = useFormat();
    const sizes = formatSize<number>(size);
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
