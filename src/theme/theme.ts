//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/theme/theme.ts"
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
    mode: getThemeMode() ?? "dark",
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
        v: 0,
        h: 600,
        t: 860,
        l: 1024,
        d: 1248,
    },
    styleSheets: ({ theme }) => {
        const size = 8;
        return `
            body {
                top: 0;
                left: 0;
                width: 100dvw;
                height: 100dvh;
                position: fixed;
                color: ${theme.palette.text.primary};
                background-color: ${theme.palette.background.body};
            }
            #root {
                width: 100%;
                height: 100%;
                overflow-y: auto;
            }
            a {
                text-decoration: none;
            }
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            *::-webkit-scrollbar {
                z-index: 10000;
                width: ${size}px;
                height: ${size}px;
            }
            *::-webkit-scrollbar-track {
                background-color: ${theme.palette.primary.textDisabled}66;
                border: ${size / 10}px solid ${theme.palette.primary.main};
            }
            *::-webkit-scrollbar-thumb {
                transition: 0.3s;
                background-color: ${theme.palette.primary.light}99;
            }
            *::-webkit-scrollbar-track:hover {
                border-radius: ${size / 2}px;
                background-color: ${theme.palette.primary.text};
                border: ${size / 10}px solid ${theme.palette.primary.light};
            }
            *::-webkit-scrollbar-thumb:hover {
                border-radius: ${size / 2}px;
                background-color: ${theme.palette.primary.light};
            }
        `;
    },
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

export const themeModeAtom = atom<ModesKeyType>({
    key: "theme mode",
    default: ChocoTheme.mode,
});
