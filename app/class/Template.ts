//-Path: "react-choco-style/lib/src/class/Template.ts"

export abstract class Template<Value> {
    abstract add(value: Value): this;
    abstract pop(value: Value): this;

    abstract set(key: keyof Value, value: Value[keyof Value]): this;

    abstract get clone(): Template<Value>;
    abstract map<Render, MethodValue = Value>(
        method: (
            value: MethodValue,
            key: keyof Value,
            index: number,
            array: (keyof Value)[],
        ) => Render,
    ): Render[];
    abstract reduce<NewValue = Value, Render extends Value = Value>(
        method: (
            value: Value,
            key: string,
            index: number,
            array: string[],
        ) => NewValue,
    ): Render;
}
