//-Path: "react-choco-style/src/hook/useCreateClass.tsx"
import CryptoJS from "crypto-js";
import { useCallback } from "react";
import useCreateStyle from "./useCreateStyle";
import { StyleTypes, KeyStylesAndType } from "../types/ChocoStyle";

export function getHash(text: CryptoJS.lib.WordArray | string) {
    return CryptoJS.SHA1(text).toString();
}

export default function useCreateClass() {
    const CreateStyle = useCreateStyle();

    const CreateClass = useCallback(
        (name: string, chocoStyle: StyleTypes, important?: number) => {
            const hash = getHash(JSON.stringify(chocoStyle));
            const className = `ChocoStyleSheet-${name}-${hash}`;
            const keyClass = `.${className}` as KeyStylesAndType;
            const style = CreateStyle(keyClass, chocoStyle, important);
            // console.log(style, keyClass, chocoStyle);
            return className;
        },
        [],
    );

    return CreateClass;
}
