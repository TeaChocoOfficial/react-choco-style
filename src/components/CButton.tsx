//-Path: "react-choco-style/src/components/CButton.tsx"
import { ColorType } from '../types/color';
import { StyleTypes } from '../types/choco';
import { ChocoProps } from '../hook/ChocoProps';
import { ChocoStyle } from '../hook/ChocoStyle';
import { Button as MuiButton } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';
import useNavigate, { ToType } from '../custom/ReactRoute';

const Button = ChocoStyle.styled(
    MuiButton,
    'CButton',
)(({ formatSize }) => ({
    a: 'c',
    j: 'c',
    of: 'h',
    dp: 'if',
    pos: 'r',
    gaps: formatSize(4),
    borR: formatSize(2),
}));

export type CButtonProps = ChocoStyledProps<
    typeof Button,
    {
        to?: ToType;
        text?: boolean;
        lowcase?: boolean;
        outline?: boolean;
        container?: boolean;
        setColor?: ColorType;
        color?: StyleTypes['color'];
    }
>;

export function CButton<Props extends CButtonProps>(prop: Props) {
    const { to, onClick } = prop;
    const navigate = useNavigate();
    const { getFont } = ChocoStyle.useFont();
    const getSetColorProps = ChocoStyle.useGetSetColorProps();

    return (
        <Button
            {...ChocoProps.useChocoProps(
                prop,
                ({ formatSize, theme }) => {
                    const fontStyle = getFont('medium');
                    const {
                        sz,
                        text,
                        color,
                        lowcase,
                        outline,
                        disabled,
                        setColor,
                        container,
                    } = prop;

                    let cs: StyleTypes = {
                        ...fontStyle,
                        color,
                        sz: sz ?? theme.root.size.text,
                    };

                    if (container) {
                        cs = {
                            p: formatSize(
                                ((sz ?? theme.root.size.padding) /
                                    theme.root.size.padding) *
                                    4,
                            ),
                            ...cs,
                        };
                    } else {
                        cs = {
                            py: formatSize(
                                ((sz ?? theme.root.size.padding) /
                                    theme.root.size.padding) *
                                    4,
                            ),
                            px: formatSize(
                                ((sz ?? theme.root.size.padding) /
                                    theme.root.size.padding) *
                                    8,
                            ),
                            ...cs,
                        };
                    }

                    if (lowcase || container) {
                        cs = {
                            textTransform: 'none',
                            ...cs,
                        };
                    }

                    const { styles } = getSetColorProps({
                        text,
                        outline,
                        disabled,
                        setColor,
                    });

                    return {
                        cs: { ...styles, ...cs },
                        variant: text
                            ? 'text'
                            : outline
                            ? 'outlined'
                            : 'contained',
                    };
                },
                [
                    'to',
                    'text',
                    'color',
                    'lowcase',
                    'outline',
                    'onClick',
                    'disabled',
                    'setColor',
                    'container',
                ],
            )}
            onClick={(event) => {
                onClick?.(event);
                navigate(to);
            }}
        />
    );
}
