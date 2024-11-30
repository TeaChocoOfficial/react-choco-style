//-Path: "react-choco-style/src/components/hook/CButton.tsx"
import { useState } from "react";
import { formatSize } from "../custom/size";
import GetSetColor from "../../hook/GetSetColor";
import Styled, { ChocoStyledProps } from "../custom/Styled";

const Button = Styled("button")();
const Effect = Styled("span")({
    op: 0,
    pos: "a",
    borR: "50%",
    pointerEvents: "none",
});

export type CButtonProps = ChocoStyledProps<"button"> & { lowcase?: boolean };

export default function CButton(prop: CButtonProps) {
    const props = { ...prop };
    const getSetColor = GetSetColor();
    const [isHover, setIsHover] = useState(false);
    const { color, lowcase, onClick, children } = props;
    const [isAnimating, setIsAnimating] = useState(false);
    const buttonColor = getSetColor(color);

    delete props.color;
    delete props.lowcase;
    delete props.bgColor;
    delete props.onClick;
    delete props.children;
    props.color = buttonColor?.color ?? "text";
    props.bgColor = isHover ? buttonColor?.bgHover : buttonColor?.bgColor;

    props.cs = {
        a: "c",
        j: "c",
        of: "h",
        dp: "if",
        pos: "r",
        animation: 0.3,
        py: formatSize(((props.size ?? 16) / 16) * 4),
        px: formatSize(((props.size ?? 16) / 16) * 8),
        size: props.size ?? 16,
        borR: formatSize(2),
        ...props.cs,
    };

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
    props.style = { border: "none", ...props.style };
    if (!lowcase) {
        props.style = {
            textTransform: "uppercase",
            ...props.style,
        };
    }

    return (
        <Button
            {...props}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={(event) => {
                if (onClick) {
                    onClick(event);
                }
                setIsAnimating(false);
                setTimeout(() => {
                    setIsAnimating(true);
                }, 1);
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
