//-Path: "react-choco-style/lib/src/components/CInput.tsx"
import {
    FormHelperText,
    SelectChangeEvent,
    Select as MuiSelect,
    MenuItem as MuiMenuItem,
    Input as MuiStandardInput,
    InputLabel as MuiInputLabel,
    FilledInput as MuiFilledInput,
    FormControl as MuiFormControl,
    OutlinedInput as MuiOutlinedInput,
    InputAdornment as MuiInputAdornment,
} from '@mui/material';
import { useMemo } from 'react';
import { renderIcon } from './CIcon';
import { Ary, Obj } from '@teachoco-dev/cli';
import { TypeIcon } from '../custom/Icon';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { useGetsetClrProps } from '../hook/ChocoColor';
import { ColorsType, ColorType } from '../types/color';
import { CsType, LinesStyleType } from '../types/choco';

const Select = createStyled(MuiSelect, 'CSelect')();
const MenuItem = createStyled(MuiMenuItem, 'CMenuItem')();
const InputLabel = createStyled(MuiInputLabel, 'CInputLabel')();
const HelperText = createStyled(FormHelperText, 'CHelperText')();
const FormControl = createStyled(MuiFormControl, 'CFormControl')();
const FilledInput = createStyled(MuiFilledInput, 'CFilledInput')();
const OutlinedInput = createStyled(MuiOutlinedInput, 'COutlinedInput')();
const StandardInput = createStyled(MuiStandardInput, 'CStandardInput')();
const InputAdornment = createStyled(MuiInputAdornment, 'CInputAdornment')();

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
export type CMenuItemProps = ChocoStyledProps<
    typeof MuiMenuItem,
    { setClr?: ColorType; outline?: boolean }
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
            {...useChocoProps(prop, ({ size, theme }) => {
                const posi = position
                    ? position
                    : variant === 'filled'
                    ? 'start'
                    : 'end';

                const getMargin = (time: number = 1) =>
                    size({
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
                            fontS: size({ unit: 'px' }),
                        },
                    },
                };
            })}
        />
    );
}

export function CMenuItem({
    setClr,
    outline,
    disabled,
    ...props
}: CMenuItemProps) {
    return (
        <MenuItem
            {...useChocoProps(
                props,
                ({ size, theme, getFont, getSetClrProps }) => {
                    const fontStyle = getFont();
                    const { padding } = theme.root.size;
                    const { styles, focus, disableds } = getSetClrProps({
                        setClr,
                        outline,
                        disabled,
                        isFocus: false,
                    });

                    return {
                        cs: {
                            ...disableds,
                            ...fontStyle,
                            fontS: size(),
                            px: size({ root: 'padding' }),
                            py: size({
                                root: 'padding',
                                calc: (size) => size / 2,
                            }),
                            minH: size({ calc: (size) => size * 3 }),
                            '&.Mui-selected': { ...styles },
                            '&.Mui-focusVisible': { ...focus },
                            '&.Mui-selected&.Mui-focusVisible': {
                                ...focus,
                                ...styles,
                            },
                        },
                    };
                },
            )}
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
    const getSetClrProps = useGetsetClrProps();

    const { styles, shadesColor } = useMemo(
        () =>
            getSetClrProps({
                setClr,
                outline,
                disabled,
            }),
        [getSetClrProps, setClr, outline, disabled],
    );

    const Input = selects ? Select : Inputs[variant];

    return (
        <FormControl
            variant={variant}
            {...useChocoProps(
                props?.control ?? {},
                ({ size, theme }) => {
                    const { border } = theme.root.size;

                    const borders = (
                        time: number = 1,
                        forcus: boolean = false,
                    ): LinesStyleType | string =>
                        typeof styles.borders === 'string'
                            ? styles.borders
                            : {
                                  width: -(border * time),
                                  color: error
                                      ? forcus
                                          ? theme.palette.main.error[5]
                                          : theme.palette.main.error[7]
                                      : forcus &&
                                        typeof styles.borders !== 'string'
                                      ? (styles.borders as LinesStyleType)
                                            ?.color
                                      : (styles.clr as ColorsType),
                              };

                    return {
                        cs: {
                            '& .MuiInputBase-root': {
                                mt: variant === 'standard' ? 0 : undefined,
                                '& fieldset': {
                                    borders: borders(0.5),
                                    px: size({
                                        root: 'padding',
                                        calc: (size) => size * 0.75,
                                    }),
                                    '& legend': {
                                        h: size({
                                            calc: (size) => size * 0.75,
                                        }),
                                        '& span': { fontS: size() },
                                    },
                                },
                                '&:before': { borderB: borders(0.5) },
                                '&:after': { borderB: borders(1, true) },
                                '&.Mui-focused': {
                                    '& fieldset': { borders: borders() },
                                    '&:before': { borderB: borders() },
                                },
                                '&:hover': {
                                    '& fieldset': { borders: borders() },
                                    '&:before': { borderB: borders() },
                                },
                            },
                        },
                    };
                },
                [variant],
            )}
        >
            {(props?.label || label) && (
                <InputLabel
                    z={1}
                    htmlFor={id}
                    variant={variant}
                    {...useChocoProps(
                        (props?.label ?? {}) as CInputLabelProps,
                        ({ size, theme, getFont }) => {
                            const fontStyle = getFont('medium');

                            return {
                                cs: {
                                    ...fontStyle,
                                    borR: size(),
                                    fontS: size(),
                                    clr: styles.clr,
                                    px: size({
                                        root: 'padding',
                                        calc: (size) => size / 2,
                                    }),
                                    form: size({
                                        calc: (size) =>
                                            `translate(${
                                                size * 0.5
                                            }px, ${size}px) scale(1)`,
                                    }),
                                    '&.Mui-focused': { clr: styles?.bgClr },
                                    '&[data-shrink="true"]': {
                                        clr: shadesColor.text[5],
                                        bgClr: shadesColor.main[5],
                                        form: size({
                                            calc: (size) =>
                                                `translate(${size * 0.75}px, ${
                                                    variant === 'filled'
                                                        ? size * 0.25
                                                        : -(size * 0.5)
                                                }px) scale(0.75)`,
                                        }),
                                    },
                                },
                            };
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
                {...useChocoProps(
                    prop,
                    ({ size, theme, getSetClrProps }) => {
                        const { borR, padding } = theme.root.size;
                        const { styles } = getSetClrProps({
                            text: variant === 'standard',
                            setClr,
                            outline,
                            disabled,
                        });

                        const newStyle = Obj.reduce<Record<string, any>>(
                            Obj.omit(styles, 'borders'),
                            (acc, key, value) => {
                                acc[key] = value;
                                if (
                                    ['&:hover', '&:focus', '&:active'].includes(
                                        key,
                                    )
                                ) {
                                    acc[key] = Obj.omit(acc[key], 'borders');
                                }
                                return acc;
                            },
                            {},
                        );

                        return {
                            cs: {
                                ...newStyle,
                                fontS: size(),
                                borR:
                                    variant === 'standard'
                                        ? undefined
                                        : size({
                                              root: 'borR',
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
                                '& .MuiInputBase-input': {
                                    p: size({
                                        root: 'padding',
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
                                '& .MuiSelect-icon': {
                                    t: size({
                                        calc: (size) => `calc(50% - ${size}px)`,
                                    }),
                                    clr: styles.clr,
                                    wh: size({ calc: (size) => size * 2 }),
                                    fontS: size({ calc: (size) => size * 2 }),
                                },
                            },
                        };
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
                    {...useChocoProps(
                        props?.helper ?? {},
                        ({ size, theme }) => ({
                            cs: {
                                fontS: size({ calc: (size) => size * 0.75 }),
                                ml: size({
                                    calc: (size) => size * 0.5,
                                    root: 'padding',
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
