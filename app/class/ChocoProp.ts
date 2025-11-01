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
import { CsType } from '../types/choco';
import { ChocoStyle } from './ChocoStyle';
import { ChocoHooks } from '../types/chocoHook';
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

    style(props: ChocoCompoentPropsType): ChocoStyle {
        const chocoStyle = new ChocoStyle();
        // ประมวลผล props
        Obj.map(props, (value, key) => {
            if (value === undefined) return;
            const typedKey = key as keyof ChocoStyleDefType;

            // Size props
            if (KeysChocoStyleDef.includes(typedKey)) {
                // Type assertion ที่ชัดเจนสำหรับ Size props
                chocoStyle.set(typedKey, value?.toString());
                // (styleMap as Record<keyof ChocoStyleDefType, Sizes>)[typedKey] =
                //     value as Sizes;
            }

            // Special cases
            if (key === 'cs') {
                chocoStyle.add(this._responseCs(value as CsType));
            }
            if (value === false) return;

            if (key === 'full') {
                chocoStyle.set('w', '100%');
                chocoStyle.set('h', '100%');
            }
            if (key === 'fullW') chocoStyle.set('w', '100%');
            if (key === 'fullH') chocoStyle.set('h', '100%');
            if (key === 'fullV') {
                chocoStyle.set('w', '100vw');
                chocoStyle.set('h', '100vh');
            }
            if (key === 'fullVW') chocoStyle.set('w', '100vw');
            if (key === 'fullVH') chocoStyle.set('h', '100vh');
            if (key in displayStyleData) {
                const display =
                    displayStyleData[key as keyof typeof displayStyleData];
                chocoStyle.set('dp', display);
            } else if (key in flexDirStyleData) {
                const flexDir =
                    flexDirStyleData[key as keyof typeof flexDirStyleData];
                const szFlexDir = this._toSizes(flexDir);
                chocoStyle.set('fd', szFlexDir as FlexDirStyleValueType);
            } else if (key === 'fWrap') {
                chocoStyle.set('fw', value as ChocoStyleType['fw']);
            } else if (key === 'center') {
                chocoStyle.set('a', 'c');
                chocoStyle.set('j', 'c');
            } else if (key.startsWith('ac')) {
                const align =
                    alignContentStyleData[
                        key.slice(2).toLowerCase() as AlignContentStyleType
                    ];
                chocoStyle.set('ac', align);
            } else if (key.startsWith('a')) {
                const align =
                    alignItemsStyleData[
                        key.slice(1).toLowerCase() as AlignItemsStyleType
                    ];
                chocoStyle.set('a', align);
            } else if (key.startsWith('ji')) {
                const justifyItems =
                    justifyItemsStyleData[
                        key.slice(2).toLowerCase() as JustifyItemsStyleType
                    ];
                chocoStyle.set('ji', justifyItems);
            } else if (key.startsWith('j')) {
                const justifyContent =
                    justifyContentStyleData[
                        key.slice(1).toLowerCase() as JustifyContentStyleType
                    ];
                chocoStyle.set('j', justifyContent);
            } else if (key.startsWith('t')) {
                const txtA =
                    textAlignStyleData[
                        key.slice(1).toLowerCase() as TextAlignStyleType
                    ];
                chocoStyle.set('txtA', txtA);
            } else if (key in posStyleData) {
                const pos = posStyleData[key as PosStyleType];
                chocoStyle.set('pos', pos);
            } else if (key.startsWith('ofx')) {
                chocoStyle.set(
                    'ofx',
                    overflowStyleData[key as OverflowStyleType],
                );
            } else if (key.startsWith('ofy')) {
                chocoStyle.set(
                    'ofy',
                    overflowStyleData[key as OverflowStyleType],
                );
            } else if (key.startsWith('of')) {
                chocoStyle.set(
                    'of',
                    overflowStyleData[key as OverflowStyleType],
                );
            } else if (key in eventStyleData) {
                chocoStyle.set('event', eventStyleData[key as EventStyleType]);
            } else if (key in userSelectStyleData) {
                chocoStyle.set(
                    'us',
                    userSelectStyleData[key as UserSelectStyleType],
                );
            } else if (key in boxSizingStyleData) {
                chocoStyle.set(
                    'bxSz',
                    boxSizingStyleData[key as BoxSizingStyleType],
                );
            }
        });

        return chocoStyle;
    }
}
