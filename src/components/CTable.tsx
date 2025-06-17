//-Path: "react-choco-style/src/components/CTable.tsx"
import {
    Table as MuiTable,
    TableRow as MuiTableRow,
    TableHead as MuiTableHead,
    TableBody as MuiTableBody,
    TableCell as MuiTableCell,
    TableSortLabel as MuiTableSortLabel,
} from '@mui/material';
import { ColorType } from '../types/color';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const Table = createStyled(MuiTable, 'CTable')();
const TableRow = createStyled(MuiTableRow, 'CTableRow')();
const TableHead = createStyled(MuiTableHead, 'CTableHead')();
const TableBody = createStyled(MuiTableBody, 'CTableBody')();
const TableCell = createStyled(MuiTableCell, 'CTableCell')();
const TableLable = createStyled(MuiTableSortLabel, 'CTableLable')();

export type CTableChildrenProps = {
    Row: typeof TableRow;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Cell: typeof CTableCell;
    // Rows: typeof CTableRows;
    Lable: typeof TableLable;
};

export type CTableChildrenFunction = (
    props: CTableChildrenProps,
) => React.ReactNode;

export type CTableProps = ChocoStyledProps<
    typeof MuiTable,
    {
        text?: boolean;
        setClr?: ColorType;
        children?: CTableChildrenFunction | React.ReactNode;
    },
    ['children']
>;
export type CTableCellProps = ChocoStyledProps<
    typeof MuiTableCell,
    { setClr?: ColorType }
>;

// export type CTableRowsProps = ChocoStyledProps<
//     typeof MuiTable,
//     { children?: CTableChildrenFunction | React.ReactNode },
//     ['children']
// >;

// function CTableRows(props: CTableRowsProps) {
//     return <></>;
// }

function CTableCell({ setClr, ...prop }: CTableCellProps) {
    return <TableCell {...useChocoProps(prop, () => ({}))} />;
}

export function CTable({ setClr, text, children, ...prop }: CTableProps) {
    return (
        <Table
            {...useChocoProps(prop, ({ getsetClr }) => {
                const { setColor } = getsetClr(setClr, {
                    text,
                });

                const { clr, bgClr } = setColor;

                const TableChildren: CTableChildrenProps = {
                    Row: TableRow,
                    Head: TableHead,
                    Body: TableBody,
                    Cell: CTableCell,
                    // Rows: CTableRows,
                    Lable: TableLable,
                };

                return {
                    cs: { clr, bgClr },
                    children:
                        typeof children === 'function'
                            ? children(TableChildren)
                            : children,
                };
            })}
        />
    );
}
