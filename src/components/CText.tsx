//-Path: "react-choco-style/src/components/CText.tsx"
import { CSkeleton } from './CSkeleton';
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Text = ChocoStyle.styled('span', 'CText')({ size: 16 });

export type CTextProps = ChocoStyledProps<'span'> & { skeleton?: boolean };

export function CText<Props extends CTextProps>(prop: Props) {
    return (
        <Text
            {...ChocoStyle.chocoProps(
                prop,
                () => {
                    const { skeleton } = prop;
                    if (skeleton) {
                        return { cs: { w: '100%', h: '1.2em' } };
                    }
                    return {};
                },
                ['skeleton'],
            )}
        />
    );
}
