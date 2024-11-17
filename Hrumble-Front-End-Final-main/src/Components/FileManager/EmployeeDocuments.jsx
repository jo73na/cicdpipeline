import { Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { FolderOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EmployeeNam from '../FileManager/EmployeeName'
import moment from 'moment';
import FileManagerContext from '../../Providers/FileManagerProvider';

const EmployeeDocuments = () => {

    const { employeeLogindata , FetchEmployeeTable, employeeFull, fetchEmployFull } = useContext(FileManagerContext)

    console.log("employ----", employeeLogindata)

    const [EmployOpen,setEmployOpen]= useState(false);

    const navigate = useNavigate();

    const handleEmployeeDoc = (id) => {
        fetchEmployFull(id)
        setEmployOpen(true);
    }

    // useEffect(() => {
    //   if(employeeFull){
    //     setEmployOpen(true);
    //   }
    // },[employeeFull])
      
      // const columns = [
      //   {
      //     title: 'Employee Name',
      //     key: 'name',
      //     dataIndex: 'name',
      //     render: (text,record) => <><div className='d_f g_10' onClick={(e)=>handleEmployeeDoc(record?.action)}><p><FolderOutlined /></p><a className='hover_add'></a>{text}</div></>,
      //   },
      //   {
      //     title: 'Uploaded On',
      //     dataIndex: 'uploaded',
      //     key: 'uploaded',
      //   },
      //   {
      //     title: 'Last Updated By',
      //     dataIndex: 'updated',
      //     key: 'updated',
      //   },
      // ];

      // const data = []

      // employeeLogindata?.map((items,i) => (
      //   data?.push({
      //     name:items?.firstname,
      //       // updated:items?.,
      //       uploaded:moment(items?.updatedAt).format('DD MMM, yyyy HH:mm A'),
      //       action:items?._id,
      //   })
      // ))

      // console.log("dataa",data)
      useEffect(() => {
        FetchEmployeeTable()
      },[])

  return (
    <div>
    <label className='p_t_10 employeeDashBoard-personalLabel'>All Employees</label>
    
    <div className='col_4 g_20 p_t_10'>
      {/* {
        EmployOpen ? <p><EmployeeNam setEmployOpen={setEmployOpen} /></p> : 
        <>
        <label className='zive-jobDetail-card1-label'>Employee Documents</label>
        <Table className='p_t_15' columns={columns} dataSource={data} />
        </>
      } */}

      {
        EmployOpen ? <p><EmployeeNam setEmployOpen={setEmployOpen} /></p> :

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
    </div>
  )
}

export default EmployeeDocuments
