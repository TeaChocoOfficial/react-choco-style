//-Path: "react-choco-style/src/hook/useSetStyleSheets.tsx"
import { getHash } from "./useCreateClass";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo } from "react";
import { SelectorStyleType } from "../types/ChocoStyle";
import { convertToStyleSheet } from "../function/styleSheet";
import StyleSheetManager from "../function/StyleSheetManager";

export interface BaseChocoSheet {
    css: string;
    hash: string;
    important: number;
    selector: SelectorStyleType;
}

export interface ChocoStyleSheetType extends BaseChocoSheet {
    type: "style";
    style: React.CSSProperties;
}

export interface ChocoMediaSheetType extends BaseChocoSheet {
    type: "media";
    styles: ChocoStyleSheetType[];
}

export type ChocoSheetType = ChocoStyleSheetType | ChocoMediaSheetType;

// Input types with optional fields
export interface SetBaseChocoSheet {
    css?: string;
    hash?: string;
    important?: number;
    selector: SelectorStyleType;
}

export interface SetChocoStyleSheetType extends SetBaseChocoSheet {
    type: "style";
    style?: React.CSSProperties;
}

export interface SetChocoMediaSheetType extends SetBaseChocoSheet {
    type: "media";
    styles?: SetChocoStyleSheetType[];
}

export type SetChocoSheetType = SetChocoStyleSheetType | SetChocoMediaSheetType;

export type ChocoSheetsMapType = Map<SelectorStyleType, ChocoSheetType>;

const ChocoSheetsAtom = atom<ChocoSheetsMapType>(new Map());

export const formatChocoSheet = (sheet: SetChocoSheetType): ChocoSheetType => {
    const base: BaseChocoSheet = {
        css: "",
        hash: "",
        selector: sheet.selector,
        important: sheet.important ?? 0,
    };

    if (sheet.type === "style") {
        const styleSheet: ChocoStyleSheetType = {
            ...base,
            type: "style",
            style: sheet.style ?? {},
        };

        styleSheet.css =
            sheet.css ??
            convertToStyleSheet(sheet.selector, styleSheet.style)
                .replace(/\s+/g, " ")
                .trim();

        styleSheet.hash = getHash(styleSheet.css);
        return styleSheet;
    } else {
        const mediaSheet: ChocoMediaSheetType = {
            ...base,
            type: "media",
            styles: (sheet.styles ?? []).map(
                (s) => formatChocoSheet(s) as ChocoStyleSheetType,
            ),
        };

        mediaSheet.css =
            sheet.css ??
            `${mediaSheet.selector} { ${mediaSheet.styles
                .map((s) => s.css)
                .join(" ")} }`;

        mediaSheet.hash = getHash(mediaSheet.css);
        return mediaSheet;
    }
};

export function SetStyleSheetsInit({
    children,
}: {
    children: React.ReactNode;
}) {
    const chocoSheets = useAtomValue(ChocoSheetsAtom);
    const styleManager = useMemo(() => StyleSheetManager.getInstance(), []);

    useEffect(() => {
        // Sort sheets by importance
        const sortedSheets = Array.from(chocoSheets.values())
            .reverse()
            .sort((a, b) => a.important - b.important);
        // console.log(sortedSheets);

        // Clear all existing rules
        styleManager.clearRules();

        // Apply all rules in sorted order
        sortedSheets.forEach((sheet) => {
            styleManager.updateRule(sheet.selector, sheet.css);
        });
        // console.log(chocoSheets);
    }, [chocoSheets, styleManager]);

    return <>{children}</>;
}

export default function useSetStyleSheets() {
    const setChocoSheets = useSetAtom(ChocoSheetsAtom);

    return useCallback(
        (sheet: SetChocoSheetType) => {
            const formattedSheet = formatChocoSheet(sheet);
            // console.log(sheet);

            // Update state

            setChocoSheets((prev) => {
                const newMap = new Map(prev);
                const existingSheet = newMap.get(formattedSheet.selector);
                // ถ้าไม่จำเป็นต้อง update ให้ return state เดิม
                if (formattedSheet.type === "media") {
                    const formattedStyle = formattedSheet.styles[0];
                    if (existingSheet?.type === "media") {
                        const haveExisting = existingSheet.styles.find(
                            (style) =>
                                style.selector === formattedStyle.selector,
                        );
                        // console.log(existingSheet, formattedSheet);
                        if (!haveExisting) {
                            formattedSheet.styles = [
                                ...formattedSheet.styles,
                                ...existingSheet.styles,
                            ];
                            const setSheet: SetChocoSheetType = {
                                type: formattedSheet.type,
                                styles: formattedSheet.styles,
                                selector: formattedSheet.selector,
                                important: formattedSheet.important,
                            };
                            newMap.set(
                                formattedSheet.selector,
                                formatChocoSheet(setSheet),
                            );
                        } else {
                            const fineExistingStyle =
                                existingSheet.styles.findIndex(
                                    (style) =>
                                        formattedStyle.important >
                                            style.important ||
                                        (formattedStyle.important <
                                            style.important &&
                                            formattedStyle.hash === style.hash),
                                );
                            if (fineExistingStyle >= 0) {
                                existingSheet.styles[fineExistingStyle] =
                                    formattedStyle;
                                // console.log(
                                //     formattedStyle,
                                //     existingSheet.styles,
                                // );
                                newMap.set(
                                    existingSheet.selector,
                                    formatChocoSheet(existingSheet),
                                );
                            }
                        }
                    } else {
                        newMap.set(formattedSheet.selector, formattedSheet);
                    }
                } else {
                    if (
                        !existingSheet ||
                        formattedSheet.important > existingSheet.important ||
                        (formattedSheet.important < existingSheet.important &&
                            formattedSheet.hash === existingSheet.hash)
                    ) {
                        newMap.set(formattedSheet.selector, formattedSheet);
                    }
                }

                return newMap;
            });
        },
        [setChocoSheets],
    );
}
