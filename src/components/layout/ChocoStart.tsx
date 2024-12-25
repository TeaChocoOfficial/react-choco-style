//-Path: "react-choco-style/src/components/layout/ChocoStart.tsx"
import { useMemo, useEffect } from "react";
import useTheme from "../../theme/useTheme";
import { getThemeMode } from "../../theme/theme";
import useFormatSize from "../../hook/useFormatSize";
import useCreateStyle from "../../hook/useCreateStyle";
import { createAtom } from "@teachoco-official/react-atom";

export function SetUpStyleSheets() {
    const theme = useTheme();
    const CreateStyle = useCreateStyle();
    const { formatSize, callbackSize } = useFormatSize();

    return useMemo(() => {
        const themeSheets = theme.styleSheets({
            theme,
            formatSize,
            callbackSize,
        });
        const styles = CreateStyle("&", themeSheets);
        return styles;
    }, [CreateStyle, theme]);
}

export type InnerType = { width: number; height: number };

export const innerAtom = createAtom<InnerType>({
    width: window ? window.innerWidth : 0,
    height: window ? window.innerHeight : 0,
});

export default function ChocoStart({
    children,
}: {
    children: React.ReactNode;
}) {
    SetUpStyleSheets();
    const setInner = innerAtom.set();

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
