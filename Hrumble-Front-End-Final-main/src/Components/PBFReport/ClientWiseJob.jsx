import React, { useContext, useEffect } from 'react';
import { Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import PBFContext from '../../Providers/PBFReports';
import {LeftOutlined } from '@ant-design/icons';


const ClientWiseJob = () => {
 const {fetchClientWiseJob,clientJobs}=useContext(PBFContext)
 let parms=useParams()
 const navigate=useNavigate()

 console.log("clientJobs",clientJobs)
 let data=[]
 clientJobs?.map((item)=>{
    data.push({
        action:item?._id,
        jobTitle:item.job_title,
        clientSubmissions:item?.clientSubmission,
        clientScreenReject:item?.clientScreenReject,
        interviewed:item?.Interview,
        offered:item?.offered,
        joined:item?.joined

    })
 })
 useEffect(() => {
     fetchClientWiseJob(parms.id)
 }, [])
 
  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render:(text,record)=>(
        <a  className="hover_add" onClick={(e)=>navigate(`/jobs/${record?.action}`)}>{text}</a>

      )

    },
    {
      title: 'Client Submissions',
      dataIndex: 'clientSubmissions',
      key: 'clientSubmissions',
    },
    {
      title: 'ClientScreen Reject',
      dataIndex: 'clientScreenReject',
      key: 'clientScreenReject',
    },
    {
      title: 'Interviewed',
      dataIndex: 'interviewed',
      key: 'interviewed',
    },
    {
      title: 'Offered',
      dataIndex: 'offered',
      key: 'offered',
    },
    {
      title: 'Joined',
      dataIndex: 'joined',
      key: 'joined',
    },
  ];

  return (
  <>
       <div className='d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm'>
         <p className='heading_text'><LeftOutlined className='back' onClick={()=>navigate(-1)}/> <span style={{
           cursor:"pointer"
         }}  onClick={()=>navigate("/client-report")}>Clients</span> / Jobs</p>

     
   
    </div>  
   <Table dataSource={data} columns={columns} /></>)
};

export default ClientWiseJob;