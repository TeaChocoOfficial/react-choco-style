//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/hook/styleSheet.ts"

export function convertToStyleSheet(
    tag: string,
    cssProperties: React.CSSProperties,
): string {
    // แปลง camelCase เป็น kebab-case
    const convertToKebabCase = (str: string) => {
        return str
            .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
            .toLowerCase();
    };

    // สร้าง CSS string
    const cssString = Object.entries(cssProperties)
        .map(([key, value]) => {
            const cssKey = convertToKebabCase(key);
            return `${cssKey}: ${value};`;
        })
        .join("\n    ");

    return `${tag} {
    ${cssString}
}`;
}

export function applyStyleSheet(styles: string) {
    try {
        // สร้าง styleSheet ถ้ายังไม่มี
        let styleSheet: CSSStyleSheet;
        if (document.styleSheets.length === 0) {
            const style = document.createElement("style");
            document.head.appendChild(style);
            styleSheet = style.sheet!;
        } else {
            styleSheet = document.styleSheets[0];
        }

        // เพิ่ม rule ใหม่ที่ index 0 เพื่อให้อยู่บนสุด
        styleSheet.insertRule(styles.replace(/\s+/g, " ").trim(), 0);
    } catch (error) {
        console.error("Error applying styles:", error);
    }
}
