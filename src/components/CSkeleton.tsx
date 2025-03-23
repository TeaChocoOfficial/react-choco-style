//-Path: "react-choco-style/src/components/CSkeleton.tsx"
import { ChocoProps } from '../hook/ChocoProps';
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Skeleton = ChocoStyle.styled(
    'div',
    'CSkeleton',
)({ of: 'h', pos: 'r', bgClr: '#ffffff22' });

export type CSkeletonProps = ChocoStyledProps<'div'> & { circle?: boolean };

export function CSkeleton<Props extends CSkeletonProps>(prop: Props) {
    const method = () => {
        const { circle } = prop;
        const csProps = circle
            ? { borR: 2, minH: prop.cs?.fontS ?? 16 }
            : { borR: '50%', h: prop.size ?? 64, w: prop.size ?? 64 };
        return {
            cs: csProps,
            children: (
                <Skeleton
                    posA
                    t={0}
                    l={0}
                    w="20vh"
                    h="20vh"
                    bgClr="#ffffff22"
                    style={{
                        boxShadow: '0 0 10vh 10vh #ffffff22',
                        animation: 'CSkeleton 2s linear infinite',
                    }}
                />
            ),
        };
    };
    return <Skeleton {...ChocoProps.useChocoProps(prop, method, ['circle'])} />;
}
