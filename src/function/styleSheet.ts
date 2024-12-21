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

export function deleteOldStyleSheet(tag: string) {
    try {
        const styleSheet = document.styleSheets[0];
        if (!styleSheet) return;

        // ค้นหาและลบ rule เก่าที่มี selector เดียวกัน
        for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
            const rule = styleSheet.cssRules[i];
            if (rule instanceof CSSStyleRule) {
                if (rule.selectorText === tag) {
                    styleSheet.deleteRule(i);
                }
            } else if (rule instanceof CSSMediaRule) {
                // จัดการกับ Media Queries
                for (let j = rule.cssRules.length - 1; j >= 0; j--) {
                    const nestedRule = rule.cssRules[j];
                    if (
                        nestedRule instanceof CSSStyleRule &&
                        nestedRule.selectorText === tag
                    ) {
                        rule.deleteRule(j);
                        // ลบ media rule ทั้งหมดถ้าไม่มี rules เหลืออยู่
                        if (rule.cssRules.length === 0) {
                            styleSheet.deleteRule(i);
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error deleting old styles:", error);
    }
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
