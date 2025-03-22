//-Path: "react-choco-style/src/components/CBox.tsx"
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Box = ChocoStyle.styled('div', 'CBox')();

export type CBoxProps = ChocoStyledProps<'div'>;

export function CBox<Props extends CBoxProps>(prop: Props) {
    return <Box {...prop} />;
}
