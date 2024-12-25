//-Path: "react-choco-style/src/components/hook/CButton.tsx"
import { v4 } from "uuid";
import useFont from "../../hook/useFont";
import { useMemo, useState } from "react";
import useTheme from "../../theme/useTheme";
import { ColorType } from "../../types/color";
import { To, useNavigate } from "react-router-dom";
import { StyleTypes } from "../../types/ChocoStyle";
import removeProps from "../../function/removeProps";
import useCreateStyle from "../../hook/useCreateClass";
import { applyStyleSheet } from "../../function/styleSheet";
import useGetSetColorProps from "../../hook/useGetSetColorProps";
import CreateStyled, { ChocoStyledProps } from "../custom/CreateStyled";
import useFormatSize from "../../hook/useFormatSize";

const Button = CreateStyled(
    "button",
    "CButton",
)(({ formatSize }) => ({
    a: "c",
    j: "c",
    of: "h",
    dp: "if",
    pos: "r",
    animation: 0.3,
    gaps: formatSize(4),
    borR: formatSize(2),
}));

const Effect = CreateStyled(
    "span",
    "CButton-effect",
)({
    op: 0,
    pos: "a",
    borR: "50%",
    pointerEvents: "none",
});

export type CButtonProps = ChocoStyledProps<"button"> & {
    to?: To;
    lowcase?: boolean;
    outline?: boolean;
    container?: boolean;
    setColor?: ColorType;
};

export default function CButton<Props extends CButtonProps>(prop: Props) {
    const { getFont } = useFont();
    const navigate = useNavigate();
    const { joinNames } = useTheme();
    const createStyle = useCreateStyle();
    const { formatSize } = useFormatSize();
    const { to, children, onClick } = prop;
    const getSetColorProps = useGetSetColorProps();
    const [pressEffects, setPressEffects] = useState<JSX.Element[]>([]);

    const { props, addPressEffect } = useMemo(() => {
        const props: Props = { ...prop };
        const fontStyle = getFont("medium");
        const { setColor, container, lowcase, outline, disabled } = props;

        applyStyleSheet(`@keyframes CButton-ripple {
            0% {
                opacity: 0;
                transform: scale(0);
            }
            60% {
                opacity: 0.6;
                transform: scale(2);
            }
            100% {
                opacity: 0;
                transform: scale(3);
            }
        }`);

        let chocoStyle: StyleTypes = {
            ...fontStyle,
            size: props.size ?? 16,
        };

        if (container) {
            chocoStyle = {
                p: formatSize(((props.size ?? 16) / 16) * 4),
                ...chocoStyle,
            };
            props.className = joinNames(
                props.className,
                createStyle("CButton-container", chocoStyle),
            );
        } else {
            chocoStyle = {
                py: formatSize(((props.size ?? 16) / 16) * 4),
                px: formatSize(((props.size ?? 16) / 16) * 8),
                ...chocoStyle,
            };
            props.className = joinNames(
                props.className,
                createStyle("CButton-text", chocoStyle),
            );
        }

        if (!lowcase && !container) {
            props.className = joinNames(
                props.className,
                createStyle("CButton-uppercase", {
                    textTransform: "uppercase",
                }),
            );
        }

        const { styles, setColors } = getSetColorProps({
            outline,
            disabled,
            setColor,
        });

        props.className = joinNames(
            props.className,
            createStyle("CButton", styles),
        );

        const addPressEffect = () => {
            const id = v4();
            const size = (props.size ?? 16) * 4;
            setPressEffects((prev) => [
                ...prev,
                <Effect
                    key={id}
                    h={formatSize(size)}
                    w={formatSize(size)}
                    bgClr={setColors?.action}
                    style={{
                        animation: "CButton-ripple 0.5s linear forwards",
                    }}
                />,
            ]);
            setTimeout(() => {
                setPressEffects((prev) => prev.filter((p) => p.key !== id));
            }, 1000);
        };

        return {
            addPressEffect,
            props: removeProps(props, [
                "to",
                "lowcase",
                "outline",
                "onClick",
                "setColor",
                "children",
                "container",
            ]),
        };
    }, [prop]);

    return (
        <Button
            {...props}
            onClick={(event) => {
                addPressEffect();
                if (to !== undefined) {
                    navigate(to);
                }
                if (onClick) {
                    onClick(event);
                }
            }}>
            {pressEffects}
            {children}
        </Button>
    );
}
