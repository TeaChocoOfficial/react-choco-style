//-Path: "react-choco-style/src/components/CSkeleton.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { Skeleton as MuiSkeleton } from '@mui/material';

const Skeleton = createStyled(MuiSkeleton, 'CSkeleton')();

export type CSkeletonProps = ChocoStyledProps<
    typeof MuiSkeleton,
    {
        text?: boolean;
        circle?: boolean;
        rounded?: boolean;
        rectangular?: boolean;
    }
>;

export function CSkeleton({
    text,
    circle,
    rounded,
    variant,
    animation,
    rectangular,
    ...prop
}: CSkeletonProps) {
    const props = useChocoProps(prop, ({ style, getSize }) => {
        const size = getSize(prop);
        const csProps =
            circle || variant === 'circular'
                ? { h: style?.h ?? size(), w: style?.w ?? size() }
                : { minH: size() };

        return {
            cs: csProps,
            variant: text
                ? 'text'
                : circle
                ? 'circular'
                : rounded
                ? 'rounded'
                : rectangular
                ? 'rectangular'
                : variant ?? 'rectangular',
            animation: animation !== undefined ? animation : 'wave',
        };
    });
    return <Skeleton {...props} />;
}
