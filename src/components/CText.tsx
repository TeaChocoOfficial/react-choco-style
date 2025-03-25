//-Path: "react-choco-style/src/components/CText.tsx"
import { CSkeleton } from './CSkeleton';
import { Typography } from '@mui/material';
import { ChocoProps } from '../hook/ChocoProps';
import { ChocoStyle } from '../hook/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';

const Text = ChocoStyle.styled(Typography, 'CText')({ sz: 16 });

export type CTextProps = ChocoStyledProps<typeof Text, { skeleton?: boolean }>;

export function CText<Props extends CTextProps>(prop: Props) {
    return (
        <Text
            {...ChocoProps.useChocoProps(
                prop,
                () => {
                    const { skeleton } = prop;
                    if (skeleton) {
                        return {
                            cs: { w: '100%', h: '1.2em' },
                            children: <CSkeleton />,
                        };
                    }
                    return {};
                },
                ['skeleton'],
            )}
        />
    );
}
