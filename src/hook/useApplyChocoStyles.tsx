//-Path: "react-choco-style/src/hook/useApplyChocoStyles.tsx"
import {
    ChocoStyleTypes,
    KeyStylesAndType,
    SelectorStyleType,
} from "../types/ChocoStyle";
import { useCallback } from "react";
import { SizeKey } from "../types/Size";
import useTheme from "../theme/useTheme";
import useChocoStyle from "./useChocoStyle";
import useSetStyleSheets, {
    SetChocoSheetType,
    SetChocoStyleSheetType,
} from "./useSetStyleSheets";
import { ResponsiveCSSType } from "../types/style";
import useConvertResponsive from "./useConvertResponsive";

export default function useApplyChocoStyles() {
    const { breakpoint } = useTheme();
    const ChocoStyle = useChocoStyle();
    const { addStyle } = useSetStyleSheets();
    const ConvertResponsive = useConvertResponsive();

    return useCallback(
        (
            tag: KeyStylesAndType,
            andChocoStyles: Record<SelectorStyleType, ChocoStyleTypes>,
            important?: number,
        ) => {
            const keyAndChocoStyles = Object.keys(
                andChocoStyles,
            ) as (keyof typeof andChocoStyles)[];

            return keyAndChocoStyles.map((selectorTag) => {
                const newCss = ChocoStyle(andChocoStyles[selectorTag]);
                const coverts = ConvertResponsive(selectorTag, newCss);
                // console.log(selectorTag, newCss, andChocoStyles[selectorTag]);
                const keysCoverts = Object.keys(
                    coverts,
                ) as (keyof ResponsiveCSSType)[];
                const newCoverts: (SetChocoSheetType | undefined)[] =
                    keysCoverts
                        .map((key): SetChocoSheetType | undefined => {
                            const size = breakpoint.size[key as SizeKey];
                            if (coverts[key] !== undefined) {
                                if (size !== undefined) {
                                    if (size > 0) {
                                        const selector: SelectorStyleType = `@media only screen and (min-width: ${size}px)`;
                                        const style = newCss[
                                            key
                                        ] as React.CSSProperties;
                                        const styles: SetChocoStyleSheetType[] =
                                            [
                                                {
                                                    style,
                                                    important,
                                                    type: "style",
                                                    css: coverts[key],
                                                    selector: selectorTag,
                                                },
                                            ];
                                        // console.log(style, styles, coverts[key]);
                                        return {
                                            styles,
                                            selector,
                                            important,
                                            type: "media",
                                            css: `${selector} {${coverts[key]}}`,
                                        };
                                    } else {
                                        return {
                                            important,
                                            type: "style",
                                            css: coverts[key],
                                            style: newCss[key],
                                            selector: selectorTag,
                                        };
                                    }
                                }
                                return {
                                    important,
                                    type: "style",
                                    selector: tag,
                                    css: coverts[key],
                                    style: newCss[key],
                                };
                            }
                        })
                        .reverse();

                newCoverts.forEach((style) => style && addStyle(style));
                return coverts;
            });
        },
        [],
    );
}
