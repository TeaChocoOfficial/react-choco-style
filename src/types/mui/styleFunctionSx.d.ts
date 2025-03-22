//-Path: "react-choco-style/src/types/mui/styleFunctionSx.d.ts"
import { AliasesCSSProperties } from './AliasesCSSProperties';
import { OverwriteCSSProperties } from './cssProperties';
import * as CSS from './csstype';
import { StandardCSSProperties } from './StandardCssProperties';

export type ResponsiveStyleValue<T> =
    | T
    | ReadonlyArray<T | null>
    | { [key: string]: T | null };

export type StandardLonghandPropertiesFallback<
    TLength = (string & {}) | 0,
    TTime = string & {},
> = CSS.Fallback<CSS.StandardLonghandProperties<TLength, TTime>>;

export type StandardShorthandPropertiesFallback<
    TLength = (string & {}) | 0,
    TTime = string & {},
> = CSS.Fallback<CSS.StandardShorthandProperties<TLength, TTime>>;

export interface StandardPropertiesFallback<
    TLength = (string & {}) | 0,
    TTime = string & {},
> extends StandardLonghandPropertiesFallback<TLength, TTime>,
        StandardShorthandPropertiesFallback<TLength, TTime> {}

export type SystemCssProperties<Theme extends object = {}> = {
    [K in keyof AllSystemCSSProperties]:
        | ResponsiveStyleValue<AllSystemCSSProperties[K]>
        | ((theme: Theme) => ResponsiveStyleValue<AllSystemCSSProperties[K]>)
        | null;
};

export interface CSSSelectorObjectOrCssVariables<Theme extends object = {}> {
    [cssSelectorOrVariable: string]:
        | ((theme: Theme) => SystemStyleObject<Theme> | string | number)
        | SystemStyleObject<Theme>
        | CssVariableType;
}

export interface AllSystemCSSProperties
    extends Omit<StandardCSSProperties, keyof OverwriteCSSProperties>,
        OverwriteCSSProperties,
        AliasesCSSProperties {}
