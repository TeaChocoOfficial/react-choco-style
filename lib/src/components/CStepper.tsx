//-Path: "react-choco-style/lib/src/components/CStepper.tsx"
import { ChocoStyle } from '../class/ChocoStyle';
import { ChocoStyledProps } from '../types/chocoHook';
import { Stepper as MuiStepper } from '@mui/material';

const Stepper = ChocoStyle.styled(MuiStepper, 'CStepper')();

export type CStepperProps = ChocoStyledProps<typeof MuiStepper>;

export function CStepper(prop: CStepperProps) {
    return <Stepper {...ChocoStyle.props(prop)} />;
}
