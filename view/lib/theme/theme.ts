//-Path: "react-choco-style/lib/src/theme/theme.ts"
import { CColor } from '../class/CColor';
import { CssType, StyleTypes } from '../types/choco';
import { OptionPropsType } from '../types/chocoHook';
import { BaseChocoThemeType, ModesKeyType } from '../types/theme';

export function getThemeMode(mode?: ModesKeyType): ModesKeyType | undefined {
    if (localStorage && window) {
        if (mode) localStorage.setItem('theme mode', mode);
        let themeMode = localStorage.getItem('theme mode');
        if (themeMode === null) {
            const { matches } = window.matchMedia(
                '(prefers-color-scheme: dark)',
            );
            themeMode = matches ? 'dark' : 'light';
            localStorage.setItem('theme mode', themeMode);
        }
        return themeMode as ModesKeyType;
    }
}

export const DefChocoTheme: BaseChocoThemeType = {
    mode: getThemeMode() ?? 'dark',
    root: {
        unit: {
            text: 'em',
            padding: 'px',
        },
        size: {
            box: 64,
            base: 16,
            text: 1 / 16,
            borR: 2,
            border: 2,
            padding: 4,
        },
        response: {
            box: 64,
            base: 1,
            text: 16,
            borR: 4,
            border: 2,
            padding: 16,
        },
    },
    fonts: {
        family: [
            'Arial',
            'Roboto',
            'sans-serif',
            '"Segoe UI"',
            '-apple-system',
            '"Helvetica Neue"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            'BlinkMacSystemFont',
            '"Apple Color Emoji"',
        ].join(','),
        weight: {
            bold: 700,
            medium: 500,
            regular: 400,
        },
    },
    breakpoint: {
        size: {
            v: 0,
            h: 600,
            t: 860,
            l: 1024,
            d: 1248,
        },
        format: {
            v: 50,
            h: 60,
            t: 80,
            l: 90,
            d: 100,
        },
    },
    modes: {
        default: {
            common: {
                black: CColor.shades(0x000000),
                white: CColor.shades(0xffffff),
                purple: CColor.shades(0xbb66ff),
                orange: CColor.shades(0xff7700),
            },
            main: {
                secondary: CColor.shades(0xcc7733),
                info: CColor.shades(0x0099ff),
                error: CColor.shades(0xff0000),
                warning: CColor.shades(0xffaa00),
                success: CColor.shades(0x33ee33),
            },
            text: {
                secondary: CColor.shades(0xffffff),
                error: CColor.shades(0xffffff),
            },
        },
        light: {
            common: {
                body: CColor.shades(0xededed, true),
            },
            main: {
                inherit: CColor.shades(0x000000),
                primary: CColor.shades(0xd6d6d6),
                disabled: CColor.shades(0xa3a3a3),
            },
            text: {
                inherit: CColor.shades(0xffffff),
                primary: CColor.shades(0x000000),
                disabled: CColor.shades(0xcccccc),
                warning: CColor.shades(0xffffff, true),
                info: CColor.shades(0xffffff, true),
                success: CColor.shades(0xffffff, true),
            },
        },
        dark: {
            common: {
                body: CColor.shades(0x121212),
            },
            main: {
                inherit: CColor.shades(0xffffff, true),
                primary: CColor.shades(0x393939, true),
                disabled: CColor.shades(0x060606, true),
            },
            text: {
                inherit: CColor.shades(0x000000, true),
                primary: CColor.shades(0xffffff, true),
                disabled: CColor.shades(0xcccccc, true),
                warning: CColor.shades(0x000000),
                info: CColor.shades(0x000000),
                success: CColor.shades(0x000000),
            },
        },
    },
    styleSheets: (option: OptionPropsType) => {
        const palette = option.theme.palette;
        const border =
            option.theme.root.response.border * option.theme.root.size.border;
        const padding =
            option.theme.root.response.padding * option.theme.root.size.padding;

        const css: CssType = {
            '*': {
                m: 0,
                p: 0,
                boxSizing: 'border-box',
            },
            'body': {
                t: 0,
                l: 0,
                pos: 'f',
                w: '100dvw',
                h: '100dvh',
                clr: palette.text.primary[5],
                bgClr: palette.common.body[5],
            },
            '#root': {
                ofy: 'a',
                ofx: 'h',
                wh: '100%',
            },
            'a': {
                textDecoration: 'none',
            },
            '*::-webkit-scrollbar': {
                wh: -padding,
            },
            '*::-webkit-scrollbar-track': {
                bgClr: palette.main.primary[8].alpha(0.3),
                borders: {
                    width: -(border / 4),
                    color: palette.main.primary[2],
                },
            },
            '*::-webkit-scrollbar-thumb': {
                bgClr: palette.main.secondary[5].alpha(0.6),
            },
            '*::-webkit-scrollbar-track:hover': {
                bgClr: palette.main.primary[8],
                borders: {
                    width: -(border / 4),
                    color: palette.main.primary[2],
                },
            },
            '*::-webkit-scrollbar-thumb:hover': {
                borR: -padding,
                bgClr: palette.main.secondary[5],
            },
        };
        return css;
    },
};
