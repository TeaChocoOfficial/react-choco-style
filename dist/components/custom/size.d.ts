import { Size, SizeValue } from "../../types/Size";
export declare function formatSize<S = SizeValue>(max: number, size?: Size<S> | undefined, unit?: string | undefined): Size<S>;
export declare function callbackSize<S = SizeValue>(size: number | Size, callback: (value: S) => string): Size<S>;
