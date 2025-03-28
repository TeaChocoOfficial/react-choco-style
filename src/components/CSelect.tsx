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
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoProps } from '../hook/ChocoProps';
import { ChocoStyleType } from '../types/choco';
import { ChocoStyledProps } from '../types/chocoHook';

const Select = ChocoStyle.styled(MuiSelect, 'CSelect')();
const MenuItem = ChocoStyle.styled(MuiMenuItem, 'CSelectItem')();
const InputLabel = ChocoStyle.styled(MuiInputLabel, 'CSelectLabel')();
const HelperText = ChocoStyle.styled(FormHelperText, 'CHelperText')();
const FormControl = ChocoStyle.styled(
    MuiFormControl,
    'CSelectControl',
)(({ theme }) => ({
    sx: theme.root.size.text,
}));

export type CSelectValue = string | number | string[] | undefined;

export type CSelectOptions<Value extends CSelectValue> =
    | CSelectValue
    | {
          value?: Value;
          cs?: ChocoStyleType;
          boxCs?: ChocoStyleType;
          label?: React.ReactNode;
          setClr?: ColorType;
      };
export type CSelectRender<
    Value extends CSelectValue,
    Option extends CSelectOptions<Value> = CSelectOptions<Value>,
> = (prop: {
    index: number;
    option: Option;
    Item: typeof CSelectItem;
}) => React.ReactNode;

export type CSelectProps<
    Value extends CSelectValue,
    Option extends CSelectOptions<Value> = CSelectOptions<Value>,
> = ChocoStyledProps<
    typeof MuiSelect,
    {
        value?: Value;
        helper?: string;
        setClr?: ColorType;
        outline?: boolean;
        options?: Option[];
        disabled?: boolean;
        render?: CSelectRender<Value, Option>;
        onChange?: (
            event: SelectChangeEvent<unknown>,
            child: React.ReactNode,
        ) => void; // กำหนด onChange ให้ชัดเจน
        props?: {
            label?: CSelectLabelProps;
            control?: CSelectControlProps;
        };
    }
>;

export type CSelectLabelProps = ChocoStyledProps<typeof MuiInputLabel>;
export type CSelectControlProps = ChocoStyledProps<typeof MuiFormControl>;

export type CSelectItemProps = ChocoStyledProps<
    typeof MuiMenuItem,
    {
        setClr?: ColorType;
        outline?: boolean;
        disabled?: boolean;
    }
>;

export function CSelectItem<Props extends CSelectItemProps>({
    setClr,
    outline,
    disabled,
    ...props
}: Props) {
    const { getFont } = ChocoStyle.useFont();
    const getSetClrProps = ChocoStyle.useGetsetClrProps();

    return (
        <MenuItem
            {...ChocoProps.useChocoProps(
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
                [],
                [getSetClrProps],
            )}
        />
    );
}

export function CSelect<
    Value extends CSelectValue,
    Option extends CSelectOptions<Value> = CSelectOptions<Value>,
    Props extends CSelectProps<Value, Option> = CSelectProps<Value, Option>,
>({
    id,
    props,
    label,
    render,
    helper,
    setClr,
    outline,
    options,
    disabled,
    ...prop
}: Props) {
    const { getFont } = ChocoStyle.useFont();
    const getSetClrProps = ChocoStyle.useGetsetClrProps();

    return (
        <FormControl {...props?.control}>
            {(props?.label || label) && (
                <InputLabel
                    id={id}
                    {...ChocoProps.useChocoProps(
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
                                    px: theme.root.size.padding / 2,
                                    borR: theme.root.size.border,
                                    clr: setClrs?.bgHover,
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
                    )}
                >
                    {label}
                </InputLabel>
            )}
            <Select
                labelId={id}
                variant="outlined"
                {...ChocoProps.useChocoProps(prop, () => {
                    const fontStyle = getFont('medium');
                    const { styles } = getSetClrProps({
                        setClr,
                        outline,
                        disabled,
                    });
                    return {
                        cs: {
                            ...fontStyle,
                            ...styles,
                        },
                    };
                })}
            >
                {options?.map((option, index) =>
                    render ? (
                        render({ index, option, Item: CSelectItem })
                    ) : typeof option === 'object' && !Array.isArray(option) ? (
                        <CSelectItem
                            key={index}
                            cs={option.cs}
                            outline={outline}
                            disabled={disabled}
                            value={option.value}
                            setClr={option.setClr ?? setClr}
                        >
                            {option.label ?? option.value}
                        </CSelectItem>
                    ) : (
                        <CSelectItem key={index} value={option} setClr={setClr}>
                            {option}
                        </CSelectItem>
                    ),
                )}
            </Select>
            <HelperText>{helper}</HelperText>
        </FormControl>
    );
}
