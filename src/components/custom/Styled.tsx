//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/custom/Styled.tsx"
import {
    formatSize,
    callbackSize,
    FormatSizeType,
    CallbackSizeType,
} from "./size";
import {
    ChocoStyleType,
    ChocoStyleTypes,
    ChocoStylePropsType,
} from "../../types/ChocoStyle";
import { useMemo } from "react";
import useTheme from "../../theme/useTheme";
import { UseChocoThemeType } from "../../types/theme";
import ChocoStyleToStyle from "../../hook/ChocoStyleToStyle";
import chocoPropsToChocoStyle from "../../hook/chocoPropsToChocoStyle";
import { keysChocoStyle, keysChocoStyleProps } from "../data/reservedKeywords";

export type ChocoStyledProps<
    Tag extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    Prop extends React.ComponentPropsWithoutRef<Tag> = React.ComponentPropsWithoutRef<Tag>,
    Props extends ChocoStylePropsType<Tag> & Prop = ChocoStylePropsType<Tag> &
        Prop,
> = Props;

export type CustomTheme = ChocoStyleType | React.CSSProperties;

export function removeReservedProps<Props extends Record<string, any>>(
    reservedKeywords: string[],
    props?: Props,
) {
    return reservedKeywords.reduce((acc, keyword) => {
        if (props?.[keyword] !== undefined) {
            delete acc?.[keyword];
        }
        return acc;
    }, props);
}

export default function Styled<
    Tag extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    Prop extends React.ComponentPropsWithoutRef<Tag>,
    Props extends ChocoStylePropsType<Tag> & Prop,
    CustomStyles extends ({
        tag,
        props,
        theme,
        formatSize,
        callbackSize,
    }: {
        tag: Tag;
        props: Props;
        theme: UseChocoThemeType;
        formatSize: FormatSizeType;
        callbackSize: CallbackSizeType;
    }) => CustomTheme,
>(tag: Tag) {
    return (customStyles?: CustomStyles | CustomTheme) => {
        return (props: Props) => {
            const Tag = tag as React.ElementType;
            const theme = useTheme();
            const chocoStyleToStyle = ChocoStyleToStyle();
            const newProps = useMemo(() => {
                const getCustomStyleProps = (): CustomTheme => {
                    if (customStyles && typeof customStyles === "function") {
                        return customStyles({
                            tag,
                            props,
                            theme,
                            formatSize,
                            callbackSize,
                        });
                    } else {
                        return customStyles ?? {};
                    }
                };
                const customStyleProps = getCustomStyleProps();
                const customStyle = {
                    ...customStyleProps,
                } as React.CSSProperties;
                const customChocoStyle = keysChocoStyle.reduce<ChocoStyleTypes>(
                    (acc, key) => {
                        if (
                            (customStyleProps as ChocoStyleTypes)[key] !==
                            undefined
                        ) {
                            acc[key] = (customStyleProps as ChocoStyleTypes)[
                                key
                            ] as ChocoStyleTypes[keyof ChocoStyleTypes[typeof key]];
                            delete customStyle[
                                key as keyof React.CSSProperties
                            ];
                        }
                        return acc;
                    },
                    {},
                ) as ChocoStyleType;

                const { cs } = props;

                const chocoStyle = chocoPropsToChocoStyle(props);
                const css = chocoStyleToStyle({
                    ...customChocoStyle,
                    ...chocoStyle,
                    ...cs,
                });

                const style: React.CSSProperties = {
                    ...customStyle,
                    ...css,
                    ...props.style,
                };

                const prop: Prop = { ...props, style };

                return removeReservedProps(keysChocoStyleProps, prop);
            }, [customStyles, props, tag, theme]);

            if (typeof tag === "string") {
                return (
                    <Tag
                        ref={(ref: Tag) => newProps?.useRef?.(ref)}
                        {...newProps}
                    />
                );
            }

            return <Tag {...newProps} />;
        };
    };
}
