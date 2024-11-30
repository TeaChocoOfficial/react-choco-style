import { ColorType, ColorsType } from "../types/color";
export type SetColorType = {
    color?: ColorsType;
    action?: ColorsType;
    bgColor?: ColorsType;
    bgHover?: ColorsType;
};
export default function GetSetColor(): (color?: ColorType) => SetColorType | undefined;
