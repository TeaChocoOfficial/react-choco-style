//-Path: "react-choco-style/src/hook/ReactRoute.tsx"
import {
    useLocation,
    NavigateOptions,
    useNavigate as useNavigateReactRoute,
} from 'react-router-dom';
import { useCallback } from 'react';
import { ToType } from '../types/choco';

export type ActiveLinkOptions = {
    includeSearch?: boolean;
    caseSensitive?: boolean;
};

export function useNavigate(): (
    to?: ToType,
    options?: NavigateOptions,
) => void {
    const navigate = useNavigateReactRoute();
    return useCallback(
        (to, options) => {
            if (to !== undefined) navigate(to, options);
        },
        [navigate],
    );
}
export function useActiveLink() {
    const location = useLocation();

    // ฟังก์ชันช่วยนับ segment ที่เหมือนกัน
    function countMatchingSegments(
        currentPath: string,
        targetPath: string,
    ): number {
        // แยก path ออกเป็น segments
        const currentSegments = currentPath.split('/').filter(Boolean);
        const targetSegments = targetPath.split('/').filter(Boolean);

        // หาจำนวน segment สูงสุดที่เปรียบเทียบได้
        const maxLength = Math.min(
            currentSegments.length,
            targetSegments.length,
        );

        let matchCount = 0;
        for (let i = 0; i < maxLength; i++) {
            if (currentSegments[i] === targetSegments[i]) {
                matchCount++;
            } else {
                break; // หยุดเมื่อเจอ segment ที่ไม่เหมือนกัน
            }
        }

        return matchCount;
    }

    return useCallback(
        (to?: ToType, options: ActiveLinkOptions = {}) => {
            const { includeSearch, caseSensitive } = options;

            // กรณี to ไม่มีค่า
            if (!to) return 0;

            // แปลง to เป็น string path
            const targetPath = typeof to === 'string' ? to : to.pathname || '';

            // ถ้า targetPath ว่าง
            if (!targetPath) return 0;

            // สร้าง current path ตามตัวเลือก
            let currentPath = location.pathname;
            if (includeSearch) {
                currentPath += location.search;
            }

            // ปรับ case sensitivity
            if (!caseSensitive) {
                currentPath = currentPath.toLowerCase();
                const lowerTargetPath = targetPath.toLowerCase();
                return countMatchingSegments(currentPath, lowerTargetPath);
            }

            // เปรียบเทียบตามปกติ
            return countMatchingSegments(currentPath, targetPath);
        },
        [location],
    );
}

export function useActivePaths() {
    const isActiveLink = useActiveLink();

    return useCallback((paths?: (ToType | undefined)[]) => {
        if (!paths || paths.length === 0) return undefined;
        let maxMatch = 0;
        let bestMatch: ToType | undefined;

        for (const path of paths) {
            if (path) {
                const matchCount = isActiveLink(path);
                if (matchCount > maxMatch) {
                    maxMatch = matchCount;
                    bestMatch = path;
                }
            }
        }
        return bestMatch;
    }, [isActiveLink]);
}
