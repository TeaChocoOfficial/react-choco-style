//-Path: "react-choco-style/lib/src/types/chocoValue.ts"
import { SizesValue } from "./size";
import { ColorsType } from "./color";

export type GridType = (string | number)[];

export type LinesStyleType = {
    width?: SizesValue;
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

export type StyleValue = number | string | symbol | null | undefined;