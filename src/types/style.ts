//-Path: "react-choco-style/src/types/style.ts"
import { SxProps, Theme } from '@mui/material';
import { SystemCssProperties } from '@mui/system';
import { OverridableComponent } from '@mui/material/OverridableComponent';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        // removes the `xs` breakpoint
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
        // adds the `mobile` breakpoint
        v: true; //Vertical Mobile
        h: true; //Horizontal phone
        t: true; //Tablet
        l: true; //Laptop
        d: true; //Desktop
    }
}

export type SxProp = SxProps<Theme>;
export type SxType = SystemCssProperties<Theme>;

export type ReactTagType =
    | keyof React.JSX.IntrinsicElements
    | React.ComponentType<any>
    | OverridableComponent<any>;
