//-Path: "react-choco-style/lib/src/components/CBreadcrumbs.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

const Breadcrumbs = createStyled(MuiBreadcrumbs, 'CBreadcrumbs')();

export type CBreadcrumbsProps = ChocoStyledProps<typeof MuiBreadcrumbs>;

export function CBreadcrumbs(prop: CBreadcrumbsProps) {
    return <Breadcrumbs {...useChocoProps(prop)} />;
}
