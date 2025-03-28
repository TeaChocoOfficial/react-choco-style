//-Path: "react-choco-style/src/components/CContainer.tsx"
import { CBox } from './CBox';
import { Icon } from '../custom/Icon';
import { CIconButton } from './CIconButton';
import { StyleTypes } from '../types/choco';
import { ChocoProps } from '../hook/ChocoProps';
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Container as ContainerMui } from '@mui/material';

const Container = ChocoStyle.styled(
    ContainerMui,
    'CContainer',
)({
    w: { v: '100%', l: 1024 },
});

export type CContainerContents = 'main' | 'header' | 'content';

export type CContainerMainProps = {
    content: 'main';
    fullWidth?: boolean;
};
export type CContainerHeaderProps = {
    content: 'header';
    back?: string;
    hiddle?: boolean;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
};
export type CContainerContentProps = {
    content?: 'content';
    hiddle?: boolean;
};

export type CContainerProp = ChocoStyledProps<
    typeof ContainerMui,
    CContainerMainProps | CContainerHeaderProps | CContainerContentProps
>;

export type CContainerProps<Content extends CContainerContents = 'content'> =
    ChocoStyledProps<typeof ContainerMui> &
        (Content extends 'main'
            ? CContainerMainProps
            : Content extends 'header'
            ? CContainerHeaderProps
            : CContainerContentProps);

export function CContainerMain<Props extends CContainerProps<'main'>>(
    prop: Props,
) {
    return (
        <Container
            {...ChocoProps.useChocoProps(
                prop,
                ({ formatSize }) => {
                    const { fullWidth } = prop;
                    const cs: StyleTypes = {
                        p: 0,
                        a: 'c',
                        j: 'c',
                        dp: 'f',
                        fd: 'c',
                        gaps: formatSize(1),
                    };
                    if (fullWidth) {
                        cs.w = '100%';
                    } else {
                        cs.mx = 'auto';
                    }
                    return { cs };
                },
                ['content', 'fullWidth'],
            )}
        />
    );
}

export function CContainerHeader<Props extends CContainerProps<'header'>>(
    prop: Props,
) {
    const { getFont } = ChocoStyle.useFont();

    return (
        <Container
            {...ChocoProps.useChocoProps(
                prop,
                ({ theme }) => {
                    const { hiddle } = prop;
                    const styleFontHeader = getFont('medium');

                    return {
                        cs: {
                            ...styleFontHeader,
                            a: 'c',
                            dp: 'f',
                            size: 32,
                            text: 'c',
                            textTransform: 'capitalize',
                            bgClr: hiddle
                                ? undefined
                                : `${theme.palette.background.default}88`,
                            boxShadow: hiddle
                                ? undefined
                                : `0px 10px 13px -6px ${theme.palette.shadow.main},0px 20px 31px 3px ${theme.palette.shadow.main}),0px 8px 38px 7px ${theme.palette.shadow.main}`,
                        },
                    };
                },
                [
                    'back',
                    'hiddle',
                    'content',
                    'children',
                    'leftContent',
                    'rightContent',
                ],
            )}
        >
            {(prop.leftContent || prop.back) && (
                <CBox posA l={50}>
                    <CIconButton to={prop.back} setColor="text">
                        <Icon fa="faLeftLong" />
                    </CIconButton>
                    {prop.leftContent}
                </CBox>
            )}
            {prop.children}
            {prop.rightContent && (
                <CBox posA r={50}>
                    {prop.rightContent}
                </CBox>
            )}
        </Container>
    );
}
export function CContainerContent<Props extends CContainerProps<'content'>>(
    prop: Props,
) {
    const { getFont } = ChocoStyle.useFont();

    return (
        <Container
            {...ChocoProps.useChocoProps(
                prop,
                ({ theme }) => {
                    const { hiddle } = prop;
                    const styleFontContent = getFont();

                    return {
                        cs: {
                            ...styleFontContent,
                            size: 16,
                            bgClr: hiddle
                                ? undefined
                                : `${theme.palette.background.paper}44`,
                            boxShadow: hiddle
                                ? undefined
                                : `0px 10px 13px -6px ${theme.palette.shadow.main},0px 20px 31px 3px ${theme.palette.shadow.main}),0px 8px 38px 7px ${theme.palette.shadow.main}`,
                        },
                    };
                },
                ['content', 'hiddle'],
            )}
        />
    );
}

export function CContainer<Props extends CContainerProp>(prop: Props) {
    switch (prop.content) {
        case 'main':
            return <CContainerMain {...prop} />;
        case 'header':
            return <CContainerHeader {...prop} />;
        default:
            return <CContainerContent {...prop} />;
    }
}
