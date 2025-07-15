//-Path: "react-choco-style/lib/src/types/chocoStyle.ts"
import {
    PosStyleType,
    EventStyleType,
    CursorStyleType,
    DisplayStyleType,
    FlexDirStyleType,
    OverflowStyleType,
    PosStyleValueType,
    TextAlignStyleType,
    AlignItemsStyleType,
    EventStyleValueType,
    UserSelectStyleType,
    CursorStyleValueType,
    AlignContentStyleType,
    DisplayStyleValueType,
    FlexDirStyleValueType,
    JustifyItemsStyleType,
    OverflowAxisStyleType,
    OverflowStyleValueType,
    TextAlignStyleValueType,
    JustifyContentStyleType,
    AlignItemsStyleValueType,
    UserSelectStyleValueType,
    AlignContentStyleValueType,
    JustifyItemsStyleValueType,
    JustifyContentStyleValueType,
} from '../data/style';
import { ColorsType } from './color';
import { MotionProps } from 'framer-motion';
import { GridType, LinesStyleType } from './chocoValue';
import { ChocoStyleValue, CssType, CsType } from './choco';

export type ChocoStylesType = ChocoStyleDefType & ChocoStyleType;

export type ChocoCompoentPropsType<
    Component extends React.ElementType = React.ElementType,
> = ChocoComponentPropType<Component> & ChocoStylePropsType;

export type ChocoStylePropsType = ChocoStyleDefType & ChocoStylePropType;

export type ChocoStyleDefType = {
    //* Responsive size
    sz?: ChocoStyleValue<number>;

    //* CSS more
    css?: CssType;

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
    event?: ChocoStyleValue<EventStyleValueType>;
};

export type ChocoStyleType = {
    //* Display
    //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
    dp?: ChocoStyleValue<DisplayStyleValueType>;

    //* Flex direction
    //? unset row reverse-row column reverse-column inherit
    fd?: ChocoStyleValue<FlexDirStyleValueType>;

    //* Flex wrap
    fw?: ChocoStyleValue<boolean>;

    //* Align content
    //? unset flex-end flex-start center space-around space-between stretch
    ac?: ChocoStyleValue<AlignContentStyleValueType>;

    //* Align items
    //? unset flex-end flex-start center space-around space-between stretch
    a?: ChocoStyleValue<AlignItemsStyleValueType>;

    //* Justify content
    //? unset flex-end flex-start center space-around space-between space-evenly
    j?: ChocoStyleValue<JustifyContentStyleValueType>;

    //* Justify items
    //? unset end start center
    ji?: ChocoStyleValue<JustifyItemsStyleValueType>;

    //* Text align
    //? unset end left start right center justify
    text?: ChocoStyleValue<TextAlignStyleValueType>;

    //* Position
    //? unset relative absolute fixed sticky
    pos?: ChocoStyleValue<PosStyleValueType>;

    //* Overflow
    //? visible hidden scroll auto
    of?: ChocoStyleValue<OverflowStyleValueType>;
    ofx?: ChocoStyleValue<OverflowStyleValueType>;
    ofy?: ChocoStyleValue<OverflowStyleValueType>;

    //* Cursor
    //? default pointer move not-allowed wait text crosshair alias copy col-resize
    cur?: ChocoStyleValue<CursorStyleValueType>;

    //* User select
    //? unset none auto text all
    us?: ChocoStyleValue<UserSelectStyleValueType>;
};

export type SetChocoStyleProp<KeyType extends string> = {
    [key in KeyType]?: boolean;
};

export type ChocoComponentPropType<
    Component extends React.ElementType = React.ElementType,
> = {
    component?: Component;
    cs?: CsType;
    debug?: boolean;
    motion?: MotionProps;
};

export type ChocoStylePropType = {
    //* Keywords
    //? width&height:100% width:100% height:100% width&height:100view width:100view height:100view
    full?: boolean;
    fullW?: boolean;
    fullH?: boolean;
    fullV?: boolean;
    fullVW?: boolean;
    fullVH?: boolean;

    //* Flex wrap
    fWrap?: boolean;

    center?: boolean;
} & ChocoStylePropTypes;

export type ChocoStylePropTypes =
    //* Display
    //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
    SetChocoStyleProp<DisplayStyleType> &
        //* Flex direction
        //? unset row reverse-row reverse-column column fdInherit
        SetChocoStyleProp<FlexDirStyleType> &
        //* Align content
        //? unset flex-end flex-start center space-around space-between stretch
        SetChocoStyleProp<AlignContentStyleType> &
        //* Align item
        //? unset flex-end flex-start center space-around space-between stretch
        SetChocoStyleProp<AlignItemsStyleType> &
        //* Justify content
        //? unset flex-end flex-start center space-evenly space-around space-between
        SetChocoStyleProp<JustifyContentStyleType> &
        //* Justify items
        //? unset end start center stretch
        SetChocoStyleProp<JustifyItemsStyleType> &
        //* Text align
        //? end left start right center justify
        SetChocoStyleProp<TextAlignStyleType> &
        //* Position
        //? position: unset relative absolute fixed sticky
        SetChocoStyleProp<PosStyleType> &
        //* Overflow
        //? visible hidden scroll auto
        SetChocoStyleProp<OverflowStyleType> &
        //* Overflow axis
        SetChocoStyleProp<OverflowAxisStyleType> &
        //* Pointer events
        //? none auto
        SetChocoStyleProp<EventStyleType> &
        //* Cursor
        //? default pointer move not-allowed wait text crosshair alias copy col-resize
        SetChocoStyleProp<CursorStyleType> &
        //* User select
        //? unset none auto text all
        SetChocoStyleProp<UserSelectStyleType>;
