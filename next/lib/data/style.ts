//-Path: "react-choco-style/lib/src/data/style.ts"
//* Display
//? none flex block inline inline-flex inline-block grid inline-grid table inline-table
export const displayStyleData = {
    dNone: null,
    dFlex: 'f',
    dBlock: 'b',
    dInline: 'i',
    dInlineF: 'if',
    dInlineB: 'ib',
    dGrid: 'g',
    dInlineG: 'ig',
    dTable: 't',
    dInlineT: 'it',
} as const;
export type DisplayStyleData = typeof displayStyleData;
export type DisplayStyleType = keyof DisplayStyleData;
export type DisplayStyleValueType = DisplayStyleData[DisplayStyleType];

//* Flex direction
//? none row reverse-row reverse-column column fdInherit
export const flexDirStyleData = {
    fdNone: null,
    row: 'r',
    rRow: 'rr',
    column: 'c',
    rColumn: 'cr',
    fdInherit: 'i',
} as const;
export type FlexDirStyleData = typeof flexDirStyleData;
export type FlexDirStyleType = keyof FlexDirStyleData;
export type FlexDirStyleValueType = FlexDirStyleData[FlexDirStyleType];

//* Align content
//? flex-end flex-start center space-around space-between stretch
export const alignContentStyleData = {
    acNone: null,
    acEnd: 'e',
    acStart: 's',
    acCenter: 'c',
    acAround: 'a',
    acBetween: 'b',
    acStretch: 'st',
} as const;
export type AlignContentStyleData = typeof alignContentStyleData;
export type AlignContentStyleType = keyof AlignContentStyleData;
export type AlignContentStyleValueType =
    AlignContentStyleData[AlignContentStyleType];

//* Align items
//? flex-end flex-start center space-around space-between stretch
export const alignItemsStyleData = {
    aNone: null,
    aEnd: 'e',
    aStart: 's',
    aCenter: 'c',
    aAround: 'a',
    aBetween: 'b',
    aStretch: 'st',
} as const;
export type AlignItemsStyleData = typeof alignItemsStyleData;
export type AlignItemsStyleType = keyof AlignItemsStyleData;
export type AlignItemsStyleValueType = AlignItemsStyleData[AlignItemsStyleType];

//* Justify content
//? unset flex-end flex-start center space-evenly space-around space-between
export const justifyContentStyleData = {
    jNone: null,
    jEnd: 'e',
    jStart: 's',
    jCenter: 'c',
    jAround: 'a',
    jBetween: 'b',
    jEvenly: 'ev',
} as const;
export type JustifyContentStyleData = typeof justifyContentStyleData;
export type JustifyContentStyleType = keyof JustifyContentStyleData;
export type JustifyContentStyleValueType =
    JustifyContentStyleData[JustifyContentStyleType];

//* Justify items
//? unset end start center stretch
export const justifyItemsStyleData = {
    jiNone: null,
    jiEnd: 'e',
    jiStart: 's',
    jiCenter: 'c',
    jiStretch: 'st',
} as const;
export type JustifyItemsStyleData = typeof justifyItemsStyleData;
export type JustifyItemsStyleType = keyof JustifyItemsStyleData;
export type JustifyItemsStyleValueType =
    JustifyItemsStyleData[JustifyItemsStyleType];

//* Text align
//? end left start right center justify
export const textAlignStyleData = {
    tNone: null,
    tEnd: 'e',
    tLeft: 'l',
    tStart: 's',
    tRight: 'r',
    tCenter: 'c',
    tJustify: 'j',
} as const;
export type TextAlignStyleData = typeof textAlignStyleData;
export type TextAlignStyleType = keyof TextAlignStyleData;
export type TextAlignStyleValueType = TextAlignStyleData[TextAlignStyleType];

//* Position
//? position: relative absolute fixed sticky
export const posStyleData = {
    posNone: null,
    posR: 'r',
    posA: 'a',
    posF: 'f',
    posS: 's',
} as const;
export type PosStyleData = typeof posStyleData;
export type PosStyleType = keyof PosStyleData;
export type PosStyleValueType = PosStyleData[PosStyleType];

//* Overflow
//? unset visible hidden scroll auto
export const overflowStyleData = {
    ofNone: null,
    ofV: 'v',
    ofH: 'h',
    ofS: 's',
    ofA: 'a',
} as const;
export type OverflowStyleData = typeof overflowStyleData;
export type OverflowStyleType = keyof OverflowStyleData;
export type OverflowStyleValueType = OverflowStyleData[OverflowStyleType];

//* Overflow axis
//? visible hidden scroll auto
export const overflowAxisStyleData = {
    ofxV: 'v',
    ofxH: 'h',
    ofxS: 's',
    ofxA: 'a',
    ofyV: 'v',
    ofyH: 'h',
    ofyS: 's',
    ofyA: 'a',
} as const;
export type OverflowAxisStyleData = typeof overflowAxisStyleData;
export type OverflowAxisStyleType = keyof OverflowAxisStyleData;
export type OverflowAxisStyleValueType =
    OverflowAxisStyleData[OverflowAxisStyleType];

//* Pointer events
//? none auto
export const eventStyleData = {
    eventNone: null,
    eventN: 'n',
    eventA: 'a',
} as const;
export type EventStyleData = typeof eventStyleData;
export type EventStyleType = keyof EventStyleData;
export type EventStyleValueType = EventStyleData[EventStyleType];

//* Pointer events
//? none auto
export const cursorStyleData = {
    curNone: null,
    curD: 'd',
    curP: 'p',
    curM: 'm',
    curN: 'n',
    curW: 'w',
    curT: 't',
    curC: 'c',
    curCr: 'cr',
} as const;
export type CursorStyleData = typeof cursorStyleData;
export type CursorStyleType = keyof CursorStyleData;
export type CursorStyleValueType = CursorStyleData[CursorStyleType];

//* User select
//? unset none auto text all
export const userSelectStyleData = {
    usNone: null,
    usN: 'n',
    usA: 'a',
    usT: 't',
    usAll: 'al',
} as const;
export type UserSelectStyleData = typeof userSelectStyleData;
export type UserSelectStyleType = keyof UserSelectStyleData;
export type UserSelectStyleValueType = UserSelectStyleData[UserSelectStyleType];

//* Box sizing
//? border-box content-box
export const boxSizingStyleData = {
    bxSzNone: null,
    bxSzB: 'border',
    bxSzC: 'content',
} as const;
export type BoxSizingStyleData = typeof boxSizingStyleData;
export type BoxSizingStyleType = keyof BoxSizingStyleData;
export type BoxSizingStyleValueType = UserSelectStyleData[UserSelectStyleType];
