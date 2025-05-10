//-Path: "react-choco-style/src/components/CTable.tsx"
import { Table as MuiTable } from '@mui/material';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const Table = createStyled(MuiTable, 'CTable')();

export type CTableProps = ChocoStyledProps<typeof MuiTable>;

export function CTable(prop: CTableProps) {
    return (
        <Table
            {...useChocoProps(prop, () => {
                return {};
            })}
        />
    );
}
