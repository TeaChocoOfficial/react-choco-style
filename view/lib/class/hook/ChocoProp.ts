//-Path: "lib/src/class/ChocoProp.ts"
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
} from '../../data/style';
import {
    ChocoStyleType,
    ChocoStyleDefType,
    ChocoCompoentPropsType,
} from '../../types/chocoStyle';
import { Obj } from '@teachoco-dev/cli';
import { CsType } from '../../types/choco';
import { CsStyle } from '../style/CsStyle';
import { ChocoHooks } from '../../types/chocoHook';
import { useChocoHook } from '../../hooks/useChocoHook';
import { KeysChocoStyleDef } from '../../data/reservedKeywords';

export class ChocoProp {
    private _responseCs: ChocoHooks.ResponseCs;
    constructor(responseCs?: ChocoHooks.ResponseCs) {
        this._responseCs = responseCs ?? useChocoHook().responseCs;
    }

    style(props: ChocoCompoentPropsType): CsStyle {
        const csStyle = new CsStyle();
        // ประมวลผล props
        Obj.map(props, (value, key) => {
            if (value === undefined) return;
            const typedKey = key as keyof ChocoStyleDefType;

            // Size props
            if (KeysChocoStyleDef.includes(typedKey))
                // Type assertion ที่ชัดเจนสำหรับ Size props
                csStyle.set(typedKey, value?.toString());

            // Special cases
            if (key === 'cs') csStyle.add(this._responseCs(value as CsType));
            if (value === false) return;

            if (key === 'full') {
                csStyle.set('w', '100%');
                csStyle.set('h', '100%');
            }
            if (key === 'fullW') csStyle.set('w', '100%');
            if (key === 'fullH') csStyle.set('h', '100%');
            if (key === 'fullV') {
                csStyle.set('w', '100vw');
                csStyle.set('h', '100vh');
            }
            if (key === 'fullVW') csStyle.set('w', '100vw');
            if (key === 'fullVH') csStyle.set('h', '100vh');
            if (key in displayStyleData) {
                const display =
                    displayStyleData[key as keyof typeof displayStyleData];
                csStyle.set('dp', display);
            } else if (key in flexDirStyleData) {
                const flexDir =
                    flexDirStyleData[key as keyof typeof flexDirStyleData];
                csStyle.set('fd', flexDir as FlexDirStyleValueType);
            } else if (key === 'fWrap') {
                csStyle.set('fw', value as ChocoStyleType['fw']);
            } else if (key === 'center') {
                csStyle.set('a', 'c');
                csStyle.set('j', 'c');
            } else if (key.startsWith('ac')) {
                const align =
                    alignContentStyleData[
                        key.slice(2).toLowerCase() as AlignContentStyleType
                    ];
                csStyle.set('ac', align);
            } else if (key.startsWith('a')) {
                const align =
                    alignItemsStyleData[
                        key.slice(1).toLowerCase() as AlignItemsStyleType
                    ];
                csStyle.set('a', align);
            } else if (key.startsWith('ji')) {
                const justifyItems =
                    justifyItemsStyleData[
                        key.slice(2).toLowerCase() as JustifyItemsStyleType
                    ];
                csStyle.set('ji', justifyItems);
            } else if (key.startsWith('j')) {
                const justifyContent =
                    justifyContentStyleData[
                        key.slice(1).toLowerCase() as JustifyContentStyleType
                    ];
                csStyle.set('j', justifyContent);
            } else if (key.startsWith('t')) {
                const txtA =
                    textAlignStyleData[
                        key.slice(1).toLowerCase() as TextAlignStyleType
                    ];
                csStyle.set('txtA', txtA);
            } else if (key in posStyleData) {
                const pos = posStyleData[key as PosStyleType];
                csStyle.set('pos', pos);
            } else if (key.startsWith('ofx')) {
                csStyle.set('ofx', overflowStyleData[key as OverflowStyleType]);
            } else if (key.startsWith('ofy')) {
                csStyle.set('ofy', overflowStyleData[key as OverflowStyleType]);
            } else if (key.startsWith('of')) {
                csStyle.set('of', overflowStyleData[key as OverflowStyleType]);
            } else if (key in eventStyleData) {
                csStyle.set('event', eventStyleData[key as EventStyleType]);
            } else if (key in userSelectStyleData) {
                csStyle.set(
                    'us',
                    userSelectStyleData[key as UserSelectStyleType],
                );
            } else if (key in boxSizingStyleData) {
                csStyle.set(
                    'bxSz',
                    boxSizingStyleData[key as BoxSizingStyleType],
                );
            }
        });

        return csStyle;
    }
}
