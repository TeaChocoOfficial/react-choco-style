//-Path: "react-choco-style/src/components/CPaper.tsx"
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoProps } from '../hook/ChocoProps';
import { Paper as MuiPaper } from '@mui/material';
import { ChocoStyledProps } from '../types/chocoHook';

const Paper = ChocoStyle.styled(
    MuiPaper,
    'CPaper',
)(({ theme }) => ({
    color: theme.palette.text.primary,
    bgColor: theme.palette.background.paper,
}));

export type CPaperProps = ChocoStyledProps<typeof Paper>;

export function CPaper<Props extends CPaperProps>(prop: Props) {
    return (
        <Paper
            {...ChocoProps.useChocoProps(
                prop,
                ({ theme, formatSize, callbackSize }) => {
                    return {
                        cs: {
                            p: formatSize(theme.root.size.padding),
                            boxShadow: callbackSize(
                                1,
                                (value: number) =>
                                    `0px ${
                                        value * 2
                                    }px ${value}px -${value}px ${
                                        theme.palette.shadow.main
                                    }`,
                            ),
                        },
                    };
                },
                [],
            )}
        />
    );
}
