//-Path: "react-choco-style/view/src/test/choco/Size.tsx"

import { Size } from '@teachoco-official/react-choco-style';

export default function Sizes() {
    const size = new Size(20);

    console.log(Size.from(10));
    console.log(size.value);

    return <></>;
}
