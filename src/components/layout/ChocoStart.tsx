//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/layout/ChocoStart.tsx"
import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";

export type InnerType = { width: number; height: number };

export const innerAtom = atom<InnerType>({
    key: "window inner",
    default: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
});

export default function ChocoStart({
    children,
}: {
    children: React.ReactNode;
}) {
    const setInner = useSetRecoilState(innerAtom);

    useEffect(() => {
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
