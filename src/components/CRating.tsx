//-Path: "react-choco-style/src/components/CRating.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { Rating as MuiRating } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Rating = createStyled(MuiRating, 'CRating')();

export type CRatingProps = ChocoStyledProps<typeof MuiRating>;

export function CRating(prop: CRatingProps) {
    return <Rating {...prop} />;
}
