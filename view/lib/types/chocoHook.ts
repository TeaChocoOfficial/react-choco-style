//-Path: "lib/src/types/chocoHook.ts"
import { CsType } from './choco';
import { SizeType } from './size';
import { ReactTagType } from './style';
import { CColor } from '../class/theme/CColor';
import { CsStyle } from '../class/style/CsStyle';
import { CsValue } from '../class/option/CsValue';
import { CsOption } from '../class/option/CsOption';
import { ChocoProp } from '../class/hook/ChocoProp';
import { StyleValue, ValueOptionType } from './chocoValue';
import { ChocoColor } from '../class/hook/ChocoColor';
import { ThemeFontsType, UseChocoThemeType } from './theme';
import { ChocoCompoentPropsType, ChocoStylesType } from './chocoStyle';

export type ChocoStyledProps<
    TagType extends ReactTagType,
    Props extends Partial<unknown> = {},
    Omits extends string[] = [],
> = Props &
    Omit<
        React.ComponentProps<TagType> & ChocoCompoentPropsType<TagType>,
        'sx' | Omits[number]
    >;

export type CsOptions = Partial<ValueOptionType> | CsOption;

export type UseSizeType = <Value = StyleValue>(
    option?: CsOptions,
) => SizeType<Value>;

export type OptionPropsType = {
    sz: UseSizeType;
    chocoProp: ChocoProp;
    CColor: typeof CColor;
    chocoColor: ChocoColor;
    CsStyle: typeof CsStyle;
    CsValue: typeof CsValue;
    style?: ChocoStylesType;
    mixCs: ChocoHooks.MixCs;
    theme: UseChocoThemeType;
    CsOption: typeof CsOption;
    getFont: ChocoHooks.GetFont;
    responseCs: ChocoHooks.ResponseCs;
};

export type FontOption = {
    lowcase?: boolean;
};

export namespace ChocoHooks {
    export type MixCs = (...allCs: (CsType | undefined)[]) => ChocoStylesType;
    export type GetFont = <Style extends Partial<ChocoStylesType>>(
        size?: keyof ThemeFontsType['weight'],
        option?: FontOption,
    ) => Style;
    export type ResponseCs = (cs?: CsType) => CsStyle;
}
