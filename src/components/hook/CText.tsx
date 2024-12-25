//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CText.tsx"
import { useMemo } from "react";
import useFont from "../../hook/useFont";
import useTheme from "../../theme/useTheme";
import removeProps from "../../function/removeProps";
import useCreateStyle from "../../hook/useCreateClass";
import CSkeleton, { CSkeletonProps } from "./CSkeleton";
import CreateStyled, { ChocoStyledProps } from "../custom/CreateStyled";

const Text = CreateStyled("span", "CText")({ size: 16 });

export type CTextProps = ChocoStyledProps<"span"> & { skeleton?: boolean };

export default function CText<Props extends CTextProps>(prop: Props) {
    const { getFont } = useFont();
    const { joinNames } = useTheme();
    const createStyle = useCreateStyle();

    const props = useMemo(() => {
        const fontStyle = getFont();
        const props = { ...prop } as Props;
        const { skeleton } = prop;

        if (skeleton) {
            const className = createStyle("CTextSkeleton", {
                w: "100%",
                h: "1.2em",
            });
            props.className = joinNames(props.className, className);
            return <CSkeleton {...(props as CSkeletonProps)} />;
        } else {
            const className = createStyle("CText", fontStyle);
            props.className = joinNames(props.className, className);
            return removeProps(props, ["skeleton"]);
        }
    }, [prop]);

    return <Text {...props} />;
}
