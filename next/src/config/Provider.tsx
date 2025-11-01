//-Path: "react-choco-style/next/src/config/Provider.tsx"
'use client';
import { ChocoProvider } from '@teachoco-official/react-choco-style';

export default function Provider({ children }: { children?: React.ReactNode }) {
    return <ChocoProvider debug>{children}</ChocoProvider>;
}
