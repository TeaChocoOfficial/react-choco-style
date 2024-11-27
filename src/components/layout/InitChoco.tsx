//-Path: "TeaChoco-Official/client/src/lib/react-choco-style/components/layout/InitChoco.tsx"
import React from "react";
import { RecoilRoot } from "recoil";
import ChocoStart from "./ChocoStart";

export default function InitChoco({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <RecoilRoot>
            <ChocoStart>{children}</ChocoStart>
        </RecoilRoot>
    );
}
