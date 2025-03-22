//-Path: "react-choco-style/src/config/InitChoco.tsx"
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoThemeType } from '../types/theme';
import React, { useEffect, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ChocoTheme, themeAtom } from '../theme/theme';
import { createAtom } from '@teachoco-official/react-atom';
import { ThemeProvider, createTheme as createMuiTheme } from '@mui/material';

export const ChocoDebug = createAtom(false);

export function InitChoco({
    debug,
    children,
    createTheme,
}: {
    debug?: boolean;
    children?: React.ReactNode;
    createTheme?: (theme: ChocoThemeType) => Partial<ChocoThemeType>;
}) {
    const setDebug = ChocoDebug.set();
    const [theme, setTheme] = themeAtom.use();
    const chocoStyle = ChocoStyle.useChocoStyle();

    useEffect(() => {
        setDebug(debug ?? false);
    }, [debug]);

    useEffect(() => {
        if (createTheme !== undefined) {
            const theme = createTheme(ChocoTheme);
            setTheme({ ...ChocoTheme, ...theme });
        } else {
            setTheme(ChocoTheme);
        }
    }, [createTheme]);

    const MuiTheme = useMemo(() => {
        console.log('theme: ', theme);
        const styleOverride = theme.styleSheets({ theme });
        const styleOverrides = Object.entries(styleOverride).reduce(
            (acc, [componentName, styles]) => {
                acc[componentName] = chocoStyle(styles);
                return acc;
            },
            {},
        );
        console.log('styleOverrides: ', styleOverrides);
        const myTheme = { ...theme.modes.default, ...theme.modes[theme.mode] };
        console.log('my common: ', myTheme.common);
        return {
            components: { MuiCssBaseline: { styleOverrides } },
            palette: {
                mode: theme.mode,
                common: myTheme.common,
            },
            breakpoints: {
                keys: Object.keys(theme.breakpoint.size),
                values: theme.breakpoint.size,
            },
            shape: { borderRadius: 8 },
        };
    }, [theme, chocoStyle]);

    return (
        <ThemeProvider theme={createMuiTheme(MuiTheme)}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
