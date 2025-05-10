//-Path: "react-choco-style/src/view/Setup.tsx"
import App from './App';
import { ChocoProvider } from '@teachoco-official/react-choco-style';

export default function Setup() {
    return (
        <ChocoProvider
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
            <App />
        </ChocoProvider>
    );
}
