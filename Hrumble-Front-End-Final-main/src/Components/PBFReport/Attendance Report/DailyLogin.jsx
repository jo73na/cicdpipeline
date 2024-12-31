import React, { useState, useEffect } from "react";

const DailyLogin = ({ attendanceData }) => {
  return (
    <div className="table-responsive">
      <h4 className="mb-4">Daily Login</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Login Time</th>
            <th>Logout Time</th>
            <th>Break Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.loginhour}</td>
              <td>{item.logouthour}</td>
              <td>{item.break_logged_hours}</td>
              <td>
                <select
                  defaultValue="Pending"
                  onChange={(e) => console.log(`Status: ${e.target.value}`)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approve">Approve</option>
                  <option value="Reject">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyLogin;
