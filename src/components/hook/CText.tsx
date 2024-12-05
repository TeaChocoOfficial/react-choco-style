//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CText.tsx"
import { useMemo } from "react";
import { getFont } from "../custom/font";
import CSkeleton, { CSkeletonProps } from "./CSkeleton";
import Styled, { ChocoStyledProps } from "../custom/Styled";

const Text = Styled("span")({ size: 16 });

export type CTextProps = ChocoStyledProps<"span"> & { skeleton?: boolean };

export default function CText(prop: CTextProps) {
    const props = useMemo(() => {
        const props = { ...prop };
        const { skeleton } = prop;
        delete props.skeleton;
        if (skeleton) {
            props.cs = { w: "100%", h: "1.2em", ...props.cs };
            return <CSkeleton {...(props as CSkeletonProps)} />;
        }
        props.style = { ...props.style, ...getFont() };

        return props;
    }, [prop]);
    
    return <Text {...props} />;
}
