//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/custom/size.ts"
import { ChocoTheme } from "../theme/theme";
import { Size, SizeKey, SizeValue } from "../types/Size";

export type FormatSizeType = <S = SizeValue>(
    max: number,
    size?: Record<SizeKey, number>,
    unit?: string | undefined,
) => Size<S>;

export function formatSize<S = SizeValue>(
    max: number,
    format: Record<SizeKey, number> = ChocoTheme.breakpoint.format,
    unit: string | undefined = undefined,
): Size<S> {
    const keySize = Object.keys(format) as SizeKey[];
    const output = keySize.reduce<Size<S>>((acc, key) => {
        acc[key] = 0 as S;
        return acc;
    }, {} as Size<S>);

    keySize.forEach((key) => {
        const value = ((format[key] ?? 100) * (max / 100)) as S;
        output[key as SizeKey] = unit ? (`${value}${unit}` as S) : value;
    });
    return output;
}

export type CallbackSizeType = <MaxSize, Return>(
    size: MaxSize,
    callback: (value: MaxSize, key: SizeKey) => Return,
) => Size<Return>;

export function callbackSize<MaxSize, Return>(
    size: MaxSize,
    callback: (value: MaxSize, key: SizeKey) => Return,
): Size<Return> {
    let sizes: Size<Return>;
    const keysBreakpoint = Object.keys(ChocoTheme.breakpoint.size) as SizeKey[];
    if (typeof size === "number") {
        sizes = formatSize(size);
    } else {
        const sizeKeys = Object.keys(size as object) as (keyof Size)[];
        if (sizeKeys.find((key) => keysBreakpoint.includes(key))) {
            const keySize = Object.keys(
                ChocoTheme.breakpoint.format,
            ) as SizeKey[];
            sizes = keySize.reduce<Size<Return>>((acc, key) => {
                acc[key] = size[key as keyof typeof size] as Return;
                return acc;
            }, {});
        } else {
            const keySize = Object.keys(
                ChocoTheme.breakpoint.format,
            ) as SizeKey[];
            sizes = keySize.reduce<Size<Return>>((acc, key) => {
                acc[key] = size as unknown as Return;
                return acc;
            }, {});
        }
    }

    let oldValue = 0 as MaxSize;
    const output: Size<Return> = {};
    const keys = Object.keys(sizes) as SizeKey[];
    keys.forEach((key) => {
        const value = (sizes[key] ?? oldValue) as MaxSize;
        oldValue = value;
        output[key] = callback(value, key);
    });

    return output;
}
