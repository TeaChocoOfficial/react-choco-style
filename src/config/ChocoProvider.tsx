//-Path: "react-choco-style/src/config/ChocoProvider.tsx"
import React from 'react';
import { InitChoco } from './InitChoco';
import { ChocoThemeType } from '../types/theme';

export type ChocoProviderProps = {
    debug?: boolean;
    cssBase?: boolean;
    children?: React.ReactNode;
    createTheme?: (theme: ChocoThemeType) => Partial<ChocoThemeType>;
};

export function ChocoProvider({
    debug,
    cssBase,
    children,
    createTheme,
}: ChocoProviderProps) {
    return (
        <>
            <InitChoco
                debug={debug}
                cssBase={cssBase}
                createTheme={createTheme}
            >
                {children}
            </InitChoco>
        </>
    );
}
