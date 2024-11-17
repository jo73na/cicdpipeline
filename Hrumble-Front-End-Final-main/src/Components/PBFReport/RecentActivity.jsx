import React, { useContext, useEffect } from 'react';
import { Table,Drawer } from 'antd';


import PBFContext from '../../Providers/PBFReports';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';


import CookieUtil from '../../Utils/Cookies';
import { Tab } from 'react-bootstrap';
import { LeftOutlined } from '@ant-design/icons';



const RecentActivity = ({handleDrawerClose,setDrawerVisible,drawerVisible,filter}) => {
   const {FectpfbReport,pbfLoading,pbfReport,filterdata,handleClearFilter}=useContext(PBFContext)
//    const {permission}=useContext(UserManagementContext)
//  console.log("permission",permission)
//  let filter=permission?.find((item)=>item?.name =="Reports")
const role = CookieUtil.get("role");

  let data=[]
  const navigate=useNavigate()
  
  pbfReport?.map((item,i)=>{
    if(item?.job_id){
      data.push({
        sno:i+1,
        dateOfSubmission: moment(item?.createdAt).format(' DD-MM-YYYY'), 
        client:item?.job_id?.client_id[0]?.name,
        jobId:item?.job_id?.job_id,
        positionName:item?.job_id?.job_title,
        candidate:`${item?.candidateoriginal_id?.first_name} ${item?.candidateoriginal_id?.last_name||""}`,
        positionType:item?.candidateoriginal_id?.mode_of_hiring|| "-",
        status:item?.status,
        recruiter:item?.candidate_owner?.name,
        candidate_id:item?.candidateoriginal_id?._id,
        job_id:item?.job_id?._id,
  
       
      })
    }
  })


 

  useEffect(() => {
   FectpfbReport()
  }, [])
  
  const columns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Date of Submission',
      dataIndex: 'dateOfSubmission',
      key: 'dateOfSubmission',
    },
  ... filter?.options?.includes("viewClient") ?[ 
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
  }]:[],
    {
      title: 'Job ID',
      dataIndex: 'jobId',
      key: 'jobId',
    
    },
    {
      title: 'Position Name',
      dataIndex: 'positionName',
      key: 'positionName',
      render:(text,record)=>(
        <a  className="hover_add" onClick={(e)=>navigate(`/jobs/${record?.job_id}`)}>{text}</a>

      )
    },
    {
      title: 'Candidate',
      dataIndex: 'candidate',
      key: 'candidate',
      render:(text,record)=>(
        
           role =="Vendor" ?
           <p>{text}</p> :
        <a  className="hover_add" onClick={(e)=>navigate(`/candidates/${record?.candidate_id}`)}>{text}</a>

        

      )
    },
    {
      title: 'Position Type',
      dataIndex: 'positionType',
      key: 'positionType',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Recruiter',
      dataIndex: 'recruiter',
      key: 'recruiter',
    },
   
  ];

  const handleClientAction = (record) => {
    // Handle client-related action for the clicked row
    console.log('Client action clicked for record:', record);
  };





  const handleFilterApply = (values) => {

  
    let filterdata={
       ...( Array.isArray(values["date"])  && {startOfMonth:values["date"][0]?.$d}),
       ...( Array.isArray(values["date"])  && {endOfMonth:values["date"][1]?.$d}),

     ...(values["candidateOwner"] && {candidate_owner:values["candidateOwner"]}),
     ...(values["client"] && {client_id:values["client"]}),
    }
    FectpfbReport(filterdata)
    handleDrawerClose()
  };
   console.log("filterdata",filterdata)
  
  return (
   <>
     



<div className='container-fluid'>

<div className="row">
                    <Tab.Container defaultActiveKey={'Grid'} >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="heading_text mb-0">
                            <LeftOutlined className='back' onClick={()=>navigate(-1)}/>Reports</h4>
                            <div className="d-flex align-items-center">
                               
                            </div>
                        </div>
                     
                    
                    </Tab.Container>
                </div>
<Table dataSource={data} columns={columns}
  scroll={{
    x: 1500,
  }} />
</div>

{/* <Drawer
        title="Filter"
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        visible={drawerVisible}
        width={400}
      >
        <FilterPbf  handleFilterApply={handleFilterApply} handleDrawerClose={handleDrawerClose}/>
      </Drawer> */}


 </>
 )
};

export default RecentActivity;