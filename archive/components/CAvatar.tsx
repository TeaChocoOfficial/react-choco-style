//-Path: "react-choco-style/lib/src/components/CAvatar.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { Avatar as MuiAvatar } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Avatar = createStyled(MuiAvatar, 'CAvatar')();

export type CAvatarProps = ChocoStyledProps<typeof MuiAvatar>;

export function CAvatar(prop: CAvatarProps) {
    return <Avatar {...useChocoProps(prop)} />;
}
