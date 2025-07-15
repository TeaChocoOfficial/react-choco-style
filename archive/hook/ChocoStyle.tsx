//-Path: "react-choco-style/lib/src/hook/ChocoStyle.tsx"
import {
    styled,
    Theme as MuiTheme,
    useTheme as useMuiTheme,
} from '@mui/material';
import {
    PaletteType,
    PalettesType,
    ModesKeyType,
    ThemeFontsType,
    ChocoThemeType,
    UseChocoThemeType,
} from '../types/theme';
import {
    useChocoStyle,
    useResponseCs,
    usePropChocoStyle,
} from './ChocoResponse';
import { motion } from 'framer-motion';
import { Obj } from '@teachoco-dev/cli';
import { SizeValue } from '../types/size';
import { useCallback, useMemo } from 'react';
import { GlobalCss } from '../data/globalCss';
import { removeReservedProps } from './ChocoProps';
import { ChocoStyledProps } from '../types/chocoHook';
import { ReactTagType, SxProp } from '../types/style';
import { CssType, CsType, StyleTypes } from '../types/choco';
import { keysChocoStyleProps } from '../data/reservedKeywords';
import { getThemeMode, themeAtom, themeModeAtom } from '../theme/theme';

// export class ChocoStyle {}

export function getUseChocoStyle({
    mode,
    theme,
    setMode,
    muiTheme,
}: {
    mode: ModesKeyType;
    muiTheme: MuiTheme;
    theme: ChocoThemeType;
    setMode: React.Dispatch<React.SetStateAction<ModesKeyType>>;
}): UseChocoThemeType {
    return {
        mode,
        root: theme.root,
        fonts: theme.fonts,
        breakpoint: theme.breakpoint,
        palette: Obj.mix<PalettesType<PaletteType>>(
            theme.modes.default,
            theme.modes[mode],
        ),
        method: {
            transitions: muiTheme.transitions,
            setMode: (mode) => {
                setMode(mode);
                getThemeMode(mode);
            },
            spacing: (...factor) =>
                factor
                    .map(
                        (f) =>
                            (typeof f === 'number'
                                ? f * theme.root.size.padding
                                : f) + (theme.root.unit.padding ?? ''),
                    )
                    .join(' '),
        },
    };
}

export function useTheme(): UseChocoThemeType {
    const theme = themeAtom.get();
    const muiTheme = useMuiTheme();
    const [mode, setMode] = themeModeAtom.use();

    return useMemo(
        () => getUseChocoStyle({ theme, muiTheme, mode, setMode }),
        [mode, theme, muiTheme],
    );
}

export function createStyled<TagType extends ReactTagType>(
    tag: TagType,
    nameTag?: string,
) {
    return (customStyles?: CsType) => {
        // สร้าง styled component
        const StyledBase = styled(
            tag as unknown as keyof React.JSX.IntrinsicElements,
            { name: nameTag },
        )(() => {
            const responseCs = useResponseCs();
            const chocoStyle = useChocoStyle<StyleTypes>();
            return chocoStyle(responseCs(customStyles)) as Record<
                string,
                SizeValue
            >;
        });

        // ห่อด้วย motion
        const MotionComponent = motion.create(StyledBase);

        // Component ที่จะ return
        return (props: ChocoStyledProps<TagType>) => {
            const responseCs = useResponseCs();
            const propChocoStyle = usePropChocoStyle();
            const sxStyle = useChocoStyle<StyleTypes>();

            const { sx, componentProps } = useMemo(() => {
                const { cs, ...restProps } = props;
                const chocoStyleProps = propChocoStyle(restProps);
                const combinedStyles = Obj.mix<StyleTypes>(
                    responseCs(cs),
                    chocoStyleProps,
                );
                const sx = sxStyle(combinedStyles) as SxProp;
                // console.log(sx);
                const componentProps = removeReservedProps(
                    [...keysChocoStyleProps, 'sx'],
                    restProps,
                );

                return { sx, componentProps };
            }, [props, sxStyle, propChocoStyle]);

            return (
                <MotionComponent
                    sx={sx}
                    {...(componentProps as React.ComponentProps<
                        typeof MotionComponent
                    >)}
                />
            );
        };
    };
}

export function useFont() {
    const theme = useTheme();

    return {
        getFont: useCallback(
            <Style extends StyleTypes | CsType>(
                size?: keyof ThemeFontsType['weight'],
            ) => {
                const css: StyleTypes = {
                    fontFamily: theme.fonts.family,
                    fontWeight: theme.fonts.weight[size ?? 'regular'],
                };
                return css as Style;
            },
            [theme],
        ),
    };
}

export function useGlobalStyles() {
    const [globalCss, setGlobalCss] = GlobalCss.use();

    return useCallback(
        (key: string, css: CssType) => {
            setGlobalCss((prev) => new Map(prev).set(key, css));
        },
        [globalCss],
    );
}
