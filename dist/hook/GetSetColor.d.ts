import { ColorType } from "../types/color";
export type SetColorType = {
    color?: ColorType;
    action?: ColorType;
    bgColor?: ColorType;
    bgHover?: ColorType;
};
export default function GetSetColor(): (color?: ColorType) => SetColorType | undefined;
