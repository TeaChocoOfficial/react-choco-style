//-Path: "react-choco-style/lib/src/types/chocoHook.ts"
import {
    ColorType,
    SetColorType,
    GetsetClrType,
    SetShadesColorType,
} from './color';
import { Size } from '../class/size';
import { ReactTagType } from './style';
import { SizeOption, SizesType } from './size';
import { ThemeFontsType, UseChocoThemeType } from './theme';
import { ChocoStyledType, ChocoStyleValue, CsType, StyleTypes } from './choco';

export type ChocoStyledProps<
    TagType extends ReactTagType,
    Props extends Partial<unknown> = {},
    Omits extends string[] = [],
> = Props &
    Omit<React.ComponentProps<TagType> & ChocoStyledType, 'sx' | Omits[number]>;

export type UseResponseCs = (cs?: CsType) => StyleTypes;

export type UseSizeType = <Value = void>(
    option?: SizeOption<number>,
) => SizesType<ChocoStyleValue<Value>>;

// export interface UseSizeType {
//     <Value = ChocoStyleValue, Root = number>(root?: Root): Sizes<Value>;
//     <Value = ChocoStyleValue, Root = number>(
//         calc?: (size: Root) => Value,
//         root?: Root,
//     ): Sizes<Value>;
// }

export type UseGetSizeType = (
    prop: ChocoStyledProps<ReactTagType>,
) => UseSizeType;

export type UseGetFontType = (
    prop?: keyof ThemeFontsType['weight'],
) => StyleTypes;

export type ClrPropsType = {
    text?: boolean;
    outline?: boolean;
    setClr?: ColorType;
    disabled?: boolean;
};

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
    hover: StyleTypes;
    focus: StyleTypes;
    active: StyleTypes;
    styles: StyleTypes;
    setClrs: SetColorType;
    disableds: StyleTypes;
    shadesColor: SetShadesColorType;
};

export type UseGetsetClrPropsType = (
    prop: UseGetsetClrPropType,
) => SetClrPropsType;

export type UseGetsetClrType = (
    color?: ColorType,
    option?: { text?: boolean },
) => GetsetClrType;

export type CustomStylesTypeProp = {
    Size: typeof Size;
    size: UseSizeType;
    style?: StyleTypes;
    getSize: UseGetSizeType;
    getFont: UseGetFontType;
    theme: UseChocoThemeType;
    responseCs: UseResponseCs;
    getsetClr: UseGetsetClrType;
    mixCsProps: UseMixCsPropsType;
    getSetClrProps: UseGetsetClrPropsType;
};

export type UseMixCsPropsType = (
    ...chocoStyles: (CsType | undefined)[]
) => StyleTypes;

export type CustomStylesPropsType = {
    Size: typeof Size;
    theme: UseChocoThemeType;
    getFont: UseGetFontType;
    getSetClrProps: UseGetsetClrPropsType;
};

export type CustomStylesType<
    Papram extends object = {},
    ReturnType = StyleTypes,
> = ({
    Size,
    theme,
    getFont,
    getSetClrProps,
}: CustomStylesPropsType & Papram) => ReturnType;
