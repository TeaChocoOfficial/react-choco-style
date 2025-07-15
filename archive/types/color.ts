//-Path: "react-choco-style/src/types/color.ts"
import { ChocoColor } from '../theme/color';
import { ColorHex, ShadeColors } from './chocoColor';

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
    | ChocoColor
    | ColorType
    | ColorHex
    | null;

export type SetColorType = {
    clr: ChocoColor | null; //สีข้อความ
    bor: ChocoColor | null; //สีขอบ
    hover: ChocoColor | null; //สีข้อความตอนชี้
    bgClr: ChocoColor | null; //สีพื้นหลัง
    focus: ChocoColor | null; //สีข้อความตอนโฟกัส
    active: ChocoColor | null; //สีข้อความตอนใช้งาน
    action: ChocoColor | null; //สีข้อความตอนทำงาน
    bgHover: ChocoColor | null; //สีพื้นหลังตอนชี้
    disabled: ChocoColor | null; //สีข้อความตอนปิด
    bgActive: ChocoColor | null; //สีพื้นหลังตอนใช้งาน
    borHover: ChocoColor | null; //สีขอบตอนชี้
    borActive: ChocoColor | null; //สีขอบตอนใช้งาน
    bgDisabled: ChocoColor | null; //สีพื้นหลังตอนปิด
    borDisabled: ChocoColor | null; //สีขอบตอนปิด
    disabledHover: ChocoColor | null; //สีข้อความตอนปิดตอนชี้
    bgDisabledHover: ChocoColor | null; //สีพื้นหลังตอนปิดตอนชี้
    borDisabledHover: ChocoColor | null; //สีขอบตอนปิดตอนชี้
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
