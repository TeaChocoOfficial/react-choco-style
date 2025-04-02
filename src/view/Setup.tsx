//-Path: "react-choco-style/src/view/Setup.tsx"
import App from './App';
import { ChocoProvider } from '@teachoco-official/react-choco-style';

export default function Setup() {
    return (
        <ChocoProvider
            cssBase
            createTheme={(theme) => ({
                modes: {
                    ...theme.modes,
                    default: {
                        ...theme.modes.default,
                        secondary: {
                            main: '#cc0033',
                            dark: '#990022',
                            light: '#ff00b1',
                            text: '#FFFFFF',
                            disabled: '#660033',
                            textDisabled: '#BDBDBD',
                        },
                    },
                },
            })}
        >
            <App />
        </ChocoProvider>
    );
}
