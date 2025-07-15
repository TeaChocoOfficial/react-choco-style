//-Path: "react-choco-style/src/components/CNavbar.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { AppBar, Toolbar as MuiToolbar } from '@mui/material';

const Navbar = createStyled(AppBar, 'CNavbar')({ pos: 's' });
const Toolbar = createStyled(MuiToolbar, 'CToolbar')();

export type CToolbarProps = ChocoStyledProps<typeof MuiToolbar>;

export type CNavbarProps = ChocoStyledProps<
    typeof AppBar,
    { toolbarProps?: CToolbarProps }
>;

export function CNavbar({ children, toolbarProps, ...prop }: CNavbarProps) {
    return (
        <Navbar jCenter component="nav" {...prop}>
            <Toolbar cs={{ minH: "unset" }} {...toolbarProps}>
                {children}
            </Toolbar>
        </Navbar>
    );
}
