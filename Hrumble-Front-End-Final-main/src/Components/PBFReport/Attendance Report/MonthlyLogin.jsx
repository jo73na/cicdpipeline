import React from "react";

// Utility function to convert "HH:MM" string to decimal hours
const convertToDecimalHours = (timeStr) => {
  if (!timeStr) return 0; // Handle missing or invalid input
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours + minutes / 60; // Convert hours and minutes to decimal hours
};

// Normalize date string to "YYYY-MM-DD" to match EndTime format
const normalizeDate = (dateStr) => new Date(dateStr).toISOString().split("T")[0]; // "2024-12-18"

const MonthlyLogin = ({ attendanceData, monthDates, selectedMonth, selectedYear }) => {
  const getCellStyle = (hours) => {
    if (hours < 5) return { backgroundColor: "red" };
    if (hours < 9) return { backgroundColor: "orange" };
    return { backgroundColor: "green" };
  };

  console.log("HHHHHHHH:::", attendanceData)
  return (
    <div className="table-responsive">
      <h4 className="mb-4">Monthly Login</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            {monthDates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              {monthDates.map((date) => {
                // Construct full date string for each monthDate (e.g., "2024-12-28")
                const fullDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`;

                // Find matching data for the employee on the current date
                const dayData = employee.attendance?.find(
                  (d) => normalizeDate(d.EndTime) === fullDate
                );

                // Calculate total and break hours
                const totalHours = dayData
                  ? convertToDecimalHours(dayData.total_logged_hours)
                  : 0;
                const breakHours = dayData
                  ? convertToDecimalHours(dayData.break_logged_hours)
                  : 0;

                // Calculate net working hours
                const netHours = totalHours - breakHours;

                return (
                  <td key={date} style={getCellStyle(netHours)}>
                    {netHours > 0 ? netHours.toFixed(2) : "N/A"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyLogin;
