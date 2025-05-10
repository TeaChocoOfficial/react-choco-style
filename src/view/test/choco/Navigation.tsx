//-Path: "react-choco-style/src/view/test/choco/Navigation.tsx"
import { useState } from 'react';
import { CNavigation } from '@teachoco-official/react-choco-style';

export default function Navigation() {
    const [tabs, setTabs] = useState('1');

    return (
        <>
            <CNavigation
                showLabels
                value={tabs}
                setClr="errorText"
                setValue={setTabs}
                options={[
                    { value: '1', label: 'item 1' },
                    'item 2',
                    'item 3',
                    'itme 4',
                    'itme 5',
                    'itme 6',
                    'itme 7',
                    'itme 8',
                    'itme 9',
                    'itme 10',
                ]}
            />
            <CNavigation
                showLabels
                value={tabs}
                setValue={setTabs}
                setClr="disabledText"
                options={['item 1', 'item 2', 'item 3']}
            />
            <CNavigation
                showLabels
                value={tabs}
                setValue={setTabs}
                setClr="disabledText"
                options={['item 1', 'item 2', 'item 3']}
            />
        </>
    );
}
