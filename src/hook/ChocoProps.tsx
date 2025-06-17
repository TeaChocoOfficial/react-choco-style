//-Path: "react-choco-style/src/hook/ChocoProps.tsx"
import {
    useMixCsProps,
    useResponseCs,
    usePropChocoStyle,
} from './ChocoResponse';
import {
    UseSizeType,
    ChocoStyledProps,
    CustomStylesTypeProp,
} from '../types/chocoHook';
import { Obj } from '../custom/obj';
import { useFormat } from './ChocoFormat';
import { StyleTypes } from '../types/choco';
import { Size, Sizes } from '../types/size';
import { useCallback, useMemo } from 'react';
import { ReactTagType } from '../types/style';
import { useFont, useTheme } from './ChocoStyle';
import { useGetsetClr, useGetsetClrProps } from './ChocoColor';

// export class ChocoProps {}

export function removeReservedProps<Props extends Record<string, any>>(
    reservedKeywords: string[],
    props: Props = {} as Props,
): Props {
    const newProps = { ...props };
    reservedKeywords.forEach((keyword) => delete newProps[keyword]);
    return newProps;
}

export function removeProps<Props extends Record<string, any>>(
    props: Props,
    removes: (keyof Props)[],
): Partial<Props> {
    const newProps = { ...props };
    removes.forEach((key) => delete newProps[key]);
    return newProps;
}

export function useGetSizeProps<TagType extends ReactTagType = ReactTagType>() {
    const theme = useTheme();
    const responseCs = useResponseCs();
    const { callbackSize } = useFormat();

    return {
        getSize: useCallback(
            (prop: ChocoStyledProps<TagType>): UseSizeType => {
                const { cs } = prop;
                const chocoStyles = responseCs(cs);
                const render = (key: string): Sizes<number> | undefined => {
                    const sizes = (prop[key] ??
                        chocoStyles[key as keyof StyleTypes]) as Sizes;

                    if (sizes !== undefined) {
                        if (typeof sizes === 'object' && sizes !== null) {
                            const size = sizes as Size<number>;
                            const keys = Obj.keys(size);

                            if (
                                keys.every((k) => typeof size[k] === 'number')
                            ) {
                                return size as Sizes<number>;
                            }
                        } else if (typeof sizes === 'number') {
                            return sizes;
                        }
                    }
                };

                function sizeFn<Value = number, Root = number>(
                    root?: Root,
                ): Sizes<Value>;
                function sizeFn<Value = number, Root = number>(
                    calc?: (size: Root) => Value,
                    root?: Root,
                ): Sizes<number>;
                function sizeFn<Value = number, Root = number>(
                    calcOrRoot?: ((size: Root) => Value) | Root,
                    root?: Root,
                ): Sizes<Value> {
                    const isCalcFunction = typeof calcOrRoot === 'function';
                    const calc = isCalcFunction
                        ? (calcOrRoot as (size: Root) => Value)
                        : undefined;
                    const size = isCalcFunction
                        ? typeof root === 'number'
                            ? -root
                            : root
                        : typeof calcOrRoot === 'number'
                        ? -calcOrRoot
                        : calcOrRoot;
                    const sizes = size ?? render('sz') ?? -theme.root.size.text;

                    if (typeof sizes === 'number') {
                        if (sizes < 0) {
                            return callbackSize(sizes * -1, (value: Root) => {
                                const result = calc?.(value) ?? value;
                                return result;
                            }) as Size<Value>;
                        } else {
                            return (calc?.(sizes as Root) ?? sizes) as Value;
                        }
                    }
                    const results = callbackSize(sizes, (value: Root) => {
                        const result = calc?.(value) ?? value;
                        return result;
                    });
                    return results as Sizes<Value>;
                }

                return sizeFn;
            },
            [theme, responseCs, callbackSize],
        ),
    };
}

export function useChocoProps<
    TagType extends ReactTagType,
    Props extends ChocoStyledProps<TagType>,
    MuiProps extends Partial<ChocoStyledProps<ReactTagType>>,
>(
    prop: Props,
    method: (props: CustomStylesTypeProp) => MuiProps,
    deps: React.DependencyList = [],
): MuiProps {
    const theme = useTheme();
    const { getFont } = useFont();
    const getsetClr = useGetsetClr();
    const mixCsProps = useMixCsProps();
    const responseCs = useResponseCs();
    const getSetClrProps = useGetsetClrProps();
    const propChocoStyle = usePropChocoStyle();
    const { getSize } = useGetSizeProps<TagType>();
    const { isSize, formatSize, callbackSize } = useFormat();

    return useMemo(() => {
        const style = propChocoStyle(prop);
        const methodProps: CustomStylesTypeProp = {
            size: getSize(prop),
            style,
            theme,
            isSize,
            getFont,
            getSize,
            getsetClr,
            mixCsProps,
            formatSize,
            responseCs,
            callbackSize,
            getSetClrProps,
        };
        const newProps = method(methodProps);
        const mergedCs = mixCsProps(newProps.cs, prop.cs);
        const combinedProps = { ...newProps, ...prop, cs: mergedCs };
        return combinedProps;
    }, [prop, method, ...deps]);
}
