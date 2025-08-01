//-Path: "react-choco-style/lib/src/class/ChocoResponse.ts"
import {
    CsType,
    CssType,
    StyledType,
    StyleTypes,
    ChocoStyleTypes,
} from '../types/choco';
import { Size } from './Size';
import { Obj } from '@teachoco-dev/cli';
import { ChocoCalc } from './ChocoCalc';
import { GridType } from '../types/chocoValue';
import { SxProp, SxType } from '../types/style';
import { SizesType, SizesValue } from '../types/size';
import { ChocoStyleDefType } from '../types/chocoStyle';
import { keysChocoStyle } from '../data/reservedKeywords';

export class ChocoResponse {
    private chocoCalc: ChocoCalc;
    constructor() {
        this.chocoCalc = new ChocoCalc();
    }

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

    private _getCssProperties(styles: ChocoStyleTypes): SxType {
        type CssProp = Record<keyof ChocoStyleDefType, SizesValue>;
        return Obj.reduce<CssProp, CssProp>(
            { ...styles } as CssProp,
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
    chocoStyle<
        Styles extends
            | ChocoStyleTypes
            | StyledType
            | StyleTypes
            | SxType
            | SxProp,
    >(cs: CsType = {}): Styles {
        const styles = this.chocoCalc._responseCs(cs);
        const toBase = this.chocoCalc._getToBase({ ...styles });
        const CssProperties: SxType = this._getCssProperties({ ...styles });
        const setCss = this.chocoCalc._setCss(CssProperties);

        //* Style
        //? background color background-color
        setCss('background', this.chocoCalc._toSize(styles.bg));
        setCss('color', this.chocoCalc._toColors(styles.clr));
        setCss('backgroundColor', this.chocoCalc._toColors(styles.bgClr));
        setCss(
            'backgroundImage',
            this.chocoCalc._toSize(styles.bgImg, {}, true),
        );
        setCss('boxShadow', this.chocoCalc._toSize(styles.bShadow, {}, true));
        setCss('textShadow', this.chocoCalc._toSize(styles.tShadow, {}, true));
        //* Opacity
        setCss('opacity', this.chocoCalc._toSize(styles.op));
        //* z-index
        setCss('zIndex', this.chocoCalc._toSize(styles.z, { check: false }));
        //* Width and Height
        setCss('width', toBase(['wh', 'w'], { unit: '$base' }));
        setCss('height', toBase(['wh', 'h'], { unit: '$base' }));
        setCss('minWidth', toBase(['minWH', 'minW'], { unit: '$base' }));
        setCss('minHeight', toBase(['minWH', 'minH'], { unit: '$base' }));
        setCss('maxWidth', toBase(['maxWH', 'maxW'], { unit: '$base' }));
        setCss('maxHeight', toBase(['maxWH', 'maxH'], { unit: '$base' }));
        //* inset
        //? all top bottom left right left&right top&bottom
        this.chocoCalc._setInset(
            setCss,
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
            { unit: '$base' },
        );
        //* Padding
        //? all top bottom left right left&right top&bottom
        this.chocoCalc._setInset(
            setCss,
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
            { check: true, response: 'padding', unit: '$padding' },
        );
        //* Margin
        //? all top bottom left right left&right top&bottom
        this.chocoCalc._setInset(
            setCss,
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
            { check: true, response: 'padding', unit: '$padding' },
        );
        //* Gap
        //? all row column
        this.chocoCalc._setInset(
            setCss,
            'gap',
            styles.g,
            { y: ['rowGap', styles.gy], x: ['columnGap', styles.gx] },
            { check: true, response: 'padding', unit: '$padding' },
        );
        //* Size component
        setCss(
            'fontSize',
            this.chocoCalc._toSize(styles.sz, {
                check: true,
                unit: '$text',
                response: 'text',
            }),
        );
        //* FontSize
        setCss(
            'fontSize',
            this.chocoCalc._toSize(styles.fontS, {
                check: true,
                unit: '$text',
                response: 'text',
            }),
        );
        //* FontFamily
        setCss('fontFamily', this.chocoCalc._toSize(styles.fontF));
        //* FontWeight
        setCss(
            'fontWeight',
            this.chocoCalc._toSize(styles.fontW, { debug: true }),
        );
        //* Text transform
        setCss('textTransform', this.chocoCalc._toSize(styles.txtTf));

        //* Grids
        //? grid-template grid-area
        if (styles.gridT !== undefined) {
            if (Size.is(styles.gridT))
                setCss(
                    'gridTemplate',
                    Size.callback(styles.gridT, this.chocoCalc._toGridTemplate),
                );
            else
                setCss(
                    'gridTemplate',
                    this.chocoCalc._toGridTemplates(styles.gridT as GridType[]),
                );
        }
        if (styles.gridTR !== undefined) {
            if (Size.is(styles.gridTR))
                setCss(
                    'gridTemplateRows',
                    Size.callback(
                        styles.gridTR,
                        this.chocoCalc._toGridTemplate,
                    ),
                );
            else
                setCss(
                    'gridTemplateRows',
                    this.chocoCalc._toGridTemplate(styles.gridTR as GridType),
                );
        }
        if (styles.gridTC !== undefined) {
            if (Size.is(styles.gridTC))
                setCss(
                    'gridTemplateColumns',
                    Size.callback(
                        styles.gridTC,
                        this.chocoCalc._toGridTemplate,
                    ),
                );
            else
                setCss(
                    'gridTemplateColumns',
                    this.chocoCalc._toGridTemplate(styles.gridTC as GridType),
                );
        }
        if (styles.gridA !== undefined) {
            if (Size.is(styles.gridA))
                setCss(
                    'gridArea',
                    Size.callback(styles.gridA, this.chocoCalc._toGridArea),
                );
            else
                setCss(
                    'gridArea',
                    this.chocoCalc._toGridArea(styles.gridA as GridType[]),
                );
        }
        if (styles.gridAR !== undefined) {
            if (Size.is(styles.gridAR))
                setCss(
                    'gridRow',
                    Size.callback(styles.gridAR, this.chocoCalc._toGridArea),
                );
            else
                setCss(
                    'gridRow',
                    this.chocoCalc._toGridArea([styles.gridAR] as GridType[]),
                );
        }
        if (styles.gridAC !== undefined) {
            if (Size.is(styles.gridAC))
                setCss(
                    'gridColumn',
                    Size.callback(styles.gridA, this.chocoCalc._toGridArea),
                );
            else
                setCss(
                    'gridColumn',
                    this.chocoCalc._toGridArea([styles.gridAC] as GridType[]),
                );
        }
        //* Border
        setCss(
            'borderWidth',
            this.chocoCalc._toSize(styles.borW, {
                check: true,
                unit: '$border',
                response: 'border',
            }),
        );
        setCss(
            'borderRadius',
            this.chocoCalc._toSize(styles.borR, {
                check: true,
                unit: '$borR',
                response: 'borR',
            }),
        );
        setCss(
            'borderTopLeftRadius',
            this.chocoCalc._toSize(styles.borRTL, {
                check: true,
                unit: '$borR',
                response: 'borR',
            }),
        );
        setCss(
            'borderTopRightRadius',
            this.chocoCalc._toSize(styles.borRTR, {
                check: true,
                unit: '$borR',
                response: 'borR',
            }),
        );
        setCss(
            'borderBottomLeftRadius',
            this.chocoCalc._toSize(styles.borRBL, {
                check: true,
                unit: '$borR',
                response: 'borR',
            }),
        );
        setCss(
            'borderBottomRightRadius',
            this.chocoCalc._toSize(styles.borRBR, {
                check: true,
                unit: '$borR',
                response: 'borR',
            }),
        );
        setCss('borderStyle', this.chocoCalc._toSize(styles.borS));
        setCss('borderColor', this.chocoCalc._toColors(styles.borClr));
        // if (styles.borders) console.log(toBorder(styles.borders));
        setCss('border', this.chocoCalc._toBorders(styles.borders));
        ['borderTop', 'borderBottom'].forEach((k) =>
            setCss(
                k as keyof SxType,
                this.chocoCalc._toBorders(
                    styles.borderY ??
                        styles[k === 'borderTop' ? 'borderT' : 'borderB'],
                ),
            ),
        );
        ['borderLeft', 'borderRight'].forEach((k) =>
            setCss(
                k as keyof SxType,
                this.chocoCalc._toBorders(
                    styles.borderX ??
                        styles[k === 'borderLeft' ? 'borderL' : 'borderR'],
                ),
            ),
        );

        //* Outline
        setCss('outline', this.chocoCalc._toBorders(styles.outlines));

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
            this.chocoCalc._toSize(styles.form, { check: false }),
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
                            x: ['50%', undefined, 'translateX(-50%)'],
                            y: [undefined, '50%', 'translateY(-50%)'],
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
            this.chocoCalc._setSwitch(styles.dp, {
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
            this.chocoCalc._setSwitch(styles.fd, {
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
            this.chocoCalc._setSwitch(styles.ac, {
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
            this.chocoCalc._setSwitch(styles.a, {
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
            this.chocoCalc._setSwitch(styles.j, {
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
            this.chocoCalc._setSwitch(styles.ji, {
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
            this.chocoCalc._setSwitch(styles.txtA, {
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
            this.chocoCalc._setSwitch(styles.pos, {
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
            this.chocoCalc._setSwitch(styles.of, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            }),
        );
        setCss(
            'overflowX',
            this.chocoCalc._setSwitch(styles.ofx, {
                null: 'unset',
                v: 'visible',
                h: 'hidden',
                s: 'scroll',
                a: 'auto',
            }),
        );
        setCss(
            'overflowY',
            this.chocoCalc._setSwitch(styles.ofy, {
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
            this.chocoCalc._setSwitch(styles.event, {
                null: 'unset',
                n: 'none',
                a: 'auto',
            }),
        );
        //* Cursor
        //? default pointer move not-allowed wait text crosshair col-resize
        setCss(
            'cursor',
            this.chocoCalc._setSwitch(styles.cur, {
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
            this.chocoCalc._setSwitch(styles.us, {
                null: 'unset',
                n: 'none',
                a: 'auto',
                t: 'text',
                al: 'all',
            }),
        );
        //* Box sizing
        //? border-box content-box
        setCss(
            'boxSizing',
            this.chocoCalc._setSwitch(styles.bxSz, {
                null: 'unset',
                border: 'border-box',
                content: 'content-box',
            }),
        );

        // console.log(CssProperties, styles);
        return { ...CssProperties } as Styles;
    }
}
