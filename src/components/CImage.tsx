//-Path: "react-choco-style/src/components/CImage.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Image = createStyled("img", 'CImage')();

export type CImageProps = ChocoStyledProps<"img">;

export function CImage(prop: CImageProps) {
    return <Image {...prop} />;
}
