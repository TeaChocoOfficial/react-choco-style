//-Path: "react-choco-style/src/components/hook/CBackdrop.tsx"
import { useMemo } from "react";
import useTheme from "../../theme/useTheme";
import removeProps from "../../function/removeProps";
import useCreateStyle from "../../hook/useCreateClass";
import CreateStyled, { ChocoStyledProps } from "../custom/CreateStyled";

const Backdrop = CreateStyled("div")(({ theme }) => ({
    z: theme.root.zIndex.backdrop,
    b: 0,
    r: 0,
    l: 0,
    t: 0,
    j: "c",
    a: "c",
    dp: "f",
    of: "h",
    pos: "f",
}));

export type CBackdropProps = ChocoStyledProps<"div"> & {
    open?: boolean;
    shadow?: boolean;
    onClose?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CBackdrop<Props extends CBackdropProps>(prop: Props) {
    const createStyle = useCreateStyle();
    const { palette, joinNames } = useTheme();

    const props = useMemo(() => {
        const props: Props = { ...prop };
        const { open, shadow, onClose, onClick } = props;
        const className = createStyle("CBackdrop", {
            trans: 0.3,
            op: open ? 1 : 0,
            event: open ? "a" : "n",
            bgClr: shadow
                ? palette.shadow.dark ?? palette.shadow.main
                : undefined,
        });
        props.className = joinNames(props.className, className);
        props.onClick = (event) => {
            onClose?.(false);
            onClick?.(event);
        };

        return removeProps(props, ["open", "shadow", "onClose"]);
    }, [prop, palette, joinNames, createStyle]);

    return <Backdrop {...props}></Backdrop>;
}
