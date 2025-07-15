//-Path: "react-choco-style/lib/src/class/temp.ts"
import { ChocoTheme } from '../theme/theme';
import { ChocoThemeType } from '../types/theme';

type TempType = { 
    theme: ChocoThemeType 
};

export const Temp: TempType = {
    theme: ChocoTheme(),
};
