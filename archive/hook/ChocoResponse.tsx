//-Path: "react-choco-style/lib/src/hook/ChocoResponse.tsx"
import {
    CsType,
    GridType,
    StyleTypes,
    StyledType,
    ChocoStyleType,
    LinesStyleType,
    ChocoStyleValue,
    NestedStyleTypes,
    ChocoStyleDefType,
    ChocoStylePropsType,
} from '../types/choco';
import {
    keysChocoStyle,
    KeywordsChocoStyleDef,
} from '../data/reservedKeywords';
import { Size } from '../class/size';
import { SxType } from '../types/style';
import { ChocoColor } from '../theme/color';
import { ColorsType } from '../types/color';
import { Ary, Obj } from '@teachoco-dev/cli';
import { useCallback, useMemo } from 'react';
import { useFont, useTheme } from './ChocoStyle';
import { CustomStylesPropsType } from '../types/chocoHook';
import { useGetColor, useGetsetClrProps } from './ChocoColor';
import {
    SizeOption,
    Sizes,
    SizesType,
    SizesValue,
    SizeValue,
} from '../types/size';

// export class ChocoResponse {}

export function useResponseCs() {
    const theme = useTheme();
    const { getFont } = useFont();
    const getSetClrProps = useGetsetClrProps();

    const CustomStylesProps: CustomStylesPropsType = {
        Size,
        theme,
        getFont,
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
        [theme, getFont, getSetClrProps],
    );
}

export function mergeNestedStyles(
    style1: StyleTypes,
    style2: StyleTypes,
): StyleTypes {
    const result: StyleTypes = { ...style1 };
    for (const keyStyle in style2) {
        const key = keyStyle as keyof StyleTypes;
        if (Obj.hasOwn(style2, key)) {
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

    return useCallback(
        (...chocoStyles: (CsType | undefined)[]): StyleTypes => {
            const validStyles = chocoStyles
                .filter((style) => style !== undefined)
                .map((style) => responseCs(style));
            if (validStyles.length === 0) return {};
            return validStyles.reduce<StyleTypes>(
                (acc, current) => mergeNestedStyles(acc, current),
                {},
            );
        },
        [responseCs],
    );
}

export function useChocoStyle<
    Styles extends StyledType | StyleTypes | SxType,
>(): (styles: CsType, innerWidth?: number) => Styles {
    const theme = useTheme();
    const getColor = useGetColor();
    const responseCs = useResponseCs();

    return useMemo(() => {
        const chocoStyle = (
            chocostyle: CsType = {},
            innerWidth?: number,
        ): Styles => {
            const styles = responseCs(chocostyle);
            const textUnit = theme.root.unit.text;

            type CssProp = Record<keyof ChocoStyleDefType, SizesValue>;
            const CssProperties: SxType = Obj.reduce<CssProp, CssProp>(
                styles as CssProp,
                (acc, key, value) => {
                    if (!keysChocoStyle.includes(key)) acc[key] = value;
                    if (key.startsWith('&'))
                        acc[key] = chocoStyle(
                            value as CsType,
                            innerWidth,
                        ) as SizesValue;
                    return acc;
                },
                {} as CssProp,
            );

            // ฟังก์ชันช่วยแปลง sizes
            const toSizes = <Value, NewValue extends string | number = 'none'>(
                value?: SizesType<Value>,
                option: SizeOption<Value> = { unit: 'px', check: true },
                none?: NewValue | boolean,
            ): SizesValue<NewValue> | undefined => {
                const { root, unit = 'px', check = true, ...options } = option;
                const sizeOption: SizeOption<Value> = {
                    root,
                    unit,
                    check,
                    ...options,
                };
                const Null = none === true ? 'none' : none;
                if (value === undefined) return undefined;
                else if (value === null && none !== undefined)
                    return Null as NewValue;
                else if (typeof value === 'number')
                    return Size.to(value, sizeOption) as SizesValue<NewValue>;
                else if (typeof value === 'string')
                    return value as unknown as NewValue;
                else if (Size.is(value))
                    return Size.to(
                        value.value as unknown as Value,
                        sizeOption,
                    ) as SizesValue<NewValue>;
                else if (Size.in(value)) return value as SizesValue<NewValue>;
            };
            // ฟังก์ชันช่วยแปลง size
            const toSize = <Value, NewValue extends string = 'none'>(
                value?: SizesType<Value>,
                option: SizeOption<Value> = { unit: 'px', check: true },
                none?: NewValue | boolean,
            ): NewValue | undefined => {
                const sizes = toSizes(value, option, none);

                if (innerWidth !== undefined && Size.in(sizes)) {
                    const { size } = theme.breakpoint;
                    const breakpoints = Obj.entries(size).sort(
                        ([, a], [, b]) => b - a,
                    );
                    for (const [key, value] of breakpoints)
                        if (innerWidth > value) return sizes[key] as NewValue;

                    const high = sizes[breakpoints[0][0]];
                    const low = sizes[Ary.last(breakpoints)[0]];
                    return (high === undefined ? low : high) as NewValue;
                } else {
                    return sizes as NewValue;
                }
            };

            // ฟังก์ชันช่วยแปลง color
            const toColor = <
                Return extends SizesValue<string> | undefined | null,
            >(
                color?: SizesType<ChocoStyleValue<ColorsType>>,
            ): Return => {
                if (color === undefined) return undefined as Return;
                const toHex = (
                    chocoColor: ColorsType,
                ): string | undefined | null =>
                    chocoColor instanceof ChocoColor
                        ? chocoColor.hex()
                        : chocoColor;
                if (Size.is(color))
                    return Size.callback(color, (color: ColorsType) =>
                        toHex(getColor(color)),
                    ) as Return;
                // console.log(
                //     color,
                //     getColor(color as ColorsType),
                //     toHex(getColor(color as ColorsType)),
                // );
                return toHex(getColor(color as ColorsType)) as Return;
            };

            // ฟังก์ชันตั้งค่า CSS
            const setCss = (key: keyof SxType, value: SizesValue<unknown>) => {
                if (value !== undefined) {
                    (CssProperties as Record<string, SizesValue>)[key] =
                        value as SizesValue;
                    return [key, value];
                }
            };

            // Inset (padding, margin, gap ฯลฯ)
            type InsetValue = SizesType<ChocoStyleValue> | undefined;
            const setInset = (
                key: keyof SxType,
                value: InsetValue,
                sides: Record<string, [keyof SxType, InsetValue]>,
                option: SizeOption<InsetValue> = { check: true },
            ) => {
                const { check = true, ...options } = option;
                if (value) setCss(key, toSize(value, options));
                Object.entries(sides).forEach(([_, [sideKey, sideVal]]) => {
                    if (sideVal !== undefined)
                        setCss(sideKey, toSize(sideVal, { ...options, check }));
                });
            };

            // Border
            const toBorder = (
                border?: LinesStyleType | string | null,
            ): Sizes<string> | undefined => {
                if (border === null) return 'none';
                if (typeof border === 'string') return border;
                if (border) {
                    const {
                        width,
                        style = 'solid',
                        color = 'secondary',
                    } = border;
                    const borderWidth = (
                        typeof width === 'number' && width < 0
                            ? Size.from(-width)
                            : width ?? theme.root.size.border
                    ) as SizesType<SizeValue>;
                    const borderSize = toSize(borderWidth, {
                        response: 'border',
                    });
                    if (typeof borderSize === 'string') {
                        return `${borderSize} ${style} ${getColor(color)}`;
                    }
                    return Size.callback(
                        borderSize,
                        (s) => `${s} ${style} ${getColor(color)}`,
                    ) as Sizes<string>;
                }
            };
            const toBorders = (
                border?: SizesType<LinesStyleType | string | null | undefined>,
            ): Sizes<string> | undefined => {
                if (border) {
                    if (Size.is(border))
                        return Size.callback(border, toBorder) as Sizes<string>;
                    return toBorder(border as LinesStyleType | string | null);
                }
            };

            // Grid Template
            const toGridTemplate = (template: string | GridType): string => {
                return !Array.isArray(template)
                    ? template
                    : template
                          .map((col) =>
                              typeof col === 'number' ? `${col}fr` : col,
                          )
                          .join(' ');
            };
            // Grid Template
            const toGridTemplates = (template: GridType[]): string => {
                return !Array.isArray(template)
                    ? template
                    : template?.map((row) => toGridTemplate(row)).join(' / ');
            };

            const toGridArea = (area: string | GridType[]): string =>
                typeof area === 'string'
                    ? area
                    : area?.map((area) => area.join(' / '))?.join(' / ');

            // Switch
            const setSwitch = (
                key: keyof SxType,
                value: SizesType<ChocoStyleValue> | undefined,
                map: Record<string, SxType[keyof SxType]>,
            ) => {
                if (value === undefined) return;
                const getMappedValue = (val: unknown) => {
                    // console.log(val);
                    return val === null
                        ? map['null']
                        : map[val as keyof SxType];
                };
                if (Size.is(value))
                    setCss(
                        key,
                        Size.callback(value, (sizeValue) =>
                            getMappedValue(sizeValue),
                        ),
                    );
                else setCss(key, getMappedValue(value));
            };
            //* Style
            //? background color background-color
            setCss('background', toSize(styles.bg));
            setCss('color', toColor(styles.clr));
            setCss('backgroundColor', toColor(styles.bgClr));
            setCss('backgroundImage', toSize(styles.bgImg, {}, true));
            setCss('boxShadow', toSize(styles.bShadow, {}, true));
            setCss('textShadow', toSize(styles.tShadow, {}, true));
            //* Opacity
            setCss('opacity', toSize(styles.op, { unit: '' })); //time: 1,
            //* z-index
            setCss(
                'zIndex',
                toSize(styles.z, { unit: '', check: false }), //time: 1,
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
                { check: false },
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
                { response: 'padding' },
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
                { response: 'padding' },
            );
            //* Gap
            //? all row column
            setInset(
                'gap',
                styles.g,
                { y: ['rowGap', styles.gy], x: ['columnGap', styles.gx] },
                { response: 'padding' },
            );
            //* FontSize
            setCss(
                'fontSize',
                toSize(styles.sz, { response: 'text', unit: textUnit }),
            );
            const ss = setCss(
                'fontSize',
                toSize(styles.fontS, { response: 'text', unit: textUnit }),
            );

            // console.log(ss);

            //* Grids
            //? grid-template grid-area
            if (styles.gridT !== undefined) {
                if (Size.is(styles.gridT))
                    setCss(
                        'gridTemplate',
                        Size.callback(styles.gridT, toGridTemplate),
                    );
                else
                    setCss(
                        'gridTemplate',
                        toGridTemplates(styles.gridT as GridType[]),
                    );
            }
            if (styles.gridTR !== undefined) {
                if (Size.is(styles.gridTR))
                    setCss(
                        'gridTemplateRows',
                        Size.callback(styles.gridTR, toGridTemplate),
                    );
                else
                    setCss(
                        'gridTemplateRows',
                        toGridTemplate(styles.gridTR as GridType),
                    );
            }
            if (styles.gridTC !== undefined) {
                if (Size.is(styles.gridTC))
                    setCss(
                        'gridTemplateColumns',
                        Size.callback(styles.gridTC, toGridTemplate),
                    );
                else
                    setCss(
                        'gridTemplateColumns',
                        toGridTemplate(styles.gridTC as GridType),
                    );
            }
            if (styles.gridA !== undefined) {
                if (Size.is(styles.gridA))
                    setCss('gridArea', Size.callback(styles.gridA, toGridArea));
                else setCss('gridArea', toGridArea(styles.gridA as GridType[]));
            }
            if (styles.gridAR !== undefined) {
                if (Size.is(styles.gridAR))
                    setCss('gridRow', Size.callback(styles.gridAR, toGridArea));
                else
                    setCss(
                        'gridRow',
                        toGridArea([styles.gridAR] as GridType[]),
                    );
            }
            if (styles.gridAC !== undefined) {
                if (Size.is(styles.gridAC))
                    setCss(
                        'gridColumn',
                        Size.callback(styles.gridA, toGridArea),
                    );
                else
                    setCss(
                        'gridColumn',
                        toGridArea([styles.gridAC] as GridType[]),
                    );
            }
            //* Border
            setCss('borderWidth', toSize(styles.borW, { response: 'border' }));
            setCss('borderRadius', toSize(styles.borR, { response: 'borR' }));
            setCss(
                'borderTopLeftRadius',
                toSize(styles.borRTL, { response: 'borR' }),
            );
            setCss(
                'borderTopRightRadius',
                toSize(styles.borRTR, { response: 'borR' }),
            );
            setCss(
                'borderBottomLeftRadius',
                toSize(styles.borRBL, { response: 'borR' }),
            );
            setCss(
                'borderBottomRightRadius',
                toSize(styles.borRBR, { response: 'borR' }),
            );
            setCss('borderStyle', toSize(styles.borS));
            setCss('borderColor', toColor(styles.borClr));
            // if (styles.borders) console.log(toBorder(styles.borders));
            setCss('border', toBorders(styles.borders));
            ['borderTop', 'borderBottom'].forEach((k) =>
                setCss(
                    k as keyof SxType,
                    toBorders(
                        styles.borderY ??
                            styles[k === 'borderTop' ? 'borderT' : 'borderB'],
                    ),
                ),
            );
            ['borderLeft', 'borderRight'].forEach((k) =>
                setCss(
                    k as keyof SxType,
                    toBorders(
                        styles.borderX ??
                            styles[k === 'borderLeft' ? 'borderL' : 'borderR'],
                    ),
                ),
            );

            //* Outline
            setCss('outline', toBorders(styles.outlines));

            //* transition
            setCss(
                'transition',
                styles.trans !== undefined
                    ? Size.is(styles.trans)
                        ? Size.callback(styles.trans, (trans) =>
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
                toSize(styles.form, { unit: '', check: false }),
            );
            if (styles.transformCenter) {
                const transformCenter = (
                    value: SizesType<ChocoStyleDefType['transformCenter']>,
                ) => {
                    if (!value) return;
                    Size.callback(
                        value,
                        (value: ChocoStyleDefType['transformCenter']) => {
                            if (!value) return;
                            const centers = {
                                all: ['50%', '50%', 'translate(-50%, -50%)'],
                                x: ['50%', null, 'translateX(-50%)'],
                                y: [null, '50%', 'translateY(-50%)'],
                            };
                            const [top, left, transform] = centers[value] || [];
                            setCss('top', top);
                            setCss('left', left);
                            setCss('transform', transform);
                        },
                    );
                };
                if (Size.is(styles.transformCenter))
                    Size.callback(styles.transformCenter, transformCenter);
                else transformCenter(styles.transformCenter);
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
    }, [theme, getColor]);
}

export function usePropChocoStyle() {
    const theme = useTheme();
    const responseCs = useResponseCs();

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
            Obj.map(csp, (value, keyValue) => {
                const key = keyValue as keyof ChocoStylePropsType;
                if (value === undefined) return;
                const typedKey = key as keyof ChocoStyleDefType;

                // Size props
                if (KeywordsChocoStyleDef.includes(typedKey)) {
                    // Type assertion ที่ชัดเจนสำหรับ Size props
                    (styleMap as Record<keyof ChocoStyleType, Sizes>)[
                        typedKey
                    ] = value as Sizes;
                }

                // Special cases
                else if (key === 'cs')
                    Object.assign(styleMap, responseCs(value as CsType));
                if (value === false) return;
                // console.log(key, value);

                if (key === 'full') {
                    styleMap.w = '100%';
                    styleMap.h = '100%';
                }
                if (key === 'fullW') styleMap.w = '100%';
                if (key === 'fullH') styleMap.h = '100%';
                if (key === 'fullV') {
                    styleMap.w = '100vw';
                    styleMap.h = '100vh';
                }
                if (key === 'fullVW') styleMap.w = '100vw';
                if (key === 'fullVH') styleMap.h = '100vh';
                if (key in displayMap) {
                    const display = displayMap[key as keyof typeof displayMap];
                    styleMap.dp = toSizes(display);
                } else if (key in flexDirMap) {
                    const flexDir = flexDirMap[key as keyof typeof flexDirMap];
                    styleMap.fd = toSizes(flexDir);
                } else if (key === 'fWrap') {
                    styleMap.fw = value as ChocoStyleType['fw'];
                } else if (key === 'center') {
                    styleMap.a = 'c';
                    styleMap.j = 'c';
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
        [theme],
    );
}
