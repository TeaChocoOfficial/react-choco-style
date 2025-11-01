//-Path: "react-choco-style/lib/src/config/SetupUseInnerWidth.tsx"
import { useEffect } from 'react';
import { InnerWidthAtom } from '../temp/innerWidth';

export function SetupUseInnerWidth() {
    const setInnerWidth = InnerWidthAtom.set();

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return null;
}
