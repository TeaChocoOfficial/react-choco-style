//-Path: "react-choco-style/lib/src/types/choco.ts"
import { SizesType } from './size';
import { Size } from '../class/Size';
import { To } from 'react-router-dom';
import { CColor } from '../class/CColor';
import { StyleValue } from './chocoValue';
import { CsValue } from '../class/CsValue';
import { UseChocoThemeType } from './theme';
import { ChocoStylesType } from './chocoStyle';
import { ChocoStyle } from '../class/ChocoStyle';
import { KeyChochoStyleNoSizeValueType } from '../data/reservedKeywords';

/**
 * Type for navigation targets used in react-router-dom.
 */
export type ToType = To;

/**
 * Partial CSS properties for styling components.
 */
export type StyledType = Partial<React.CSSProperties>;

/**
 * Partial ChocoStyleTypes for flexible style definitions.
 */
export type StyleTypes = Partial<ChocoStylesType>;

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
export type CssType = { [key in CssKeysType]?: ChocoStyleTypes };

export type UseThemeOption = {
    Size: typeof Size;
    CColor: typeof CColor;
    theme: UseChocoThemeType;
};

export type CustomStylesType = (option: UseThemeOption) => ChocoStyleTypes;

/**
 * Union type for custom styles or Choco style types.
 */
export type CsType = CustomStylesType | ChocoStyleTypes | ChocoStyle;

/**
 * Type for Choco styles, mapping keys to either raw values or sized values.
 */
export type ChocoStyleTypes = {
    [Key in keyof ChocoStylesType]?: Key extends KeyChochoStyleNoSizeValueType
        ? ChocoStylesType[Key]
        : SizesType<ChocoStylesType[Key]>;
};

/**
 * Generic type for Choco style values, supporting size or custom values.
 * @template Value - The type of the style value.
 */
export type ChocoStyleValue<Value = StyleValue> = CsValue<Value> | Value;
