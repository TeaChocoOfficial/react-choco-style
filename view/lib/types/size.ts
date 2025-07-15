//-Path: "react-choco-style/lib/src/types/size.ts"
import { Size } from '../class/Size';
import { KeyRootTheme } from './theme';

export type SizeKey =
    | 'v' //Vertical Mobile
    | 'h' //Horizontal phone
    | 't' //Tablet
    | 'l' //Laptop
    | 'd'; //Desktop
export type SizeValue = number | string | symbol | null | undefined;
export type Sizes<
    Value = SizeValue,
    SizesValue extends InSizesValue<Value> = InSizesValue<Value>,
> = Size<Value, SizesValue> | Value;
export type SizesValue<Value = SizeValue> = SizeType<Value> | Value;
export type SizeType<Value = SizeValue> = { [key in SizeKey]?: Value };
export type SizesType<Value = SizeValue> = SizeType<Value> | Sizes<Value>;
export type SizesValueType<
    Value = SizeValue,
    InSizeValue extends InSizesValue<Value> = InSizesValue<Value>,
> = Size<Value, InSizeValue> | SizesValue<Value>;
export type InSizesValue<Value = SizeValue> = Value extends SizeType
    ? Value
    : SizeType<Value>;
export type SizeOption<ValueSize = SizeValue> = {
    unit?: string;
    debug?: boolean;
    check?: boolean;
    format?: boolean;
    root?: KeyRootTheme | number;
    response?: KeyRootTheme | number;
    calc?: (value: ValueSize, root: number) => SizeValue;
};
