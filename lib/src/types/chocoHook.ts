//-Path: "react-choco-style/lib/src/types/chocoHook.ts"
import { Size } from '../class/Size';
import { ReactTagType } from './style';
import { CColor } from '../class/CColor';
import { ChocoProp } from '../class/ChocoProp';
import { SizeOption, SizesType } from './size';
import { ChocoColor } from '../class/ChocoColor';
import { ChocoCompoentPropsType } from './chocoStyle';
import { ThemeFontsType, UseChocoThemeType } from './theme';
import { ChocoStyleValue, CsType, StyleTypes } from './choco';

export type ChocoStyledProps<
    TagType extends ReactTagType,
    Props extends Partial<unknown> = {},
    Omits extends string[] = [],
> = Props &
    Omit<
        React.ComponentProps<TagType> & ChocoStylesPropsType<TagType>,
        'sx' | Omits[number]
    >;

export type UseSizeType = <Value = void>(
    option?: SizeOption<number>,
) => SizesType<ChocoStyleValue<Value>>;

export type OptionPropsType = {
    sz: UseSizeType;
    Size: typeof Size;
    CColor: typeof CColor;
    ChocoColor: typeof ChocoColor;
    chocoProp: ChocoProp;
    theme: UseChocoThemeType;
    getFont: ChocoHooks.GetFont;
    responseCs: ChocoHooks.ResponseCs;
};

export type CustomStylesType<Papram extends object = {}> = (
    option: OptionPropsType & Papram,
) => StyleTypes;

export type ChocoStylesPropsType<
    Component extends React.ElementType = React.ElementType,
> = {
    [Key in keyof ChocoCompoentPropsType<Component>]?: SizesType<
        ChocoCompoentPropsType<Component>[Key]
    >;
};

export type FontOption = {
    lowcase?: boolean;
};

export namespace ChocoHooks {
    export type GetFont = <Style extends StyleTypes | CsType>(
        size?: keyof ThemeFontsType['weight'],
        option?: FontOption,
    ) => Style;
    export type ResponseCs = (cs?: CsType) => StyleTypes;
}
