//-Path: "react-choco-style/src/components/custom/ComponentSize.tsx"
import { useMemo } from "react";
import useTheme from "../../theme/useTheme";
import { innerAtom } from "../layout/ChocoStart";
import useFormatSize from "../../hook/useFormatSize";
import { Size, Sizes, SizeValue } from "../../types/Size";

export function ComponentSize<S = SizeValue>({
    size = 20 as S,
    children,
}: {
    size?: Sizes<S>;
    children: (value: S) => React.ReactNode;
}): React.ReactNode {
    const inner = innerAtom.get();
    const { breakpoint } = useTheme();
    const { formatSize } = useFormatSize();

    const sizes = useMemo(() => {
        if (typeof size === "number") {
            return formatSize(size) as Size<S>;
        } else {
            return size as Size<S>;
        }
    }, [size]);

    const value = useMemo(() => {
        let value = size as S;
        const keys = Object.keys(
            breakpoint,
        ) as (keyof typeof breakpoint.size)[];
        keys.map((key) => {
            const breakpoints = breakpoint.size[key];
            const matche = inner.width > breakpoints;

            if (matche && sizes?.[key] !== undefined) {
                value = sizes[key];
            }
        });
        return value;
    }, [sizes, inner, breakpoint]);

    return children(value);
}
