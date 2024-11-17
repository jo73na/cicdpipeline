import React, { useContext, useEffect, useState } from 'react'
import TimesheetMonth from './TimesheetMonth';
import { Collapse } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import FileManagerContext from '../../Providers/FileManagerProvider';
import TimesheetTable from './TimesheetTable';
import moment from 'moment';

const AccountsInvoice = ({setEmployOpen}) => {

  const { FetchEmployeeTable, employeeLogindata , employeeFull, timesheetDoc, setFileOpen, fetchEmployFull,fileOpen} = useContext(FileManagerContext);

  console.log("emp-----",timesheetDoc)

const currentYear = new Date().getFullYear();
const pastYear = 2021; // Specify the past year here
const items = [];

const [TimesheetOpen,setTimesheetOpen]= useState(false);

const handleBack = () => {
  setEmployOpen(false)
  FetchSowClient({})
}

const handleMonth = () => {
  setFileOpen(false)
}

const [activeKey, setActiveKey] = useState([String(currentYear)])

for (let year = currentYear; year >= pastYear; year--) {
  items.push({
    key: String(year),
    label: String(year),
    children: <TimesheetMonth year={year} setTimesheetOpen={setTimesheetOpen} />
  });
}

  return (
    <div>
      {fileOpen ? (
        <>
         <LeftOutlined onClick={handleMonth} />
          <label className='employeeDashBoard-personalLabel'>{`${employeeFull?.firstname} / ${moment(timesheetDoc?.createdAt).format('MMM, YYYY')}`}</label>
          <TimesheetTable />
        </>
      ) : (
        <>
        <LeftOutlined onClick={handleBack} />
        <label className='employeeDashBoard-personalLabel'>{employeeFull?.firstname}</label>
        <Collapse defaultActiveKey={activeKey} ghost items={items} />
        </>
      )}
  </div>
  )
}

export default AccountsInvoice
