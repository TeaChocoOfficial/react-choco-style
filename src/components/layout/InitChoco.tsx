//-Path: "react-choco-style/src/components/layout/InitChoco.tsx"
import React from "react";
import ChocoStart from "./ChocoStart";
import { SetStyleSheetsInit } from "../../hook/useSetStyleSheets";

export default function InitChoco({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <SetStyleSheetsInit>
            <ChocoStart>{children}</ChocoStart>
        </SetStyleSheetsInit>
    );
}
