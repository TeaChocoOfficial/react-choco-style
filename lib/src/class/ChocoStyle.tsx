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
import { CsType } from '../types/choco';
import { ChocoProp } from './ChocoProp';
import { SizeValue } from '../types/size';
import { useChocoHook } from '../hooks/useChocoHook';
import { ChocoResponse } from './ChocoResponse';
import { InnerWidthAtom } from '../temp/innerWidth';
import { ReactTagType, SxProp } from '../types/style';
import { Theme as MuiTheme, styled } from '@mui/material';
import { ChocoCompoentPropsType } from '../types/chocoStyle';
import { keysChocoStyleProps } from '../data/reservedKeywords';
export class ChocoStyle {
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
                const chocoProp = new ChocoProp();
                const innerWidth = InnerWidthAtom.get();
                const chocoResponse = new ChocoResponse();
                const { motion, debug, ...rest } = props;

                const { sx, componentProps } = useMemo(() => {
                    const styleProps = chocoProp.style(
                        rest as ChocoCompoentPropsType,
                    );

                    const sx = chocoResponse.chocoStyle<SxProp>(styleProps);
                    const newProps = Obj.omit(rest, ...keysChocoStyleProps);
                    const componentProps = Obj.mix(motion, newProps);

                    Debug.if(debug, {
                        props,
                        styleProps,
                        rest,
                        sx,
                        componentProps,
                    });
                    return { sx, componentProps };
                }, [props, chocoResponse, innerWidth]);

                return <MotionComponent sx={sx} {...componentProps} />;
            };
        };
    }
    static props<
        TagType extends ReactTagType,
        Props extends ChocoStyledProps<TagType>,
        MuiProps extends Partial<ChocoStylesPropsType<TagType>>,
    >(
        prop: Props,
        method: (option: OptionPropsType) => MuiProps = () => ({} as MuiProps),
        deps: React.DependencyList = [],
    ): MuiProps {
        const optionProps = useChocoHook(prop);

        return useMemo(() => {
            // const styleProps = optionProps.chocoProp.style(
            //     prop as ChocoCompoentPropsType,
            // );
            const newProps = method(optionProps);
            console.log(newProps.cs, prop.cs);

            // const mergedCs = Obj.mix(newProps.cs ?? {}, prop.cs);
            const combinedProps: MuiProps = { ...newProps, ...prop };
            return combinedProps;
        }, [prop, method, ...deps]);
    }
}
