//-Path: "react-choco-style/lib/src/hooks/useGlobalStyles.tsx"
import { useCallback } from 'react';
import { CssType } from '../types/choco';
import { GlobalCss } from '../data/globalCss';

export function useGlobalStyles() {
    const [globalCss, setGlobalCss] = GlobalCss.use();

    return useCallback(
        (key: string, css: CssType) => {
            setGlobalCss((prev) => new Map(prev).set(key, css));
        },
        [globalCss],
    );
}
