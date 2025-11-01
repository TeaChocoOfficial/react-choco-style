//-Path: "react-choco-style/lib/src/class/ChocoStyle.tsx"
import {
    PaletteType,
    PalettesType,
    UseChocoThemeType,
    BaseChocoThemeType,
    ChocoThemeMethodType,
} from '../types/theme';
import {
    OptionPropsType,
    ChocoStyledProps,
    ChocoStylesPropsType,
} from '../types/chocoHook';
import { useMemo } from 'react';
import Debug from '../config/debug';
import { Template } from './Template';
import { motion } from 'framer-motion';
import { Obj } from '@teachoco-dev/cli';
import { ChocoProp } from './ChocoProp';
import { ChocoResponse } from './ChocoResponse';
import { DebugLayout } from '../config/DebugLayout';
import { getInnerSize } from '../hooks/getInnerSize';
import { useChocoHook } from '../hooks/useChocoHook';
import { ReactTagType, SxProp } from '../types/style';
import { ChocoStyleTypes, CsType } from '../types/choco';
import { Theme as MuiTheme, styled } from '@mui/material';
import { ChocoCompoentPropsType } from '../types/chocoStyle';
import { keysChocoStyleProps } from '../data/reservedKeywords';

export class ChocoStyle<
    CS extends ChocoStyleTypes = ChocoStyleTypes,
> extends Template<CS> {
    constructor(public cs: CS = {} as CS) {
        super();
    }

    add(cs: CS): this {
        this.cs = Obj.mix(this.cs, cs);
        return this;
    }

    pop(cs: CS): this {
        this.cs = Obj.mix(cs, this.cs);
        return this;
    }

    set(key: keyof CS, value: CS[keyof CS]): this {
        this.cs[key]; // = value;
        return this;
    }

    get clone(): ChocoStyle<CS> {
        const clone = new ChocoStyle<CS>({ ...this.cs });
        return clone;
    }

    map<Render, MethodValue = CS>(
        method: (
            value: MethodValue,
            key: keyof CS,
            index: number,
            array: (keyof CS)[],
        ) => Render,
    ): Render[] {
        return Obj.map(this.cs, (value, key, index, array) =>
            method(value as MethodValue, key, index, array),
        );
    }

    reduce<NewValue = CS[keyof CS], Render extends CS = CS>(
        method: (
            value: CS,
            key: keyof ChocoStyleTypes,
            index: number,
            array: (keyof ChocoStyleTypes)[],
        ) => NewValue,
    ): Render {
        return ChocoStyle.reduce<CS, NewValue, Render>(this.cs, method);
    }

    static reduce<
        Value = ChocoStyleTypes[keyof ChocoStyleTypes],
        NewValue = ChocoStyleTypes[keyof ChocoStyleTypes],
        Render extends ChocoStyleTypes = ChocoStyleTypes,
    >(
        value: ChocoStyleTypes,
        method: (
            value: Value,
            key: keyof ChocoStyleTypes,
            index: number,
            array: (keyof ChocoStyleTypes)[],
        ) => NewValue,
    ): Render {
        const render = Obj.reduce(
            value,
            (acc, key, value, index, array) => {
                const newValue = method(value as Value, key, index, array);
                (acc as any)[key] = newValue;
                return acc;
            },
            { ...value } as ChocoStyleTypes,
        );
        return render as Render;
    }
    static toUseTheme(
        { mode, root, fonts, modes, breakpoint }: BaseChocoThemeType,
        muiTheme: MuiTheme,
        setMode: ChocoThemeMethodType['setMode'],
    ): UseChocoThemeType {
        const palette = Obj.mix<PalettesType<PaletteType>>(
            modes.default,
            modes[mode],
        );
        return {
            mode,
            root,
            modes,
            fonts,
            breakpoint,
            palette,
            method: {
                transitions: muiTheme?.transitions,
                setMode,
                spacing: (...factor) =>
                    factor
                        .map(
                            (f) =>
                                (typeof f === 'number'
                                    ? f * root.size.padding
                                    : f) + (root.unit.padding ?? ''),
                        )
                        .join(' '),
            },
        };
    }
    static styled<TagType extends ReactTagType>(
        tag: TagType,
        nameTag?: string,
    ) {
        return (cs?: CsType) => {
            const StyledComponent = styled(
                tag as unknown as keyof React.JSX.IntrinsicElements,
                { name: nameTag },
            )(() => {
                const chocoResponse = new ChocoResponse();
                const responseCs = useChocoHook().responseCs;
                return chocoResponse.chocoStyle(responseCs(cs))
                    .css as React.CSSProperties;
            });

            const MotionComponent = motion.create(StyledComponent);
            return (props: ChocoStyledProps<TagType>) => {
                const innerSize = getInnerSize();
                const chocoProp = new ChocoProp();
                const chocoResponse = new ChocoResponse();
                const { motion, debug, compo, ...rest } = props;
                const Component = motion ? MotionComponent : StyledComponent;

                const { sx, componentProps } = useMemo(() => {
                    const styleProps = chocoProp.style(
                        rest as ChocoCompoentPropsType,
                    );

                    const sx = chocoResponse.chocoStyle(styleProps).css;
                    const newProps = Obj.omit(rest, ...keysChocoStyleProps);
                    const componentProps = Obj.mix<
                        React.ComponentProps<TagType> &
                            ChocoStylesPropsType<TagType>
                    >(motion, newProps);

                    Debug.debug(debug, 'styled', {
                        props,
                        rest,
                        styleProps,
                        sx,
                        componentProps,
                    });
                    return { sx, componentProps };
                }, [props, chocoResponse, innerSize]);

                return (
                    <DebugLayout>
                        <Component
                            sx={sx}
                            component={compo}
                            data-debug={debug}
                            {...componentProps}
                        />
                    </DebugLayout>
                );
            };
        };
    }
    static props<
        TagType extends ReactTagType,
        Props extends ChocoStyledProps<TagType>,
        MuiProps extends Partial<ChocoStylesPropsType<TagType>>,
    >(
        prop: Props,
        method:
            | ((option: OptionPropsType) => MuiProps)
            | MuiProps = {} as MuiProps,
        deps: React.DependencyList = [],
    ): MuiProps {
        const optionProps = useChocoHook({ ...prop });

        return useMemo(() => {
            const styleProps = optionProps.chocoProp.style(prop);
            const newProps =
                typeof method === 'function'
                    ? method({ ...optionProps, style: styleProps.cs })
                    : method;
            const mergedCs = optionProps.mixCs(newProps.cs, styleProps);
            const combinedProps: MuiProps = {
                ...newProps,
                ...prop,
                cs: mergedCs,
            };
            return combinedProps;
        }, [optionProps, prop, method, ...deps]);
    }
}
