'use strict';

var jsxRuntime = require('react/jsx-runtime');
var recoil = require('recoil');
var react = require('react');
var reactRouterDom = require('react-router-dom');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var _a;
var getThemeMode = function () {
    if (localStorage && window) {
        var themeMode = localStorage.getItem("theme mode");
        if (themeMode === null) {
            var matches = window.matchMedia("(prefers-color-scheme: dark)").matches;
            themeMode = matches ? "dark" : "light";
            localStorage.setItem("theme mode", themeMode);
        }
        return themeMode;
    }
};
var ChocoTheme = {
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
        m: 0,
        t: 860,
        l: 1024,
        d: 1248,
    },
    mode: (_a = getThemeMode()) !== null && _a !== void 0 ? _a : "dark",
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
var themeModeAtom = recoil.atom({
    key: "theme mode",
    default: ChocoTheme.mode,
});

function useTheme() {
    var _a = recoil.useRecoilState(themeModeAtom), mode = _a[0], setMode = _a[1];
    var _b = react.useState(updateTheme()), theme = _b[0], setTheme = _b[1];
    function updateTheme() {
        return {
            fonts: ChocoTheme.fonts,
            breakpoint: ChocoTheme.breakpoint,
            mode: mode,
            palette: __assign(__assign({}, ChocoTheme.modes.default), ChocoTheme.modes[mode]),
            method: {
                setMode: function (mode) { return setMode(mode); },
            },
        };
    }
    react.useEffect(function () {
        setTheme(updateTheme());
    }, [mode]);
    return theme;
}

//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/hook/GetColor.tsx"
function GetColor() {
    var palette = useTheme().palette;
    return function (color) {
        var Color;
        switch (color) {
            case undefined:
                Color = undefined;
                break;
            case null:
                Color = "transparent";
                break;
            //*common
            case "paper":
                Color = palette.background.paper;
                break;
            case "inherit":
                Color = palette.background.default;
                break;
            //*text
            case "disabled":
                Color = palette.text.disabled;
                break;
            case "text":
                Color = palette.text.primary;
                break;
            //*primary
            case "primary":
                Color = palette.primary.main;
                break;
            case "primaryText":
                Color = palette.primary.text;
                break;
            //*secondary
            case "secondary":
                Color = palette.secondary.main;
                break;
            case "secondaryText":
                Color = palette.secondary.text;
                break;
            //*error
            case "error":
                Color = palette.error.main;
                break;
            case "errorText":
                Color = palette.error.text;
                break;
            //*warning
            case "warning":
                Color = palette.warning.main;
                break;
            case "warningText":
                Color = palette.warning.text;
                break;
            //*info
            case "info":
                Color = palette.info.main;
                break;
            case "infoText":
                Color = palette.info.text;
                break;
            //*success
            case "success":
                Color = palette.success.main;
                break;
            case "successText":
                Color = palette.success.text;
                break;
            default:
                var colors = palette[color];
                Color = colors ? colors.main : color;
                break;
        }
        return Color;
    };
}

var KeywordsChocoStyleDef = [
    "bg",
    "color",
    "bgColor",
    "op",
    "w",
    "h",
    "i",
    "t",
    "b",
    "l",
    "r",
    "x",
    "y",
    "p",
    "pt",
    "pb",
    "pl",
    "pr",
    "px",
    "py",
    "m",
    "mt",
    "mb",
    "ml",
    "mr",
    "mx",
    "my",
    "gap",
    "gapT",
    "gapB",
    "gapL",
    "gapR",
    "gapX",
    "gapY",
    "size",
    "fontS",
    "gridT",
    "gridA",
    "borR",
    "border",
    "animation",
    "transform",
    "transformCenter",
];
var KeywordsChocoStyle = [
    "dp",
    "fd",
    "fw",
    "a",
    "j",
    "text",
    "pos",
];
var KeywordsChocoStyleProps = [
    "cs",
    "full",
    "fullV",
    "dNone",
    "dFlex",
    "dBlock",
    "dInline",
    "dInlineF",
    "dInlineB",
    "dGrid",
    "dInlineG",
    "dTable",
    "dInlineT",
    "row",
    "rRow",
    "column",
    "rColumn",
    "fWrap",
    "acEnd",
    "acStart",
    "acCenter",
    "acAround",
    "acBetween",
    "acStretch",
    "aEnd",
    "aStart",
    "aCenter",
    "aAround",
    "aBetween",
    "aStretch",
    "jEnd",
    "jStart",
    "jCenter",
    "jEvenly",
    "jAround",
    "jBetween",
    "tEnd",
    "tLeft",
    "tStart",
    "tRight",
    "tCenter",
    "tJustify",
    "pos",
    "posR",
    "posA",
    "posF",
    "posS",
];
var keysChocoStyle = __spreadArray(__spreadArray([], KeywordsChocoStyle, true), KeywordsChocoStyleDef, true);
var keysChocoStyleProps = __spreadArray(__spreadArray([], KeywordsChocoStyleDef, true), KeywordsChocoStyleProps, true);

function formatSize(max, size, unit) {
    if (size === void 0) { size = undefined; }
    if (unit === void 0) { unit = undefined; }
    if (!size) {
        size = { m: 50, t: 70, l: 90, d: 100 };
    }
    var keySize = Object.keys(size);
    var output = { m: 0, t: 0, l: 0, d: 0 };
    keySize.forEach(function (key) {
        var _a;
        var value = (((_a = size === null || size === void 0 ? void 0 : size[key]) !== null && _a !== void 0 ? _a : 100) *
            (max / 100));
        output[key] = unit ? "".concat(value).concat(unit) : value;
    });
    return output;
}
function callbackSize(size, callback) {
    var sizes;
    if (typeof size === "number") {
        sizes = formatSize(size);
    }
    else {
        sizes = size;
    }
    var output = {};
    Object.keys(sizes).forEach(function (key) {
        var _a;
        var value = ((_a = sizes === null || sizes === void 0 ? void 0 : sizes[key]) !== null && _a !== void 0 ? _a : 0);
        output[key] = callback(value);
    });
    return output;
}

var innerAtom = recoil.atom({
    key: "window inner",
    default: {
        width: window ? window.innerWidth : 0,
        height: window ? window.innerHeight : 0,
    },
});
function ChocoStart(_a) {
    var children = _a.children;
    var setInner = recoil.useSetRecoilState(innerAtom);
    react.useEffect(function () {
        getThemeMode();
        var handleResize = function () {
            setInner({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []);
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: children });
}

function ChocoStyleToStyle(cs) {
    var theme = useTheme();
    var getColor = GetColor();
    var inner = recoil.useRecoilValue(innerAtom);
    var _a = react.useState(getBreakpoint()), breakpoint = _a[0], setBreakpoint = _a[1];
    var _b = react.useState(getChocoStyle(cs)), css = _b[0], setCss = _b[1];
    function getBreakpoint() {
        var keys = Object.keys(theme.breakpoint);
        var breakpoint = 0;
        keys.map(function (key, index) {
            var breakpoints = theme.breakpoint[key];
            var matche = inner.width > breakpoints;
            if (matche) {
                breakpoint = index;
            }
        });
        return breakpoint;
    }
    function getSizes(size) {
        var keys = Object.keys(theme.breakpoint);
        if (size) {
            var sizeKeys = Object.keys(size);
            if (sizeKeys.find(function (key) { return keys.includes(key); })) {
                var sizes = keys.reduce(function (acc, key) {
                    var s = size;
                    if (key in s) {
                        acc[key] = s[key];
                    }
                    return acc;
                }, {});
                var value = sizes[keys[breakpoint]];
                return value;
            }
            else {
                return size;
            }
        }
    }
    function sizeToCss(size, time, unit) {
        if (size) {
            if (typeof size === "string") {
                return size;
            }
            else if (typeof size === "number") {
                return "".concat(size * (time !== null && time !== void 0 ? time : 1)).concat(unit !== null && unit !== void 0 ? unit : "px");
            }
            else if (size && typeof size === "object") {
                var keys = Object.keys(theme.breakpoint);
                var currentSize_1;
                var sizes = keys.reduce(function (acc, key) {
                    var s = size;
                    if (key in s) {
                        currentSize_1 = s[key];
                    }
                    acc[key] = currentSize_1;
                    return acc;
                }, {});
                var value = sizes[keys[breakpoint]];
                if (typeof value === "string") {
                    return value;
                }
                else if (typeof value === "number") {
                    return "".concat(value * (time !== null && time !== void 0 ? time : 1)).concat(unit !== null && unit !== void 0 ? unit : "px");
                }
            }
        }
    }
    function getChocoStyle(chocostyle) {
        var _a, _b, _c;
        var timeBox = 4;
        var timeText = 1 / 16;
        var newCss = removeReservedProps(__spreadArray(__spreadArray([], KeywordsChocoStyleDef, true), KeywordsChocoStyle, true), __assign({}, chocostyle));
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
        }
        else {
            if (chocostyle.x !== undefined) {
                newCss.left = sizeToCss(chocostyle.x);
                newCss.right = sizeToCss(chocostyle.x);
            }
            else {
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
            }
            else {
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
        }
        else {
            if (chocostyle.px !== undefined) {
                newCss.paddingLeft = sizeToCss(chocostyle.px, timeBox);
                newCss.paddingRight = sizeToCss(chocostyle.px, timeBox);
            }
            else {
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
            }
            else {
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
        }
        else {
            if (chocostyle.mx) {
                newCss.marginLeft = sizeToCss(chocostyle.mx, timeBox);
                newCss.marginRight = sizeToCss(chocostyle.mx, timeBox);
            }
            else {
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
            }
            else {
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
        }
        else {
            if (chocostyle.gapX !== undefined) {
                newCss.columnGap = sizeToCss(chocostyle.gapX, timeBox);
                newCss.rowGap = sizeToCss(chocostyle.gapX, timeBox);
            }
            else {
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
            }
            else {
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
            var fontSize = formatSize(chocostyle.size);
            newCss.fontSize = sizeToCss(fontSize, timeText, "em");
        }
        if (chocostyle.fontS !== undefined) {
            newCss.fontSize = sizeToCss(chocostyle.fontS, timeText, "em");
        }
        //* Grids
        //? grid-template grid-area
        if (chocostyle.gridT !== undefined) {
            var getGritTemplate = function (template) {
                return template === null || template === void 0 ? void 0 : template.map(function (row) {
                    return row
                        .map(function (col) {
                        return typeof col === "number" ? "".concat(col, "fr") : col;
                    })
                        .join(" ");
                }).join(" / ");
            };
            var gridTemplateSize = getSizes(chocostyle.gridT);
            newCss.gridTemplate = getGritTemplate(gridTemplateSize);
        }
        if (chocostyle.gridA !== undefined) {
            var gridAreaSize = getSizes(chocostyle.gridA);
            var gridArea = (_a = gridAreaSize === null || gridAreaSize === void 0 ? void 0 : gridAreaSize.map(function (area, index) {
                return (index > 0 ? area.map(function (a) { return "span ".concat(a); }) : area).join(" / ");
            })) === null || _a === void 0 ? void 0 : _a.join(" / ");
            newCss.gridArea = gridArea;
        }
        //* Border
        if (chocostyle.border !== undefined) {
            if (typeof chocostyle.border === "string") {
                newCss.border = chocostyle.border;
            }
            else {
                var _d = chocostyle.border, size = _d.size, width = _d.width, style = _d.style, color = _d.color;
                var border = [];
                if (size !== undefined) {
                    var borderWidth = width ? width : formatSize(size);
                    border.push((_b = sizeToCss(borderWidth)) !== null && _b !== void 0 ? _b : "");
                }
                if (style !== undefined) {
                    border.push(style);
                }
                if (color !== undefined) {
                    border.push((_c = getColor(color)) !== null && _c !== void 0 ? _c : "");
                }
                newCss.border = border.join(" ");
            }
        }
        if (chocostyle.borR !== undefined) {
            newCss.borderRadius = sizeToCss(chocostyle.borR, timeBox);
        }
        //* transition
        if (chocostyle.animation !== undefined) {
            newCss.transition =
                typeof chocostyle.animation === "string"
                    ? chocostyle.animation
                    : "".concat(chocostyle.animation, "s");
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
        return newCss;
    }
    react.useEffect(function () {
        var newBreakpoint = getBreakpoint();
        if (newBreakpoint !== breakpoint) {
            setBreakpoint(newBreakpoint);
        }
    }, [inner, theme]);
    react.useEffect(function () {
        var newChocoStyle = getChocoStyle(cs);
        if (JSON.stringify(newChocoStyle) !== JSON.stringify(css)) {
            setCss(newChocoStyle);
        }
    }, [cs, breakpoint]);
    return css;
}

function chocoPropsToChocoStyle(csp) {
    var keys = Object.keys(csp);
    var chocoProps = keys.reduce(function (acc, key) {
        var prop = csp[key];
        if (KeywordsChocoStyleDef.includes(key)) {
            acc[key] = prop;
        }
        return acc;
    }, {});
    var chocoStyleProps = keys.reduce(function (acc, key) {
        var prop = csp[key];
        if (KeywordsChocoStyleProps.includes(key)) {
            acc[key] = prop;
        }
        return acc;
    }, {});
    var keysProps = Object.keys(chocoStyleProps);
    var newChocoStyle = keysProps.reduce(function (acc, key) {
        var style = chocoStyleProps[key];
        switch (key) {
            //* Keywords
            //? width&height:100% width&height:100view
            case "cs":
                acc = __assign(__assign({}, style), acc);
                break;
            case "full":
                acc.w = "100%";
                acc.h = "100%";
                break;
            case "fullV":
                acc.w = "100vw";
                acc.h = "100vh";
                break;
            //* Display
            //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
            case "dNone":
                acc.dp = null;
                break;
            case "dFlex":
                acc.dp = "f";
                break;
            case "dInline":
                acc.dp = "i";
                break;
            case "dInlineF":
                acc.dp = "if";
                break;
            case "dBlock":
                acc.dp = "b";
                break;
            case "dInlineB":
                acc.dp = "ib";
                break;
            case "dGrid":
                acc.dp = "g";
                break;
            case "dInlineG":
                acc.dp = "ig";
                break;
            case "dTable":
                acc.dp = "t";
                break;
            case "dInlineT":
                acc.dp = "it";
                break;
            //* Flex direction
            //? row reverse-row reverse-column column
            case "row":
                acc.fd = "r";
                break;
            case "rRow":
                acc.fd = "rr";
                break;
            case "column":
                acc.fd = "c";
                break;
            case "rColumn":
                acc.fd = "cr";
                break;
            //* Flex wrap
            case "fWrap":
                acc.fw = style;
                break;
            //* Align content
            //? flex-end flex-start center space-around space-between stretch
            case "acEnd":
                acc.ac = "e";
                break;
            case "acStart":
                acc.ac = "s";
                break;
            case "acCenter":
                acc.ac = "c";
                break;
            case "acAround":
                acc.ac = "a";
                break;
            case "acBetween":
                acc.ac = "b";
                break;
            case "acStretch":
                acc.ac = "st";
                break;
            //* Align item
            //? flex-end flex-start center space-around space-between stretch
            case "aEnd":
                acc.a = "e";
                break;
            case "aStart":
                acc.a = "s";
                break;
            case "aCenter":
                acc.a = "c";
                break;
            case "aAround":
                acc.a = "a";
                break;
            case "aBetween":
                acc.a = "b";
                break;
            case "aStretch":
                acc.a = "st";
                break;
            //* Justify content
            //? flex-end flex-start center space-around space-between space-evenly
            case "jStart":
                acc.j = "s";
                break;
            case "jEnd":
                acc.j = "e";
                break;
            case "jCenter":
                acc.j = "c";
                break;
            case "jAround":
                acc.j = "a";
                break;
            case "jBetween":
                acc.j = "b";
                break;
            case "jEvenly":
                acc.j = "ev";
                break;
            //* Text align
            //? end left start right center justify
            case "tEnd":
                acc.text = "e";
                break;
            case "tStart":
                acc.text = "s";
                break;
            case "tLeft":
                acc.text = "l";
                break;
            case "tRight":
                acc.text = "r";
                break;
            case "tCenter":
                acc.text = "c";
                break;
            case "tJustify":
                acc.text = "j";
                break;
            //* Position
            //? static relative absolute fixed sticky
            case "pos":
                acc.pos = style;
                break;
            case "posR":
                acc.pos = "r";
                break;
            case "posA":
                acc.pos = "a";
                break;
            case "posF":
                acc.pos = "f";
                break;
            case "posS":
                acc.pos = "s";
                break;
        }
        return acc;
    }, {});
    var chocoStyle = __assign(__assign({}, chocoProps), newChocoStyle);
    return chocoStyle;
}

function removeReservedProps(reservedKeywords, props) {
    return reservedKeywords.reduce(function (acc, keyword) {
        if (props[keyword] !== undefined) {
            delete acc[keyword];
        }
        return acc;
    }, props);
}
function Styled(tag) {
    return function (customStyles) {
        return function (props) {
            var _a;
            var theme = useTheme();
            var customStyleProps = (_a = (customStyles && typeof customStyles === "function"
                ? customStyles({ theme: theme })
                : customStyles)) !== null && _a !== void 0 ? _a : {};
            var customStyle = __assign({}, customStyleProps);
            var customChocoStyle = keysChocoStyle.reduce(function (acc, key) {
                if (customStyleProps[key] !== undefined) {
                    acc[key] = customStyleProps[key];
                    delete customStyle[key];
                }
                return acc;
            }, {});
            var cs = props.cs;
            var chocoStyle = chocoPropsToChocoStyle(props);
            var css = ChocoStyleToStyle(__assign(__assign(__assign({}, customChocoStyle), chocoStyle), cs));
            var style = __assign(__assign(__assign({}, customStyle), props.style), css);
            var prop = __assign(__assign({}, props), { style: style });
            var newProps = removeReservedProps(keysChocoStyleProps, prop);
            var Tag = tag;
            return jsxRuntime.jsx(Tag, __assign({}, newProps));
        };
    };
}

//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/custom/font.ts"
function getFont(size) {
    var fonts = ChocoTheme.fonts;
    var css = {
        fontFamily: fonts.family,
        fontWeight: fonts.weight[size !== null && size !== void 0 ? size : "regular"],
    };
    return css;
}

//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/custom/ComponentSize.tsx"
function ComponentSize(_a) {
    var _b = _a.size, size = _b === void 0 ? 20 : _b, children = _a.children;
    var theme = useTheme();
    var inner = recoil.useRecoilValue(innerAtom);
    var _c = react.useState(), sizes = _c[0], setSizes = _c[1];
    var _d = react.useState(size), value = _d[0], setValue = _d[1];
    react.useEffect(function () {
        if (typeof size === "number") {
            setSizes(formatSize(size));
        }
        else {
            setSizes(size);
        }
    }, [size]);
    react.useEffect(function () {
        var keys = Object.keys(theme.breakpoint);
        keys.map(function (key) {
            var breakpoints = theme.breakpoint[key];
            var matche = inner.width > breakpoints;
            if (matche && (sizes === null || sizes === void 0 ? void 0 : sizes[key]) !== undefined) {
                setValue(sizes[key]);
            }
        });
    }, [sizes, inner]);
    return children(value);
}

var Box = Styled("div")();
function CBox(props) {
    return jsxRuntime.jsx(Box, __assign({}, props));
}

var Skeleton = Styled("div")({
    of: "h",
    pos: "r",
    bgColor: "#ffffff22",
});
function CSkeleton(prop) {
    var _a, _b, _c, _d;
    var props = __assign({}, prop);
    var circle = props.circle;
    delete props.circle;
    var textSc = {
        borR: 2,
        minH: (_b = (_a = props.style) === null || _a === void 0 ? void 0 : _a.fontSize) !== null && _b !== void 0 ? _b : 16,
    };
    var circleSc = {
        borR: "50%",
        h: (_c = props.size) !== null && _c !== void 0 ? _c : 64,
        w: (_d = props.size) !== null && _d !== void 0 ? _d : 64,
    };
    if (circle) {
        props.cs = __assign(__assign({}, props.cs), circleSc);
    }
    else {
        props.cs = __assign(__assign({}, props.cs), textSc);
    }
    var keyframes = "\n    @keyframes CSkeleton {\n        from {\n            transform: translate(-200%);\n        }\n        to {\n            transform: translate(200%);\n        }\n    }\n    ";
    var styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes);
    props.children = (jsxRuntime.jsx(Skeleton, { posA: true, t: 0, l: 0, w: "20vh", h: "20vh", bgColor: "#ffffff22", style: {
            boxShadow: "0 0 10vh 10vh #ffffff22",
            animation: "CSkeleton 2s linear infinite",
        } }));
    return jsxRuntime.jsx(Skeleton, __assign({}, props));
}

var Text = Styled("span")({ size: 16 });
function CText(prop) {
    var style = getFont();
    var props = __assign({}, prop);
    var skeleton = prop.skeleton;
    delete props.skeleton;
    if (skeleton) {
        props.cs = __assign({ w: "100%", h: "1.2em" }, props.cs);
        return jsxRuntime.jsx(CSkeleton, __assign({}, props));
    }
    props.style = __assign(__assign({}, props.style), style);
    return jsxRuntime.jsx(Text, __assign({}, props));
}

var Paper = Styled("div")(function (_a) {
    var theme = _a.theme;
    return ({
        borR: 1,
        color: theme.palette.text.primary,
        bgColor: theme.palette.background.paper,
        boxShadow: "0px 2px 1px -1px ".concat(theme.palette.shadow.main),
    });
});
function getElevation(elevation) {
    if (elevation !== undefined && elevation < 10) {
        return "".concat(elevation).concat(elevation);
    }
    switch (elevation) {
        case 10:
            return "AA";
        case 11:
            return "BB";
        case 12:
            return "CC";
        case 13:
            return "DD";
        case 14:
            return "EE";
        default:
            return "FF";
    }
}
function CPaper(prop) {
    var palette = useTheme().palette;
    var elevation = prop.elevation;
    var props = __assign({}, prop);
    delete props.elevation;
    var opacity = getElevation(elevation !== null && elevation !== void 0 ? elevation : 0);
    var bg = "".concat(palette.text.primary).concat(opacity);
    props.cs = __assign({ bgImage: "linear-gradient(".concat(bg, ", ").concat(bg, ")") }, props.cs);
    return jsxRuntime.jsx(Paper, __assign({}, props));
}

//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/hook/GetSetColor.tsx"
function GetSetColor() {
    var palette = useTheme().palette;
    return function (color) {
        var _a, _b, _c, _d, _e;
        var Color = {};
        switch (color !== null && color !== void 0 ? color : "secondary") {
            //*common
            case "paper":
                Color = {
                    color: palette.text.primary,
                    bgColor: palette.background.paper,
                    bgHover: palette.background.default,
                    action: palette.text.disabled,
                };
                break;
            case "inherit":
                Color = {
                    color: palette.background.default,
                    bgColor: null,
                    bgHover: palette.text.disabled,
                    action: palette.text.primary,
                };
                break;
            //*text
            case "disabled":
                Color = {
                    color: palette.text.disabled,
                    bgColor: palette.shadow.main,
                    bgHover: palette.shadow.dark,
                    action: palette.shadow.light,
                };
                break;
            case "text":
                Color = {
                    color: palette.text.primary,
                    bgColor: null,
                    bgHover: palette.text.disabled,
                    action: palette.primary.textDisabled,
                };
                break;
            //*primary
            case "primary":
                Color = {
                    color: palette.primary.text,
                    bgColor: palette.primary.main,
                    bgHover: palette.primary.dark,
                    action: palette.primary.textDisabled,
                };
                break;
            //*secondary
            case "secondary":
                Color = {
                    color: palette.secondary.text,
                    bgColor: palette.secondary.main,
                    bgHover: palette.secondary.dark,
                    action: palette.secondary.textDisabled,
                };
                break;
            case "secondaryText":
                Color = {
                    bgColor: null,
                    color: palette.secondary.main,
                    action: palette.secondary.dark,
                    bgHover: "".concat((_a = palette.secondary.dark) !== null && _a !== void 0 ? _a : palette.secondary.main, "66"),
                };
                break;
            //*error
            case "error":
                Color = {
                    color: palette.error.text,
                    bgColor: palette.error.main,
                    bgHover: palette.error.dark,
                    action: palette.error.textDisabled,
                };
                break;
            case "errorText":
                Color = {
                    bgColor: null,
                    color: palette.error.main,
                    action: palette.error.dark,
                    bgHover: "".concat((_b = palette.error.dark) !== null && _b !== void 0 ? _b : palette.error.main, "66"),
                };
                break;
            //*warning
            case "warning":
                Color = {
                    color: palette.warning.text,
                    bgColor: palette.warning.main,
                    bgHover: palette.warning.dark,
                    action: palette.warning.textDisabled,
                };
                break;
            case "warningText":
                Color = {
                    bgColor: null,
                    color: palette.warning.main,
                    action: palette.warning.dark,
                    bgHover: "".concat((_c = palette.warning.dark) !== null && _c !== void 0 ? _c : palette.warning.main, "66"),
                };
                break;
            //*info
            case "info":
                Color = {
                    color: palette.info.text,
                    bgColor: palette.info.main,
                    bgHover: palette.info.dark,
                    action: palette.info.textDisabled,
                };
                break;
            case "infoText":
                Color = {
                    bgColor: null,
                    color: palette.info.main,
                    action: palette.info.dark,
                    bgHover: "".concat((_d = palette.info.dark) !== null && _d !== void 0 ? _d : palette.info.main, "66"),
                };
                break;
            //*success
            case "success":
                Color = {
                    color: palette.success.text,
                    bgColor: palette.success.main,
                    bgHover: palette.success.dark,
                    action: palette.success.textDisabled,
                };
                break;
            case "successText":
                Color = {
                    bgColor: null,
                    color: palette.success.main,
                    action: palette.success.dark,
                    bgHover: "".concat((_e = palette.success.dark) !== null && _e !== void 0 ? _e : palette.success.main, "66"),
                };
                break;
            default:
                var colors = palette[color];
                Color = { color: colors ? colors.main : color };
                break;
        }
        return Color;
    };
}

var Button = Styled("button")();
var Effect = Styled("span")({
    op: 0,
    pos: "a",
    borR: "50%",
    pointerEvents: "none",
});
function CButton(prop) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var navigate = reactRouterDom.useNavigate();
    var getSetColor = GetSetColor();
    var fontStyle = getFont("medium");
    var props = __assign({}, prop);
    var _j = react.useState(false), isHover = _j[0], setIsHover = _j[1];
    var _k = react.useState(false), isAnimating = _k[0], setIsAnimating = _k[1];
    var to = props.to, color = props.color, lowcase = props.lowcase, outline = props.outline, children = props.children, disabled = props.disabled, onClick = props.onClick, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave;
    var buttonColor = getSetColor(color);
    delete props.to;
    delete props.color;
    delete props.lowcase;
    delete props.outline;
    delete props.bgColor;
    delete props.children;
    delete props.onClick;
    delete props.onMouseEnter;
    delete props.onMouseLeave;
    var defaultColor = "text";
    var disabledColor = 88;
    var getColor = function (color, disabled) {
        var _a;
        if (disabled === void 0) { disabled = disabledColor; }
        return typeof color !== "string"
            ? color
            : ((_a = color === null || color === void 0 ? void 0 : color.length) !== null && _a !== void 0 ? _a : 0) > 7
                ? color
                : "".concat(color).concat(disabled);
    };
    if (outline) {
        props.border = {
            size: 2,
            style: "solid",
            color: disabled
                ? getColor(buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.bgColor)
                : (_a = buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.bgColor) !== null && _a !== void 0 ? _a : defaultColor,
        };
        props.color = (disabled
            ? getColor(buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.bgColor)
            : (_b = buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.bgColor) !== null && _b !== void 0 ? _b : defaultColor);
        props.bgColor = isHover
            ? getColor(buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.bgHover, disabledColor / 2)
            : null;
    }
    else {
        props.color = (disabled
            ? getColor(buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.color)
            : (_c = buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.color) !== null && _c !== void 0 ? _c : defaultColor);
        props.bgColor = isHover
            ? buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.bgHover
            : disabled
                ? getColor(buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.bgColor)
                : buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.bgColor;
    }
    var style = ChocoStyleToStyle({
        a: "c",
        j: "c",
        of: "h",
        dp: "if",
        pos: "r",
        animation: 0.3,
        gap: formatSize(4),
        borR: formatSize(2),
        size: (_d = props.size) !== null && _d !== void 0 ? _d : 16,
        py: formatSize((((_e = props.size) !== null && _e !== void 0 ? _e : 16) / 16) * 4),
        px: formatSize((((_f = props.size) !== null && _f !== void 0 ? _f : 16) / 16) * 8),
    });
    var keyframes = "\n        @keyframes CButton-ripple {\n            0% {\n                opacity: 0;\n                transform: scale(0);\n            }\n            70% {\n                opacity: 0.6;\n                transform: scale(2);\n            }\n            100% {\n                opacity: 0;\n                transform: scale(2);\n            }\n        }\n        ";
    var styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes);
    props.style = __assign(__assign(__assign(__assign({}, fontStyle), style), { border: "none" }), props.style);
    if (!lowcase) {
        props.style = __assign({ textTransform: "uppercase" }, props.style);
    }
    return (jsxRuntime.jsxs(Button, __assign({}, props, { onMouseEnter: function (event) {
            setIsHover(true);
            if (onMouseEnter) {
                onMouseEnter(event);
            }
        }, onMouseLeave: function (event) {
            setIsHover(false);
            if (onMouseLeave) {
                onMouseLeave(event);
            }
        }, onClick: function (event) {
            setIsAnimating(false);
            setTimeout(function () {
                setIsAnimating(true);
            }, 1);
            if (to !== undefined) {
                navigate(to);
            }
            if (onClick) {
                onClick(event);
            }
        }, children: [children, jsxRuntime.jsx(Effect, { bgColor: buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.action, h: formatSize(((_g = props.size) !== null && _g !== void 0 ? _g : 16) * 8), w: formatSize(((_h = props.size) !== null && _h !== void 0 ? _h : 16) * 8), style: {
                    animation: isAnimating
                        ? "CButton-ripple 0.5s linear forwards"
                        : "",
                } })] })));
}

function InitChoco(_a) {
    var children = _a.children;
    return (jsxRuntime.jsx(recoil.RecoilRoot, { children: jsxRuntime.jsx(ChocoStart, { children: children }) }));
}

//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/types/color.ts"
var ColorDefault = {
    INFO: "info",
    ERROR: "error",
    PRIMARY: "primary",
    WARNING: "warning",
    SUCCESS: "success",
    SECONDARY: "secondary",
};
var ColorText = {
    INFO: "infoText",
    ERROR: "errorText",
    PRIMARY: "primaryText",
    WARNING: "warningText",
    SUCCESS: "successText",
    SECONDARY: "secondaryText",
};
var ColorCommon = {
    TEXT: "text",
    PAPER: "paper",
    INHERIT: "inherit",
    DISABLED: "disabled",
};

exports.CBox = CBox;
exports.CButton = CButton;
exports.CPaper = CPaper;
exports.CSkeleton = CSkeleton;
exports.CText = CText;
exports.ChocoStart = ChocoStart;
exports.ChocoStyleToStyle = ChocoStyleToStyle;
exports.ChocoTheme = ChocoTheme;
exports.ColorCommon = ColorCommon;
exports.ColorDefault = ColorDefault;
exports.ColorText = ColorText;
exports.ComponentSize = ComponentSize;
exports.GetColor = GetColor;
exports.GetSetColor = GetSetColor;
exports.InitChoco = InitChoco;
exports.KeywordsChocoStyle = KeywordsChocoStyle;
exports.KeywordsChocoStyleDef = KeywordsChocoStyleDef;
exports.KeywordsChocoStyleProps = KeywordsChocoStyleProps;
exports.Styled = Styled;
exports.callbackSize = callbackSize;
exports.chocoPropsToChocoStyle = chocoPropsToChocoStyle;
exports.formatSize = formatSize;
exports.getFont = getFont;
exports.getThemeMode = getThemeMode;
exports.innerAtom = innerAtom;
exports.keysChocoStyle = keysChocoStyle;
exports.keysChocoStyleProps = keysChocoStyleProps;
exports.removeReservedProps = removeReservedProps;
exports.themeModeAtom = themeModeAtom;
exports.useTheme = useTheme;
//# sourceMappingURL=index.js.map
