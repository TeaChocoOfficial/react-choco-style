//-Path: "react-choco-style/lib/src/hook/ReactRoute.tsx"
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
    try {
        const navigate = useNavigateReactRoute();
        return useCallback(
            (to, options) => {
                if (to !== undefined) navigate(to, options);
            },
            [navigate],
        );
    } catch (error) {
        return (to, options) =>
            to !== undefined
                ? console.error(to, options, 'Error in useNavigate:', error)
                : undefined;
    }
}
export function useActiveLink(): (
    to?: ToType,
    options?: ActiveLinkOptions,
) => number {
    try {
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
            (to, options = {}) => {
                const { includeSearch, caseSensitive } = options;

                // กรณี to ไม่มีค่า
                if (!to) return 0;

                // แปลง to เป็น string path
                const targetPath =
                    typeof to === 'string' ? to : to.pathname || '';

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
    } catch (error) {
        return (to, options) => {
            if (to !== undefined)
                console.error(to, options, 'Error in useActiveLink:', error);
            return 0;
        };
    }
}

export function useActivePaths(): (
    paths?: (ToType | undefined)[],
) => ToType | undefined {
    try {
        const isActiveLink = useActiveLink();

        return useCallback(
            (paths?: (ToType | undefined)[]) => {
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
            },
            [isActiveLink],
        );
    } catch (error) {
        return (paths) => {
            if (paths) console.error('Error in useActivePaths:', error);
            return undefined;
        };
    }
}
