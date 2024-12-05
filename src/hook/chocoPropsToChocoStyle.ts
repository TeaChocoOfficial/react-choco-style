//-Path: "TeaChoco-Official/dev/src/hooks/react-choco-style/src/hook/chocoPropsToChocoStyle.ts"
import {
    ChocoStyleType,
    ChocoStyleTypes,
    ChocoStyleDefType,
    ChocoStylePropsType,
    ChocoStylePropsTypes,
} from "../types/ChocoStyle";
import { Sizes } from "../types/Size";
import {
    keysChocoStyleProps,
    KeywordsChocoStyleDef,
} from "../components/data/reservedKeywords";
import { formatSize } from "../components/custom/size";

export default function chocoPropsToChocoStyle<
    Tag extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
>(csp: ChocoStylePropsType<Tag>): ChocoStyleType {
    const keys = Object.keys(csp) as (keyof ChocoStyleDefType)[];

    const chocoProps = keys.reduce<ChocoStyleTypes>((acc, key) => {
        const prop = csp[key];
        if (KeywordsChocoStyleDef.includes(key) && prop !== undefined) {
            acc[key] =
                prop as ChocoStyleTypes[keyof ChocoStyleTypes[typeof key]];
        }
        return acc;
    }, {});

    const chocoStyleProps = keys.reduce<ChocoStylePropsTypes>((acc, key) => {
        const prop = csp[key];
        if (keysChocoStyleProps.includes(key) && prop !== undefined) {
            acc[key] =
                prop as ChocoStylePropsTypes[keyof ChocoStylePropsTypes[typeof key]];
        }
        return acc;
    }, {});

    const keysProps = Object.keys(chocoProps) as (keyof ChocoStyleTypes)[];

    const keysStyleProps = Object.keys(
        chocoStyleProps,
    ) as (keyof ChocoStylePropsType)[];

    const newChocoProps = keysProps.reduce<ChocoStyleTypes>((acc, key) => {
        const style = chocoProps[
            key
        ] as ChocoStyleTypes[keyof ChocoStyleTypes[typeof key]];

        switch (key) {
            //* Size
            //? Width Height min-width min-height max-width max-height
            case "w":
            case "h":
            case "minW":
            case "minH":
            case "maxW":
            case "maxH":

            //? all top bottom left right left&right top&bottom
            case "i":
            case "t":
            case "b":
            case "l":
            case "r":
            case "x":
            case "y":

            //* Padding
            //? all top bottom left right left&right top&bottom
            case "p":
            case "pt":
            case "pb":
            case "pl":
            case "pr":
            case "px":
            case "py":

            //* Margin
            //? all top bottom left right left&right top&bottom
            case "m":
            case "mt":
            case "mb":
            case "ml":
            case "mr":
            case "mx":
            case "my":

            //* Gap
            //? all top bottom left right left&right top&bottom
            case "gap":
            case "gapT":
            case "gapB":
            case "gapL":
            case "gapR":
            case "gapX":
            case "gapY":

            //* Border
            case "borR":
                if (typeof style === "number") {
                    acc[key] = formatSize(style);
                } else {
                    acc[key] = style;
                }
                break;
            default:
                acc[key] = style;
                break;
        }

        return acc;
    }, {});

    const newChocoStyle = keysStyleProps.reduce<ChocoStyleType>((acc, key) => {
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

            //* Overflow
            //? visible hidden scroll auto
            case "ofV":
                acc.of = "v";
                break;
            case "ofH":
                acc.of = "h";
                break;
            case "ofS":
                acc.of = "s";
                break;
            case "ofA":
                acc.of = "a";
                break;

            case "ofxV":
                acc.ofx = "v";
                break;
            case "ofxH":
                acc.ofx = "h";
                break;
            case "ofxS":
                acc.ofx = "s";
                break;
            case "ofxA":
                acc.ofx = "a";
                break;

            case "ofyV":
                acc.ofy = "v";
                break;
            case "ofyH":
                acc.ofy = "h";
                break;
            case "ofyS":
                acc.ofy = "s";
                break;
            case "ofyA":
                acc.ofy = "a";
                break;

            //* Pointer events
            //? none auto
            case "eventN":
                acc.event = "n";
                break;
            case "eventA":
                acc.event = "a";
                break;

            //* User select
            //? none auto text all
            case "usN":
                acc.us = "n";
                break;
            case "usA":
                acc.us = "a";
                break;
            case "usT":
                acc.us = "t";
                break;
            case "usAll":
                acc.us = "al";
                break;
        }

        return acc;
    }, {});

    const chocoStyle = { ...newChocoProps, ...newChocoStyle } as ChocoStyleType;
    return chocoStyle;
}
