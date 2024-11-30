import { ChocoStyledProps } from "../custom/Styled";
export type CButtonProps = ChocoStyledProps<"button"> & {
    lowcase?: boolean;
};
export default function CButton(prop: CButtonProps): import("react/jsx-runtime").JSX.Element;
