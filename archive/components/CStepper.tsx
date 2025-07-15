//-Path: "react-choco-style/lib/src/components/CStepper.tsx"
import { createStyled } from '../hook/ChocoStyle';
import { useChocoProps } from '../hook/ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { Stepper as MuiStepper } from '@mui/material';

const Stepper = createStyled(MuiStepper, 'CStepper')();

export type CStepperProps = ChocoStyledProps<typeof MuiStepper>;

export function CStepper(prop: CStepperProps) {
    return <Stepper {...useChocoProps(prop)} />;
}
