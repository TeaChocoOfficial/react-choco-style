//-Path: "react-choco-style/lib/src/config/InitChoco.tsx"
import {
    PaletteColor,
    ThemeOptions,
    ThemeProvider,
    createTheme as createMuiTheme,
} from '@mui/material';
import Debug from './debug';
import { Obj } from '@teachoco-dev/cli';
import { CColor } from '../class/CColor';
import { ColorHex } from '../types/color';
import { useEffect, useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';
import { GlobalCss } from '../data/globalCss';
import { DefChocoTheme } from '../theme/theme';
import { ChocoShade } from '../class/ChocoShade';
import { BaseThemeAtom, Temp } from '../temp/temp';
import CssBaseline from '@mui/material/CssBaseline';
import { BaseChocoThemeType } from '../types/theme';
import { useChocoHook } from '../hooks/useChocoHook';
import { OptionPropsType } from '../types/chocoHook';
import { ChocoProviderProps } from './ChocoProvider';
import { CssType, StyledType } from '../types/choco';
import { ChocoResponse } from '../class/ChocoResponse';
import { SetupUseInnerWidth } from './SetupUseInnerWidth';
import { CGlobalStyles } from '../components/CGlobalStyles';

export function InitChoco({
    debug = false,
    cssBase,
    children,
    createTheme,
}: ChocoProviderProps) {
    const theme = useTheme();
    const chocoHook = useChocoHook();
    const globalCss = GlobalCss.get();
    const chocoStyle = new ChocoResponse();
    const [baseTheme, setBaseTheme] = BaseThemeAtom.use();

    useEffect(() => {
        Debug.setDebug(debug);
    }, [debug]);

    useEffect(() => {
        if (createTheme !== undefined) {
            const theme = createTheme({
                CColor,
                ChocoShade,
                theme: DefChocoTheme,
                ChocoColor: new CColor(),
            });
            const newTheme = Obj.mix<BaseChocoThemeType>(DefChocoTheme, theme);
            Temp.baseTheme = newTheme;
            setBaseTheme(newTheme);
        } else {
            Temp.baseTheme = DefChocoTheme;
            setBaseTheme(DefChocoTheme);
        }
    }, [createTheme, setBaseTheme]);

    const styleOverrides: CssType = useMemo(() => {
        const styleOverride = baseTheme.styleSheets(
            chocoHook as OptionPropsType,
        );
        return Obj.reduce<CssType>(
            styleOverride,
            (acc, componentName, styles) => ({
                ...acc,
                [componentName]: chocoStyle.chocoStyle<StyledType>(styles),
            }),
            {},
        );
    }, [baseTheme, chocoHook]);

    const MuiTheme = useMemo(() => {
        const pallette = theme.palette;
        const paletteColor = (colors?: ChocoShade): PaletteColor => {
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
        const paletteColors = (colors: { [key: string]: ChocoShade }) =>
            Obj.keys(colors).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: paletteColor(colors[key]).main,
                }),
                {},
            ) as { [key: string]: ColorHex };

        return {
            components: { MuiCssBaseline: { styleOverrides } },
            breakpoints: {
                keys: Obj.keys(theme.breakpoint.size),
                values: theme.breakpoint.size,
            },
            palette: {
                mode: theme.mode,
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
        } as ThemeOptions;
    }, [theme, styleOverrides]);

    return (
        <ThemeProvider theme={createMuiTheme(MuiTheme)}>
            <SetupUseInnerWidth />
            {cssBase && <CssBaseline />}
            {[...globalCss.entries()].map(([key, css]) => (
                <CGlobalStyles key={key} css={css} />
            ))}
            {children}
        </ThemeProvider>
    );
}
