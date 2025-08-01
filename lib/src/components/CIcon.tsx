//-Path: "react-choco-style/view/lib/components/CIcon.tsx"
import React from 'react';
import { CText, CTextProps } from './CText';
import { ChocoStyle } from '../class/ChocoStyle';
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
            {...ChocoStyle.props(textProps, ({ sz }) => {
                return {
                    cs: {
                        clr: 'error',
                        fontS: sz({ root: 'text' }),
                    },
                };
            })}
        >
            <Icon {...iconProps} />
        </CText>
    );
}
