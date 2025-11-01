//-Path: "react-choco-style/lib/src/components/CChip.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { Chip as MuiChip } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Chip = ChocoStyle.styled(MuiChip, 'CChip')();

export type CChipProps = ChocoStyledProps<
    typeof MuiChip,
    {
        outline?: boolean;
        children?: React.ReactNode;
    },
    ['children']
>;

export function CChip({
    label,
    variant,
    outline,
    children,
    ...props
}: CChipProps) {
    return (
        <Chip
            {...ChocoStyle.props(props)}
            label={label ?? children}
            variant={outline ? 'outlined' : variant}
        />
    );
}
