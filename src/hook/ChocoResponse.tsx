//-Path: "react-choco-style/src/hook/ChocoResponse.tsx"
import {
    CsType,
    StyleTypes,
    StyledType,
    GridAreaType,
    LinesStyleType,
    ChocoStyleType,
    NestedStyleTypes,
    GridTemplateType,
    ChocoStyleDefType,
    ChocoStylePropsType,
} from '../types/choco';
import {
    keysChocoStyle,
    KeywordsChocoStyleDef,
} from '../data/reservedKeywords';
import { Obj } from '../custom/obj';
import { Ary } from '../custom/ary';
import { SxType } from '../types/style';
import { useFormat } from './ChocoFormat';
import { ChocoColor } from '../theme/color';
import { ColorsType } from '../types/color';
import { useCallback, useMemo } from 'react';
import { useFont, useTheme } from './ChocoStyle';
import { Sizes, SizeValue } from '../types/size';
import { CustomStylesPropsType } from '../types/chocoHook';
import { useGetColor, useGetsetClrProps } from './ChocoColor';

// export class ChocoResponse {}

export function useResponseCs() {
    const theme = useTheme();
    const { getFont } = useFont();
    const getSetClrProps = useGetsetClrProps();
    const { formatSize, callbackSize } = useFormat();

    const CustomStylesProps: CustomStylesPropsType = {
        theme,
        getFont,
        formatSize,
        callbackSize,
        getSetClrProps,
    };

    return useCallback(
        (cs?: CsType): StyleTypes => {
            if (typeof cs === 'function') {
                const styles = cs(CustomStylesProps);
                return styles || {};
            }
            const styles = cs || {};
            return styles;
        },
        [theme, getFont, formatSize, callbackSize, getSetClrProps],
    );
}

export function mergeNestedStyles(
    style1: StyleTypes,
    style2: StyleTypes,
): StyleTypes {
    const result: StyleTypes = { ...style1 };
    for (const keyStyle in style2) {
        const key = keyStyle as keyof StyleTypes;
        if (Object.hasOwn(style2, key)) {
            const value1 = style1[key];
            const value2 = style2[key];

            if (key.startsWith('&') || key.startsWith('@')) {
                if (Obj.isObject(value1) && Obj.isObject(value2)) {
                    result[key as keyof NestedStyleTypes] = {
                        ...(value1 as object),
                        ...(value2 as object),
                    };
                } else if (value2 !== undefined) {
                    result[key as keyof NestedStyleTypes] =
                        value2 as NestedStyleTypes;
                }
            } else if (value2 !== undefined) {
                result[key as keyof NestedStyleTypes] =
                    value2 as NestedStyleTypes;
            }
        }
    }

    return result;
}

export function useMixCsProps() {
    const responseCs = useResponseCs();

    return useCallback((...chocoStyles: (CsType | undefined)[]): StyleTypes => {
        const validStyles = chocoStyles
            .filter((style) => style !== undefined)
            .map((style) => responseCs(style));
        if (validStyles.length === 0) {
            return {};
        }
        return validStyles.reduce<StyleTypes>(
            (acc, current) => mergeNestedStyles(acc, current),
            {},
        );
    }, []);
}

export function useChocoStyle<Styles extends StyledType | SxType>(): (
    styles: CsType,
    innerWidth?: number,
) => Styles {
    const theme = useTheme();
    const getColor = useGetColor();
    const responseCs = useResponseCs();
    const { callbackSize, formatSize, isSize } = useFormat();

    return useMemo(() => {
        const chocoStyle = (
            chocostyle: CsType = {},
            innerWidth?: number,
        ): Styles => {
            const styles = responseCs(chocostyle);

            const keysChocostyle = Object.keys(
                styles,
            ) as (keyof ChocoStyleType)[];

            const CssProperties: SxType = keysChocostyle.reduce<
                Record<string, SizeValue>
            >((acc, key) => {
                if (!keysChocoStyle.includes(key as keyof ChocoStyleDefType)) {
                    acc[key] = styles[key] as SizeValue;
                }
                if (key.startsWith('&')) {
                    acc[key] = chocoStyle(
                        styles[key] as StyleTypes,
                        innerWidth,
                    ) as SizeValue;
                }
                return acc;
            }, {});

            const {
                timePadding = theme.root.response.padding,
                timeBorder = theme.root.response.border,
                timeText = 1 / theme.root.response.text,
                timeBorR = theme.root.response.borR,
                textUnit = theme.root.unit.text,
            } = {};

            // ฟังก์ชันช่วยแปลง sizes
            const toSizes = <Value, NewValue extends string = 'none'>(
                value?: Sizes<Value>,
                option: {
                    none?: boolean | NewValue;
                    time?: number;
                    unit?: string;
                    autoFormat?: boolean;
                } = {
                    time: 1,
                    unit: 'px',
                    autoFormat: true,
                },
            ): Sizes<NewValue> | undefined => {
                const {
                    none,
                    time = 1,
                    unit = 'px',
                    autoFormat = true,
                } = option;
                const Null = none === true ? 'none' : none;
                if (value === undefined) return undefined;
                if (value === null && none !== undefined)
                    return Null as NewValue;
                if (typeof value === 'string')
                    return value as unknown as NewValue;
                if (typeof value === 'number')
                    return autoFormat && value < 0
                        ? (callbackSize(-value, (v) =>
                              typeof v === 'number' ? `${v * time}${unit}` : v,
                          ) as Sizes<NewValue>)
                        : (`${value * time}${unit}` as NewValue);
                if (isSize(value)) {
                    return callbackSize(value, (v) =>
                        v === null && none !== undefined
                            ? Null
                            : typeof v === 'number'
                            ? `${v * time}${unit}`
                            : v,
                    ) as Sizes<NewValue>;
                }
            };
            // ฟังก์ชันช่วยแปลง size
            const toSize = <Value, NewValue extends string = 'none'>(
                value?: Sizes<Value>,
                option: {
                    none?: boolean | NewValue;
                    time?: number;
                    unit?: string;
                    autoFormat?: boolean;
                } = {
                    time: 1,
                    unit: 'px',
                    autoFormat: true,
                },
            ): Sizes<NewValue> | undefined => {
                const sizes = toSizes(value, option);
                if (innerWidth !== undefined && isSize(sizes)) {
                    const { size } = theme.breakpoint;
                    const breakpoints = Obj.entries(size).sort(
                        ([, a], [, b]) => b - a,
                    );
                    for (const [key, value] of breakpoints)
                        if (innerWidth > value) return sizes[key];

                    const high = sizes[breakpoints[0][0]];
                    const low = sizes[Ary.last(breakpoints)[0]];
                    return high === undefined ? low : high;
                } else {
                    return sizes;
                }
            };

            // ฟังก์ชันช่วยแปลง color
            const toColor = (color?: Sizes<ColorsType>) => {
                if (color === undefined) return undefined;
                const toHex = (chocoColor: ColorsType) =>
                    chocoColor instanceof ChocoColor
                        ? chocoColor.hex()
                        : chocoColor;
                if (isSize(color))
                    return callbackSize(color, (color: ColorsType) =>
                        toHex(getColor(color)),
                    );
                // console.log(
                //     color,
                //     getColor(color as ColorsType),
                //     toHex(getColor(color as ColorsType)),
                // );
                return toHex(getColor(color as ColorsType));
            };

            // ฟังก์ชันตั้งค่า CSS
            const setCss = (key: keyof SxType, value: Sizes) => {
                if (value !== undefined) {
                    (CssProperties as Record<string, Sizes>)[key] = value;
                }
            };

            // Inset (padding, margin, gap ฯลฯ)
            const setInset = (
                key: keyof SxType,
                value: Sizes,
                sides: Record<string, [keyof SxType, Sizes]>,
                option: {
                    time?: number;
                    autoFormat?: boolean;
                } = { time: 1, autoFormat: true },
            ) => {
                const { time = 1, autoFormat = true } = option;
                if (value) setCss(key, toSize(value, { time }));
                Object.entries(sides).forEach(([_, [sideKey, sideVal]]) => {
                    if (sideVal !== undefined)
                        setCss(sideKey, toSize(sideVal, { time, autoFormat }));
                });
            };

            // Border
            const toBorder = (
                border: LinesStyleType | string | null | undefined,
            ): Sizes<string> | undefined => {
                if (border === null) return 'none';
                if (typeof border === 'string') return border;
                if (border) {
                    const {
                        width,
                        style = 'solid',
                        color = 'secondary',
                    } = border;
                    const borderWidth =
                        typeof width === 'number' && width < 0
                            ? formatSize(-width)
                            : width ?? theme.root.size.border;
                    const borderSize = toSize(borderWidth, {
                        time: timeBorder,
                    });
                    if (typeof borderSize === 'string') {
                        return `${borderSize} ${style} ${getColor(color)}`;
                    }
                    return callbackSize(
                        borderSize,
                        (s) => `${s} ${style} ${getColor(color)}`,
                    );
                }
            };

            // Grid Template
            const toGridTemplate = (template: GridTemplateType): string => {
                return !Array.isArray(template)
                    ? template
                    : template
                          ?.map((row) =>
                              row
                                  .map((col) =>
                                      typeof col === 'number'
                                          ? `${col}fr`
                                          : col,
                                  )
                                  .join(' '),
                          )
                          .join(' / ');
            };

            const toGridArea = (area: GridAreaType): string =>
                area
                    ?.map((area, index) =>
                        (index > 0 ? area.map((a) => `span ${a}`) : area).join(
                            ' / ',
                        ),
                    )
                    ?.join(' / ');

            // Switch
            const setSwitch = (
                key: keyof SxType,
                value: Sizes,
                map: Record<string, SxType[keyof SxType]>,
            ) => {
                if (value === undefined) return;
                const getMappedValue = (val: unknown) => {
                    // console.log(val);
                    return val === null
                        ? map['null']
                        : map[val as keyof SxType];
                };
                if (isSize(value)) {
                    setCss(
                        key,
                        callbackSize(value, (sizeValue, sizekey) =>
                            getMappedValue(sizeValue),
                        ) as Sizes,
                    );
                } else {
                    setCss(key, getMappedValue(value) as Sizes);
                }
            };
            //* Style
            //? background color background-color
            setCss('background', toSize(styles.bg));
            setCss('color', toColor(styles.clr));
            setCss('backgroundColor', toColor(styles.bgClr));
            setCss('backgroundImage', toSize(styles.bgImg, { none: true }));
            setCss('boxShadow', toSize(styles.bShadow, { none: true }));
            setCss('textShadow', toSize(styles.tShadow, { none: true }));
            //* Opacity
            setCss('opacity', toSize(styles.op, { time: 1, unit: '' }));
            //* z-index
            setCss(
                'zIndex',
                toSize(styles.z, { time: 1, unit: '', autoFormat: false }),
            );
            //* Width and Height
            setCss('width', toSize(styles.wh) ?? toSize(styles.w));
            setCss('height', toSize(styles.wh) ?? toSize(styles.h));
            setCss('minWidth', toSize(styles.minWH) ?? toSize(styles.minW));
            setCss('minHeight', toSize(styles.minWH) ?? toSize(styles.minH));
            setCss('maxWidth', toSize(styles.maxWH) ?? toSize(styles.maxW));
            setCss('maxHeight', toSize(styles.maxWH) ?? toSize(styles.maxH));
            //* inset
            //? all top bottom left right left&right top&bottom
            setInset(
                'inset',
                styles.i,
                {
                    x: ['left', styles.x],
                    ['x-r']: ['right', styles.x],
                    y: ['top', styles.y],
                    ['y-b']: ['bottom', styles.y],
                    l: ['left', styles.l],
                    r: ['right', styles.r],
                    t: ['top', styles.t],
                    b: ['bottom', styles.b],
                },
                { autoFormat: false },
            );
            //* Padding
            //? all top bottom left right left&right top&bottom
            setInset(
                'padding',
                styles.p,
                {
                    x: ['paddingLeft', styles.px],
                    ['x-r']: ['paddingRight', styles.px],
                    y: ['paddingTop', styles.py],
                    ['y-b']: ['paddingBottom', styles.py],
                    l: ['paddingLeft', styles.pl],
                    r: ['paddingRight', styles.pr],
                    t: ['paddingTop', styles.pt],
                    b: ['paddingBottom', styles.pb],
                },
                { time: timePadding },
            );
            //* Margin
            //? all top bottom left right left&right top&bottom
            setInset(
                'margin',
                styles.m,
                {
                    x: ['marginLeft', styles.mx],
                    ['x-r']: ['marginRight', styles.mx],
                    y: ['marginTop', styles.my],
                    ['y-b']: ['marginBottom', styles.my],
                    l: ['marginLeft', styles.ml],
                    r: ['marginRight', styles.mr],
                    t: ['marginTop', styles.mt],
                    b: ['marginBottom', styles.mb],
                },
                { time: timePadding },
            );
            //* Gap
            //? all row column
            setInset(
                'gap',
                styles.g,
                { y: ['rowGap', styles.gy], x: ['columnGap', styles.gx] },
                { time: timePadding },
            );
            //* FontSize
            setCss(
                'fontSize',
                toSize(styles.sz, { time: timeText, unit: textUnit }),
            );
            setCss(
                'fontSize',
                toSize(styles.fontS, { time: timeText, unit: textUnit }),
            );
            //* Grids
            //? grid-template grid-area
            if (styles.gridT !== undefined) {
                if (isSize(styles.gridT)) {
                    setCss(
                        'gridTemplate',
                        callbackSize(styles.gridT, toGridTemplate),
                    );
                } else {
                    setCss(
                        'gridTemplate',
                        toGridTemplate(styles.gridT as GridTemplateType),
                    );
                }
            }
            if (styles.gridA !== undefined) {
                if (isSize(styles.gridA)) {
                    setCss('gridArea', callbackSize(styles.gridA, toGridArea));
                } else {
                    setCss(
                        'gridArea',
                        toGridArea(styles.gridA as GridAreaType),
                    );
                }
            }
            //* Border
            setCss('borderWidth', toSize(styles.borW, { time: timeBorder }));
            setCss('borderRadius', toSize(styles.borR, { time: timeBorR }));
            setCss('borderStyle', toSize(styles.borS));
            setCss('borderColor', toColor(styles.borClr));
            // if (styles.borders) console.log(toBorder(styles.borders));
            setCss('border', toBorder(styles.borders));
            ['borderTop', 'borderBottom'].forEach((k) =>
                setCss(
                    k as keyof SxType,
                    toBorder(
                        styles.borderY ??
                            styles[k === 'borderTop' ? 'borderT' : 'borderB'],
                    ),
                ),
            );
            ['borderLeft', 'borderRight'].forEach((k) =>
                setCss(
                    k as keyof SxType,
                    toBorder(
                        styles.borderX ??
                            styles[k === 'borderLeft' ? 'borderL' : 'borderR'],
                    ),
                ),
            );

            //* Outline
            setCss('outline', toBorder(styles.outlines));

            //* transition
            setCss(
                'transition',
                styles.trans !== undefined
                    ? isSize(styles.trans)
                        ? callbackSize(styles.trans, (trans) =>
                              typeof trans === 'string' ? trans : `${trans}s`,
                          )
                        : typeof styles.trans === 'string'
                        ? styles.trans
                        : `${styles.trans}s`
                    : undefined,
            );

            //* Transform
            setCss(
                'transform',
                toSize(styles.form, { unit: '', autoFormat: false }),
            );
            if (styles.transformCenter) {
                const centers = {
                    all: ['50%', '50%', 'translate(-50%, -50%)'],
                    x: ['50%', null, 'translateX(-50%)'],
                    y: [null, '50%', 'translateY(-50%)'],
                };
                const [top, left, transform] =
                    centers[styles.transformCenter] || [];
                setCss('top', top);
                setCss('left', left);
                setCss('transform', transform);
            }

            //* Display
            //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
            setSwitch('display', styles.dp, {
                null: 'none',
                f: 'flex',
                b: 'block',
                i: 'inline',
                if: 'inline-flex',
                ib: 'inline-block',
                g: 'grid',
                ig: 'inline-grid',
                t: 'table',
                it: 'inline-table',
            });
            //* Flex direction
            //? unset row reverse-row column reverse-column
            setSwitch('flexDirection', styles.fd, {
                null: 'unset',
                r: 'row',
                rr: 'row-reverse',
                c: 'column',
                cr: 'column-reverse',
                i: 'initial',
            });
            //* Flex wrap
            if (styles.fw !== undefined) {
                setCss('flexWrap', styles.fw ? 'wrap' : 'nowrap');
            }
            //* Align content
            //? unset flex-end flex-start center space-around space-between stretch
            setSwitch('alignContent', styles.ac, {
                null: 'unset',
                e: 'flex-end',
                s: 'flex-start',
                c: 'center',
                a: 'space-around',
                b: 'space-between',
                st: 'stretch',
            });
            //* Align items
            //? unset flex-end flex-start center space-around space-between stretch
            setSwitch('alignItems', styles.a, {
                null: 'unset',
                e: 'flex-end',
                s: 'flex-start',
                c: 'center',
                a: 'space-around',
                b: 'space-between',
                st: 'stretch',
            });
            //* Justify content
            //? unset flex-end flex-start center space-evenly space-around space-between
            setSwitch('justifyContent', styles.j, {
                null: 'unset',
                e: 'flex-end',
                s: 'flex-start',
                c: 'center',
                ev: 'space-evenly',
                a: 'space-around',
                b: 'space-between',
            });

            //* Justify items
            //? unset end start center stretch
            setSwitch('justifyItems', styles.ji, {
                null: 'unset',
                e: 'end',
                s: 'start',
                c: 'center',
                st: 'stretch',
            });

            //* Text align
            //? unset end left start right center justify
            setSwitch('textAlign', styles.text, {
                null: 'unset',
                e: 'end',
                l: 'left',
                s: 'start',
                r: 'right',
                c: 'center',
                j: 'justify',
            });
            //* Position
            //? unset relative absolute fixed static (เปลี่ยนจาก sticky เป็น static ตามโค้ดเดิม)
            setSwitch('position', styles.pos, {
                null: 'unset',
                r: 'relative',
                a: 'absolute',
                f: 'fixed',
                s: 'static',
            });
            //* Overflow
            //? visible hidden scroll auto
            setSwitch('overflow', styles.of, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            });
            setSwitch('overflowX', styles.ofx, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            });
            setSwitch('overflowY', styles.ofy, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            });
            //* Pointer events
            //? none auto
            setSwitch('pointerEvents', styles.event, {
                null: 'unset',
                n: 'none',
                a: 'auto',
            });
            //* Cursor
            //? default pointer move not-allowed wait text crosshair col-resize
            setSwitch('cursor', styles.cur, {
                null: 'unset',
                d: 'default',
                p: 'pointer',
                m: 'move',
                n: 'not-allowed',
                w: 'wait',
                t: 'text',
                c: 'crosshair',
                cr: 'col-resize',
            });
            //* User select
            //? none auto text all
            setSwitch('userSelect', styles.us, {
                null: 'unset',
                n: 'none',
                a: 'auto',
                t: 'text',
                al: 'all',
            });

            // console.log(CssProperties, styles);

            return CssProperties as Styles;
        };
        return chocoStyle;
    }, [getColor, callbackSize, formatSize, isSize, theme]);
}

export function usePropChocoStyle() {
    const theme = useTheme();
    const responseCs = useResponseCs();
    const { formatSize } = useFormat();

    return useCallback(
        (csp: ChocoStylePropsType): StyleTypes => {
            const styleMap: StyleTypes = {};

            // ข้อมูลสำหรับ mapping ค่า
            const displayMap = {
                dNone: null,
                dFlex: 'f',
                dInline: 'i',
                dInlineF: 'if',
                dBlock: 'b',
                dInlineB: 'ib',
                dGrid: 'g',
                dInlineG: 'ig',
                dTable: 't',
                dInlineT: 'it',
            } as const;
            const flexDirMap = {
                row: 'r',
                rRow: 'rr',
                column: 'c',
                rColumn: 'cr',
            } as const;
            const alignMap = {
                end: 'e',
                start: 's',
                center: 'c',
                around: 'a',
                between: 'b',
                stretch: 'st',
            } as const;
            const justifyContentMap = {
                end: 'e',
                start: 's',
                center: 'c',
                around: 'a',
                between: 'b',
                evenly: 'ev',
            } as const;
            const justifyItemsMap = {
                end: 'e',
                start: 's',
                center: 'c',
                stretch: 'st',
            } as const;
            const textMap = {
                end: 'e',
                start: 's',
                left: 'l',
                right: 'r',
                center: 'c',
                justify: 'j',
            } as const;
            const posMap = {
                posR: 'r',
                posA: 'a',
                posF: 'f',
                posS: 's',
            } as const;
            const overflowMap = {
                ofV: 'v',
                ofH: 'h',
                ofS: 's',
                ofA: 'a',
            } as const;
            const eventMap = { eventN: 'n', eventA: 'a' } as const;
            const userSelectMap = {
                usN: 'n',
                usA: 'a',
                usT: 't',
                usAll: 'al',
            } as const;

            const toSizes = <Value,>(value: Value): Sizes<Value> => value;

            // ประมวลผล props
            Object.entries(csp).forEach(([keyValue, value]) => {
                const key = keyValue as keyof ChocoStylePropsType;
                if (value === undefined) return;
                const typedKey = key as keyof ChocoStyleDefType;

                // Size props
                if (KeywordsChocoStyleDef.includes(typedKey)) {
                    // Type assertion ที่ชัดเจนสำหรับ Size props
                    styleMap[typedKey as keyof ChocoStyleDefType] =
                        value as Sizes<any>;
                }
                // Special cases
                else if (key === 'cs') {
                    Object.assign(styleMap, responseCs(value as CsType));
                } else if (key === 'full') {
                    styleMap.w = '100%';
                    styleMap.h = '100%';
                } else if (key === 'fullW') {
                    styleMap.w = '100%';
                } else if (key === 'fullH') {
                    styleMap.h = '100%';
                } else if (key === 'fullV') {
                    styleMap.w = '100vw';
                    styleMap.h = '100vh';
                } else if (key === 'fullVW') {
                    styleMap.w = '100vw';
                } else if (key === 'fullVH') {
                    styleMap.h = '100vh';
                } else if (key in displayMap) {
                    const display = displayMap[key as keyof typeof displayMap];
                    styleMap.dp = toSizes(display);
                } else if (key in flexDirMap) {
                    const flexDir = flexDirMap[key as keyof typeof flexDirMap];
                    styleMap.fd = toSizes(flexDir);
                } else if (key === 'fWrap') {
                    styleMap.fw = value as ChocoStyleType['fw'];
                } else if (key.startsWith('ac')) {
                    const align =
                        alignMap[
                            key.slice(2).toLowerCase() as keyof typeof alignMap
                        ];
                    styleMap.ac = align;
                } else if (key.startsWith('a')) {
                    const align =
                        alignMap[
                            key.slice(1).toLowerCase() as keyof typeof alignMap
                        ];
                    styleMap.a = align;
                } else if (key.startsWith('ji')) {
                    const justifyItems =
                        justifyItemsMap[
                            key
                                .slice(2)
                                .toLowerCase() as keyof typeof justifyItemsMap
                        ];
                    styleMap.ji = justifyItems;
                } else if (key.startsWith('j')) {
                    const justifyContent =
                        justifyContentMap[
                            key
                                .slice(1)
                                .toLowerCase() as keyof typeof justifyContentMap
                        ];
                    styleMap.j = justifyContent;
                } else if (key.startsWith('t')) {
                    const text =
                        textMap[
                            key.slice(1).toLowerCase() as keyof typeof textMap
                        ];
                    styleMap.text = text;
                } else if (key in posMap) {
                    const pos = posMap[key as keyof typeof posMap];
                    styleMap.pos = pos;
                } else if (key.startsWith('ofx')) {
                    styleMap.ofx = overflowMap[key as keyof typeof overflowMap];
                } else if (key.startsWith('ofy')) {
                    styleMap.ofy = overflowMap[key as keyof typeof overflowMap];
                } else if (key.startsWith('of')) {
                    styleMap.of = overflowMap[key as keyof typeof overflowMap];
                } else if (key in eventMap) {
                    styleMap.event = eventMap[key as keyof typeof eventMap];
                } else if (key in userSelectMap) {
                    styleMap.us =
                        userSelectMap[key as keyof typeof userSelectMap];
                }
            });

            return styleMap;
        },
        [theme, formatSize],
    );
}
