//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CIconButton.tsx"
import { v4 } from "uuid";
import { getFont } from "../../function/font";
import { useMemo, useState } from "react";
import useTheme from "../../theme/useTheme";
import { formatSize } from "../../function/size";
import { ColorType } from "../../types/color";
import { To, useNavigate } from "react-router-dom";
import removeProps from "../../function/removeProps";
import useCreateStyle from "../../hook/useCreateClass";
import { applyStyleSheet } from "../../function/styleSheet";
import useGetSetColorProps from "../../hook/useGetSetColorProps";
import CreateStyled, { ChocoStyledProps } from "../custom/CreateStyled";

const IconButton = CreateStyled(
    "button",
    "CIconButton",
)({
    a: "c",
    j: "c",
    of: "h",
    dp: "if",
    pos: "r",
    borR: "50%",
    animation: 0.3,
});

const Effect = CreateStyled(
    "span",
    "CIconButton-effect",
)({
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
    const { joinNames } = useTheme();
    const createStyle = useCreateStyle();
    const { to, children, onClick } = prop;
    const getSetColorProps = useGetSetColorProps();
    const [pressEffects, setPressEffects] = useState<JSX.Element[]>([]);

    const { props, addPressEffect } = useMemo(() => {
        const props = { ...prop } as Props;
        const fontStyle = getFont("medium");
        const { setColor, disabled, outline } = props;

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

        props.className = joinNames(
            props.className,
            createStyle("CIconButton", {
                ...fontStyle,
                size: props.size ?? 16,
                p: formatSize(((props.size ?? 16) / 16) * 2),
            }),
        );

        const { styles, setColors } = getSetColorProps({
            outline,
            disabled,
            setColor,
        });

        props.className = joinNames(
            props.className,
            createStyle("CIconButton", styles),
        );

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
                onClick?.(event);
                if (to !== undefined) {
                    navigate(to);
                }
            }}>
            {pressEffects}
            {children}
        </IconButton>
    );
}
