//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/types/theme.ts"
import { SizeKey } from "./Size";
import { ColorHexType } from "./color";

export type ModesKeyType = "dark" | "light";

export type ThemeFontsType = {
    family: string;
    weight: {
        regular: number;
        medium: number;
        bold: number;
    };
};

export type ColorsTypes = {
    text?: ColorHexType;
    main: ColorHexType;
    dark?: ColorHexType;
    light?: ColorHexType;
    disabled?: ColorHexType;
    textDisabled?: ColorHexType;
};

export type PaletteType = {
    common: Record<string, ColorsTypes>;
    primary: ColorsTypes;
    secondary: ColorsTypes;
    error: ColorsTypes;
    warning: ColorsTypes;
    info: ColorsTypes;
    success: ColorsTypes;
    shadow: ColorsTypes;
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
    mode: ModesKeyType;
    fonts: ThemeFontsType;
    breakpoint: Record<SizeKey, number>;
    styleSheets: ({ theme }: { theme: UseChocoThemeType }) => string;
};

export type ChocoThemeType = DefChocoThemeType & {
    modes: Record<
        ModesKeyType | "default",
        { [key in keyof PaletteType]?: PaletteType[key] }
    >;
};

export type UseChocoThemeType = DefChocoThemeType & {
    palette: PaletteType;
    method: {
        setMode: (mode: ModesKeyType) => void;
    };
};
