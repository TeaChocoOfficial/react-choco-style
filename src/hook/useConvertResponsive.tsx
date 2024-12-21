//-Path: "react-choco-style/src/hook/useApplyResponsive.tsx"
import { useCallback } from "react";
import useTheme from "../theme/useTheme";
import { ResponsiveCSSType } from "../types/style";
import { convertToStyleSheet } from "../function/styleSheet";

export default function useConvertResponsive() {
    const { breakpoint } = useTheme();

    return useCallback(
        (tag: string, responseCss: ResponsiveCSSType) => {
            const keysSize = Object.keys(breakpoint.size) as Array<
                keyof typeof breakpoint.size
            >;

            const coverts = {} as Record<keyof ResponsiveCSSType, string>;
            keysSize.forEach((key) => {
                const css = responseCss[key] as React.CSSProperties;
                if (css !== undefined) {
                    const style = convertToStyleSheet(tag, css);
                    coverts[key] = style;
                }
            });
            return coverts;
        },
        [breakpoint],
    );
}
