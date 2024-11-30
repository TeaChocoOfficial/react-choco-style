import { ChocoStyledProps } from "../custom/Styled";
import { ColorType } from "../../types/color";
export type CButtonProps = ChocoStyledProps<"button"> & {
    color?: ColorType;
    lowcase?: boolean;
    outline?: boolean;
    disabled?: boolean;
};
export default function CButton(prop: CButtonProps): import("react/jsx-runtime").JSX.Element;
