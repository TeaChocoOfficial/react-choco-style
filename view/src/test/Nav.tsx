//-Path: "react-choco-style/src/view/test/Nav.tsx"
import { CTabs } from '@teachoco-official/react-choco-style';

export default function Nav() {
    return (
        <CTabs
            lowcase
            setClr="infoText"
            selectionFollowsFocus
            options={[
                {
                    label: 'Home',
                    to: '/',
                },
                {
                    label: 'Mui',
                    to: '/mui',
                },
                {
                    label: 'Choco',
                    to: '/choco',
                },
            ]}
        />
    );
}
