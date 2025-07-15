//-Path: "react-choco-style/lib/src/components/CText.tsx"
import { Typography } from '@mui/material';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { CSkeleton, CSkeletonProps } from './CSkeleton';

const Text = createStyled(Typography, 'CText')();

export type CTextProps = ChocoStyledProps<
    typeof Typography,
    { skeleton?: boolean | CSkeletonProps }
>;

export function CText({ skeleton, variant = 'inherit', ...prop }: CTextProps) {
    const skeletonProps = typeof skeleton === 'object' ? skeleton : {};

    return skeleton ? (
        <CSkeleton
            text
            {...useChocoProps(skeletonProps, ({ size }) => ({
                w: '100%',
                h: size({ calc: (size) => size * 2, root: 'text' }),
            }))}
        />
    ) : (
        <Text variant={variant} {...useChocoProps(prop)} />
    );
}
