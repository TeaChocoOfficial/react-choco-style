//-Path: "lib/src/class/CssStyle.ts"
import { Obj } from '@teachoco-dev/cli';
import { SxType } from '../../types/style';

export class CssStyle<CSS extends SxType = SxType> {
    css: CSS;
    constructor(css: CSS = {} as CSS) {
        this.css = this._toCss(css);
    }

    private _toCss(css?: CSS | CssStyle<CSS>): CSS {
        if (css instanceof CssStyle) return css.css;
        return css || ({} as CSS);
    }

    assign(css?: Partial<CSS>): this {
        this.css = Object.assign(this.css, css);
        return this;
    }

    add(css: CSS | CssStyle<CSS>): this {
        this.css = Obj.mix(this.css, this._toCss(css));
        return this;
    }

    pop(css: CSS | CssStyle<CSS>): this {
        this.css = Obj.mix(this._toCss(css), this.css);
        return this;
    }

    set(key: keyof CSS, value: CSS[keyof CSS]): this {
        this.css[key] = value;
        return this;
    }

    get clone(): CssStyle<CSS> {
        const clone = new CssStyle<CSS>({ ...this.css });
        return clone;
    }

    map<Render, MethodValue = CSS>(
        method: (
            value: MethodValue,
            key: keyof CSS,
            index: number,
            array: (keyof CSS)[],
        ) => Render,
    ): Render[] {
        return Obj.map(this.css, (value, key, index, array) =>
            method(value as MethodValue, key, index, array),
        );
    }

    reduce<Value = CSS[keyof CSS], Render extends CSS = CSS>(
        method: (
            acc: CSS,
            value: Value,
            key: keyof CSS,
            index: number,
            array: (keyof CSS)[],
        ) => Render,
    ): Render {
        return CssStyle.reduce<CSS, Value, Render>(this.css, method);
    }
    static reduce<
        CSS extends SxType = SxType,
        Value = SxType[keyof SxType],
        Render extends SxType = SxType,
    >(
        value: CSS,
        method: (
            acc: CSS,
            value: Value,
            key: keyof CSS,
            index: number,
            array: (keyof CSS)[],
        ) => Render,
    ): Render {
        const render = Obj.reduce(
            value,
            (acc, key, value, index, array) =>
                method(acc as CSS, value as Value, key, index, array),
            {} as SxType,
        );
        return render as Render;
    }
}
