//-Path: "react-choco-style/src/components/layout/InitChoco.tsx"
import ChocoStart from "./ChocoStart";
import React, { useEffect } from "react";
import { ChocoTheme } from "../../theme/theme";
import { themeAtom } from "../../theme/useTheme";
import { ChocoThemeType } from "../../types/theme";
import { createAtom } from "@teachoco-official/react-atom";
import { SetStyleSheetsInit } from "../../hook/useSetStyleSheets";

export const ChocoDebug = createAtom(false);

export default function InitChoco({
    debug,
    children,
    createTheme,
}: {
    debug?: boolean;
    children?: React.ReactNode;
    createTheme?: (theme: ChocoThemeType) => Partial<ChocoThemeType>;
}) {
    const setTheme = themeAtom.set();
    const setDebug = ChocoDebug.set();

    useEffect(() => {
        setDebug(debug ?? false);
    }, [debug]);

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
