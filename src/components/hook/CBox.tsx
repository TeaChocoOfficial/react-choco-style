//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/hook/CBox.tsx"
import styled, { ChocoStyledProps } from "../custom/Styled";

const Box = styled("div")();

export default function CBox(props: ChocoStyledProps<"div">) {
    return <Box {...props} />;
}
