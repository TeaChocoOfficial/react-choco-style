import { ChocoStyledProps } from "../custom/Styled";
export type CSkeletonProps = ChocoStyledProps<"div"> & {
    circle?: boolean;
};
export default function CSkeleton(prop: CSkeletonProps): import("react/jsx-runtime").JSX.Element;
