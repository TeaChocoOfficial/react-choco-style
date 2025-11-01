//-Path: "react-choco-style/lib/src/components/CContainer.tsx"
import { CBox } from './CBox';
import { SizeKey } from '../types/size';
import { CIconButton } from './CIconButton';
import { Ary, Obj } from '@teachoco-dev/cli';
import { CPaper, CPaperProps } from './CPaper';
import { ChocoStyledProps } from '../types/chocoHook';
import { ChocoStyle } from '../class/style/ChocoStyle';
import { Container as ContainerMui } from '@mui/material';

const Container = ChocoStyle.styled(ContainerMui, 'CContainer')({ px: 0 });

export type CContainerPortion = 'main' | 'header' | 'content';

export type CContainerProp = ChocoStyledProps<
    typeof ContainerMui,
    { maxSize?: SizeKey; portion?: 'main' | 'header' | 'content' },
    ['maxWidth']
>;

export type CContainerMainProps = CContainerProp;

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
    fullW,
    maxSize,
    ...prop
}: CContainerMainProps) {
    const props = ChocoStyle.props(prop, ({ sz, theme, CsStyle }) => {
        const cs = new CsStyle({
            px: 0,
            a: 'c',
            j: 'c',
            dp: 'f',
            fd: 'c',
            g: sz({ sz: 'padding' }),
        });
        const sizeKeys = Obj.keys(theme.breakpoint.size);
        if (fullW) cs.add({ w: '100%' });
        else {
            maxSize = maxSize ?? Ary.last(sizeKeys);
            cs.add({
                w: {
                    [maxSize]: theme.breakpoint.size[maxSize],
                    v: '100%',
                },
            });
        }
        return { maxWidth: maxSize, cs };
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
        ChocoStyle.props({}, ({ sz }) => ({
            [key]: sz({ root: 'box', calcs: [(after) => after.num / 4] }),
        }));

    return (
        <Container {...prop} jCenter={jCenter}>
            <CPaper
                posR
                shade={3}
                jCenter={jCenter}
                {...ChocoStyle.props(paperProp, ({ sz, getFont, CsStyle }) => {
                    const styleFontHeader = getFont('medium');
                    const cs = new CsStyle(styleFontHeader);
                    cs.add({
                        a: 'c',
                        dp: 'f',
                        txtA: 'c',
                        borR: sz(),
                        bgImg: null,
                        txtTf: 'capitalize',
                        p: sz({ sz: 'padding' }),
                        bgClr: hiddle ? null : undefined,
                        bShadow: hiddle ? null : undefined,
                        fontS: sz({
                            root: 'text',
                            calcs: [(after) => after.num * 2],
                        }),
                    });
                    return { cs };
                })}
            >
                {(leftContent || back) && (
                    <CBox {...boxProps('l')}>
                        {back && (
                            <CIconButton
                                to={back}
                                fa="faLeftLong"
                                setClr="primaryText"
                            />
                        )}
                        {leftContent}
                    </CBox>
                )}
                {children}

                <CBox ml="auto" {...boxProps('r')}>
                    {rightContent}
                </CBox>
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
                {...ChocoStyle.props(paperProp, ({ sz, getFont, CsStyle }) => {
                    const styleFontContent = getFont();
                    const cs = new CsStyle(styleFontContent);
                    cs.add({
                        dp: 'f',
                        fd: 'c',
                        borR: sz(),
                        fontS: sz({
                            root: 'text',
                            calcs: [(after) => after.num * 2],
                        }),
                        bgImg: null,
                        p: sz({ sz: 'padding' }),
                        g: sz({ sz: 'padding' }),
                        bgClr: hiddle ? null : undefined,
                        bShadow: hiddle ? null : undefined,
                    });
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
