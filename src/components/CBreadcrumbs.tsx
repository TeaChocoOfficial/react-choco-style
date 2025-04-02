//-Path: "react-choco-style/src/components/CBreadcrumbs.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

const Breadcrumbs = createStyled(MuiBreadcrumbs, 'CBreadcrumbs')();

export type CBreadcrumbsProps = ChocoStyledProps<typeof MuiBreadcrumbs>;

export function CBreadcrumbs(prop: CBreadcrumbsProps) {
    return <Breadcrumbs {...prop} />;
}
