//-Path: "lib/src/components/CText.tsx"
import { Typography } from '@mui/material';
import { ChocoStyle } from '../class/style/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { CSkeleton, CSkeletonProps } from './CSkeleton';

const Text = ChocoStyle.styled(Typography, 'CText')();

export type CTextProps = ChocoStyledProps<
    typeof Typography,
    { skeleton?: boolean | CSkeletonProps }
>;

export function CText({ skeleton, variant = 'inherit', ...prop }: CTextProps) {
    const skeletonProps = typeof skeleton === 'object' ? skeleton : {};

    return skeleton ? (
        <CSkeleton
            text
            {...ChocoStyle.props(skeletonProps, ({ sz }) => ({
                w: '100%',
                h: sz({ calcs: [(after) => after.num * 2], kit: 'text' }),
            }))}
        />
    ) : (
        <Text variant={variant} {...ChocoStyle.props(prop)} />
    );
}
