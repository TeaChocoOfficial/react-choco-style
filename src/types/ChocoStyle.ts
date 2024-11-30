//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/types/ChocoStyle.ts"
import { Sizes } from "./Size";
import { ColorsType } from "./color";

export type ChocoStyleTypes = {
    [key in keyof ChocoStyleType]?: Sizes | BorderStyleType;
};

export type ChocoStylePropsTypes = {
    [key in keyof ChocoStylePropsType]?: Sizes | BorderStyleType;
};

export type BorderStyleType = {
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

export type GridTemplateType =
    | [(string | number)[]]
    | [(string | number)[], (string | number)[]];

export type GridAreaType = number[][];

export type ChocoStyleDefType = {
    //* Style
    //? background color background-color
    bg?: string;
    color?: ColorsType;
    bgColor?: ColorsType;
    bgImage?: string;

    //* Opacity
    op?: number;

    //* Z-index
    z?: number;

    //* Width and Height
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
    gap?: Sizes;
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
    border?: BorderStyleType | string;

    //* transition
    animation?: number | string;

    //* Transform
    transform?: React.CSSProperties["transform"];
    transformCenter?: "all" | "x" | "y";
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

    //* Cursor
    //? default pointer move not-allowed wait text crosshair alias copy  col-resize
    cur?: Sizes<null | "d" | "p" | "m" | "n" | "w" | "t" | "c" | "cr">;
};

export type ChocoStylePropsType = ChocoStyleDefType & {
    //* Keywords
    //? width&height:100% width&height:100view
    cs?: ChocoStyleType;
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
    pos?: ChocoStyleType["pos"];
    posR?: boolean;
    posA?: boolean;
    posF?: boolean;
    posS?: boolean;
};
