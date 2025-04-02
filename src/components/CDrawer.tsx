//-Path: "react-choco-style/src/components/CDrawer.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { Drawer as MuiDrawer } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Drawer = createStyled(MuiDrawer, 'CDrawer')();

export type CDrawerProps = ChocoStyledProps<typeof MuiDrawer>;

export function CDrawer(prop: CDrawerProps) {
    return <Drawer {...prop} />;
}
