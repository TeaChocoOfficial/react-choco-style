//-Path: "react-choco-style/src/components/hook/CBox.tsx"
import React from "react";
import { ChocoStyleType } from "../../types/ChocoStyle";

type CBoxProps = {
    cs: ChocoStyleType;
    children: React.ReactNode;
};

export default function CBox(
    props: CBoxProps & React.HTMLAttributes<HTMLDivElement>,
) {
    const { children } = props;
    return <div {...props}>{children}</div>;
}
