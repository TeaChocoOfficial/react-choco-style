//-Path: "react-choco-style/lib/src/components/CTooltip.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { Tooltip as MuiTooltip } from '@mui/material';

const Tooltip = createStyled(MuiTooltip, 'CTooltip')();

export type CTooltipProps = ChocoStyledProps<typeof MuiTooltip>;

export function CTooltip({ title, children, ...prop }: CTooltipProps) {
    return (
        <Tooltip
            title={title}
            children={children}
            {...useChocoProps(prop, () => ({}))}
        />
    );
}
