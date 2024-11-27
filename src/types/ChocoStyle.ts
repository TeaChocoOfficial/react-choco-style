//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/types/ChocoStyle.ts"
import { Sizes } from "./Size";

export type ChocoStyleTypes = { [key in keyof ChocoStyleType]?: Sizes };

export type ChocoStylePropsTypes = {
    [key in keyof ChocoStylePropsType]?: Sizes;
};

export type ChocoStyleDefType = {
    //* Style
    //? background color background-color
    bg?: string;
    color?: string;
    bgColor?: string | null;

    //* Opacity
    op?: number;

    //* Width and Height
    w?: Sizes;
    h?: Sizes;

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

    //* FontSize
    size?: number;
    fontS?: Sizes;

    //* Border
    borR?: Sizes;
};

export type ChocoStyleType = ChocoStyleDefType & {
    //* Display
    //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
    dp?: null | "n" | "f" | "b" | "i" | "if" | "ib" | "g" | "ig" | "t" | "it";

    //* Flex direction
    //? unset row reverse-row column reverse-column
    fd?: null | "r" | "rr" | "c" | "cr";

    //* Flex wrap
    fw?: boolean;

    //* Align items
    //? unset flex-end flex-start center space-around space-between stretch
    ac?: null | "e" | "s" | "c" | "a" | "b" | "st";

    //* Align items
    //? unset flex-end flex-start center space-around space-between stretch
    a?: null | "e" | "s" | "c" | "a" | "b" | "st";

    //* Justify content
    //? flex-end flex-start center space-around space-between space-evenly
    j?: null | "e" | "s" | "c" | "a" | "b" | "ev";

    //* Text align
    //? unset end left start right center justify
    text?: null | "e" | "l" | "s" | "r" | "c" | "j";

    //* Position
    //? unset relative absolute fixed sticky
    pos?: null | "r" | "a" | "f" | "s";
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
