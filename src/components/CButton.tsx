//-Path: "react-choco-style/src/components/CButton.tsx"
import { ColorType } from '../types/color';
import useNavigate from '../custom/ReactRoute';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { StyleTypes, ToType } from '../types/choco';
import { Button as MuiButton } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';
import { useGetsetClrProps } from '../hook/ChocoColor';

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
    }
>;

export function CButton({
    to,
    text,
    setClr,
    lowcase,
    outline,
    onClick,
    disabled,
    container,
    ...prop
}: CButtonProps) {
    const navigate = useNavigate();
    const getSetClrProps = useGetsetClrProps();

    const props = useChocoProps(prop, ({ getFont, getSize, theme }) => {
        const size = getSize(prop);
        const fontStyle = getFont('medium');
        let cs: StyleTypes = {
            ...fontStyle,
            borR: -theme.root.size.borR,
            fontS: -size,
        };
        const padding =
            (size ?? theme.root.size.padding) / theme.root.size.padding;
        if (container) {
            cs = {
                p: -padding,
                ...cs,
            };
        } else {
            cs = {
                py: -padding,
                px: -padding * 2,
                ...cs,
            };
        }

        if (lowcase || container) {
            cs = {
                textTransform: 'none',
                ...cs,
            };
        }

        const { styles } = getSetClrProps({
            text,
            setClr,
            outline,
            disabled,
        });

        return {
            cs: { ...styles, ...cs },
            variant: text ? 'text' : outline ? 'outlined' : 'contained',
        };
    });

    return (
        <Button
            {...props}
            tabIndex={disabled ? -1 : undefined}
            onClick={(event) => {
                if (disabled) return;
                onClick?.(event);
                navigate(to);
            }}
        />
    );
}
