//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/components/hook/CButton.tsx"
import { useState } from "react";
import { getFont } from "../custom/font";
import { formatSize } from "../custom/size";
import GetSetColor from "../../hook/GetSetColor";
import { To, useNavigate } from "react-router-dom";
import Styled, { ChocoStyledProps } from "../custom/Styled";
import ChocoStyleToStyle from "../../hook/ChocoStyleToStyle";
import { ColorHexType, ColorsType, ColorType } from "../../types/color";

const Button = Styled("button")();
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
    const [isAnimating, setIsAnimating] = useState(false);
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
        a: "c",
        j: "c",
        of: "h",
        dp: "if",
        pos: "r",
        animation: 0.3,
        gap: formatSize(4),
        borR: formatSize(2),
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
            70% {
                opacity: 0.6;
                transform: scale(2);
            }
            100% {
                opacity: 0;
                transform: scale(2);
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
                setIsAnimating(false);
                setTimeout(() => {
                    setIsAnimating(true);
                }, 1);
                if (to !== undefined) {
                    navigate(to);
                }
                if (onClick) {
                    onClick(event);
                }
            }}>
            {children}
            <Effect
                bgColor={buttonColor?.action}
                h={formatSize((props.size ?? 16) * 8)}
                w={formatSize((props.size ?? 16) * 8)}
                style={{
                    animation: isAnimating
                        ? "CButton-ripple 0.5s linear forwards"
                        : "",
                }}
            />
        </Button>
    );
}
