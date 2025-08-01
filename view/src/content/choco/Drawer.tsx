//-Path: "react-choco-style/src/view/test/choco/Drawer.tsx"
import { useState } from 'react';
import { CButton, CDrawer, CText } from '@teachoco-official/react-choco-style';

export default function Drawer() {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <CButton
                lowcase
                setClr="primary"
                onClick={() => setOpenDrawer(true)}
            >
                button lowcase primary open OpenDrawer
            </CButton>
            <CDrawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                paperCs={({ theme }) => ({
                    bgClr: theme.palette.main.error[5],
                })}
            >
                <CText>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </CText>
                <CText>
                    Nulla repellat iste quasi recusandae iure illum odit nam.
                </CText>
                <CText>
                    Sed fugit tempora, cum magni iste minus praesentium. A in
                </CText>
                <CText>numquam ea velit.</CText>
            </CDrawer>
        </>
    );
}
