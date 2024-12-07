//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CBox.tsx"
import styled, { ChocoStyledProps } from "../custom/Styled";

const Box = styled("div")();

export type CBoxProps = ChocoStyledProps<"div">;

export default function CBox<Props extends CBoxProps>(props: Props) {
    return <Box {...props} />;
}
