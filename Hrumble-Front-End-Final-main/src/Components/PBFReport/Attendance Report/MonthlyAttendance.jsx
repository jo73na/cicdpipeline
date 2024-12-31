import React from "react";

const MonthlyAttendance = ({ attendanceData, monthDates }) => {
  const getAttendanceStatus = (hours) => {
    if (hours < 5) return "AB";
    if (hours < 9) return "HD";
    return "FD";
  };

  const getCellStyle = (hours) => {
    if (hours < 5) return { backgroundColor: "red" };
    if (hours < 9) return { backgroundColor: "orange" };
    return { backgroundColor: "green" };
  };

  return (
    <div className="table-responsive">
      <h4 className="mb-4">Monthly Attendance</h4>
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
                const dayData = employee.monthlyData.find(
                  (d) => d.date === date
                );
                const totalHours =
                  (dayData?.total_logged_hours || 0) -
                  (dayData?.break_logged_hours || 0);
                return (
                  <td key={date} style={getCellStyle(totalHours)}>
                    {totalHours > 0 ? getAttendanceStatus(totalHours) : "N/A"}
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

export default MonthlyAttendance;
