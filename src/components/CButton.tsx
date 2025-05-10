//-Path: "react-choco-style/src/components/CButton.tsx"
import { renderIcon } from './CIcon';
import { TypeIcon } from '../custom/Icon';
import { ColorType } from '../types/color';
import { useNavigate } from '../hook/ReactRoute';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { StyleTypes, ToType } from '../types/choco';
import { Button as MuiButton } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Button = createStyled(MuiButton, 'CButton')();

export type CButtonProps = ChocoStyledProps<
    typeof MuiButton,
    {
        to?: ToType;
        text?: boolean;
        lowcase?: boolean;
        outline?: boolean;
        setClr?: ColorType;
        container?: boolean;
        color?: StyleTypes['color'];
        leftIcon?: React.ReactNode | TypeIcon;
        rightIcon?: React.ReactNode | TypeIcon;
    }
>;

export function CButton({
    to,
    text,
    setClr,
    lowcase,
    outline,
    endIcon,
    onClick,
    leftIcon,
    disabled,
    container,
    startIcon,
    rightIcon,
    ...prop
}: CButtonProps) {
    const navigate = useNavigate();

    return (
        <Button
            endIcon={renderIcon(rightIcon ?? endIcon)}
            startIcon={renderIcon(leftIcon ?? startIcon)}
            variant={text ? 'text' : outline ? 'outlined' : 'contained'}
            {...useChocoProps(
                prop,
                ({ getFont, size, theme, getSetClrProps }) => {
                    const fontStyle = getFont('medium');
                    const { padding, borR } = theme.root.size;
                    const { styles } = getSetClrProps({
                        text,
                        setClr,
                        outline,
                        disabled,
                    });

                    let cs: StyleTypes = {
                        ...styles,
                        ...fontStyle,
                        fontS: size(),
                        borR: size((size) => size, borR),
                        '& .MuiButton-icon': {
                            mr: size((size) => size / 2, padding),
                            '& *': {
                                fontS: size((size) => `${size * 2}px`),
                            },
                        },
                    };
                    const p = size((size) => (size / padding) * 2, padding);
                    const px = size((size) => (size / padding) * 4, padding);

                    if (container) {
                        cs = { p, ...cs };
                    } else {
                        cs = { py: p, px, ...cs };
                    }

                    if (lowcase || container) {
                        cs = { textTransform: 'none', ...cs };
                    }
                    return { cs };
                },
            )}
            tabIndex={disabled ? -1 : undefined}
            onClick={(event) => {
                if (disabled) return;
                onClick?.(event);
                navigate(to);
            }}
        />
    );
}
