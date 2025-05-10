//-Path: "react-choco-style/src/components/CDrawer.tsx"
import { SxType } from '../types/style';
import { CsType } from '../types/choco';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { Drawer as MuiDrawer } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';
import { useChocoStyle, useResponseCs } from '../hook/ChocoResponse';

const Drawer = createStyled(MuiDrawer, 'CDrawer')();

export type CDrawerProps = ChocoStyledProps<
    typeof MuiDrawer,
    { paperCs?: CsType }
>;

export function CDrawer({ paperCs, ...prop }: CDrawerProps) {
    const responseCs = useResponseCs();
    const chocoStyle = useChocoStyle<SxType>();

    return (
        <Drawer
            {...useChocoProps(prop, () => {
                const paperSx = chocoStyle(responseCs(paperCs));
                return { PaperProps: { sx: paperSx } };
            })}
        />
    );
}
