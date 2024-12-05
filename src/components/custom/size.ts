//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/custom/size.ts"
import { Size, SizeKey, SizeValue } from "../../types/Size";

export type FormatSizeType = <S = SizeValue>(
    max: number,
    size?: Size<S> | undefined,
    unit?: string | undefined,
) => Size<S>;

export function formatSize<S = SizeValue>(
    max: number,
    size: Size<S> | undefined = undefined,
    unit: string | undefined = undefined,
): Size<S> {
    if (!size) {
        size = { m: 50, t: 70, l: 90, d: 100 } as Size<S>;
    }
    const keySize = Object.keys(size);
    const output = { m: 0, t: 0, l: 0, d: 0 } as Size<S>;
    keySize.forEach((key) => {
        const value = (((size?.[key as SizeKey] as number) ?? 100) *
            (max / 100)) as S;
        output[key as SizeKey] = unit ? (`${value}${unit}` as S) : value;
    });
    return output;
}

export type CallbackSizeType = <
    MaxSize extends number | number[] | Size,
    S = MaxSize extends number[] ? SizeValue[] : SizeValue,
    Return extends SizeValue = SizeValue,
>(
    size: MaxSize,
    callback: (value: S) => Return,
) => Size<Return>;

export function callbackSize<
    MaxSize extends number | number[] | Size,
    S = MaxSize extends number[] ? SizeValue[] : SizeValue,
    Return extends SizeValue = SizeValue,
>(size: MaxSize, callback: (value: S) => Return): Size<Return> {
    let sizes: Size<S> | Size<S>[] | undefined;
    if (typeof size === "number") {
        sizes = formatSize(size);
    } else if (Array.isArray(size)) {
        sizes = size.map((s) => formatSize(s));
    } else {
        sizes = size as Size<S>;
    }
    const output: Record<string, Return> = {};
    // Handle array of sizes
    if (Array.isArray(sizes)) {
        const values: { [key in SizeKey]?: S[] } = {};

        const ForEach = (
            method: (key: SizeKey, s: Size<S>, index: number) => void,
        ) => {
            sizes.forEach((s, index) => {
                const keys = Object.keys(s) as SizeKey[];
                keys.forEach((key) => {
                    method(key, s, index);
                });
            });
        };

        ForEach((key, s, index) => {
            const value = (s[key] ?? 0) as S;
            if (!values[key]) {
                values[key] = [];
            }
            if (values[key]) {
                values[key][`${index}`] = value;
            }
        });

        ForEach((key) => {
            output[key] = callback(values[key] as S);
        });
    } else {
        const keys = Object.keys(sizes) as SizeKey[];
        keys.forEach((key) => {
            const value = (sizes[key] ?? 0) as S;
            output[key] = callback(value);
        });
    }
    return output;
}
