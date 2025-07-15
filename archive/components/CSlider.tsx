//-Path: "react-choco-style/lib/src/components/CSlider.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { Slider as MuiSlider } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Slider = createStyled(MuiSlider, 'CSlider')();

export type CSliderValue = number | number[];

export type CSliderProps<Value extends CSliderValue> = ChocoStyledProps<
    typeof MuiSlider,
    {
        value?: Value;
        labelAuto?: boolean;
        setValue?: (value: Value) => void;
    }
>;

export function CSlider<Value extends CSliderValue>({
    value,
    onChange,
    setValue,
    labelAuto,
    valueLabelDisplay,
    ...prop
}: CSliderProps<Value>) {
    return (
        <Slider
            value={value}
            valueLabelDisplay={labelAuto ? 'auto' : valueLabelDisplay}
            onChange={(event, value, activeThumb) => {
                onChange?.(event, value, activeThumb);
                setValue?.(value as Value);
            }}
            {...useChocoProps(prop)}
        />
    );
}
