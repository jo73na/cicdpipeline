import React, { useContext, useEffect, useState } from "react";
import FaqContext from "../../../Providers/Faq";
import MonthlyLogin from "./MonthlyLogin";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const AttendanceDashboard = () => {
  const { attendance, fetchattendance } = useContext(FaqContext);

  // State for selected year and month
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  // Generate dates for selected month and year
  const generateMonthDates = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  // Handle changes in selected month or year
  const handleMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleYearChange = (event) => setSelectedYear(event.target.value);

  useEffect(() => {
    fetchattendance();
  }, []); // Fetch data once on component mount

  // Get the dates for the selected month and year
  const monthDates = generateMonthDates(selectedMonth, selectedYear);

  // Filter attendance data to get unique employees
  const uniqueEmployees = Array.from(new Set(attendance.map((entry) => entry.name)))
    .map((name) => attendance.find((entry) => entry.name === name));

  return (
    <div>
      {/* Filter Section for Year and Month */}
      <div className="filter-section" style={{ marginBottom: "20px" }}>
        <FormControl fullWidth style={{ marginRight: "10px" }}>
          <InputLabel>Year</InputLabel>
          <Select value={selectedYear} onChange={handleYearChange}>
            {["2024", "2023", "2022"].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Month</InputLabel>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
              <MenuItem key={month} value={index}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Monthly Attendance Table */}
      <MonthlyLogin attendanceData={uniqueEmployees} monthDates={monthDates} selectedMonth={selectedMonth} selectedYear={selectedYear} />
    </div>
  );
};

export default AttendanceDashboard;
