//-Path: "react-choco-style/src/components/CPagination.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = createStyled(MuiPagination, 'CPagination')();

export type CPaginationProps = ChocoStyledProps<typeof MuiPagination>;

export function CPagination(prop: CPaginationProps) {
    return <Pagination {...prop} />;
}
