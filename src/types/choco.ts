//-Path: "react-choco-style/src/types/choco.ts"
import { ColorsType } from './color';
import { To } from 'react-router-dom';
import { Sizes, SizeValue } from './size';
import { MotionProps } from 'framer-motion';
import { CustomStylesType } from './chocoHook';

export type ToType = To;

export type KeysStyleTypes =
    | keyof ChocoStyleType
    | keyof React.CSSProperties
    | `&${string}`
    | `@${string}`;

export type NestedStyleType = {
    [key in keyof ChocoStyleType]?: ChocoStyleType[key];
} & {
    [key in keyof React.CSSProperties]?: Sizes<React.CSSProperties[key]>;
};

export type NestedStyleTypes = {
    [key in `&${string}` | `@${string}`]?: NestedStyleType & NestedStyleTypes;
};

export type StyleTypes = {
    [key in keyof ChocoStyleType]?: ChocoStyleType[key];
} & {
    [key in keyof React.CSSProperties]?: Sizes<React.CSSProperties[key]>;
} & NestedStyleTypes;

export type StyledType = { [key in keyof React.CSSProperties]?: SizeValue };

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
> = ChocoStylePropsType<Component> & MotionProps;

export type LinesStyleType = {
    width?: Sizes;
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

export type GridTemplateType =
    | [(string | number)[]]
    | [(string | number)[], (string | number)[]];

export type GridAreaType = number[][];

export type ChocoStyleDefType = {
    //* Responsive size
    sz?: Sizes<number>;

    //* Style
    //? background | color | background-color | background-image
    bg?: Sizes<string | null>;
    clr?: Sizes<ColorsType>;
    bgClr?: Sizes<ColorsType>;
    bgImg?: Sizes<string | null>;
    bShadow?: Sizes<string | null>;
    tShadow?: Sizes<string | null>;

    //* Opacity
    op?: Sizes<number>;

    //* Z-index
    z?: Sizes<number>;

    //* Size
    //? Width | Height | width&height | min-width | min-height | min-width&min-height | max-width | max-height | max-width&max-height
    w?: Sizes;
    h?: Sizes;
    wh?: Sizes;
    minW?: Sizes;
    minH?: Sizes;
    minWH?: Sizes;
    maxW?: Sizes;
    maxH?: Sizes;
    maxWH?: Sizes;

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
    //? all row column
    g?: Sizes;
    gx?: Sizes;
    gy?: Sizes;

    //* FontSize
    fontS?: Sizes;

    //* Grids
    //? grid-template grid-area
    gridT?: Sizes<GridTemplateType>;
    gridA?: Sizes<GridAreaType>;

    //* Border
    //? border-width border-radius border-style border-color border border-top border-bottom border-left border-right
    borW?: Sizes;
    borR?: Sizes;
    borS?: Sizes<string | null>;
    borClr?: Sizes<ColorsType>;
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
    form?: Sizes<string>;
    transformCenter?: 'all' | 'x' | 'y';

    //* Pointer events
    //? none auto
    event?: Sizes<null | 'n' | 'a'>;
};

export type ChocoStyleType = ChocoStyleDefType & {
    //* Display
    //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
    dp?: Sizes<null | 'f' | 'b' | 'i' | 'if' | 'ib' | 'g' | 'ig' | 't' | 'it'>;

    //* Flex direction
    //? unset row reverse-row column reverse-column inherit
    fd?: Sizes<null | 'r' | 'rr' | 'c' | 'cr' | 'i'>;

    //* Flex wrap
    fw?: Sizes<boolean>;

    //* Align items
    //? unset flex-end flex-start center space-around space-between stretch
    ac?: Sizes<null | 'e' | 's' | 'c' | 'a' | 'b' | 'st'>;

    //* Align items
    //? unset flex-end flex-start center space-around space-between stretch
    a?: Sizes<null | 'e' | 's' | 'c' | 'a' | 'b' | 'st'>;

    //* Justify content
    //? unset flex-end flex-start center space-around space-between space-evenly
    j?: Sizes<null | 'e' | 's' | 'c' | 'a' | 'b' | 'ev'>;

    //* Justify items
    //? unset end start center
    ji?: Sizes<null | 'e' | 's' | 'c' | 'st'>;

    //* Text align
    //? unset end left start right center justify
    text?: Sizes<null | 'e' | 'l' | 's' | 'r' | 'c' | 'j'>;

    //* Position
    //? unset relative absolute fixed sticky
    pos?: Sizes<null | 'r' | 'a' | 'f' | 's'>;

    //* Overflow
    //? visible hidden scroll auto
    of?: Sizes<null | 'v' | 'h' | 's' | 'a'>;
    ofx?: Sizes<null | 'v' | 'h' | 's' | 'a'>;
    ofy?: Sizes<null | 'v' | 'h' | 's' | 'a'>;

    //* Cursor
    //? default pointer move not-allowed wait text crosshair alias copy  col-resize
    cur?: Sizes<null | 'd' | 'p' | 'm' | 'n' | 'w' | 't' | 'c' | 'cr'>;

    //* User select
    //? none auto text all
    us?: Sizes<null | 'n' | 'a' | 't' | 'al'>;
};

export type ChocoStylePropsType<
    Component extends React.ElementType = React.ElementType,
> = ChocoStyleDefType & {
    component?: Component;
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
