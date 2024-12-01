//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/custom/StyleSheets.tsx"
import { useEffect } from "react";
import { useTheme } from "../../theme/useTheme";

export default function StyleSheets() {
    const { palette } = useTheme();

    const createScrollbarStyles = () => {
        const size = 10;
        const styles = `
            body {
                top: 0;
                left: 0;
                width: 100dvw;
                height: 100dvh;
                position: fixed;
                color: ${palette.text.primary};
                background-color: ${palette.background.body};
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
                background-color: ${palette.primary.textDisabled}66;
                border: ${size / 10}px solid ${palette.primary.main};
            }
            *::-webkit-scrollbar-thumb {
                transition: 0.3s;
                background-color: ${palette.primary.light}99;
            }
            *::-webkit-scrollbar-track:hover {
                border-radius: ${size / 2}px;
                background-color: ${palette.primary.text};
                border: ${size / 10}px solid ${palette.primary.light};
            }
            *::-webkit-scrollbar-thumb:hover {
                border-radius: ${size / 2}px;
                background-color: ${palette.primary.light};
            }
        `;

        return styles.replace(/\s+/g, " ").trim();
    };

    // ใช้งาน
    const applyScrollbarStyles = () => {
        try {
            const styleSheet = document.styleSheets[0];
            const cssRules = createScrollbarStyles();
            cssRules
                .split("}")
                .filter((rule) => rule.trim().length > 0)
                .forEach((rule) => {
                    styleSheet.insertRule(
                        rule + "}",
                        styleSheet.cssRules.length,
                    );
                });
        } catch (error) {
            console.error("Error applying scrollbar styles:", error);
        }
    };

    useEffect(() => {
        applyScrollbarStyles();
    }, []);

    return <div></div>;
}
