//-Path: "react-choco-style/src/theme/useTheme.tsx"
import { useMemo } from "react";
import { ChocoTheme, themeModeAtom } from "./theme";
import { PaletteType, UseChocoThemeType } from "../types/theme";

export default function useTheme(): UseChocoThemeType {
    const [mode, setMode] = themeModeAtom.use();

    return useMemo(() => {
        return {
            mode: mode,
            root: ChocoTheme.root,
            fonts: ChocoTheme.fonts,
            breakpoint: ChocoTheme.breakpoint,
            styleSheets: ChocoTheme.styleSheets,
            joinNames: ChocoTheme.joinNames,
            palette: {
                ...ChocoTheme.modes.default,
                ...ChocoTheme.modes[mode],
            } as PaletteType,
            method: {
                setMode: (mode) => setMode(mode),
            },
        } as UseChocoThemeType;
    }, [mode]);
}
