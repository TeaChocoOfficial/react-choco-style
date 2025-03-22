//-Path: "react-choco-style/src/hook/ChocoStyle.tsx"
import {
    StyleTypes,
    StyledType,
    LineStyleType,
    ChocoStyleType,
    LinesStyleType,
    ChocoStyleTypes,
    GridTemplateType,
    ChocoStyleDefType,
    ChocoStylePropsType,
    ChocoStylePropsTypes,
} from '../types/choco';
import {
    FormatSizeType,
    CallbackSizeType,
    CustomStylesType,
    ChocoStyledProps,
} from '../types/chocoHook';
import {
    keysChocoStyle,
    keysChocoStyleProps,
    KeywordsChocoStyleDef,
} from '../data/reservedKeywords';
import { styled } from '@mui/material';
import { SxType } from '../types/style';
import { DeepPartial } from '../types/type';
import { themeAtom, themeModeAtom } from '../theme/theme';
import { ColorDefaultType, ColorsType } from '../types/color';
import { PaletteType, UseChocoThemeType } from '../types/theme';
import { Size, SizeKey, Sizes, SizeValue } from '../types/size';
import React, { forwardRef, useCallback, useMemo } from 'react';

export class ChocoStyle {
    static useTheme(): UseChocoThemeType {
        const theme = themeAtom.get();
        const [mode, setMode] = themeModeAtom.use();

        return useMemo(() => {
            const useChocoTheme: UseChocoThemeType = {
                mode: mode,
                root: theme.root,
                fonts: theme.fonts,
                breakpoint: theme.breakpoint,
                styleSheets: theme.styleSheets,
                palette: {
                    ...theme.modes.default,
                    ...theme.modes[mode],
                } as PaletteType,
                method: {
                    setMode: (mode) => setMode(mode),
                },
            };

            return useChocoTheme;
        }, [mode, theme]);
    }

    static styled<TagType extends keyof React.JSX.IntrinsicElements>(
        tag: TagType,
        nameTag?: string,
    ) {
        return (customStyles?: StyleTypes | CustomStylesType) => {
            const getStyles = (): Record<string, SizeValue> => {
                const theme = this.useTheme();
                const chocoStyle = this.useChocoStyle<StyledType>();
                const { formatSize, callbackSize } = this.useFormatSize();
                return typeof customStyles === 'function'
                    ? chocoStyle(
                          customStyles({ theme, formatSize, callbackSize }),
                      )
                    : chocoStyle(customStyles ?? {});
            };
            const create = styled(tag, { name: nameTag });
            const Component = create(() => getStyles());
            return forwardRef<
                HTMLElement,
                ChocoStylePropsType & React.ComponentPropsWithoutRef<TagType>
            >((prop, ref) => {
                const { cs } = prop;
                const chocoStyle = this.useChocoStyle<SxType>();
                const propChocoStyle = this.usePropChocoStyle();
                const { sx, props } = useMemo(() => {
                    const chocoStyleProps = propChocoStyle(prop);
                    return {
                        sx: chocoStyle({ ...cs, ...chocoStyleProps }),
                        props: this.removeReservedProps(
                            [...keysChocoStyleProps, 'sx'],
                            prop,
                        ),
                    };
                }, [prop, chocoStyle, propChocoStyle]);
                const componentProps = props as React.ComponentProps<
                    typeof Component
                >;
                return <Component {...componentProps} sx={sx} ref={ref} />;
            });
        };
    }

    static useChocoStyleHooks() {
        const getColor = this.useGetColor();
        const { breakpoint } = this.useTheme();
        const { callbackSize, formatSize } = this.useFormatSize();

        return useCallback((styles: StyleTypes) => {
            const keysChocostyle = Object.keys(
                styles,
            ) as (keyof ChocoStyleType)[];

            const CssProperties: SxType = keysChocostyle.reduce<
                Record<string, SizeValue>
            >((acc, key) => {
                if (!keysChocoStyle.includes(key as keyof ChocoStyleDefType)) {
                    acc[key] = styles[key] as SizeValue;
                }
                return acc;
            }, {});

            const breakpointKeys = Object.keys(breakpoint.size) as SizeKey[];
            function isSize(size: unknown): boolean {
                if (size && typeof size === 'object') {
                    const sizeKeys = Object.keys(size) as (keyof Size)[];
                    return sizeKeys.every((key) =>
                        breakpointKeys.includes(key),
                    );
                }
                return false;
            }

            function sizeToCss<Value = string | undefined>(
                size?: Sizes<Value>,
                time?: number,
                unit?: string,
            ): Sizes<Value> | undefined {
                if (size !== undefined) {
                    if (typeof size === 'string') {
                        return size;
                    } else if (typeof size === 'number') {
                        return `${size * (time ?? 1)}${unit ?? 'px'}` as Value;
                    } else if (isSize(size)) {
                        const newSize = callbackSize(size, (value) => {
                            const newValue =
                                typeof value === 'number'
                                    ? `${value * (time ?? 1)}${unit ?? 'px'}`
                                    : value;
                            return newValue as Value;
                        });
                        return newSize;
                    }
                }
            }

            function sizeToColor(
                color?: Sizes<ColorsType>,
            ): Sizes<string | undefined> | undefined {
                if (color !== undefined) {
                    if (typeof color === 'string') {
                        return getColor(color);
                    } else if (isSize(color)) {
                        const newSize = callbackSize(
                            color,
                            (value: ColorsType) => getColor(value),
                        );
                        return newSize;
                    }
                }
            }

            function getCss<S = SizeValue>(
                keyCss: keyof SxType,
                value?: Sizes<S>,
            ) {
                if (value) {
                    CssProperties[keyCss] = value;
                }
            }

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

            function getLiners(line: LinesStyleType) {
                const { size, width, style, color } = line;
                const borderWidth =
                    size !== undefined ? formatSize(size) : width ?? 8;
                const borderSize = sizeToCss(borderWidth);
                const getLiner = (line: LineStyleType): string => {
                    const { width, style, color } = line;
                    const border: (string | number | Size)[] = [];
                    border.push(width ?? '');
                    border.push(style ?? 'solid');
                    border.push(getColor(color ?? 'secondary') ?? '');
                    return border.join(' ');
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

            function getGritTemplate(template?: Sizes<GridTemplateType>) {
                return callbackSize(template, (size: GridTemplateType, key) => {
                    if (size) {
                        const getGrit = (size?: GridTemplateType) =>
                            size
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

                        if (Array.isArray(size)) {
                            return getGrit(size);
                        } else {
                            return getGrit(size[key]);
                        }
                    }
                });
            }

            function getSwitch<Value>(
                keyCss: keyof SxType,
                value: Value | undefined = undefined,
                switchMap: Record<string, SxType[keyof SxType]>,
            ) {
                if (value !== undefined) {
                    const cursorValue =
                        value === null
                            ? switchMap['null']
                            : switchMap[value as string];
                    getCss(keyCss, cursorValue);
                }
            }

            return {
                timeBox: 4,
                timeText: 1 / 16,
                fontUnit: 'em',
                breakpointKeys,
                CssProperties,
                isSize,
                sizeToCss,
                sizeToColor,
                getCss,
                getInset,
                getLiners,
                getGritTemplate,
                getSwitch,
            };
        }, []);
    }

    static useChocoStyle<Styles extends StyledType | SxType>(): (
        styles: StyleTypes,
    ) => Styles {
        const chocoStyleHooks = this.useChocoStyleHooks();
        const { formatSize, callbackSize } = this.useFormatSize();

        return useCallback((styles: StyleTypes): Styles => {
            const {
                timeBox,
                timeText,
                fontUnit,
                CssProperties,
                sizeToCss,
                sizeToColor,
                getCss,
                getInset,
                getLiners,
                getGritTemplate,
                getSwitch,
            } = chocoStyleHooks(styles);

            //* Style
            //? background color background-color
            getCss('background', sizeToCss(styles.bg));
            getCss('color', sizeToColor(styles.clr));
            getCss('backgroundColor', sizeToColor(styles.bgClr));
            getCss('backgroundImage', sizeToCss(styles.bgImg));

            //* Opacity
            getCss('opacity', sizeToCss(styles.op));

            //* z-index
            getCss('zIndex', sizeToCss(styles.z));

            //* Width and Height
            getCss('width', sizeToCss(styles.w));
            getCss('height', sizeToCss(styles.h));
            getCss('minWidth', sizeToCss(styles.minW));
            getCss('minHeight', sizeToCss(styles.minH));
            getCss('maxWidth', sizeToCss(styles.maxW));
            getCss('maxHeight', sizeToCss(styles.maxH));

            //* inset
            //? all top bottom left right left&right top&bottom
            getInset({
                i: ['inset', sizeToCss(styles.i)],
                x: sizeToCss(styles.x),
                y: sizeToCss(styles.y),
                l: ['left', sizeToCss(styles.l)],
                r: ['right', sizeToCss(styles.r)],
                t: ['top', sizeToCss(styles.t)],
                b: ['bottom', sizeToCss(styles.b)],
            });

            //* Padding
            //? all top bottom left right left&right top&bottom
            getInset({
                i: ['padding', sizeToCss(styles.p, timeBox)],
                x: sizeToCss(styles.px, timeBox),
                y: sizeToCss(styles.py, timeBox),
                l: ['paddingLeft', sizeToCss(styles.pl, timeBox)],
                r: ['paddingRight', sizeToCss(styles.pr, timeBox)],
                t: ['paddingTop', sizeToCss(styles.pt, timeBox)],
                b: ['paddingBottom', sizeToCss(styles.pb, timeBox)],
            });

            //* Margin
            //? all top bottom left right left&right top&bottom
            getInset({
                i: ['margin', sizeToCss(styles.m, timeBox)],
                x: sizeToCss(styles.mx, timeBox),
                y: sizeToCss(styles.my, timeBox),
                l: ['marginLeft', sizeToCss(styles.ml, timeBox)],
                r: ['marginRight', sizeToCss(styles.mr, timeBox)],
                t: ['marginTop', sizeToCss(styles.mt, timeBox)],
                b: ['marginBottom', sizeToCss(styles.mb, timeBox)],
            });

            //* Gap
            //? all top bottom left right left&right top&bottom
            getInset({
                i: ['gap', sizeToCss(styles.gaps, timeBox)],
                x: sizeToCss(styles.gapX, timeBox),
                y: sizeToCss(styles.gapY, timeBox),
                l: ['columnGap', sizeToCss(styles.gapL, timeBox)],
                r: ['rowGap', sizeToCss(styles.gapR, timeBox)],
                t: ['columnGap', sizeToCss(styles.gapT, timeBox)],
                b: ['rowGap', sizeToCss(styles.gapB, timeBox)],
            });

            //* FontSize
            getCss(
                'fontSize',
                sizeToCss(
                    styles.size ? formatSize(styles.size) : undefined,
                    timeText,
                    fontUnit,
                ),
            );
            getCss('fontSize', sizeToCss(styles.fontS, timeText, fontUnit));

            //* Grids
            //? grid-template grid-area
            if (styles.gridT !== undefined) {
                getCss('gridTemplate', getGritTemplate(styles.gridT));
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
                getCss('gridArea', gridArea);
            }

            //* Border
            getCss('borderRadius', sizeToCss(styles.borR, timeBox));

            if (styles.borders !== undefined) {
                if (typeof styles.borders === 'string') {
                    getCss('border', styles.borders);
                } else {
                    getCss('border', getLiners(styles.borders));
                }
            }
            if (styles.borderY !== undefined) {
                if (typeof styles.borderY === 'string') {
                    getCss('borderTop', styles.borderY);
                    getCss('borderBottom', styles.borderY);
                } else {
                    getCss('borderTop', getLiners(styles.borderY));
                    getCss('borderBottom', getLiners(styles.borderY));
                }
            } else {
                if (styles.borderT !== undefined) {
                    if (typeof styles.borderT === 'string') {
                        getCss('borderTop', styles.borderT);
                    } else {
                        getCss('borderTop', getLiners(styles.borderT));
                    }
                }
                if (styles.borderB !== undefined) {
                    if (typeof styles.borderB === 'string') {
                        getCss('borderBottom', styles.borderB);
                    } else {
                        getCss('borderBottom', getLiners(styles.borderB));
                    }
                }
            }
            if (styles.borderX !== undefined) {
                if (typeof styles.borderX === 'string') {
                    getCss('borderLeft', styles.borderX);
                    getCss('borderRight', styles.borderX);
                } else {
                    getCss('borderLeft', getLiners(styles.borderX));
                    getCss('borderRight', getLiners(styles.borderX));
                }
            } else {
                if (styles.borderL !== undefined) {
                    if (typeof styles.borderL === 'string') {
                        getCss('borderLeft', styles.borderL);
                    } else {
                        getCss('borderLeft', getLiners(styles.borderL));
                    }
                }
                if (styles.borderR !== undefined) {
                    if (typeof styles.borderR === 'string') {
                        getCss('borderRight', styles.borderR);
                    } else {
                        getCss('borderRight', getLiners(styles.borderR));
                    }
                }
            }

            //* Outline
            if (styles.outlines !== undefined) {
                if (typeof styles.outlines === 'string') {
                    getCss('outline', styles.outlines);
                } else {
                    getCss('outline', getLiners(styles.outlines));
                }
            }

            //* transition
            if (styles.trans !== undefined) {
                getCss(
                    'transition',
                    typeof styles.trans === 'string'
                        ? styles.trans
                        : `${styles.trans}s`,
                );
            }

            //* Transform
            if (styles.transform !== undefined) {
                getCss('transform', styles.transform);
            }

            switch (styles.transformCenter) {
                case 'all':
                    getCss('top', '50%');
                    getCss('left', '50%');
                    getCss('transform', 'translate(-50%, -50%)');
                    break;
                case 'x':
                    getCss('top', '50%');
                    getCss('transform', 'translateX(-50%)');
                    break;
                case 'y':
                    getCss('left', '50%');
                    getCss('transform', 'translateY(-50%)');
                    break;
            }

            //* Display
            //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
            getSwitch('display', styles.dp, {
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
            getSwitch('flexDirection', styles.fd, {
                null: 'unset',
                r: 'row',
                rr: 'row-reverse',
                c: 'column',
                cr: 'column-reverse',
                i: 'initial',
            });

            //* Flex wrap
            if (styles.fw !== undefined) {
                getCss('flexWrap', styles.fw ? 'wrap' : 'nowrap');
            }

            //* Align content
            //? unset flex-end flex-start center space-around space-between stretch
            getSwitch('alignContent', styles.ac, {
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
            getSwitch('alignItems', styles.a, {
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
            getSwitch('justifyContent', styles.j, {
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
            getSwitch('textAlign', styles.text, {
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
            getSwitch('position', styles.pos, {
                null: 'unset',
                r: 'relative',
                a: 'absolute',
                f: 'fixed',
                s: 'static',
            });

            //* Overflow
            //? visible hidden scroll auto
            getSwitch('overflow', styles.of, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            });

            getSwitch('overflowX', styles.ofx, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            });

            getSwitch('overflowY', styles.ofy, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            });

            //* Pointer events
            //? none auto
            getSwitch('pointerEvents', styles.event, {
                null: 'unset',
                n: 'none',
                a: 'auto',
            });

            //* Cursor
            //? default pointer move not-allowed wait text crosshair col-resize
            getSwitch('cursor', styles.cur, {
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
            getSwitch('userSelect', styles.us, {
                null: 'unset',
                n: 'none',
                a: 'auto',
                t: 'text',
                al: 'all',
            });

            return CssProperties as Styles;
        }, []);
    }

    static usePropChocoStyle() {
        const { formatSize } = this.useFormatSize();

        return useCallback(
            (csp: ChocoStylePropsType): ChocoStyleType => {
                const keys = Object.keys(csp) as (keyof ChocoStyleDefType)[];

                const chocoProps = keys.reduce<ChocoStyleTypes>((acc, key) => {
                    const prop = csp[key];
                    if (
                        KeywordsChocoStyleDef.includes(key) &&
                        prop !== undefined
                    ) {
                        acc[key] =
                            prop as ChocoStyleTypes[keyof ChocoStyleTypes[typeof key]];
                    }
                    return acc;
                }, {});

                const chocoStyleProps = keys.reduce<ChocoStylePropsTypes>(
                    (acc, key) => {
                        const prop = csp[key];
                        if (
                            keysChocoStyleProps.includes(key) &&
                            prop !== undefined
                        ) {
                            acc[key] =
                                prop as ChocoStylePropsTypes[keyof ChocoStylePropsTypes[typeof key]];
                        }
                        return acc;
                    },
                    {},
                );

                const keysProps = Object.keys(
                    chocoProps,
                ) as (keyof ChocoStyleTypes)[];

                const keysStyleProps = Object.keys(
                    chocoStyleProps,
                ) as (keyof ChocoStylePropsType)[];

                const newChocoProps = keysProps.reduce<ChocoStyleTypes>(
                    (acc, key) => {
                        const style = chocoProps[
                            key
                        ] as ChocoStyleTypes[keyof ChocoStyleTypes[typeof key]];

                        switch (key) {
                            //* Size
                            //? Width Height min-width min-height max-width max-height
                            case 'w':
                            case 'h':
                            case 'minW':
                            case 'minH':
                            case 'maxW':
                            case 'maxH':

                            //? all top bottom left right left&right top&bottom
                            case 'i':
                            case 't':
                            case 'b':
                            case 'l':
                            case 'r':
                            case 'x':
                            case 'y':

                            //* Padding
                            //? all top bottom left right left&right top&bottom
                            case 'p':
                            case 'pt':
                            case 'pb':
                            case 'pl':
                            case 'pr':
                            case 'px':
                            case 'py':

                            //* Margin
                            //? all top bottom left right left&right top&bottom
                            case 'm':
                            case 'mt':
                            case 'mb':
                            case 'ml':
                            case 'mr':
                            case 'mx':
                            case 'my':

                            //* Gap
                            //? all top bottom left right left&right top&bottom
                            case 'gaps':
                            case 'gapT':
                            case 'gapB':
                            case 'gapL':
                            case 'gapR':
                            case 'gapX':
                            case 'gapY':

                            //* Border
                            case 'borR':
                                if (typeof style === 'number') {
                                    acc[key] = formatSize(style);
                                } else {
                                    acc[key] = style;
                                }
                                break;
                            default:
                                acc[key] = style;
                                break;
                        }

                        return acc;
                    },
                    {},
                );

                const newChocoStyle = keysStyleProps.reduce<ChocoStyleType>(
                    (acc, key) => {
                        const style = chocoStyleProps[key];
                        switch (key) {
                            //* Keywords
                            //? width&height:100% width&height:100view
                            case 'cs':
                                acc = {
                                    ...(style as ChocoStylePropsType['cs']),
                                    ...acc,
                                };
                                break;
                            case 'full':
                                acc.w = '100%';
                                acc.h = '100%';
                                break;
                            case 'fullV':
                                acc.w = '100vw';
                                acc.h = '100vh';
                                break;

                            //* Display
                            //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
                            case 'dNone':
                                acc.dp = null;
                                break;
                            case 'dFlex':
                                acc.dp = 'f';
                                break;
                            case 'dInline':
                                acc.dp = 'i';
                                break;
                            case 'dInlineF':
                                acc.dp = 'if';
                                break;
                            case 'dBlock':
                                acc.dp = 'b';
                                break;
                            case 'dInlineB':
                                acc.dp = 'ib';
                                break;
                            case 'dGrid':
                                acc.dp = 'g';
                                break;
                            case 'dInlineG':
                                acc.dp = 'ig';
                                break;
                            case 'dTable':
                                acc.dp = 't';
                                break;
                            case 'dInlineT':
                                acc.dp = 'it';
                                break;

                            //* Flex direction
                            //? row reverse-row reverse-column column
                            case 'row':
                                acc.fd = 'r';
                                break;
                            case 'rRow':
                                acc.fd = 'rr';
                                break;
                            case 'column':
                                acc.fd = 'c';
                                break;
                            case 'rColumn':
                                acc.fd = 'cr';
                                break;

                            //* Flex wrap
                            case 'fWrap':
                                acc.fw = style as Sizes<boolean>;
                                break;

                            //* Align content
                            //? flex-end flex-start center space-around space-between stretch
                            case 'acEnd':
                                acc.ac = 'e';
                                break;
                            case 'acStart':
                                acc.ac = 's';
                                break;
                            case 'acCenter':
                                acc.ac = 'c';
                                break;
                            case 'acAround':
                                acc.ac = 'a';
                                break;
                            case 'acBetween':
                                acc.ac = 'b';
                                break;
                            case 'acStretch':
                                acc.ac = 'st';
                                break;

                            //* Align item
                            //? flex-end flex-start center space-around space-between stretch
                            case 'aEnd':
                                acc.a = 'e';
                                break;
                            case 'aStart':
                                acc.a = 's';
                                break;
                            case 'aCenter':
                                acc.a = 'c';
                                break;
                            case 'aAround':
                                acc.a = 'a';
                                break;
                            case 'aBetween':
                                acc.a = 'b';
                                break;
                            case 'aStretch':
                                acc.a = 'st';
                                break;

                            //* Justify content
                            //? flex-end flex-start center space-around space-between space-evenly
                            case 'jStart':
                                acc.j = 's';
                                break;
                            case 'jEnd':
                                acc.j = 'e';
                                break;
                            case 'jCenter':
                                acc.j = 'c';
                                break;
                            case 'jAround':
                                acc.j = 'a';
                                break;
                            case 'jBetween':
                                acc.j = 'b';
                                break;
                            case 'jEvenly':
                                acc.j = 'ev';
                                break;

                            //* Text align
                            //? end left start right center justify
                            case 'tEnd':
                                acc.text = 'e';
                                break;
                            case 'tStart':
                                acc.text = 's';
                                break;
                            case 'tLeft':
                                acc.text = 'l';
                                break;
                            case 'tRight':
                                acc.text = 'r';
                                break;
                            case 'tCenter':
                                acc.text = 'c';
                                break;
                            case 'tJustify':
                                acc.text = 'j';
                                break;

                            //* Position
                            //? static relative absolute fixed sticky
                            case 'posR':
                                acc.pos = 'r';
                                break;
                            case 'posA':
                                acc.pos = 'a';
                                break;
                            case 'posF':
                                acc.pos = 'f';
                                break;
                            case 'posS':
                                acc.pos = 's';
                                break;

                            //* Overflow
                            //? visible hidden scroll auto
                            case 'ofV':
                                acc.of = 'v';
                                break;
                            case 'ofH':
                                acc.of = 'h';
                                break;
                            case 'ofS':
                                acc.of = 's';
                                break;
                            case 'ofA':
                                acc.of = 'a';
                                break;

                            case 'ofxV':
                                acc.ofx = 'v';
                                break;
                            case 'ofxH':
                                acc.ofx = 'h';
                                break;
                            case 'ofxS':
                                acc.ofx = 's';
                                break;
                            case 'ofxA':
                                acc.ofx = 'a';
                                break;

                            case 'ofyV':
                                acc.ofy = 'v';
                                break;
                            case 'ofyH':
                                acc.ofy = 'h';
                                break;
                            case 'ofyS':
                                acc.ofy = 's';
                                break;
                            case 'ofyA':
                                acc.ofy = 'a';
                                break;

                            //* Pointer events
                            //? none auto
                            case 'eventN':
                                acc.event = 'n';
                                break;
                            case 'eventA':
                                acc.event = 'a';
                                break;

                            //* User select
                            //? none auto text all
                            case 'usN':
                                acc.us = 'n';
                                break;
                            case 'usA':
                                acc.us = 'a';
                                break;
                            case 'usT':
                                acc.us = 't';
                                break;
                            case 'usAll':
                                acc.us = 'al';
                                break;
                        }

                        return acc;
                    },
                    {},
                );

                const chocoStyle = {
                    ...newChocoProps,
                    ...newChocoStyle,
                } as ChocoStyleType;
                console.log('PropChocoStyle', csp, keys, chocoStyle, {
                    newChocoProps,
                    newChocoStyle,
                });
                return chocoStyle;
            },
            [formatSize],
        );
    }

    static useGetColor(): (color?: ColorsType) => string | undefined {
        const { palette } = this.useTheme();

        return useCallback(
            (color?: ColorsType): string | undefined => {
                switch (color) {
                    case undefined:
                        return;

                    case null:
                        return 'transparent';

                    //*common
                    case 'paper':
                        return palette.background.paper;

                    case 'inherit':
                        return palette.background.default;

                    //*text
                    case 'disabled':
                        return palette.text.disabled;

                    case 'disabledText':
                        return palette.primary.textDisabled;

                    case 'text':
                        return palette.text.primary;

                    //*primary
                    case 'primary':
                        return palette.primary.main;

                    case 'primaryText':
                        return palette.primary.text;

                    //*secondary
                    case 'secondary':
                        return palette.secondary.main;

                    case 'secondaryText':
                        return palette.secondary.text;

                    //*error
                    case 'error':
                        return palette.error.main;

                    case 'errorText':
                        return palette.error.text;

                    //*warning
                    case 'warning':
                        return palette.warning.main;

                    case 'warningText':
                        return palette.warning.text;

                    //*info
                    case 'info':
                        return palette.info.main;

                    case 'infoText':
                        return palette.info.text;

                    //*success
                    case 'success':
                        return palette.success.main;

                    case 'successText':
                        return palette.success.text;

                    default:
                        if (color?.startsWith?.('palette.')) {
                            const paletteColors = color.split('.');
                            let paletteColor: string | string[] | object =
                                palette;
                            for (let i = 1; i < paletteColors.length; i++) {
                                paletteColor = paletteColor[
                                    paletteColors[
                                        i
                                    ] as keyof typeof paletteColor
                                ] as string;
                            }
                            if (typeof paletteColor === 'string') {
                                return paletteColor;
                            }
                            return undefined;
                        } else {
                            const colors = palette[color as ColorDefaultType];
                            return colors ? colors.main : color;
                        }
                }
            },
            [palette],
        );
    }

    static useFormatSize(): {
        formatSize: FormatSizeType;
        callbackSize: CallbackSizeType;
    } {
        const { breakpoint } = this.useTheme();

        return useMemo(() => {
            function formatSize<S = SizeValue>(
                max: number,
                format: Record<SizeKey, number> = breakpoint.format,
                unit: string | undefined = undefined,
            ): Size<S> {
                const keySize = Object.keys(format) as SizeKey[];
                const output = keySize.reduce<Size<S>>((acc, key) => {
                    acc[key] = 0 as S;
                    return acc;
                }, {} as Size<S>);
                keySize.forEach((key) => {
                    const value = ((format[key] ?? 100) * (max / 100)) as S;
                    output[key as SizeKey] = unit
                        ? (`${value}${unit}` as S)
                        : value;
                });
                return output;
            }
            return {
                formatSize,
                callbackSize: <MaxSize, Vlaue, Return>(
                    size: MaxSize,
                    callback: (value: Vlaue, key: SizeKey) => Return,
                    fristValue?: Vlaue,
                ): Size<Return> => {
                    let sizes: Size<Return> = {};
                    const keysBreakpoint = Object.keys(
                        breakpoint.size,
                    ) as SizeKey[];
                    if (typeof size === 'number') {
                        sizes = formatSize(size);
                    } else if (typeof size === 'object') {
                        const Size = size as object;
                        const sizeKeys = Object.keys(Size) as (keyof Size)[];
                        if (
                            sizeKeys.find((key) => keysBreakpoint.includes(key))
                        ) {
                            const keySize = Object.keys(
                                breakpoint.format,
                            ) as SizeKey[];
                            sizes = keySize.reduce<Size<Return>>((acc, key) => {
                                if (
                                    Size[key as keyof typeof Size] !== undefined
                                )
                                    acc[key] = Size[
                                        key as keyof typeof Size
                                    ] as Return;
                                return acc;
                            }, {});
                        } else {
                            const keySize = Object.keys(
                                breakpoint.format,
                            ) as SizeKey[];
                            sizes = keySize.reduce<Size<Return>>((acc, key) => {
                                acc[key] = Size as unknown as Return;
                                return acc;
                            }, {});
                        }
                    }
                    const output: Size<Return> = { ...sizes };
                    const keys = Object.keys(sizes) as SizeKey[];
                    keys.forEach((key) => {
                        const value = (sizes[key] ?? fristValue) as Vlaue;
                        fristValue = value;
                        output[key] = callback(value, key);
                    });
                    return output;
                },
            };
        }, [breakpoint]);
    }

    static removeReservedProps<Props extends Record<string, any>>(
        reservedKeywords: string[],
        props?: Props,
    ): Props {
        // ถ้า props ไม่มีหรือเป็น undefined ให้คืนค่าเป็น object ว่าง
        if (!props) return {} as Props;

        // สร้าง object ใหม่โดยคัดลอก props เพื่อป้องกันการแก้ไขต้นฉบับ
        const newProps = { ...props };

        // ลบเฉพาะ property ที่เป็น reserved keyword
        reservedKeywords.forEach((keyword) => {
            if (keyword in newProps) {
                delete newProps[keyword];
            }
        });

        return newProps;
    }

    static removeProps<
        Props extends Record<string, unknown> = Record<string, unknown>,
        NewProps extends object = Props,
    >(prop: Props, removes: (keyof Props)[]): NewProps {
        const props = { ...prop };
        const keys = Object.keys(props);
        const newProps = keys.reduce<NewProps>((acc, key) => {
            if (!removes.includes(key)) {
                acc[key as keyof typeof acc] = props[
                    key
                ] as NewProps[keyof NewProps];
            }
            return acc;
        }, {} as NewProps);
        return newProps as unknown as NewProps;
    }

    static chocoProps<
        TagType extends keyof React.JSX.IntrinsicElements,
        Props extends ChocoStyledProps<TagType>,
    >(
        prop: Props,
        method: () => DeepPartial<Props>,
        removes: (keyof Props)[] = [],
    ) {
        const props = useMemo(() => {
            const newProps = method();
            // จัดการกรณี prop.cs เป็น undefined
            const newCs = { ...(prop.cs || {}), ...(newProps.cs || {}) };
            // สร้าง object ใหม่และลบ properties ที่ไม่ต้องการ
            return this.removeProps(
                { ...prop, ...newProps, cs: newCs },
                removes,
            );
        }, [prop, method]); // เพิ่ม method ใน dependency ถ้าต้องการให้เปลี่ยนตาม logic

        return props; // ไม่ต้อง spread อีกชั้น เพราะ removeProps คืน Props อยู่แล้ว
    }
}
