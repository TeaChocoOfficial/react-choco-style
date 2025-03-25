//-Path: "react-choco-style/src/components/CIconButton.tsx"
import { ColorType } from '../types/color';
import { StyleTypes } from '../types/choco';
import { ChocoProps } from '../hook/ChocoProps';
import { ChocoStyle } from '../hook/ChocoStyle';
import { Icon, IconProp } from '../custom/Icon';
import { ChocoStyledProps } from '../types/chocoHook';
import useNavigate, { ToType } from '../custom/ReactRoute';
import { IconButton as MuiIconButton } from '@mui/material';

const IconButton = ChocoStyle.styled(
    MuiIconButton,
    'CIconButton',
)({
    a: 'c',
    j: 'c',
    of: 'h',
    dp: 'if',
    pos: 'r',
    borR: '50%',
});

export type CIconButtonProps = ChocoStyledProps<
    typeof IconButton,
    {
        to?: ToType;
        setColor?: ColorType;
        color?: StyleTypes['color'];
    } & IconProp
>;

export function CIconButton<Props extends CIconButtonProps>(prop: Props) {
    const navigate = useNavigate();
    const { getFont } = ChocoStyle.useFont();
    const getSetColorProps = ChocoStyle.useGetSetColorProps('primaryText');
    const { to, onClick, fa, solid, brand, regular, props, children } = prop;

    return (
        <IconButton
            {...ChocoProps.useChocoProps(
                prop,
                ({ formatSize, theme }) => {
                    const fontStyle = getFont('medium');
                    const { sz, color, disabled, setColor } = prop;

                    const { styles } = getSetColorProps({
                        disabled,
                        setColor,
                    });

                    return {
                        cs: {
                            ...styles,
                            ...{
                                ...fontStyle,
                                color,
                                sz: sz ?? theme.root.size.text,
                                p: formatSize(
                                    ((sz ?? theme.root.size.padding) /
                                        theme.root.size.padding) *
                                        2,
                                ),
                            },
                        },
                    };
                },
                [
                    'to',
                    'color',
                    'onClick',
                    'disabled',
                    'setColor',
                    'fa',
                    'solid',
                    'brand',
                    'regular',
                    'props',
                ],
            )}
            onClick={(event) => {
                onClick?.(event);
                navigate(to);
            }}
        >
            {fa || solid || brand || regular || props ? (
                <Icon
                    fa={fa}
                    solid={solid}
                    brand={brand}
                    regular={regular}
                    props={props}
                />
            ) : (
                children
            )}
        </IconButton>
    );
}
