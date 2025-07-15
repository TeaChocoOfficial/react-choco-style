//-Path: "react-choco-style/lib/src/types/choco.ts"
import { To } from 'react-router-dom';
import { ChocoStylesType } from './chocoStyle';
import { CustomStylesType } from './chocoHook';
import { SizesType, SizesValue, SizeValue } from './size';
import { KeyChochoStyleNoSizeValueType } from '../data/reservedKeywords';

export type ToType = To;

export type StyledType = { [key in keyof React.CSSProperties]?: SizesValue };

export type StyleTypes = Partial<ChocoStyleTypes> &
    Partial<React.CSSProperties>;

export type CssKeysType = keyof React.JSX.IntrinsicElements | CssKeyType;
export type CssKeyType =
    | `*${string}`
    | `@${string}`
    | `#${string}`
    | ` #${string}`
    | `.${string}`
    | ` .${string}`
    | `${keyof React.JSX.IntrinsicElements}`
    | ` ${keyof React.JSX.IntrinsicElements}`;

export type CssType = { [key in CssKeysType]?: CsType };

export type CsType = CustomStylesType | StyleTypes;

export type ChocoStyleTypes = {
    [Key in keyof ChocoStylesType]?: Key extends KeyChochoStyleNoSizeValueType
        ? ChocoStylesType[Key]
        : SizesType<ChocoStylesType[Key]>;
};

export type ChocoStyleValue<Value = void> = SizeValue | Value;
