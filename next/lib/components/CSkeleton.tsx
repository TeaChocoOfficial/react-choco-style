//-Path: "react-choco-style/lib/src/components/CSkeleton.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Skeleton as MuiSkeleton } from '@mui/material';

const Skeleton = ChocoStyle.styled(MuiSkeleton, 'CSkeleton')();

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
    const props = ChocoStyle.props(prop, ({ style, sz }) => {
        const csProps =
            circle || variant === 'circular'
                ? {
                      w: style?.w ?? sz(),
                      h: style?.h ?? sz(),
                      wh: style?.wh ?? sz(),
                  }
                : { minH: sz() };

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
