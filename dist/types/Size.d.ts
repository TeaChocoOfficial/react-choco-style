export type SizeKey = "m" | "t" | "l" | "d";
export type SizeValue = number | string | null;
export type Sizes<S = SizeValue> = SizeValue | Size<S>;
export type Size<S = SizeValue> = {
    [key in SizeKey]?: S;
};
