//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/components/hook/CPaper.tsx"
import { useTheme } from "../../theme/useTheme";
import styled, { ChocoStyledProps } from "../custom/Styled";

const Paper = styled("div")(({ theme }) => ({
    borR: 1,
    color: theme.palette.text.primary,
    bgColor: theme.palette.background.paper,
    boxShadow: `0px 2px 1px -1px ${theme.palette.shadow.main}`,
}));

export type CPaperProps = ChocoStyledProps<"div"> & { elevation?: number };

function getElevation(elevation?: number): string {
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

export default function CPaper(prop: CPaperProps) {
    const { palette } = useTheme();
    const { elevation } = prop;
    const props = { ...prop };
    delete props.elevation;
    const opacity = getElevation(elevation ?? 0);
    const bg = `${palette.text.primary}${opacity}`;
    props.cs = {
        bgImage: `linear-gradient(${bg}, ${bg})`,
        ...props.cs,
    };
    return <Paper {...props} />;
}