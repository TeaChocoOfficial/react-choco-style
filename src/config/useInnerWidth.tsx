//-Path: "react-choco-style/src/config/useInnerWidth.tsx"
import { useEffect, useState } from 'react';

export default function useInnerWidth() {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return innerWidth;
}
