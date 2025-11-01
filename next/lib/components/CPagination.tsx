//-Path: "react-choco-style/lib/src/components/CPagination.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ChocoStyle.styled(MuiPagination, 'CPagination')();

export type CPaginationProps = ChocoStyledProps<typeof MuiPagination>;

export function CPagination(prop: CPaginationProps) {
    return <Pagination {...ChocoStyle.props(prop)} />;
}
