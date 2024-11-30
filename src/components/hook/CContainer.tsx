//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/components/hook/Ccontainer.tsx"
import { styled } from "@mui/material";
import { ChocoStyledProps } from "../custom/Styled";

const Container = styled("div")();

export type CContainerProps = ChocoStyledProps<"div"> & {
    content?: "main";
};

export default function CContainer(prop: CContainerProps) {
    const props = { ...prop };
    return <Container {...props} />;
}
