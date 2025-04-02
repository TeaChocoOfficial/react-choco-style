//-Path: "react-choco-style/src/hook/ChocoProps.tsx"
import { useMemo } from 'react';
import { useFormat } from './ChocoFormat';
import { ReactTagType } from '../types/style';
import { useFont, useTheme } from './ChocoStyle';
import { useMixCsProps, usePropChocoStyle } from './ChocoResponse';
import { ChocoStyledProps, CustomStylesTypeProp } from '../types/chocoHook';

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

export function useChocoProps<
    TagType extends ReactTagType,
    Props extends ChocoStyledProps<TagType>,
>(
    prop: Props,
    method: (props: CustomStylesTypeProp) => Partial<any>,
    deps: React.DependencyList = [],
): Partial<Props> {
    const theme = useTheme();
    const mixCsProps = useMixCsProps();
    const { getSize, getFont } = useFont();
    const propChocoStyle = usePropChocoStyle();
    const { formatSize, callbackSize } = useFormat();

    return useMemo(() => {
        const style = propChocoStyle(prop);
        const newProps = method({
            style,
            theme,
            getFont,
            getSize,
            formatSize,
            callbackSize,
        });
        const mergedCs = mixCsProps(prop.cs, newProps.cs);
        const combinedProps = { ...prop, ...newProps, cs: mergedCs };
        return combinedProps;
    }, [prop, method, ...deps]);
}
