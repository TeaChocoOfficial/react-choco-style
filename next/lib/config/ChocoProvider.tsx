//-Path: "react-choco-style/lib/src/config/ChocoProvider.tsx"
import React from 'react';
import { InitChoco } from './InitChoco';
import { CColor } from '../class/theme/CColor';
import { DeepPartial } from '@teachoco-dev/cli';
import { ChocoShade } from '../class/theme/ChocoShade';
import { BaseChocoThemeType } from '../types/theme';

export type CreateTheme = (options: {
    ChocoColor: CColor;
    CColor: typeof CColor;
    theme: BaseChocoThemeType;
    ChocoShade: typeof ChocoShade;
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
