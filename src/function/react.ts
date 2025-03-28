//-Path: "react-choco-style/src/funtion/react.ts"
import React from "react";

export function isReactNode(children: any): boolean {
    // ถ้าเป็น null หรือ undefined ถือว่าเป็น React.ReactNode
    if (children === null || children === undefined) return true;

    // ถ้าเป็น string, number, boolean ถือว่าเป็น React.ReactNode
    if (
        typeof children === 'string' ||
        typeof children === 'number' ||
        typeof children === 'boolean'
    ) {
        return true;
    }

    // ถ้าเป็น React element (มี $$typeof และ type)
    // ถ้าเป็น React element (ใช้ React.isValidElement)
    if (React.isValidElement(children)) {
        return true;
    }

    // ถ้าไม่เข้าเงื่อนไขใดๆ ข้างต้น ถือว่าไม่ใช่ React.ReactNode
    return false;
}
