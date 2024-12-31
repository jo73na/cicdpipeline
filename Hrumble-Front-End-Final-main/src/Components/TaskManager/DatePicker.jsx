import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button,Input, Card } from 'antd';


const NaturalDatePicker = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(true); // Show calendar by default
    const [currentMonth, setCurrentMonth] = useState(new Date());

  const parseNaturalDate = (input) => {
    const now = new Date();
    const lowercaseInput = input.toLowerCase().trim();

    // Handle basic relative dates
    if (lowercaseInput === 'tod' || lowercaseInput === 'today') {
      return new Date();
    }
    if (lowercaseInput === 'tom' || lowercaseInput === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    }
    if (lowercaseInput === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    }

    // Handle "next week"
    if (lowercaseInput === 'next week') {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek;
    }

    // Handle "X days ago" or "in X days"
    const daysAgoMatch = lowercaseInput.match(/(\d+)\s*days?\s*ago/);
    const inDaysMatch = lowercaseInput.match(/in\s*(\d+)\s*days?/);
    
    if (daysAgoMatch) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(daysAgoMatch[1]));
      return daysAgo;
    }
    if (inDaysMatch) {
      const inDays = new Date();
      inDays.setDate(inDays.getDate() + parseInt(inDaysMatch[1]));
      return inDays;
    }

    // Handle relative times
    if (lowercaseInput === 'later' || lowercaseInput === 'later today') {
      const later = new Date();
      later.setHours(later.getHours() + 2);
      return later;
    }

    // Handle specific times
    if (lowercaseInput.includes('@')) {
      const [datePart, timePart] = lowercaseInput.split('@');
      const baseDate = parseNaturalDate(datePart) || new Date();
      
      // Parse time part
      const timeMatch = timePart.trim().match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
      if (timeMatch) {
        let hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2] || '0');
        const meridiem = timeMatch[3]?.toLowerCase();

        if (meridiem === 'pm' && hours < 12) hours += 12;
        if (meridiem === 'am' && hours === 12) hours = 0;

        baseDate.setHours(hours, minutes, 0, 0);
        return baseDate;
      }
    }

    return null;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    const parsedDate = parseNaturalDate(value);
    if (parsedDate) {
      setSelectedDate(parsedDate);
      setCurrentMonth(parsedDate);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const handleDateClick = (date) => {
    if (date) {
      const newDate = new Date(selectedDate);
      newDate.setFullYear(date.getFullYear());
      newDate.setMonth(date.getMonth());
      newDate.setDate(date.getDate());
      setSelectedDate(newDate);
      setInputValue(formatDate(newDate));
      setShowCalendar(false);
    }
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <Card className="p-0 w-full max-w-xs"> {/* Adjusted width */}
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter date (e.g., 'today @ 3pm', 'in 2 days')"
          className="w-full h-8" // Adjust height for better alignment
        />
        {selectedDate && (
          <div className="mt-2 text-sm text-blue-600">
            Selected: {formatDate(selectedDate)}
          </div>
        )}
        
        {showCalendar && (
          <Card className="absolute z-10 mt-2 p-4 w-full bg-white shadow-lg">
            {/* Calendar UI */}
            <div className="mb-4 flex items-center justify-between">
              {/* Month Navigation */}
              <div className="font-semibold">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((date, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`h-8 w-8 p-0 ${
                    !date ? 'invisible' :
                    isSelected(date) ? 'bg-blue-100 text-blue-600' :
                    isToday(date) ? 'text-blue-600' : ''
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {date?.getDate()}
                </Button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
};


export default NaturalDatePicker;