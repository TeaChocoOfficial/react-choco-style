//-Path: "react-choco-style/src/view/test/choco/SetColor.tsx"
import { useCallback } from 'react';
import {
    CBox,
    CsType,
    ColorType,
    useGetsetClr,
    createStyled,
} from '@teachoco-official/react-choco-style';

const Box = createStyled(CBox)({
    a: 'c',
    j: 'c',
    h: 50,
    w: 200,
    dp: 'f',
    borR: 4,
    text: 'c',
});

export default function SetColor() {
    const GetsetClr = useGetsetClr();

    const getCs = useCallback(
        (color: ColorType): CsType => {
            const { setColor } = GetsetClr(color);
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
                '&:hover': {
                    clr: hover,
                    bgClr: bgHover,
                    borders: {
                        color: borHover,
                    },
                },
                '&:focus': {
                    outlines: {
                        color: focus,
                    },
                },
                '&:active': {
                    clr: active,
                    bgClr: bgActive,
                    borders: {
                        color: borActive,
                    },
                },
                '&.disabled': {
                    clr: disabled,
                    bgClr: bgDisabled,
                    borders: {
                        color: borDisabled,
                    },
                    '&:hover': {
                        clr: disabledHover,
                        bgClr: bgDisabledHover,
                        borders: {
                            color: borDisabledHover,
                        },
                    },
                },
            };
        },
        [GetsetClr],
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
