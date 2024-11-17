import { useContext, useState,useEffect} from 'react';
import JobContext from '../../Providers/JobProvider';
import {Table, Input, AutoComplete } from 'antd';
import { useNavigate } from 'react-router-dom'
import moment from "moment";
import ViewJobContext from '../../Providers/ViewJob';
import { UserAddOutlined } from '@ant-design/icons';
import UserManagementContext from '../../Providers/UserMangement';
import CookieUtil from '../../Utils/Cookies';






const OpenJobsTable=({table})=>{
  
 const {setvendorjob,handleClickVendor,openJobs,searchjob,closedJobs,pagination,handlePageChange,handleChangestatus} = useContext(JobContext);
 const role = CookieUtil.get("role");
 const admin_id = CookieUtil.get("admin_id");

 const {permission}=useContext(UserManagementContext)
 console.log("permission",permission)
 let filter=permission?.find((item)=>item?.name =="Jobs")
 const [data,setData]=useState([])
 console.log("open",pagination)
 const {handleClickjobTable} = useContext(ViewJobContext);

 const calculateCounts = (candidates,_id) => {
    let submission = 0;
    let ClientSubmission=0;
    let interview = 0;
    let offered = 0;
    let joined = 0;
  
    candidates.forEach((e) => {
      if(e.status === "Submitted"){
         if(role =="Vendor"){
            if(e?.created_by== admin_id && e.job_id==_id){
              console.log("admin_id",e.status,)

                console.log("admin_id",admin_id)
                console.log("created_by",e.created_by)
                 submission+=1;

            }
           
         }
         else{
        submission+=1;
               
         }
      }
      if ( e.status === "Client submission") {
        ClientSubmission += 1;
      }
      if (e.status === "L1 schedule"){
        interview += 1;
      }
      if (e.status === "offered") {
        offered += 1;
      }
      if (e.status === "jioned") {
        joined += 1;
      }
    });
  
    return { submission, interview, offered, joined,ClientSubmission };
  };
 const navigate=useNavigate();
 




useEffect(() => {
 
  if(table === "openjobs"){
  
    let showdata=openJobs&& openJobs.length>0 && openJobs.map((item,i)=>{
      const { submission, interview, joined, offered,ClientSubmission} = calculateCounts(item.screening,item._id);
      
      return { 
          key: i,
          job_id: item?.job_id,
          job_title: item?.job_title,
           clients:`${item?.Clients[0]?.name} ${item.poc?.length>0?(`(${item.poc[0]})`):""}`,
          created_by: item?.done_by[0]?.name,
          submissions: submission,
          interview,
          joined,
          offered,
          status:item.status,
          clientsubmission:ClientSubmission,
          created_on: moment(item?.createdAt).format(' DD-MM-YYYY'), 
          action: item?._id,
      }
   })

   setData(showdata)
   } 


  
}, [openJobs])



//  let  SerachData=[]
//   if(searchjob){
//     SerachData =data.filter((item) =>
//     Object.values(item).some((value) =>
//       value?.toString().toLowerCase().includes(searchjob?.toLowerCase())
//     ))
//   } 

  const handlenavigate=(e,id)=>{
   

    // handleClickjobTable(id)
    navigate(`/jobs/${id}`)

  }


   const handleopenvendor =(id)=>{
     setvendorjob(id)
     handleClickVendor()
   }


 const columns = [
    {
      title: 'Job Id',
      dataIndex: 'job_id',
      responsive: ['sm'],
      render:(text,record)=>(
        <a  className="hover_add" onClick={(e)=>handlenavigate(e,record?.action)}>{text}</a>

      )
     
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      render:(text,record)=>(
        <a  className="hover_add" onClick={(e)=>handlenavigate(e,record?.action)}>{text}</a>

      )
       },
       ...(role !=="Vendor"?
       [
       {
        title: 'Client',
         
        dataIndex: 'clients',
        responsive: ['lg'],
      }]:[]),
  
    {
      title: 'Created By',
      dataIndex: 'created_by',
      responsive: ['sm'],
   
    },
    {
        title: 'Created on',
        dataIndex: 'created_on',
     
      },
      ...(role !== "Vendor" ? 
    [{
        title:<div>Internal <br />
        Submission</div>,
        dataIndex: 'submissions',
        responsive: ['lg'],
    }]:
    [{
      title:<div>Number of <br />
       Submissions</div>,
      dataIndex: 'submissions',
      responsive: ['lg'],
  }]),
    ...(role !== "Vendor" ? 
    [
      {
        title: <div>Client <br /> Submission</div>,
        dataIndex: 'clientsubmission'
      }
    ] 
    : []
  ),
  {
    title:"Status",
    dataIndex: 'status',
    render:(text,record)=>(
     <div className='green'>
       {
         role == "Vendor" ?
           <p>
            {
              text =="opened"?
              <p className='new_status_selectbox'>Opened</p>:
              text =="Hold"?
              <p className='new_status_hold'>Hold</p>:

              <p className='new_status_closed'>Closed</p>
              
            }
           </p>
           :
           <AutoComplete
           onChange={(e)=>handleChangestatus(e,record)}
  // popupClassName="certain-category-search-dropdown"
  // popupMatchSelectWidth={500}
  style={{
    width: 140,
  }}
  value={record.status}
  options={[
    {
      value: "opened",
      label: (
         <p 
          className="opend"
            
           
          >
            Opend
        
         </p>
      ),
    },
    {
      value: "Hold",
      label: (
         <p 
          className="hold"
            
           
          >
            Hold
       </p>
      ),
    },
    {
      value: "closed",
      label: (
         <p 
          className=
            
            "closed"
            
           
          >
            Closed
        
         </p>
      ),
    }
    
  ]}
  size="large"
>
  <Input
   prefix={
    
      <p
       className= {
        record?.status =="opened"?
        "new_status_selectbox":
        record?.status =="Hold"?
        "new_status_hold":
        "new_status_closed"

       }>
        {record.status =="opened"?
        "Opend":record.status =="Hold"?
        "Hold":"Closed"
        }
      </p>
   
    
  }
  />
</AutoComplete>
        
       }
     </div>
    )
      
    
},
  ...[(filter?.options?.includes("AssignIcon")   ?
  {
    title:"",
    dataIndex: '',
    width:40,
    render:(text,record)=>(
   
      <div  style={{
         cursor:"pointer"
      }}
       onClick ={(e)=>handleopenvendor(record?.action)}>
         <UserAddOutlined  />
      </div>
    )
      
    
}:{})],

 
  ];
 return( 
     <>
     <Table
      columns={columns}
      onChange={(pagination) => handlePageChange(pagination.current, pagination.pageSize)}
      pageSize={5} 
      dataSource={data}
      pagination={pagination}
      size="small"
      scroll={{
        x: 800,
      }}/>
    
      
        </>
    ) 
}


export default OpenJobsTable;