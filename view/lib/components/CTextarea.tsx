//-Path: "react-choco-style/lib/src/components/CTextarea.tsx"
import { ChocoStyle } from '../class/style/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { TextareaAutosize as MuiTextarea } from '@mui/material';

const Textarea = ChocoStyle.styled(MuiTextarea, 'CTextarea')();

export type CTextareaProps = ChocoStyledProps<typeof MuiTextarea>;

export function CTextarea(prop: CTextareaProps) {
    return <Textarea {...ChocoStyle.props(prop)} />;
}
