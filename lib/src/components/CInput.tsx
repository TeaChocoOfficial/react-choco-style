//-Path: "react-choco-style/lib/src/components/CInput.tsx"
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
import { ChocoStyle } from '../class/ChocoStyle';
import { ChocoColor } from '../class/ChocoColor';
import { LinesStyleType } from '../types/chocoValue';
import { ChocoStyledProps } from '../types/chocoHook';
import { ColorsType, ColorType } from '../types/color';

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
                        calc: (size, root) =>
                            `${size * root * time}px !important`,
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
                    const { border } = theme.root.size;

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
                                          ? theme.palette.main.error[5]
                                          : theme.palette.main.error[7]
                                      : forcus &&
                                        typeof styles.cs.borders !== 'string'
                                      ? (styles.cs.borders as LinesStyleType)
                                            ?.color
                                      : (styles.cs.clr as ColorsType),
                              };

                    const cs = new ChocoStyle({
                        css: {
                            ' .MuiInputBase-root': {
                                mt: variant === 'standard' ? 0 : undefined,
                                css: {
                                    ' fieldset': {
                                        borders: borders(0.5),
                                        px: sz({
                                            root: 'padding',
                                            calc: (size) => size * 0.75,
                                        }),
                                        css: {
                                            ' legend': {
                                                h: sz({
                                                    calc: (size) => size * 0.75,
                                                }),
                                                css: {
                                                    ' span': { fontS: sz() },
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

                            const cs = new ChocoStyle(fontStyle);
                            cs.add({
                                borR: sz(),
                                fontS: sz(),
                                clr: styles.cs.clr,
                                px: sz({
                                    sz: 'padding',
                                    calc: (size) => size / 2,
                                }),
                                form: sz({
                                    calc: (size) =>
                                        `translate(${
                                            size * 0.5
                                        }px, ${size}px) scale(1)`,
                                }),
                                css: {
                                    '.Mui-focused': { clr: styles.cs?.bgClr },
                                    '[data-shrink="true"]': {
                                        clr: shadesColor.text[5],
                                        bgClr: shadesColor.main[5],
                                        form: sz({
                                            calc: (size) =>
                                                `translate(${size * 0.75}px, ${
                                                    variant === 'filled'
                                                        ? size * 0.25
                                                        : -(size * 0.5)
                                                }px) scale(0.75)`,
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

                        const cs = new ChocoStyle(newStyle);
                        cs.add({
                            fontS: sz(),
                            borR:
                                variant === 'standard'
                                    ? undefined
                                    : sz({
                                          sz: 'borR',
                                          calc: (size) =>
                                              variant === 'filled'
                                                  ? theme.method.spacing(
                                                        size,
                                                        size,
                                                        0,
                                                        0,
                                                    )
                                                  : size,
                                      }),
                            css: {
                                ' .MuiInputBase-input': {
                                    p: sz({
                                        sz: 'padding',
                                        calc: (size) =>
                                            variant === 'filled'
                                                ? theme.method.spacing(
                                                      size * 1.5,
                                                      size,
                                                      size * 0.5,
                                                      size,
                                                  )
                                                : size,
                                    }),
                                },
                                ' .MuiSelect-icon': {
                                    t: sz({
                                        calc: (size) => `calc(50% - ${size}px)`,
                                    }),
                                    clr: styles.cs.clr,
                                    wh: sz({ calc: (size) => size * 2 }),
                                    fontS: sz({ calc: (size) => size * 2 }),
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
                                fontS: sz({ calc: (size) => size * 0.75 }),
                                ml: sz({
                                    root: 'padding',
                                    calc: (size) => size * 0.5,
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
