//-Path: "react-choco-style/src/components/CIconButton.tsx"
import { CIcon } from './CIcon';
import { IconProp } from '../custom/Icon';
import { useNavigate } from '../hook/ReactRoute';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { StyleTypes, ToType } from '../types/choco';
import { IconButton as MuiIconButton } from '@mui/material';
import { ChocoStyledProps, ClrPropsType } from '../types/chocoHook';

const IconButton = createStyled(MuiIconButton, 'CIconButton')();

export type CIconButtonProps = ChocoStyledProps<
    typeof MuiIconButton,
    ClrPropsType & {
        to?: ToType;
        contained?: boolean;
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
    outline,
    disabled,
    children,
    contained,
    ...prop
}: CIconButtonProps) {
    const navigate = useNavigate();

    return (
        <IconButton
            {...useChocoProps(
                prop,
                ({ getSetClrProps, getFont, size, theme }) => {
                    const fontStyle = getFont('medium');
                    const { padding } = theme.root.size;
                    const { styles } = getSetClrProps({
                        setClr,
                        outline,
                        disabled,
                        text: !contained,
                        defaultColor: 'main',
                    });

                    return {
                        cs: {
                            ...styles,
                            ...fontStyle,
                            color,
                            fontS: size(),
                            p: size(padding),
                        },
                    };
                },
            )}
            tabIndex={disabled ? -1 : undefined}
            onClick={(event) => {
                if (disabled) return;
                onClick?.(event);
                navigate(to);
            }}
        >
            {fa || solid || brand || regular || props ? (
                <CIcon
                    {...useChocoProps(prop, () => ({}))}
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
