//-Path: "react-choco-style/lib/src/components/CIcon.tsx"
import { CText, CTextProps } from './CText';
import { useChocoProps } from '../hook/ChocoProps';
import { Icon, IconProp, TypeIcon, typeIcons } from '../custom/Icon';

export type CIconProps = CTextProps & IconProp;

export function renderIcon<Render = React.ReactNode>(
    icon?: TypeIcon | React.ReactNode,
    props?: CIconProps,
): Render {
    if (typeof icon === 'string' && typeIcons.includes(icon as TypeIcon)) {
        return (<CIcon fa={icon as TypeIcon} {...props} />) as Render;
    }
    return icon as Render;
}

export function CIcon({
    fa,
    solid,
    brand,
    fontS,
    regular,
    ...textProps
}: CIconProps) {
    const iconProps: IconProp = { fa, solid, brand, regular };
    return (
        <CText
            dFlex
            aCenter
            jCenter
            {...useChocoProps(textProps, ({ size }) => ({
                cs: { fontS: size() },
            }))}
        >
            <Icon {...iconProps} />
        </CText>
    );
}
