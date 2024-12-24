//-Path: "react-choco-style/src/theme/theme.ts"
import { ColorsType } from "../types/color";
import { StyleTypes } from "../types/ChocoStyle";
import { createAtom } from "@teachoco-official/react-atom";
import { ChocoThemeType, ModesKeyType } from "../types/theme";
import { CustomStylesType } from "../components/custom/CreateStyled";

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
    mode: getThemeMode() ?? "dark",
    root: {
        zIndex: {
            backdrop: 10000,
        },
    },
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
        weight: {
            regular: 400,
            medium: 500,
            bold: 700,
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
    styleSheets: (({ theme }) => {
        const size = 8;
        const styles: StyleTypes = {
            "&*": {
                m: 0,
                p: 0,
                boxSizing: "border-box",
            },
            "&body": {
                t: 0,
                l: 0,
                pos: "f",
                w: "100dvw",
                h: "100dvh",
                color: theme.palette.text.primary,
                bgClr: theme.palette.background.body,
            },
            "&#root": {
                ofy: "a",
                w: "100%",
                h: "100%",
            },
            "&a": {
                textDecoration: "none",
            },
            "&*::-webkit-scrollbar": {
                z: 10000,
                w: size,
                h: size,
            },
            "&*::-webkit-scrollbar-track": {
                bgClr: `${theme.palette.primary.textDisabled}66` as ColorsType,
                borders: { size: size / 10, color: theme.palette.primary.main },
            },
            "&*::-webkit-scrollbar-thumb": {
                trans: 0.3,
                bgClr: `${theme.palette.primary.light}99` as ColorsType,
            },
            "&*::-webkit-scrollbar-track:hover": {
                borR: size / 2,
                bgClr: theme.palette.primary.text,
                borders: {
                    size: size / 10,
                    color: theme.palette.primary.light,
                },
            },
            "&*::-webkit-scrollbar-thumb:hover": {
                borR: size / 2,
                bgClr: theme.palette.primary.light,
            },
        };
        return styles as StyleTypes;
    }) as CustomStylesType,
    joinNames: (...names: (string | undefined)[]) => names.join(" "),
    modes: {
        default: {
            common: {
                black: { main: "#000000" },
                white: { main: "#ffffff" },
                purple: { main: "#bb66ff" },
                orange: { main: "#ff7700" },
            },
            secondary: {
                main: "#cc7733",
                dark: "#995522",
                light: "#ffd1b1",
                text: "#FFFFFF",
                disabled: "#662200",
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
                main: "#ffaa00",
                dark: "#cc7700",
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
                disabled: "#004499",
                textDisabled: "#aaddff",
            },
            success: {
                main: "#33ee33",
                dark: "#338833",
                light: "#88ff88",
                text: "#000000",
                disabled: "#006600",
                textDisabled: "#ccffcc",
            },
            shadow: {
                main: "#0000001a",
                dark: "#00000066",
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

export const themeModeAtom = createAtom<ModesKeyType>(ChocoTheme.mode);
