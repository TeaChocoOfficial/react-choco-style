//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CContainer.tsx"
import { useMemo } from "react";
import { getFont } from "../custom/font";
import useTheme from "../../theme/useTheme";
import { formatSize } from "../custom/size";
import removeProps from "../../hook/removeProps";
import Styled, { ChocoStyledProps } from "../custom/Styled";

const Container = Styled("div")({
    borR: 2,
    pos: "r",
    px: "5%",
    py: formatSize(8),
    w: { v: "100%", l: 1024 },
});

export type CContainerContents = "main" | "header" | "content";

export type CContainerMainProps = {
    content: "main";
    fullWidth?: boolean;
};
export type CContainerHeaderProps = {
    content: "header";
    back?: string;
    hiddle?: boolean;
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

export default function CContainer<Props extends CContainerProp>(prop: Props) {
    const { palette } = useTheme();

    const props = useMemo(() => {
        const getProps = (prop: Props) => {
            if (prop.content === "main") {
                const props = { ...prop } as CContainerProps<"main">;
                const { fullWidth } = props;
                props.cs = {
                    ...props.cs,
                    p: 0,
                    a: "c",
                    j: "c",
                    dp: "f",
                    fd: "c",
                    gap: formatSize(1),
                };
                if (fullWidth) {
                    props.cs.w = "100%";
                } else {
                    props.cs.mx = "auto";
                }
                return removeProps(props, ["fullWidth"]);
            } else if (prop.content === "header") {
                const props = { ...prop } as CContainerProps<"header">;
                const { hiddle } = props;
                const styleFontHeader = getFont("medium");
                props.cs = {
                    a: "c",
                    size: 32,
                    text: "c",
                    bgColor: hiddle
                        ? undefined
                        : `${palette.background.default}88`,
                    ...props.cs,
                };
                props.style = {
                    ...styleFontHeader,
                    textTransform: "capitalize",
                    boxShadow: hiddle
                        ? undefined
                        : `0px 10px 13px -6px ${palette.shadow.main},0px 20px 31px 3px ${palette.shadow.main}),0px 8px 38px 7px ${palette.shadow.main}`,
                    ...props.style,
                };
                return removeProps(props, ["hiddle", "back"]);
            } else {
                const props = { ...prop } as CContainerProps<"content">;
                const { hiddle } = props;
                const styleFontContent = getFont();
                props.cs = {
                    size: 16,
                    bgColor: hiddle
                        ? undefined
                        : `${palette.background.paper}44`,
                    ...props.cs,
                };
                props.style = {
                    ...styleFontContent,
                    boxShadow: hiddle
                        ? undefined
                        : `0px 10px 13px -6px ${palette.shadow.main},0px 20px 31px 3px ${palette.shadow.main}),0px 8px 38px 7px ${palette.shadow.main}`,
                    ...props.style,
                };
                return removeProps(props, ["hiddle"]);
            }
        };

        const props = getProps(prop);

        return removeProps(props, ["content"]);
    }, [prop, palette]);

    return <Container {...props} />;
}
