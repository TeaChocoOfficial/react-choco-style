//-Path: "react-choco-style/lib/src/components/CContainer.tsx"
import { CBox } from './CBox';
import { Icon } from '../custom/Icon';
import { CIconButton } from './CIconButton';
import { CPaper, CPaperProps } from './CPaper';
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { CsType, StyleTypes } from '../types/choco';
import { ChocoStyledProps } from '../types/chocoHook';
import { Container as ContainerMui } from '@mui/material';

const Container = createStyled(ContainerMui, 'CContainer')({ px: 0 });

export type CContainerPortion = 'main' | 'header' | 'content';

export type CContainerProp = ChocoStyledProps<
    typeof ContainerMui,
    { portion?: 'main' | 'header' | 'content' }
>;

export type CContainerMainProps = CContainerProp & {
    fullWidth?: boolean;
};

export type CContainerHeaderProps = CContainerProp & {
    back?: string;
    hiddle?: boolean;
    paperProp?: CPaperProps;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
};

export type CContainerContentProps = CContainerProp & {
    hiddle?: boolean;
    paperProp?: CPaperProps;
};

export type CContainerProps<Portion extends CContainerPortion> =
    Portion extends 'main'
        ? CContainerMainProps
        : Portion extends 'header'
        ? CContainerHeaderProps
        : CContainerContentProps;

export function CContainerMain({
    maxWidth,
    fullWidth,
    ...prop
}: CContainerMainProps) {
    const props = useChocoProps(prop, ({ size, theme }) => {
        const cs: StyleTypes = {
            px: 0,
            a: 'c',
            j: 'c',
            dp: 'f',
            fd: 'c',
            g: size({ calc: (size, root) => size / root, root: 'text' }),
        };
        if (fullWidth) {
            cs.w = '100%';
        } else {
            const breakpoint = typeof maxWidth === 'string' ? maxWidth : 'l';
            cs.w = {
                v: '100%',
                [breakpoint]: theme.breakpoint.size[breakpoint],
            };
        }
        return { maxWidth, cs };
    });
    return <Container {...props} />;
}

export function CContainerHeader({
    back,
    hiddle,
    jCenter,
    children,
    leftContent,
    rightContent,
    paperProp = {},
    ...prop
}: CContainerHeaderProps) {
    const boxProps = (key: 'l' | 'r') =>
        useChocoProps({}, ({ size }) => ({
            [key]: size({ root: 'box', calc: (size) => size / 4 }),
            // [key]: size((size) => size / 4, theme.root.size.box),
        }));

    return (
        <Container {...prop} jCenter={jCenter}>
            <CPaper
                posR
                shade={3}
                jCenter={jCenter}
                {...useChocoProps(paperProp, ({ size, theme, getFont }) => {
                    const styleFontHeader = getFont('medium');
                    const cs: CsType = {
                        ...styleFontHeader,
                        a: 'c',
                        dp: 'f',
                        text: 'c',
                        bgImg: null,
                        textTransform: 'capitalize',
                        p: size({ root: 'padding' }),
                        borR: size({ root: 'borR' }),
                        bgClr: hiddle ? null : undefined,
                        bShadow: hiddle ? null : undefined,
                        fontS: size({ root: 'text', calc: (size) => size * 2 }),
                    };
                    return { cs };
                })}
            >
                {(leftContent || back) && (
                    <CBox posA {...boxProps('l')}>
                        <CIconButton to={back} setClr="primaryText">
                            <Icon fa="faLeftLong" />
                        </CIconButton>
                        {leftContent}
                    </CBox>
                )}
                {children}
                {rightContent && (
                    <CBox posA {...boxProps('r')}>
                        {rightContent}
                    </CBox>
                )}
            </CPaper>
        </Container>
    );
}
export function CContainerContent({
    hiddle,
    children,
    paperProp = {},
    ...prop
}: CContainerContentProps) {
    return (
        <Container {...prop}>
            <CPaper
                {...useChocoProps(paperProp, ({ size, theme, getFont }) => {
                    const styleFontContent = getFont();
                    const { padding, borR } = theme.root.size;
                    const cs: CsType = {
                        ...styleFontContent,
                        dp: 'f',
                        fd: 'c',
                        bgImg: null,
                        fontS: size(),
                        p: size({ root: 'padding' }),
                        g: size({ root: 'padding' }),
                        borR: size({ root: 'borR' }),
                        bgClr: hiddle ? null : undefined,
                        bShadow: hiddle ? null : undefined,
                    };
                    return { cs };
                })}
            >
                {children}
            </CPaper>
        </Container>
    );
}

export function CContainer<Portion extends CContainerPortion>({
    portion,
    ...prop
}: CContainerProps<Portion>) {
    switch (portion) {
        case 'main':
            return <CContainerMain {...prop} />;
        case 'header':
            return <CContainerHeader {...prop} />;
        default:
            return <CContainerContent {...prop} />;
    }
}
