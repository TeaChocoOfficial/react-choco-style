//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/custom/size.ts"
import { Size, SizeKey, SizeValue } from "../../types/Size";

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

export function callbackSize<S = SizeValue>(
    size: number | Size,
    callback: (value: S) => string,
): Size<S> {
    let sizes: Size<S> | undefined;
    if (typeof size === "number") {
        sizes = formatSize(size);
    } else {
        sizes = size as Size<S>;
    }
    const output: Record<string, string> = {};
    Object.keys(sizes).forEach((key) => {
        const value = (sizes?.[key as SizeKey] ?? 0) as S;
        output[key] = callback(value);
    });
    return output;
}
