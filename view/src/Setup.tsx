//-Path: "react-choco-style/view/src/Setup.tsx"
import App from './App';
import Test from './Test';
import Archive from './Archive';
import { ChocoProvider } from '@teachoco-official/react-choco-style';

export default function Setup() {
    return (
        <ChocoProvider
            debug
            cssBase
            createTheme={({ ChocoColor }) => ({
                modes: {
                    default: {
                        main: {
                            secondary: ChocoColor.shades(0xcc0033),
                        },
                    },
                },
                // styleSheets() {
                //     return {}
                // },
            })}
        >
            <Archive />
            {/* <App /> */}
            {/* <Test /> */}
        </ChocoProvider>
    );
}
