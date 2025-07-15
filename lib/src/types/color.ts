//-Path: "react-choco-style/lib/src/types/color.ts"
import { CColor } from '../class/CColor';

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
export type ShadeColors = ShadeColor & ShadeMethod;
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
    | CColor
    | ColorType
    | ColorHex
    | null;

export type SetColorType = {
    clr: CColor | null; //สีข้อความ
    bor: CColor | null; //สีขอบ
    hover: CColor | null; //สีข้อความตอนชี้
    bgClr: CColor | null; //สีพื้นหลัง
    focus: CColor | null; //สีข้อความตอนโฟกัส
    active: CColor | null; //สีข้อความตอนใช้งาน
    action: CColor | null; //สีข้อความตอนทำงาน
    bgHover: CColor | null; //สีพื้นหลังตอนชี้
    disabled: CColor | null; //สีข้อความตอนปิด
    bgActive: CColor | null; //สีพื้นหลังตอนใช้งาน
    borHover: CColor | null; //สีขอบตอนชี้
    borActive: CColor | null; //สีขอบตอนใช้งาน
    bgDisabled: CColor | null; //สีพื้นหลังตอนปิด
    borDisabled: CColor | null; //สีขอบตอนปิด
    disabledHover: CColor | null; //สีข้อความตอนปิดตอนชี้
    bgDisabledHover: CColor | null; //สีพื้นหลังตอนปิดตอนชี้
    borDisabledHover: CColor | null; //สีขอบตอนปิดตอนชี้
};

export type SetColorsType = {
    text: ColorType;
    main: ColorType;
};
export type SetShadesColorType = {
    text: ShadeColors;
    main: ShadeColors;
};

export type GetsetClrType = {
    setColor: SetColorType;
    shadesColor: SetShadesColorType;
};
