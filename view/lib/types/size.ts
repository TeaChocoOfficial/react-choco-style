//-Path: "react-choco-style/lib/src/types/size.ts"
import { Size } from '../class/Size';
import { SizeOption } from '../class/SizeOption';
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
export type UnitType = `$${KeyRootTheme}` | `*${string}`;
export type SizeOptionType<ValueSize = SizeValue> = {
    sz?: KeyRootTheme | number;
    unit?: UnitType;
    root?: KeyRootTheme | number;
    debug?: boolean | string[]; //? เช็คว่ามีการใช้งาน option หรือไม่
    check?: boolean; //? ถ้าเป็นเลขลบให้ format เลย
    format?: boolean; //? ทำการ format ให้ค่าที่เป็นเลขหารกับเลข format ใน breakpoin ตรงกับ key
    response?: KeyRootTheme | number;
    responsive?: boolean;
    calc?: (value: ValueSize, root: number) => SizeValue;
};

export type SizeOptions<Value = SizeValue> =
    | SizeOption<Value>
    | SizeOptionType<Value>;
export type SizeOptionDoneKey =
    | 'calc'
    | 'unit'
    | 'check'
    | 'format'
    | 'response'
    | 'responsive';
