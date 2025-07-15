//-Path: "react-choco-style/src/data/debug.ts"
import { CssType } from '../types/choco';
import { createAtom } from '@teachoco-official/react-atom';

export const GlobalCss = createAtom<Map<string, CssType>>(new Map());
