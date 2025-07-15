//-Path: "react-choco-style/lib/src/class/ChocoStyle.tsx"
import { Temp } from '../temp/temp';
import { Theme as MuiTheme, useTheme as useMuiTheme } from '@mui/material';
import { getThemeMode, themeAtom, themeModeAtom } from '../theme/theme';
import { useMemo } from 'react';
import { Obj } from '@teachoco-dev/cli';
import {
    PaletteType,
    ModesKeyType,
    PalettesType,
    ChocoThemeType,
    UseChocoThemeType,
} from '../types/theme';

export class ChocoStyle {
    static responseCs() {
        const theme = this.theme;
    }
    static get theme() {
        return { ...Temp.theme };
    }
    static useTheme() {
        const theme = themeAtom.get();
        const muiTheme = useMuiTheme();
        const [mode, setMode] = themeModeAtom.use();

        return useMemo(
            () => this.getChocoStyle({ theme, muiTheme, mode, setMode }),
            [mode, theme, muiTheme],
        );
    }
    static getChocoStyle({
        theme,
        setMode,
        muiTheme,
        mode = theme.mode,
    }: {
        muiTheme?: MuiTheme;
        mode?: ModesKeyType;
        theme: ChocoThemeType;
        setMode?: React.Dispatch<React.SetStateAction<ModesKeyType>>;
    }): UseChocoThemeType {
        return {
            mode,
            root: theme.root,
            fonts: theme.fonts,
            breakpoint: theme.breakpoint,
            palette: Obj.mix<PalettesType<PaletteType>>(
                theme.modes.default,
                theme.modes[mode],
            ),
            method: {
                transitions: muiTheme?.transitions,
                setMode: (mode) => {
                    setMode?.(mode);
                    getThemeMode(mode);
                },
                spacing: (...factor) =>
                    factor
                        .map(
                            (f) =>
                                (typeof f === 'number'
                                    ? f * theme.root.size.padding
                                    : f) + (theme.root.unit.padding ?? ''),
                        )
                        .join(' '),
            },
        };
    }
}
