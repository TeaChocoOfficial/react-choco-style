import React from "react";
import { ChocoStyleType } from "../../types/ChocoStyle";
type CBoxProps = {
    cs: ChocoStyleType;
    children: React.ReactNode;
};
export default function CBox(props: CBoxProps & React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export {};
