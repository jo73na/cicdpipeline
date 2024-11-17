import React, { useContext, useState } from 'react'
import { FolderOutlined } from '@ant-design/icons';
import FileManagerContext from '../../Providers/FileManagerProvider';

const ExpenseMonth = ({year}) => {

  const { FetchExpense, employeeLogindata , employeeFull, fetchEmployFull, setFileOpen} = useContext(FileManagerContext);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const handleEmployeeDoc = (year,index) => {
    FetchExpense(year,index)// Handle document for employee with the given id
    setFileOpen(true);
  };

  return (
    <div>
      
        <>
        <div className='col_4 g_20'>
    {months.map((month, index) => ( 
        <div key={index} className='' >
          <div className='file-employeename-box d_f g_10' onClick={(e) => handleEmployeeDoc(year,index+1)}>
            <FolderOutlined />
            <label>{month}</label>
          </div>
        </div>
      ))}
      </div>
     </>
      
    </div>
  )
}

export default ExpenseMonth
