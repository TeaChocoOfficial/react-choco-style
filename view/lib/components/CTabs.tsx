//-Path: "lib/src/components/CTabs.tsx"
import {
    useNavigate,
    useActiveLink,
    useActivePaths,
} from '../hooks/ReactRoute';
import { useMemo } from 'react';
import { TypeIcon } from '../custom/Icon';
import { ColorType } from '../types/color';
import { CIcon, renderIcon } from './CIcon';
import { CsType, ToType } from '../types/choco';
import { ClrPropsType } from '../types/chocoColor';
import { ChocoStyledProps } from '../types/chocoHook';
import { ChocoStyle } from '../class/style/ChocoStyle';
import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import { CsStyle } from '../class/style/CsStyle';

const Tab = ChocoStyle.styled(MuiTab, 'CTab')();
const Tabs = ChocoStyle.styled(MuiTabs, 'CTabs')();

export type CTabValue = string | number | readonly string[] | undefined;

export type CTabsOtion<Value extends CTabValue> = {
    to?: ToType;
    fa?: TypeIcon;
    value?: Value;
    label?: string;
    prop?: CTabProps;
    outline?: boolean;
    setClr?: ColorType;
    disabled?: boolean;
    icon?: React.ReactNode;
};

export type CTabsChildernProps<Value extends CTabValue> = CTabsOtion<Value> & {
    Tab: typeof CTab;
};
export type CTabsChildern<Value extends CTabValue> = (
    prop: CTabsChildernProps<Value>,
) => React.ReactNode;

export type CTabProps = ChocoStyledProps<
    typeof MuiTab,
    ClrPropsType & {
        to?: ToType;
        label?: string;
        lowcase?: boolean;
        icon?: React.ReactNode | TypeIcon;
    },
    ['icon']
>;

export type CTabsProps<Value extends CTabValue> = ChocoStyledProps<
    typeof MuiTabs,
    ClrPropsType & {
        value?: Value;
        listCs?: CsType;
        lowcase?: boolean;
        indicatorCs?: CsType;
        indicatorCsBefore?: CsType;
        setValue?: (value: Value) => void;
        options?: (Value | CTabsOtion<Value>)[];
        children?: React.ReactNode | CTabsChildern<Value>;
    },
    ['children']
>;

export function CTab({
    to,
    icon,
    text,
    setClr,
    outline,
    lowcase,
    onClick,
    disabled,
    ...prop
}: CTabProps) {
    const navigate = useNavigate();

    return (
        <Tab
            icon={renderIcon<React.ReactElement>(icon)}
            {...ChocoStyle.props(prop, ({ sz, chocoColor, responseCs }) => {
                const { focus, styles, disableds } = chocoColor.style({
                    text,
                    setClr,
                    outline,
                    disabled,
                    defaultColor: 'secondary',
                });

                const cs = new CsStyle(disableds);
                cs.add({
                    minH: 0,
                    maxW: 0,
                    fontS: sz({ root: 'text' }),
                    txtTf: lowcase ? 'none' : undefined,
                    p: sz({ calcs: [(after) => after.num / 4] }),
                    minW: sz({ calcs: [(after) => after.num * 6] }),
                    css: {
                        ':focus': { z: 1, ...focus },
                        '.Mui-selected': responseCs(styles).cs,
                    },
                });

                return { cs };
            })}
            tabIndex={disabled ? -1 : undefined}
            onClick={(event) => {
                if (disabled) return;
                onClick?.(event);
                navigate(to);
            }}
        />
    );
}

export function CTabs<Value extends CTabValue>({
    text,
    value,
    setClr,
    listCs,
    lowcase,
    outline,
    options,
    children,
    setValue,
    onChange,
    disabled,
    indicatorCs,
    defaultValue,
    indicatorCsBefore,
    ...prop
}: CTabsProps<Value>) {
    const navigate = useNavigate();
    const activePaths = useActivePaths();
    const isActiveLink = useActiveLink();

    const activePath = useMemo(() => {
        if (!options) return undefined;
        const option = options as CTabsOtion<Value>[];
        const paths = option.map((op) => op?.to);
        const bestPath = activePaths(paths);
        return option.find((op) => op.to === bestPath);
    }, [options, activePaths, isActiveLink]);

    const currentValue = useMemo(() => {
        if (value !== undefined) return value;
        if (activePath) {
            return activePath.value ?? activePath.to ?? activePath.label;
        }
        if (options?.length) {
            const firstOption = options[0] as CTabsOtion<Value>;
            return (
                firstOption.value ?? firstOption.to ?? firstOption.label ?? '/'
            );
        }
        return '/';
    }, [value, activePath, options]);

    return (
        <Tabs
            value={currentValue}
            variant="scrollable"
            allowScrollButtonsMobile
            defaultValue={
                defaultValue ?? typeof options?.[0] === 'object'
                    ? (options?.[0] as CTabsOtion<Value>)?.value
                    : options?.[0]
            }
            {...ChocoStyle.props(
                prop,
                ({ sz, responseCs, chocoColor }) => {
                    const { setClrs } = chocoColor.style({
                        text,
                        setClr,
                        outline,
                        disabled,
                        defaultColor: 'secondary',
                    });

                    const cs = new CsStyle();
                    cs.add({
                        a: 'c',
                        dp: 'f',
                        minH: 0,
                        of: null,
                        css: {
                            ' .MuiTabScrollButton-root': {
                                clr: setClrs.action,
                                css: {
                                    ' svg': {
                                        fontS: sz({
                                            calcs: [(after) => after.num * 2],
                                        }),
                                    },
                                },
                            },
                            ' .MuiTabs-scroller': {
                                of: 'a',
                            },
                            ' .MuiTabs-scrollButtons.Mui-disabled': {
                                op: 0.3,
                            },
                            ' .MuiTabs-list': {
                                h: '100%',
                                ...responseCs(listCs).cs,
                            },
                            ' .MuiTabs-indicator': {
                                h: sz({ calcs: [(after) => after.num / 3] }),
                                ...responseCs(indicatorCs).cs,
                            },
                            ' .MuiTabs-indicator:before': {
                                l: 0,
                                t: 0,
                                pos: 'a',
                                w: '100%',
                                coten: '""',
                                bgClr: setClrs.action,
                                h: sz({ calcs: [(after) => after.num / 3] }),
                                ...responseCs(indicatorCsBefore).cs,
                            },
                        },
                    });

                    return {
                        cs,
                    };
                },
                [],
            )}
            onChange={(event, newValue) => {
                if (disabled) return;
                setValue?.(newValue);
                onChange?.(event, newValue);

                if (options) {
                    const selectedOption = options.find((op) => {
                        const option = op as CTabsOtion<Value>;
                        return [option.value, option.to, option.label].includes(
                            newValue,
                        );
                    }) as CTabsOtion<Value>;
                    if (selectedOption?.to) navigate(selectedOption.to);
                }
            }}
        >
            {options?.map((op, index) => {
                const option = op as CTabsOtion<Value>;
                const to = option.to;
                const label = option?.label ?? `${option}`;
                const tabValue = (option.value ?? to ?? label) as Value;
                const icon = option.fa ? (
                    <CIcon trans={0.3} fa={option.fa} />
                ) : option.icon !== undefined ? (
                    option.icon
                ) : null;
                const prop = { ...option.prop };

                const Tab = (
                    <CTab
                        to={to}
                        key={index}
                        icon={icon}
                        text={text}
                        label={label}
                        setClr={setClr}
                        value={tabValue}
                        lowcase={lowcase}
                        outline={outline}
                        disabled={disabled || option.disabled}
                        {...prop}
                    />
                );
                const childrenProps: CTabsChildernProps<Value> = {
                    fa: option.fa,
                    to,
                    prop,
                    icon,
                    label,
                    Tab: CTab,
                    value: tabValue,
                    disabled: disabled || option.disabled,
                };
                return typeof children === 'function'
                    ? children(childrenProps)
                    : children ?? Tab;
            })}
        </Tabs>
    );
}
