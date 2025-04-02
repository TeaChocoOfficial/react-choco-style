//-Path: "react-choco-style/src/components/CSelect.tsx"
import {
    SelectChangeEvent,
    Select as MuiSelect,
    MenuItem as MuiMenuItem,
    InputLabel as MuiInputLabel,
    FormControl as MuiFormControl,
    FormHelperText,
} from '@mui/material';
import { ColorType } from '../types/color';
import { ChocoStyleType } from '../types/choco';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { useGetsetClrProps } from '../hook/ChocoColor';
import { createStyled, useFont } from '../hook/ChocoStyle';

const Select = createStyled(MuiSelect, 'CSelect')();
const MenuItem = createStyled(MuiMenuItem, 'CSelectItem')();
const InputLabel = createStyled(MuiInputLabel, 'CSelectLabel')();
const HelperText = createStyled(FormHelperText, 'CHelperText')();
const FormControl = createStyled(
    MuiFormControl,
    'CSelectControl',
)(({ theme }) => ({ sx: theme.root.size.text }));

export type CSelectValue = string | number | string[] | undefined;

export type CSelectOptions<Value extends CSelectValue> =
    | CSelectValue
    | {
          value?: Value;
          cs?: ChocoStyleType;
          boxCs?: ChocoStyleType;
          label?: React.ReactNode;
          setClr?: ColorType;
          callback?: () => Value | void;
      };

export type CSelectRender<
    Value extends CSelectValue,
    Option extends CSelectOptions<Value>,
> = (prop: {
    index: number;
    option: Option;
    Item: typeof CSelectItem;
}) => React.ReactNode;

export type CSelectProps<
    Value extends CSelectValue,
    Option extends CSelectOptions<Value>,
> = ChocoStyledProps<
    typeof MuiSelect,
    {
        value: Value;
        helper?: string;
        setClr?: ColorType;
        outline?: boolean;
        options?: Option[];
        disabled?: boolean;
        setValue?: (value: Value) => void;
        render?: CSelectRender<Value, Option>;
        onChange?: (
            event: SelectChangeEvent<unknown>,
            child: React.ReactNode,
        ) => void;
        props?: {
            label?: CSelectLabelProps;
            helper?: CSelectHelperProps;
            control?: CSelectControlProps;
        };
    }
>;

export type CSelectLabelProps = ChocoStyledProps<typeof MuiInputLabel>;
export type CSelectHelperProps = ChocoStyledProps<typeof FormHelperText>;
export type CSelectControlProps = ChocoStyledProps<typeof MuiFormControl>;
export type CSelectItemProps = ChocoStyledProps<
    typeof MuiMenuItem,
    { setClr?: ColorType; outline?: boolean; disabled?: boolean }
>;

export function CSelectItem({
    setClr,
    outline,
    disabled,
    ...props
}: CSelectItemProps) {
    const { getFont } = useFont();
    const getSetClrProps = useGetsetClrProps();

    return (
        <MenuItem
            {...useChocoProps(
                props,
                () => {
                    const fontStyle = getFont();
                    const { styles, setClrs } = getSetClrProps({
                        setClr,
                        outline,
                        disabled,
                        focus: false,
                    });

                    return {
                        cs: {
                            ...fontStyle,
                            ...styles,
                            '&.Mui-selected': {
                                clr: setClrs?.bgColor,
                                bgClr: setClrs?.color,
                                '&:hover': {
                                    bgClr: setClrs?.action,
                                },
                            },
                            '&.Mui-focusVisible': {
                                clr: setClrs?.color,
                                bgClr: setClrs?.bgHover,
                            },
                            '&.Mui-selected&.Mui-focusVisible': {
                                clr: setClrs?.action,
                                bgClr: setClrs?.bgHover,
                            },
                        },
                    };
                },
                [getSetClrProps],
            )}
        />
    );
}

export function CSelect<
    Value extends CSelectValue,
    Option extends CSelectOptions<Value>,
>({
    id,
    value,
    props,
    label,
    setValue,
    render,
    helper,
    setClr,
    outline,
    options = [],
    disabled,
    onChange,
    defaultValue,
    ...prop
}: CSelectProps<Value, Option>) {
    const { getFont } = useFont();
    const getSetClrProps = useGetsetClrProps();

    const labelProps = useChocoProps(
        props?.label ?? {},
        ({ theme }) => {
            const fontStyle = getFont('medium');
            const { setClrs } = getSetClrProps({
                setClr,
                outline,
                disabled,
            });

            return {
                cs: {
                    ...fontStyle,
                    clr: setClrs?.bgHover,
                    borR: theme.root.size.border,
                    px: theme.root.size.padding / 2,
                    '&.Mui-focused': {
                        clr: setClrs?.bgColor,
                    },
                    '&[data-shrink=true]': {
                        bgClr: setClrs?.borColor,
                    },
                },
            };
        },
        [],
    );

    const selectProps = useChocoProps(prop, () => {
        const fontStyle = getFont('medium');
        const { styles } = getSetClrProps({
            setClr,
            outline,
            disabled,
        });
        return { cs: { ...fontStyle, ...styles } };
    });

    return (
        <FormControl {...props?.control}>
            {(props?.label || label) && (
                <InputLabel id={id} {...labelProps}>
                    {label}
                </InputLabel>
            )}
            <Select
                labelId={id}
                variant="outlined"
                value={value ?? defaultValue ?? ''}
                onChange={(pointerEvent, component) => {
                    onChange?.(pointerEvent, component);
                    const newValue = pointerEvent.target?.value as Value;
                    setValue?.(newValue);
                }}
                {...selectProps}
            >
                {options.map((option, index) =>
                    render ? (
                        render({ index, option, Item: CSelectItem })
                    ) : typeof option === 'object' && !Array.isArray(option) ? (
                        <CSelectItem
                            key={index}
                            cs={option.cs}
                            outline={outline}
                            disabled={disabled}
                            value={option.value ?? ''}
                            setClr={option.setClr ?? setClr}
                            onClick={() => option.callback?.()}
                        >
                            {option.label ?? option.value}
                        </CSelectItem>
                    ) : (
                        <CSelectItem
                            key={index}
                            value={option ?? ''}
                            setClr={setClr}
                            outline={outline}
                            disabled={disabled}
                        >
                            {option}
                        </CSelectItem>
                    ),
                )}
            </Select>
            <HelperText {...props?.helper}>{helper}</HelperText>
        </FormControl>
    );
}
