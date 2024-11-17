import { Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { FolderOutlined } from '@ant-design/icons';
import FileManagerContext from '../../Providers/FileManagerProvider';
import { useNavigate } from 'react-router-dom';
import TimesheetTotalMonth from '../FileManager/TimesheetTotalMonth'
import moment from 'moment';

const TimeSheet = () => {

    const { FetchEmployeeTable, employeeLogindata , employeeFull, fetchEmployFull} = useContext(FileManagerContext);

    console.log("employ----", employeeLogindata)

    const [EmployOpen,setEmployOpen]= useState(false);

    const navigate = useNavigate();

    const handleEmployeeDoc = (id) => {
        fetchEmployFull(id)
        setEmployOpen(true);
    }
      useEffect(() => {
        FetchEmployeeTable()
      },[])

  return (
    <div>
  
      {
        EmployOpen ? <p><TimesheetTotalMonth setEmployOpen={setEmployOpen} /></p> :

        <div className='col_4'>
          {
            employeeLogindata?.map((item,i) => {
              return<>
              <div className='file-employeename-box d_f g_10'>
                <FolderOutlined />
                <label onClick={(e) => handleEmployeeDoc(item?._id)} className='file-employeename'>{item?.firstname}</label>
              </div>
              </>
            })
          }
        </div>
      }
    </div>
  )
}

export default TimeSheet
