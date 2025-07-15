//-Path: "react-choco-style/lib/src/config/InitChoco.tsx"
import {
    PaletteColor,
    ThemeOptions,
    ThemeProvider,
    useTheme as useMuiTheme,
    createTheme as createMuiTheme,
} from '@mui/material';
import { Temp } from '../temp/temp';
import { Obj } from '@teachoco-dev/cli';
import { ChocoDebug } from '../data/debug';
import { useEffect, useMemo } from 'react';
import useInnerWidth from './useInnerWidth';
import { GlobalCss } from '../data/globalCss';
import { ChocoThemeType } from '../types/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ChocoProviderProps } from './ChocoProvider';
import { useChocoStyle } from '../hook/ChocoResponse';
import { getUseChocoStyle } from '../hook/ChocoStyle';
import { StyledType, StyleTypes } from '../types/choco';
import { ChocoColor, newChocoColor } from '../theme/color';
import { CGlobalStyles } from '../components/CGlobalStyles';
import { ColorHex, ShadeColors } from '../types/chocoColor';
import { ChocoTheme, themeAtom, themeModeAtom } from '../theme/theme';

export function InitChoco({
    debug,
    cssBase,
    children,
    createTheme,
}: ChocoProviderProps) {
    const muiTheme = useMuiTheme();
    const globalCss = GlobalCss.get();
    const setDebug = ChocoDebug.set();
    const innerWidth = useInnerWidth();
    const [theme, setTheme] = themeAtom.use();
    const [mode, setMode] = themeModeAtom.use();
    const chocoStyle = useChocoStyle<StyledType>();

    useEffect(() => {
        setDebug(debug ?? false);
    }, [debug]);

    useEffect(() => {
        if (createTheme !== undefined) {
            const theme = createTheme({
                newChocoColor,
                theme: ChocoTheme(),
                ChocoColor: new ChocoColor(),
            });
            const newTheme = Obj.mix<ChocoThemeType>(ChocoTheme(), theme);
            Temp.theme = newTheme;
            setTheme(newTheme);
        } else {
            Temp.theme = ChocoTheme();
            setTheme(ChocoTheme());
        }
    }, [createTheme]);

    const chocoTheme = useMemo(
        () => getUseChocoStyle({ mode, theme, muiTheme, setMode }),
        [mode, theme, muiTheme, setMode],
    );

    const styleOverrides = useMemo(() => {
        const styleOverride = theme.styleSheets(chocoTheme);
        const styleOverrides = Obj.reduce<
            StyleTypes,
            Record<string, StyledType>
        >(
            styleOverride,
            (acc, componentName, styles) => ({
                ...acc,
                [componentName]: chocoStyle(styles as StyleTypes, innerWidth),
            }),
            {},
        );
        // console.log(styleOverride, styleOverrides);
        return styleOverrides;
    }, [theme, innerWidth, chocoStyle]);

    const MuiTheme = useMemo(() => {
        const pallette = chocoTheme.palette;
        const paletteColor = (colors?: ShadeColors): PaletteColor => {
            if (colors) {
                return {
                    dark: colors[7].toString(),
                    main: colors[5].toString(),
                    light: colors[7].toString(),
                    contrastText: colors[10].toString(),
                };
            }
            throw new Error('No colors provided');
        };
        const paletteColors = (colors: { [key: string]: ShadeColors }) =>
            Obj.keys(colors).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: paletteColor(colors[key]).main,
                }),
                {},
            ) as {
                [key: string]: ColorHex;
            };

        return {
            components: { MuiCssBaseline: { styleOverrides } },
            breakpoints: {
                keys: Obj.keys(theme.breakpoint.size),
                values: theme.breakpoint.size,
            },
            palette: {
                mode,
                common: paletteColors(pallette.common),
                primary: paletteColor(pallette.main.primary),
                secondary: paletteColor(pallette.main.secondary),
                error: paletteColor(pallette.main.error),
                warning: paletteColor(pallette.main.warning),
                info: paletteColor(pallette.main.info),
                success: paletteColor(pallette.main.success),
                text: paletteColors(pallette.text),
                background: {
                    paper: pallette.main.primary[2].hex(),
                    default: pallette.main.inherit[5].hex(),
                },
            },
            shape: {
                borderRadius: theme.root.size.borR * theme.root.response.borR,
            },
        } as ThemeOptions;
    }, [mode, theme, chocoTheme, styleOverrides]);

    return (
        <ThemeProvider theme={createMuiTheme(MuiTheme)}>
            {cssBase && <CssBaseline />}
            {[...globalCss.entries()].map(([key, css]) => (
                <CGlobalStyles key={key} css={css} />
            ))}
            {children}
        </ThemeProvider>
    );
}
