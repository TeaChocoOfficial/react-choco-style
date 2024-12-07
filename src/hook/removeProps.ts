//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/hook/removeProps.ts"

export default function removeProps<
    Props extends Record<string, unknown> = Record<string, unknown>,
    NewProps extends object = Props,
>(prop: Props, removes: (keyof Props)[]): NewProps {
    const props = { ...prop };
    const keys = Object.keys(props);
    const newProps = keys.reduce<NewProps>((acc, key) => {
        if (!removes.includes(key)) {
            acc[key as keyof typeof acc] = props[
                key
            ] as NewProps[keyof NewProps];
        }
        return acc;
    }, {} as NewProps);
    return newProps as unknown as NewProps;
}
