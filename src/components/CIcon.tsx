//-Path: "react-choco-style/src/components/CIcon.tsx"
import { CText, CTextProps } from './CText';
import { Icon, IconProp } from '../custom/Icon';

export type CIconProps = CTextProps & IconProp;

export function CIcon({ fa, solid, brand, regular, ...textProps }: CIconProps) {
    const iconProps: IconProp = { fa, solid, brand, regular };
    return (
        <CText {...textProps}>
            <Icon {...iconProps} />
        </CText>
    );
}
