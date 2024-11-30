//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/types/color.ts"

export const ColorDefault = {
    INFO: "info",
    ERROR: "error",
    PRIMARY: "primary",
    WARNING: "warning",
    SUCCESS: "success",
    SECONDARY: "secondary",
} as const;

export type ColorDefaultType = (typeof ColorDefault)[keyof typeof ColorDefault];

export const ColorText = {
    INFO: "infoText",
    ERROR: "errorText",
    PRIMARY: "primaryText",
    WARNING: "warningText",
    SUCCESS: "successText",
    SECONDARY: "secondaryText",
} as const;

export type ColorTextType = (typeof ColorText)[keyof typeof ColorText];

export const ColorCommon = {
    TEXT: "text",
    PAPER: "paper",
    INHERIT: "inherit",
    DISABLED: "disabled",
} as const;

export type ColorCommonType = (typeof ColorCommon)[keyof typeof ColorCommon];

export type ColorHexType = `#${string}`;

export type ColorType = ColorDefaultType | ColorTextType | ColorCommonType;

export type ColorsType =
    | ColorDefaultType
    | ColorTextType
    | ColorCommonType
    | ColorHexType
    | null;
