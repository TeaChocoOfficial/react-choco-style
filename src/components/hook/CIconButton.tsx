//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CIconButton.tsx"
import { v4 } from "uuid";
import { getFont } from "../custom/font";
import { useMemo, useState } from "react";
import { formatSize } from "../custom/size";
import GetSetColor from "../../hook/GetSetColor";
import { To, useNavigate } from "react-router-dom";
import Styled, { ChocoStyledProps } from "../custom/Styled";
import ChocoStyleToStyle from "../../hook/ChocoStyleToStyle";
import { ColorHexType, ColorsType, ColorType } from "../../types/color";
import ChocoStyleSheets, { applyStyleSheet } from "../custom/StyleSheets";

const IconButton = Styled("button")({
    a: "c",
    j: "c",
    of: "h",
    dp: "if",
    pos: "r",
    borR: "50%",
    animation: 0.3,
});

const Effect = Styled("span")({
    op: 0,
    pos: "a",
    borR: "50%",
    pointerEvents: "none",
});

export type CIconButtonProps = ChocoStyledProps<"button"> & {
    to?: To;
    color?: ColorType;
    disabled?: boolean;
};

export default function CIconButton(prop: CIconButtonProps) {
    const navigate = useNavigate();
    const getSetColor = GetSetColor();
    const { to, children, onClick } = prop;
    const chocoStyleSheets = ChocoStyleSheets();
    const chocoStyleToStyle = ChocoStyleToStyle();
    const [pressEffects, setPressEffects] = useState<JSX.Element[]>([]);

    const { props, addPressEffect } = useMemo(() => {
        const fontStyle = getFont("medium");
        const defaultColor: ColorsType = "text";
        const props: CIconButtonProps = { ...prop };
        const { color, disabled } = props;
        const buttonColor = getSetColor(color ?? defaultColor);

        delete props.to;
        delete props.color;
        delete props.bgColor;
        delete props.children;
        delete props.onClick;
        delete props.onMouseEnter;
        delete props.onMouseLeave;
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

        props.color = (
            disabled
                ? getColor(buttonColor?.color)
                : buttonColor?.color ?? defaultColor
        ) as ColorType;
        props.className = chocoStyleSheets({
            bgColor: disabled
                ? getColor(buttonColor?.bgColor)
                : buttonColor?.bgColor,
            ":hover": {
                bgColor: disabled ? undefined : buttonColor?.bgHover,
            },
        });

        const style = chocoStyleToStyle({
            size: props.size ?? 16,
            p: formatSize(((props.size ?? 16) / 16) * 2),
        });

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

        props.style = {
            ...fontStyle,
            ...style,
            border: "none",
            ...props.style,
        };

        const addPressEffect = () => {
            const id = v4();
            const size = (props.size ?? 16) * 2;
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
        };

        return { props, addPressEffect };
    }, [prop]);

    return (
        <IconButton
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
        </IconButton>
    );
}
