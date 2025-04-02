//-Path: "react-choco-style/src/components/CNavigation.tsx"
import { BottomNavigation } from '@mui/material';
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Navigation = createStyled(BottomNavigation, 'CNavigation')();

export type CNavigationProps = ChocoStyledProps<typeof BottomNavigation>;

export function CNavigation(prop: CNavigationProps) {
    return <Navigation {...prop} />;
}
