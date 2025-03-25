//-Path: "react-choco-style/src/components/CSkeleton.tsx"
import { ChocoProps } from '../hook/ChocoProps';
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Skeleton as MuiSkeleton } from '@mui/material';

const Skeleton = ChocoStyle.styled(MuiSkeleton, 'CSkeleton')();

export type CSkeletonProps = ChocoStyledProps<
    typeof Skeleton,
    {
        circle?: boolean;
        rounded?: boolean;
        rectangular?: boolean;
    }
>;

export function CSkeleton<Props extends CSkeletonProps>(prop: Props) {
    return (
        <Skeleton
            {...ChocoProps.useChocoProps(
                prop,
                ({ theme }) => {
                    const { circle, rounded, rectangular, variant, animation } =
                        prop;
                    const csProps =
                        circle || variant === 'circular'
                            ? {
                                  borR: '50%',
                                  h: prop.sz ?? theme.root.size.box,
                                  w: prop.sz ?? theme.root.size.box,
                              }
                            : { minH: prop.cs?.fontS ?? theme.root.size.text };

                    return {
                        cs: csProps,
                        variant: circle
                            ? 'circular'
                            : rounded
                            ? 'rounded'
                            : rectangular
                            ? 'rectangular'
                            : variant ?? 'rectangular',
                        animation: animation !== undefined ? animation : 'wave',
                    };
                },
                ['circle', 'rounded', 'rectangular'],
            )}
        />
    );
}
