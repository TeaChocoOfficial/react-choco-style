//-Path: "react-choco-style/src/types/color.ts"

type KeyConst<Const extends Record<string, unknown>> = Const[keyof Const];

const ColorDefault = {
    INFO: 'info',
    ERROR: 'error',
    PRIMARY: 'primary',
    WARNING: 'warning',
    SUCCESS: 'success',
    SECONDARY: 'secondary',
} as const;

export type ColorDefaultType = KeyConst<typeof ColorDefault>;

const ColorText = {
    INFO: 'infoText',
    ERROR: 'errorText',
    PRIMARY: 'primaryText',
    WARNING: 'warningText',
    SUCCESS: 'successText',
    SECONDARY: 'secondaryText',
} as const;

export type ColorTextType = (typeof ColorText)[keyof typeof ColorText];

const ColorCommon = {
    TEXT: 'text',
    PAPER: 'paper',
    INHERIT: 'inherit',
    DISABLED: 'disabled',
    DISABLEDTEXT: 'disabledText',
} as const;

export type ColorCommonType = (typeof ColorCommon)[keyof typeof ColorCommon];

export type ColorHexType = `#${string}`;

export type PaletteColorType = `palette.${string}`;

export type ColorType = ColorDefaultType | ColorTextType | ColorCommonType;

export type ColorsType =
    | React.CSSProperties['color']
    | ColorType
    | PaletteColorType
    | ColorHexType
    | null;

export type SetColorType = {
    color: ColorsType;
    action: ColorsType;
    bgColor: ColorsType;
    bgHover: ColorsType;
    borColor: ColorsType;
};
