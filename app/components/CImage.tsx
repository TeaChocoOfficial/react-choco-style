//-Path: "react-choco-style/lib/src/components/CImage.tsx"
import { ChocoStyle } from '../class/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Image = ChocoStyle.styled('img', 'CImage')();

export type CImageProps = ChocoStyledProps<'img'>;

export function CImage(prop: CImageProps) {
    return <Image {...ChocoStyle.props(prop)} />;
}
