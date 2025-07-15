//-Path: "react-choco-style/lib/src/components/CTextarea.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { TextareaAutosize as MuiTextarea } from '@mui/material';

const Textarea = createStyled(MuiTextarea, 'CTextarea')();

export type CTextareaProps = ChocoStyledProps<typeof MuiTextarea>;

export function CTextarea(prop: CTextareaProps) {
    return <Textarea {...useChocoProps(prop)} />;
}
