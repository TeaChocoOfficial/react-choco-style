//-Path: "react-choco-style/lib/src/types/chocoHook.ts"
import { Size } from '../class/Size';
import { ReactTagType } from './style';
import { CColor } from '../class/CColor';
import { ChocoProp } from '../class/ChocoProp';
import { ChocoColor } from '../class/ChocoColor';
import { ChocoStyle } from '../class/ChocoStyle';
import { ChocoCompoentPropsType } from './chocoStyle';
import { SizeOptions, SizesType, SizeType } from './size';
import { ThemeFontsType, UseChocoThemeType } from './theme';
import { ChocoStyleTypes, CsType, StyleTypes } from './choco';
import { KeyChochoStyleNoSizeValueType } from '../data/reservedKeywords';

export type ChocoStyledProps<
    TagType extends ReactTagType,
    Props extends Partial<unknown> = {},
    Omits extends string[] = [],
> = Props &
    Omit<
        React.ComponentProps<TagType> & ChocoStylesPropsType<TagType>,
        'sx' | Omits[number]
    >;

export type UseSizeType = (option?: SizeOptions<number>) => SizeType<number>;

export type OptionPropsType = {
    sz: UseSizeType;
    Size: typeof Size;
    chocoProp: ChocoProp;
    CColor: typeof CColor;
    chocoColor: ChocoColor;
    style?: ChocoStyleTypes;
    mixCs: ChocoHooks.MixCs;
    theme: UseChocoThemeType;
    getFont: ChocoHooks.GetFont;
    ChocoStyle: typeof ChocoStyle;
    responseCs: ChocoHooks.ResponseCs;
};

export type ChocoStylesPropsType<
    Component extends React.ElementType = React.ElementType,
> = {
    [Key in keyof ChocoCompoentPropsType<Component>]?: Key extends KeyChochoStyleNoSizeValueType
        ? ChocoCompoentPropsType<Component>[Key]
        : SizesType<ChocoCompoentPropsType<Component>[Key]>;
};

export type FontOption = {
    lowcase?: boolean;
};

export namespace ChocoHooks {
    export type MixCs = (...allCs: (CsType | undefined)[]) => ChocoStyleTypes;
    export type GetFont = <Style extends StyleTypes>(
        size?: keyof ThemeFontsType['weight'],
        option?: FontOption,
    ) => Style;
    export type ResponseCs = (cs?: CsType) => ChocoStyleTypes;
}
