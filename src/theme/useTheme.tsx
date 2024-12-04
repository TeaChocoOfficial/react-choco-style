//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/theme/useTheme.tsx"
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { ChocoTheme, themeModeAtom } from "./theme";
import { ModesKeyType, PaletteType, UseChocoThemeType } from "../types/theme";

export default function useTheme(): UseChocoThemeType {
    const [mode, setMode] = useRecoilState<ModesKeyType>(themeModeAtom);

    return useMemo(() => {
        return {
            mode: mode,
            fonts: ChocoTheme.fonts,
            breakpoint: ChocoTheme.breakpoint,
            styleSheets: ChocoTheme.styleSheets,
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
