//-Path: "react-choco-style/lib/src/theme/theme.ts"
import { CssType } from '../types/choco';
import { ChocoShade } from '../class/ChocoShade';
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
            box: 'px',
            base: 'px',
            text: 'em',
            borR: 'px',
            border: 'px',
            padding: 'px',
        },
        size: {
            box: 64,
            base: 16,
            text: 1 / 16,
            borR: 1 / 2,
            border: 2,
            padding: 4,
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
                black: new ChocoShade(0x000000),
                white: new ChocoShade(0xffffff),
                purple: new ChocoShade(0xbb66ff),
                orange: new ChocoShade(0xff7700),
            },
            main: {
                secondary: new ChocoShade(0xcc7733),
                info: new ChocoShade(0x0099ff),
                error: new ChocoShade(0xff0000),
                warning: new ChocoShade(0xffaa00),
                success: new ChocoShade(0x33ee33),
            },
            text: {
                secondary: new ChocoShade(0xffffff),
                error: new ChocoShade(0xffffff),
            },
        },
        light: {
            common: {
                body: new ChocoShade(0xededed, true),
            },
            main: {
                inherit: new ChocoShade(0x000000),
                primary: new ChocoShade(0xd6d6d6),
                disabled: new ChocoShade(0xa3a3a3),
            },
            text: {
                inherit: new ChocoShade(0xffffff),
                primary: new ChocoShade(0x000000),
                disabled: new ChocoShade(0xcccccc),
                warning: new ChocoShade(0xffffff, true),
                info: new ChocoShade(0xffffff, true),
                success: new ChocoShade(0xffffff, true),
            },
        },
        dark: {
            common: {
                body: new ChocoShade(0x121212),
            },
            main: {
                inherit: new ChocoShade(0xffffff, true),
                primary: new ChocoShade(0x393939, true),
                disabled: new ChocoShade(0x060606, true),
            },
            text: {
                inherit: new ChocoShade(0x000000, true),
                primary: new ChocoShade(0xffffff, true),
                disabled: new ChocoShade(0xcccccc, true),
                warning: new ChocoShade(0x000000),
                info: new ChocoShade(0x000000),
                success: new ChocoShade(0x000000),
            },
        },
    },
    styleSheets: (option: OptionPropsType) => {
        const { Size } = option;
        const palette = option.theme.palette;
        const { base, border } = option.theme.root.size;

        const css: CssType = {
            '*': {
                m: 0,
                p: 0,
                bxSz: 'border',
            },
            body: {
                t: 0,
                l: 0,
                pos: 'f',
                w: '100dvw',
                h: '100dvh',
                clr: palette.text.primary,
                bgClr: palette.common.body,
            },
            '#root': {
                ofy: 'a',
                ofx: 'h',
                wh: '100%',
            },
            a: {
                txtDr: null,
            },
            '*::-webkit-scrollbar': {
                wh: -base,
            },
            '*::-webkit-scrollbar-track': {
                bgClr: palette.main.primary[8].alpha(0.3),
                borders: {
                    width: -(border / 4),
                    color: palette.main.primary[2],
                },
            },
            '*::-webkit-scrollbar-thumb': {
                bgClr: palette.main.secondary.alpha(0.6),
            },
            '*::-webkit-scrollbar-track:hover': {
                bgClr: palette.main.primary[8],
                borders: {
                    width: -(border / 4),
                    color: palette.main.primary[2],
                },
            },
            '*::-webkit-scrollbar-thumb:hover': {
                borR: -base,
                bgClr: palette.main.secondary,
            },
        };
        return css;
    },
};
