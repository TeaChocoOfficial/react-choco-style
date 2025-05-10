//-Path: "react-choco-style/src/view/test/choco/Tabs.tsx"
import { useState } from 'react';
import { CTabs } from '@teachoco-official/react-choco-style';

export default function Tabs() {
    const [tabs, setTabs] = useState('1');

    return (
        <>
            <CTabs
                scrollButtons
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
            <CTabs
                text
                value={tabs}
                options={[
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                    '17',
                    '18',
                    '19',
                    '20',
                ]}
            />
            <CTabs
                value={tabs}
                setClr="secondaryText"
                options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            />
            <CTabs
                value={tabs}
                setClr="secondary"
                options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            />
            <CTabs
                value={tabs}
                setClr="text"
                options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            />
        </>
    );
}

function tabss() {
    return (
        <div className="outline" style={{ overflow: 'auto' }}>
            <div className="tabs">
                <button className="tab">1</button>
                <button className="tab">2</button>
                <button className="tab">3</button>
                <button className="tab">4</button>
                <button className="tab">5</button>
                <button className="tab">6</button>
            </div>
        </div>
    );
}
