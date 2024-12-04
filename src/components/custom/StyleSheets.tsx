//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/custom/StyleSheets.tsx"
import { v4 } from "uuid";
import {
    ChocoStylesType,
    ChocoStyleTypes,
    ChocoStylesKeyType,
} from "../../types/ChocoStyle";
import { useMemo } from "react";
import useTheme from "../../theme/useTheme";
import ChocoStyleToStyle from "../../hook/ChocoStyleToStyle";

export function SetUpStyleSheets() {
    const theme = useTheme();

    return useMemo(() => {
        return applyStyleSheet(theme.styleSheets({ theme }));
    }, []);
}

export function convertToStyleSheet(
    tag: string,
    cssProperties: React.CSSProperties,
): string {
    // แปลง camelCase เป็น kebab-case
    const convertToKebabCase = (str: string) => {
        return str
            .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
            .toLowerCase();
    };

    // สร้าง CSS string
    const cssString = Object.entries(cssProperties)
        .map(([key, value]) => {
            const cssKey = convertToKebabCase(key);
            return `${cssKey}: ${value};`;
        })
        .join("\n    ");

    return `${tag} {
    ${cssString}
}`;
}

export function applyStyleSheet(styles: string) {
    try {
        const styleSheet = document.styleSheets[0];

        const cssRules = styles.replace(/\s+/g, " ").trim();
        cssRules
            .split("}")
            .filter((rule) => rule.trim().length > 0)
            .forEach((rule) => {
                styleSheet.insertRule(rule + "}", styleSheet.cssRules.length);
            });
    } catch (error) {
        console.error("Error applying styles:", error);
    }
}

export type ChocoStyleSheetsType = <
    ClassName extends `ChocoStyleSheet${string}`,
>(
    cs: ChocoStylesType,
) => ClassName;

export default function ChocoStyleSheets<
    Return extends ChocoStyle extends undefined
        ? ChocoStyleSheetsType
        : `ChocoStyleSheet${string}`,
    ChocoStyle extends ChocoStylesType | undefined = undefined,
>(
    chocoStyle?: ChocoStyle,
): ChocoStyle extends undefined
    ? ChocoStyleSheetsType
    : `ChocoStyleSheet${string}` {
    const chocoStyleToStyle = ChocoStyleToStyle();
    const chocoStyleSheets: ChocoStyleSheetsType = <
        ClassName extends `ChocoStyleSheet${string}`,
    >(
        cs: ChocoStylesType,
    ): ClassName => {
        const className = `ChocoStyleSheet${v4()}` as ClassName;
        const keyCs = Object.keys(cs) as ChocoStylesKeyType[];
        const andChocoStyles: Record<string, ChocoStyleTypes> = {};
        const css = keyCs.reduce<ChocoStyleTypes>((acc, key) => {
            const value = cs[key];
            const cssKey = key as keyof ChocoStyleTypes;
            if (key.startsWith("&")) {
                andChocoStyles[` ${key.slice(1)}`] = value as ChocoStyleTypes;
            } else if (key.startsWith(":")) {
                andChocoStyles[`:${key.slice(1)}`] = value as ChocoStyleTypes;
            } else {
                acc[cssKey] =
                    value as ChocoStyleTypes[keyof ChocoStyleTypes[typeof cssKey]];
            }
            return acc;
        }, {});
        const style = chocoStyleToStyle(css);
        const keyStyles = Object.keys(andChocoStyles);
        const styles = keyStyles.reduce<Record<string, React.CSSProperties>>(
            (acc, key) => {
                const value = andChocoStyles[key];
                acc[key] = chocoStyleToStyle(value);
                return acc;
            },
            {},
        );
        const stylesheet = convertToStyleSheet(`.${className}`, style);
        const stylesheets = keyStyles.map((key) => {
            const value = styles[key];
            const tag = `.${className}${key}`;
            const stylesheet = convertToStyleSheet(tag, value);
            return stylesheet;
        });
        applyStyleSheet(stylesheet);
        stylesheets.forEach((stylesheet) => applyStyleSheet(stylesheet));
        return className;
    };
    if (chocoStyle) {
        return chocoStyleSheets(chocoStyle) as Return;
    }
    return chocoStyleSheets as Return;
}
