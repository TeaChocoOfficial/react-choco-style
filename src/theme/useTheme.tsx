//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/theme/useTheme.tsx"
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { ChocoTheme, themeModeAtom } from "./theme";
import { ModesKeyType, PaletteType, UseChocoThemeType } from "../types/theme";

export function useTheme(): UseChocoThemeType {
    const [mode, setMode] = useRecoilState<ModesKeyType>(themeModeAtom);
    const [theme, setTheme] = useState<UseChocoThemeType>(updateTheme());

    function updateTheme(): UseChocoThemeType {
        return {
            fonts: ChocoTheme.fonts,
            breakpoint: ChocoTheme.breakpoint,
            mode: mode,
            palette: {
                ...ChocoTheme.modes.default,
                ...ChocoTheme.modes[mode],
            } as PaletteType,
            method: {
                setMode: (mode) => setMode(mode),
            },
        };
    }

    useEffect(() => {
        setTheme(updateTheme());
    }, [mode]);

    return theme;
}
