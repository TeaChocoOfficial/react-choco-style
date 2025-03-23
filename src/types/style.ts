//-Path: "react-choco-style/src/types/style.ts"
import { SizeKey } from './size';
import { SxProps, Theme } from '@mui/material';
import { SystemCssProperties } from '@mui/system';

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

export type ResponsiveCSSType = { [key in SizeKey]?: CSSType };

export type CSSType = {
    [key in keyof React.CSSProperties]?: React.CSSProperties[key];
};

export type SxProp = SxProps<Theme>;
export type SxType = SystemCssProperties<Theme>;
