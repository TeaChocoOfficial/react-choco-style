//-Path: "react-choco-style/lib/src/components/CBadge.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { Badge as MuiBadge } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Badge = ChocoStyle.styled(MuiBadge, 'CBadge')();

export type CBadgeProps = ChocoStyledProps<typeof MuiBadge>;

export function CBadge(prop: CBadgeProps) {
    return <Badge {...ChocoStyle.props(prop)} />;
}
