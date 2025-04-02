//-Path: "react-choco-style/src/config/InitChoco.tsx"
import {
    ThemeOptions,
    ThemeProvider,
    createTheme as createMuiTheme,
} from '@mui/material';
import { Obj } from '../custom/obj';
import { ChocoDebug } from '../data/debug';
import { useEffect, useMemo } from 'react';
import { GlobalCss } from '../data/globalCss';
import CssBaseline from '@mui/material/CssBaseline';
import { ChocoProviderProps } from './ChocoProvider';
import { useChocoStyle } from '../hook/ChocoResponse';
import { ChocoTheme, themeAtom } from '../theme/theme';
import { StyledType, StyleTypes } from '../types/choco';
import { CGlobalStyles } from '../components/CGlobalStyles';

export function InitChoco({
    debug,
    cssBase,
    children,
    createTheme,
}: ChocoProviderProps) {
    const globalCss = GlobalCss.get();
    const setDebug = ChocoDebug.set();
    const [theme, setTheme] = themeAtom.use();
    const chocoStyle = useChocoStyle<StyledType>();

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
        const styleOverride = theme.styleSheets(theme);
        const styleOverrides = Object.entries(styleOverride).reduce<
            Record<string, StyledType>
        >((acc, [componentName, styles]) => {
            acc[componentName] = chocoStyle(styles as StyleTypes);
            return acc;
        }, {});
        const myTheme = { ...theme.modes.default, ...theme.modes[theme.mode] };
        return {
            components: { MuiCssBaseline: { styleOverrides } },
            palette: {
                mode: theme.mode,
                info: myTheme.info,
                text: myTheme.text,
                error: myTheme.error,
                common: myTheme.common,
                success: myTheme.success,
                warning: myTheme.warning,
                primary: myTheme.primary,
                secondary: myTheme.secondary,
                background: myTheme.background,
            },
            breakpoints: {
                keys: Obj.keys(theme.breakpoint.size),
                values: theme.breakpoint.size,
            },
            shape: { borderRadius: theme.root.size.border },
        } as ThemeOptions;
    }, [theme, chocoStyle]);

    useEffect(() => {
        console.log(globalCss, globalCss.entries());
    }, [globalCss]);

    return (
        <ThemeProvider theme={createMuiTheme(MuiTheme)}>
            {cssBase && <CssBaseline />}
            {globalCss.entries().map(([key, css]) => (
                <CGlobalStyles key={key} css={css} />
            ))}
            {children}
        </ThemeProvider>
    );
}
