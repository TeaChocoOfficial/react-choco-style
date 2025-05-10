//-Path: "react-choco-style/src/view/test/choco/Container.tsx"
import { CContainer } from '@teachoco-official/react-choco-style';

export default function Container() {
    return (
        <CContainer portion="main" mt={-30}>
            <CContainer portion="header" jCenter back="/choco" >
                chocoStyles
            </CContainer>
            <CContainer>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Commodi repellat numquam quas eveniet, distinctio facilis.
                Placeat aperiam quaerat, consectetur labore optio suscipit
                itaque quos accusantium quam, nemo eum possimus atque?
            </CContainer>
            <CContainer hiddle>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Commodi repellat numquam quas eveniet, distinctio facilis.
                Placeat aperiam quaerat, consectetur labore optio suscipit
                itaque quos accusantium quam, nemo eum possimus atque?
            </CContainer>
        </CContainer>
    );
}
