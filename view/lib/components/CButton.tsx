//-Path: "react-choco-style/lib/src/components/CButton.tsx"
import { ChocoStyle } from '../class/ChocoStyle';
import { useNavigate } from '../hooks/ReactRoute';
import { StyleTypes, ToType } from '../types/choco';
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
        container?: boolean;
    }
>;

export function CButton({
    to,
    text,
    lowcase,
    outline,
    disabled,
    container,
    onClick,
    ...prop
}: CButtonProps) {
    const navigate = useNavigate();

    return (
        <Button
            variant={text ? 'text' : outline ? 'outlined' : 'contained'}
            {...ChocoStyle.props(prop, ({ sz, getFont }) => {
                const fontStyle = getFont('medium', {
                    lowcase: lowcase || container,
                });
                const p = sz({ root: 'padding', calc: (size) => size * 2 });
                const px = sz({ root: 'padding', calc: (size) => size * 4 });

                let cs: StyleTypes = {
                    ...fontStyle,
                    minW: 0,
                };

                if (container) cs = { p, ...cs };
                else cs = { py: p, px, ...cs };

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
