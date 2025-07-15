//-Path: "react-choco-style/lib/src/types/choco.ts"
import { ColorsType } from './color';
import { To } from 'react-router-dom';
import { MotionProps } from 'framer-motion';
import { CustomStylesType } from './chocoHook';
import { SizeValue, SizesValue, SizesType } from './size';

export type ToType = To;

export type KeysStyleTypes =
    | keyof ChocoStylesType
    | keyof React.CSSProperties
    | `&${string}`
    | `@${string}`;

export type NestedStyleType = {
    [key in keyof ChocoStylesType]?: ChocoStylesType[key];
} & {
    [key in keyof React.CSSProperties]?: SizesValue<React.CSSProperties[key]>;
};

export type NestedStyleTypes = {
    [key in `&${string}` | `@${string}`]?: NestedStyleType & NestedStyleTypes;
};

export type StyleTypes = {
    [key in keyof ChocoStylesType]?: ChocoStylesType[key];
} & {
    [key in keyof React.CSSProperties]?: SizesValue<React.CSSProperties[key]>;
} & NestedStyleTypes;

export type StyledType = { [key in keyof React.CSSProperties]?: SizesValue };

export type CsType = CustomStylesType | StyleTypes;

export type CssKeyType =
    | keyof React.JSX.IntrinsicElements
    | `.${string}`
    | `#${string}`
    | `&${string}`
    | `@${string}`;

export type CssType = { [key in CssKeyType]?: CsType };

export type ChocoStyledType<
    Component extends React.ElementType = React.ElementType,
> = ChocoStylesPropsType<Component> & MotionProps;

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

export type LineStyleType = {
    width?: number | string;
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

export type GridType = (string | number)[];

export type ChocoStyleValue<Value = void> = SizeValue | Value;

export type ChocoStyleDefType = {
    //* Responsive size
    sz?: ChocoStyleValue<number>;

    //* Style
    //? background | color | background-color | background-image
    bg?: ChocoStyleValue<string | null>;
    clr?: ChocoStyleValue<ColorsType>;
    bgClr?: ChocoStyleValue<ColorsType>;
    bgImg?: ChocoStyleValue<string | null>;
    bShadow?: ChocoStyleValue<string | null>;
    tShadow?: ChocoStyleValue<string | null>;

    //* Opacity
    op?: ChocoStyleValue<number>;

    //* Z-index
    z?: ChocoStyleValue<number>;

    //* Size
    //? Width | Height | width&height | min-width | min-height | min-width&min-height | max-width | max-height | max-width&max-height
    w?: ChocoStyleValue;
    h?: ChocoStyleValue;
    wh?: ChocoStyleValue;
    minW?: ChocoStyleValue;
    minH?: ChocoStyleValue;
    minWH?: ChocoStyleValue;
    maxW?: ChocoStyleValue;
    maxH?: ChocoStyleValue;
    maxWH?: ChocoStyleValue;

    //* inset
    //? all top bottom left right left&right top&bottom
    i?: ChocoStyleValue;
    t?: ChocoStyleValue;
    b?: ChocoStyleValue;
    l?: ChocoStyleValue;
    r?: ChocoStyleValue;
    x?: ChocoStyleValue;
    y?: ChocoStyleValue;

    //* Padding
    //? all top bottom left right left&right top&bottom
    p?: ChocoStyleValue;
    pt?: ChocoStyleValue;
    pb?: ChocoStyleValue;
    pl?: ChocoStyleValue;
    pr?: ChocoStyleValue;
    px?: ChocoStyleValue;
    py?: ChocoStyleValue;

    //* Margin
    //? all top bottom left right left&right top&bottom
    m?: ChocoStyleValue;
    mt?: ChocoStyleValue;
    mb?: ChocoStyleValue;
    ml?: ChocoStyleValue;
    mr?: ChocoStyleValue;
    mx?: ChocoStyleValue;
    my?: ChocoStyleValue;

    //* Gap
    //? all row column
    g?: ChocoStyleValue;
    gx?: ChocoStyleValue;
    gy?: ChocoStyleValue;

    //* FontSize
    fontS?: ChocoStyleValue;

    //* Grids
    //? grid-template grid-area
    gridT?: ChocoStyleValue<string | [GridType, GridType]>;
    gridTC?: ChocoStyleValue<string | GridType>;
    gridTR?: ChocoStyleValue<string | GridType>;
    gridA?: ChocoStyleValue<string | GridType[]>;
    gridAC?: ChocoStyleValue<string | GridType>;
    gridAR?: ChocoStyleValue<string | GridType>;

    //* Border
    //? border-width border-radius border-style border-color border border-top border-bottom border-left border-right
    borW?: ChocoStyleValue;
    borR?: ChocoStyleValue;
    borRTL?: ChocoStyleValue;
    borRTR?: ChocoStyleValue;
    borRBL?: ChocoStyleValue;
    borRBR?: ChocoStyleValue;
    borS?: ChocoStyleValue<string | null>;
    borClr?: ChocoStyleValue<ColorsType>;
    borders?: LinesStyleType | string | null;
    borderT?: LinesStyleType | string | null;
    borderB?: LinesStyleType | string | null;
    borderL?: LinesStyleType | string | null;
    borderR?: LinesStyleType | string | null;
    borderX?: LinesStyleType | string | null;
    borderY?: LinesStyleType | string | null;

    //* Outline
    outlines?: LinesStyleType | string | null;

    //* transition
    trans?: number | string;

    //* Transform
    form?: ChocoStyleValue<string>;
    transformCenter?: 'all' | 'x' | 'y';

    //* Pointer events
    //? none auto
    event?: ChocoStyleValue<null | 'n' | 'a'>;
};

export type ChocoStyleType = ChocoStyleDefType & {
    //* Display
    //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
    dp?: ChocoStyleValue<
        null | 'f' | 'b' | 'i' | 'if' | 'ib' | 'g' | 'ig' | 't' | 'it'
    >;

    //* Flex direction
    //? unset row reverse-row column reverse-column inherit
    fd?: ChocoStyleValue<null | 'r' | 'rr' | 'c' | 'cr' | 'i'>;

    //* Flex wrap
    fw?: ChocoStyleValue<boolean>;

    //* Align items
    //? unset flex-end flex-start center space-around space-between stretch
    ac?: ChocoStyleValue<null | 'e' | 's' | 'c' | 'a' | 'b' | 'st'>;

    //* Align items
    //? unset flex-end flex-start center space-around space-between stretch
    a?: ChocoStyleValue<null | 'e' | 's' | 'c' | 'a' | 'b' | 'st'>;

    //* Justify content
    //? unset flex-end flex-start center space-around space-between space-evenly
    j?: ChocoStyleValue<null | 'e' | 's' | 'c' | 'a' | 'b' | 'ev'>;

    //* Justify items
    //? unset end start center
    ji?: ChocoStyleValue<null | 'e' | 's' | 'c' | 'st'>;

    //* Text align
    //? unset end left start right center justify
    text?: ChocoStyleValue<null | 'e' | 'l' | 's' | 'r' | 'c' | 'j'>;

    //* Position
    //? unset relative absolute fixed sticky
    pos?: ChocoStyleValue<null | 'r' | 'a' | 'f' | 's'>;

    //* Overflow
    //? visible hidden scroll auto
    of?: ChocoStyleValue<null | 'v' | 'h' | 's' | 'a'>;
    ofx?: ChocoStyleValue<null | 'v' | 'h' | 's' | 'a'>;
    ofy?: ChocoStyleValue<null | 'v' | 'h' | 's' | 'a'>;

    //* Cursor
    //? default pointer move not-allowed wait text crosshair alias copy  col-resize
    cur?: ChocoStyleValue<
        null | 'd' | 'p' | 'm' | 'n' | 'w' | 't' | 'c' | 'cr'
    >;

    //* User select
    //? none auto text all
    us?: ChocoStyleValue<null | 'n' | 'a' | 't' | 'al'>;
};

export type ChocoStylesType = {
    [Key in keyof ChocoStyleType]?: SizesType<ChocoStyleType[Key]>;
};

export type ChocoStylePropsType<
    Component extends React.ElementType = React.ElementType,
> = ChocoStyleDefType & {
    component?: Component;
    debug?: boolean;
    //* Keywords
    //? width&height:100% width:100% height:100% width&height:100view width:100view height:100view
    cs?: CsType;
    full?: boolean;
    fullW?: boolean;
    fullH?: boolean;
    fullV?: boolean;
    fullVW?: boolean;
    fullVH?: boolean;

    //* Display
    //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
    dNone?: boolean;
    dFlex?: boolean;
    dBlock?: boolean;
    dInline?: boolean;
    dInlineF?: boolean;
    dInlineB?: boolean;
    dGrid?: boolean;
    dInlineG?: boolean;
    dTable?: boolean;
    dInlineT?: boolean;

    //* Flex direction
    //? row reverse-row reverse-column column
    row?: boolean;
    rRow?: boolean;
    column?: boolean;
    rColumn?: boolean;

    //* Flex wrap
    fWrap?: boolean;

    center?: boolean;

    //* Align content
    //? flex-end flex-start center space-around space-between stretch
    acEnd?: boolean;
    acStart?: boolean;
    acCenter?: boolean;
    acAround?: boolean;
    acBetween?: boolean;
    acStretch?: boolean;

    //* Align item
    //? flex-end flex-start center space-around space-between stretch
    aEnd?: boolean;
    aStart?: boolean;
    aCenter?: boolean;
    aAround?: boolean;
    aBetween?: boolean;
    aStretch?: boolean;

    //* Justify content
    //? unset flex-end flex-start center space-evenly space-around space-between
    jEnd?: boolean;
    jStart?: boolean;
    jCenter?: boolean;
    jEvenly?: boolean;
    jAround?: boolean;
    jBetween?: boolean;

    //* Justify items
    //? unset end start center stretch
    jiEnd?: boolean;
    jiStart?: boolean;
    jiCenter?: boolean;
    jiStretch?: boolean;

    //* Text align
    //? end left start right center justify
    tEnd?: boolean;
    tLeft?: boolean;
    tStart?: boolean;
    tRight?: boolean;
    tCenter?: boolean;
    tJustify?: boolean;

    //* Position
    //? position: relative absolute fixed sticky
    posR?: boolean;
    posA?: boolean;
    posF?: boolean;
    posS?: boolean;

    //* Overflow
    //? visible hidden scroll auto
    ofV?: boolean;
    ofH?: boolean;
    ofS?: boolean;
    ofA?: boolean;
    ofxV?: boolean;
    ofxH?: boolean;
    ofxS?: boolean;
    ofxA?: boolean;
    ofyV?: boolean;
    ofyH?: boolean;
    ofyS?: boolean;
    ofyA?: boolean;

    //* Pointer events
    //? none auto
    eventN?: boolean;
    eventA?: boolean;

    //* User select
    //? none auto text all
    usN?: boolean;
    usA?: boolean;
    usT?: boolean;
    usAll?: boolean;
};

export type ChocoStylesPropsType<
    Component extends React.ElementType = React.ElementType,
> = {
    [Key in keyof ChocoStylePropsType<Component>]?: SizesType<
        ChocoStylePropsType<Component>[Key]
    >;
};
