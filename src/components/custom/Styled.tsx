//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/custom/Styled.tsx"
import {
    formatSize,
    callbackSize,
    FormatSizeType,
    CallbackSizeType,
} from "./size";
import { useMemo, useRef } from "react";
import {
    ChocoStyleType,
    ChocoStyleTypes,
    ChocoStylePropsType,
} from "../../types/ChocoStyle";
import useTheme from "../../theme/useTheme";
import { UseChocoThemeType } from "../../types/theme";
import ChocoStyleToStyle from "../../hook/ChocoStyleToStyle";
import chocoPropsToChocoStyle from "../../hook/chocoPropsToChocoStyle";
import { keysChocoStyle, keysChocoStyleProps } from "../data/reservedKeywords";

export type ChocoStyledProps<
    Tag extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
> = ChocoStylePropsType<Tag> & React.ComponentPropsWithoutRef<Tag>;

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
            const theme = useTheme();
            const tagRef = useRef<React.ElementRef<Tag>>(null);
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
                    ...props.style,
                    ...css,
                };

                const prop: Prop = { ...props, style };
                return removeReservedProps(keysChocoStyleProps, prop);
            }, [customStyles, props, tag, theme]);

            const Tag = tag as React.ElementType;
            return (
                <Tag ref={props.useRef ? props.useRef : tagRef} {...newProps} />
            );
        };
    };
}
