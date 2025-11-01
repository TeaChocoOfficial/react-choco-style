//-Path: "react-choco-style/lib/src/types/theme.ts"
import { SizeKey } from './size';
import { CssType } from './choco';
import { ColorMainType } from './color';
import { Transitions } from '@mui/material';
import { OptionPropsType } from './chocoHook';
import { ChocoShade } from '../class/ChocoShade';

export type ModesKeyType = 'dark' | 'light';

export type PaletteType = { [key in ColorMainType]: ChocoShade };
export type DeepPaletteType = { [key in ColorMainType]?: ChocoShade };

export type PalettesType<Colors extends DeepPaletteType = DeepPaletteType> = {
    common: Record<string, ChocoShade>;
    main: Colors;
    text: Colors;
};

export type KeyRootTheme =
    | 'box'
    | 'base'
    | 'text'
    | 'borR'
    | 'border'
    | 'padding';

export type RootThemeType = {
    unit: Record<KeyRootTheme, string>;
    size: Record<KeyRootTheme, number>;
    // response: Record<KeyRootTheme, number>;
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

export type ChocoThemeMethodType = {
    spacing: (...factor: (number | string)[]) => string;
    setMode: (mode: ModesKeyType) => void;
    transitions?: Transitions;
};

export type DefChocoThemeType = {
    mode: ModesKeyType;
    root: RootThemeType;
    fonts: ThemeFontsType;
    breakpoint: BreakpointType;
};

export type ModesChocoThemeType = Record<
    ModesKeyType | 'default',
    Partial<PalettesType>
>;

export type BaseChocoThemeType = DefChocoThemeType & {
    modes: ModesChocoThemeType;
    styleSheets: (option: OptionPropsType) => CssType;
};

export type UseChocoThemeType = DefChocoThemeType & {
    modes: ModesChocoThemeType;
    method: ChocoThemeMethodType;
    palette: PalettesType<PaletteType>;
};
