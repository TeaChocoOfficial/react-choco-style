//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/hook/CSkeleton.tsx"
import Styled, { ChocoStyledProps } from "../custom/Styled";

const Skeleton = Styled("div")();

export default function CSkeleton(props: ChocoStyledProps<"div">) {
    return <Skeleton {...props} />;
}
