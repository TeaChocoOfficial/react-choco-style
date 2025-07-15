//-Path: "react-choco-style/lib/src/config/ChocoProvider.tsx"
import React from 'react';
import { InitChoco } from './InitChoco';
import { CColor } from '../class/CColor';
import { DeepPartial } from '@teachoco-dev/cli';
import { BaseChocoThemeType } from '../types/theme';
import { newChocoColorType } from '../types/chocoColor';

export type CreateTheme = (options: {
    ChocoColor: CColor;
    CColor: typeof CColor;
    theme: BaseChocoThemeType;
    newChocoColor: newChocoColorType;
}) => DeepPartial<BaseChocoThemeType>;

export type ChocoProviderProps = {
    debug?: boolean;
    cssBase?: boolean;
    children?: React.ReactNode;
    createTheme?: CreateTheme;
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
