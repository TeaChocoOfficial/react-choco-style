//-Path: "react-choco-style/src/view/App.tsx"
import { useEffect } from "react";
import {
    CText,
    CreateStyled,
    useSetStyleSheets,
} from "@teachoco-official/react-choco-style";

const Text = CreateStyled("span", "CText")({ size: 32 });

export default function App() {
    const SetStyleSheets = useSetStyleSheets();

    useEffect(() => {
        SetStyleSheets({ type: "style", selector: "h1", style: { color: "red" } });
        SetStyleSheets({
            type: "media",
            important: 1,
            selector: "@media (min-width: 600px)",
            styles: [
                { type: "style", selector: "h1", style: { color: "blue" } },
            ],
        });
    }, []);

    return (
        <div>
            <h1>hello world</h1>
            <Text
                dFlex
                size={55}
                cs={{
                    clr: {
                        v: "info",
                        h: "secondary",
                        l: "success",
                        t: "warning",
                        d: "disabled",
                    },
                }}>
                hello worlddddddddd
            </Text>
            <CText dFlex>testddddd rs</CText>
        </div>
    );
}
