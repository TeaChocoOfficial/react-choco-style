//-Path: "react-choco-style/src/components/custom/CreateStyled.tsx"
import {
    formatSize,
    callbackSize,
    FormatSizeType,
    CallbackSizeType,
} from "../../function/size";
import {
    StyleTypes,
    ChocoStyleType,
    ChocoStylePropsType,
} from "../../types/ChocoStyle";
import { useMemo } from "react";
import useTheme from "../../theme/useTheme";
import { UseChocoThemeType } from "../../types/theme";
import useCreateStyle from "../../hook/useCreateClass";
import { keysChocoStyleProps } from "../data/reservedKeywords";
import chocoPropsToChocoStyle from "../../function/chocoPropsToChocoStyle";

export type CustomTheme = ChocoStyleType | React.CSSProperties;

export type ChocoStyledProps<
    Tag extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    Prop extends React.ComponentPropsWithoutRef<Tag> = React.ComponentPropsWithoutRef<Tag>,
    Props extends ChocoStylePropsType<Tag> & Prop = ChocoStylePropsType<Tag> &
        Prop,
> = Props;

export type CustomStylesType<
    Papram extends object = {},
    ReturnType = StyleTypes,
> = ({
    theme,
    formatSize,
    callbackSize,
}: {
    theme: UseChocoThemeType;
    formatSize: FormatSizeType;
    callbackSize: CallbackSizeType;
} & Papram) => ReturnType;

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

export default function CreateStyled<
    TagType extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    Prop extends React.ComponentPropsWithoutRef<TagType>,
    Props extends ChocoStylePropsType<TagType> & Prop,
    CustomStyles extends CustomStylesType<{ tag: TagType; props: Props }>,
>(tag: TagType, nameTag?: string) {
    return (customStyles?: CustomStyles | StyleTypes) => {
        return (props: Props) => {
            const theme = useTheme();
            const Tag = tag as React.ElementType;
            const createStyle = useCreateStyle();

            const newProps = useMemo(() => {
                const Name = nameTag ? `${tag}-${nameTag}` : `${tag}`;
                const getCustomStyleProps = (): StyleTypes => {
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
                const { cs } = props;
                const chocoStyleProps = chocoPropsToChocoStyle(props);

                const csClassName = createStyle(`cs-${Name}`, cs ?? {}, 1);
                const propClassName = createStyle(
                    `props-${Name}`,
                    chocoStyleProps,
                    2,
                );
                const customClassName = createStyle(
                    `custom-${Name}`,
                    customStyleProps,
                );
                // console.log(customClassName);
                const className = [
                    props.className,
                    customClassName,
                    propClassName,
                    csClassName,
                ].join(" ");

                const prop: Prop = { ...props, className };
                return removeReservedProps(keysChocoStyleProps, prop);
            }, [customStyles, props]);

            if (typeof tag === "string") {
                return (
                    <Tag
                        ref={(ref: TagType) => newProps?.useRef?.(ref)}
                        {...newProps}
                    />
                );
            }

            return <Tag {...newProps} />;
        };
    };
}

//TODO: chage style to className (New Idea)
