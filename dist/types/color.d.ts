export declare const ColorDefault: {
    readonly INFO: "info";
    readonly ERROR: "error";
    readonly PRIMARY: "primary";
    readonly WARNING: "warning";
    readonly SUCCESS: "success";
    readonly SECONDARY: "secondary";
};
export type ColorDefaultType = (typeof ColorDefault)[keyof typeof ColorDefault];
export declare const ColorText: {
    readonly INFO: "infoText";
    readonly ERROR: "errorText";
    readonly PRIMARY: "primaryText";
    readonly WARNING: "warningText";
    readonly SUCCESS: "successText";
    readonly SECONDARY: "secondaryText";
};
export type ColorTextType = (typeof ColorText)[keyof typeof ColorText];
export declare const ColorCommon: {
    readonly TEXT: "text";
    readonly PAPER: "paper";
    readonly INHERIT: "inherit";
    readonly DISABLED: "disabled";
};
export type ColorCommonType = (typeof ColorCommon)[keyof typeof ColorCommon];
export type ColorHexType = `#${string}`;
export type ColorType = ColorDefaultType | ColorTextType | ColorCommonType | ColorHexType | null;
