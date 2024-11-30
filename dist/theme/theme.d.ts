import { ChocoThemeType, ModesKeyType } from "../types/theme";
export declare const getThemeMode: () => ModesKeyType | undefined;
export declare const ChocoTheme: ChocoThemeType;
export declare const themeModeAtom: import("recoil").RecoilState<ModesKeyType>;
