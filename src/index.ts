//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/index.ts"
export {
    type CustomTheme,
    removeReservedProps,
    type ChocoStyledProps,
} from "./components/custom/Styled";
import Styled from "./components/custom/Styled";
export { getFont } from "./components/custom/font";
export {
    applyStyleSheet,
    SetUpStyleSheets,
    convertToStyleSheet,
    type ChocoStyleSheetType,
    type ChocoStyleSheetsType,
} from "./components/custom/StyleSheets";
import ChocoStyleSheets from "./components/custom/StyleSheets";
export { ComponentSize } from "./components/custom/ComponentSize";
export { formatSize, callbackSize } from "./components/custom/size";

export {
    keysChocoStyle,
    KeywordsChocoStyle,
    keysChocoStyleProps,
    KeywordsChocoStyleDef,
    KeywordsChocoStyleProps,
} from "./components/data/reservedKeywords";

import CBox from "./components/hook/CBox";
import CText from "./components/hook/CText";
import CPaper from "./components/hook/CPaper";
import CButton from "./components/hook/CButton";
import CSkeleton from "./components/hook/CSkeleton";
import CContainer from "./components/hook/CContainer";
import CIconButton from "./components/hook/CIconButton";
export type { CBoxProps } from "./components/hook/CBox";
export type { CTextProps } from "./components/hook/CText";
export type { CPaperProps } from "./components/hook/CPaper";
export type { CButtonProps } from "./components/hook/CButton";
export type { CSkeletonProps } from "./components/hook/CSkeleton";
export type { CContainerProps } from "./components/hook/CContainer";
export type { CIconButtonProps } from "./components/hook/CIconButton";

import InitChoco from "./components/layout/InitChoco";
import ChocoStart from "./components/layout/ChocoStart";
export { type InnerType, innerAtom } from "./components/layout/ChocoStart";

import GetColor from "./hook/GetColor";
import GetSetColor from "./hook/GetSetColor";
export type { SetColorType } from "./hook/GetSetColor";
import ChocoStyleToStyle from "./hook/ChocoStyleToStyle";
import chocoPropsToChocoStyle from "./hook/chocoPropsToChocoStyle";

import useTheme from "./theme/useTheme";
export { getThemeMode, ChocoTheme, themeModeAtom } from "./theme/theme";

export type {
    ColorsTypes,
    PaletteType,
    ModesKeyType,
    ThemeFontsType,
    ChocoThemeType,
    DefChocoThemeType,
    UseChocoThemeType,
} from "./types/theme";
export type {
    ColorType,
    ColorsType,
    ColorHexType,
    ColorTextType,
    ColorCommonType,
    ColorDefaultType,
} from "./types/color";
export type {
    GridAreaType,
    ChocoStyleType,
    ChocoStyleTypes,
    BorderStyleType,
    GridTemplateType,
    ChocoStyleDefType,
    ChocoStylePropsType,
    ChocoStylePropsTypes,
} from "./types/ChocoStyle";
export type { SizeKey, SizeValue, Sizes, Size } from "./types/Size";
export { ColorText, ColorCommon, ColorDefault } from "./types/color";

export {
    Styled,
    ChocoStyleSheets,
    CBox,
    CText,
    CPaper,
    CButton,
    CSkeleton,
    CContainer,
    CIconButton,
    InitChoco,
    ChocoStart,
    GetColor,
    GetSetColor,
    ChocoStyleToStyle,
    chocoPropsToChocoStyle,
    useTheme,
};
