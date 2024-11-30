//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/hook/CBox.tsx"
import styled, { ChocoStyledProps } from "../custom/Styled";

const Box = styled("div")();

export type CBoxProps = ChocoStyledProps<"div">;

export default function CBox(props: CBoxProps) {
    return <Box {...props} />;
}
