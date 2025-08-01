//-Path: "react-choco-style/lib/src/class/ChocoStyle.tsx"
import {
    PaletteType,
    PalettesType,
    UseChocoThemeType,
    BaseChocoThemeType,
} from '../types/theme';
import {
    OptionPropsType,
    ChocoStyledProps,
    ChocoStylesPropsType,
} from '../types/chocoHook';
import { useMemo } from 'react';
import Debug from '../config/debug';
import { motion } from 'framer-motion';
import { Obj } from '@teachoco-dev/cli';
import { ChocoProp } from './ChocoProp';
import { SizeValue } from '../types/size';
import { ChocoResponse } from './ChocoResponse';
import { getInnerSize } from '../hooks/getInnerSize';
import { useChocoHook } from '../hooks/useChocoHook';
import { ReactTagType, SxProp } from '../types/style';
import { DebugLayout } from '../config/DebugLayout';
import { ChocoStyleTypes, CsType } from '../types/choco';
import { Theme as MuiTheme, styled } from '@mui/material';
import { ChocoCompoentPropsType } from '../types/chocoStyle';
import { keysChocoStyleProps } from '../data/reservedKeywords';

export class ChocoStyle {
    constructor(public cs: ChocoStyleTypes = {}) {}
    add(cs: ChocoStyleTypes): this {
        this.cs = Obj.mix(this.cs, cs);
        return this;
    }
    pop(cs: ChocoStyleTypes): this {
        this.cs = Obj.mix(cs, this.cs);
        return this;
    }
    get clone(): ChocoStyle {
        const clone = new ChocoStyle({ ...this.cs });
        return clone;
    }
    static toUseTheme(
        { mode, root, fonts, modes, breakpoint }: BaseChocoThemeType,
        muiTheme: MuiTheme,
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
                setMode: (mode) => {
                    // setMode?.(mode);
                    // getThemeMode(mode);
                },
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
                return chocoResponse.chocoStyle(responseCs(cs)) as Record<
                    string,
                    SizeValue
                >;
            });

            const MotionComponent = motion.create(StyledComponent);
            return (props: ChocoStyledProps<TagType>) => {
                const innerSize = getInnerSize();
                const chocoProp = new ChocoProp();
                const chocoResponse = new ChocoResponse();
                const { motion, debug, compo, ...rest } = props;

                const { sx, componentProps } = useMemo(() => {
                    const styleProps = chocoProp.style(
                        rest as ChocoCompoentPropsType,
                    );

                    const sx = chocoResponse.chocoStyle<SxProp>(styleProps);
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
                        <MotionComponent
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
                    ? method({ ...optionProps, style: styleProps })
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
