//-Path: "lib/src/types/size.ts"
import { StyleValue } from './chocoValue';

export type SizeKey =
    | 'v' //Vertical Mobile
    | 'h' //Horizontal phone
    | 't' //Tablet
    | 'l' //Laptop
    | 'd'; //Desktop
export type SizesValue<Value = StyleValue> = SizeType<Value> | Value;
export type SizeType<Value = StyleValue> = { [key in SizeKey]?: Value };

export type InSizesValue<Value = StyleValue> = Value extends SizeType
    ? Value
    : SizeType<Value>;

export type InSizeValue<
    Value = StyleValue,
    Size extends SizeType = SizeType,
> = Size extends SizeType<infer Value> ? Value : Value;
