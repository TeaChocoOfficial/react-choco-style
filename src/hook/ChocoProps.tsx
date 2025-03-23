//-Path: "react-choco-style/src/hook/ChocoProps.tsx"
import { useMemo } from 'react';
import { ChocoStyledProps } from '../types/chocoHook';

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
        method: () => Partial<any>,
        removes: (keyof Props)[] = [],
    ): Partial<Props> {
        return useMemo(() => {
            const newProps = method();
            const mergedCs = { ...(prop.cs || {}), ...(newProps.cs || {}) };
            const combinedProps = { ...prop, ...newProps, cs: mergedCs };
            return Object.fromEntries(
                Object.entries(combinedProps).filter(
                    ([key]) => !removes.includes(key as keyof Props),
                ),
            ) as Partial<Props>;
        }, [prop, method, removes]);
    }
}
