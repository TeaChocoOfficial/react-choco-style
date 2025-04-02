//-Path: "react-choco-style/src/types/chocoHook.ts"
import { ReactTagType } from './style';
import { Size, SizeKey, SizeValue } from './size';
import { ChocoStyledType, StyleTypes } from './choco';
import { ThemeFontsType, UseChocoThemeType } from './theme';

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
> = Omit<React.ComponentProps<TagType>, 'sx'> & ChocoStyledType & Props;

export type UseGetSizeType = (prop: ChocoStyledProps<any>) => number;
export type UseGetFontType = (
    prop?: keyof ThemeFontsType['weight'],
) => StyleTypes;

export type CustomStylesTypeProp = {
    style?: StyleTypes;
    getSize: UseGetSizeType;
    getFont: UseGetFontType;
    theme: UseChocoThemeType;
    formatSize: FormatSizeType;
    callbackSize: CallbackSizeType;
};

export type CustomStylesType<
    Papram extends object = {},
    ReturnType = StyleTypes,
> = ({ theme }: { theme: UseChocoThemeType } & Papram) => ReturnType;
