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

export function CText({ skeleton, variant, ...prop }: CTextProps) {
    return skeleton ? (
        <CSkeleton
            {...useChocoProps(
                { ...(typeof skeleton === 'object' ? skeleton : {}) },
                ({ theme }) => ({
                    variant: 'text',
                    cs: {
                        w: '100%',
                        h: -(theme.root.size.text * 2),
                    },
                }),
            )}
        />
    ) : (
        <Text
            {...useChocoProps(prop, ({ theme }) => ({
                variant: variant ?? 'inherit',
                cs: { fontS: -theme.root.size.text },
            }))}
        />
    );
}
