//-Path: "react-choco-style/src/types/theme.ts"
import { SizeKey } from './size';
import { StyleTypes } from './choco';
import { ColorMainType } from './color';
import { ShadeColors } from './chocoColor';
import { Transitions } from '@mui/material';

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
    response: {
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

export type PaletteType = { [key in ColorMainType]: ShadeColors };
export type DeepPaletteType = { [key in ColorMainType]?: ShadeColors };

export type PalettesType<Colors extends DeepPaletteType> = {
    common: Record<string, ShadeColors>;
    main: Colors;
    text: Colors;
};

export type ChocoThemeMethodType = {
    spacing: (...factor: (number | string)[]) => string;
    setMode: (mode: ModesKeyType) => void;
    transitions: Transitions;
};

export type DefChocoThemeType = {
    mode: ModesKeyType;
    root: RootThemeType;
    fonts: ThemeFontsType;
    breakpoint: BreakpointType;
};

export type ChocoThemeType = DefChocoThemeType & {
    modes: Record<
        ModesKeyType | 'default',
        {
            [key in keyof PalettesType<DeepPaletteType>]?: PalettesType<DeepPaletteType>[key];
        }
    >;
    styleSheets: (theme: UseChocoThemeType) => StyleTypes;
};

export type UseChocoThemeType = DefChocoThemeType & {
    palette: PalettesType<PaletteType>;
    method: ChocoThemeMethodType;
};
