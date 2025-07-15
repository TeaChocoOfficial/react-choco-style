//-Path: "react-choco-style/lib/src/components/CMenu.tsx"
import { useState } from 'react';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { Menu as MuiMenu, MenuItem as MuiMenuItem } from '@mui/material';

const Menu = createStyled(MuiMenu, 'CMenu')();
const MenuItem = createStyled(MuiMenuItem, 'CMenuItem')();

export type CMenuProps = ChocoStyledProps<
    typeof MuiMenu,
    { handleClick: React.MouseEventHandler<HTMLElement> }
>;
export type CMenuItemProps = ChocoStyledProps<typeof MuiMenuItem>;

export function CMenuItem(prop: CMenuItemProps) {
    return <MenuItem {...useChocoProps(prop)} />;
}

export function CMenu({ onClick, handleClick, ...props }: CMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <Menu
            {...useChocoProps(props, () => {
                return {
                    onClick: (event) => {
                        onClick?.(event);
                        setAnchorEl(event.currentTarget);
                    },
                };
            })}
        />
    );
}

// export function UseMenu() {
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//     const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     console.log(anchorEl);

//     return (
//         <>
//             <button onClick={handleClick} />
//             <Menu
//                 open={Boolean(anchorEl)}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//             >
//                 <MenuItem onClick={handleClose}>pasd</MenuItem>
//             </Menu>
//         </>
//     );
// }
