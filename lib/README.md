<!---Path: "react-choco-style/README.md" -->

# @teachoco-official/react-choco-style

A React component library for building modern UI, inspired by Material-UI (MUI).

## Status
**Beta Version**  
This library is currently in beta and is not yet fully stable or complete. Features may change, and bugs may be present. Use with caution in production environments.

## Overview
`@teachoco-official/react-choco-style` is a lightweight and customizable UI component library for React applications. It draws heavy inspiration from [Material-UI (MUI)](https://mui.com/), offering a similar design philosophy but with a unique flavor tailored for specific use cases.

## Installation
To install the library, run:

```bash
npm install @teachoco-official/react-choco-style
```

or with Yarn:

```bash
yarn add @teachoco-official/react-choco-style
```

or with pnpm:

```bash
pnpm add @teachoco-official/react-choco-style
```

## Setup
To use the library, wrap your application with the `ChocoProvider` component to enable theming and styling. Below is an example of how to set it up:

```jsx
// Path: src/Setup.tsx
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
                            secondary: ChocoColor.shades(0xcc0033), // Custom secondary color
                        },
                    },
                },
            })}
        >
            <App />
        </ChocoProvider>
    );
}
```

**Note**: The `ChocoProvider` is required to provide the theme context and base CSS styles for all components in the library.

## Usage
Import and use components in your React application:

```jsx
import { CButton } from '@teachoco-official/react-choco-style';

function App() {
  return <CButton setClr="info">Click Me</CButton>;
}
```

## Features
- **Inspired by MUI**: Components follow a similar API and design system as MUI.
- **Customizable**: Easily theme and style components to match your brand.
- **Lightweight**: Optimized for performance with minimal dependencies.

## Contributing
Since this library is in beta, contributions are welcome! Please submit issues or pull requests to the [GitHub repository](https://github.com/teachoco-official/react-choco-style).

## License
MIT

## Disclaimer
This library is under active development. Breaking changes may occur in future updates. Refer to the changelog for details before upgrading.
