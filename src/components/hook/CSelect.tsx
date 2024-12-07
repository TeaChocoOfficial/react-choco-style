//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/components/hook/CSelect.tsx"
import { useMemo } from "react";
import { getFont } from "../custom/font";
import { formatSize } from "../custom/size";
import { ColorType } from "../../types/color";
import removeProps from "../../hook/removeProps";
import ChocoStyleSheets from "../custom/StyleSheets";
import { ChocoStyleType } from "../../types/ChocoStyle";
import GetSetColorProps from "../../hook/GetSetColorProps";
import Styled, { ChocoStyledProps } from "../custom/Styled";

const Select = Styled("div")({
    a: "c",
    j: "c",
    of: "h",
    dp: "if",
    pos: "r",
    size: 16,
    animation: 0.3,
    p: formatSize(4),
    borR: formatSize(2),
});
const Option = Styled("li")({
    size: 16,
    animation: 0.3,
    p: formatSize(4),
});

export type CSelectOptions = {
    cs?: ChocoStyleType;
    boxCs?: ChocoStyleType;
    label?: React.ReactNode;
};

export type CSelectRender<Option extends CSelectOptions = CSelectOptions> = ({
    Item,
    index,
    value,
}: {
    index: number;
    value: Option;
    Item: typeof CSelectItem;
}) => JSX.Element;

export type CSelectProps<Option extends CSelectOptions = CSelectOptions> =
    ChocoStyledProps<"div"> & {
        outline?: boolean;
        options?: Option[];
        disabled?: boolean;
        setColor?: ColorType;
        render: CSelectRender<Option>;
    };

export type CSelectItemProps = ChocoStyledProps<"li"> & {
    outline?: boolean;
    disabled?: boolean;
    setColor?: ColorType;
};

export function CSelectItem<Props extends CSelectItemProps>(prop: Props) {
    const chocoStyleSheets = ChocoStyleSheets();
    const getSetColorProps = GetSetColorProps();

    const props = useMemo(() => {
        const fontStyle = getFont();
        const props = { ...prop } as Props;
        const { setColor, outline, disabled } = props;
        const setColorProps = { outline, disabled, setColor };
        const { setColors } = getSetColorProps(setColorProps);

        const sheets = chocoStyleSheets(
            {
                p: 40,
                ":checked": {
                    bgColor: setColors?.bgHover,
                },
                ":disabled": {
                    bgColor: setColors?.action,
                },
                ":hover": {
                    boxShadow: `0 0 10px 100px #1882A8 inset`,
                    bgColor: setColors?.color,
                    fontSize: 64,
                },
            },
            true,
        );

        const { className } = getSetColorProps(setColorProps);

        props.className = `${sheets.className} ${className}`;
        props.style = { ...fontStyle, ...props.style };

        return removeProps(props, ["disabled", "outline", "setColor"]);
    }, [prop]);

    return <Option {...props} />;
}

export default function CSelect<
    Option extends CSelectOptions = CSelectOptions,
    Props extends CSelectProps<Option> = CSelectProps<Option>,
>(prop: Props) {
    const getSetColorProps = GetSetColorProps();

    const props = useMemo(() => {
        const props = { ...prop } as Props;
        const fontStyle = getFont("medium");
        const { render, disabled, outline, options, setColor } = props;
        const setColorProps = { outline, disabled, setColor };

        const { className } = getSetColorProps(setColorProps);

        props.className = className;

        if (render) {
            const Options = options?.map((value, index) => {
                return render({ value, index, Item: CSelectItem });
            });
            props.children = Options;
        }
        props.style = { ...fontStyle, ...props.style };
        return props;
    }, [prop]);

    const newProps = removeProps(props, [
        "render",
        "outline",
        "options",
        "setColor",
    ]);

    return <Select {...newProps} />;
}
