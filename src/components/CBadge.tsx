//-Path: "react-choco-style/src/components/CBadge.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Badge as MuiBadge } from '@mui/material';

const Badge = createStyled(MuiBadge, 'CBadge')();

export type CBadgeProps = ChocoStyledProps<typeof MuiBadge>;

export function CBadge(prop: CBadgeProps) {
    return <Badge {...prop} />;
}
