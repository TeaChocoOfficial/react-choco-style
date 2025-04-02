//-Path: "react-choco-style/src/components/CIconButton.tsx"
import { ColorType } from '../types/color';
import useNavigate from '../custom/ReactRoute';
import { Icon, IconProp } from '../custom/Icon';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { StyleTypes, ToType } from '../types/choco';
import { ChocoStyledProps } from '../types/chocoHook';
import { useGetsetClrProps } from '../hook/ChocoColor';
import { IconButton as MuiIconButton } from '@mui/material';

const IconButton = createStyled(MuiIconButton, 'CIconButton')();

export type CIconButtonProps = ChocoStyledProps<
    typeof MuiIconButton,
    {
        to?: ToType;
        setClr?: ColorType;
        color?: StyleTypes['color'];
    } & IconProp
>;

export function CIconButton({
    to,
    fa,
    color,
    solid,
    brand,
    props,
    setClr,
    regular,
    onClick,
    disabled,
    children,
    ...prop
}: CIconButtonProps) {
    const navigate = useNavigate();
    const getSetClrProps = useGetsetClrProps('primaryText');

    const buttonProps = useChocoProps(prop, ({ getFont, getSize, theme }) => {
        const size = getSize(prop);
        const fontStyle = getFont('medium');
        const { styles } = getSetClrProps({ disabled, setClr });

        return {
            cs: {
                ...styles,
                ...{
                    ...fontStyle,
                    color,
                    fontS: -size,
                    p:
                        -(size ?? theme.root.size.padding) /
                        theme.root.size.padding,
                },
            },
        };
    });

    return (
        <IconButton
            {...buttonProps}
            tabIndex={disabled ? -1 : undefined}
            onClick={(event) => {
                if (disabled) return;
                onClick?.(event);
                navigate(to);
            }}
        >
            {fa || solid || brand || regular || props ? (
                <Icon
                    fa={fa}
                    props={props}
                    solid={solid}
                    brand={brand}
                    regular={regular}
                />
            ) : (
                children
            )}
        </IconButton>
    );
}
