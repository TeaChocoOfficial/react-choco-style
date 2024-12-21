//-Path: "react-choco-style/src/hook/useChocoStyle.tsx"
import {
    StyleTypes,
    LineStyleType,
    LinesStyleType,
    ChocoStyleType,
    GridTemplateType,
} from "../types/ChocoStyle";
import useGetColor from "./useGetColor";
import useTheme from "../theme/useTheme";
import React, { useCallback } from "react";
import { ResponsiveCSSType } from "../types/style";
import { callbackSize, formatSize } from "../function/size";
import { Size, SizeKey, Sizes, SizeValue } from "../types/Size";
import { keysChocoStyle } from "../components/data/reservedKeywords";

export default function useChocoStyle() {
    const getColor = useGetColor();
    const { breakpoint } = useTheme();

    const ChocoStyle = useCallback(
        <NewCss extends ResponsiveCSSType>(styles: StyleTypes): NewCss => {
            const breakpointKeys = Object.keys(breakpoint.size) as SizeKey[];
            const chocostyle = { ...styles } as ChocoStyleType;
            const timeBox = 4;
            const timeText = 1 / 16;
            const newCss = {} as NewCss;

            const keysChocostyle = Object.keys(
                chocostyle,
            ) as (keyof ChocoStyleType)[];
            const CssProperties = keysChocostyle.reduce<
                Record<string, React.CSSProperties>
            >((acc, key) => {
                if (
                    !(keysChocoStyle as (keyof ChocoStyleType)[]).includes(key)
                ) {
                    acc[key] = chocostyle[key] as React.CSSProperties;
                }
                return acc;
            }, {});

            function isSize(size: any): boolean {
                const sizeKeys = Object.keys(size as Size) as (keyof Size)[];
                return sizeKeys.every((key) => breakpointKeys.includes(key));
            }

            function getSizes<Value = string | undefined>(
                size?: Sizes<Value>,
            ): Size<Value> | undefined {
                if (size) {
                    if (isSize(size)) {
                        return size;
                    } else {
                        if (size && typeof size === "object") {
                            const sizes = breakpointKeys.reduce<Size<Value>>(
                                (acc, key) => {
                                    const s = size as Size<Value>;
                                    const value = size as Value;
                                    if (s[key]) {
                                        acc[key] = s[key];
                                    } else {
                                        acc[key] = value;
                                    }
                                    return acc;
                                },
                                {},
                            );
                            return sizes;
                        } else {
                            return { [breakpointKeys[0]]: size as Value };
                        }
                    }
                }
            }

            function sizeToCss<Value = string | undefined>(
                size?: Sizes<Value>,
                time?: number,
                unit?: string,
            ): Size<Value> | undefined {
                if (size !== undefined) {
                    if (typeof size === "string") {
                        return getSizes(size);
                    } else if (typeof size === "number") {
                        return getSizes(
                            `${size * (time ?? 1)}${unit ?? "px"}` as Value,
                        );
                    } else if (isSize(size)) {
                        const newSize = callbackSize(size, (value) => {
                            const newValue =
                                typeof value === "number"
                                    ? `${value * (time ?? 1)}${unit ?? "px"}`
                                    : value;
                            return newValue as Value;
                        });
                        return getSizes(newSize);
                    }
                }
            }

            function getCss<S = SizeValue>(
                keyCss: keyof React.CSSProperties,
                value?: Sizes<S>,
            ) {
                if (value !== undefined) {
                    // console.log(newCss);
                    if (
                        isSize(value) &&
                        value !== null &&
                        typeof value === "object"
                    ) {
                        const size = value as Size<S>;
                        breakpointKeys.reduce((acc, key) => {
                            if (size[key] !== undefined) {
                                if (newCss[key] === undefined) {
                                    newCss[key] = {};
                                }
                                const cssValue = size[
                                    key
                                ] as React.CSSProperties[typeof keyCss];
                                newCss[key][keyCss] = cssValue as never;
                            }
                            return acc;
                        }, {});
                    } else {
                        if (value !== undefined) {
                            const firstKey = breakpointKeys[0];
                            if (newCss[firstKey] === undefined) {
                                newCss[firstKey] = {};
                            }
                            newCss[firstKey][keyCss] =
                                value as React.CSSProperties[typeof keyCss] as never;
                        }
                    }
                }
            }

            const keysCssProperties = Object.keys(
                CssProperties,
            ) as (keyof React.CSSProperties)[];
            keysCssProperties.forEach((key) => getCss(key, CssProperties[key]));

            function getInset<
                Value extends Sizes | undefined,
                Values extends [keyof React.CSSProperties, Sizes | undefined],
            >(insets: {
                i: Values;
                x: Value;
                y: Value;
                l: Values;
                r: Values;
                t: Values;
                b: Values;
            }) {
                const { i, x, y, l, r, t, b } = insets;
                if (i[1] !== undefined) {
                    getCss(i[0], sizeToCss(i[1]));
                } else {
                    if (x !== undefined) {
                        getCss(l[0], sizeToCss(x));
                        getCss(r[0], sizeToCss(x));
                    } else {
                        if (l[1] !== undefined) {
                            getCss(l[0], sizeToCss(l[1]));
                        }
                        if (r[1] !== undefined) {
                            getCss(r[0], sizeToCss(r[1]));
                        }
                    }
                    if (y !== undefined) {
                        getCss(t[0], sizeToCss(y));
                        getCss(b[0], sizeToCss(y));
                    } else {
                        if (t[1] !== undefined) {
                            getCss(t[0], sizeToCss(t[1]));
                        }
                        if (b[1] !== undefined) {
                            getCss(b[0], sizeToCss(b[1]));
                        }
                    }
                }
            }

            //* Style
            //? background color background-color
            getCss("background", chocostyle.bg);
            getCss("color", getColor(chocostyle.clr));
            getCss("backgroundImage", chocostyle.bgImage);
            getCss("backgroundColor", getColor(chocostyle.bgColor));

            //* Opacity
            getCss("opacity", chocostyle.op);

            //* z-index
            getCss("zIndex", chocostyle.z);

            //* Width and Height
            getCss("width", sizeToCss(chocostyle.w));
            getCss("height", sizeToCss(chocostyle.h));
            getCss("minWidth", sizeToCss(chocostyle.minW));
            getCss("minHeight", sizeToCss(chocostyle.minH));
            getCss("maxWidth", sizeToCss(chocostyle.maxW));
            getCss("maxHeight", sizeToCss(chocostyle.maxH));

            //* inset
            //? all top bottom left right left&right top&bottom
            getInset({
                i: ["inset", sizeToCss(chocostyle.i)],
                x: sizeToCss(chocostyle.x),
                y: sizeToCss(chocostyle.y),
                l: ["left", sizeToCss(chocostyle.l)],
                r: ["right", sizeToCss(chocostyle.r)],
                t: ["top", sizeToCss(chocostyle.t)],
                b: ["bottom", sizeToCss(chocostyle.b)],
            });

            //* Padding
            //? all top bottom left right left&right top&bottom
            getInset({
                i: ["padding", sizeToCss(chocostyle.p, timeBox)],
                x: sizeToCss(chocostyle.px, timeBox),
                y: sizeToCss(chocostyle.py, timeBox),
                l: ["paddingLeft", sizeToCss(chocostyle.pl, timeBox)],
                r: ["paddingRight", sizeToCss(chocostyle.pr, timeBox)],
                t: ["paddingTop", sizeToCss(chocostyle.pt, timeBox)],
                b: ["paddingBottom", sizeToCss(chocostyle.pb, timeBox)],
            });

            //* Margin
            //? all top bottom left right left&right top&bottom
            getInset({
                i: ["margin", sizeToCss(chocostyle.m, timeBox)],
                x: sizeToCss(chocostyle.mx, timeBox),
                y: sizeToCss(chocostyle.my, timeBox),
                l: ["marginLeft", sizeToCss(chocostyle.ml, timeBox)],
                r: ["marginRight", sizeToCss(chocostyle.mr, timeBox)],
                t: ["marginTop", sizeToCss(chocostyle.mt, timeBox)],
                b: ["marginBottom", sizeToCss(chocostyle.mb, timeBox)],
            });

            //* Gap
            //? all top bottom left right left&right top&bottom
            getInset({
                i: ["gap", sizeToCss(chocostyle.gaps, timeBox)],
                x: sizeToCss(chocostyle.gapX, timeBox),
                y: sizeToCss(chocostyle.gapY, timeBox),
                l: ["columnGap", sizeToCss(chocostyle.gapL, timeBox)],
                r: ["rowGap", sizeToCss(chocostyle.gapR, timeBox)],
                t: ["columnGap", sizeToCss(chocostyle.gapT, timeBox)],
                b: ["rowGap", sizeToCss(chocostyle.gapB, timeBox)],
            });

            //* FontSize
            if (chocostyle.size !== undefined) {
                const fontSize = formatSize(chocostyle.size);
                getCss("fontSize", sizeToCss(fontSize, timeText, "em"));
            }
            if (chocostyle.fontS !== undefined) {
                getCss("fontSize", sizeToCss(chocostyle.fontS, timeText, "em"));
            }

            //* Grids
            //? grid-template grid-area
            if (chocostyle.gridT !== undefined) {
                const getGritTemplate = (
                    template?: Sizes<GridTemplateType>,
                ) => {
                    return callbackSize(template, (size, key) => {
                        if (size) {
                            const getGrit = (size?: GridTemplateType) =>
                                size
                                    ?.map((row) =>
                                        row
                                            .map((col) =>
                                                typeof col === "number"
                                                    ? `${col}fr`
                                                    : col,
                                            )
                                            .join(" "),
                                    )
                                    .join(" / ");

                            if (Array.isArray(size)) {
                                return getGrit(size);
                            } else {
                                return getGrit(size[key]);
                            }
                        }
                    });
                };

                getCss("gridTemplate", getGritTemplate(chocostyle.gridT));
            }
            if (chocostyle.gridA !== undefined) {
                const keys = Object.keys(breakpoint.size) as SizeKey[];
                const gridArea = callbackSize(chocostyle.gridA, (grid, key) => {
                    if (keys.every((key) => Object.keys(grid).includes(key))) {
                        const grids = grid as Size<GridTemplateType>;
                        return grids[key]
                            ?.map((area, index) =>
                                (index > 0
                                    ? area.map((a) => `span ${a}`)
                                    : area
                                ).join(" / "),
                            )
                            ?.join(" / ");
                    } else {
                        const template = grid as GridTemplateType;
                        return template
                            ?.map((area, index) =>
                                (index > 0
                                    ? area.map((a) => `span ${a}`)
                                    : area
                                ).join(" / "),
                            )
                            ?.join(" / ");
                    }
                });
                getCss("gridArea", gridArea);
            }

            //* Border
            getCss("borderRadius", sizeToCss(chocostyle.borR, timeBox));

            function getLiners(line: LinesStyleType) {
                const { size, width, style, color } = line;
                const borderWidth =
                    size !== undefined ? formatSize(size) : width ?? 8;
                const borderSize = sizeToCss(borderWidth);
                const getLiner = (line: LineStyleType): string => {
                    const { width, style, color } = line;
                    const border: (string | number | Size)[] = [];
                    border.push(width ?? "");
                    border.push(style ?? "solid");
                    border.push(getColor(color ?? "secondary") ?? "");
                    return border.join(" ");
                };
                if (borderSize) {
                    const keys = Object.keys(borderSize) as SizeKey[];
                    const sizes = keys.reduce<Size<string>>((acc, key) => {
                        const s = borderSize as Size<string | number>;
                        const value = borderSize as string | number;
                        if (s[key]) {
                            acc[key] = getLiner({
                                width: s[key],
                                style,
                                color,
                            });
                        } else {
                            acc[key] = getLiner({ width: value, style, color });
                        }
                        return acc;
                    }, {});

                    return sizes;
                }
            }

            if (chocostyle.borders !== undefined) {
                if (typeof chocostyle.borders === "string") {
                    getCss("border", chocostyle.borders);
                } else {
                    getCss("border", getLiners(chocostyle.borders));
                }
            }
            if (chocostyle.borderY !== undefined) {
                if (typeof chocostyle.borderY === "string") {
                    getCss("borderTop", chocostyle.borderY);
                    getCss("borderBottom", chocostyle.borderY);
                } else {
                    getCss("borderTop", getLiners(chocostyle.borderY));
                    getCss("borderBottom", getLiners(chocostyle.borderY));
                }
            } else {
                if (chocostyle.borderT !== undefined) {
                    if (typeof chocostyle.borderT === "string") {
                        getCss("borderTop", chocostyle.borderT);
                    } else {
                        getCss("borderTop", getLiners(chocostyle.borderT));
                    }
                }
                if (chocostyle.borderB !== undefined) {
                    if (typeof chocostyle.borderB === "string") {
                        getCss("borderBottom", chocostyle.borderB);
                    } else {
                        getCss("borderBottom", getLiners(chocostyle.borderB));
                    }
                }
            }
            if (chocostyle.borderX !== undefined) {
                if (typeof chocostyle.borderX === "string") {
                    getCss("borderLeft", chocostyle.borderX);
                    getCss("borderRight", chocostyle.borderX);
                } else {
                    getCss("borderLeft", getLiners(chocostyle.borderX));
                    getCss("borderRight", getLiners(chocostyle.borderX));
                }
            } else {
                if (chocostyle.borderL !== undefined) {
                    if (typeof chocostyle.borderL === "string") {
                        getCss("borderLeft", chocostyle.borderL);
                    } else {
                        getCss("borderLeft", getLiners(chocostyle.borderL));
                    }
                }
                if (chocostyle.borderR !== undefined) {
                    if (typeof chocostyle.borderR === "string") {
                        getCss("borderRight", chocostyle.borderR);
                    } else {
                        getCss("borderRight", getLiners(chocostyle.borderR));
                    }
                }
            }

            //* Outline
            if (chocostyle.outlines !== undefined) {
                if (typeof chocostyle.outlines === "string") {
                    getCss("outline", chocostyle.outlines);
                } else {
                    // console.log(chocostyle.outlines, getLiners(chocostyle.outlines));
                    getCss("outline", getLiners(chocostyle.outlines));
                }
            }

            //* transition
            if (chocostyle.trans !== undefined) {
                getCss(
                    "transition",
                    typeof chocostyle.trans === "string"
                        ? chocostyle.trans
                        : `${chocostyle.trans}s`,
                );
            }

            //* Transform
            if (chocostyle.transform !== undefined) {
                getCss("transform", chocostyle.transform);
            }

            switch (chocostyle.transformCenter) {
                case "all":
                    getCss("top", "50%");
                    getCss("left", "50%");
                    getCss("transform", "translate(-50%, -50%)");
                    break;
                case "x":
                    getCss("top", "50%");
                    getCss("transform", "translateX(-50%)");
                    break;
                case "y":
                    getCss("left", "50%");
                    getCss("transform", "translateY(-50%)");
                    break;
            }

            //* Display
            //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
            switch (chocostyle.dp) {
                case null:
                    getCss("display", "none");
                    break;
                case "f":
                    getCss("display", "flex");
                    break;
                case "b":
                    getCss("display", "block");
                    break;
                case "i":
                    getCss("display", "inline");
                    break;
                case "if":
                    getCss("display", "inline-flex");
                    break;
                case "ib":
                    getCss("display", "inline-block");
                    break;
                case "g":
                    getCss("display", "grid");
                    break;
                case "ig":
                    getCss("display", "inline-grid");
                    break;
                case "t":
                    getCss("display", "table");
                    break;
                case "it":
                    getCss("display", "inline-table");
                    break;
            }

            //* Flex direction
            //? unset row reverse-row column reverse-column
            switch (chocostyle.fd) {
                case null:
                    getCss("flexDirection", "unset");
                    break;
                case "r":
                    getCss("flexDirection", "row");
                    break;
                case "rr":
                    getCss("flexDirection", "row-reverse");
                    break;
                case "c":
                    getCss("flexDirection", "column");
                    break;
                case "cr":
                    getCss("flexDirection", "column-reverse");
                    break;
                case "i":
                    getCss("flexDirection", "initial");
                    break;
            }

            //* Flex wrap
            if (chocostyle.fw !== undefined) {
                getCss("flexWrap", chocostyle.fw ? "wrap" : "nowrap");
            }

            //* Align content
            //? unset flex-end flex-start center space-around space-between stretch
            switch (chocostyle.ac) {
                case null:
                    getCss("alignContent", "unset");
                    break;
                case "e":
                    getCss("alignContent", "flex-end");
                    break;
                case "s":
                    getCss("alignContent", "flex-start");
                    break;
                case "c":
                    getCss("alignContent", "center");
                    break;
                case "a":
                    getCss("alignContent", "space-around");
                    break;
                case "b":
                    getCss("alignContent", "space-between");
                    break;
                case "st":
                    getCss("alignContent", "stretch");
                    break;
            }

            //* Align items
            //? unset flex-end flex-start center space-around space-between stretch
            switch (chocostyle.a) {
                case null:
                    getCss("alignItems", "unset");
                    break;
                case "e":
                    getCss("alignItems", "flex-end");
                    break;
                case "s":
                    getCss("alignItems", "flex-start");
                    break;
                case "c":
                    getCss("alignItems", "center");
                    break;
                case "a":
                    getCss("alignItems", "space-around");
                    break;
                case "b":
                    getCss("alignItems", "space-between");
                    break;
                case "st":
                    getCss("alignItems", "stretch");
                    break;
            }

            //* Justify content
            //? flex-end flex-start center space-around space-between space-evenly
            switch (chocostyle.j) {
                case null:
                    getCss("justifyContent", "unset");
                    break;
                case "e":
                    getCss("justifyContent", "flex-end");
                    break;
                case "s":
                    getCss("justifyContent", "flex-start");
                    break;
                case "c":
                    getCss("justifyContent", "center");
                    break;
                case "b":
                    getCss("justifyContent", "space-between");
                    break;
                case "a":
                    getCss("justifyContent", "space-around");
                    break;
                case "ev":
                    getCss("justifyContent", "space-evenly");
                    break;
            }

            //* Text align
            //? unset end left start right center justify
            switch (chocostyle.text) {
                case null:
                    getCss("textAlign", "unset");
                    break;
                case "e":
                    getCss("textAlign", "end");
                    break;
                case "l":
                    getCss("textAlign", "left");
                    break;
                case "s":
                    getCss("textAlign", "start");
                    break;
                case "c":
                    getCss("textAlign", "center");
                    break;
                case "r":
                    getCss("textAlign", "right");
                    break;
                case "j":
                    getCss("textAlign", "justify");
                    break;
            }

            //* Position
            //? unset relative absolute fixed sticky
            switch (chocostyle.pos) {
                case null:
                    getCss("position", "unset");
                    break;
                case "r":
                    getCss("position", "relative");
                    break;
                case "a":
                    getCss("position", "absolute");
                    break;
                case "f":
                    getCss("position", "fixed");
                    break;
                case "s":
                    getCss("position", "static");
                    break;
            }

            //* Overflow
            //? visible hidden scroll auto
            switch (chocostyle.of) {
                case null:
                    getCss("overflow", "unset");
                    break;
                case "v":
                    getCss("overflow", "visible");
                    break;
                case "h":
                    getCss("overflow", "hidden");
                    break;
                case "s":
                    getCss("overflow", "scroll");
                    break;
                case "a":
                    getCss("overflow", "auto");
                    break;
            }
            switch (chocostyle.ofx) {
                case null:
                    getCss("overflowX", "unset");
                    break;
                case "v":
                    getCss("overflowX", "visible");
                    break;
                case "h":
                    getCss("overflowX", "hidden");
                    break;
                case "s":
                    getCss("overflowX", "scroll");
                    break;
                case "a":
                    getCss("overflowX", "auto");
                    break;
            }
            switch (chocostyle.ofy) {
                case null:
                    getCss("overflowY", "unset");
                    break;
                case "v":
                    getCss("overflowY", "visible");
                    break;
                case "h":
                    getCss("overflowY", "hidden");
                    break;
                case "s":
                    getCss("overflowY", "scroll");
                    break;
                case "a":
                    getCss("overflowY", "auto");
                    break;
            }

            if (chocostyle.event !== undefined) {
                switch (chocostyle.event) {
                    case "n":
                        getCss("pointerEvents", "none");
                        break;
                    case "a":
                        getCss("pointerEvents", "auto");
                        break;
                }
            }

            //* Cursor
            //? default pointer move not-allowed wait text crosshair alias copy col-resize
            switch (chocostyle.cur) {
                case null:
                    getCss("cursor", "unset");
                    break;
                case "d":
                    getCss("cursor", "default");
                    break;
                case "p":
                    getCss("cursor", "pointer");
                    break;
                case "m":
                    getCss("cursor", "move");
                    break;
                case "n":
                    getCss("cursor", "not-allowed");
                    break;
                case "w":
                    getCss("cursor", "wait");
                    break;
                case "t":
                    getCss("cursor", "text");
                    break;
                case "c":
                    getCss("cursor", "crosshair");
                    break;
                case "cr":
                    getCss("cursor", "col-resize");
                    break;
            }

            //* User select
            //? none auto text all
            switch (chocostyle.us) {
                case null:
                    getCss("userSelect", "unset");
                    break;
                case "n":
                    getCss("userSelect", "none");
                    break;
                case "a":
                    getCss("userSelect", "auto");
                    break;
                case "t":
                    getCss("userSelect", "text");
                    break;
                case "al":
                    getCss("userSelect", "all");
                    break;
            }

            return newCss;
        },
        [],
    );

    return ChocoStyle;
}
