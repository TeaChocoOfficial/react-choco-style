//-Path: "react-choco-style/view/src/content/choco/SetColor.tsx"
import { useCallback } from 'react';
import {
    CBox,
    CsType,
    ColorType,
    ChocoStyle,
    ChocoColor,
} from '@teachoco-official/react-choco-style';

const Box = ChocoStyle.styled(CBox)({
    a: 'c',
    j: 'c',
    h: 50,
    w: 200,
    dp: 'f',
    borR: 4,
    txtA: 'c',
});

export default function SetColor() {
    const chocoColor = new ChocoColor();

    const getCs = useCallback(
        (color: ColorType): CsType => {
            const { setColor } = chocoColor.set(color);
            console.log(color, setColor);
            const {
                clr,
                bor,
                hover,
                focus,
                bgClr,
                active,
                bgHover,
                borHover,
                disabled,
                bgActive,
                borActive,
                bgDisabled,
                borDisabled,
                disabledHover,
                bgDisabledHover,
                borDisabledHover,
            } = setColor;

            return {
                us: 'n',
                clr,
                bgClr,
                borders: {
                    color: bor,
                },
                css: {
                    ':hover': {
                        clr: hover,
                        bgClr: bgHover,
                        borders: {
                            color: borHover,
                        },
                    },
                    ':focus': {
                        outlines: {
                            color: focus,
                        },
                    },
                    ':active': {
                        clr: active,
                        bgClr: bgActive,
                        borders: {
                            color: borActive,
                        },
                    },
                    '.disabled': {
                        clr: disabled,
                        bgClr: bgDisabled,
                        borders: {
                            color: borDisabled,
                        },
                        css: {
                            ':hover': {
                                clr: disabledHover,
                                bgClr: bgDisabledHover,
                                borders: {
                                    color: borDisabledHover,
                                },
                            },
                        },
                    },
                },
            };
        },
        [chocoColor],
    );

    return (
        <>
            <Box tabIndex={0} cs={getCs('primary')} className="disabled">
                primary disabled
            </Box>
            <Box tabIndex={0} cs={getCs('main')}>
                inherit
            </Box>
            <Box tabIndex={0} cs={getCs('inheritText')}>
                inheritText
            </Box>
            <Box tabIndex={0} cs={getCs('primary')}>
                primary
            </Box>
            <Box tabIndex={0} cs={getCs('primaryText')}>
                primaryText
            </Box>
            <Box tabIndex={0} cs={getCs('secondary')}>
                secondary
            </Box>
        </>
    );
}
