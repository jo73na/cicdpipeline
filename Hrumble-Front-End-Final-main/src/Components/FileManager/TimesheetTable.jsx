import { Table, Tooltip } from 'antd';
import React, { useContext, useEffect } from 'react'
import { DownloadOutlined , LeftOutlined } from '@ant-design/icons';
import FileManagerContext from '../../Providers/FileManagerProvider';
import moment from 'moment';

const TimesheetTable = () => {

  const { FetchTimesheet, timesheetDoc , fetchEmployFull} = useContext(FileManagerContext);

  console.log("timesheettt",timesheetDoc)

  const handleOpen = () => {
    FetchTimesheet()
  }
      
      const columns = [
        {
          title: 'File Name',
          dataIndex: 'fileName',
          key: 'file',
        },
        {
          title: 'Project Name',
          dataIndex: 'ProjectName',
          key: 'project',
          render: (text, record) => (
            <p className='d_f a_i_c g_5 c_primary' style={{cursor:"pointer"}} >{text}</p>
        
            // <Icon className='clients-table-icon' component = {BreifCaseAdd} />
          
          ),
        },
        {
          title: 'Uploaded On',
          dataIndex: 'UploadedOn',
          key: 'upload',
        },
        {
        title: 'Action',
        dataIndex: 'download',
        key: 'download',
        render:  (text, record) => (
          <div style={{
            display:"flex",
            gap:"10px 10px"
         }}>
          <a href={`https://apiv1.technoladders.com/${record?.timesheet}`} target="_blank" rel="noopener noreferrer" download>
          <Tooltip placement="bottomRight" title="Download">
          <DownloadOutlined />
                          
          </Tooltip>
          </a>
          </div>
          )
        },
      ];

      const data = []

      timesheetDoc?.map((items,i) => (
        data.push({
            key:i+1,
            // id:items?.employee_id!=="undefined" ? items?.employee_id : " ",
            fileName:items?.timesheet,
            ProjectName:items?.projectData[0]?.project_name,
            UploadedOn:moment(items?.createdAt).format('DD MMM, YYYY - h:mm A'),
            timesheet:items?.timesheet,
            // action:items?._id,
        })
      ))

      // useEffect(() => {
      //   FetchTimesheet()
      // },[])


  return (
    <div className='p_t_10'>
        {/* <LeftOutlined />
        <label className='employeeDashBoard-personalLabel'>{employeeFull?.firstname}</label> */}
      <Table  dataSource={data} columns={columns} />
    </div>
  )
}

export default TimesheetTable
