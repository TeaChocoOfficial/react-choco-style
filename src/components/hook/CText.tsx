//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/hook/CText.tsx"
import { getFont } from "../custom/font";
import Styled, { ChocoStyledProps } from "../custom/Styled";

const Text = Styled("p")();

export default function CText(prop: ChocoStyledProps<"p">) {
    const style = getFont();
    const props = { ...prop };
    props.style = { ...props.style, ...style };
    return <Text {...props} />;
}
