import { SizeKey } from "./Size";
export type ModesKeyType = "dark" | "light";
export type ThemeFontsType = {
    family: string;
    weight: number;
};
export type ColorsType = {
    text?: string;
    main: string;
    dark?: string;
    light?: string;
    disabled?: string;
    textDisabled?: string;
};
export type PaletteType = {
    primary: ColorsType;
    secondary: ColorsType;
    background: {
        body: string;
        paper: string;
        default: string;
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
