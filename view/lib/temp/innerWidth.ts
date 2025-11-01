//-Path: "react-choco-style/lib/src/temp/innerWidth.ts"
import { createAtom } from '@teachoco-official/react-atom';
import { getWindowInnerWidth } from '../data/windowInnerWidth';

export const InnerWidthAtom = createAtom(getWindowInnerWidth());
