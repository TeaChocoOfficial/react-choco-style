//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CPaper.tsx"
import { useMemo } from "react";
import useTheme from "../../theme/useTheme";
import removeProps from "../../function/removeProps";
import useCreateStyle from "../../hook/useCreateClass";
import CreateStyled, { ChocoStyledProps } from "../custom/CreateStyled";

const Paper = CreateStyled(
    "div",
    "CPaper",
)(({ theme }) => ({
    py: 2,
    px: 4,
    borR: 1,
    color: theme.palette.text.primary,
    bgColor: theme.palette.background.paper,
    boxShadow: `0px 2px 1px -1px ${theme.palette.shadow.main}`,
}));

export type CPaperProps = ChocoStyledProps<"div"> & { elevation?: number };

export function getElevation(elevation?: number): string {
    if (elevation !== undefined && elevation < 10) {
        return `${elevation}${elevation}`;
    }
    switch (elevation) {
        case 10:
            return "AA";
        case 11:
            return "BB";
        case 12:
            return "CC";
        case 13:
            return "DD";
        case 14:
            return "EE";
        default:
            return "FF";
    }
}

export default function CPaper<Props extends CPaperProps>(prop: Props) {
    const createStyle = useCreateStyle();
    const { palette, joinNames } = useTheme();

    const props = useMemo(() => {
        const { elevation } = prop;
        const props = { ...prop } as Props;
        const opacity = getElevation(elevation ?? 0);
        const bg = `${palette.text.primary}${opacity}`;
        props.className = joinNames(
            props.className,
            createStyle(`CPaper-${opacity}`, {
                bgImg: `linear-gradient(${bg}, ${bg})`,
            }),
        );
        return removeProps(props, ["elevation"]);
    }, [prop, palette]);

    return <Paper {...props} />;
}
