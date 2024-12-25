//-Path: "react-choco-style/src/hook/useApplyChocoStyles.tsx"
import {
    KeyStylesAndType,
    SelectorStyleType,
    SelectorStylesType,
} from "../types/ChocoStyle";
import useSetStyleSheets, {
    SetChocoSheetType,
    SetChocoStyleSheetType,
} from "./useSetStyleSheets";
import { SizeKey } from "../types/Size";
import useTheme from "../theme/useTheme";
import useChocoStyle from "./useChocoStyle";
import { ResponsiveCSSType } from "../types/style";
import { useCallback, useEffect, useState } from "react";
import useConvertResponsive from "./useConvertResponsive";

export default function useApplyChocoStyles() {
    const { breakpoint } = useTheme();
    const ChocoStyle = useChocoStyle();
    const SetStyleSheets = useSetStyleSheets();
    const ConvertResponsive = useConvertResponsive();
    const [styleQueue, setStyleQueue] = useState<SetChocoSheetType[]>([]);

    useEffect(() => {
        // Apply queued styles after render
        styleQueue.forEach((style) => SetStyleSheets(style));
    }, [styleQueue, SetStyleSheets]);

    return useCallback(
        (
            tag: KeyStylesAndType,
            andChocoStyles: SelectorStylesType,
            important?: number,
        ) => {
            const keyAndChocoStyles = Object.keys(
                andChocoStyles,
            ) as (keyof typeof andChocoStyles)[];

            return keyAndChocoStyles.map((selectorTag) => {
                const chocoStyle = andChocoStyles[selectorTag];
                if (chocoStyle !== undefined) {
                    const newCss = ChocoStyle(chocoStyle);
                    const coverts = ConvertResponsive(selectorTag, newCss);
                    // console.log( newCss, andChocoStyles[selectorTag]);
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
                                            const importantMedia =
                                                (important || 0) + size;
                                            const style = newCss[
                                                key
                                            ] as React.CSSProperties;
                                            const styles: SetChocoStyleSheetType[] =
                                                [
                                                    {
                                                        style,
                                                        type: "style",
                                                        css: coverts[key],
                                                        selector: selectorTag,
                                                        important:
                                                            importantMedia,
                                                    },
                                                ];
                                            // console.log(style, styles, coverts[key]);
                                            return {
                                                styles,
                                                selector,
                                                type: "media",
                                                important: importantMedia,
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
                    // Queue styles instead of applying directly
                    const validStyles = newCoverts.filter(
                        (style): style is SetChocoSheetType => !!style,
                    );
                    setStyleQueue((prev) => [...prev, ...validStyles]);
                    return coverts;
                }
            });
        },
        [SetStyleSheets, breakpoint],
    );
}
