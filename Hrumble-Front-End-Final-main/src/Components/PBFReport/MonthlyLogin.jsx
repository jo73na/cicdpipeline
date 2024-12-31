import React, { useContext, useState, useEffect } from "react";
import FaqContext from "../../Providers/Faq";
import { Table, Select, MenuItem, InputLabel, FormControl } from "@mui/material"; // Material UI for dropdown

const MonthlyLogin = () => {
  const { fethRequestNonBillable, RequestNonBillable } = useContext(FaqContext);
  const [dateHeaders, setDateHeaders] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default current year

  
  useEffect(() => {
    // Fetch data when the component mounts or when the selected month/year changes
    fethRequestNonBillable(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  // Function to process the data
  useEffect(() => {
    if (RequestNonBillable.length > 0) {
      const dates = new Set();
      const employees = {};

      // Iterate over the data to gather unique dates and employee logs
      RequestNonBillable.forEach((entry) => {
        const entryDate = new Date(entry.createdAt);
        const date = entryDate.toLocaleDateString();

        // Check if the entry belongs to the selected month and year
        if (entryDate.getMonth() + 1 === selectedMonth && entryDate.getFullYear() === selectedYear) {
          dates.add(date);
          
          if (!employees[entry.name]) {
            employees[entry.name] = {};
          }
          employees[entry.name][date] = entry.TotalLoggedHours;
        }
      });

      // Set the date headers (sorted)
      setDateHeaders(Array.from(dates).sort());
      setEmployeeData(Object.keys(employees).map((name) => ({
        name,
        logs: employees[name],
      })));
    }
  }, [RequestNonBillable, selectedMonth, selectedYear]);

  // Helper function to determine the background color based on logged hours
  const getCellColor = (totalLoggedHours) => {
    const [hours, minutes] = totalLoggedHours.split(":").map(Number);
    const totalHours = hours + minutes / 60;

    if (totalHours < 5) return "red";
    if (totalHours >= 5 && totalHours < 9) return "yellow";
    return "green";
  };

  // Helper function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // Handler for month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Handler for year selection
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <FormControl>
          <InputLabel>Month</InputLabel>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            {[...Array(12).keys()].map((month) => (
              <MenuItem key={month} value={month + 1}>
                {new Date(0, month).toLocaleString('default', { month: 'long' })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginLeft: "20px" }}>
          <InputLabel>Year</InputLabel>
          <Select value={selectedYear} onChange={handleYearChange}>
            {[...Array(10).keys()].map((yearOffset) => (
              <MenuItem key={selectedYear + yearOffset} value={selectedYear + yearOffset}>
                {selectedYear + yearOffset}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div style={{ overflowX: "auto" }}>
        <Table>
          <thead>
            <tr>
              <th style={{ position: "sticky", left: 0, background: "white" }}>Employee Name</th>
              {dateHeaders.map((date, index) => (
                <th key={index}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee, index) => (
              <tr key={index}>
                <td style={{ position: "sticky", left: 0, background: "white" }}>{employee.name}</td>
                {dateHeaders.map((date, dateIndex) => {
                  const totalLoggedHours = employee.logs[date] || "00:00"; // Fallback to "00:00"
                  return (
                    <td
                      key={dateIndex}
                      style={{
                        backgroundColor: getCellColor(totalLoggedHours),
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {totalLoggedHours}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MonthlyLogin;