//-Path: "react-choco-style/src/view/test/choco/Input.tsx"
import { CInput } from '@teachoco-official/react-choco-style';
import { useEffect, useState } from 'react';

export default function Input() {
    const [value, setvalue] = useState('');

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <>
            <CInput value={value} setValue={setvalue} />
            <CInput placeholder="test" label="test" />
            <CInput placeholder="test" label="test info color" setClr="info" />
            <CInput
                variant="filled"
                placeholder="tes"
                label="test"
                leftIcon={'kg'}
                rightIcon={'kg'}
                helper="test"
            />
            <CInput
                leftIcon="faPen"
                variant="standard"
                placeholder="error"
                label="error"
                helper="error"
                error
            />
            <CInput placeholder="tes" value={'some them'} label="test" error />
            <CInput
                disabled
                placeholder="disabled"
                value={'some them'}
                label="disabled input"
            />
            <CInput
                filled
                disabled
                value={'some them'}
                placeholder="disabled"
                label="disabled input disabled"
            />
            <CInput
                required
                disabled
                standard
                placeholder="disabled"
                label="disabled input standard"
            />
            <CInput
                outline
                placeholder="outline"
                label="outline input"
            />
            <CInput
                selects={currencies}
                defaultValue="USD"
                placeholder="select"
                label="select input"
                startAdornment={'$'}
            />
        </>
    );
}

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '₿',
        disabled: false,
    },
    {
        value: 'JPY',
        label: '¥',
    },
    {
        value: 'GBP',
        label: '£',
    },
    {
        value: 'AUD',
        label: '$',
    },
    {
        value: 'CAD',
        label: '$',
        disabled: true,
    },
    {
        value: 'CHF',
        label: 'CHF',
    },
    {
        value: 'CNY',
        label: '¥',
    },
    {
        value: 'INR',
        label: '₹',
    },
    {
        value: 'BRL',
        label: 'R$',
    },
    {
        value: 'RUB',
        label: '₽',
    },
    {
        value: 'KRW',
        label: '₩',
    },
    {
        value: 'SGD',
        label: '$',
    },
    {
        value: 'NZD',
        label: '$',
    },
    {
        value: 'MXN',
        label: '$',
    },
    {
        value: 'ZAR',
        label: 'R',
    },
    {
        value: 'TRY',
        label: '₺',
    },
    {
        value: 'HKD',
        label: '$',
    },
    {
        value: 'SEK',
        label: 'kr',
    },
    {
        value: 'NOK',
        label: 'kr',
    },
    {
        value: 'DKK',
        label: 'kr',
    },
    {
        value: 'THB',
        label: '฿',
    },
    {
        value: 'IDR',
        label: 'Rp',
    },
    {
        value: 'MYR',
        label: 'RM',
    },
    {
        value: 'PHP',
        label: '₱',
    },
    {
        value: 'VND',
        label: '₫',
    },
    {
        value: 'ETH',
        label: 'Ξ',
        disabled: false,
    },
    {
        value: 'AED',
        label: 'د.إ',
    },
    {
        value: 'SAR',
        label: '﷼',
    },
    {
        value: 'ILS',
        label: '₪',
    },
    {
        value: 'CLP',
        label: '$',
        disabled: true,
    },
    {
        value: 'COP',
        label: '$',
    },
    {
        value: 'ARS',
        label: '$',
    },
    {
        value: 'EGP',
        label: '£',
    },
];
