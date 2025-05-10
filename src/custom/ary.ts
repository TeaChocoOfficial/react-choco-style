//-Path: "react-choco-style/src/custom/ary.ts"
export class Ary {
    static first<Value>(ary: Value[]): Value {
        return ary[0];
    }
    static last<Value>(ary: Value[]): Value {
        return ary[ary.length - 1];
    }
}
