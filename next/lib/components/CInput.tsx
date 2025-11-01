//-Path: "lib/src/components/CInput.tsx"
import {
    FormHelperText,
    SelectChangeEvent,
    Select as MuiSelect,
    Input as MuiStandardInput,
    InputLabel as MuiInputLabel,
    FilledInput as MuiFilledInput,
    FormControl as MuiFormControl,
    OutlinedInput as MuiOutlinedInput,
    InputAdornment as MuiInputAdornment,
} from '@mui/material';
import { useMemo } from 'react';
import { CMenuItem } from './CMenu';
import { renderIcon } from './CIcon';
import { CsType } from '../types/choco';
import { TypeIcon } from '../custom/Icon';
import { Ary, Obj } from '@teachoco-dev/cli';
import { CsStyle } from '../class/style/CsStyle';
import { LinesStyleType } from '../types/chocoValue';
import { ChocoColor } from '../class/hook/ChocoColor';
import { ChocoStyledProps } from '../types/chocoHook';
import { ColorsType, ColorType } from '../types/color';
import { ChocoStyle } from '../class/style/ChocoStyle';

const Select = ChocoStyle.styled(MuiSelect, 'CSelect')();
const InputLabel = ChocoStyle.styled(MuiInputLabel, 'CInputLabel')();
const HelperText = ChocoStyle.styled(FormHelperText, 'CHelperText')();
const FormControl = ChocoStyle.styled(MuiFormControl, 'CFormControl')();
const FilledInput = ChocoStyle.styled(MuiFilledInput, 'CFilledInput')();
const OutlinedInput = ChocoStyle.styled(MuiOutlinedInput, 'COutlinedInput')();
const StandardInput = ChocoStyle.styled(MuiStandardInput, 'CStandardInput')();
const InputAdornment = ChocoStyle.styled(
    MuiInputAdornment,
    'CInputAdornment',
)();

const Inputs = {
    filled: FilledInput,
    outlined: OutlinedInput,
    standard: StandardInput,
};

export type CInputValue = string | number | string[] | undefined;

export type CSelectOptions<Value extends CInputValue> =
    | CInputValue
    | {
          value?: Value;
          cs?: CsType;
          boxCs?: CsType;
          label?: React.ReactNode;
          setClr?: ColorType;
          callback?: () => Value | void;
      };

export type CSelectRender<
    Value extends CInputValue,
    Select extends CSelectOptions<Value>,
> = (prop: {
    index: number;
    select: Select;
    Item: typeof CMenuItem;
}) => React.ReactNode;

export type CInputChangeEvent =
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent<unknown>;

export type CInputLabelProps = ChocoStyledProps<typeof MuiInputLabel>;
export type CInputHelperProps = ChocoStyledProps<typeof FormHelperText>;
export type CInputControlProps = ChocoStyledProps<typeof MuiFormControl>;
export type CInputAdornmentProps = ChocoStyledProps<
    typeof MuiInputAdornment,
    { position?: 'end' | 'start' },
    ['position']
>;
export type CInputProps<
    Value extends CInputValue,
    Select extends CSelectOptions<Value>,
> = ChocoStyledProps<
    typeof MuiFilledInput | typeof MuiOutlinedInput | typeof MuiStandardInput,
    {
        value?: Value;
        helper?: string;
        filled?: boolean;
        setClr?: ColorType;
        outline?: boolean;
        selects?: Select[];
        standard?: boolean;
        label?: React.ReactNode;
        children?: React.ReactNode;
        leftIcon?: React.ReactNode | TypeIcon;
        rightIcon?: React.ReactNode | TypeIcon;
        variant?: 'filled' | 'outlined' | 'standard';
        setValue?: (value: Value) => void;
        render?: CSelectRender<Value, Select>;
        onChange?: (event: CInputChangeEvent, newValue: Value) => void;
        props?: {
            label?: CInputLabelProps;
            helper?: CInputHelperProps;
            control?: CInputControlProps;
        };
    },
    ['children']
>;

export function CInputAdornment({
    variant,
    position,
    ...prop
}: CInputAdornmentProps) {
    return (
        <InputAdornment
            {...ChocoStyle.props(prop, ({ sz }) => {
                const posi = position
                    ? position
                    : variant === 'filled'
                    ? 'start'
                    : 'end';

                const getMargin = (time: number = 1) =>
                    sz({
                        root: 'padding',
                        calcs: [
                            (after, _, multiply) =>
                                `${after.num * multiply}px !important`,
                        ],
                    });

                return {
                    position: posi,
                    cs: {
                        mt: posi === 'end' ? undefined : getMargin(),
                        mr: posi === 'end' ? undefined : getMargin(0.5),
                        ml: posi === 'start' ? undefined : getMargin(0.5),
                        '& .MuiTypography-root': {
                            fontS: sz({ root: 'text' }),
                        },
                    },
                };
            })}
        />
    );
}

export function CInput<
    Value extends string | number,
    Select extends CSelectOptions<Value>,
>({
    id,
    label,
    value,
    props,
    error,
    render,
    filled,
    helper,
    setClr,
    outline,
    selects,
    children,
    standard,
    disabled,
    setValue,
    onChange,
    leftIcon,
    rightIcon,
    defaultValue,
    variant = filled ? 'filled' : standard ? 'standard' : 'outlined',
    ...prop
}: CInputProps<Value, Select>) {
    setClr = error ? 'error' : setClr;
    const chocoColor = new ChocoColor();

    const { styles, shadesColor } = useMemo(
        () =>
            chocoColor.style({
                setClr,
                outline,
                disabled,
            }),
        [setClr, outline, disabled],
    );

    const Input = selects ? Select : Inputs[variant];

    return (
        <FormControl
            variant={variant}
            {...ChocoStyle.props(
                props?.control ?? {},
                ({ sz, theme }) => {
                    const { border } = theme.root.multiply;

                    const borders = (
                        time: number = 1,
                        forcus: boolean = false,
                    ): LinesStyleType | string =>
                        typeof styles.cs.borders === 'string'
                            ? styles.cs.borders
                            : {
                                  width: -(border * time),
                                  color: error
                                      ? forcus
                                          ? theme.palette.main.error
                                          : theme.palette.main.error[7]
                                      : forcus &&
                                        typeof styles.cs.borders !== 'string'
                                      ? (styles.cs.borders as LinesStyleType)
                                            ?.color
                                      : (styles.cs.clr as ColorsType),
                              };

                    const cs = new CsStyle({
                        css: {
                            ' .MuiInputBase-root': {
                                mt: variant === 'standard' ? 0 : undefined,
                                css: {
                                    ' fieldset': {
                                        borders: borders(0.5),
                                        px: sz({
                                            kit: 'padding',
                                            calcs: [
                                                (after) => after.num * 0.75,
                                            ],
                                        }),
                                        css: {
                                            ' legend': {
                                                h: sz({
                                                    calcs: [
                                                        (after) =>
                                                            after.num * 0.75,
                                                    ],
                                                }),
                                                css: {
                                                    ' span': {
                                                        fontS: sz({
                                                            kit: 'text',
                                                        }),
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    ':before': { borderB: borders(0.5) },
                                    ':after': { borderB: borders(1, true) },
                                    '.Mui-focused': {
                                        css: {
                                            ' fieldset': { borders: borders() },
                                            ':before': { borderB: borders() },
                                        },
                                    },
                                    ':hover': {
                                        css: {
                                            ' fieldset': { borders: borders() },
                                            ':before': { borderB: borders() },
                                        },
                                    },
                                },
                            },
                        },
                    });

                    return { cs };
                },
                [variant],
            )}
        >
            {(props?.label || label) && (
                <InputLabel
                    z={1}
                    htmlFor={id}
                    variant={variant}
                    {...ChocoStyle.props(
                        (props?.label ?? {}) as CInputLabelProps,
                        ({ sz, getFont }) => {
                            const fontStyle = getFont('medium');

                            const cs = new CsStyle(fontStyle);
                            cs.add({
                                borR: sz({ kit: 'text' }),
                                fontS: sz({ kit: 'text' }),
                                clr: styles.cs.clr,
                                px: sz({
                                    kit: 'padding',
                                    calcs: [(after) => after.num / 2],
                                }),
                                form: sz<string>({
                                    calcs: [
                                        (after) =>
                                            `translate(${after.num * 0.5}px, ${
                                                after.num
                                            }px) scale(1)`,
                                    ],
                                }),
                                css: {
                                    '.Mui-focused': { clr: styles.cs?.bgClr },
                                    '[data-shrink="true"]': {
                                        clr: shadesColor.text[5],
                                        bgClr: shadesColor.main[5],
                                        form: sz({
                                            calcs: [
                                                (after) =>
                                                    `translate(${
                                                        after.num * 0.75
                                                    }px, ${
                                                        variant === 'filled'
                                                            ? after.num * 0.25
                                                            : -(after.num * 0.5)
                                                    }px) scale(0.75)`,
                                            ],
                                        }),
                                    },
                                },
                            });

                            return { cs };
                        },
                        [variant, styles, shadesColor],
                    )}
                >
                    {label}
                </InputLabel>
            )}
            <Input
                id={id}
                label={label}
                value={value}
                defaultValue={defaultValue}
                endAdornment={
                    rightIcon && (
                        <CInputAdornment variant={variant}>
                            {renderIcon(rightIcon)}
                        </CInputAdornment>
                    )
                }
                startAdornment={
                    leftIcon && (
                        <CInputAdornment variant={variant}>
                            {renderIcon(leftIcon)}
                        </CInputAdornment>
                    )
                }
                onChange={(event) => {
                    const value = event.target.value as Value;
                    onChange?.(event, value);
                    setValue?.(value);
                }}
                {...ChocoStyle.props(
                    prop,
                    ({ sz, theme, chocoColor }) => {
                        const { styles } = chocoColor.style({
                            text: variant === 'standard',
                            setClr,
                            outline,
                            disabled,
                        });

                        const newStyle = Obj.reduce<Record<string, any>>(
                            Obj.omit(styles.cs, 'borders'),
                            (acc, key, value) => {
                                acc[key] = value;
                                if (
                                    [':hover', ':focus', ':active'].includes(
                                        key,
                                    )
                                ) {
                                    acc[key] = Obj.omit(acc[key], 'borders');
                                }
                                return acc;
                            },
                            {},
                        );

                        const cs = new CsStyle(newStyle);
                        cs.add({
                            fontS: sz({ kit: 'text' }),
                            borR:
                                variant === 'standard'
                                    ? undefined
                                    : sz({
                                          kit: 'borR',
                                          calcs: [
                                              (after) =>
                                                  variant === 'filled'
                                                      ? theme.method.spacing(
                                                            after.num,
                                                            after.num,
                                                            0,
                                                            0,
                                                        )
                                                      : after.num,
                                          ],
                                      }),
                            css: {
                                ' .MuiInputBase-input': {
                                    p: sz({
                                        kit: 'padding',
                                        calcs: [
                                            (after) =>
                                                variant === 'filled'
                                                    ? theme.method.spacing(
                                                          after.num * 1.5,
                                                          after.num,
                                                          after.num * 0.5,
                                                          after.num,
                                                      )
                                                    : after,
                                        ],
                                    }),
                                },
                                ' .MuiSelect-icon': {
                                    t: sz({
                                        calcs: [
                                            (after) =>
                                                `calc(50% - ${after.num}px)`,
                                        ],
                                    }),
                                    clr: styles.cs.clr,
                                    wh: sz({
                                        calcs: [(after) => after.num * 2],
                                    }),
                                    fontS: sz({
                                        kit: 'text',
                                        calcs: [(after) => after.num * 2],
                                    }),
                                },
                            },
                        });

                        return { cs };
                    },
                    [variant, styles],
                )}
            >
                {selects
                    ? selects.map((select, index) =>
                          render ? (
                              render({ index, select, Item: CMenuItem })
                          ) : typeof select === 'object' && !Ary.is(select) ? (
                              <CMenuItem
                                  key={index}
                                  cs={select.cs}
                                  outline={outline}
                                  disabled={disabled}
                                  value={select.value ?? ''}
                                  setClr={select.setClr ?? setClr}
                                  onClick={() => select.callback?.()}
                              >
                                  {select.label ?? select.value}
                              </CMenuItem>
                          ) : (
                              <CMenuItem
                                  key={index}
                                  value={select ?? ''}
                                  setClr={setClr}
                                  outline={outline}
                                  disabled={disabled}
                              >
                                  {select}
                              </CMenuItem>
                          ),
                      )
                    : children}
            </Input>
            {helper && (
                <HelperText
                    clr={setClr}
                    disabled={disabled}
                    {...ChocoStyle.props(
                        props?.helper ?? {},
                        ({ sz, theme }) => ({
                            cs: {
                                fontS: sz({
                                    calcs: [(after) => after.num * 0.75],
                                }),
                                ml: sz({
                                    kit: 'padding',
                                    calcs: [(after) => after.num * 0.5],
                                }),
                                clr: error
                                    ? theme.palette.main.error[5]
                                    : undefined,
                            },
                        }),
                        [error],
                    )}
                >
                    {helper}
                </HelperText>
            )}
        </FormControl>
    );
}
