//-Path: "react-choco-style/lib/src/class/ChocoProp.ts"
import {
    posStyleData,
    PosStyleType,
    eventStyleData,
    EventStyleType,
    displayStyleData,
    flexDirStyleData,
    overflowStyleData,
    OverflowStyleType,
    textAlignStyleData,
    TextAlignStyleType,
    boxSizingStyleData,
    BoxSizingStyleType,
    alignItemsStyleData,
    userSelectStyleData,
    AlignItemsStyleType,
    UserSelectStyleType,
    alignContentStyleData,
    AlignContentStyleType,
    justifyItemsStyleData,
    JustifyItemsStyleType,
    FlexDirStyleValueType,
    justifyContentStyleData,
    JustifyContentStyleType,
} from '../data/style';
import {
    ChocoStyleType,
    ChocoStyleDefType,
    ChocoCompoentPropsType,
} from '../types/chocoStyle';
import { Sizes } from '../types/size';
import { Obj } from '@teachoco-dev/cli';
import { ChocoHooks } from '../types/chocoHook';
import { CsType, StyleTypes } from '../types/choco';
import { useChocoHook } from '../hooks/useChocoHook';
import { KeysChocoStyleDef } from '../data/reservedKeywords';

export class ChocoProp {
    private _responseCs: ChocoHooks.ResponseCs;
    constructor(responseCs?: ChocoHooks.ResponseCs) {
        this._responseCs = responseCs ?? useChocoHook().responseCs;
    }
    private _toSizes<Value>(value: Value): Sizes<Value> {
        return value;
    }

    style(props: ChocoCompoentPropsType): StyleTypes {
        const styleMap: StyleTypes = {};
        // ประมวลผล props
        Obj.map(props, (value, key) => {
            if (value === undefined) return;
            const typedKey = key as keyof ChocoStyleDefType;

            // Size props
            if (KeysChocoStyleDef.includes(typedKey)) {
                // Type assertion ที่ชัดเจนสำหรับ Size props
                (styleMap as Record<keyof ChocoStyleDefType, Sizes>)[typedKey] =
                    value as Sizes;
            }

            // Special cases
            if (key === 'cs') {
                Object.assign(styleMap, this._responseCs(value as CsType));
            }
            if (value === false) return;

            if (key === 'full') {
                styleMap.w = '100%';
                styleMap.h = '100%';
            }
            if (key === 'fullW') styleMap.w = '100%';
            if (key === 'fullH') styleMap.h = '100%';
            if (key === 'fullV') {
                styleMap.w = '100vw';
                styleMap.h = '100vh';
            }
            if (key === 'fullVW') styleMap.w = '100vw';
            if (key === 'fullVH') styleMap.h = '100vh';
            if (key in displayStyleData) {
                const display =
                    displayStyleData[key as keyof typeof displayStyleData];
                styleMap.dp = display;
            } else if (key in flexDirStyleData) {
                const flexDir =
                    flexDirStyleData[key as keyof typeof flexDirStyleData];
                const szFlexDir = this._toSizes(flexDir);
                styleMap.fd = szFlexDir as FlexDirStyleValueType;
            } else if (key === 'fWrap') {
                styleMap.fw = value as ChocoStyleType['fw'];
            } else if (key === 'center') {
                styleMap.a = 'c';
                styleMap.j = 'c';
            } else if (key.startsWith('ac')) {
                const align =
                    alignContentStyleData[
                        key.slice(2).toLowerCase() as AlignContentStyleType
                    ];
                styleMap.ac = align;
            } else if (key.startsWith('a')) {
                const align =
                    alignItemsStyleData[
                        key.slice(1).toLowerCase() as AlignItemsStyleType
                    ];
                styleMap.a = align;
            } else if (key.startsWith('ji')) {
                const justifyItems =
                    justifyItemsStyleData[
                        key.slice(2).toLowerCase() as JustifyItemsStyleType
                    ];
                styleMap.ji = justifyItems;
            } else if (key.startsWith('j')) {
                const justifyContent =
                    justifyContentStyleData[
                        key.slice(1).toLowerCase() as JustifyContentStyleType
                    ];
                styleMap.j = justifyContent;
            } else if (key.startsWith('t')) {
                const txtA =
                    textAlignStyleData[
                        key.slice(1).toLowerCase() as TextAlignStyleType
                    ];
                styleMap.txtA = txtA;
            } else if (key in posStyleData) {
                const pos = posStyleData[key as PosStyleType];
                styleMap.pos = pos;
            } else if (key.startsWith('ofx')) {
                styleMap.ofx = overflowStyleData[key as OverflowStyleType];
            } else if (key.startsWith('ofy')) {
                styleMap.ofy = overflowStyleData[key as OverflowStyleType];
            } else if (key.startsWith('of')) {
                styleMap.of = overflowStyleData[key as OverflowStyleType];
            } else if (key in eventStyleData) {
                styleMap.event = eventStyleData[key as EventStyleType];
            } else if (key in userSelectStyleData) {
                styleMap.us = userSelectStyleData[key as UserSelectStyleType];
            } else if (key in boxSizingStyleData) {
                styleMap.bxSz = boxSizingStyleData[key as BoxSizingStyleType];
            }
        });

        return styleMap;
    }
}
