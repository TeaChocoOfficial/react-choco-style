//-Path: "react-choco-style/src/types/chocoHook.ts"
import { UseChocoThemeType } from './theme';
import { Size, SizeKey, SizeValue } from './size';
import { ChocoStylePropsType, StyleTypes } from './choco';

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
    TagType extends keyof React.JSX.IntrinsicElements,
> = React.ComponentPropsWithoutRef<TagType> & ChocoStylePropsType;

export type CustomStylesType<
    Papram extends object = {},
    ReturnType = StyleTypes,
> = ({
    theme,
    formatSize,
    callbackSize,
}: {
    theme: UseChocoThemeType;
    formatSize: FormatSizeType;
    callbackSize: CallbackSizeType;
} & Papram) => ReturnType;
