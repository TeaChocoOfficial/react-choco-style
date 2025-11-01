//-Path: "lib/src/types/chocoValue.ts"
import { ColorsType } from './color';
import { KeyRootTheme } from './theme';
import { CsValue } from '../class/option/CsValue';
import { OptionCalc } from '../class/option/OptionCalc';

export type StyleValue =
    | boolean
    | object
    | number
    | string
    | symbol
    | null
    | undefined;

export type GridType = (string | number)[];

export type LinesStyleType = {
    width?: StyleValue;
    color?: ColorsType;
    style?:
        | 'dotted'
        | 'dashed'
        | 'solid'
        | 'double'
        | 'groove'
        | 'ridge'
        | 'inset'
        | 'outset'
        | 'none'
        | 'hidden';
};

export type NoneValue = 'none' | 'unset' | string;
export type UnitType = `$${KeyRootTheme}` | `*${string}`;
export type OptionBooleans = { [key in 't' | 'f']?: StyleValue };
export type OptionCalcs = OptionCalc | OptionCalcFunc[];
export type OptionCalcFunc = (
    after: CsValue,
    before: CsValue,
    multiply: number,
) => CsValue | StyleValue;

export type ValueOptionType = {
    sz?: number | KeyRootTheme;
    kit: number | KeyRootTheme;
    root: number | KeyRootTheme;
    none: NoneValue | boolean;
    boo: OptionBooleans;
    unit: UnitType;
    check: boolean;
    priority: number;
    multiply: boolean;
    calcs: OptionCalcs;
    debug: boolean | string[];
};
