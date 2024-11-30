import { SizeKey } from "./Size";
import { ColorHexType } from "./color";
export type ModesKeyType = "dark" | "light";
export type ThemeFontsType = {
    family: string;
    weight: number;
};
export type ColorsType = {
    text?: ColorHexType;
    main: ColorHexType;
    dark?: ColorHexType;
    light?: ColorHexType;
    disabled?: ColorHexType;
    textDisabled?: ColorHexType;
};
export type PaletteType = {
    common: Record<string, ColorsType>;
    primary: ColorsType;
    secondary: ColorsType;
    error: ColorsType;
    warning: ColorsType;
    info: ColorsType;
    success: ColorsType;
    shadow: ColorsType;
    background: {
        body: ColorHexType;
        paper: ColorHexType;
        default: ColorHexType;
    };
    text: {
        primary: ColorHexType;
        secondary: ColorHexType;
        disabled: ColorHexType;
    };
};
export type DefChocoThemeType = {
    fonts: ThemeFontsType;
    mode: ModesKeyType;
    breakpoint: Record<SizeKey, number>;
};
export type ChocoThemeType = DefChocoThemeType & {
    modes: Record<ModesKeyType | "default", {
        [key in keyof PaletteType]?: PaletteType[key];
    }>;
};
export type UseChocoThemeType = DefChocoThemeType & {
    palette: PaletteType;
    method: {
        setMode: (mode: ModesKeyType) => void;
    };
};
