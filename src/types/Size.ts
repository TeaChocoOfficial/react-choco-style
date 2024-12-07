//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/types/Size.ts"

export type SizeKey =
    | "v" //Vertical Mobile
    | "h" //Horizontal phone
    | "t" //Tablet
    | "l" //Laptop
    | "d"; //Desktop
export type SizeValue = number | string | null;
export type Sizes<S = SizeValue> = Size<S> | S;
export type Size<S = SizeValue> = { [key in SizeKey]?: S };
