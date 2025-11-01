//-Path: "react-choco-style/lib/src/class/CsValue.ts"
import { StyleValue } from '../types/chocoValue';

export class CsValue<Value = StyleValue, Get extends StyleValue = StyleValue> {
    constructor(private value: Value) {}

    get get(): Get {
        if (this.value instanceof CsValue) return this.value.get;
        if (this.value instanceof String) return this.value as unknown as Get;
        if (this.value instanceof Symbol) return this.value as unknown as Get;
        if (this.value instanceof Number) return this.value as unknown as Get;
        return undefined as Get;
    }

    toString(): string {
        return String(this.value);
    }
}
