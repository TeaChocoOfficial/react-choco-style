//-Path: "react-choco-style/src/hook/ChocoProps.tsx"
import { useMemo } from 'react';
import { ChocoStyle } from './ChocoStyle';
import { ChocoFormat } from './ChocoFormat';
import { CustomStylesTypeProp, ChocoStyledProps } from '../types/chocoHook';

export class ChocoProps {
    static removeReservedProps<Props extends Record<string, any>>(
        reservedKeywords: string[],
        props: Props = {} as Props,
    ): Props {
        const newProps = { ...props };
        reservedKeywords.forEach((keyword) => delete newProps[keyword]);
        return newProps;
    }

    static removeProps<Props extends Record<string, any>>(
        props: Props,
        removes: (keyof Props)[],
    ): Partial<Props> {
        const newProps = { ...props };
        removes.forEach((key) => delete newProps[key]);
        return newProps;
    }

    static useChocoProps<
        TagType extends keyof React.JSX.IntrinsicElements,
        Props extends ChocoStyledProps<TagType>,
    >(
        prop: Props,
        method: ({
            theme,
            formatSize,
            callbackSize,
        }: CustomStylesTypeProp) => Partial<any>,
        removes: (keyof Props)[] = [],
    ): Partial<Props> {
        const theme = ChocoStyle.useTheme();
        const { formatSize, callbackSize } = ChocoFormat.useFormatSize();

        return useMemo(() => {
            const newProps = method({ formatSize, callbackSize, theme });
            const mergedCs = { ...(prop.cs || {}), ...(newProps.cs || {}) };
            const combinedProps = { ...prop, ...newProps, cs: mergedCs };
            return this.removeProps(combinedProps, removes) as Partial<Props>;
        }, [prop, method, removes]);
    }
}
