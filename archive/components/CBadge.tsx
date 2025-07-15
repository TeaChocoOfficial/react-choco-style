//-Path: "react-choco-style/lib/src/components/CBadge.tsx"
import { Badge as MuiBadge } from '@mui/material';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const Badge = createStyled(MuiBadge, 'CBadge')();

export type CBadgeProps = ChocoStyledProps<typeof MuiBadge>;

export function CBadge(prop: CBadgeProps) {
    return <Badge {...useChocoProps(prop)} />;
}
