//-Path: "react-choco-style/lib/src/types/color.ts"
import { CColor } from '../class/CColor';
import { ChocoShade } from '../class/ChocoShade';

export type ShadeKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ShadeMapCallbackFn<MapCallback> = (
    color: CColor,
    key: ShadeKey,
    index: number,
) => MapCallback;
export type ShadeMethod = {
    map: <MapCallback>(
        callbackfn: ShadeMapCallbackFn<MapCallback>,
    ) => MapCallback[];
};
export type ShadeColor = { [key in ShadeKey]: CColor };
export const clrHexChars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'A',
    'b',
    'B',
    'c',
    'C',
    'd',
    'D',
    'e',
    'E',
    'f',
    'F',
] as const;

export type ClrHexChars = (typeof clrHexChars)[number];

export type ColorHex = `#${string}`;

export const ColorMain = [
    'info',
    'error',
    'warning',
    'success',
    'inherit',
    'primary',
    'disabled',
    'secondary',
] as const;

export type ColorMainType = (typeof ColorMain)[number];

export const ColorText = [
    'infoText',
    'errorText',
    'warningText',
    'successText',
    'inheritText',
    'primaryText',
    'disabledText',
    'secondaryText',
] as const;

export type ColorTextType = (typeof ColorText)[number];

export const ColorInherit = ['main', 'text'] as const;

export type ColorInheritType = (typeof ColorInherit)[number];

export type ColorType = ColorMainType | ColorTextType | ColorInheritType;

export type ColorsType =
    | React.CSSProperties['color']
    | `common.${string}`
    | ChocoShade
    | ColorType
    | ColorHex
    | CColor
    | null;
