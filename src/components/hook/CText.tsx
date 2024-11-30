//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/hook/CText.tsx"
import CSkeleton from "./CSkeleton";
import { getFont } from "../custom/font";
import Styled, { ChocoStyledProps } from "../custom/Styled";

const Text = Styled("span")();

export type CTextProps = ChocoStyledProps<"span"> & { skeleton?: boolean };

export default function CText(prop: CTextProps) {
    const style = getFont();
    const props = { ...prop };
    const { skeleton } = prop;
    delete props.skeleton;
    if (skeleton) {
        props.cs = { w: "100%", h: "1.2em", ...props.cs };
        return <CSkeleton {...props} />;
    }
    props.style = { ...props.style, ...style };
    return <Text {...props} />;
}
