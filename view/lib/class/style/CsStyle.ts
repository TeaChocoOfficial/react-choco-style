//-Path: "lib/src/class/style/CsStyle.ts"
import { Obj } from '@teachoco-dev/cli';
import { ChocoStylesType } from '../../types/chocoStyle';

export class CsStyle<CS extends ChocoStylesType = ChocoStylesType> {
    cs: CS;
    constructor(cs: CS = {} as CS) {
        this.cs = this._toCs(cs);
    }

    private _toCs(cs?: CS | CsStyle<CS>): CS {
        if (cs instanceof CsStyle) return cs.cs;
        return cs || ({} as CS);
    }

    assign(cs?: Partial<ChocoStylesType>): this {
        this.cs = Object.assign(this.cs, cs);
        return this;
    }

    add(cs: ChocoStylesType | CsStyle): this {
        this.cs = Obj.mix(this.cs, this._toCs(cs as CS));
        return this;
    }

    pop(cs: ChocoStylesType | CsStyle): this {
        this.cs = Obj.mix(this._toCs(cs as CS), this.cs);
        return this;
    }

    set(key: keyof CS, value?: CS[keyof CS]): this {
        if (value === undefined) delete this.cs[key];
        else if (value !== undefined) this.cs[key] = value;
        return this;
    }

    get clone(): CsStyle<CS> {
        const clone = new CsStyle<CS>({ ...this.cs });
        return clone;
    }

    map<Render, MethodValue = CS>(
        method: (
            value: MethodValue,
            key: keyof CS,
            index: number,
            array: (keyof CS)[],
        ) => Render,
    ): Render[] {
        return Obj.map(this.cs, (value, key, index, array) =>
            method(value as MethodValue, key, index, array),
        );
    }

    reduce<Value = CS[keyof CS], Render extends CS = CS>(
        method: (
            acc: CS,
            value: Value,
            key: keyof CS,
            index: number,
            array: (keyof CS)[],
        ) => Render,
    ): Render {
        return CsStyle.reduce<CS, Value, Render>(this.cs, method);
    }

    static reduce<
        CS extends ChocoStylesType = ChocoStylesType,
        Value = CS[keyof CS],
        Render extends ChocoStylesType = ChocoStylesType,
    >(
        value: CS,
        method: (
            acc: CS,
            value: Value,
            key: keyof CS,
            index: number,
            array: (keyof CS)[],
        ) => Render,
    ): Render {
        const render = Obj.reduce(
            value,
            (acc, key, value, index, array) =>
                method(acc as CS, value as Value, key, index, array),
            {} as ChocoStylesType,
        );
        return render as Render;
    }
}
