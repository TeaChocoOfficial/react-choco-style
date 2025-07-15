//-Path: "react-choco-style/lib/src/hook/ChocoProps.tsx"
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
import { Size } from '../class/size';
import { useCallback, useMemo } from 'react';
import { ReactTagType } from '../types/style';
import { useFont, useTheme } from './ChocoStyle';
import { SizeOption, Sizes, SizesType } from '../types/size';
import { CsType, ChocoStylesPropsType } from '../types/choco';
import { useGetsetClr, useGetsetClrProps } from './ChocoColor';

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

    return {
        getSize: useCallback(
            (prop: ChocoStyledProps<TagType>): UseSizeType => {
                const { cs } = prop;
                const chocoStyles = responseCs(cs);
                const getSz = (): Sizes<number> | undefined => {
                    const sizes = (prop['sz'] ?? chocoStyles['sz']) as Sizes;

                    if (sizes !== undefined) {
                        if (Size.is(sizes)) {
                            return sizes as Size<number>;
                        } else if (typeof sizes === 'number') {
                            if (sizes < 0) return new Size(sizes);
                            else return sizes;
                        }
                    }
                };
                return (option?: SizeOption<number>) => {
                    const root = option?.root
                        ? typeof option.root === 'number'
                            ? option.root
                            : theme.root.size[option.root]
                        : theme.root.size.base;
                    const response = option?.root
                        ? typeof option.root === 'number'
                            ? option.root
                            : theme.root.response[option.root]
                        : theme.root.response.base;
                    const value = getSz() ?? root;

                    const newOption: SizeOption<number> = {
                        ...option,
                        root,
                        calc: (value, root) =>
                            option?.calc?.(value / response, root) ??
                            value / response,
                        check:
                            option?.check === undefined ? true : option.check,
                    };

                    return new Size<number>(
                        value,
                        newOption,
                    ) as SizesType<number>;
                };

                // function sizeFn<Value = number, Root = number>(
                //     root?: Root,
                // ): Sizes<Value>;
                // function sizeFn<Value = number, Root = number>(
                //     calc?: (size: Root) => Value,
                //     root?: Root,
                // ): Sizes<number>;
                // function sizeFn<Value = number, Root = number>(
                //     calcOrRoot?: ((size: Root) => Value) | Root,
                //     root?: Root,
                // ): Sizes<Value> {
                //     const isCalcFunction = typeof calcOrRoot === 'function';
                //     const calc = isCalcFunction
                //         ? (calcOrRoot as (size: Root) => Value)
                //         : undefined;
                //     const size = isCalcFunction ? root : calcOrRoot;
                //     const sizes: Root | Sizes<number> =
                //         getSz() ?? size ?? theme.root.size.text;

                //     console.log(sizes, size, getSz(), theme.root.size.text);
                //     if (Size.is(sizes)) {
                //         return sizes as Size<Value>;
                //     } else if (typeof sizes === 'number') {
                //         if (sizes < 0) {
                //             return new Size(
                //                 Size.callback(sizes * -1, (value: Root) => {
                //                     const result = calc?.(value) ?? value;
                //                     return result;
                //                 }),
                //             ) as Size<Value>;
                //         } else {
                //             return (calc?.(sizes as Root) ?? sizes) as Value;
                //         }
                //     }
                //     return Size.callback(
                //         sizes,
                //         (value: Root) => calc?.(value) ?? value,
                //     ) as Sizes<Value>;
                // }

                // return sizeFn;
            },
            [theme, responseCs],
        ),
    };
}

export function useChocoProps<
    TagType extends ReactTagType,
    Props extends ChocoStyledProps<TagType>,
    MuiProps extends Partial<ChocoStylesPropsType<TagType>>,
>(
    prop: Props,
    method: (props: CustomStylesTypeProp) => MuiProps = () => ({} as MuiProps),
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

    return useMemo(() => {
        const style = propChocoStyle(prop);
        const methodProps: CustomStylesTypeProp = {
            Size,
            size: getSize(prop),
            style,
            theme,
            getFont,
            getSize,
            getsetClr,
            mixCsProps,
            responseCs,
            getSetClrProps,
        };
        const newProps = method(methodProps);
        const mergedCs = mixCsProps(newProps.cs as CsType, prop.cs);
        const combinedProps: MuiProps = { ...newProps, ...prop, cs: mergedCs };
        return combinedProps;
    }, [prop, method, ...deps]);
}
