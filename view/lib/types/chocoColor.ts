//-Path: "react-choco-style/lib/src/types/chocoColor.ts"
import { ColorType } from './color';
import { CColor } from '../class/theme/CColor';
import { CsStyle } from '../class/style/CsStyle';
import { ChocoStylesType } from './chocoStyle';
import { ChocoShade } from '../class/theme/ChocoShade';

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
    text: ChocoShade;
    main: ChocoShade;
};

export type GetsetClrType = {
    setColor: SetColorType;
    shadesColor: SetShadesColorType;
};

export type ChocoColorOption = { text?: boolean };

export type UseGetsetClrPropType = {
    text?: boolean;
    isFocus?: boolean;
    outline?: boolean;
    setClr?: ColorType;
    disabled?: boolean;
    isBorder?: boolean;
    defaultColor?: ColorType;
};

export type SetClrPropsType = {
    styles: CsStyle;
    hover: ChocoStylesType;
    focus: ChocoStylesType;
    active: ChocoStylesType;
    setClrs: SetColorType;
    disableds: ChocoStylesType;
    shadesColor: SetShadesColorType;
};

export type ClrPropsType = {
    text?: boolean;
    outline?: boolean;
    setClr?: ColorType;
    disabled?: boolean;
};
