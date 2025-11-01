//-Path: "lib/src/class/ChocoResponse.ts"
import Debug from '../../config/debug';
import { CColor } from '../theme/CColor';
import { ChocoColor } from './ChocoColor';
import { CsStyle } from '../style/CsStyle';
import { CsValue } from '../option/CsValue';
import { CssStyle } from '../style/CssStyle';
import { CsOption } from '../option/CsOption';
import { useTheme } from '../../hooks/useTheme';
import { CssPropertie } from '../style/CssProperties';
import { UseChocoThemeType } from '../../types/theme';
import { CsType, UseThemeOption } from '../../types/choco';

export class ChocoResponse {
    private _chocoColor: ChocoColor;
    private _useTheme: UseChocoThemeType;
    constructor(private debug?: boolean | string[]) {
        this._useTheme = useTheme();
        this._chocoColor = new ChocoColor();
    }

    private _getCssPropertie(styles: CsStyle) {
        const cssStyle = new CssPropertie(styles, {
            useTheme: this._useTheme,
            chocoColor: this._chocoColor,
            chocoStyle: this.chocoStyle.bind(this),
        });
        return cssStyle;
    }

    private _responseCs(cs?: CsType): CsStyle {
        const option: UseThemeOption = {
            CColor,
            CsStyle,
            CsValue,
            CsOption,
            theme: this._useTheme,
        };
        if (typeof cs === 'function') return new CsStyle({ ...cs(option) });
        if (cs instanceof CsStyle) return cs.clone;
        const styles = { ...(cs ?? {}) };
        return new CsStyle(styles);
    }

    chocoStyle(cs: CsType = {}): CssStyle {
        const csStyle = this._responseCs(cs);
        const cssStyle = this._getCssPropertie(csStyle);
        const styles = csStyle.cs;

        Debug.debug(this.debug, 'res choco', {
            cs,
            styles,
        });

        //* Style
        //? color background background-color background-image box-shadow text-shadow
        cssStyle.setColor('color', styles.clr);
        cssStyle.setCss('background', styles.bg);
        cssStyle.setColor('backgroundColor', styles.bgClr);
        cssStyle.setCss('backgroundImage', styles.bgImg);
        cssStyle.setCss('boxShadow', styles.bShadow);
        cssStyle.setCss('textShadow', styles.tShadow);
        //* Opacity
        cssStyle.setCss('opacity', styles.op);
        //* z-index
        cssStyle.setCss('zIndex', styles.z, { check: false });
        //* Width and Height
        cssStyle.setBase('width', ['wh', 'w'], { unit: '$base' });
        cssStyle.setBase('width', ['wh', 'w'], { unit: '$base' });
        cssStyle.setBase('height', ['wh', 'h'], { unit: '$base' });
        cssStyle.setBase('minWidth', ['minWH', 'minW'], { unit: '$base' });
        cssStyle.setBase('minHeight', ['minWH', 'minH'], { unit: '$base' });
        cssStyle.setBase('maxWidth', ['maxWH', 'maxW'], { unit: '$base' });
        cssStyle.setBase('maxHeight', ['maxWH', 'maxH'], { unit: '$base' });
        //* inset
        //? all top bottom left right left&right top&bottom
        cssStyle.setInset(
            {
                a: ['inset', styles.i],
                x: ['left', styles.x],
                x2: ['right', styles.x],
                y: ['top', styles.y],
                y2: ['bottom', styles.y],
                l: ['left', styles.l],
                r: ['right', styles.r],
                t: ['top', styles.t],
                b: ['bottom', styles.b],
            },
            { unit: '$base' },
        );
        //* Padding
        //? all top bottom left right left&right top&bottom
        cssStyle.setInset(
            {
                a: ['padding', styles.p],
                x: ['paddingLeft', styles.px],
                x2: ['paddingRight', styles.px],
                y: ['paddingTop', styles.py],
                y2: ['paddingBottom', styles.py],
                l: ['paddingLeft', styles.pl],
                r: ['paddingRight', styles.pr],
                t: ['paddingTop', styles.pt],
                b: ['paddingBottom', styles.pb],
            },
            { check: true, kit: 'padding' },
        );
        //* Margin
        //? all top bottom left right left&right top&bottom
        cssStyle.setInset(
            {
                a: ['margin', styles.m],
                x: ['marginLeft', styles.mx],
                x2: ['marginRight', styles.mx],
                y: ['marginTop', styles.my],
                y2: ['marginBottom', styles.my],
                l: ['marginLeft', styles.ml],
                r: ['marginRight', styles.mr],
                t: ['marginTop', styles.mt],
                b: ['marginBottom', styles.mb],
            },
            { check: true, kit: 'padding' },
        );
        //* Gap
        //? all row column
        cssStyle.setInset(
            {
                a: ['gap', styles.g],
                y: ['rowGap', styles.gy],
                x: ['columnGap', styles.gx],
            },
            { check: true, kit: 'padding' },
        );
        //* Size component
        cssStyle.setCss('fontSize', styles.sz, { check: true, kit: 'text' });
        //* FontSize
        cssStyle.setCss('fontSize', styles.fontS, { check: true, kit: 'text' });
        //* FontFamily
        cssStyle.setCss('fontFamily', styles.fontF);
        //* FontWeight
        cssStyle.setCss('fontWeight', styles.fontW, { debug: true });
        //* Text transform
        cssStyle.setCss('textTransform', styles.txtTf);

        //* Grids
        //? grid-template grid-area
        cssStyle.setGridTemplates('gridTemplate', styles.gridT);
        cssStyle.setGridTemplate('gridTemplateRows', styles.gridTR);
        cssStyle.setGridTemplate('gridTemplateColumns', styles.gridTC);
        cssStyle.setGridAreas('gridArea', styles.gridA);
        cssStyle.setGridArea('gridRow', styles.gridAR);
        cssStyle.setGridArea('gridColumn', styles.gridAC);
        //* Border
        cssStyle.setCss('borderWidth', styles.borW, {
            check: true,
            kit: 'border',
        });
        cssStyle.setCss('borderRadius', styles.borR, {
            check: true,
            kit: 'borR',
        });
        cssStyle.setCss('borderTopLeftRadius', styles.borRTL, {
            check: true,
            kit: 'borR',
        });
        cssStyle.setCss('borderTopRightRadius', styles.borRTR, {
            check: true,
            kit: 'borR',
        });
        cssStyle.setCss('borderBottomLeftRadius', styles.borRBL, {
            check: true,
            kit: 'borR',
        });
        cssStyle.setCss('borderBottomRightRadius', styles.borRBR, {
            check: true,
            kit: 'borR',
        });
        cssStyle.setColor('borderStyle', styles.borS);
        cssStyle.setColor('borderColor', styles.borClr);
        cssStyle.setBorders({
            a: ['border', styles.borders],
            x: ['borderLeft', styles.borderX],
            x2: ['borderRight', styles.borderX],
            y: ['borderTop', styles.borderY],
            y2: ['borderBottom', styles.borderY],
            l: ['borderLeft', styles.borderL],
            r: ['borderRight', styles.borderR],
            t: ['borderTop', styles.borderT],
            b: ['borderBottom', styles.borderB],
        });

        cssStyle.setBorders({ a: ['outline', styles.outlin] });
        //* transition
        cssStyle.setCss('transition', styles.trans, {
            calcs: [
                (after) => (typeof after === 'number' ? `${after}s` : after),
            ],
        });
        //* Transform
        cssStyle.setCss('transform', styles.form, { check: false });
        // if (styles.transformCenter) {
        //     const transformCenter = (
        //         value: SizesType<ChocoStyleDefType['transformCenter']>,
        //     ) => {
        //         if (!value) return;
        //         Size.callback(
        //             value,
        //             (value: ChocoStyleDefType['transformCenter']) => {
        //                 if (!value) return;
        //                 const centers = {
        //                     all: ['50%', '50%', 'translate(-50%, -50%)'],
        //                     x: ['50%', undefined, 'translateX(-50%)'],
        //                     y: [undefined, '50%', 'translateY(-50%)'],
        //                 };
        //                 const [top, left, transform] = centers[value] || [];
        //                 setCss('top', top);
        //                 setCss('left', left);
        //                 setCss('transform', transform);
        //             },
        //         );
        //     };
        //     if (Size.is(styles.transformCenter))
        //         Size.callback(styles.transformCenter, transformCenter);
        //     else transformCenter(styles.transformCenter);
        // }

        //* Display
        //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
        cssStyle.setSwitch('display', styles.dp, {
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
        cssStyle.setSwitch('flexDirection', styles.fd, {
            null: 'unset',
            r: 'row',
            rr: 'row-reverse',
            c: 'column',
            cr: 'column-reverse',
            i: 'initial',
        });
        //* Flex wrap
        cssStyle.setCss('flexWrap', styles.fw, {
            boo: { t: 'wrap', f: 'nowrap' },
        });
        //* Align content
        //? unset flex-end flex-start center space-around space-between stretch
        cssStyle.setSwitch('alignContent', styles.ac, {
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
        cssStyle.setSwitch('alignItems', styles.a, {
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
        cssStyle.setSwitch('justifyContent', styles.j, {
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
        cssStyle.setSwitch('justifyItems', styles.ji, {
            null: 'unset',
            e: 'end',
            s: 'start',
            c: 'center',
            st: 'stretch',
        });
        //* Text align
        //? unset end left start right center justify
        cssStyle.setSwitch('textAlign', styles.txtA, {
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
        cssStyle.setSwitch('position', styles.pos, {
            null: 'unset',
            r: 'relative',
            a: 'absolute',
            f: 'fixed',
            s: 'static',
        });
        //* Overflow
        //? visible hidden scroll auto
        cssStyle.setSwitch('overflow', styles.of, {
            null: 'unset',
            v: 'visible',
            h: 'hidden',
            s: 'scroll',
            a: 'auto',
        });
        cssStyle.setSwitch('overflowX', styles.ofx, {
            null: 'unset',
            v: 'visible',
            h: 'hidden',
            s: 'scroll',
            a: 'auto',
        });
        cssStyle.setSwitch('overflowY', styles.ofy, {
            null: 'unset',
            v: 'visible',
            h: 'hidden',
            s: 'scroll',
            a: 'auto',
        });
        //* Pointer events
        //? none auto
        cssStyle.setSwitch('pointerEvents', styles.event, {
            null: 'unset',
            n: 'none',
            a: 'auto',
        });
        //* Cursor
        //? default pointer move not-allowed wait text crosshair col-resize
        cssStyle.setSwitch('cursor', styles.cur, {
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
        cssStyle.setSwitch('userSelect', styles.us, {
            null: 'unset',
            n: 'none',
            a: 'auto',
            t: 'text',
            al: 'all',
        });
        //* Box sizing
        //? border-box content-box
        cssStyle.setSwitch('boxSizing', styles.bxSz, {
            null: 'unset',
            border: 'border-box',
            content: 'content-box',
        });

        return cssStyle.css;
    }
}
