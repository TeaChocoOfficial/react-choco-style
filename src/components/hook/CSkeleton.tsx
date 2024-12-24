//-Path: "react-choco-style/src/components/hook/CSkeleton.tsx"
import { useMemo } from "react";
import useTheme from "../../theme/useTheme";
import removeProps from "../../function/removeProps";
import useCreateStyle from "../../hook/useCreateClass";
import { applyStyleSheet } from "../../function/styleSheet";
import CreateStyled, { ChocoStyledProps } from "../custom/CreateStyled";

const Skeleton = CreateStyled("div")({
    of: "h",
    pos: "r",
    bgClr: "#ffffff22",
});

export type CSkeletonProps = ChocoStyledProps<"div"> & { circle?: boolean };

export default function CSkeleton<Props extends CSkeletonProps>(prop: Props) {
    const { joinNames } = useTheme();
    const createStyle = useCreateStyle();

    const props = useMemo(() => {
        const props = { ...prop } as Props;
        const { circle } = props;

        applyStyleSheet(`@keyframes CSkeleton {
            from {
                transform: translate(-200%);
            }
            to {
                transform: translate(200%);
            }
        }`);

        const classNameText = createStyle("CSkeleton-text", {
            borR: 2,
            minH: props.style?.fontSize ?? 16,
        });
        const classNameCircle = createStyle("CSkeleton-circle", {
            borR: "50%",
            h: props.size ?? 64,
            w: props.size ?? 64,
        });
        if (circle) {
            props.className = joinNames(props.className, classNameText);
        } else {
            props.className = joinNames(props.className, classNameCircle);
        }

        props.children = (
            <Skeleton
                posA
                t={0}
                l={0}
                w="20vh"
                h="20vh"
                bgClr="#ffffff22"
                style={{
                    boxShadow: "0 0 10vh 10vh #ffffff22",
                    animation: "CSkeleton 2s linear infinite",
                }}
            />
        );

        return removeProps(props, ["circle"]);
    }, [prop]);

    return <Skeleton {...props} />;
}
