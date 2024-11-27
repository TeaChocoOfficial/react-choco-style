//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/custom/Styled.tsx"
import {
    ChocoStyleType,
    ChocoStyleTypes,
    ChocoStylePropsType,
} from "../../types/ChocoStyle";
import { useTheme } from "../../theme/useTheme";
import { UseChocoThemeType } from "../../types/theme";
import ChocoStyleToStyle from "../../hook/ChocoStyleToStyle";
import chocoPropsToChocoStyle from "../../hook/chocoPropsToChocoStyle";
import { keysChocoStyle, keysChocoStyleProps } from "../data/reservedKeywords";

export type ChocoStyledProps<
    Tag extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
> = ChocoStylePropsType & React.ComponentPropsWithoutRef<Tag>;

type CustomTheme = ChocoStyleType | React.CSSProperties;

export function removeReservedProps(reservedKeywords: string[], props?: any) {
    return reservedKeywords.reduce((acc, keyword) => {
        if (props[keyword] !== undefined) {
            delete acc[keyword];
        }
        return acc;
    }, props);
}

export default function Styled<
    Tag extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    Prop extends React.ComponentPropsWithoutRef<Tag>,
    Props extends ChocoStylePropsType & Prop,
>(tag: Tag) {
    return (
        customStyles?:
            | (({ theme }: { theme: UseChocoThemeType }) => CustomTheme)
            | CustomTheme,
    ) => {
        return (props: Props) => {
            const theme = useTheme();

            const customStyleProps =
                (customStyles && typeof customStyles === "function"
                    ? customStyles({ theme })
                    : customStyles) ?? {};
            const customStyle: React.CSSProperties = { ...customStyleProps };
            const customChocoStyle = keysChocoStyle.reduce<ChocoStyleTypes>(
                (acc, key) => {
                    if (
                        (customStyleProps as ChocoStyleTypes)[key] !== undefined
                    ) {
                        acc[key] = (customStyleProps as ChocoStyleTypes)[key];
                        delete customStyle[key as keyof React.CSSProperties];
                    }
                    return acc;
                },
                {},
            ) as ChocoStyleType;

            const { cs } = props;
            const chocoStyle = chocoPropsToChocoStyle(props);
            const css = ChocoStyleToStyle({
                ...customChocoStyle,
                ...chocoStyle,
                ...cs,
            });

            const style: React.CSSProperties = {
                ...customStyle,
                ...props.style,
                ...css,
            };
            console.log(css, customChocoStyle);

            const prop: Prop = { ...props, style };

            const newProps = removeReservedProps(keysChocoStyleProps, prop);
            const Tag = tag as React.ElementType;
            return <Tag {...newProps} />;
        };
    };
}
