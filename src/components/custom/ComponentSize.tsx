//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/custom/ComponentSize.tsx"
import { formatSize } from "./size";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useTheme } from "../../theme/useTheme";
import { innerAtom } from "../layout/ChocoStart";
import { Size, Sizes, SizeValue } from "../../types/Size";

export function ComponentSize<S = SizeValue>({
    size = 20 as S,
    children,
}: {
    size?: Sizes<S>;
    children: (value: S) => React.ReactNode;
}): React.ReactNode {
    const theme = useTheme();
    const inner = useRecoilValue(innerAtom);
    const [sizes, setSizes] = useState<Size<S>>();
    const [value, setValue] = useState<S>(size as S);

    useEffect(() => {
        if (typeof size === "number") {
            setSizes(formatSize(size));
        } else {
            setSizes(size as Size<S>);
        }
    }, [size]);

    useEffect(() => {
        const keys = Object.keys(
            theme.breakpoint,
        ) as (keyof typeof theme.breakpoint)[];
        keys.map((key) => {
            const breakpoints = theme.breakpoint[key];
            const matche = inner.width > breakpoints;

            if (matche && sizes?.[key] !== undefined) {
                setValue(sizes[key]);
            }
        });
    }, [sizes, inner]);

    return children(value);
}
