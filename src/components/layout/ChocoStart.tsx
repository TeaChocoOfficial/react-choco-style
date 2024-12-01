//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/layout/ChocoStart.tsx"
import { useEffect } from "react";
import { getThemeMode } from "../../theme/theme";
import { atom, useSetRecoilState } from "recoil";
import StyleSheets from "../custom/StyleSheets";

export type InnerType = { width: number; height: number };

export const innerAtom = atom<InnerType>({
    key: "window inner",
    default: {
        width: window ? window.innerWidth : 0,
        height: window ? window.innerHeight : 0,
    },
});

export default function ChocoStart({
    children,
}: {
    children: React.ReactNode;
}) {
    StyleSheets();
    const setInner = useSetRecoilState(innerAtom);

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
