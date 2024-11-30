//-Path: "react-choco-style/src/hook/chocoPropsToChocoStyle.ts"
import {
    ChocoStyleType,
    ChocoStyleTypes,
    ChocoStyleDefType,
    ChocoStylePropsType,
    ChocoStylePropsTypes,
} from "../types/ChocoStyle";
import {
    KeywordsChocoStyleDef,
    KeywordsChocoStyleProps,
} from "../components/data/reservedKeywords";
import { Sizes } from "../types/Size";

export default function chocoPropsToChocoStyle(
    csp: ChocoStylePropsType,
): ChocoStyleType {
    const keys = Object.keys(csp) as (keyof ChocoStyleDefType)[];

    const chocoProps = keys.reduce<ChocoStyleTypes>((acc, key) => {
        const prop = csp[key];
        if (KeywordsChocoStyleDef.includes(key)) {
            acc[key] = prop as Sizes;
        }
        return acc;
    }, {});

    const chocoStyleProps = keys.reduce<ChocoStylePropsTypes>((acc, key) => {
        const prop = csp[key];
        if (KeywordsChocoStyleProps.includes(key)) {
            acc[key] = prop as Sizes;
        }
        return acc;
    }, {});

    const keysProps = Object.keys(
        chocoStyleProps,
    ) as (keyof ChocoStylePropsType)[];

    const newChocoStyle = keysProps.reduce<ChocoStyleType>((acc, key) => {
        const style = chocoStyleProps[key];
        switch (key) {
            //* Keywords
            //? width&height:100% width&height:100view
            case "cs":
                acc = { ...(style as ChocoStylePropsType["cs"]), ...acc };
                break;
            case "full":
                acc.w = "100%";
                acc.h = "100%";
                break;
            case "fullV":
                acc.w = "100vw";
                acc.h = "100vh";
                break;

            //* Display
            //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
            case "dNone":
                acc.dp = null;
                break;
            case "dFlex":
                acc.dp = "f";
                break;
            case "dInline":
                acc.dp = "i";
                break;
            case "dInlineF":
                acc.dp = "if";
                break;
            case "dBlock":
                acc.dp = "b";
                break;
            case "dInlineB":
                acc.dp = "ib";
                break;
            case "dGrid":
                acc.dp = "g";
                break;
            case "dInlineG":
                acc.dp = "ig";
                break;
            case "dTable":
                acc.dp = "t";
                break;
            case "dInlineT":
                acc.dp = "it";
                break;

            //* Flex direction
            //? row reverse-row reverse-column column
            case "row":
                acc.fd = "r";
                break;
            case "rRow":
                acc.fd = "rr";
                break;
            case "column":
                acc.fd = "c";
                break;
            case "rColumn":
                acc.fd = "cr";
                break;

            //* Flex wrap
            case "fWrap":
                acc.fw = style as Sizes<boolean>;
                break;

            //* Align content
            //? flex-end flex-start center space-around space-between stretch
            case "acEnd":
                acc.ac = "e";
                break;
            case "acStart":
                acc.ac = "s";
                break;
            case "acCenter":
                acc.ac = "c";
                break;
            case "acAround":
                acc.ac = "a";
                break;
            case "acBetween":
                acc.ac = "b";
                break;
            case "acStretch":
                acc.ac = "st";
                break;

            //* Align item
            //? flex-end flex-start center space-around space-between stretch
            case "aEnd":
                acc.a = "e";
                break;
            case "aStart":
                acc.a = "s";
                break;
            case "aCenter":
                acc.a = "c";
                break;
            case "aAround":
                acc.a = "a";
                break;
            case "aBetween":
                acc.a = "b";
                break;
            case "aStretch":
                acc.a = "st";
                break;

            //* Justify content
            //? flex-end flex-start center space-around space-between space-evenly
            case "jStart":
                acc.j = "s";
                break;
            case "jEnd":
                acc.j = "e";
                break;
            case "jCenter":
                acc.j = "c";
                break;
            case "jAround":
                acc.j = "a";
                break;
            case "jBetween":
                acc.j = "b";
                break;
            case "jEvenly":
                acc.j = "ev";
                break;

            //* Text align
            //? end left start right center justify
            case "tEnd":
                acc.text = "e";
                break;
            case "tStart":
                acc.text = "s";
                break;
            case "tLeft":
                acc.text = "l";
                break;
            case "tRight":
                acc.text = "r";
                break;
            case "tCenter":
                acc.text = "c";
                break;
            case "tJustify":
                acc.text = "j";
                break;

            //* Position
            //? static relative absolute fixed sticky
            case "pos":
                acc.pos = style as ChocoStylePropsType["pos"];
                break;
            case "posR":
                acc.pos = "r";
                break;
            case "posA":
                acc.pos = "a";
                break;
            case "posF":
                acc.pos = "f";
                break;
            case "posS":
                acc.pos = "s";
                break;
        }

        return acc;
    }, {});

    const chocoStyle = { ...chocoProps, ...newChocoStyle } as ChocoStyleType;
    return chocoStyle;
}
