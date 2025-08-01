//-Path: "react-choco-style/lib/src/components/CSlider.tsx"
import { ColorType } from '../types/color';
import { ChocoStyle } from '../class/ChocoStyle';
import { Slider as MuiSlider } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Slider = ChocoStyle.styled(MuiSlider, 'CSlider')();

export type CSliderValue = number | number[];

export type CSliderProps<Value extends CSliderValue> = ChocoStyledProps<
    typeof MuiSlider,
    {
        value?: Value;
        setClr?: ColorType;
        vertical?: boolean;
        labelAuto?: boolean;
        horizontal?: boolean;
        setValue?: (value: Value) => void;
    }
>;

export function CSlider<Value extends CSliderValue>({
    value,
    setClr,
    onChange,
    setValue,
    disabled,
    vertical,
    labelAuto,
    horizontal,
    orientation,
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
            orientation={
                vertical ? 'vertical' : horizontal ? 'horizontal' : orientation
            }
            {...ChocoStyle.props(prop, ({ chocoColor, responseCs }) => {
                const { styles } = chocoColor.style({
                    setClr,
                    disabled,
                });
                const cs = new ChocoStyle(responseCs(styles));
                return { cs };
            })}
        />
    );
}
