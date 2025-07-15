//-Path: "react-choco-style/view/src/Test.tsx"
import { Obj } from '@teachoco-dev/cli';
import {
    Size,
    CTabs,
    CText,
    CButton,
    createStyled,
    useChocoProps,
    useChocoStyle,
    ChocoStyledProps,
    ChocoStyle,
} from '@teachoco-official/react-choco-style';
import { useEffect } from 'react';

const SButton = createStyled('button', 'CButton')();

export type CCButtonProps = ChocoStyledProps<'button'>;

function CCBytton({ ...prop }: CCButtonProps) {
    return (
        <SButton
            {...useChocoProps(prop, ({ size }) => {
                return {
                    cs: {
                        p: size({
                            root: 'padding',
                            calc: (value) => value,
                        }),
                        px: size({
                            root: 'padding',
                            calc: (value) => value * 3,
                        }),
                    },
                };
            })}
        />
    );
}

export default function Test() {
    const chocoStyle = useChocoStyle();
    const { theme } = ChocoStyle;
    const sizes = { v: 0.5, l: 2, d: 5, h: 1.5, t: 3 };
    const testSize = Size.to(sizes, { unit: 'em' });
    console
        .log
        // chocoStyle({ p: -4 }),
        // Size.to(-16, { check: true, unit: 'px' }),
        // testSize,new Size(16),
        // Size.to(new Size(16), { check: true, unit: 'px' }),
        // Size.is(new Size(16))
        ();

    const size = new Size(sizes, {
        unit: 'em',
        // calc: (value, root) => {
        //     return value / root;
        // },
    });

    // const newSize = size.reduce<string>((v) => `${v}em`);

    // console.log(size, size.value, newSize);

    useEffect(() => {
        console.log(theme);
    }, [theme]);

    return (
        <>
            {Obj.map(testSize, (value, key) => {
                return (
                    <CText key={key} fontS={value}>
                        {key}: {value}
                    </CText>
                );
            })}
            <CTabs
                fullW
                lowcase
                setClr="infoText"
                selectionFollowsFocus
                options={[
                    { label: 'Home' },
                    { label: 'Mui' },
                    { label: 'Choco' },
                ]}
            />

            <CText minW={0}>test</CText>
            <CButton sz={-16}>test</CButton>
            <CCBytton debug sz={-32}>
                tester
            </CCBytton>
        </>
    );
}
