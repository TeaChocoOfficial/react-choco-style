//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/layout/StyleSheetManager.ts"
export default class StyleSheetManager {
    private sheet: CSSStyleSheet;
    private styleElement: HTMLStyleElement;
    private static instance: StyleSheetManager;

    private constructor() {
        this.styleElement = document.createElement("style");
        document.head.appendChild(this.styleElement);
        this.sheet = this.styleElement.sheet!;
    }

    public static getInstance(): StyleSheetManager {
        if (!StyleSheetManager.instance) {
            StyleSheetManager.instance = new StyleSheetManager();
        }
        return StyleSheetManager.instance;
    }

    public updateRule(selector: string, css: string): void {
        // Find existing rule index
        let existingIndex = -1;
        for (let i = 0; i < this.sheet.cssRules.length; i++) {
            const rule = this.sheet.cssRules[i];
            if (
                rule instanceof CSSStyleRule &&
                rule.selectorText === selector
            ) {
                existingIndex = i;
                break;
            }
        }

        // Delete existing rule if found
        if (existingIndex !== -1) {
            this.sheet.deleteRule(existingIndex);
        }

        // Insert new rule
        try {
            this.sheet.insertRule(css, this.sheet.cssRules.length);
        } catch (error) {
            console.error(`Failed to insert rule: ${css}`, error);
        }
    }

    public clearRules(): void {
        while (this.sheet.cssRules.length > 0) {
            this.sheet.deleteRule(0);
        }
    }
}
