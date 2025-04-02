//-Path: "react-choco-style/src/types/theme.ts"
import { SizeKey } from './size';
import { StyleTypes } from './choco';
import { Transitions } from '@mui/material';
import { ColorHexType, ColorsType, ColorType } from './color';

export type ModesKeyType = 'dark' | 'light';

export type RootThemeType = {
    unit: {
        text: string;
        padding: string;
    };
    size: {
        box: number;
        borR: number;
        text: number;
        border: number;
        padding: number;
    };
};

export type ThemeFontsType = {
    family: string;
    weight: {
        regular: number;
        medium: number;
        bold: number;
    };
};

export type BreakpointType = {
    format: Record<SizeKey, number>;
    size: Record<SizeKey, number>;
};

export type CommonColorsTypes = {
    text?: ColorHexType;
    main: ColorHexType;
    dark?: ColorHexType;
    light?: ColorHexType;
    disabled?: ColorHexType;
    textDisabled?: ColorHexType;
};

export type ColorsTypes = {
    text: ColorHexType;
    main: ColorHexType;
    dark?: ColorHexType;
    light?: ColorHexType;
    disabled: ColorHexType;
    textDisabled?: ColorHexType;
};

export type PaletteType = {
    common: Record<string, CommonColorsTypes>;
    primary: ColorsTypes;
    secondary: ColorsTypes;
    error: ColorsTypes;
    warning: ColorsTypes;
    info: ColorsTypes;
    success: ColorsTypes;
    shadow: CommonColorsTypes;
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

export type ChocoThemeMethodType = {
    alpha: (color: ColorsType, value: number) => ColorType;
    spacing: (...factor: (number | string)[]) => string;
    setMode: (mode: ModesKeyType) => void;
    transitions: Transitions;
};

export type DefChocoThemeType = {
    mode: ModesKeyType;
    root: RootThemeType;
    fonts: ThemeFontsType;
    breakpoint: BreakpointType;
    styleSheets: (theme: ChocoThemeType) => StyleTypes;
};

export type ChocoThemeType = DefChocoThemeType & {
    modes: Record<
        ModesKeyType | 'default',
        { [key in keyof PaletteType]?: PaletteType[key] }
    >;
};

export type UseChocoThemeType = DefChocoThemeType & {
    palette: PaletteType;
    method: ChocoThemeMethodType;
};
