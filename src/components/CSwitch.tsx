//-Path: "react-choco-style/src/components/CSwitch.tsx"
import {
    Switch as MuiSwitch,
    FormControlLabel as MuiFormControl,
} from '@mui/material';
import { CsType } from '../types/choco';
import { ColorType } from '../types/color';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';

const Switch = createStyled(MuiSwitch, 'CSwitch')();
const FormControl = createStyled(MuiFormControl, 'CFormControl')();

export type CSwitchProps = ChocoStyledProps<
    typeof MuiSwitch,
    {
        label?: string;
        setClr?: ColorType;
        lebelValue?: unknown;
        labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
    },
    ['size']
>;

export function CSwitch({
    label,
    setClr,
    disabled,
    lebelValue,
    labelPlacement,
    ...prop
}: CSwitchProps) {
    const Contol = (
        <Switch
            {...useChocoProps(
                prop,
                ({ size, callbackSize, theme, getSetClrProps }) => {
                    const { box, padding } = theme.root.size;
                    const { setClrs } = getSetClrProps({
                        setClr,
                        disabled,
                    });

                    const cs: CsType = {
                        a: 'c',
                        of: 'v',
                        h: size((size) => size, box),
                        p: size((size) => size, padding),
                        w: size((size) => size * 2, box),
                        '& .MuiSwitch-switchBase': {
                            t: 'unset',
                            p: size((size) => size, padding),
                            '&.Mui-checked': {
                                form: callbackSize(
                                    size((size) => size, box),
                                    (value) => `translateX(${value}px)`,
                                ),
                                clr: setClrs.bgClr,
                                '& + .MuiSwitch-track': {
                                    bgClr: setClrs.bgClr,
                                },
                                '&:hover': {
                                    bgClr: setClrs.bgHover?.alpha(0.2),
                                },
                            },
                        },
                        '& .MuiSwitch-thumb': {
                            bgClr: setClrs.clr,
                            wh: size((size) => size / 1.6, box),
                        },
                        '& .Mui-checked .MuiSwitch-thumb': {
                            bgClr: setClrs.bgClr,
                        },
                        '& .MuiSwitch-track': {
                            w: '100%',
                            h: '100%',
                            bgClr: setClrs.clr,
                            borR: size((size) => size, box),
                        },
                    };
                    return { cs };
                },
            )}
        />
    );
    return label ? (
        <FormControl
            label={label}
            control={Contol}
            value={lebelValue}
            labelPlacement={labelPlacement}
        />
    ) : (
        Contol
    );
}
