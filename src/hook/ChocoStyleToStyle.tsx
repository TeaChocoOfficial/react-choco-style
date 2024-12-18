//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/hook/ChocoStyleToStyle.tsx"
import { useMemo } from "react";
import GetColor from "./GetColor";
import { useRecoilValue } from "recoil";
import useTheme from "../theme/useTheme";
import { ChocoStyleType } from "../types/ChocoStyle";
import { Size, SizeKey, Sizes } from "../types/Size";
import { formatSize } from "../components/custom/size";
import { innerAtom } from "../components/layout/ChocoStart";
import { removeReservedProps } from "../components/custom/Styled";
import { keysChocoStyle } from "../components/data/reservedKeywords";

export default function ChocoStyleToStyle<
    CS extends undefined | ChocoStyleType = undefined,
    Return = CS extends undefined
        ? (chocostyle: ChocoStyleType) => React.CSSProperties
        : React.CSSProperties,
>(cs?: CS): Return {
    const theme = useTheme();
    const getColor = GetColor();
    const inner = useRecoilValue(innerAtom);

    const breakpoint = useMemo(() => {
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
    }, [inner, theme]);

    const { getSizes, sizeToCss } = useMemo(
        () => ({
            getSizes<Value = string | undefined>(
                size?: Sizes<Value>,
            ): Value | undefined {
                const keys = Object.keys(theme.breakpoint) as SizeKey[];
                if (size) {
                    const sizeKeys = Object.keys(size) as (keyof Size<Value>)[];
                    if (sizeKeys.find((key) => keys.includes(key))) {
                        const sizes = keys.reduce<Size<Value>>((acc, key) => {
                            const s = size as Size<Value>;
                            if (key in s) {
                                acc[key] = s[key];
                            }
                            return acc;
                        }, {});
                        const value = sizes[keys[breakpoint]];
                        return value as Value;
                    } else {
                        return size as Value;
                    }
                }
            },
            sizeToCss<Value = string | undefined>(
                size: Sizes<Value>,
                time?: number,
                unit?: string,
            ): string | undefined {
                if (size) {
                    if (typeof size === "string") {
                        return size;
                    } else if (typeof size === "number") {
                        return `${size * (time ?? 1)}${unit ?? "px"}`;
                    } else if (size && typeof size === "object") {
                        const keys = Object.keys(theme.breakpoint) as SizeKey[];
                        let currentSize: Value | undefined;
                        const sizes = keys.reduce<Size<Value>>((acc, key) => {
                            const s = size as Size<Value>;
                            if (key in s) {
                                currentSize = s[key];
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
            },
        }),
        [theme, breakpoint],
    );

    const getChocoStyle = useMemo(
        () => (chocostyle: ChocoStyleType) => {
            const timeBox = 4;
            const timeText = 1 / 16;
            const newCss = removeReservedProps(keysChocoStyle, {
                ...chocostyle,
            }) as React.CSSProperties;

            //* Style
            //? background color background-color
            if (chocostyle.bg !== undefined) {
                newCss.background = chocostyle.bg;
            }
            if (chocostyle.color !== undefined) {
                newCss.color = getColor(chocostyle.color);
            }
            if (chocostyle.bgImage !== undefined) {
                newCss.backgroundImage = chocostyle.bgImage;
            }
            if (chocostyle.bgColor !== undefined) {
                newCss.backgroundColor = getColor(chocostyle.bgColor);
            }

            //* Opacity
            if (chocostyle.op !== undefined) {
                newCss.opacity = chocostyle.op * 0.01;
            }

            //* z-index
            if (chocostyle.z !== undefined) {
                newCss.zIndex = chocostyle.z;
            }

            //* Width and Height
            if (chocostyle.w !== undefined) {
                newCss.width = sizeToCss(chocostyle.w);
            }
            if (chocostyle.h !== undefined) {
                newCss.height = sizeToCss(chocostyle.h);
            }
            if (chocostyle.minW !== undefined) {
                newCss.minWidth = sizeToCss(chocostyle.minW);
            }
            if (chocostyle.minH !== undefined) {
                newCss.minHeight = sizeToCss(chocostyle.minH);
            }
            if (chocostyle.maxW !== undefined) {
                newCss.maxWidth = sizeToCss(chocostyle.maxW);
            }
            if (chocostyle.maxH !== undefined) {
                newCss.maxHeight = sizeToCss(chocostyle.maxH);
            }

            //* inset
            //? all top bottom left right left&right top&bottom
            if (chocostyle.i !== undefined) {
                newCss.inset = sizeToCss(chocostyle.i);
            } else {
                if (chocostyle.x !== undefined) {
                    newCss.left = sizeToCss(chocostyle.x);
                    newCss.right = sizeToCss(chocostyle.x);
                } else {
                    if (chocostyle.l !== undefined) {
                        newCss.left = sizeToCss(chocostyle.l);
                    }
                    if (chocostyle.r !== undefined) {
                        newCss.right = sizeToCss(chocostyle.r);
                    }
                }
                if (chocostyle.y !== undefined) {
                    newCss.top = sizeToCss(chocostyle.y);
                    newCss.bottom = sizeToCss(chocostyle.y);
                } else {
                    if (chocostyle.t !== undefined) {
                        newCss.top = sizeToCss(chocostyle.t);
                    }
                    if (chocostyle.b !== undefined) {
                        newCss.bottom = sizeToCss(chocostyle.b);
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
                        newCss.paddingBottom = sizeToCss(
                            chocostyle.pb,
                            timeBox,
                        );
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

            //* Gap
            //? all top bottom left right left&right top&bottom
            if (chocostyle.gap !== undefined) {
                newCss.gap = sizeToCss(chocostyle.gap, timeBox);
            } else {
                if (chocostyle.gapX !== undefined) {
                    newCss.columnGap = sizeToCss(chocostyle.gapX, timeBox);
                    newCss.rowGap = sizeToCss(chocostyle.gapX, timeBox);
                } else {
                    if (chocostyle.gapL !== undefined) {
                        newCss.columnGap = sizeToCss(chocostyle.gapL, timeBox);
                    }
                    if (chocostyle.gapR !== undefined) {
                        newCss.rowGap = sizeToCss(chocostyle.gapR, timeBox);
                    }
                }
                if (chocostyle.gapY !== undefined) {
                    newCss.columnGap = sizeToCss(chocostyle.gapY, timeBox);
                    newCss.rowGap = sizeToCss(chocostyle.gapY, timeBox);
                } else {
                    if (chocostyle.gapT !== undefined) {
                        newCss.columnGap = sizeToCss(chocostyle.gapT, timeBox);
                    }
                    if (chocostyle.gapB !== undefined) {
                        newCss.rowGap = sizeToCss(chocostyle.gapB, timeBox);
                    }
                }
            }

            //* FontSize
            if (chocostyle.size !== undefined) {
                const fontSize = formatSize(chocostyle.size);
                newCss.fontSize = sizeToCss(fontSize, timeText, "em");
            }
            if (chocostyle.fontS !== undefined) {
                newCss.fontSize = sizeToCss(chocostyle.fontS, timeText, "em");
            }

            //* Grids
            //? grid-template grid-area
            if (chocostyle.gridT !== undefined) {
                const getGritTemplate = (
                    template?: (string | number | null)[][],
                ) => {
                    return template
                        ?.map((row) =>
                            row
                                .map((col) =>
                                    typeof col === "number" ? `${col}fr` : col,
                                )
                                .join(" "),
                        )
                        .join(" / ");
                };

                const gridTemplateSize = getSizes(chocostyle.gridT);
                newCss.gridTemplate = getGritTemplate(gridTemplateSize);
            }
            if (chocostyle.gridA !== undefined) {
                const gridAreaSize = getSizes(chocostyle.gridA);
                const gridArea = gridAreaSize
                    ?.map((area, index) =>
                        (index > 0 ? area.map((a) => `span ${a}`) : area).join(
                            " / ",
                        ),
                    )
                    ?.join(" / ");
                newCss.gridArea = gridArea;
            }

            //* Border
            if (chocostyle.borR !== undefined) {
                newCss.borderRadius = sizeToCss(chocostyle.borR, timeBox);
            }
            if (chocostyle.borders !== undefined) {
                if (typeof chocostyle.borders === "string") {
                    newCss.border = chocostyle.borders;
                } else {
                    const { size, width, style, color } = chocostyle.borders;
                    const border: string[] = [];
                    const borderWidth =
                        size !== undefined ? formatSize(size) : width ?? 8;
                    border.push(sizeToCss(borderWidth) ?? "");
                    border.push(style ?? "solid");
                    border.push(getColor(color ?? "secondary") ?? "");
                    newCss.border = border.join(" ");
                }
            }
            if (chocostyle.borderY !== undefined) {
                if (typeof chocostyle.borderY === "string") {
                    newCss.borderTop = chocostyle.borderY;
                    newCss.borderBottom = chocostyle.borderY;
                } else {
                    const { size, width, style, color } = chocostyle.borderY;
                    const border: string[] = [];
                    const borderWidth =
                        size !== undefined ? formatSize(size) : width ?? 8;
                    border.push(sizeToCss(borderWidth) ?? "");
                    border.push(style ?? "solid");
                    border.push(getColor(color ?? "secondary") ?? "");
                    newCss.borderTop = border.join(" ");
                    newCss.borderBottom = border.join(" ");
                }
            } else {
                if (chocostyle.borderT !== undefined) {
                    if (typeof chocostyle.borderT === "string") {
                        newCss.borderTop = chocostyle.borderT;
                    } else {
                        const { size, width, style, color } =
                            chocostyle.borderT;
                        const border: string[] = [];
                        const borderWidth =
                            size !== undefined ? formatSize(size) : width ?? 8;
                        border.push(sizeToCss(borderWidth) ?? "");
                        border.push(style ?? "solid");
                        border.push(getColor(color ?? "secondary") ?? "");
                        newCss.borderTop = border.join(" ");
                    }
                }
                if (chocostyle.borderB !== undefined) {
                    if (typeof chocostyle.borderB === "string") {
                        newCss.borderBottom = chocostyle.borderB;
                    } else {
                        const { size, width, style, color } =
                            chocostyle.borderB;
                        const border: string[] = [];
                        const borderWidth =
                            size !== undefined ? formatSize(size) : width ?? 8;
                        border.push(sizeToCss(borderWidth) ?? "");
                        border.push(style ?? "solid");
                        border.push(getColor(color ?? "secondary") ?? "");
                        newCss.borderBottom = border.join(" ");
                    }
                }
            }
            if (chocostyle.borderX !== undefined) {
                if (typeof chocostyle.borderX === "string") {
                    newCss.borderLeft = chocostyle.borderX;
                    newCss.borderRight = chocostyle.borderX;
                } else {
                    const { size, width, style, color } = chocostyle.borderX;
                    const border: string[] = [];
                    const borderWidth =
                        size !== undefined ? formatSize(size) : width ?? 8;
                    border.push(sizeToCss(borderWidth) ?? "");
                    border.push(style ?? "solid");
                    border.push(getColor(color ?? "secondary") ?? "");
                    newCss.borderLeft = border.join(" ");
                    newCss.borderRight = border.join(" ");
                }
            } else {
                if (chocostyle.borderL !== undefined) {
                    if (typeof chocostyle.borderL === "string") {
                        newCss.borderLeft = chocostyle.borderL;
                    } else {
                        const { size, width, style, color } =
                            chocostyle.borderL;
                        const border: string[] = [];
                        const borderWidth =
                            size !== undefined ? formatSize(size) : width ?? 8;
                        border.push(sizeToCss(borderWidth) ?? "");
                        border.push(style ?? "solid");
                        border.push(getColor(color ?? "secondary") ?? "");
                        newCss.borderLeft = border.join(" ");
                    }
                }
                if (chocostyle.borderR !== undefined) {
                    if (typeof chocostyle.borderR === "string") {
                        newCss.borderRight = chocostyle.borderR;
                    } else {
                        const { size, width, style, color } =
                            chocostyle.borderR;
                        const border: string[] = [];
                        const borderWidth =
                            size !== undefined ? formatSize(size) : width ?? 8;
                        border.push(sizeToCss(borderWidth) ?? "");
                        border.push(style ?? "solid");
                        border.push(getColor(color ?? "secondary") ?? "");
                        newCss.borderRight = border.join(" ");
                    }
                }
            }

            //* Outline
            if (chocostyle.outlines !== undefined) {
                if (typeof chocostyle.outlines === "string") {
                    newCss.outline = chocostyle.outlines;
                } else {
                    const { size, width, style, color } = chocostyle.outlines;
                    const outline: string[] = [];
                    const outlineWidth =
                        size !== undefined ? formatSize(size) : width ?? 8;
                    outline.push(sizeToCss(outlineWidth) ?? "");
                    outline.push(style ?? "solid");
                    outline.push(getColor(color ?? "secondary") ?? "");
                    newCss.outline = outline.join(" ");
                }
            }

            //* transition
            if (chocostyle.animation !== undefined) {
                newCss.transition =
                    typeof chocostyle.animation === "string"
                        ? chocostyle.animation
                        : `${chocostyle.animation}s`;
            }

            //* Transform
            if (chocostyle.transform !== undefined) {
                newCss.transform = chocostyle.transform;
            }

            switch (chocostyle.transformCenter) {
                case "all":
                    newCss.top = "50%";
                    newCss.left = "50%";
                    newCss.transform = "translate(-50%, -50%)";
                    break;
                case "x":
                    newCss.top = "50%";
                    newCss.transform = "translateX(-50%)";
                    break;
                case "y":
                    newCss.left = "50%";
                    newCss.transform = "translateY(-50%)";
                    break;
            }

            //* Display
            //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
            switch (sizeToCss(chocostyle.dp)) {
                case null:
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
                case "g":
                    newCss.display = "grid";
                    break;
                case "ig":
                    newCss.display = "inline-grid";
                    break;
                case "t":
                    newCss.display = "table";
                    break;
                case "it":
                    newCss.display = "inline-table";
                    break;
            }

            //* Flex direction
            //? unset row reverse-row column reverse-column
            switch (sizeToCss(chocostyle.fd)) {
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
                case "i":
                    newCss.flexDirection = "initial";
                    break;
            }

            //* Flex wrap
            if (chocostyle.fw !== undefined) {
                newCss.flexWrap = sizeToCss(chocostyle.fw) ? "wrap" : "nowrap";
            }

            //* Align content
            //? unset flex-end flex-start center space-around space-between stretch
            switch (sizeToCss(chocostyle.ac)) {
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
            switch (sizeToCss(chocostyle.a)) {
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
            switch (sizeToCss(chocostyle.j)) {
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
            switch (sizeToCss(chocostyle.text)) {
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
            switch (sizeToCss(chocostyle.pos)) {
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

            //* Overflow
            //? visible hidden scroll auto
            switch (sizeToCss(chocostyle.of)) {
                case null:
                    newCss.overflow = "unset";
                    break;
                case "v":
                    newCss.overflow = "visible";
                    break;
                case "h":
                    newCss.overflow = "hidden";
                    break;
                case "s":
                    newCss.overflow = "scroll";
                    break;
                case "a":
                    newCss.overflow = "auto";
                    break;
            }
            switch (sizeToCss(chocostyle.ofx)) {
                case null:
                    newCss.overflowX = "unset";
                    break;
                case "v":
                    newCss.overflowX = "visible";
                    break;
                case "h":
                    newCss.overflowX = "hidden";
                    break;
                case "s":
                    newCss.overflowX = "scroll";
                    break;
                case "a":
                    newCss.overflowX = "auto";
                    break;
            }
            switch (sizeToCss(chocostyle.ofy)) {
                case null:
                    newCss.overflowY = "unset";
                    break;
                case "v":
                    newCss.overflowY = "visible";
                    break;
                case "h":
                    newCss.overflowY = "hidden";
                    break;
                case "s":
                    newCss.overflowY = "scroll";
                    break;
                case "a":
                    newCss.overflowY = "auto";
                    break;
            }

            if (chocostyle.event !== undefined) {
                switch (chocostyle.event) {
                    case "n":
                        newCss.pointerEvents = "none";
                        break;
                    case "a":
                        newCss.pointerEvents = "auto";
                        break;
                }
            }

            //* Cursor
            //? default pointer move not-allowed wait text crosshair alias copy col-resize
            switch (sizeToCss(chocostyle.cur)) {
                case null:
                    newCss.cursor = "unset";
                    break;
                case "d":
                    newCss.cursor = "default";
                    break;
                case "p":
                    newCss.cursor = "pointer";
                    break;
                case "m":
                    newCss.cursor = "move";
                    break;
                case "n":
                    newCss.cursor = "not-allowed";
                    break;
                case "w":
                    newCss.cursor = "wait";
                    break;
                case "t":
                    newCss.cursor = "text";
                    break;
                case "c":
                    newCss.cursor = "crosshair";
                    break;
                case "cr":
                    newCss.cursor = "col-resize";
                    break;
            }

            //* User select
            //? none auto text all
            switch (sizeToCss(chocostyle.us)) {
                case null:
                    newCss.userSelect = "unset";
                    break;
                case "n":
                    newCss.userSelect = "none";
                    break;
                case "a":
                    newCss.userSelect = "auto";
                    break;
                case "t":
                    newCss.userSelect = "text";
                    break;
                case "al":
                    newCss.userSelect = "all";
                    break;
            }

            return newCss;
        },
        [cs, breakpoint],
    );

    return (cs === undefined ? getChocoStyle : getChocoStyle(cs)) as Return;
}
