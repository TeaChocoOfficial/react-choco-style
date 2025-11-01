//-Path: "react-choco-style/lib/src/components/CAvatar.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { Avatar as MuiAvatar } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Avatar = ChocoStyle.styled(MuiAvatar, 'CAvatar')();

export type CAvatarProps = ChocoStyledProps<typeof MuiAvatar>;

export function CAvatar(prop: CAvatarProps) {
    return <Avatar {...ChocoStyle.props(prop)} />;
}
