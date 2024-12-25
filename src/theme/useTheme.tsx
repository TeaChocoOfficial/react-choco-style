//-Path: "react-choco-style/src/theme/useTheme.tsx"
import { useMemo } from "react";
import { ChocoTheme, themeModeAtom } from "./theme";
import { createAtom } from "@teachoco-official/react-atom";
import { PaletteType, UseChocoThemeType } from "../types/theme";

export const themeAtom = createAtom(ChocoTheme);

export default function useTheme(): UseChocoThemeType {
    const theme = themeAtom.get();
    const [mode, setMode] = themeModeAtom.use();

    return useMemo(() => {
        const useChocoTheme: UseChocoThemeType = {
            mode: mode,
            root: theme.root,
            fonts: theme.fonts,
            breakpoint: theme.breakpoint,
            styleSheets: theme.styleSheets,
            joinNames: theme.joinNames,
            palette: {
                ...theme.modes.default,
                ...theme.modes[mode],
            } as PaletteType,
            method: {
                setMode: (mode) => setMode(mode),
            },
        };

        return useChocoTheme;
    }, [mode, theme]);
}
