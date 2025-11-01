//-Path: "react-choco-style/lib/src/components/CRating.tsx"
import { ChocoStyle } from '../class/ChocoStyle';
import { Rating as MuiRating } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Rating = ChocoStyle.styled(MuiRating, 'CRating')();

export type CRatingProps = ChocoStyledProps<typeof MuiRating>;

export function CRating(prop: CRatingProps) {
    return <Rating {...ChocoStyle.props(prop)} />;
}
