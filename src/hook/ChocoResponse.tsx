//-Path: "react-choco-style/src/hook/ChocoResponse.tsx"
import {
    CsType,
    StyleTypes,
    StyledType,
    ChocoStyleType,
    LinesStyleType,
    NestedStyleTypes,
    GridTemplateType,
    ChocoStyleDefType,
    ChocoStylePropsType,
} from '../types/choco';
import {
    keysChocoStyle,
    KeywordsChocoStyleDef,
} from '../data/reservedKeywords';
import { SxType } from '../types/style';
import { useTheme } from './ChocoStyle';
import { useFormat } from './ChocoFormat';
import { useGetColor } from './ChocoColor';
import { ColorsType } from '../types/color';
import { useCallback, useMemo } from 'react';
import { Sizes, SizeValue } from '../types/size';

// export class ChocoResponse {}

function mergeNestedStyles(style1: StyleTypes, style2: StyleTypes): StyleTypes {
    const result: StyleTypes = { ...style1 };
    for (const keyStyle in style2) {
        const key = keyStyle as keyof StyleTypes;
        if (Object.hasOwn(style2, key)) {
            const value1 = style1[key];
            const value2 = style2[key];

            if (key.startsWith('&') || key.startsWith('@')) {
                if (
                    value1 &&
                    value2 &&
                    typeof value1 === 'object' &&
                    typeof value2 === 'object' &&
                    !Array.isArray(value1) &&
                    !Array.isArray(value2)
                ) {
                    result[key as keyof NestedStyleTypes] = {
                        ...(value1 as object),
                        ...(value2 as object),
                    };
                } else if (value2 !== undefined) {
                    result[key as keyof NestedStyleTypes] =
                        value2 as NestedStyleTypes;
                }
            } else {
                if (value2 !== undefined) {
                    result[key as keyof NestedStyleTypes] =
                        value2 as NestedStyleTypes;
                }
            }
        }
    }

    return result;
}

export function useMixCsProps() {
    const theme = useTheme();

    return useCallback((...chocoStyles: (CsType | undefined)[]): StyleTypes => {
        const validStyles = chocoStyles
            .filter((style) => style !== undefined)
            .map((style) =>
                typeof style === 'function' ? style({ theme }) : style,
            );
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
) => Styles {
    const theme = useTheme();
    const getColor = useGetColor();
    const { callbackSize, formatSize, isSize } = useFormat();

    return useMemo(() => {
        const chocoStyle = (chocostyle: CsType = {}): Styles => {
            let styles =
                typeof chocostyle === 'function'
                    ? chocostyle({ theme })
                    : chocostyle ?? {};

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
                    ) as SizeValue;
                }
                return acc;
            }, {});

            const {
                timePadding = theme.root.size.padding,
                timeBorder = theme.root.size.border,
                timeText = 1 / theme.root.size.text,
                textUnit = theme.root.unit.text,
            } = {};

            // ฟังก์ชันช่วยแปลง size
            const toSize = (
                value?: Sizes,
                time = 1,
                unit = 'px',
                autoFormat = true,
            ): Sizes | undefined => {
                if (value === undefined) return undefined;
                if (typeof value === 'string') return value;
                if (typeof value === 'number')
                    return autoFormat && value < 0
                        ? (callbackSize(-value, (v) =>
                              typeof v === 'number' ? `${v * time}${unit}` : v,
                          ) as Sizes)
                        : `${value * time}${unit}`;
                if (isSize(value)) {
                    return callbackSize(value, (v) =>
                        typeof v === 'number' ? `${v * time}${unit}` : v,
                    ) as Sizes;
                }
            };

            // ฟังก์ชันช่วยแปลง color
            const toColor = (color?: Sizes<ColorsType>) => {
                if (color === undefined) return undefined;
                if (isSize(color)) return callbackSize(color, getColor);
                return getColor(color as ColorsType);
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
                time = 1,
                autoFormat?: boolean,
            ) => {
                if (value) setCss(key, toSize(value, time));
                else
                    Object.entries(sides).forEach(([_, [sideKey, sideVal]]) => {
                        if (sideVal !== undefined)
                            setCss(
                                sideKey,
                                toSize(sideVal, time, undefined, autoFormat),
                            );
                    });
            };

            // Border
            const toBorder = (border: LinesStyleType | string | undefined) => {
                if (typeof border === 'string') return border;
                if (border) {
                    const { size, width, style, color } = border;
                    const borderWidth =
                        size !== undefined
                            ? formatSize(size)
                            : width ?? theme.root.size.border;
                    const borderSize = toSize(borderWidth);
                    if (typeof borderSize === 'string') {
                        return `${borderSize} ${style ?? 'solid'} ${getColor(
                            color ?? 'secondary',
                        )}`;
                    }
                    return callbackSize(
                        borderSize,
                        (s) =>
                            `${s} ${style ?? 'solid'} ${getColor(
                                color ?? 'secondary',
                            )}`,
                    );
                }
            };

            // Grid Template
            const toGridTemplate = (template?: Sizes<GridTemplateType>) => {
                if (!template) return undefined;
                return callbackSize(template, (size: GridTemplateType) =>
                    (Array.isArray(size) ? size : size)
                        ?.map((row) =>
                            row
                                .map((col) =>
                                    typeof col === 'number' ? `${col}fr` : col,
                                )
                                .join(' '),
                        )
                        .join(' / '),
                );
            };

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
            setCss('backgroundImage', toSize(styles.bgImg));
            //* Opacity
            setCss('opacity', toSize(styles.op, 1, ''));
            //* z-index
            setCss('zIndex', toSize(styles.z, 1, '', false));
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
                undefined,
                true,
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
                timePadding,
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
                timePadding,
            );
            //* Gap
            //? all top bottom left right left&right top&bottom
            setInset(
                'gap',
                styles.gaps,
                {
                    x: ['columnGap', styles.gapX],
                    ['x-r']: ['rowGap', styles.gapX],
                    y: ['columnGap', styles.gapY],
                    ['y-b']: ['rowGap', styles.gapY],
                    l: ['columnGap', styles.gapL],
                    r: ['rowGap', styles.gapR],
                    t: ['columnGap', styles.gapT],
                    b: ['rowGap', styles.gapB],
                },
                timePadding,
            );
            //* FontSize
            setCss('fontSize', toSize(styles.fontS, timeText, textUnit));
            //* Grids
            //? grid-template grid-area
            if (styles.gridT !== undefined) {
                setCss('gridTemplate', toGridTemplate(styles.gridT));
            }
            if (styles.gridA !== undefined) {
                const gridArea = callbackSize(
                    styles.gridA,
                    (grid: GridTemplateType) => {
                        const template = grid as GridTemplateType;
                        return template
                            ?.map((area, index) =>
                                (index > 0
                                    ? area.map((a) => `span ${a}`)
                                    : area
                                ).join(' / '),
                            )
                            ?.join(' / ');
                    },
                );
                setCss('gridArea', gridArea);
            }
            //* Border
            setCss('borderRadius', toSize(styles.borR, timeBorder));
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
            setCss('transform', styles.transform);
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
            //? flex-end flex-start center space-around space-between space-evenly
            setSwitch('justifyContent', styles.j, {
                null: 'unset',
                e: 'flex-end',
                s: 'flex-start',
                c: 'center',
                b: 'space-between',
                a: 'space-around',
                ev: 'space-evenly',
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
            const justifyMap = {
                start: 's',
                end: 'e',
                center: 'c',
                around: 'a',
                between: 'b',
                evenly: 'ev',
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
                    const cs = value as CsType;
                    if (typeof cs === 'function')
                        Object.assign(
                            styleMap,
                            cs({ theme }) as Partial<ChocoStyleType>,
                        );
                    else Object.assign(styleMap, cs as Partial<ChocoStyleType>);
                } else if (key === 'full') {
                    styleMap.w = '100%';
                    styleMap.h = '100%';
                } else if (key === 'fullV') {
                    styleMap.w = '100vw';
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
                } else if (key.startsWith('j')) {
                    const justify =
                        justifyMap[
                            key
                                .slice(1)
                                .toLowerCase() as keyof typeof justifyMap
                        ];
                    styleMap.j = justify;
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
