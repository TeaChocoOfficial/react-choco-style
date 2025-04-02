//-Path: "react-choco-style/src/components/CTextarea.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { TextareaAutosize as MuiTextarea } from '@mui/material';

const Textarea = createStyled(MuiTextarea, 'CTextarea')();

export type CTextareaProps = ChocoStyledProps<typeof MuiTextarea>;

export function CTextarea(prop: CTextareaProps) {
    return <Textarea {...prop} />;
}
