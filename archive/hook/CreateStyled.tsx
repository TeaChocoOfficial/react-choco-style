//-Path: "react-choco-style/lib/src/hook/CreateStyled.tsx"
import { styled } from '@mui/material';
import { CsType } from '../types/choco';
import { ReactTagType } from '../types/style';
import { useResponseCs } from './ChocoResponse';

export function CreateStyled<TagType extends ReactTagType>(
    tag: TagType,
    nameTag?: string,
) {
    return (customStyles?: CsType) => {
        // สร้าง styled component
        const StyledBase = styled(
            tag as unknown as keyof React.JSX.IntrinsicElements,
            { name: nameTag },
        )(() => {
            const responseCs = useResponseCs();
            const chocoStyle = useChocoStyle<StyleTypes>();
            return chocoStyle(responseCs(customStyles)) as Record<
                string,
                SizeValue
            >;
        });
    };
}
