//-Path: "react-choco-style/src/components/layout/ChocoStart.tsx"
import { atom, useSetAtom } from "jotai";
import { useMemo, useEffect } from "react";
import useTheme from "../../theme/useTheme";
import { getThemeMode } from "../../theme/theme";
import useCreateStyle from "../../hook/useCreateStyle";
import { callbackSize, formatSize } from "../../function/size";

export function SetUpStyleSheets() {
    const theme = useTheme();
    const CreateStyle = useCreateStyle();

    return useMemo(() => {
        const themeSheets = theme.styleSheets({
            theme,
            formatSize,
            callbackSize,
        });
        const styles = CreateStyle("&", themeSheets);
        return styles;
    }, []);
}

export type InnerType = { width: number; height: number };

export const innerAtom = atom<InnerType>({
    width: window ? window.innerWidth : 0,
    height: window ? window.innerHeight : 0,
});

export default function ChocoStart({
    children,
}: {
    children: React.ReactNode;
}) {
    SetUpStyleSheets();
    const setInner = useSetAtom(innerAtom);

    useEffect(() => {
        getThemeMode();
        const handleResize = () => {
            setInner({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <>{children}</>;
}
