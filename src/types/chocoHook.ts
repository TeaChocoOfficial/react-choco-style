//-Path: "react-choco-style/src/types/chocoHook.ts"
import { ReactTagType } from './style';
import { Size, SizeKey, Sizes, SizeValue } from './size';
import { ThemeFontsType, UseChocoThemeType } from './theme';
import { ChocoStyledType, CsType, StyleTypes } from './choco';
import {
    ColorType,
    GetsetClrType,
    SetColorType,
    SetShadesColorType,
} from './color';

export type DeepPartial<Object> = {
    [Key in keyof Object]?: Object[Key] extends object
        ? DeepPartial<Object[Key]>
        : Object[Key];
};

export type IsSizeType = (size: unknown) => size is Size;

export type FormatSizeType = <S = SizeValue>(
    max: number,
    format?: Record<SizeKey, number>,
    unit?: string | undefined,
) => Size<S>;

export type CallbackSizeType = <MaxSize, Vlaue, Return>(
    size: MaxSize,
    callback: (value: Vlaue, key: SizeKey) => Return,
) => Size<Return>;

export type ChocoStyledProps<
    TagType extends ReactTagType,
    Props extends { [key in string]?: unknown } = {},
    Omits extends string[] = [],
> = Props &
    Omit<React.ComponentProps<TagType> & ChocoStyledType, 'sx' | Omits[number]>;

export type UseResponseCs = (cs?: CsType) => StyleTypes;

export interface UseSizeType {
    <Value = number, Root = number>(root?: Root): Sizes<Value>;
    <Value = number, Root = number>(
        calc?: (size: Root) => Value,
        root?: Root,
    ): Sizes<Value>;
}

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
    size: UseSizeType;
    style?: StyleTypes;
    isSize: IsSizeType;
    getSize: UseGetSizeType;
    getFont: UseGetFontType;
    theme: UseChocoThemeType;
    responseCs: UseResponseCs;
    formatSize: FormatSizeType;
    getsetClr: UseGetsetClrType;
    mixCsProps: UseMixCsPropsType;
    callbackSize: CallbackSizeType;
    getSetClrProps: UseGetsetClrPropsType;
};

export type UseMixCsPropsType = (
    ...chocoStyles: (CsType | undefined)[]
) => StyleTypes;

export type CustomStylesPropsType = {
    theme: UseChocoThemeType;
    getFont: UseGetFontType;
    formatSize: FormatSizeType;
    callbackSize: CallbackSizeType;
    getSetClrProps: UseGetsetClrPropsType;
};

export type CustomStylesType<
    Papram extends object = {},
    ReturnType = StyleTypes,
> = ({
    theme,
    getFont,
    formatSize,
    callbackSize,
    getSetClrProps,
}: CustomStylesPropsType & Papram) => ReturnType;
