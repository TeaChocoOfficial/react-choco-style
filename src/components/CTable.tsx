//-Path: "react-choco-style/src/components/CTable.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { Table as MuiTable } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Table = createStyled(MuiTable, 'CTable')();

export type CTableProps = ChocoStyledProps<typeof MuiTable>;

export function CTable(prop: CTableProps) {
    return <Table {...prop} />;
}
