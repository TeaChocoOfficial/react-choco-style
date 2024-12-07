//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CButton.tsx"
import { v4 } from "uuid";
import { getFont } from "../custom/font";
import { useMemo, useState } from "react";
import { formatSize } from "../custom/size";
import { ColorType } from "../../types/color";
import { To, useNavigate } from "react-router-dom";
import { applyStyleSheet } from "../custom/StyleSheets";
import GetSetColorProps from "../../hook/GetSetColorProps";
import Styled, { ChocoStyledProps } from "../custom/Styled";
import removeProps from "../../hook/removeProps";

const Button = Styled("button")({
    a: "c",
    j: "c",
    of: "h",
    dp: "if",
    pos: "r",
    animation: 0.3,
    gap: formatSize(4),
    borR: formatSize(2),
});

const Effect = Styled("span")({
    op: 0,
    pos: "a",
    borR: "50%",
    pointerEvents: "none",
});

export type CButtonProps = ChocoStyledProps<"button"> & {
    to?: To;
    lowcase?: boolean;
    outline?: boolean;
    setColor?: ColorType;
};

export default function CButton<Props extends CButtonProps>(prop: Props) {
    const navigate = useNavigate();
    const { to, children, onClick } = prop;
    const getSetColorProps = GetSetColorProps();
    const [pressEffects, setPressEffects] = useState<JSX.Element[]>([]);

    const { props, addPressEffect } = useMemo(() => {
        const props: Props = { ...prop };
        const fontStyle = getFont("medium");
        const { setColor, lowcase, outline, disabled } = props;

        applyStyleSheet(`@keyframes CButton-ripple {
            0% {
                opacity: 0;
                transform: scale(0);
            }
            60% {
                opacity: 0.6;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(1.2);
            }
        }`);

        const { className, setColors } = getSetColorProps({
            outline,
            disabled,
            setColor,
        });

        props.className = className;

        props.cs = {
            size: props.size ?? 16,
            py: formatSize(((props.size ?? 16) / 16) * 4),
            px: formatSize(((props.size ?? 16) / 16) * 8),
            ...props.cs,
        };

        props.style = { ...fontStyle, ...props.style };
        if (!lowcase) {
            props.style = {
                textTransform: "uppercase",
                ...props.style,
            };
        }

        const addPressEffect = () => {
            const id = v4();
            const size = (props.size ?? 16) * 16;
            setPressEffects((prev) => [
                ...prev,
                <Effect
                    key={id}
                    h={formatSize(size)}
                    w={formatSize(size)}
                    bgColor={setColors?.action}
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
                "setColor",
                "children",
                "onClick",
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
