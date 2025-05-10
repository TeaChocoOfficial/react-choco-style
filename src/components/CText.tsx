//-Path: "react-choco-style/src/components/CText.tsx"
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
            {...useChocoProps(skeletonProps, ({ size, theme }) => ({
                w: '100%',
                h: size((size) => size * 2, theme.root.size.text),
            }))}
        />
    ) : (
        <Text variant={variant} {...prop} />
    );
}
