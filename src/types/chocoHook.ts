//-Path: "react-choco-style/src/types/chocoHook.ts"
import { ReactTagType } from './style';
import { UseChocoThemeType } from './theme';
import { Size, SizeKey, SizeValue } from './size';
import { ChocoStyledType, StyleTypes } from './choco';

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
    Props extends { [key in string]?: any } = {},
> = Props &
    ChocoStyledType &
    Omit<React.ComponentPropsWithoutRef<TagType>, 'sx'>;

export type CustomStylesTypeProp = {
    theme: UseChocoThemeType;
    formatSize: FormatSizeType;
    callbackSize: CallbackSizeType;
};

export type CustomStylesType<
    Papram extends object = {},
    ReturnType = StyleTypes,
> = ({ theme }: { theme: UseChocoThemeType } & Papram) => ReturnType;
