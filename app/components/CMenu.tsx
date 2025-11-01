//-Path: "react-choco-style/lib/src/components/CMenu.tsx"
import { useState } from 'react';
import { ColorType } from '../types/color';
import { ChocoStyle } from '../class/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Menu as MuiMenu, MenuItem as MuiMenuItem } from '@mui/material';

const Menu = ChocoStyle.styled(MuiMenu, 'CMenu')();
const MenuItem = ChocoStyle.styled(MuiMenuItem, 'CMenuItem')();

export type CMenuProps = ChocoStyledProps<
    typeof MuiMenu,
    { handleClick?: React.MouseEventHandler<HTMLElement> },
    ['open', 'onClose']
>;
export type CMenuItemProps = ChocoStyledProps<
    typeof MuiMenuItem,
    { setClr?: ColorType; outline?: boolean }
>;

export function CMenuItem({
    setClr,
    outline,
    disabled,
    ...props
}: CMenuItemProps) {
    return (
        <MenuItem
            {...ChocoStyle.props(props, ({ sz, getFont, chocoColor }) => {
                const fontStyle = getFont();
                const { styles, focus, disableds } = chocoColor.style({
                    setClr,
                    outline,
                    disabled,
                    isFocus: false,
                });

                return {
                    cs: {
                        ...disableds,
                        ...fontStyle,
                        fontS: sz(),
                        px: sz({ sz: 'padding' }),
                        py: sz({
                            sz: 'padding',
                            calc: (size) => size / 2,
                        }),
                        minH: sz({ calc: (size) => size * 3 }),
                        '&.Mui-selected': { ...styles },
                        '&.Mui-focusVisible': { ...focus },
                        '&.Mui-selected&.Mui-focusVisible': {
                            ...focus,
                            ...styles,
                        },
                    },
                };
            })}
        />
    );
}

export function CMenu({ onClick, handleClick, ...props }: CMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <Menu
            {...ChocoStyle.props(props)}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            onClick={(event) => {
                onClick?.(event);
                setAnchorEl(event.currentTarget);
            }}
        />
    );
}
