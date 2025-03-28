//-Path: "react-choco-style/src/view/Setup.tsx"
import App from './App';
import { InitChoco } from '@teachoco-official/react-choco-style';

export default function Setup() {
    return (
        <>
            {/* <InitChoco createTheme={(theme) => ({ ...theme })}> */}
                <App />
            {/* </InitChoco> */}
        </>
    );
}
