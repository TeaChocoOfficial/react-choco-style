//-Path: "react-choco-style/src/components/CSkeleton.tsx"
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Skeleton = ChocoStyle.styled(
    'div',
    'CSkeleton',
)({ of: 'h', pos: 'r', bgClr: '#ffffff22' });

export type CSkeletonProps = ChocoStyledProps<'div'> & { circle?: boolean };

export function CSkeleton<Props extends CSkeletonProps>(prop: Props) {
    return (
        <Skeleton
            {...ChocoStyle.chocoProps(
                prop,
                () => {
                    const { circle } = prop;

                    return {
                        cs: circle
                            ? { borR: 2, minH: prop.cs?.fontS ?? 16 }
                            : {
                                  borR: '50%',
                                  h: prop.size ?? 64,
                                  w: prop.size ?? 64,
                              },
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
                },
                ['circle'],
            )}
        />
    );
}
