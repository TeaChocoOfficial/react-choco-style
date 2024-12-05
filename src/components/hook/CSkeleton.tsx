//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CSkeleton.tsx"
import { useMemo } from "react";
import { applyStyleSheet } from "../custom/StyleSheets";
import Styled, { ChocoStyledProps } from "../custom/Styled";

const Skeleton = Styled("div")({
    of: "h",
    pos: "r",
    bgColor: "#ffffff22",
});

export type CSkeletonProps = ChocoStyledProps<"div"> & {
    circle?: boolean;
};

export default function CSkeleton(prop: CSkeletonProps) {
    const props = useMemo(() => {
        const props = { ...prop };
        const { circle } = props;

        delete props.circle;

        const textSc = {
            borR: 2,
            minH: props.style?.fontSize ?? 16,
        };
        const circleSc = {
            borR: "50%",
            h: props.size ?? 64,
            w: props.size ?? 64,
        };

        if (circle) {
            props.cs = { ...props.cs, ...circleSc };
        } else {
            props.cs = { ...props.cs, ...textSc };
        }

        applyStyleSheet(`@keyframes CSkeleton {
            from {
                transform: translate(-200%);
            }
            to {
                transform: translate(200%);
            }
        }`);

        props.children = (
            <Skeleton
                posA
                t={0}
                l={0}
                w="20vh"
                h="20vh"
                bgColor="#ffffff22"
                style={{
                    boxShadow: "0 0 10vh 10vh #ffffff22",
                    animation: "CSkeleton 2s linear infinite",
                }}
            />
        );
        return props;
    }, [prop]);

    return <Skeleton {...props} />;
}
