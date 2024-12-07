//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/types/type.ts"
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};