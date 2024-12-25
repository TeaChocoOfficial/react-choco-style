//-Path: "react-choco-style/src/components/layout/InitChoco.tsx"
import ChocoStart from "./ChocoStart";
import React, { useEffect } from "react";
import { ChocoTheme } from "../../theme/theme";
import { themeAtom } from "../../theme/useTheme";
import { ChocoThemeType } from "../../types/theme";
import { SetStyleSheetsInit } from "../../hook/useSetStyleSheets";

export default function InitChoco({
    children,
    createTheme,
}: {
    children?: React.ReactNode;
    createTheme?: (theme: ChocoThemeType) => Partial<ChocoThemeType>;
}) {
    const setTheme = themeAtom.set();

    useEffect(() => {
        if (createTheme !== undefined) {
            const theme = createTheme(ChocoTheme);
            setTheme({ ...ChocoTheme, ...theme });
        } else {
            setTheme(ChocoTheme);
        }
    }, [createTheme]);

    return (
        <ChocoStart>
            <SetStyleSheetsInit>{children}</SetStyleSheetsInit>
        </ChocoStart>
    );
}
