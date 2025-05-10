//-Path: "react-choco-style/src/components/CNavigation.tsx"
import { CIcon } from './CIcon';
import { TypeIcon } from '../custom/Icon';
import { ColorType } from '../types/color';
import { CsType, ToType } from '../types/choco';
import { useNavigate } from '../hook/ReactRoute';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { useResponseCs } from '../hook/ChocoResponse';
import { ChocoStyledProps } from '../types/chocoHook';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

const Navigation = createStyled(BottomNavigation, 'CNavigation')();
const Action = createStyled(BottomNavigationAction, 'CNavigationAction')();

export type CNavigationOption<Value> = {
    to?: ToType;
    fa?: TypeIcon;
    value: Value;
    label: string;
    setClr?: ColorType;
    disabled?: boolean;
    icon?: React.ReactNode;
    prop?: CNavigationActionProps;
};

export type CNavigationRenderProps<Value> = CNavigationOption<Value> & {
    Action: typeof CNavigationAction;
};

export type CNavigationRender<Value> = (
    prop: CNavigationRenderProps<Value>,
) => React.ReactNode;

export type CNavigationActionProps = ChocoStyledProps<
    typeof BottomNavigationAction,
    {
        to?: ToType;
        text?: boolean;
        labelCs?: CsType;
        outline?: boolean;
        setClr?: ColorType;
    }
>;

export type CNavigationProps<Value> = Omit<
    ChocoStyledProps<typeof BottomNavigation>,
    'children'
> & {
    value?: Value;
    text?: boolean;
    outline?: boolean;
    setClr?: ColorType;
    disabled?: boolean;
    setValue?: (value: Value) => void;
    options?: (Value | CNavigationOption<Value>)[];
    children?: React.ReactNode | CNavigationRender<Value>;
};

export function CNavigationAction({
    to,
    text,
    setClr,
    outline,
    labelCs,
    onClick,
    disabled,
    ...prop
}: CNavigationActionProps) {
    const navigate = useNavigate();
    const responseCs = useResponseCs();

    return (
        <Action
            {...useChocoProps(
                prop,
                ({ size, theme, mixCsProps, getSetClrProps }) => {
                    const { padding } = theme.root.size;
                    const { styles, disableds } = getSetClrProps({
                        text,
                        setClr,
                        outline,
                        disabled,
                        defaultColor: 'secondaryText',
                    });

                    return {
                        cs: {
                            ...disableds,
                            fontS: size(),
                            px: size(-padding),
                            minW: size((size) => size * 5),
                            maxW: size((size) => size * 10),
                            '&.Mui-selected': {
                                ...styles,
                                fontS: size((size) => size * 1.2),
                            },
                            '& .MuiBottomNavigationAction-label': {
                                ...responseCs(
                                    mixCsProps(
                                        {
                                            fontS: size(),
                                            '&.Mui-selected': {
                                                fontS: size(),
                                            },
                                        },
                                        labelCs,
                                    ),
                                ),
                            },
                        },
                    };
                },
            )}
            onClick={(event) => {
                if (disabled) return;
                onClick?.(event);
                navigate(to);
            }}
        />
    );
}
export function CNavigation<Value>({
    text,
    value,
    setClr,
    outline,
    options,
    children,
    disabled,
    setValue,
    onChange,
    ...prop
}: CNavigationProps<Value>) {
    return (
        <Navigation
            {...useChocoProps(prop, ({ theme, size }) => {
                const { box } = theme.root.size;
                return {
                    cs: {
                        j: 'e',
                        bgClr: null,
                        h: size(-box),
                    },
                };
            })}
            value={value}
            onChange={(event, newValue) => {
                setValue?.(newValue);
                onChange?.(event, newValue);
            }}
        >
            {options?.map((op, index) => {
                const option = op as CNavigationOption<Value>;
                const to = option.to;
                const label = option?.label ?? option;
                const value = (option?.value ?? label) as Value;
                const icon = option.fa ? (
                    <CIcon trans={0.3} fa={option.fa} />
                ) : (
                    option.icon
                );
                const prop = { ...option.prop };

                const Action = (
                    <CNavigationAction
                        to={to}
                        key={index}
                        text={text}
                        icon={icon}
                        value={value}
                        label={label}
                        setClr={setClr}
                        outline={outline}
                        disabled={option.disabled}
                        {...prop}
                    />
                );

                const childrenProps: CNavigationRenderProps<Value> = {
                    fa: option.fa,
                    to,
                    prop,
                    icon,
                    value,
                    label,
                    Action: CNavigationAction,
                    disabled: option.disabled,
                };

                return typeof children === 'function'
                    ? children(childrenProps)
                    : children ?? Action;
            })}
        </Navigation>
    );
}
