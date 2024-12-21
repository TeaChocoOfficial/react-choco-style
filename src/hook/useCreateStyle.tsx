//-Path: "react-choco-style/src/hook/useCreateStyle.tsx"
import {
    StyleTypes,
    ChocoStyleTypes,
    KeyStylesAndType,
} from "../types/ChocoStyle";
import { useCallback } from "react";
import useApplyChocoStyles from "./useApplyChocoStyles";

export default function useCreateStyle() {
    const ApplyChocoStyles = useApplyChocoStyles();

    const CreateStyle = useCallback(
        (
            keyClass: KeyStylesAndType,
            chocoStyle: StyleTypes,
            important?: number,
        ) => {
            const keyCs = Object.keys(chocoStyle) as KeyStylesAndType[];
            const andChocoStyles: Record<string, ChocoStyleTypes> = {};
            const css = keyCs.reduce<ChocoStyleTypes>((acc, key) => {
                const value = chocoStyle[key];
                const cssKey = key as keyof ChocoStyleTypes;
                if (key.startsWith("&")) {
                    const keyStyle = key.slice(1).replace(/\$/g, keyClass);
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
        [],
    );

    return CreateStyle;
}
