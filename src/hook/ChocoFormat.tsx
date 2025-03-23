//-Path: "react-choco-style/src/hook/ChocoFormat.tsx"
import { useMemo } from 'react';
import { ChocoStyle } from './ChocoStyle';
import { Size, SizeKey, SizeValue } from '../types/size';
import { CallbackSizeType, FormatSizeType } from '../types/chocoHook';

export class ChocoFormat {
    static useFormatSize(): {
        formatSize: FormatSizeType;
        callbackSize: CallbackSizeType;
    } {
        const { breakpoint } = ChocoStyle.useTheme();

        return useMemo(() => {
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
                formatSize,
                callbackSize: <MaxSize, Vlaue, Return>(
                    size: MaxSize,
                    callback: (value: Vlaue, key: SizeKey) => Return,
                    fristValue?: Vlaue,
                ): Size<Return> => {
                    let sizes: Size<Return> = {};
                    const keysBreakpoint = Object.keys(
                        breakpoint.size,
                    ) as SizeKey[];
                    if (typeof size === 'number') {
                        sizes = formatSize(size);
                    } else if (typeof size === 'object') {
                        const Size = size as object;
                        const sizeKeys = Object.keys(Size) as (keyof Size)[];
                        if (
                            sizeKeys.find((key) => keysBreakpoint.includes(key))
                        ) {
                            const keySize = Object.keys(
                                breakpoint.format,
                            ) as SizeKey[];
                            sizes = keySize.reduce<Size<Return>>((acc, key) => {
                                if (
                                    Size[key as keyof typeof Size] !== undefined
                                )
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
                        const value = (sizes[key] ?? fristValue) as Vlaue;
                        fristValue = value;
                        output[key] = callback(value, key);
                    });
                    return output;
                },
            };
        }, [breakpoint]);
    }
}
