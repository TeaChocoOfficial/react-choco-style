//-Path: "react-choco-style/lib/src/class/MuiStyle.tsx"
import { Obj } from '@teachoco-dev/cli';
import { ChocoStyle } from './ChocoStyle';
import { PaletteColor, ThemeOptions } from '@mui/material';
import { ColorHex, ShadeColors } from '../types/chocoColor';

export class MuiStyle {
    get() {
        const pallette = ChocoStyle.getChocoStyle({
            theme: ChocoStyle.theme,
        }).palette;
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
    }
}
