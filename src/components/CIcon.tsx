//-Path: "react-choco-style/src/components/CIcon.tsx"
import { CText, CTextProps } from './CText';
import { Icon, IconProp } from '../custom/Icon';

export type CIconProps = CTextProps & IconProp;

export default function CIcon<Props extends CIconProps>(prop: Props) {
    const props = { ...prop } as Props;
    const iconProps = {
        fa: props.fa,
        solid: props.solid,
        brand: props.brand,
        regular: props.regular,
    } as IconProp;

    delete props.fa;
    delete props.solid;
    delete props.brand;
    delete props.regular;
    delete props.children;

    const textProps = { ...props } as CTextProps;

    return (
        <CText {...textProps}>
            <Icon {...iconProps} />
        </CText>
    );
}
