//-Path: "lib/src/components/CIcon.tsx"
import { ColorType } from '../types/color';
import { CText, CTextProps } from './CText';
import { ChocoStyledProps } from '../types/chocoHook';
import { ChocoStyle } from '../class/style/ChocoStyle';
import { Icon, IconProp, TypeIcon, typeIcons } from '../custom/Icon';

export type CIconProps = ChocoStyledProps<
    typeof Icon,
    IconProp &
        CTextProps & {
            setClr?: ColorType;
            disabled?: boolean;
        }
>;

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
    setClr,
    regular,
    disabled,
    ...textProps
}: CIconProps) {
    const iconProps: IconProp = { fa, solid, brand, regular };

    return (
        <CText
            dFlex
            aCenter
            jCenter
            {...ChocoStyle.props(textProps, ({ sz, chocoColor }) => {
                const { styles } = chocoColor.style({
                    setClr,
                    disabled,
                });
                styles.set('bgClr');
                return {
                    cs: {
                        fontS: sz({ kit: 'text' }),
                        ...styles.cs,
                    },
                };
            })}
        >
            <Icon {...iconProps} />
        </CText>
    );
}
