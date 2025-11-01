//-Path: "lib/src/class/ChocoStyle.tsx"
import {
    PaletteType,
    PalettesType,
    UseChocoThemeType,
    BaseChocoThemeType,
    ChocoThemeMethodType,
} from '../../types/theme';
import { useMemo } from 'react';
import Debug from '../../config/debug';
import { motion } from 'framer-motion';
import { Obj } from '@teachoco-dev/cli';
import { CsType } from '../../types/choco';
import { ChocoProp } from '../hook/ChocoProp';
import { ReactTagType } from '../../types/style';
import { ChocoResponse } from '../hook/ChocoResponse';
import { DebugLayout } from '../../config/DebugLayout';
import { getInnerSize } from '../../hooks/getInnerSize';
import { useChocoHook } from '../../hooks/useChocoHook';
import { Theme as MuiTheme, styled } from '@mui/material';
import { ChocoCompoentPropsType } from '../../types/chocoStyle';
import { keysChocoStyleProps } from '../../data/reservedKeywords';
import { OptionPropsType, ChocoStyledProps } from '../../types/chocoHook';

export class ChocoStyle {
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
                                    ? f * root.multiply.padding
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
            )();

            const MotionComponent = motion.create(StyledComponent);
            return (props: ChocoStyledProps<TagType>) => {
                const innerSize = getInnerSize();
                const chocoHook = useChocoHook();
                const chocoProp = new ChocoProp();
                const responseCs = chocoHook.responseCs;
                const chocoResponse = new ChocoResponse();
                const { motion, debug, compo, ...rest } = props;
                const Component = motion ? MotionComponent : StyledComponent;

                const { sx, componentProps } = useMemo(() => {
                    const styleProps = chocoProp.style(
                        rest as ChocoCompoentPropsType,
                    );
                    const cssStyle = chocoResponse.chocoStyle(responseCs(cs));
                    const styleX = chocoResponse.chocoStyle(styleProps);
                    cssStyle.add(styleX);

                    const sx = cssStyle.css;
                    const newProps = Obj.omit(rest, ...keysChocoStyleProps);
                    const componentProps = Obj.mix<
                        React.ComponentProps<TagType> &
                            ChocoCompoentPropsType<TagType>
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
        MuiProps extends Partial<ChocoCompoentPropsType<TagType>>,
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
