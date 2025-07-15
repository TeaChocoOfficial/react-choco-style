//-Path: "react-choco-style/lib/src/components/CButton.tsx"
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
    disabled,
    container,
    startIcon,
    rightIcon = endIcon,
    leftIcon = startIcon,
    ...prop
}: CButtonProps) {
    const navigate = useNavigate();

    return (
        <Button
            endIcon={renderIcon(rightIcon)}
            startIcon={renderIcon(leftIcon)}
            variant={text ? 'text' : outline ? 'outlined' : 'contained'}
            {...useChocoProps(prop, ({ size, getFont, getSetClrProps }) => {
                const fontStyle = getFont('medium');
                const { styles } = getSetClrProps({
                    text,
                    setClr,
                    outline,
                    disabled,
                });

                let cs: StyleTypes = {
                    ...styles,
                    ...fontStyle,
                    minW: 0,
                    fontS: size(),
                    borR: size({ root: 'borR' }),
                    '& .MuiButton-icon': {
                        mr: size({ root: 'padding', calc: (size) => size / 2 }),
                        '& *': {
                            fontS: size({ unit: 'px', calc: (size) => size }),
                        },
                    },
                };
                const p = size({ root: 'padding', calc: (size) => size * 2 });
                const px = size({ root: 'padding', calc: (size) => size * 4 });

                if (container) cs = { p, ...cs };
                else cs = { py: p, px, ...cs };
                if (lowcase || container) cs = { textTransform: 'none', ...cs };
                return { cs };
            })}
            tabIndex={disabled ? -1 : undefined}
            onClick={(event) => {
                if (disabled) return;
                onClick?.(event);
                navigate(to);
            }}
        />
    );
}
