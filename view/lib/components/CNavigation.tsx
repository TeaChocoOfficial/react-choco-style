//-Path: "lib/src/components/CNavigation.tsx"
import { CIcon } from './CIcon';
import { TypeIcon } from '../custom/Icon';
import { ColorType } from '../types/color';
import { CsType, ToType } from '../types/choco';
import { useNavigate } from '../hooks/ReactRoute';
import { useChocoHook } from '../hooks/useChocoHook';
import { ChocoStyledProps } from '../types/chocoHook';
import { ChocoStyle } from '../class/style/ChocoStyle';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

const Navigation = ChocoStyle.styled(BottomNavigation, 'CNavigation')();
const Action = ChocoStyle.styled(BottomNavigationAction, 'CNavigationAction')();

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
    const { responseCs } = useChocoHook();

    return (
        <Action
            {...ChocoStyle.props(prop, ({ sz, mixCs, chocoColor }) => {
                const { styles, disableds } = chocoColor.style({
                    text,
                    setClr,
                    outline,
                    disabled,
                    defaultColor: 'secondaryText',
                });

                return {
                    cs: {
                        ...disableds,
                        fontS: sz(),
                        px: sz({ sz: 'padding' }),
                        minW: sz({ calcs: [(after) => after.num * 5] }),
                        maxW: sz({ calcs: [(after) => after.num * 10] }),
                        '&.Mui-selected': {
                            ...styles,
                            fontS: sz({ calcs: [(after) => after.num * 1.2] }),
                        },
                        '& .MuiBottomNavigationAction-label': {
                            ...responseCs(
                                mixCs(
                                    {
                                        fontS: sz(),
                                        css: {
                                            '.Mui-selected': {
                                                fontS: sz(),
                                            },
                                        },
                                    },
                                    labelCs,
                                ),
                            ),
                        },
                    },
                };
            })}
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
            {...ChocoStyle.props(prop, ({ sz }) => ({
                cs: {
                    j: 'e',
                    bgClr: null,
                    h: sz({ sz: 'box' }),
                },
            }))}
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
