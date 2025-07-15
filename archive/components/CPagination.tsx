//-Path: "react-choco-style/lib/src/components/CPagination.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = createStyled(MuiPagination, 'CPagination')();

export type CPaginationProps = ChocoStyledProps<typeof MuiPagination>;

export function CPagination(prop: CPaginationProps) {
    return <Pagination {...useChocoProps(prop)} />;
}
