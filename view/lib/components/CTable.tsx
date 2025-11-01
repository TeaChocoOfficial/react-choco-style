//-Path: "react-choco-style/lib/src/components/CTable.tsx"
import {
    Table as MuiTable,
    TableRow as MuiTableRow,
    TableHead as MuiTableHead,
    TableBody as MuiTableBody,
    TableCell as MuiTableCell,
    TableSortLabel as MuiTableSortLabel,
} from '@mui/material';
import { ColorType } from '../types/color';
import { ChocoStyledProps } from '../types/chocoHook';
import { ChocoStyle } from '../class/style/ChocoStyle';

const Table = ChocoStyle.styled(MuiTable, 'CTable')();
const TableRow = ChocoStyle.styled(MuiTableRow, 'CTableRow')();
const TableHead = ChocoStyle.styled(MuiTableHead, 'CTableHead')();
const TableBody = ChocoStyle.styled(MuiTableBody, 'CTableBody')();
const TableCell = ChocoStyle.styled(MuiTableCell, 'CTableCell')();
const TableLable = ChocoStyle.styled(MuiTableSortLabel, 'CTableLable')();

export type CTableChildrenProps = {
    Row: typeof TableRow;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Cell: typeof CTableCell;
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

function CTableCell({ setClr, ...prop }: CTableCellProps) {
    return <TableCell {...ChocoStyle.props(prop, () => ({}))} />;
}

export function CTable({ setClr, text, children, ...prop }: CTableProps) {
    return (
        <Table
            {...ChocoStyle.props(prop, ({ chocoColor }) => {
                const { setColor } = chocoColor.set(setClr, { text });
                const { clr, bgClr } = setColor;

                const TableChildren: CTableChildrenProps = {
                    Row: TableRow,
                    Head: TableHead,
                    Body: TableBody,
                    Cell: CTableCell,
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
