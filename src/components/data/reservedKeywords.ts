//-Path: "react-choco-style/src/components/data/reservedKeywords.ts"
import {
    ChocoStyleType,
    ChocoStyleDefType,
    ChocoStylePropsType,
} from "../../types/ChocoStyle";

export const KeywordsChocoStyleDef: (keyof ChocoStyleDefType)[] = [
    "bg",
    "clr",
    "bgClr",
    "bgImg",
    "op",
    "z",
    "w",
    "h",
    "minW",
    "minH",
    "maxW",
    "maxH",
    "i",
    "t",
    "b",
    "l",
    "r",
    "x",
    "y",
    "p",
    "pt",
    "pb",
    "pl",
    "pr",
    "px",
    "py",
    "m",
    "mt",
    "mb",
    "ml",
    "mr",
    "mx",
    "my",
    "gaps",
    "gapT",
    "gapB",
    "gapL",
    "gapR",
    "gapX",
    "gapY",
    "size",
    "fontS",
    "event",
    "gridT",
    "gridA",
    "borR",
    "borders",
    "borderT",
    "borderB",
    "borderL",
    "borderR",
    "borderX",
    "borderY",
    "outlines",
    "trans",
    "transform",
    "transformCenter",
];

export const KeywordsChocoStyle: (keyof ChocoStyleType)[] = [
    "dp",
    "fd",
    "fw",
    "a",
    "j",
    "text",
    "pos",
    "of",
    "ofx",
    "ofy",
    "cur",
    "us",
];

export const KeywordsChocoStyleProps: (keyof ChocoStylePropsType)[] = [    
    "cs",
    "full",
    "fullV",
    "dNone",
    "dFlex",
    "dBlock",
    "dInline",
    "dInlineF",
    "dInlineB",
    "dGrid",
    "dInlineG",
    "dTable",
    "dInlineT",
    "row",
    "rRow",
    "column",
    "rColumn",
    "fWrap",
    "acEnd",
    "acStart",
    "acCenter",
    "acAround",
    "acBetween",
    "acStretch",
    "aEnd",
    "aStart",
    "aCenter",
    "aAround",
    "aBetween",
    "aStretch",
    "jEnd",
    "jStart",
    "jCenter",
    "jEvenly",
    "jAround",
    "jBetween",
    "tEnd",
    "tLeft",
    "tStart",
    "tRight",
    "tCenter",
    "tJustify",
    "posR",
    "posA",
    "posF",
    "posS",
    "ofV",
    "ofH",
    "ofS",
    "ofA",
    "ofxV",
    "ofxH",
    "ofxS",
    "ofxA",
    "ofyV",
    "ofyH",
    "ofyS",
    "ofyA",
    "eventN",
    "eventA",
    "usN",
    "usA",
    "usT",
    "usAll",
];

export const keysChocoStyle = [
    ...KeywordsChocoStyle,
    ...KeywordsChocoStyleDef,
] as (keyof ChocoStyleType & keyof ChocoStyleDefType)[];

export const keysChocoStyleProps = [
    ...KeywordsChocoStyleDef,
    ...KeywordsChocoStyleProps,
] as (keyof ChocoStyleDefType & keyof ChocoStylePropsType)[];
