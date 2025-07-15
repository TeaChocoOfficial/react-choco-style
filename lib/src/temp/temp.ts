//-Path: "react-choco-style/lib/src/temp/temp.ts"
import {
    ModesKeyType,
    UseChocoThemeType,
    BaseChocoThemeType,
} from '../types/theme';
import { DefChocoTheme } from '../theme/theme';
import { createAtom } from '@teachoco-official/react-atom';

type TempType = {
    debug: boolean;
    useTheme?: UseChocoThemeType;
    baseTheme: BaseChocoThemeType;
};

type BaseThemePayload = {
    setMode: ModesKeyType;
};

export const Temp: TempType = {
    debug: false,
    baseTheme: DefChocoTheme,
};

export const BaseThemeAtom = createAtom<BaseChocoThemeType, BaseThemePayload>(
    DefChocoTheme,
    {
        actions: {
            setMode(state, payload) {
                state.mode = payload;
                return state;
            },
        },
    },
);
export const UseThemeAtom = createAtom<UseChocoThemeType | undefined>(
    undefined,
);
