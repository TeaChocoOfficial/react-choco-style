//-Path: "react-choco-style/src/types/chocoColor.ts"
import { ChocoColor } from '../theme/color';

export type ColorHex = `#${string}`;
export type w3cx11ColorType = keyof typeof w3cx11;
export type newChocoColorType = (color?: ChocoColorType) => ChocoColor;
export type ShadeKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ShadeColor = { [key in ShadeKey]: ChocoColor };
export type ShadeMapCallbackFn<MapCallback> = (
    color: ChocoColor,
    key: ShadeKey,
    index: number,
) => MapCallback;
export type ShadeMethod = {
    map: <MapCallback>(
        callbackfn: ShadeMapCallbackFn<MapCallback>,
    ) => MapCallback[];
};
export type ShadeColors = ShadeColor & ShadeMethod;
export type ChocoColorType =
    | null
    | number
    | string
    | number[]
    | ColorRgba
    | ChocoColor;

export class ColorRgba {
    constructor(
        public r: number = 0,
        public g: number = 0,
        public b: number = 0,
        public a: number = 0,
    ) {}
}

export declare const w3cx11: {
    aliceblue: number;
    antiquewhite: number;
    aqua: number;
    aquamarine: number;
    azure: number;
    beige: number;
    bisque: number;
    black: number;
    blanchedalmond: number;
    blue: number;
    blueviolet: number;
    brown: number;
    burlywood: number;
    cadetblue: number;
    chartreuse: number;
    chocolate: number;
    coral: number;
    cornflower: number;
    cornflowerblue: number;
    cornsilk: number;
    crimson: number;
    cyan: number;
    darkblue: number;
    darkcyan: number;
    darkgoldenrod: number;
    darkgray: number;
    darkgreen: number;
    darkgrey: number;
    darkkhaki: number;
    darkmagenta: number;
    darkolivegreen: number;
    darkorange: number;
    darkorchid: number;
    darkred: number;
    darksalmon: number;
    darkseagreen: number;
    darkslateblue: number;
    darkslategray: number;
    darkslategrey: number;
    darkturquoise: number;
    darkviolet: number;
    deeppink: number;
    deepskyblue: number;
    dimgray: number;
    dimgrey: number;
    dodgerblue: number;
    firebrick: number;
    floralwhite: number;
    forestgreen: number;
    fuchsia: number;
    gainsboro: number;
    ghostwhite: number;
    gold: number;
    goldenrod: number;
    gray: number;
    green: number;
    greenyellow: number;
    grey: number;
    honeydew: number;
    hotpink: number;
    indianred: number;
    indigo: number;
    ivory: number;
    khaki: number;
    laserlemon: number;
    lavender: number;
    lavenderblush: number;
    lawngreen: number;
    lemonchiffon: number;
    lightblue: number;
    lightcoral: number;
    lightcyan: number;
    lightgoldenrod: number;
    lightgoldenrodyellow: number;
    lightgray: number;
    lightgreen: number;
    lightgrey: number;
    lightpink: number;
    lightsalmon: number;
    lightseagreen: number;
    lightskyblue: number;
    lightslategray: number;
    lightslategrey: number;
    lightsteelblue: number;
    lightyellow: number;
    lime: number;
    limegreen: number;
    linen: number;
    magenta: number;
    maroon: number;
    maroon2: number;
    maroon3: number;
    mediumaquamarine: number;
    mediumblue: number;
    mediumorchid: number;
    mediumpurple: number;
    mediumseagreen: number;
    mediumslateblue: number;
    mediumspringgreen: number;
    mediumturquoise: number;
    mediumvioletred: number;
    midnightblue: number;
    mintcream: number;
    mistyrose: number;
    moccasin: number;
    navajowhite: number;
    navy: number;
    oldlace: number;
    olive: number;
    olivedrab: number;
    orange: number;
    orangered: number;
    orchid: number;
    palegoldenrod: number;
    palegreen: number;
    paleturquoise: number;
    palevioletred: number;
    papayawhip: number;
    peachpuff: number;
    peru: number;
    pink: number;
    plum: number;
    powderblue: number;
    purple: number;
    purple2: number;
    purple3: number;
    rebeccapurple: number;
    red: number;
    rosybrown: number;
    royalblue: number;
    saddlebrown: number;
    salmon: number;
    sandybrown: number;
    seagreen: number;
    seashell: number;
    sienna: number;
    silver: number;
    skyblue: number;
    slateblue: number;
    slategray: number;
    slategrey: number;
    snow: number;
    springgreen: number;
    steelblue: number;
    tan: number;
    teal: number;
    thistle: number;
    tomato: number;
    turquoise: number;
    violet: number;
    wheat: number;
    white: number;
    whitesmoke: number;
    yellow: number;
    yellowgreen: number;
};
