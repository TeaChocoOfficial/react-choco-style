//-Path: "react-choco-style/lib/src/components/CButton.tsx"
import Debug from '../config/debug';
import { renderIcon } from './CIcon';
import { ToType } from '../types/choco';
import { TypeIcon } from '../custom/Icon';
import { ColorType } from '../types/color';
import { ChocoStyle } from '../class/ChocoStyle';
import { useNavigate } from '../hooks/ReactRoute';
import { Button as MuiButton } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Button = ChocoStyle.styled(MuiButton, 'CButton')();

export type CButtonProps = ChocoStyledProps<
    typeof MuiButton,
    {
        to?: ToType;
        text?: boolean;
        lowcase?: boolean;
        outline?: boolean;
        setClr?: ColorType;
        container?: boolean;
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
    disabled,
    container,
    onClick,
    endIcon,
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
            {...ChocoStyle.props(
                prop,
                ({ sz, getFont, ChocoStyle, chocoColor, responseCs }) => {
                    const fontStyle = getFont('medium', {
                        lowcase: lowcase || container,
                    });
                    const { styles } = chocoColor.style({
                        text,
                        setClr,
                        outline,
                        disabled,
                    });

                    const cs = new ChocoStyle(fontStyle);
                    cs.add(responseCs(styles));
                    cs.add({ minW: 0, fontS: sz() });

                    const p = sz({
                        sz: 'padding',
                        calc: (value) => value / 2,
                    });
                    const px = sz({
                        sz: 'padding',
                        calc: (value) => value * 2,
                    });

                    if (container) cs.add({ p });
                    else cs.add({ px, py: p, borR: sz() });

                    Debug.debug(prop?.debug, 'custom', { cs });

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
