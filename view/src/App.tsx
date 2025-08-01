//-Path: "react-choco-style/view/src/App.tsx"
import Nav from './content/Nav';
import Mui from './content/mui/Mui';
import Layout from './content/Layout';
import ChocoAll from './content/ChocoAll';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const chocoRoutes = [
    'Button',
    'Checkbox',
    'Color',
    'Container',
    'Dialog',
    'Drawer',
    'Global',
    'Grid',
    'IconButton',
    'Input',
    'Navigation',
    'SetColor',
    'Shade',
    'Size',
    'Skeleton',
    'Switch',
    'Table',
    'Tabs',
    'Text',
    'Theme',
];

const chocoComponents = Object.fromEntries(
    chocoRoutes.map((name) => [
        name,
        lazy(() => import(`./content/choco/${name}`)),
    ]),
);

export default function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<h1>hello world</h1>}></Route>
                <Route path="/mui" element={<Mui />} />
                <Route path="/choco" element={<Layout />}>
                    <Route index element={<ChocoAll />} />
                    {chocoRoutes.map((name) => (
                        <Route
                            key={name}
                            path={name}
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    {React.createElement(chocoComponents[name])}
                                </Suspense>
                            }
                        />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
