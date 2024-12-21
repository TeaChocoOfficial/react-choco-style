//-Path: "react-choco-style/src/components/hook/CDialog.tsx"
import CreateStyled, { ChocoStyledProps } from "../custom/CreateStyled";

const Dialog = CreateStyled("dialog", "CDialog")();

export type CDialogProps = ChocoStyledProps<"dialog">;

export default function CDialog<Props extends CDialogProps>(props: Props) {
    return <Dialog {...props} />;
}
