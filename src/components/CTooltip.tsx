//-Path: "react-choco-style/src/components/CTooltip.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Tooltip as MuiTooltip } from '@mui/material';

const Tooltip = createStyled(MuiTooltip, 'CTooltip')();

export type CTooltipProps = ChocoStyledProps<typeof MuiTooltip>;

export function CTooltip(prop: CTooltipProps) {
    return <Tooltip {...prop} />;
}
