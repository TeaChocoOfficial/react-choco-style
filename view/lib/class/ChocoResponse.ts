//-Path: "react-choco-style/lib/src/class/ChocoResponse.ts"
import { Size } from './Size';
import { Obj } from '@teachoco-dev/cli';
import { ChocoCalc } from './ChocoCalc';
import { GridType } from '../types/chocoValue';
import { SxProp, SxType } from '../types/style';
import { SizesType, SizesValue } from '../types/size';
import { ChocoStyleDefType } from '../types/chocoStyle';
import { keysChocoStyle } from '../data/reservedKeywords';
import { CsType, CssType, StyledType, StyleTypes } from '../types/choco';

export class ChocoResponse extends ChocoCalc {
    private _reduceCssProperties(css: CssType): SxType {
        return Obj.reduce<CssType, SxType>(
            css,
            (acc, key, value) => ({
                ...acc,
                [`&${key}`]: this._getCssProperties(
                    this.chocoStyle<StyleTypes>(value),
                ),
            }),
            {},
        ) as SxType;
    }

    private _getCssProperties(styles: StyleTypes): SxType {
        type CssProp = Record<keyof ChocoStyleDefType, SizesValue>;
        return Obj.reduce<CssProp, CssProp>(
            styles as CssProp,
            (acc, key, value) => {
                if (key === 'css')
                    return {
                        ...acc,
                        ...this._reduceCssProperties(value as CssType),
                    } as CssProp;
                if (!keysChocoStyle.includes(key)) acc[key] = value;
                return acc;
            },
            {} as CssProp,
        ) as SxType;
    }
    chocoStyle<Styles extends StyledType | StyleTypes | SxType | SxProp>(
        cs: CsType = {},
    ): Styles {
        const styles = this._responseCs(cs);
        const textUnit = this._useTheme.root.unit.text;
        const CssProperties: SxType = this._getCssProperties(styles);
        const setCss = this._setCss(CssProperties);

        //* Style
        //? background color background-color
        setCss('background', this._toSize(styles.bg));
        setCss('color', this._toColors(styles.clr));
        setCss('backgroundColor', this._toColors(styles.bgClr));
        setCss('backgroundImage', this._toSize(styles.bgImg, {}, true));
        setCss('boxShadow', this._toSize(styles.bShadow, {}, true));
        setCss('textShadow', this._toSize(styles.tShadow, {}, true));
        //* Opacity
        setCss('opacity', this._toSize(styles.op, { unit: '' })); //time: 1,
        //* z-index
        setCss(
            'zIndex',
            this._toSize(styles.z, { unit: '', check: false }), //time: 1,
        );
        //* Width and Height
        setCss('width', this._toSize(styles.wh) ?? this._toSize(styles.w));
        setCss('height', this._toSize(styles.wh) ?? this._toSize(styles.h));
        setCss(
            'minWidth',
            this._toSize(styles.minWH) ?? this._toSize(styles.minW),
        );
        setCss(
            'minHeight',
            this._toSize(styles.minWH) ?? this._toSize(styles.minH),
        );
        setCss(
            'maxWidth',
            this._toSize(styles.maxWH) ?? this._toSize(styles.maxW),
        );
        setCss(
            'maxHeight',
            this._toSize(styles.maxWH) ?? this._toSize(styles.maxH),
        );
        //* inset
        //? all top bottom left right left&right top&bottom
        setCss(
            ...this._setInset(
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
            ),
        );
        //* Padding
        //? all top bottom left right left&right top&bottom
        setCss(
            ...this._setInset(
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
            ),
        );
        //* Margin
        //? all top bottom left right left&right top&bottom
        setCss(
            ...this._setInset(
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
            ),
        );
        //* Gap
        //? all row column
        setCss(
            ...this._setInset(
                'gap',
                styles.g,
                { y: ['rowGap', styles.gy], x: ['columnGap', styles.gx] },
                { response: 'padding' },
            ),
        );
        //* FontSize
        setCss(
            'fontSize',
            this._toSize(styles.sz, {
                check: true,
                unit: textUnit,
                response: 'text',
            }),
        );
        setCss(
            'fontSize',
            this._toSize(styles.fontS, {
                check: true,
                unit: textUnit,
                response: 'text',
            }),
        );

        //* Grids
        //? grid-template grid-area
        if (styles.gridT !== undefined) {
            if (Size.is(styles.gridT))
                setCss(
                    'gridTemplate',
                    Size.callback(styles.gridT, this._toGridTemplate),
                );
            else
                setCss(
                    'gridTemplate',
                    this._toGridTemplates(styles.gridT as GridType[]),
                );
        }
        if (styles.gridTR !== undefined) {
            if (Size.is(styles.gridTR))
                setCss(
                    'gridTemplateRows',
                    Size.callback(styles.gridTR, this._toGridTemplate),
                );
            else
                setCss(
                    'gridTemplateRows',
                    this._toGridTemplate(styles.gridTR as GridType),
                );
        }
        if (styles.gridTC !== undefined) {
            if (Size.is(styles.gridTC))
                setCss(
                    'gridTemplateColumns',
                    Size.callback(styles.gridTC, this._toGridTemplate),
                );
            else
                setCss(
                    'gridTemplateColumns',
                    this._toGridTemplate(styles.gridTC as GridType),
                );
        }
        if (styles.gridA !== undefined) {
            if (Size.is(styles.gridA))
                setCss(
                    'gridArea',
                    Size.callback(styles.gridA, this._toGridArea),
                );
            else
                setCss(
                    'gridArea',
                    this._toGridArea(styles.gridA as GridType[]),
                );
        }
        if (styles.gridAR !== undefined) {
            if (Size.is(styles.gridAR))
                setCss(
                    'gridRow',
                    Size.callback(styles.gridAR, this._toGridArea),
                );
            else
                setCss(
                    'gridRow',
                    this._toGridArea([styles.gridAR] as GridType[]),
                );
        }
        if (styles.gridAC !== undefined) {
            if (Size.is(styles.gridAC))
                setCss(
                    'gridColumn',
                    Size.callback(styles.gridA, this._toGridArea),
                );
            else
                setCss(
                    'gridColumn',
                    this._toGridArea([styles.gridAC] as GridType[]),
                );
        }
        //* Border
        setCss(
            'borderWidth',
            this._toSize(styles.borW, { response: 'border' }),
        );
        setCss('borderRadius', this._toSize(styles.borR, { response: 'borR' }));
        setCss(
            'borderTopLeftRadius',
            this._toSize(styles.borRTL, { response: 'borR' }),
        );
        setCss(
            'borderTopRightRadius',
            this._toSize(styles.borRTR, { response: 'borR' }),
        );
        setCss(
            'borderBottomLeftRadius',
            this._toSize(styles.borRBL, { response: 'borR' }),
        );
        setCss(
            'borderBottomRightRadius',
            this._toSize(styles.borRBR, { response: 'borR' }),
        );
        setCss('borderStyle', this._toSize(styles.borS));
        setCss('borderColor', this._toColors(styles.borClr));
        // if (styles.borders) console.log(toBorder(styles.borders));
        setCss('border', this._toBorders(styles.borders));
        ['borderTop', 'borderBottom'].forEach((k) =>
            setCss(
                k as keyof SxType,
                this._toBorders(
                    styles.borderY ??
                        styles[k === 'borderTop' ? 'borderT' : 'borderB'],
                ),
            ),
        );
        ['borderLeft', 'borderRight'].forEach((k) =>
            setCss(
                k as keyof SxType,
                this._toBorders(
                    styles.borderX ??
                        styles[k === 'borderLeft' ? 'borderL' : 'borderR'],
                ),
            ),
        );

        //* Outline
        setCss('outline', this._toBorders(styles.outlines));

        //* transition
        setCss(
            'transition',
            styles.trans !== undefined
                ? Size.is(styles.trans)
                    ? Size.callback(styles.trans, (trans) =>
                          typeof trans === 'string'
                              ? trans
                              : `${trans?.toString()}s`,
                      )
                    : typeof styles.trans === 'string'
                    ? styles.trans
                    : `${styles.trans}s`
                : undefined,
        );
        //* Transform
        setCss(
            'transform',
            this._toSize(styles.form, { unit: '', check: false }),
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
        setCss(
            'display',
            this._setSwitch(styles.dp, {
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
            }),
        );
        //* Flex direction
        //? unset row reverse-row column reverse-column
        setCss(
            'flexDirection',
            this._setSwitch(styles.fd, {
                null: 'unset',
                r: 'row',
                rr: 'row-reverse',
                c: 'column',
                cr: 'column-reverse',
                i: 'initial',
            }),
        );
        //* Flex wrap
        if (styles.fw !== undefined) {
            setCss('flexWrap', styles.fw ? 'wrap' : 'nowrap');
        }
        //* Align content
        //? unset flex-end flex-start center space-around space-between stretch
        setCss(
            'alignContent',
            this._setSwitch(styles.ac, {
                null: 'unset',
                e: 'flex-end',
                s: 'flex-start',
                c: 'center',
                a: 'space-around',
                b: 'space-between',
                st: 'stretch',
            }),
        );
        //* Align items
        //? unset flex-end flex-start center space-around space-between stretch
        setCss(
            'alignItems',
            this._setSwitch(styles.a, {
                null: 'unset',
                e: 'flex-end',
                s: 'flex-start',
                c: 'center',
                a: 'space-around',
                b: 'space-between',
                st: 'stretch',
            }),
        );
        //* Justify content
        //? unset flex-end flex-start center space-evenly space-around space-between
        setCss(
            'justifyContent',
            this._setSwitch(styles.j, {
                null: 'unset',
                e: 'flex-end',
                s: 'flex-start',
                c: 'center',
                ev: 'space-evenly',
                a: 'space-around',
                b: 'space-between',
            }),
        );
        //* Justify items
        //? unset end start center stretch
        setCss(
            'justifyItems',
            this._setSwitch(styles.ji, {
                null: 'unset',
                e: 'end',
                s: 'start',
                c: 'center',
                st: 'stretch',
            }),
        );
        //* Text align
        //? unset end left start right center justify
        setCss(
            'textAlign',
            this._setSwitch(styles.text, {
                null: 'unset',
                e: 'end',
                l: 'left',
                s: 'start',
                r: 'right',
                c: 'center',
                j: 'justify',
            }),
        );
        //* Position
        //? unset relative absolute fixed static (เปลี่ยนจาก sticky เป็น static ตามโค้ดเดิม)
        setCss(
            'position',
            this._setSwitch(styles.pos, {
                null: 'unset',
                r: 'relative',
                a: 'absolute',
                f: 'fixed',
                s: 'static',
            }),
        );
        //* Overflow
        //? visible hidden scroll auto
        setCss(
            'overflow',
            this._setSwitch(styles.of, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            }),
        );
        setCss(
            'overflowX',
            this._setSwitch(styles.ofx, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            }),
        );
        setCss(
            'overflowY',
            this._setSwitch(styles.ofy, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            }),
        );
        //* Pointer events
        //? none auto
        setCss(
            'pointerEvents',
            this._setSwitch(styles.event, {
                null: 'unset',
                n: 'none',
                a: 'auto',
            }),
        );
        //* Cursor
        //? default pointer move not-allowed wait text crosshair col-resize
        setCss(
            'cursor',
            this._setSwitch(styles.cur, {
                null: 'unset',
                d: 'default',
                p: 'pointer',
                m: 'move',
                n: 'not-allowed',
                w: 'wait',
                t: 'text',
                c: 'crosshair',
                cr: 'col-resize',
            }),
        );
        //* User select
        //? none auto text all
        setCss(
            'userSelect',
            this._setSwitch(styles.us, {
                null: 'unset',
                n: 'none',
                a: 'auto',
                t: 'text',
                al: 'all',
            }),
        );
        // console.log(CssProperties, styles);
        return { ...CssProperties } as Styles;
    }
}
