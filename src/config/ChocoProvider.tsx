//-Path: "react-choco-style/src/config/ChocoProvider.tsx"
import React from 'react';
import { InitChoco } from './InitChoco';
import { ChocoColor } from '../theme/color';
import { ChocoThemeType } from '../types/theme';
import { DeepPartial } from '../types/chocoHook';
import { newChocoColorType } from '../types/chocoColor';

export type ChocoProviderProps = {
    debug?: boolean;
    cssBase?: boolean;
    children?: React.ReactNode;
    createTheme?: ({
        theme,
        ChocoColor,
        newChocoColor,
    }: {
        theme: ChocoThemeType;
        ChocoColor: ChocoColor;
        newChocoColor: newChocoColorType;
    }) => DeepPartial<ChocoThemeType>;
};

export function ChocoProvider({
    debug,
    cssBase,
    children,
    createTheme,
}: ChocoProviderProps) {
    return (
        <InitChoco debug={debug} cssBase={cssBase} createTheme={createTheme}>
            {children}
        </InitChoco>
    );
}
