//-Path: "react-choco-style/src/components/hook/CBox.tsx"
import { useMemo } from "react";
import useTheme from "../../theme/useTheme";
import removeProps from "../../function/removeProps";
import useCreateStyle from "../../hook/useCreateClass";
import CreateStyled, { ChocoStyledProps } from "../custom/CreateStyled";

const Box = CreateStyled("div", "CBox")();

export type CBoxProps = ChocoStyledProps<"div">;

export default function CBox<Props extends CBoxProps>(prop: Props) {
    const { joinNames } = useTheme();
    const createStyle = useCreateStyle();

    const props = useMemo(() => {
        const props: Props = { ...prop };
        const className = createStyle("CBox", {});
        props.className = joinNames(props.className, className);
        return removeProps(props, []);
    }, [prop, joinNames, createStyle]);

    return <Box {...props} />;
}
