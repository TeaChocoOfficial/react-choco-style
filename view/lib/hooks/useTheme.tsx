//-Path: "react-choco-style/lib/src/hooks/useTheme.tsx"
import { useChocoHook } from './useChocoHook';
import { UseChocoThemeType } from '../types/theme';

export function useTheme(): UseChocoThemeType {
    const theme = useChocoHook().theme;
    return theme;
}
