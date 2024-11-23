// ThemePicker.jsx
import React, { useContext, useState } from 'react';
import { ChromePicker } from 'react-color';  // A popular color picker package
import { ThemeContext } from '../Providers/Theme/index';

const ThemePicker = () => {
    const { changeBackground, changeSidebarColor, changeHeaderColor } = useContext(ThemeContext);
    const [pickerType, setPickerType] = useState(null); // To manage which picker is open
    const [color, setColor] = useState('#fff'); // Default color

    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
        if (pickerType === 'background') changeBackground(newColor.hex);
        if (pickerType === 'sidebar') changeSidebarColor(newColor.hex);
        if (pickerType === 'header') changeHeaderColor(newColor.hex);
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            <button onClick={() => setPickerType('background')}>Change Background</button>
            <button onClick={() => setPickerType('sidebar')}>Change Sidebar</button>
            <button onClick={() => setPickerType('header')}>Change Header</button>
            
            {pickerType && (
                <ChromePicker color={color} onChangeComplete={handleColorChange} />
            )}
        </div>
    );
};

export default ThemePicker;
