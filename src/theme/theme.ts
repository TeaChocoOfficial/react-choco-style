//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/theme/theme.ts"
import { atom } from "recoil";
import { ChocoThemeType, ModesKeyType } from "../types/theme";

export const ChocoTheme: ChocoThemeType = {
    fonts: {
        family: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        weight: 400,
    },
    breakpoint: {
        m: 0,
        t: 860,
        l: 1024,
        d: 1248,
    },
    mode: "dark",
    modes: {
        default: {
            secondary: {
                main: "#0077FF",
                dark: "#004CB3",
                light: "#66BFFF",
                text: "#FFFFFF",
                disabled: "#002A91",
                textDisabled: "#BDBDBD",
            },
        },
        light: {
            primary: {
                main: "#393939",
                dark: "#191919",
                light: "#595959",
                text: "#ffffff",
                disabled: "#0e0e0e",
            },
            background: {
                body: "#ffffff",
                paper: "#eeeeee",
                default: "#ffffff",
            },
        },
        dark: {
            primary: {
                main: "#d6d6d6",
                dark: "#b6b6b6",
                light: "#f1f1f1",
                text: "#000000",
                disabled: "#a4a4a4",
                textDisabled: "#1a1a1a",
            },
            background: {
                body: "#000000",
                paper: "#222222",
                default: "#121212",
            },
        },
    },
};

export const themeModeAtom = atom<ModesKeyType>({
    key: "theme mode",
    default: ChocoTheme.mode,
});
