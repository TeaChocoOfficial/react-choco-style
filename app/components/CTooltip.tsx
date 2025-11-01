//-Path: "react-choco-style/lib/src/components/CTooltip.tsx"
import { ChocoStyle } from '../class/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Tooltip as MuiTooltip } from '@mui/material';

const Tooltip = ChocoStyle.styled(MuiTooltip, 'CTooltip')();

export type CTooltipProps = ChocoStyledProps<
    typeof MuiTooltip,
    {
        title?: string;
        children?: React.ReactElement<unknown, any>;
    },
    ['title', 'children']
>;

export function CTooltip({ title, children, ...prop }: CTooltipProps) {
    return (
        <Tooltip
            title={title}
            children={children ?? <></>}
            {...ChocoStyle.props(prop, {})}
        />
    );
}
