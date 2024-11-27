import { Sizes, SizeValue } from "../../types/Size";
export declare function ComponentSize<S = SizeValue>({ size, children, }: {
    size?: Sizes<S>;
    children: (value: S) => React.ReactNode;
}): React.ReactNode;
