import { ChocoStyledProps } from "../custom/Styled";
export type CContainerProps = ChocoStyledProps<"div"> & {
    content?: "main" | "header" | "content";
};
export default function CContainer(prop: CContainerProps): import("react/jsx-runtime").JSX.Element;
