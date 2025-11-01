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
    BoxSizingStyleType,
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
    abstract sz?: ChocoStyleValue<number>;

    /**
     * Custom CSS styles for advanced styling.
     * @remarks Allows applying custom CSS properties.
     */
    abstract css?: CssType;

    /** Background style (color, image, or null). */
    abstract bg?: ChocoStyleValue<string | null>;

    /** Text or foreground color. */
    abstract clr?: ChocoStyleValue<ColorsType>;

    /** Background color. */
    abstract bgClr?: ChocoStyleValue<ColorsType>;

    /** Background image URL or null. */
    abstract bgImg?: ChocoStyleValue<string | null>;

    /** Box shadow style. */
    abstract bShadow?: ChocoStyleValue<string | null>;

    /** Text shadow style. */
    abstract tShadow?: ChocoStyleValue<string | null>;

    /** Opacity level (0 to 1). */
    abstract op?: ChocoStyleValue<number>;

    /** Z-index for layering. */
    abstract z?: ChocoStyleValue<number>;

    /** Width of the component. */
    abstract w?: ChocoStyleValue;

    /** Height of the component. */
    abstract h?: ChocoStyleValue;

    /** Width and height combined. */
    abstract wh?: ChocoStyleValue;

    /** Minimum width of the component. */
    abstract minW?: ChocoStyleValue;

    /** Minimum height of the component. */
    abstract minH?: ChocoStyleValue;

    /** Minimum width and height combined. */
    abstract minWH?: ChocoStyleValue;

    /** Maximum width of the component. */
    abstract maxW?: ChocoStyleValue;

    /** Maximum height of the component. */
    abstract maxH?: ChocoStyleValue;

    /** Maximum width and height combined. */
    abstract maxWH?: ChocoStyleValue;

    /** Inset (all sides). */
    abstract i?: ChocoStyleValue;

    /** Top inset. */
    abstract t?: ChocoStyleValue;

    /** Bottom inset. */
    abstract b?: ChocoStyleValue;

    /** Left inset. */
    abstract l?: ChocoStyleValue;

    /** Right inset. */
    abstract r?: ChocoStyleValue;

    /** Left and right inset. */
    abstract x?: ChocoStyleValue;

    /** Top and bottom inset. */
    abstract y?: ChocoStyleValue;

    /** Padding (all sides). */
    abstract p?: ChocoStyleValue;

    /** Top padding. */
    abstract pt?: ChocoStyleValue;

    /** Bottom padding. */
    abstract pb?: ChocoStyleValue;

    /** Left padding. */
    abstract pl?: ChocoStyleValue;

    /** Right padding. */
    abstract pr?: ChocoStyleValue;

    /** Left and right padding. */
    abstract px?: ChocoStyleValue;

    /** Top and bottom padding. */
    abstract py?: ChocoStyleValue;

    /** Margin (all sides). */
    abstract m?: ChocoStyleValue;

    /** Top margin. */
    abstract mt?: ChocoStyleValue;

    /** Bottom margin. */
    abstract mb?: ChocoStyleValue;

    /** Left margin. */
    abstract ml?: ChocoStyleValue;

    /** Right margin. */
    abstract mr?: ChocoStyleValue;

    /** Left and right margin. */
    abstract mx?: ChocoStyleValue;

    /** Top and bottom margin. */
    abstract my?: ChocoStyleValue;

    /** Gap between elements (all directions). */
    abstract g?: ChocoStyleValue;

    /** Gap between rows. */
    abstract gx?: ChocoStyleValue;

    /** Gap between columns. */
    abstract gy?: ChocoStyleValue;

    /**
     * @remarks Font size for text.
     * @param value - Number or string (e.g., "24px", "2rem", 16).
     * @example "24px" | "2rem" | 16
     */
    abstract fontS?: ChocoStyleValue;

    /** Font family. */
    abstract fontF?: ChocoStyleValue;

    /** Font weight. */
    abstract fontW?: ChocoStyleValue;

    /** Text transform */
    abstract txtTf?: ChocoStyleValue;

    /** Text decoration */
    abstract txtDr?: ChocoStyleValue;

    /** Grid template definition. */
    abstract gridT?: ChocoStyleValue<string | [GridType, GridType]>;

    /** Grid template columns. */
    abstract gridTC?: ChocoStyleValue<string | GridType>;

    /** Grid template rows. */
    abstract gridTR?: ChocoStyleValue<string | GridType>;

    /** Grid area definition. */
    abstract gridA?: ChocoStyleValue<string | GridType[]>;

    /** Grid area column. */
    abstract gridAC?: ChocoStyleValue<string | GridType>;

    /** Grid area row. */
    abstract gridAR?: ChocoStyleValue<string | GridType>;

    /** Border width. */
    abstract borW?: ChocoStyleValue;

    /** Border radius (all corners). */
    abstract borR?: ChocoStyleValue;

    /** Border radius top-left. */
    abstract borRTL?: ChocoStyleValue;

    /** Border radius top-right. */
    abstract borRTR?: ChocoStyleValue;

    /** Border radius bottom-left. */
    abstract borRBL?: ChocoStyleValue;

    /** Border radius bottom-right. */
    abstract borRBR?: ChocoStyleValue;

    /** Border style. */
    abstract borS?: ChocoStyleValue<string | null>;

    /** Border color. */
    abstract borClr?: ChocoStyleValue<ColorsType>;

    /** Border (all sides). */
    abstract borders?: LinesStyleType | string | null;

    /** Top border. */
    abstract borderT?: LinesStyleType | string | null;

    /** Bottom border. */
    abstract borderB?: LinesStyleType | string | null;

    /** Left border. */
    abstract borderL?: LinesStyleType | string | null;

    /** Right border. */
    abstract borderR?: LinesStyleType | string | null;

    /** Left and right border. */
    abstract borderX?: LinesStyleType | string | null;

    /** Top and bottom border. */
    abstract borderY?: LinesStyleType | string | null;

    /** Outline style. */
    abstract outlines?: LinesStyleType | string | null;

    /** Transition duration or style. */
    abstract trans?: number | string;

    /** Transform style (e.g., rotate, scale). */
    abstract form?: ChocoStyleValue<string>;

    /** Transform origin (center point for transforms). */
    abstract transformCenter?: 'all' | 'x' | 'y';

    /** Pointer events behavior. */
    abstract event?: ChocoStyleValue<EventStyleValueType>;

    /** Content */
    abstract coten?: ChocoStyleValue<string>;
}

/**
 * Additional style properties for layout and behavior.
 */
export abstract class ChocoStyleType {
    //* Display
    //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
    abstract dp?: ChocoStyleValue<DisplayStyleValueType>;

    //* Flex direction
    //? unset row reverse-row column reverse-column inherit
    abstract fd?: ChocoStyleValue<FlexDirStyleValueType>;

    //* Flex wrap
    abstract fw?: ChocoStyleValue<boolean>;

    //* Align content
    //? unset flex-end flex-start center space-around space-between stretch
    abstract ac?: ChocoStyleValue<AlignContentStyleValueType>;

    //* Align items
    //? unset flex-end flex-start center space-around space-between stretch
    abstract a?: ChocoStyleValue<AlignItemsStyleValueType>;

    //* Justify content
    //? unset flex-end flex-start center space-around space-between space-evenly
    abstract j?: ChocoStyleValue<JustifyContentStyleValueType>;

    //* Justify items
    //? unset end start center
    abstract ji?: ChocoStyleValue<JustifyItemsStyleValueType>;

    //* Text align
    //? unset end left start right center justify
    abstract txtA?: ChocoStyleValue<TextAlignStyleValueType>;

    //* Position
    //? unset relative absolute fixed sticky
    abstract pos?: ChocoStyleValue<PosStyleValueType>;

    //* Overflow
    //? visible hidden scroll auto
    abstract of?: ChocoStyleValue<OverflowStyleValueType>;
    abstract ofx?: ChocoStyleValue<OverflowStyleValueType>;
    abstract ofy?: ChocoStyleValue<OverflowStyleValueType>;

    //* Cursor
    //? default pointer move not-allowed wait text crosshair alias copy col-resize
    abstract cur?: ChocoStyleValue<CursorStyleValueType>;

    //* User select
    //? unset none auto text all
    abstract us?: ChocoStyleValue<UserSelectStyleValueType>;

    //* Box sizing
    //? border-box content-box
    abstract bxSz?: ChocoStyleValue;
}

export abstract class ChocoComponentPropType<
    Component extends React.ElementType = React.ElementType,
> {
    abstract component?: Component;
    abstract compo?: React.ElementType;
    abstract cs?: CsType;
    abstract debug?: string[] | boolean;
    abstract motion?: MotionProps;
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
