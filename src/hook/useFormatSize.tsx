//-Path: "react-choco-style/src/hook/useFormatSize.tsx"
import { useMemo } from "react";
import useTheme from "../theme/useTheme";
import { Size, SizeKey, SizeValue } from "../types/Size";

export type FormatSizeType = <S = SizeValue>(
    max: number,
    size?: Record<SizeKey, number>,
    unit?: string | undefined,
) => Size<S>;

export type CallbackSizeType = <MaxSize, Vlaue, Return>(
    size: MaxSize,
    callback: (value: Vlaue, key: SizeKey) => Return,
) => Size<Return>;

export default function useFormatSize(): {
    formatSize: FormatSizeType;
    callbackSize: CallbackSizeType;
} {
    const { breakpoint } = useTheme();
    
    return useMemo(() => {
        const formatSize = <S = SizeValue,>(
            max: number,
            format: Record<SizeKey, number> = breakpoint.format,
            unit: string | undefined = undefined,
        ): Size<S> => {
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
        };
        return {
            formatSize,
            callbackSize: <MaxSize, Vlaue, Return>(
                size: MaxSize,
                callback: (value: Vlaue, key: SizeKey) => Return,
            ): Size<Return> => {
                let sizes: Size<Return> = {};
                const keysBreakpoint = Object.keys(
                    breakpoint.size,
                ) as SizeKey[];
                if (typeof size === "number") {
                    sizes = formatSize(size);
                } else if (typeof size === "object") {
                    const Size = size as object;
                    const sizeKeys = Object.keys(Size) as (keyof Size)[];
                    if (sizeKeys.find((key) => keysBreakpoint.includes(key))) {
                        const keySize = Object.keys(
                            breakpoint.format,
                        ) as SizeKey[];
                        sizes = keySize.reduce<Size<Return>>((acc, key) => {
                            acc[key] = Size[key as keyof typeof Size] as Return;
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

                let oldValue = 0 as Vlaue;
                const output: Size<Return> = {};
                const keys = Object.keys(sizes) as SizeKey[];
                keys.forEach((key) => {
                    const value = (sizes[key] ?? oldValue) as Vlaue;
                    oldValue = value;
                    output[key] = callback(value, key);
                });

                return output;
            },
        };
    }, [breakpoint]);
}
