//-Path: "react-choco-style/src/hook/useCreateStyle.tsx"
import {
    StyleTypes,
    ChocoStyleTypes,
    KeyStylesAndType,
    SelectorStyleType,
    SelectorStylesType,
} from "../types/ChocoStyle";
import { useCallback } from "react";
import useApplyChocoStyles from "./useApplyChocoStyles";

export default function useCreateStyle() {
    const ApplyChocoStyles = useApplyChocoStyles();

    return useCallback(
        (
            keyClass: KeyStylesAndType,
            chocoStyle: StyleTypes,
            important?: number,
        ) => {
            const keyCs = Object.keys(chocoStyle) as KeyStylesAndType[];
            const andChocoStyles = {} as SelectorStylesType;
            const css = keyCs.reduce<ChocoStyleTypes>((acc, key) => {
                const value = chocoStyle[key];
                const cssKey = key as keyof ChocoStyleTypes;
                if (key.startsWith("&")) {
                    const keyStyle = key
                        .slice(1)
                        .replace(/\$/g, keyClass) as SelectorStyleType;
                    andChocoStyles[keyStyle] = value as ChocoStyleTypes;
                } else {
                    acc[cssKey] =
                        value as ChocoStyleTypes[keyof ChocoStyleTypes[typeof cssKey]];
                }
                return acc;
            }, {});

            andChocoStyles[keyClass] = css;

            return ApplyChocoStyles(keyClass, andChocoStyles, important);
        },
        [ApplyChocoStyles],
    );
}
