//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CIconButton.tsx"
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
    outline?: boolean;
    disabled?: boolean;
    setColor?: ColorType;
};

export default function CIconButton<Props extends CIconButtonProps>(
    prop: Props,
) {
    const navigate = useNavigate();
    const getSetColorProps = GetSetColorProps();
    const { to, outline, children, onClick } = prop;
    const [pressEffects, setPressEffects] = useState<JSX.Element[]>([]);

    const { props, addPressEffect } = useMemo(() => {
        const props = { ...prop } as Props;
        const fontStyle = getFont("medium");
        const { setColor, disabled } = props;

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
            p: formatSize(((props.size ?? 16) / 16) * 2),
            ...props.cs,
        };

        props.style = { ...fontStyle, ...props.style };

        const addPressEffect = () => {
            const id = v4();
            const size = (props.size ?? 16) * 2;
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
                "children",
                "setColor",
                "onClick",
            ]),
        };
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
