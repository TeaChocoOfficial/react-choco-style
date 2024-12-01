//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/components/hook/CButton.tsx"
import { v4 } from "uuid";
import { useState } from "react";
import { getFont } from "../custom/font";
import { formatSize } from "../custom/size";
import GetSetColor from "../../hook/GetSetColor";
import { To, useNavigate } from "react-router-dom";
import Styled, { ChocoStyledProps } from "../custom/Styled";
import ChocoStyleToStyle from "../../hook/ChocoStyleToStyle";
import { ColorHexType, ColorsType, ColorType } from "../../types/color";

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
    color?: ColorType;
    lowcase?: boolean;
    outline?: boolean;
    disabled?: boolean;
};

export default function CButton(prop: CButtonProps) {
    const navigate = useNavigate();
    const getSetColor = GetSetColor();
    const fontStyle = getFont("medium");
    const props: CButtonProps = { ...prop };
    const [isHover, setIsHover] = useState(false);
    const [pressEffects, setPressEffects] = useState<JSX.Element[]>([]);
    const {
        to,
        color,
        lowcase,
        outline,
        children,
        disabled,
        onClick,
        onMouseEnter,
        onMouseLeave,
    } = props;
    const buttonColor = getSetColor(color);

    delete props.to;
    delete props.color;
    delete props.lowcase;
    delete props.outline;
    delete props.bgColor;
    delete props.children;
    delete props.onClick;
    delete props.onMouseEnter;
    delete props.onMouseLeave;
    const defaultColor: ColorsType = "text";
    const disabledColor = 88;
    const getColor = (
        color?: ColorsType,
        disabled: number = disabledColor,
    ): ColorsType | undefined =>
        typeof color !== "string"
            ? color
            : (color?.length ?? 0) > 7
            ? color
            : `${color as ColorHexType}${disabled}`;
    if (outline) {
        props.border = {
            size: 2,
            style: "solid",
            color: disabled
                ? getColor(buttonColor?.bgColor)
                : buttonColor?.bgColor ?? defaultColor,
        };
        props.color = (
            disabled
                ? getColor(buttonColor?.bgColor)
                : buttonColor?.bgColor ?? defaultColor
        ) as ColorType;
        props.bgColor = isHover
            ? getColor(buttonColor?.bgHover, disabledColor / 2)
            : null;
    } else {
        props.color = (
            disabled
                ? getColor(buttonColor?.color)
                : buttonColor?.color ?? defaultColor
        ) as ColorType;
        props.bgColor = isHover
            ? buttonColor?.bgHover
            : disabled
            ? getColor(buttonColor?.bgColor)
            : buttonColor?.bgColor;
    }

    const style = ChocoStyleToStyle({
        size: props.size ?? 16,
        py: formatSize(((props.size ?? 16) / 16) * 4),
        px: formatSize(((props.size ?? 16) / 16) * 8),
    });

    const keyframes = `
        @keyframes CButton-ripple {
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
        }
        `;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes);
    props.style = { ...fontStyle, ...style, border: "none", ...props.style };
    if (!lowcase) {
        props.style = {
            textTransform: "uppercase",
            ...props.style,
        };
    }

    function addPressEffect() {
        const id = v4();
        const size = (props.size ?? 16) * 16;
        setPressEffects((prev) => [
            ...prev,
            <Effect
                key={id}
                h={formatSize(size)}
                w={formatSize(size)}
                bgColor={buttonColor?.action}
                style={{
                    animation: "CButton-ripple 0.5s linear forwards",
                }}
            />,
        ]);
        setTimeout(() => {
            setPressEffects((prev) => prev.filter((p) => p.key !== id));
        }, 1000);
    }

    return (
        <Button
            {...props}
            onMouseEnter={(event) => {
                setIsHover(true);
                if (onMouseEnter) {
                    onMouseEnter(event);
                }
            }}
            onMouseLeave={(event) => {
                setIsHover(false);
                if (onMouseLeave) {
                    onMouseLeave(event);
                }
            }}
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
