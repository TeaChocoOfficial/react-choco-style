//-Path: "TeaChoco-Official/dev/vite.config.ts"
import { defineConfig } from "vite";
import tsconfig from "./tsconfig.json";
import react from "@vitejs/plugin-react-swc";

const paths = tsconfig.compilerOptions.paths;
const alias = {};
Object.keys(paths).forEach((keys) => {
    const path = paths[keys];
    let key = keys.replace(/(\/\*|\*\/)/g, "");
    if (key === "") {
        key = "/";
    }
    if (Array.isArray(path)) {
        alias[key] = path.map((item) =>
            item.replace(/^\.\//, "/").replace(/(\/\*|\*\/)/g, ""),
        );
    } else {
        alias[key] = path.replace(/^\.\//, "").replace(/(\/\*|\*\/)/g, "");
    }
});

// https://vite.dev/config/
export default defineConfig({
    // base: "/choco-official/",
    plugins: [react()],
    resolve: { alias: alias },
    build: {
        // ... other build options
        sourcemap: true, // Enable sourcemaps for debugging
    },
});
