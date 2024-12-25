//-Path: "react-choco-style/src/types/ChocoStyle.ts"
import React from "react";
import { Sizes } from "./Size";
import { ColorsType } from "./color";

export type KeysStyleTypes =
    | keyof ChocoStyleType
    | keyof React.CSSProperties
    | KeyStylesAndType;

export type StyleTypes = {
    [key in KeysStyleTypes]?: key extends keyof ChocoStyleType
        ? ChocoStyleType[key]
        : key extends keyof React.CSSProperties
        ? Sizes<React.CSSProperties[key]>
        : key extends KeyStylesAndType
        ? StyleTypes
        : never;
};
export type ChocoStyleTypes = {
    [key in keyof ChocoStyleType]?: ChocoStyleType[key];
};

export type ChocoStylePropsTypes = {
    [key in keyof ChocoStylePropsType]?: ChocoStylePropsType[key];
};

export type LinesStyleType = {
    size?: number;
    width?: Sizes;
    color?: ColorsType;
    style?:
        | "dotted"
        | "dashed"
        | "solid"
        | "double"
        | "groove"
        | "ridge"
        | "inset"
        | "outset"
        | "none"
        | "hidden";
};

export type LineStyleType = {
    width?: number | string;
    color?: ColorsType;
    style?:
        | "dotted"
        | "dashed"
        | "solid"
        | "double"
        | "groove"
        | "ridge"
        | "inset"
        | "outset"
        | "none"
        | "hidden";
};

export type GridTemplateType =
    | [(string | number)[]]
    | [(string | number)[], (string | number)[]];

export type GridAreaType = number[][];

export type ChocoStyleDefType = {
    //* Style
    //? background color background-color
    bg?: Sizes<string>;
    clr?: Sizes<ColorsType>;
    bgClr?: Sizes<ColorsType>;
    bgImg?: Sizes<string>;

    //* Opacity
    op?: Sizes<number>;

    //* Z-index
    z?: Sizes<number>;

    //* Size
    //? Width Height min-width min-height max-width max-height
    w?: Sizes;
    h?: Sizes;
    minW?: Sizes;
    minH?: Sizes;
    maxW?: Sizes;
    maxH?: Sizes;

    //* inset
    //? all top bottom left right left&right top&bottom
    i?: Sizes;
    t?: Sizes;
    b?: Sizes;
    l?: Sizes;
    r?: Sizes;
    x?: Sizes;
    y?: Sizes;

    //* Padding
    //? all top bottom left right left&right top&bottom
    p?: Sizes;
    pt?: Sizes;
    pb?: Sizes;
    pl?: Sizes;
    pr?: Sizes;
    px?: Sizes;
    py?: Sizes;

    //* Margin
    //? all top bottom left right left&right top&bottom
    m?: Sizes;
    mt?: Sizes;
    mb?: Sizes;
    ml?: Sizes;
    mr?: Sizes;
    mx?: Sizes;
    my?: Sizes;

    //* Gap
    //? all top bottom left right left&right top&bottom
    gaps?: Sizes;
    gapT?: Sizes;
    gapB?: Sizes;
    gapL?: Sizes;
    gapR?: Sizes;
    gapX?: Sizes;
    gapY?: Sizes;

    //* FontSize
    size?: number;
    fontS?: Sizes;

    //* Grids
    //? grid-template grid-area
    gridT?: Sizes<GridTemplateType>;
    gridA?: Sizes<GridAreaType>;

    //* Border
    borR?: Sizes;
    borders?: LinesStyleType | string;
    borderT?: LinesStyleType | string;
    borderB?: LinesStyleType | string;
    borderL?: LinesStyleType | string;
    borderR?: LinesStyleType | string;
    borderX?: LinesStyleType | string;
    borderY?: LinesStyleType | string;

    //* Outline
    outlines?: LinesStyleType | string;

    //* transition
    trans?: number | string;

    //* Transform
    transform?: React.CSSProperties["transform"];
    transformCenter?: "all" | "x" | "y";

    //* Pointer events
    //? none auto
    event?: Sizes<null | "n" | "a">;
};

export type ChocoStyleType = ChocoStyleDefType & {
    //* Display
    //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
    dp?: Sizes<null | "f" | "b" | "i" | "if" | "ib" | "g" | "ig" | "t" | "it">;

    //* Flex direction
    //? unset row reverse-row column reverse-column inherit
    fd?: Sizes<null | "r" | "rr" | "c" | "cr" | "i">;

    //* Flex wrap
    fw?: Sizes<boolean>;

    //* Align items
    //? unset flex-end flex-start center space-around space-between stretch
    ac?: Sizes<null | "e" | "s" | "c" | "a" | "b" | "st">;

    //* Align items
    //? unset flex-end flex-start center space-around space-between stretch
    a?: Sizes<null | "e" | "s" | "c" | "a" | "b" | "st">;

    //* Justify content
    //? flex-end flex-start center space-around space-between space-evenly
    j?: Sizes<null | "e" | "s" | "c" | "a" | "b" | "ev">;

    //* Text align
    //? unset end left start right center justify
    text?: Sizes<null | "e" | "l" | "s" | "r" | "c" | "j">;

    //* Position
    //? unset relative absolute fixed sticky
    pos?: Sizes<null | "r" | "a" | "f" | "s">;

    //* Overflow
    //? visible hidden scroll auto
    of?: Sizes<null | "v" | "h" | "s" | "a">;
    ofx?: Sizes<null | "v" | "h" | "s" | "a">;
    ofy?: Sizes<null | "v" | "h" | "s" | "a">;

    //* Cursor
    //? default pointer move not-allowed wait text crosshair alias copy  col-resize
    cur?: Sizes<null | "d" | "p" | "m" | "n" | "w" | "t" | "c" | "cr">;

    //* User select
    //? none auto text all
    us?: Sizes<null | "n" | "a" | "t" | "al">;
};

export type ChocoStylePropsType<
    Tag extends keyof JSX.IntrinsicElements | React.ComponentType<any> = "div",
> = ChocoStyleDefType & {
    //* Keywords
    //? width&height:100% width&height:100view
    cs?: StyleTypes;
    full?: boolean;
    fullV?: boolean;

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
    //? flex-end flex-start center space-around space-between space-evenly
    jEnd?: boolean;
    jStart?: boolean;
    jCenter?: boolean;
    jEvenly?: boolean;
    jAround?: boolean;
    jBetween?: boolean;

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

export type KeyStylesAndKoronTypes =
    | ":root"
    | ":hover"
    | ":focus"
    | ":active"
    | ":target"
    | ":checked"
    | ":disabled";

export type KeyStylesAndKoronsTypes =
    | "::-webkit-scrollbar"
    | "::-webkit-scrollbar-track"
    | "::-webkit-scrollbar-thumb";

export type KeyStylesAndKoronType = `${
    | ""
    | KeyStylesAndKoronTypes
    | KeyStylesAndKoronsTypes
    | `${KeyStylesAndKoronsTypes}${KeyStylesAndKoronTypes}`}`;

export type KeyStylesStartAndType = "" | "&" | "& " | "$";

export type KeyStylesAndTypes =
    | `${KeyStylesStartAndType}${
          | `.${string}`
          | `#${string}`
          | `${KeyStylesAndKoronType}`}`
    | `${keyof JSX.IntrinsicElements | "*"}${"" | `${KeyStylesAndKoronType}`}`;

export type KeyStylesAndType = `&${KeyStylesAndTypes}`;

export type KeyMediaTypes = `@media ${string}`;

export type SelectorStyleType =
    | "*"
    | `${keyof JSX.IntrinsicElements}`
    | `#${string}`
    | KeyMediaTypes
    | KeyStylesAndType
    | KeyStylesAndTypes;

export type SelectorStylesType = {
    [key in SelectorStyleType]?: ChocoStyleTypes;
};

export type ChocoStylesType<
    Style extends ChocoStyleType | React.CSSProperties =
        | ChocoStyleType
        | React.CSSProperties,
> = Style & {
    [key in KeyStylesAndType]?: Style;
};
