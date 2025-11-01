//-Path: "react-choco-style/lib/src/components/CSwitch.tsx"
import {
    Switch as MuiSwitch,
    FormControlLabel as MuiFormControl,
} from '@mui/material';
import { ColorType } from '../types/color';
import { ChocoStyle } from '../class/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Switch = ChocoStyle.styled(MuiSwitch, 'CSwitch')();
const FormControl = ChocoStyle.styled(MuiFormControl, 'CFormControl')();

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
            {...ChocoStyle.props(prop, ({ sz, chocoColor,  }) => {
                const { setClrs } = chocoColor.style({ setClr, disabled });

                const cs = new ChocoStyle({
                    a: 'c',
                    of: 'v',
                    h: sz({
                                                calc: (size) => size * 2.5,
                    }),
                    // p: sz({ sz: 'padding' }),
                    w: sz({
                                                calc: (size) => size * 4,
                    }),
                    css: {
                        // ' .MuiSwitch-switchBase': {
                        //     t: 'unset',
                        //     p: sz({ sz: 'padding' }),
                        //     css: {
                        //         '.Mui-checked': {
                        //             form: Size.callback(
                        //                 sz({ sz: 'base' }),
                        //                 (value) =>
                        //                     `translateX(${value?.toString()}px)`,
                        //             ),
                        //             clr: setClrs.bgClr,
                        //             css: {
                        //                 ' + .MuiSwitch-track': {
                        //                     bgClr: setClrs.bgClr,
                        //                 },
                        //                 ':hover': {
                        //                     bgClr: setClrs.bgHover?.alpha(0.2),
                        //                 },
                        //             },
                        //         },
                        //     },
                        // },
                        ' .MuiSwitch-thumb': {
                            bgClr: setClrs.clr,
                            wh: sz({ calc: (size) => size*1.3, }),
                        },
                        ' .Mui-checked .MuiSwitch-thumb': {
                            bgClr: setClrs.bgClr,
                        },
                        ' .MuiSwitch-track': {
                            wh: '100%',
                            bgClr: setClrs.clr,
                            borR: sz({ calc:(size)=>size*2.5 }),    
                        },
                    },
                });
                return { cs };
            })}
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
