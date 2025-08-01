//-Path: "react-choco-style/view/src/Setup.tsx"
import App from './App';
import Test from './test/Test';
import Archive from './test/Archive';
import { ChocoProvider } from '@teachoco-official/react-choco-style';

export default function Setup() {
    return (
        <ChocoProvider
            debug
            cssBase
            createTheme={({ ChocoShade }) => ({
                modes: {
                    default: {
                        main: {
                            secondary: new ChocoShade(0xcc0033),
                        },
                    },
                },
                // styleSheets() {
                //     return {}
                // },
            })}
        >
            <App />
            {/* <Test /> */}
            {/* <Archive /> */}
        </ChocoProvider>
    );
}
