//-Path: "react-choco-style/src/components/CSlider.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { Slider as MuiSlider } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Slider = createStyled(MuiSlider, 'CSlider')();

export type CSliderProps = ChocoStyledProps<typeof MuiSlider>;

export function CSlider(prop: CSliderProps) {
    return <Slider {...prop} />;
}
