//-Path: "react-choco-style/view/src/content/choco/Container.tsx"
import { CContainer } from '@teachoco-official/react-choco-style';

export default function Container() {
    return (
        <CContainer portion="main">
            <CContainer
                portion="header"
                jCenter
                back="/choco"
                rightContent={'right content'}
            >
                chocoStyles
            </CContainer>
            <CContainer>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Commodi repellat numquam quas eveniet, distinctio facilis.
                Placeat aperiam quaerat, consectetur labore optio suscipit
                itaque quos accusantium quam, nemo eum possimus atque?
            </CContainer>
            <CContainer hiddle>
                hiddle container
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Commodi repellat numquam quas eveniet, distinctio facilis.
                Placeat aperiam quaerat, consectetur labore optio suscipit
                itaque quos accusantium quam, nemo eum possimus atque?
            </CContainer>
        </CContainer>
    );
}
