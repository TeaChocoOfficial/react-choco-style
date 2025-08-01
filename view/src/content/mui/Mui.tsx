//-Path: "react-choco-style/src/view/test/mui/Mui.tsx"
import {
    AppBar,
    Box,
    Button,
    FormControl,
    GlobalStyles,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
    Toolbar,
} from '@mui/material';
import { useState } from 'react';

export default function Mui() {
    const [input, setInput] = useState('');
    const [sliderValue, setSliderValue] = useState(0);
    const [bodyColor, setBodyColor] = useState('#ffffff'); // ค่าเริ่มต้นเป็นสีขาว

    return (
        <>
            <Box className="redText">this text is Red</Box>
            <GlobalStyles
                styles={(theme) => {
                    // console.log(theme);
                    return {
                        '.redText': {
                            color: 'red',
                        },
                        body: {
                            minHeight: '100vh',
                            backgroundColor: bodyColor,
                            transition: 'background-color 0.3s', // เพิ่ม transition ให้สีเปลี่ยนนุ่มนวล
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                        },
                    };
                }}
            />

            <Box sx={{}}>
                {/* ปุ่ม 4 ปุ่มที่มีสีต่างกัน */}
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#ff5722' }} // สีส้ม
                    onClick={() => setBodyColor('#ff5722')}
                >
                    Orange
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#4caf50' }} // สีเขียว
                    onClick={() => setBodyColor('#4caf50')}
                >
                    Green
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#2196f3' }} // สีน้ำเงิน
                    onClick={() => setBodyColor('#2196f3')}
                >
                    Blue
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#f44336' }} // สีแดง
                    onClick={() => setBodyColor('#f44336')}
                >
                    Red
                </Button>
            </Box>
            <AppBar position="static">
                <Toolbar>material UI</Toolbar>
            </AppBar>
            <Box>mui</Box>
            <FormControl>
                <InputLabel>mui select</InputLabel>
                <Select sx={{ width: 500 }}>
                    <MenuItem></MenuItem>
                    <MenuItem value="test1">test1</MenuItem>
                    <MenuItem value="test2">test2</MenuItem>
                    <MenuItem value="test3">test3</MenuItem>
                    <MenuItem value="test4">test4</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="filled">
                <InputLabel>mui select</InputLabel>
                <Select sx={{ width: 500 }}>
                    <MenuItem></MenuItem>
                    <MenuItem value="test1">test1</MenuItem>
                    <MenuItem value="test2">test2</MenuItem>
                    <MenuItem value="test3">test3</MenuItem>
                    <MenuItem value="test4">test4</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>mui select</InputLabel>
                <Select sx={{ width: 500 }}>
                    <MenuItem></MenuItem>
                    <MenuItem value="test1">test1</MenuItem>
                    <MenuItem value="test2">test2</MenuItem>
                    <MenuItem value="test3">test3</MenuItem>
                    <MenuItem value="test4">test4</MenuItem>
                </Select>
            </FormControl>
            <TextField />
            <Input
                value={input}
                onChange={(event) => {
                    setInput(event.target.value);
                }}
            />
            <Slider />
            <Slider
                value={sliderValue}
                aria-label="Volume"
                onChange={(_, value) => {
                    console.log(value);                    
                    setSliderValue(value as number);
                }}
            />
            {/* <Slider value={sliderValue} /> */}
        </>
    );
}
