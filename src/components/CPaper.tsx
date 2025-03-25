//-Path: "react-choco-style/src/components/CPaper.tsx"
import { ChocoStyle } from '../hook/ChocoStyle';
import { Paper as MuiPaper } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Paper = ChocoStyle.styled(
    MuiPaper,
    'CPaper',
)(({ theme }) => ({
    py: 2,
    px: 4,
    borR: 1,
    color: theme.palette.text.primary,
    bgColor: theme.palette.background.paper,
    boxShadow: `0px 2px 1px -1px ${theme.palette.shadow.main}`,
}));

export type CPaperProps = ChocoStyledProps<typeof Paper>;

export function CPaper<Props extends CPaperProps>(prop: Props) {
    return <Paper {...prop} />;
}
