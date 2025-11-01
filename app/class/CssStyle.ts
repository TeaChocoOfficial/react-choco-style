//-Path: "react-choco-style/lib/src/class/CssStyle.ts"
import { Template } from './Template';
import { Obj } from '@teachoco-dev/cli';
import { SxType } from '../types/style';

export class CssStyle<
    CSS extends SxType = SxType,
> extends Template<CSS> {
    constructor(public css: CSS = {} as CSS) {
        super();
    }

    add(css: CSS): this {
        this.css = Obj.mix(this.css, css);
        return this;
    }

    pop(css: CSS): this {
        this.css = Obj.mix(css, this.css);
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
            key: keyof SxType,
            index: number,
            array: (keyof SxType)[],
        ) => Render,
    ): Render[] {
        return Obj.map(this.css, (value, key, index, array) =>
            method(
                value as MethodValue,
                key as keyof SxType,
                index,
                array as (keyof SxType)[],
            ),
        );
    }

    reduce<NewValue = CSS[keyof CSS], Render extends CSS = CSS>(
        method: (
            value: CSS,
            key: keyof SxType,
            index: number,
            array: (keyof SxType)[],
        ) => NewValue,
    ): Render {
        return CssStyle.reduce<CSS, NewValue, Render>(this.css, method);
    }
    static reduce<
        Value = SxType[keyof SxType],
        NewValue = SxType[keyof SxType],
        Render extends SxType = SxType,
    >(
        value: SxType,
        method: (
            value: Value,
            key: keyof SxType,
            index: number,
            array: (keyof SxType)[],
        ) => NewValue,
    ): Render {
        const render = Obj.reduce(
            value,
            (acc, key, value, index, array) => {
                const newValue = method(value as Value, key, index, array);
                (acc as any)[key] = newValue;
                return acc;
            },
            { ...value } as SxType,
        );
        return render as Render;
    }
}
