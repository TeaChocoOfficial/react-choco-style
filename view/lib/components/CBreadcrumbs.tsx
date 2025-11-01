//-Path: "react-choco-style/lib/src/components/CBreadcrumbs.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

const Breadcrumbs = ChocoStyle.styled(MuiBreadcrumbs, 'CBreadcrumbs')();

export type CBreadcrumbsProps = ChocoStyledProps<typeof MuiBreadcrumbs>;

export function CBreadcrumbs(prop: CBreadcrumbsProps) {
    return <Breadcrumbs {...ChocoStyle.props(prop)} />;
}
