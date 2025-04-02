export class Obj {
    static keys<Value extends object>(value: Value): (keyof Value)[] {
        return Object.keys(value) as (keyof Value)[];
    }
    static entries<Value extends object>(
        value: Value,
    ): { [K in keyof Value]: [K, Value[K]] }[keyof Value][] {
        return Object.entries(value) as {
            [K in keyof Value]: [K, Value[K]];
        }[keyof Value][];
    }
}
