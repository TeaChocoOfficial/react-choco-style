//-Path: "react-choco-style/src/hook/ChocoFormat.tsx"
import {
    IsSizeType,
    FormatSizeType,
    CallbackSizeType,
} from '../types/chocoHook';
import { useMemo } from 'react';
import { useTheme } from './ChocoStyle';
import { Size, SizeKey, SizeValue } from '../types/size';

// export class ChocoFormat {
//     static use = useFormat;
// }
export function useFormat(): {
    isSize: IsSizeType;
    formatSize: FormatSizeType;
    callbackSize: CallbackSizeType;
} {
    const { breakpoint } = useTheme();

    return useMemo(() => {
        function isSize(size: unknown): size is Size {
            const breakpointKeys = Object.keys(breakpoint.size) as SizeKey[];
            if (size && typeof size === 'object') {
                const sizeKeys = Object.keys(size) as (keyof Size)[];
                return sizeKeys.every((key) => breakpointKeys.includes(key));
            }
            return false;
        }
        function formatSize<S = SizeValue>(
            max: number,
            format: Record<SizeKey, number> = breakpoint.format,
            unit: string | undefined = undefined,
        ): Size<S> {
            const keySize = Object.keys(format) as SizeKey[];
            const output = keySize.reduce<Size<S>>((acc, key) => {
                acc[key] = 0 as S;
                return acc;
            }, {} as Size<S>);
            keySize.forEach((key) => {
                const value = ((format[key] ?? 100) * (max / 100)) as S;
                output[key as SizeKey] = unit
                    ? (`${value}${unit}` as S)
                    : value;
            });
            return output;
        }
        return {
            isSize,
            formatSize,
            callbackSize: <MaxSize, Value, Return>(
                size: MaxSize,
                callback: (value: Value, key: SizeKey) => Return,
                fristValue?: Value,
            ): Size<Return> => {
                let sizes: Size<Return> = {};
                const keysBreakpoint = Object.keys(
                    breakpoint.size,
                ) as SizeKey[];
                if (typeof size === 'number') {
                    sizes = formatSize(size);
                } else if (isSize(size)) {
                    const Size = size as object;
                    const sizeKeys = Object.keys(Size) as (keyof Size)[];
                    if (sizeKeys.find((key) => keysBreakpoint.includes(key))) {
                        const keySize = Object.keys(
                            breakpoint.format,
                        ) as SizeKey[];
                        sizes = keySize.reduce<Size<Return>>((acc, key) => {
                            if (Size[key as keyof typeof Size] !== undefined)
                                acc[key] = Size[
                                    key as keyof typeof Size
                                ] as Return;
                            return acc;
                        }, {});
                    } else {
                        const keySize = Object.keys(
                            breakpoint.format,
                        ) as SizeKey[];
                        sizes = keySize.reduce<Size<Return>>((acc, key) => {
                            acc[key] = Size as unknown as Return;
                            return acc;
                        }, {});
                    }
                }

                const output: Size<Return> = { ...sizes };
                const keys = Object.keys(sizes) as SizeKey[];
                keys.forEach((key) => {
                    const value = (
                        sizes[key] === undefined ? fristValue : sizes[key]
                    ) as Value;
                    fristValue = value;
                    output[key] = callback(value, key);
                });
                return output;
            },
        };
    }, [breakpoint]);
}
