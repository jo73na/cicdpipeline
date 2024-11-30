import React, { useState, useEffect, useCallback } from 'react';
import { ChromePicker } from 'react-color';
import { Button, Popover, Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const ThemePicker = ({ onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [themeColors, setThemeColors] = useState(() => {
    // Initialize from localStorage or use default
    const savedTheme = localStorage.getItem('sidebarTheme');
    return savedTheme 
      ? JSON.parse(savedTheme) 
      : {
        bgColor: '#ffffff',
        textColor: '#000000',
        hoverColor: '#f0f0f0'
      };
  });

  // Use useCallback to memoize the color change handler
  const handleColorChange = useCallback((colorType, color) => {
    const newThemeColors = {
      ...themeColors,
      [colorType]: color.hex
    };

    setThemeColors(newThemeColors);
    
    // Save to localStorage
    localStorage.setItem('sidebarTheme', JSON.stringify(newThemeColors));
    
    // Trigger theme change callback
    onThemeChange(newThemeColors);
  }, [themeColors, onThemeChange]);

  // Use useCallback for reset function
  const resetToDefault = useCallback(() => {
    const defaultTheme = {
      bgColor: '#ffffff',
      textColor: '#000000',
      hoverColor: '#f0f0f0'
    };
    
    setThemeColors(defaultTheme);
    localStorage.setItem('sidebarTheme', JSON.stringify(defaultTheme));
    onThemeChange(defaultTheme);
  }, [onThemeChange]);

  // Remove useEffect for initial load, as we've moved that logic to the state initialization

  const colorPickers = [
    { 
      label: 'BG', 
      key: 'bgColor',
      tooltip: 'Sidebar Background Color'
    },
    { 
      label: 'Text', 
      key: 'textColor',
      tooltip: 'Sidebar Text Color'
    },
    { 
      label: 'Hover', 
      key: 'hoverColor',
      tooltip: 'Sidebar Item Hover Color'
    }
  ];

  const themePickerContent = (
    <div 
      className="theme-picker-content" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      {colorPickers.map((picker) => (
        <div 
          key={picker.key} 
          className="color-picker-item" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Tooltip title={picker.tooltip}>
            <div 
              className="color-picker-label" 
              style={{ 
                fontSize: '12px', 
                color: '#666' 
              }}
            >
              {picker.label}
            </div>
            <ChromePicker
              color={themeColors[picker.key]}
              onChange={(color) => handleColorChange(picker.key, color)}
              styles={{
                default: {
                  picker: { 
                    width: '100px' // Make pickers slightly more compact
                  }
                }
              }}
            />
          </Tooltip>
        </div>
      ))}
      <Button 
        onClick={resetToDefault} 
        size="small"
        style={{ 
          marginLeft: '10px',
          alignSelf: 'flex-end'
        }}
      >
        Reset
      </Button>
    </div>
  );

  return (
    <Popover
      content={themePickerContent}
      trigger="click"
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="leftTop"
    >
      <Button 
        type="primary" 
        shape="circle" 
        icon={<SettingOutlined/>}
        style={{
          position: 'fixed',
          top: '50%', 
          right: '20px', 
          transform: 'translateY(-50%)', 
          zIndex: 1000,
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      />
    </Popover>
  );
};

export default React.memo(ThemePicker);