//-Path: "react-choco-style/src/app/App.tsx"
import { useEffect } from "react";
import {
    CText,
    CreateStyled,
    useSetStyleSheets,
} from "@teachocoofficial/react-choco-style";

const Text = CreateStyled("span", "CText")({ size: 32 });

export default function App() {
    const { addStyle } = useSetStyleSheets();

    useEffect(() => {
        addStyle({ type: "style", selector: "h1", style: { color: "red" } });
        addStyle({
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
            <Text dFlex size={44}>
                hello worlddd
            </Text>
            <CText dFlex>text</CText>
        </div>
    );
}
