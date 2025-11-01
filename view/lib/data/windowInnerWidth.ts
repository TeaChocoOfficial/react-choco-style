//-Path: "react-choco-style/lib/src/data/windowInnerWidth.ts"

export function getWindowInnerWidth(): number {
    if (typeof window !== 'undefined') return window.innerWidth;
    return 0;
}
