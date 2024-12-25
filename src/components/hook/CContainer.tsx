//-Path: "react-choco-style/src/components/hook/CContainer.tsx"
import CBox from "./CBox";
import { useMemo } from "react";
import Icon from "../custom/Icon";
import useFont from "../../hook/useFont";
import CIconButton from "./CIconButton";
import useTheme from "../../theme/useTheme";
import { StyleTypes } from "../../types/ChocoStyle";
import removeProps from "../../function/removeProps";
import useFormatSize from "../../hook/useFormatSize";
import useCreateStyle from "../../hook/useCreateClass";
import CreateStyled, { ChocoStyledProps } from "../custom/CreateStyled";

const Container = CreateStyled(
    "div",
    "CContainer",
)(({ formatSize }) => ({
    borR: 2,
    pos: "r",
    px: "5%",
    py: formatSize(6),
    w: { v: "100%", l: 1024 },
}));

export type CContainerContents = "main" | "header" | "content";

export type CContainerMainProps = {
    content: "main";
    fullWidth?: boolean;
};
export type CContainerHeaderProps = {
    content: "header";
    back?: string;
    hiddle?: boolean;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
};
export type CContainerContentProps = {
    content?: "content";
    hiddle?: boolean;
};

export type CContainerProp = ChocoStyledProps<"div"> &
    (CContainerMainProps | CContainerHeaderProps | CContainerContentProps);

export type CContainerProps<Content extends CContainerContents = "content"> =
    ChocoStyledProps<"div"> &
        (Content extends "main"
            ? CContainerMainProps
            : Content extends "header"
            ? CContainerHeaderProps
            : CContainerContentProps);

export function CContainerMain<Props extends CContainerProps<"main">>(
    prop: Props,
) {
    const { joinNames } = useTheme();
    const createStyle = useCreateStyle();
    const { formatSize } = useFormatSize();

    const props = useMemo(() => {
        const props = { ...prop } as CContainerProps<"main">;
        const { fullWidth } = props;

        const styles: StyleTypes = {
            p: 0,
            a: "c",
            j: "c",
            dp: "f",
            fd: "c",
            gaps: formatSize(1),
        };
        if (fullWidth) {
            styles.w = "100%";
        } else {
            styles.mx = "auto";
        }
        const className = createStyle("CContainerMain", styles);
        props.className = joinNames(props.className, className);
        return removeProps(props, ["content", "fullWidth"]);
    }, [prop]);

    return <Container {...props} />;
}

export function CContainerHeader<Props extends CContainerProps<"header">>(
    prop: Props,
) {
    const { getFont } = useFont();
    const createStyle = useCreateStyle();
    const { palette, joinNames } = useTheme();

    const props = useMemo(() => {
        const props = { ...prop } as CContainerProps<"header">;
        const { hiddle } = props;
        const styleFontHeader = getFont("medium");

        const className = createStyle("CContainerHeader", {
            ...styleFontHeader,
            a: "c",
            dp: "f",
            size: 32,
            text: "c",
            textTransform: "capitalize",
            bgClr: hiddle ? undefined : `${palette.background.default}88`,
            boxShadow: hiddle
                ? undefined
                : `0px 10px 13px -6px ${palette.shadow.main},0px 20px 31px 3px ${palette.shadow.main}),0px 8px 38px 7px ${palette.shadow.main}`,
        });
        props.className = joinNames(props.className, className);
        return removeProps(props, [
            "back",
            "hiddle",
            "content",
            "children",
            "leftContent",
            "rightContent",
        ]);
    }, [prop, palette]);

    return (
        <Container {...props}>
            {(prop.leftContent || prop.back) && (
                <CBox posA l={50}>
                    <CIconButton to={prop.back} setColor="text">
                        <Icon fa="faLeftLong" />
                    </CIconButton>
                    {prop.leftContent}
                </CBox>
            )}
            {prop.children}
            {prop.rightContent && (
                <CBox posA r={50}>
                    {prop.rightContent}
                </CBox>
            )}
        </Container>
    );
}
export function CContainerContent<Props extends CContainerProps<"content">>(
    prop: Props,
) {
    const { getFont } = useFont();
    const createStyle = useCreateStyle();
    const { palette, joinNames } = useTheme();

    const props = useMemo(() => {
        const props = { ...prop } as CContainerProps<"content">;
        const { hiddle } = props;
        const styleFontContent = getFont();
        const className = createStyle("CContainerContent", {
            ...styleFontContent,
            size: 16,
            bgClr: hiddle ? undefined : `${palette.background.paper}44`,
            boxShadow: hiddle
                ? undefined
                : `0px 10px 13px -6px ${palette.shadow.main},0px 20px 31px 3px ${palette.shadow.main}),0px 8px 38px 7px ${palette.shadow.main}`,
        });
        props.className = joinNames(props.className, className);
        return removeProps(props, ["content", "hiddle"]);
    }, [prop, palette]);

    return <Container {...props} />;
}

export default function CContainer<Props extends CContainerProp>(prop: Props) {
    switch (prop.content) {
        case "main":
            return <CContainerMain {...prop} />;
        case "header":
            return <CContainerHeader {...prop} />;
        default:
            return <CContainerContent {...prop} />;
    }
}
