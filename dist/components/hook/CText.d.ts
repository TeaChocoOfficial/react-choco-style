import { ChocoStyledProps } from "../custom/Styled";
export type CTextProps = ChocoStyledProps<"span"> & {
    skeleton?: boolean;
};
export default function CText(prop: CTextProps): import("react/jsx-runtime").JSX.Element;
