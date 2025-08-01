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
    BoxSizingStyleType,
} from '../data/style';
import { ColorsType } from './color';
import { MotionProps } from 'framer-motion';
import { GridType, LinesStyleType } from './chocoValue';
import { ChocoStyleValue, CssType, CsType } from './choco';

/**
 * Combined type for Choco style definitions and properties.
 */
export type ChocoStylesType = ChocoStyleDefType & ChocoStyleType;

/**
 * Props type for Choco components, combining component and style props.
 * @template Component - The React component type.
 */
export type ChocoCompoentPropsType<
    Component extends React.ElementType = React.ElementType,
> = ChocoComponentPropType<Component> & ChocoStylePropsType;

/**
 * Props type for Choco style-related properties.
 */
export type ChocoStylePropsType = ChocoStyleDefType & ChocoStylePropType;

/**
 * Core style definitions for Choco components.
 */
export abstract class ChocoStyleDefType {
    /**
     * Size for components
     * @param value - Number size in pixels or other units.
     */
    sz?: ChocoStyleValue<number>;

    /**
     * Custom CSS styles for advanced styling.
     * @remarks Allows applying custom CSS properties.
     */
    css?: CssType;

    /** Background style (color, image, or null). */
    bg?: ChocoStyleValue<string | null>;

    /** Text or foreground color. */
    clr?: ChocoStyleValue<ColorsType>;

    /** Background color. */
    bgClr?: ChocoStyleValue<ColorsType>;

    /** Background image URL or null. */
    bgImg?: ChocoStyleValue<string | null>;

    /** Box shadow style. */
    bShadow?: ChocoStyleValue<string | null>;

    /** Text shadow style. */
    tShadow?: ChocoStyleValue<string | null>;

    /** Opacity level (0 to 1). */
    op?: ChocoStyleValue<number>;

    /** Z-index for layering. */
    z?: ChocoStyleValue<number>;

    /** Width of the component. */
    w?: ChocoStyleValue;

    /** Height of the component. */
    h?: ChocoStyleValue;

    /** Width and height combined. */
    wh?: ChocoStyleValue;

    /** Minimum width of the component. */
    minW?: ChocoStyleValue;

    /** Minimum height of the component. */
    minH?: ChocoStyleValue;

    /** Minimum width and height combined. */
    minWH?: ChocoStyleValue;

    /** Maximum width of the component. */
    maxW?: ChocoStyleValue;

    /** Maximum height of the component. */
    maxH?: ChocoStyleValue;

    /** Maximum width and height combined. */
    maxWH?: ChocoStyleValue;

    /** Inset (all sides). */
    i?: ChocoStyleValue;

    /** Top inset. */
    t?: ChocoStyleValue;

    /** Bottom inset. */
    b?: ChocoStyleValue;

    /** Left inset. */
    l?: ChocoStyleValue;

    /** Right inset. */
    r?: ChocoStyleValue;

    /** Left and right inset. */
    x?: ChocoStyleValue;

    /** Top and bottom inset. */
    y?: ChocoStyleValue;

    /** Padding (all sides). */
    p?: ChocoStyleValue;

    /** Top padding. */
    pt?: ChocoStyleValue;

    /** Bottom padding. */
    pb?: ChocoStyleValue;

    /** Left padding. */
    pl?: ChocoStyleValue;

    /** Right padding. */
    pr?: ChocoStyleValue;

    /** Left and right padding. */
    px?: ChocoStyleValue;

    /** Top and bottom padding. */
    py?: ChocoStyleValue;

    /** Margin (all sides). */
    m?: ChocoStyleValue;

    /** Top margin. */
    mt?: ChocoStyleValue;

    /** Bottom margin. */
    mb?: ChocoStyleValue;

    /** Left margin. */
    ml?: ChocoStyleValue;

    /** Right margin. */
    mr?: ChocoStyleValue;

    /** Left and right margin. */
    mx?: ChocoStyleValue;

    /** Top and bottom margin. */
    my?: ChocoStyleValue;

    /** Gap between elements (all directions). */
    g?: ChocoStyleValue;

    /** Gap between rows. */
    gx?: ChocoStyleValue;

    /** Gap between columns. */
    gy?: ChocoStyleValue;

    /**
     * @remarks Font size for text.
     * @param value - Number or string (e.g., "24px", "2rem", 16).
     * @example "24px" | "2rem" | 16
     */
    fontS?: ChocoStyleValue;

    /** Font family. */
    fontF?: ChocoStyleValue;

    /** Font weight. */
    fontW?: ChocoStyleValue;

    /** Text transform */
    txtTf?: ChocoStyleValue;

    /** Text decoration */
    txtDr?: ChocoStyleValue;

    /** Grid template definition. */
    gridT?: ChocoStyleValue<string | [GridType, GridType]>;

    /** Grid template columns. */
    gridTC?: ChocoStyleValue<string | GridType>;

    /** Grid template rows. */
    gridTR?: ChocoStyleValue<string | GridType>;

    /** Grid area definition. */
    gridA?: ChocoStyleValue<string | GridType[]>;

    /** Grid area column. */
    gridAC?: ChocoStyleValue<string | GridType>;

    /** Grid area row. */
    gridAR?: ChocoStyleValue<string | GridType>;

    /** Border width. */
    borW?: ChocoStyleValue;

    /** Border radius (all corners). */
    borR?: ChocoStyleValue;

    /** Border radius top-left. */
    borRTL?: ChocoStyleValue;

    /** Border radius top-right. */
    borRTR?: ChocoStyleValue;

    /** Border radius bottom-left. */
    borRBL?: ChocoStyleValue;

    /** Border radius bottom-right. */
    borRBR?: ChocoStyleValue;

    /** Border style. */
    borS?: ChocoStyleValue<string | null>;

    /** Border color. */
    borClr?: ChocoStyleValue<ColorsType>;

    /** Border (all sides). */
    borders?: LinesStyleType | string | null;

    /** Top border. */
    borderT?: LinesStyleType | string | null;

    /** Bottom border. */
    borderB?: LinesStyleType | string | null;

    /** Left border. */
    borderL?: LinesStyleType | string | null;

    /** Right border. */
    borderR?: LinesStyleType | string | null;

    /** Left and right border. */
    borderX?: LinesStyleType | string | null;

    /** Top and bottom border. */
    borderY?: LinesStyleType | string | null;

    /** Outline style. */
    outlines?: LinesStyleType | string | null;

    /** Transition duration or style. */
    trans?: number | string;

    /** Transform style (e.g., rotate, scale). */
    form?: ChocoStyleValue<string>;

    /** Transform origin (center point for transforms). */
    transformCenter?: 'all' | 'x' | 'y';

    /** Pointer events behavior. */
    event?: ChocoStyleValue<EventStyleValueType>;

    /** Content */
    coten?: ChocoStyleValue<string>;
}

/**
 * Additional style properties for layout and behavior.
 */
export abstract class ChocoStyleType {
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
    txtA?: ChocoStyleValue<TextAlignStyleValueType>;

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

    //* Box sizing
    //? border-box content-box
    bxSz?: ChocoStyleValue;
}

export abstract class ChocoComponentPropType<
    Component extends React.ElementType = React.ElementType,
> {
    component?: Component;
    compo?: React.ElementType;
    cs?: CsType;
    debug?: string[] | boolean;
    motion?: MotionProps;
}

export type SetChocoStyleProp<KeyType extends string> = {
    [key in KeyType]?: boolean;
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
        SetChocoStyleProp<UserSelectStyleType> &
        //* Box sizing
        //? border-box content-box
        SetChocoStyleProp<BoxSizingStyleType>;
