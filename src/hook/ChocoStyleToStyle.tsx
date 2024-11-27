//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/hook/ChocoStyleToStyle.tsx"
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import {
    KeywordsChocoStyle,
    KeywordsChocoStyleDef,
} from "../components/data/reservedKeywords";
import { useTheme } from "../theme/useTheme";
import { ChocoStyleType } from "../types/ChocoStyle";
import { formatSize } from "../components/custom/size";
import { innerAtom } from "../components/layout/ChocoStart";
import { Size, SizeKey, Sizes, SizeValue } from "../types/Size";
import { removeReservedProps } from "../components/custom/Styled";

export default function ChocoStyleToStyle(
    cs: ChocoStyleType,
): React.CSSProperties {
    const theme = useTheme();
    const inner = useRecoilValue(innerAtom);
    const [css, setCss] = useState<React.CSSProperties>({});
    const [breakpoint, setBreakpoint] = useState<number>(getBreakpoint());

    function getBreakpoint(): number {
        const keys = Object.keys(theme.breakpoint) as SizeKey[];
        let breakpoint: number = 0;
        keys.map((key, index) => {
            const breakpoints = theme.breakpoint[key];
            const matche = inner.width > breakpoints;
            if (matche) {
                breakpoint = index;
            }
        });
        return breakpoint;
    }

    function sizeToCss(
        size: Sizes,
        time?: number,
        unit?: string,
    ): string | undefined {
        if (size) {
            if (typeof size === "string") {
                return size;
            } else if (typeof size === "number") {
                return `${size * (time ?? 1)}${unit ?? "px"}`;
            } else {
                const keys = Object.keys(theme.breakpoint) as SizeKey[];
                let currentSize: SizeValue | undefined;
                const sizes = keys.reduce<Size>((acc, key) => {
                    if (size[key]) {
                        currentSize = size[key];
                    }
                    acc[key] = currentSize;
                    return acc;
                }, {});
                const value = sizes[keys[breakpoint]];
                if (typeof value === "string") {
                    return value;
                } else if (typeof value === "number") {
                    return `${value * (time ?? 1)}${unit ?? "px"}`;
                }
            }
        }
    }

    function getChocoStyle(chocostyle: ChocoStyleType) {
        const timeBox = 4;
        const timeText = 1 / 16;
        const newCss: React.CSSProperties = removeReservedProps(
            [...KeywordsChocoStyleDef, ...KeywordsChocoStyle],
            { ...chocostyle },
        );

        //* Style
        //? background color background-color
        if (chocostyle.color !== undefined) {
            newCss.color = chocostyle.color;
        }
        if (chocostyle.bg !== undefined) {
            newCss.background = chocostyle.bg;
        }
        if (chocostyle.bgColor !== undefined) {
            switch (chocostyle.bgColor) {
                case null:
                    newCss.backgroundColor = "transparent";
                    break;
                default:
                    newCss.backgroundColor = chocostyle.bgColor;
                    break;
            }
        }

        //* Opacity
        if (chocostyle.op !== undefined) {
            newCss.opacity = chocostyle.op * 0.01;
        }

        //* Width and Height
        if (chocostyle.w !== undefined) {
            newCss.width = sizeToCss(chocostyle.w);
        }
        if (chocostyle.h !== undefined) {
            newCss.height = sizeToCss(chocostyle.h);
        }

        //* inset
        //? all top bottom left right left&right top&bottom
        if (chocostyle.i !== undefined) {
            newCss.inset = sizeToCss(chocostyle.i, timeBox);
        } else {
            if (chocostyle.x !== undefined) {
                newCss.left = sizeToCss(chocostyle.x, timeBox);
                newCss.right = sizeToCss(chocostyle.x, timeBox);
            } else {
                if (chocostyle.l !== undefined) {
                    newCss.left = sizeToCss(chocostyle.l, timeBox);
                }
                if (chocostyle.r !== undefined) {
                    newCss.right = sizeToCss(chocostyle.r, timeBox);
                }
            }
            if (chocostyle.y !== undefined) {
                newCss.top = sizeToCss(chocostyle.y, timeBox);
                newCss.bottom = sizeToCss(chocostyle.y, timeBox);
            } else {
                if (chocostyle.t !== undefined) {
                    newCss.top = sizeToCss(chocostyle.t, timeBox);
                }
                if (chocostyle.b !== undefined) {
                    newCss.bottom = sizeToCss(chocostyle.b, timeBox);
                }
            }
        }

        //* Padding
        //? all top bottom left right left&right top&bottom
        if (chocostyle.p !== undefined) {
            newCss.padding = sizeToCss(chocostyle.p, timeBox);
        } else {
            if (chocostyle.px !== undefined) {
                newCss.paddingLeft = sizeToCss(chocostyle.px, timeBox);
                newCss.paddingRight = sizeToCss(chocostyle.px, timeBox);
            } else {
                if (chocostyle.pl !== undefined) {
                    newCss.paddingLeft = sizeToCss(chocostyle.pl, timeBox);
                }
                if (chocostyle.pr !== undefined) {
                    newCss.paddingRight = sizeToCss(chocostyle.pr, timeBox);
                }
            }
            if (chocostyle.py !== undefined) {
                newCss.paddingTop = sizeToCss(chocostyle.py, timeBox);
                newCss.paddingBottom = sizeToCss(chocostyle.py, timeBox);
            } else {
                if (chocostyle.pt !== undefined) {
                    newCss.paddingTop = sizeToCss(chocostyle.pt, timeBox);
                }
                if (chocostyle.pb !== undefined) {
                    newCss.paddingBottom = sizeToCss(chocostyle.pb, timeBox);
                }
            }
        }

        //* Margin
        //? all top bottom left right left&right top&bottom
        if (chocostyle.m !== undefined) {
            newCss.margin = sizeToCss(chocostyle.m, timeBox);
        } else {
            if (chocostyle.mx) {
                newCss.marginLeft = sizeToCss(chocostyle.mx, timeBox);
                newCss.marginRight = sizeToCss(chocostyle.mx, timeBox);
            } else {
                if (chocostyle.ml !== undefined) {
                    newCss.marginLeft = sizeToCss(chocostyle.ml, timeBox);
                }
                if (chocostyle.mr !== undefined) {
                    newCss.marginRight = sizeToCss(chocostyle.mr, timeBox);
                }
            }
            if (chocostyle.my) {
                newCss.marginTop = sizeToCss(chocostyle.my, timeBox);
                newCss.marginBottom = sizeToCss(chocostyle.my, timeBox);
            } else {
                if (chocostyle.mt !== undefined) {
                    newCss.marginTop = sizeToCss(chocostyle.mt, timeBox);
                }
                if (chocostyle.mb !== undefined) {
                    newCss.marginBottom = sizeToCss(chocostyle.mb, timeBox);
                }
            }
        }

        //* FontSize
        if (chocostyle.size !== undefined) {
            const fontSize = formatSize(chocostyle.size);
            newCss.fontSize = sizeToCss(fontSize, timeText, "rem");
        }

        //* Border
        if (chocostyle.borR !== undefined) {
            newCss.borderRadius = sizeToCss(chocostyle.borR, timeBox);
        }
        if (chocostyle.fontS !== undefined) {
            newCss.fontSize = sizeToCss(chocostyle.fontS, timeText, "rem");
        }

        //* Display
        //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
        switch (chocostyle.dp) {
            case null:
            case "n":
                newCss.display = "none";
                break;
            case "f":
                newCss.display = "flex";
                break;
            case "b":
                newCss.display = "block";
                break;
            case "i":
                newCss.display = "inline";
                break;
            case "if":
                newCss.display = "inline-flex";
                break;
            case "ib":
                newCss.display = "inline-block";
                break;
        }

        //* Flex direction
        //? unset row reverse-row column reverse-column
        switch (chocostyle.fd) {
            case null:
                newCss.flexDirection = "unset";
                break;
            case "r":
                newCss.flexDirection = "row";
                break;
            case "rr":
                newCss.flexDirection = "row-reverse";
                break;
            case "c":
                newCss.flexDirection = "column";
                break;
            case "cr":
                newCss.flexDirection = "column-reverse";
                break;
        }

        //* Flex wrap
        if (chocostyle.fw !== undefined) {
            newCss.flexWrap = chocostyle.fw ? "wrap" : "nowrap";
        }

        //* Align content
        //? unset flex-end flex-start center space-around space-between stretch
        switch (chocostyle.ac) {
            case null:
                newCss.alignContent = "unset";
                break;
            case "e":
                newCss.alignContent = "flex-end";
                break;
            case "s":
                newCss.alignContent = "flex-start";
                break;
            case "c":
                newCss.alignContent = "center";
                break;
            case "a":
                newCss.alignContent = "space-around";
                break;
            case "b":
                newCss.alignContent = "space-between";
                break;
            case "st":
                newCss.alignContent = "stretch";
                break;
        }

        //* Align items
        //? unset flex-end flex-start center space-around space-between stretch
        switch (chocostyle.a) {
            case null:
                newCss.alignItems = "unset";
                break;
            case "e":
                newCss.alignItems = "flex-end";
                break;
            case "s":
                newCss.alignItems = "flex-start";
                break;
            case "c":
                newCss.alignItems = "center";
                break;
            case "a":
                newCss.alignItems = "space-around";
                break;
            case "b":
                newCss.alignItems = "space-between";
                break;
            case "st":
                newCss.alignItems = "stretch";
                break;
        }

        //* Justify content
        //? flex-end flex-start center space-around space-between space-evenly
        switch (chocostyle.j) {
            case null:
                newCss.justifyContent = "unset";
                break;
            case "e":
                newCss.justifyContent = "flex-end";
                break;
            case "s":
                newCss.justifyContent = "flex-start";
                break;
            case "c":
                newCss.justifyContent = "center";
                break;
            case "b":
                newCss.justifyContent = "space-between";
                break;
            case "a":
                newCss.justifyContent = "space-around";
                break;
            case "ev":
                newCss.justifyContent = "space-evenly";
                break;
        }

        //* Text align
        //? unset end left start right center justify
        switch (chocostyle.text) {
            case null:
                newCss.textAlign = "unset";
                break;
            case "e":
                newCss.textAlign = "end";
                break;
            case "l":
                newCss.textAlign = "left";
                break;
            case "s":
                newCss.textAlign = "start";
                break;
            case "c":
                newCss.textAlign = "center";
                break;
            case "r":
                newCss.textAlign = "right";
                break;
            case "j":
                newCss.textAlign = "justify";
                break;
        }

        //* Position
        //? unset relative absolute fixed sticky
        switch (chocostyle.pos) {
            case null:
                newCss.position = "unset";
                break;
            case "r":
                newCss.position = "relative";
                break;
            case "a":
                newCss.position = "absolute";
                break;
            case "f":
                newCss.position = "fixed";
                break;
            case "s":
                newCss.position = "static";
                break;
        }
        return newCss;
    }

    useEffect(() => {
        const newBreakpoint = getBreakpoint();
        if (newBreakpoint !== breakpoint) {
            setBreakpoint(newBreakpoint);
        }
    }, [inner.width, theme.breakpoint]);

    useEffect(() => {
        const newChocoStyle = getChocoStyle(cs);
        if (JSON.stringify(newChocoStyle) !== JSON.stringify(css)) {
            setCss(newChocoStyle);
        }
    }, [cs, breakpoint]);

    return css;
}
