//-Path: "react-choco-style/src/custom/ReactRoute.tsx"
import {
    To,
    NavigateOptions,
    useNavigate as useNavigateReactRoute,
} from 'react-router';

export type ToType = To;

export default function useNavigate(): (
    to?: ToType,
    options?: NavigateOptions,
) => void {
    try {
        const navigate = useNavigateReactRoute();
        return (to, options) => {
            if (to !== undefined) {
                navigate(to, options);
            }
        };
    } catch {
        return (_) => {};
    }
}
