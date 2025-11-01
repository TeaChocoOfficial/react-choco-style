//-Path: "react-choco-style/lib/src/components/CNavbar.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { AppBar, Toolbar as MuiToolbar } from '@mui/material';

const Navbar = ChocoStyle.styled(AppBar, 'CNavbar')({ pos: 's' });
const Toolbar = ChocoStyle.styled(MuiToolbar, 'CToolbar')();

export type CToolbarProps = ChocoStyledProps<typeof MuiToolbar>;

export type CNavbarProps = ChocoStyledProps<
    typeof AppBar,
    { toolbarProps?: CToolbarProps }
>;

export function CNavbar({ children, toolbarProps, ...prop }: CNavbarProps) {
    return (
        <Navbar jCenter compo="nav" {...prop}>
            <Toolbar cs={{ minH: 'unset' }} {...toolbarProps}>
                {children}
            </Toolbar>
        </Navbar>
    );
}
