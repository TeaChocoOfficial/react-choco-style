//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/theme/theme.ts"
import { atom } from "recoil";
import { ChocoThemeType, ModesKeyType } from "../types/theme";

export const getThemeMode = () => {
    if (localStorage && window) {
        let themeMode = localStorage.getItem("theme mode");
        if (themeMode === null) {
            const { matches } = window.matchMedia(
                "(prefers-color-scheme: dark)",
            );
            themeMode = matches ? "dark" : "light";
            localStorage.setItem("theme mode", themeMode);
        }
        return themeMode as ModesKeyType;
    }
};

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
    mode: getThemeMode() ?? "dark",
    modes: {
        default: {
            common: {
                black: { main: "#000000" },
                white: { main: "#ffffff" },
                purple: { main: "#bb66ff" },
                orange: { main: "#ff7700" },
            },
            secondary: {
                main: "#0077FF",
                dark: "#004CB3",
                light: "#66BFFF",
                text: "#FFFFFF",
                disabled: "#002A91",
                textDisabled: "#BDBDBD",
            },
            error: {
                main: "#ff0000",
                dark: "#cc0000",
                light: "#ff8888",
                text: "#ffffff",
                disabled: "#990000",
                textDisabled: "#ffcccc",
            },
            warning: {
                main: "#ffcc00",
                dark: "#cc9900",
                light: "#ffff88",
                text: "#000000",
                disabled: "#996600",
                textDisabled: "#ffffcc",
            },
            info: {
                main: "#0099ff",
                dark: "#0066cc",
                light: "#88ccff",
                text: "#000000",
                disabled: "#004c99",
                textDisabled: "#ccccff",
            },
            success: {
                main: "#00cc00",
                dark: "#009900",
                light: "#88ff88",
                text: "#000000",
                disabled: "#006600",
                textDisabled: "#cccccc",
            },
            shadow: {
                main: "#0000001a",
                light: "#ffffff99",
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
                paper: "#dddddd",
                default: "#ededed",
            },
            text: {
                primary: "#000000",
                secondary: "#222222",
                disabled: "#00000099",
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
            text: {
                primary: "#ffffff",
                secondary: "#dddddd",
                disabled: "#ffffff99",
            },
        },
    },
};

export const themeModeAtom = atom<ModesKeyType>({
    key: "theme mode",
    default: ChocoTheme.mode,
});
