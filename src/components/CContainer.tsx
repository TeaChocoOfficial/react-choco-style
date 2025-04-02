//-Path: "react-choco-style/src/components/CContainer.tsx"
import { CBox } from './CBox';
import { Icon } from '../custom/Icon';
import { CIconButton } from './CIconButton';
import { StyleTypes } from '../types/choco';
import { CPaper, CPaperProps } from './CPaper';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { Container as ContainerMui } from '@mui/material';
import { createStyled, useFont } from '../hook/ChocoStyle';

const Container = createStyled(ContainerMui, 'CContainer')({ px: 0 });

export type CContainerProps = ChocoStyledProps<
    typeof ContainerMui,
    {
        back?: string;
        hiddle?: boolean;
        fullWidth?: boolean;
        leftContent?: React.ReactNode;
        rightContent?: React.ReactNode;
        paperProp?: CPaperProps;
        portion?: 'main' | 'header' | 'content';
    }
>;

export function CContainerMain({
    maxWidth,
    fullWidth,
    ...prop
}: CContainerProps) {
    const props = useChocoProps(prop, ({ formatSize, theme }) => {
        const cs: StyleTypes = {
            px: 0,
            a: 'c',
            j: 'c',
            dp: 'f',
            fd: 'c',
            gaps: formatSize(1),
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
}: CContainerProps) {
    const { getFont } = useFont();
    const paperProps = useChocoProps(paperProp, ({ theme }) => {
        const styleFontHeader = getFont('medium');

        return {
            cs: {
                ...styleFontHeader,
                a: 'c',
                dp: 'f',
                text: 'c',
                p: theme.root.size.padding,
                borR: theme.root.size.borR,
                textTransform: 'capitalize',
                fontS: -(theme.root.size.text * 2),
                bgClr: hiddle
                    ? undefined
                    : `${theme.palette.background.paper}99`,
                boxShadow: hiddle
                    ? undefined
                    : `0px 10px 13px -6px ${theme.palette.shadow.main},0px 20px 31px 3px ${theme.palette.shadow.main} ,0px 8px 38px 7px ${theme.palette.shadow.main}`,
            },
        };
    });

    return (
        <Container {...prop} jCenter={jCenter}>
            <CPaper elevation={4} {...paperProps} jCenter={jCenter}>
                {(leftContent || back) && (
                    <CBox posA l={50}>
                        <CIconButton to={back} setClr="text">
                            <Icon fa="faLeftLong" />
                        </CIconButton>
                        {leftContent}
                    </CBox>
                )}
                {children}
                {rightContent && (
                    <CBox posA r={50}>
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
}: CContainerProps) {
    const { getFont } = useFont();
    const paperProps = useChocoProps(paperProp, ({ theme }) => {
        const styleFontContent = getFont();
        return {
            cs: {
                ...styleFontContent,
                dp: 'f',
                fd: 'c',
                p: -theme.root.size.padding,
                fontS: -theme.root.size.text,
                gaps: -theme.root.size.padding,
                bgClr: hiddle
                    ? undefined
                    : `${theme.palette.background.paper}99`,
                boxShadow: hiddle
                    ? undefined
                    : `0px 10px 13px -6px ${theme.palette.shadow.main},0px 20px 31px 3px ${theme.palette.shadow.main}),0px 8px 38px 7px ${theme.palette.shadow.main}`,
            },
        };
    });

    return (
        <Container {...prop}>
            <CPaper elevation={20} {...paperProps}>
                {children}
            </CPaper>
        </Container>
    );
}

export function CContainer({ portion, ...prop }: CContainerProps) {
    switch (portion) {
        case 'main':
            return <CContainerMain {...prop} />;
        case 'header':
            return <CContainerHeader {...prop} />;
        default:
            return <CContainerContent {...prop} />;
    }
}
