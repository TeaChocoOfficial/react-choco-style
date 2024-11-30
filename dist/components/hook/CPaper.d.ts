import { ChocoStyledProps } from "../custom/Styled";
export type CPaperProps = ChocoStyledProps<"div"> & {
    elevation?: number;
};
export default function CPaper(prop: CPaperProps): import("react/jsx-runtime").JSX.Element;
