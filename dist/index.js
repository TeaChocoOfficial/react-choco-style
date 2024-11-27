'use strict';

var jsxRuntime = require('react/jsx-runtime');
var recoil = require('recoil');
var react = require('react');

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

//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/theme/theme.ts"
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
    "size",
    "borR",
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
        width: window.innerWidth,
        height: window.innerHeight,
    },
});
function ChocoStart(_a) {
    var children = _a.children;
    var setInner = recoil.useSetRecoilState(innerAtom);
    react.useEffect(function () {
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
    var inner = recoil.useRecoilValue(innerAtom);
    var _a = react.useState({}), css = _a[0], setCss = _a[1];
    var _b = react.useState(getBreakpoint()), breakpoint = _b[0], setBreakpoint = _b[1];
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
    function sizeToCss(size, time, unit) {
        if (size) {
            if (typeof size === "string") {
                return size;
            }
            else if (typeof size === "number") {
                return "".concat(size * (time !== null && time !== void 0 ? time : 1)).concat(unit !== null && unit !== void 0 ? unit : "px");
            }
            else {
                var keys = Object.keys(theme.breakpoint);
                var currentSize_1;
                var sizes = keys.reduce(function (acc, key) {
                    if (size[key]) {
                        currentSize_1 = size[key];
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
        var timeBox = 4;
        var timeText = 1 / 16;
        var newCss = removeReservedProps(__spreadArray(__spreadArray([], KeywordsChocoStyleDef, true), KeywordsChocoStyle, true), __assign({}, chocostyle));
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
        if (chocostyle.w !== undefined) {
            newCss.width = sizeToCss(chocostyle.w);
        }
        if (chocostyle.h !== undefined) {
            newCss.height = sizeToCss(chocostyle.h);
        }
        if (chocostyle.i !== undefined) {
            newCss.inset = sizeToCss(chocostyle.i, timeBox);
        }
        else {
            if (chocostyle.x !== undefined) {
                newCss.left = sizeToCss(chocostyle.x, timeBox);
                newCss.right = sizeToCss(chocostyle.x, timeBox);
            }
            else {
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
            }
            else {
                if (chocostyle.t !== undefined) {
                    newCss.top = sizeToCss(chocostyle.t, timeBox);
                }
                if (chocostyle.b !== undefined) {
                    newCss.bottom = sizeToCss(chocostyle.b, timeBox);
                }
            }
        }
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
        if (chocostyle.borR !== undefined) {
            newCss.borderRadius = sizeToCss(chocostyle.borR, timeBox);
        }
        if (chocostyle.fontS !== undefined) {
            newCss.fontSize = sizeToCss(chocostyle.fontS, timeText, "rem");
        }
        if (chocostyle.size !== undefined) {
            var fontSize = formatSize(chocostyle.size);
            newCss.fontSize = sizeToCss(fontSize, timeText, "rem");
        }
        if (chocostyle.op !== undefined) {
            newCss.opacity = chocostyle.op * 0.01;
        }
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
        if (chocostyle.fw !== undefined) {
            newCss.flexWrap = chocostyle.fw ? "wrap" : "nowrap";
        }
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
                newCss.alignContent = "space-around";
                break;
            case "a":
                newCss.alignContent = "stretch";
                break;
            case "b":
                newCss.alignContent = "baseline";
                break;
            case "st":
                newCss.alignContent = "stretch";
                break;
        }
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
                newCss.alignItems = "space-around";
                break;
            case "a":
                newCss.alignItems = "stretch";
                break;
            case "b":
                newCss.alignItems = "baseline";
                break;
            case "st":
                newCss.alignItems = "stretch";
                break;
        }
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
    react.useEffect(function () {
        var newBreakpoint = getBreakpoint();
        if (newBreakpoint !== breakpoint) {
            setBreakpoint(newBreakpoint);
        }
    }, [inner.width, theme.breakpoint]);
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
            var prop = __assign(__assign({}, props), { style: __assign(__assign(__assign({}, customStyle), props.style), css) });
            var newProps = removeReservedProps(keysChocoStyleProps, prop);
            var Tag = tag;
            return jsxRuntime.jsx(Tag, __assign({}, newProps));
        };
    };
}

//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/custom/font.ts"
function getFont() {
    var fonts = ChocoTheme.fonts;
    var css = {
        fontFamily: fonts.family,
        fontWeight: fonts.weight,
    };
    return css;
}

//-Path: "react-choco-style/src/components/custom/ComponentSize.tsx"
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

var Text = Styled("p")();
function CText(prop) {
    var style = getFont();
    var props = __assign({}, prop);
    props.style = __assign(__assign({}, props.style), style);
    return jsxRuntime.jsx(Text, __assign({}, props));
}

function InitChoco(_a) {
    var children = _a.children;
    return (jsxRuntime.jsx(recoil.RecoilRoot, { children: jsxRuntime.jsx(ChocoStart, { children: children }) }));
}

exports.CBox = CBox;
exports.CText = CText;
exports.ChocoStart = ChocoStart;
exports.ChocoStyleToStyle = ChocoStyleToStyle;
exports.ChocoTheme = ChocoTheme;
exports.ComponentSize = ComponentSize;
exports.InitChoco = InitChoco;
exports.KeywordsChocoStyle = KeywordsChocoStyle;
exports.KeywordsChocoStyleDef = KeywordsChocoStyleDef;
exports.KeywordsChocoStyleProps = KeywordsChocoStyleProps;
exports.Styled = Styled;
exports.callbackSize = callbackSize;
exports.chocoPropsToChocoStyle = chocoPropsToChocoStyle;
exports.formatSize = formatSize;
exports.getFont = getFont;
exports.innerAtom = innerAtom;
exports.keysChocoStyle = keysChocoStyle;
exports.keysChocoStyleProps = keysChocoStyleProps;
exports.removeReservedProps = removeReservedProps;
exports.themeModeAtom = themeModeAtom;
exports.useTheme = useTheme;
//# sourceMappingURL=index.js.map
