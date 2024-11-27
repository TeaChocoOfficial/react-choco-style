import { ChocoStyleType, ChocoStylePropsType } from "../../types/ChocoStyle";
import { UseChocoThemeType } from "../../types/theme";
export type ChocoStyledProps<Tag extends keyof JSX.IntrinsicElements | React.ComponentType<any>> = ChocoStylePropsType & React.ComponentPropsWithoutRef<Tag>;
type CustomTheme = ChocoStyleType | React.CSSProperties;
export declare function removeReservedProps(reservedKeywords: string[], props?: any): any;
export default function Styled<Tag extends keyof JSX.IntrinsicElements | React.ComponentType<any>, Prop extends React.ComponentPropsWithoutRef<Tag>, Props extends ChocoStylePropsType & Prop>(tag: Tag): (customStyles?: (({ theme }: {
    theme: UseChocoThemeType;
}) => CustomTheme) | CustomTheme) => (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
