//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/components/hook/Ccontainer.tsx"
import { getFont } from "../custom/font";
import { useTheme } from "../../theme/useTheme";
import Styled, { ChocoStyledProps } from "../custom/Styled";

const Container = Styled("div")({
    py: 8,
    borR: 2,
    pos: "r",
    px: "5%",
    w: { m: "100%", l: 1024 },
});

export type CContainerProps = ChocoStyledProps<"div"> & {
    content?: "main" | "header" | "content";
};

export default function CContainer(prop: CContainerProps) {
    const props = { ...prop };
    const { palette } = useTheme();
    const { content } = props;
    delete props.content;
    switch (content) {
        case undefined:
        case "main":
            props.cs = {
                p: 0,
                mx: "auto",
                ...props.cs,
            };
            break;
        case "header":
            const styleFontHeader = getFont("medium");
            props.cs = {
                a: "c",
                dp: "f",
                size: 32,
                text: "c",
                bgColor: `${palette.background.default}88`,
                ...props.cs,
            };
            props.style = {
                ...styleFontHeader,
                textTransform: "capitalize",
                boxShadow: `0px 10px 13px -6px ${palette.shadow.main},0px 20px 31px 3px ${palette.shadow.main}),0px 8px 38px 7px ${palette.shadow.main}`,
                ...props.style,
            };
            break;
        case "content":
            const styleFontContent = getFont();
            props.cs = {
                size: 16,
                bgColor: `${palette.background.paper}44`,
                ...props.cs,
            };
            props.style = {
                ...styleFontContent,
                boxShadow: `0px 10px 13px -6px ${palette.shadow.main},0px 20px 31px 3px ${palette.shadow.main}),0px 8px 38px 7px ${palette.shadow.main}`,
                ...props.style,
            };
            break;
    }
    return <Container {...props} />;
}
