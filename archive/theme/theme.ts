//-Path: "react-choco-style/lib/src/theme/theme.ts"
import {
    ModesKeyType,
    ChocoThemeType,
    UseChocoThemeType,
} from '../types/theme';
import { ChocoColor } from './color';
import { StyleTypes } from '../types/choco';
import { ChocoStyle } from '../class/ChocoStyle';
import { createAtom } from '@teachoco-official/react-atom';

export const getThemeMode = (mode?: ModesKeyType) => {
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
};

export const ChocoTheme = (): ChocoThemeType => ({
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
            borR: 1,
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
                black: ChocoColor.shades(0x000000),
                white: ChocoColor.shades(0xffffff),
                purple: ChocoColor.shades(0xbb66ff),
                orange: ChocoColor.shades(0xff7700),
            },
            main: {
                secondary: ChocoColor.shades(0xcc7733),
                info: ChocoColor.shades(0x0099ff),
                error: ChocoColor.shades(0xff0000),
                warning: ChocoColor.shades(0xffaa00),
                success: ChocoColor.shades(0x33ee33),
            },
            text: {
                secondary: ChocoColor.shades(0xffffff),
                error: ChocoColor.shades(0xffffff),
            },
        },
        light: {
            common: {
                body: ChocoColor.shades(0xededed, true),
            },
            main: {
                inherit: ChocoColor.shades(0x000000),
                primary: ChocoColor.shades(0xd6d6d6),
                disabled: ChocoColor.shades(0xa3a3a3),
            },
            text: {
                inherit: ChocoColor.shades(0xffffff),
                primary: ChocoColor.shades(0x000000),
                disabled: ChocoColor.shades(0xcccccc),
                warning: ChocoColor.shades(0xffffff, true),
                info: ChocoColor.shades(0xffffff, true),
                success: ChocoColor.shades(0xffffff, true),
            },
        },
        dark: {
            common: {
                body: ChocoColor.shades(0x121212),
            },
            main: {
                inherit: ChocoColor.shades(0xffffff, true),
                primary: ChocoColor.shades(0x393939, true),
                disabled: ChocoColor.shades(0x060606, true),
            },
            text: {
                inherit: ChocoColor.shades(0x000000, true),
                primary: ChocoColor.shades(0xffffff, true),
                disabled: ChocoColor.shades(0xcccccc, true),
                warning: ChocoColor.shades(0x000000),
                info: ChocoColor.shades(0x000000),
                success: ChocoColor.shades(0x000000),
            },
        },
    },
    styleSheets: (theme: UseChocoThemeType) => {
        const palette = theme.palette;
        const border = theme.root.response.border * theme.root.size.border;
        const padding = theme.root.response.padding * theme.root.size.padding;

        return {
            '&*': {
                m: 0,
                p: 0,
                boxSizing: 'border-box',
            },
            '&body': {
                t: 0,
                l: 0,
                pos: 'f',
                w: '100dvw',
                h: '100dvh',
                clr: palette.text.primary[5],
                bgClr: palette.common.body[5],
            },
            '&#root': {
                ofy: 'a',
                ofx: 'h',
                wh: '100%',
            },
            '&a': {
                textDecoration: 'none',
            },
            '&*::-webkit-scrollbar': {
                wh: -padding,
            },
            '&*::-webkit-scrollbar-track': {
                bgClr: palette.main.primary[8].alpha(0.3),
                borders: {
                    width: -(border / 4),
                    color: palette.main.primary[2],
                },
            },
            '&*::-webkit-scrollbar-thumb': {
                bgClr: palette.main.secondary[5].alpha(0.6),
            },
            '&*::-webkit-scrollbar-track:hover': {
                bgClr: palette.main.primary[8],
                borders: {
                    width: -(border / 4),
                    color: palette.main.primary[2],
                },
            },
            '&*::-webkit-scrollbar-thumb:hover': {
                borR: -padding,
                bgClr: palette.main.secondary[5],
            },
        } as StyleTypes;
    },
});

export const chocoThemeAtom = createAtom<UseChocoThemeType>(
    ChocoStyle.getChocoStyle({ theme: ChocoStyle.theme }),
);
export const themeModeAtom = createAtom<ModesKeyType>(ChocoStyle.theme.mode);
export const themeAtom = createAtom(ChocoStyle.theme);

// console.log(ChocoTheme());

// secondary:new ChocoColor().shades(0xcc7733), {
//     main: '#cc7733',
//     dark: '#995522',
//     light: '#ffd1b1',
//     text: '#FFFFFF',
//     disabled: '#662200',
//     textDisabled: '#BDBDBD',
// },
// error: new ChocoColor().shades(),{
//     main: '#ff0000',
//     dark: '#cc0000',
//     light: '#ff8888',
//     text: '#ffffff',
//     disabled: '#990000',
//     textDisabled: '#ffcccc',
// },
// warning:new ChocoColor().shades(), {
//     main: '#ffaa00',
//     dark: '#cc7700',
//     light: '#ffff88',
//     text: '#000000',
//     disabled: '#996600',
//     textDisabled: '#ffffcc',
// },
// info: new ChocoColor().shades(),{
//     main: '#0099ff',
//     dark: '#0066cc',
//     light: '#88ccff',
//     text: '#000000',
//     disabled: '#004499',
//     textDisabled: '#aaddff',
// },
// success:new ChocoColor().shades(), {
//     main: '#33ee33',
//     dark: '#338833',
//     light: '#88ff88',
//     text: '#000000',
//     disabled: '#006600',
//     textDisabled: '#ccffcc',
// },
// shadow: new ChocoColor().shades(),{
//     main: '#0000001a',
//     dark: '#00000066',
//     light: '#ffffff99',
// },
// },
// light: {
// primary: new ChocoColor().shades(),{
//     main: '#393939',
//     dark: '#191919',
//     light: '#595959',
//     text: '#ffffff',
//     disabled: '#0e0e0e',
// },
// background: {
//     body: '#ededed',
//     paper: '#dddddd',
//     default: '#ffffff',
// },
// text: {
//     primary: '#000000',
//     secondary: '#222222',
//     disabled: '#00000099',
// },
// },
// dark: {
// primary: {
//     main: '#d6d6d6',
//     dark: '#b6b6b6',
//     light: '#f1f1f1',
//     text: '#000000',
//     disabled: '#a4a4a4',
//     textDisabled: '#1a1a1a',
// },
// background: {
//     body: new ChocoColor('#121212').shades(),
//     paper: new ChocoColor('#222222').shades(),
//     default: new ChocoColor('#000000').shades(),
// },
// text: {
//     primary: new ChocoColor('#ffffff').shades(),
//     secondary: new ChocoColor('#dddddd').shades(),
//     disabled: new ChocoColor('#ffffff99').shades(),
// },
// },
