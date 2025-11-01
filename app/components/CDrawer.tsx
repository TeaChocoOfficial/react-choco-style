//-Path: "react-choco-style/lib/src/components/CDrawer.tsx"
import { SxType } from '../types/style';
import { CsType } from '../types/choco';
import { ChocoStyle } from '../class/ChocoStyle';
import { Drawer as MuiDrawer } from '@mui/material';
import { useChocoHook } from '../hooks/useChocoHook';
import { ChocoStyledProps } from '../types/chocoHook';
import { ChocoResponse } from '../class/ChocoResponse';

const Drawer = ChocoStyle.styled(MuiDrawer, 'CDrawer')();

export type CDrawerProps = ChocoStyledProps<
    typeof MuiDrawer,
    { paperCs?: CsType }
>;

export function CDrawer({ paperCs, ...prop }: CDrawerProps) {
    const { responseCs } = useChocoHook();
    const chocoResponse = new ChocoResponse();
    const paperSx = chocoResponse.chocoStyle<SxType>(responseCs(paperCs));

    return <Drawer PaperProps={{ sx: paperSx }} {...ChocoStyle.props(prop)} />;
}
