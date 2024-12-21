//-Path: "react-choco-style/src/types/style.ts"
import { SizeKey } from "./Size";

export type ResponsiveCSSType = { [key in SizeKey]?: CSSType };

export type CSSType = {
    [key in keyof React.CSSProperties]?: React.CSSProperties[key];
};
