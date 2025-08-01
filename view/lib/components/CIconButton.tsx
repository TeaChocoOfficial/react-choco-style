//-Path: "react-choco-style/lib/src/components/CIconButton.tsx"
import { ToType } from '../types/choco';
import { Icon, IconProp } from '../custom/Icon';
import { ChocoStyle } from '../class/ChocoStyle';
import { useNavigate } from '../hooks/ReactRoute';
import { ClrPropsType } from '../types/chocoColor';
import { ChocoStyledProps } from '../types/chocoHook';
import { IconButton as MuiIconButton } from '@mui/material';

const IconButton = ChocoStyle.styled(MuiIconButton, 'CIconButton')();

export type CIconButtonProps = ChocoStyledProps<
    typeof MuiIconButton,
    ClrPropsType & { to?: ToType; contained?: boolean } & IconProp
>;

export function CIconButton({
    to,
    fa,
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
            {...ChocoStyle.props(prop, ({ chocoColor, getFont, sz }) => {
                const fontStyle = getFont('medium');
                const { styles } = chocoColor.style({
                    setClr,
                    outline,
                    disabled,
                    text: !contained,
                    defaultColor: 'main',
                });

                const cs = styles.clone;
                cs.add(fontStyle);
                cs.add({
                    p: sz({ sz: 'padding' }),
                    fontS: sz({ root: 'text' }),
                });

                return { cs };
            })}
            tabIndex={disabled ? -1 : undefined}
            onClick={(event) => {
                if (disabled) return;
                onClick?.(event);
                navigate(to);
            }}
        >
            {fa || solid || brand || regular || props ? (
                <Icon
                    {...ChocoStyle.props(prop, () => ({}))}
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
