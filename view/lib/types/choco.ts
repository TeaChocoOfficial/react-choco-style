//-Path: "lib/src/types/choco.ts"
import { SizeType } from './size';
import { To } from 'react-router-dom';
import { CColor } from '../class/theme/CColor';
import { StyleValue } from './chocoValue';
import { CsStyle } from '../class/style/CsStyle';
import { CsValue } from '../class/option/CsValue';
import { UseChocoThemeType } from './theme';
import { CsOption } from '../class/option/CsOption';
import { ChocoStylesType } from './chocoStyle';

/**
 * Type for navigation targets used in react-router-dom.
 */
export type ToType = To;

/**
 * Union type for CSS keys, including HTML elements and custom selectors.
 */
export type CssKeysType = keyof React.JSX.IntrinsicElements | CssKeyType;

/**
 * Type for CSS selectors, including pseudo-elements and custom classes.
 */
export type CssKeyType =
    | `*${string}` // Universal selector
    | `@${string}` // At-rule selector
    | `#${string}` // ID selector
    | ` #${string}` // ID selector with space
    | `.${string}` // Class selector
    | ` .${string}` // Class selector with space
    | `:${string}` // Pseudo-class selector
    | ` :${string}` // Pseudo-class selector with space
    | `::${string}` // Pseudo-element selector
    | ` ::${string}` // Pseudo-element selector with space
    | `+${string}` // Adjacent sibling selector
    | ` +${string}` // Adjacent sibling selector with space
    | `${keyof React.JSX.IntrinsicElements}` // HTML element
    | ` ${keyof React.JSX.IntrinsicElements}` // HTML element with space
    | `[data-${string}]` // Data attribute selector
    | ` [data-${string}]`; // Data attribute selector with space

/**
 * Type for CSS style definitions, mapping CSS keys to style properties.
 */
export type CssType = { [key in CssKeysType]?: ChocoStylesType };

export type UseThemeOption = {
    CColor: typeof CColor;
    CsStyle: typeof CsStyle;
    CsValue: typeof CsValue;
    theme: UseChocoThemeType;
    CsOption: typeof CsOption;
};

export type CustomStylesType = (option: UseThemeOption) => ChocoStylesType;

/**
 * Union type for custom styles or Choco style types.
 */
export type CsType = CustomStylesType | ChocoStylesType | CsStyle<any>;

/**
 * Generic type for Choco style values, supporting size or custom values.
 * @template Value - The type of the style value.
 */
export type ChocoStyleValue<Value extends StyleValue = StyleValue> =
    | SizeType<Value>
    | CsValue
    | Value;
