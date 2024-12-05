import { useContext } from 'react';
import {Table,Tooltip, Button, } from 'antd';
import ViewJobContext from '../../Providers/ViewJob';

import DownloadIcon from "/images/Download.svg"
import UserManagementContext from '../../Providers/UserMangement';
import CookieUtil from '../../Utils/Cookies';
import { EditOutlined } from '@ant-design/icons';


const BASE = import.meta.env.VITE_BASE;


const CandidatesTable=({table})=>{
 
 const {viewjob,interview,joined,submission,allCandidates,handleStatusEdit,offered,screening,searchcandidates,handleopenCandidateDrawer,AddInterView} = useContext(ViewJobContext);
 
 const {permission}=useContext(UserManagementContext)
 console.log("permission",permission)
 let filter=permission?.find((item)=>item?.name =="Jobs")
 const role = CookieUtil.get("role");



 const generateProgressBar = (statusConfig) => {
  return (
    <div className="just">
      <div className="prograss_bar">
        {statusConfig.map((config, index) => (
          <span key={index} className={`empty ${config}`}></span>
        ))}
      </div>
    </div>
  );
};

 

 const getStatusConfig = (record) => {
  const status = record.status;
  switch (status) {
    case "Screening Submitted":
      return ["process", "", "", "", ""];

    case "Internal screen Reject":
      return ["fail", "", "", "", ""];

    case "Client screen Reject":
      return ["success", "fail", "", "", ""];

    case "Internal Duplicate":
      return ["fail", "", "", "", ""];

    case "Client Duplicate":
      return ["success", "fail", "", "", ""];
    case "Submitted":
      return ["process", "", "", "", ""];

    case "Client submission":
      return ["success", "process", "", "", ""];
    case "L1 schedule":
      return ["success", "success", "process", "", ""];

    case "L1 feedback pending":
      return ["success", "success", "process", "", ""];

    case "L1 select":
      return ["success", "success", "process", "", ""];

    case "L1 Hold":
      return ["success", "success", "process", "", ""];

    case "L1 No show":
      return ["success", "success", "process", "", ""];

    case "L2 schedule":
      return ["success", "success", "process", "", ""];

    case "L2 feedback pending":
      return ["success", "success", "process", "", ""];

    case "L2 No show":
      return ["success", "success", "process", "", ""];

    case "L2 select":
      return ["success", "success", "process", "", ""];

    case "L2 Hold":
      return ["success", "success", "process", "", ""];

    case "L3 schedule":
      return ["success", "success", "process", "", ""];

    case "L3 feedback pending":
      return ["success", "success", "process", "", ""];

    case "L3 No show":
      return ["success", "success", "process", "", ""];

    case "L3 select":
      return ["success", "success", "process", "", ""];

    case "L3 Hold":
      return ["success", "success", "process", "", ""];

    case "Position Hold":
      return ["success", "success", "process", "", ""];
    case "L2 Reject":
      return ["success", "success", "fail", "", ""];

    case "L1 Reject":
      return ["success", "success", "fail", "", ""];

    case "L3 Reject":
      return ["success", "success", "fail", "", ""];
    case "Offered":
      return ["success", "success", "success", "success", "process"];
    case "Joined":
      return ["success", "success", "success", "success", "success"];
    default:
      return [];
  }
};

 const handleOpenDrawer=(e,record)=>{
    
    handleopenCandidateDrawer(record)
 }


 const options=[
  "Screening Submitted",
  "Submitted",

 "Internal Duplicate",

 "Internal screen Reject",

 "Client submission",

 "Client Duplicate",

 "Client screen Reject",

 "L1 schedule",

 "L1 feedback pending",

 "L1 No show",

 "L1 select",

 "L1 Hold",

 "L1 Reject",

 "L2 schedule",

 "L2 feedback pending",

 "L2 No show",
   
"L2 select",

 "L2 Hold",

"L2 Reject",

 "L3 schedule",

"L3 feedback pending",
 "L3 No show",

"L3 select",

 "L3 Hold",

"L3 Reject",

 "Offered",

 "Joined",

" Position Hold"
  ]
const value=[]
options.map((item)=>{
  value.push({
    value:item,
    label: item.replace(/\b\w/g, (char) => char.toUpperCase()),
  })
})



 


  const generateColumnsForTable =(tabletab)=>{
    console.log("table",tabletab)
    switch (tabletab) {
        case'AllCandidates':
          return(
            [
                  {
                      title: 'Candidate Name',
                      dataIndex: 'candidate_name',
                      render:(text,record)=>(
                        <a  className="hover_add" onClick={(e)=>handleOpenDrawer(e,record?.action)}>{text}</a>
                
                      ),
                      responsive: ['sm'],
                    },
                    {
                      title: 'Contact No',
                      dataIndex: 'contact_no',
                      responsive: ['sm'],
                    },
                    {
                       title: 'Email address',
                        dataIndex: 'email_id',
                        
                    },
                    {
                      title: 'Candidate Owner',
                      dataIndex: 'candidate_owner',
                      responsive: ['sm'],
                    },
                   ...[(filter?.options?.includes("View Profit") ?
                   {
                    title: 'Profit',
                    dataIndex: 'profit',
                    responsive: ['sm'],
                    
                 render:  (text) => (
                   <p>{text}</p>
                 )
                  }:{})],
                   
                    {
                      title: 'Progress',
                      // dataIndex: 'contact_no',
                      render:(text,record) =>generateProgressBar(getStatusConfig(record))
                    },
                   
                    {
                      title: 'Status',
                      dataIndex: 'status',
                      render: (text) => {
                        let labelClassName = '';
                    
                        if (
                          text === "Screening Submitted" ||
                          text === "Submitted" ||
                          text === "Client submission"
                        ) {
                          labelClassName = 'status_submission';
                        } else if (
                          text === "L1 select" ||
                          text === "L2 select" ||
                          text === "L3 select" ||
                          text === "Joined"
                        ) {
                          labelClassName = 'status_select';
                        } else if (
                          text === "L1 schedule" ||
                          text === "L1 feedback pending" ||
                          text === "L1 No show" ||
                          text === "L2 feedback pending" ||
                          text === "L2 No show" ||
                          text === "L3 feedback pending" ||
                          text === "L3 No show" ||
                          text === "L1 Hold" ||
                          text === "L3 Hold" ||
                          text === "L2 schedule" ||
                          text === "L2 Hold" ||
                          text === "L3 schedule" ||
                          text === "Position Hold"
                        ) {
                          labelClassName = 'status_schdule';
                        } else if (
                          text === "L1 Reject" ||
                          text === "L2 Reject" ||
                          text === "L3 Reject" ||
                          text === "Internal Duplicate" ||
                          text === "Client screen Reject" ||
                          text === "Client Duplicate" ||
                          text === "Internal screen Reject"
                        ) {
                          labelClassName = 'status_reject';
                        } else if (
                          text === "Offered"
                        ) {
                          labelClassName = 'status_offered';
                        }
                    
                        return (
                          <p className={labelClassName}>{text}</p>
                        );
                      },
                    },
                    
                  {
                    title: 'Action',
                    dataIndex: 'action',
                   render:  (text, record) => (
                    <div style={{
                      display:"flex",
                      gap:"10px 10px",
                       alignItems:"center"
                   }}>
                    {
                      (role  != "Vendor") &&
                      <Button  type ="primary" className=''
                      onClick ={()=>AddInterView(record?.action)}><EditOutlined/>Status</Button>
                    }
                      
                       {/* {record.status =="L1 schedule" &&<p style={{
                           cursor:"pointer"
                          
                       }} onClick ={()=>AddInterView(record?.action)}>
                       <PlusOutlined /></p>}
                       {record.status =="L2 schedule" &&<p style={{
                           cursor:"pointer"
                           
                         }} onClick ={()=>AddInterView(record?.action)}>
                         <PlusOutlined /></p>}
                       {record.status =="L3 schedule" &&<p  style={{
                           cursor:"pointer"
                         }} onClick ={()=>AddInterView(record?.action)}>
                         <PlusOutlined /></p>} */}
                    
       
                   
                       <a href={`${BASE}${record?.resume}`} target="_blank" rel="noopener noreferrer" download>
                       <Tooltip placement="bottomRight" title="Download">
                        
                           <img src={DownloadIcon}/>
                          
               </Tooltip>
                   </a>
                   </div>
                  )

                },
               
               
                
                // Add more columns as needed using the createCandidateColumn function.
              ]
          ) 
  
          case 'screening':
          case 'interview':
          case 'submission':
          case 'offered':
          case 'hired':
          case 'jioned':
            return (
              [
                  {
                      title: 'Candidate Name',
                      dataIndex: 'candidate_name',
                      responsive: ['sm'],
                    },
                    {
                      title: 'Contact No',
                      dataIndex: 'contact_no',
                      responsive: ['sm'],
                    },
                    {
                        title: 'Email address',
                         dataIndex: 'email_id',
                         
                     },
                    {
                      title: 'Candidate Owner',
                      dataIndex: 'candidate_owner',
                      responsive: ['sm'],
                    }, 
                     {
                      title: 'Status',
                      dataIndex: 'status',
                     
                    },
               
               
                
                // Add more columns as needed using the createCandidateColumn function.
              ]
            );
    }
  }

  let tableColumns = generateColumnsForTable(table);
  
  const profit =(item)=>{
     console.log("item",item)

    // let profit = 0;
    // switch (true) {
    //     case item?.job_id?.client_id[0]?.currency === "USD" && item?.job_id?.job_type !== "Full Time":
    //         console.log("ddddUSD", item?.client_billing);
            
    //         profit = Number(item?.client_billing ? item?.job_id?.salaryType === "Monthly" ? item?.client_billing * 82 - item?.expected_ctc : item?.client_billing * 82 * 160 - item.expected_ctc : 0).toLocaleString('en-IN', {
    //             style: 'currency',
    //             currency: 'INR',
    //         });
    //         break;

    //     case item?.job_id?.client_id[0]?.currency === "USD" && item?.salary_type === "Per Hour":
    //         console.log("jjjj", item?.client_billing);
          

    //         profit = Number(item?.client_billing ? item?.job_id?.salaryType === "Monthly" ? item?.client_billing * 82 - item?.expected_ctc : item?.client_billing * 160 * 82 - item?.expected_ctc : 0).toLocaleString('en-IN', {
    //             style: 'currency',
    //             currency: 'INR',
    //         });
    //         break;

    //     case item?.job_id?.client_id[0]?.currency === "USD" && item?.job_id?.job_type === "Full Time" :
    //         console.log("ImWorking1");
    //         console.log("ddddUSD", item?.client_billing);
    //         console.log("ddddsalary", item?.expected_ctc);
    //         console.log("dddfullTimesalary", item?.job_id?.client_id[0]?.fulltime_commission);
    //         profit = Number(item?.expected_ctc * (item?.job_id?.client_id[0]?.fulltime_commission ? item?.job_id?.client_id[0]?.fulltime_commission / 100 : 0.0833)).toLocaleString('en-IN', {
    //             style: 'currency',
    //             currency: 'INR',
    //         });
    //         break;

    //     case item?.salary_type === "Monthly":
    //         console.log("dddd", item?.client_billing);
    //         console.log("ImWorking2");

    //         profit = Number(item?.client_billing ? item?.job_id?.salaryType === "Monthly" ? item?.client_billing - item?.expected_ctc : item.client_billing * 160 - item?.expected_ctc : 0).toLocaleString('en-IN', {
    //             style: 'currency',
    //             currency: 'INR',
    //         });
    //         break;

    //     case item?.salary_type === "Per Hour":
    //       console.log("ImWorking3");

    //         profit = Number(item?.client_billing ? item?.job_id?.salaryType === "Monthly" ? item?.client_billing - item?.expected_ctc * 160 : item?.client_billing * 160 - item?.expected_ctc * 160 : 0.0833).toLocaleString('en-IN', {
    //             style: 'currency',
    //             currency: 'INR',
    //         });
    //         break;

    //     case item?.job_id?.client_id[0]?.currency === "INR" && item?.job_id?.job_type === "Full Time":
    //         profit = Number(item?.expected_ctc * (item?.job_id?.client_id[0]?.fulltime_commission ? item?.job_id?.client_id[0]?.fulltime_commission / 100 : 0.0833)).toLocaleString('en-IN', {
    //             style: 'currency',
    //             currency: 'INR',
    //         });
    //         break;

    //     default:
        

    //         profit = Number(item?.job_id?.salaryType === "Monthly" ? item?.client_billing - item?.expected_ctc / 12 : item?.client_billing * 160 - item?.expected_ctc / 12).toLocaleString('en-IN', {
    //             style: 'currency',
    //             currency: 'INR',
    //         });
    // }
    // return profit;
    //  console.log("item?.job_id?.client_id[0]?.currency ",item?.job_id?.client_id[0]?.currency )
    let result;
    if (item?.job_id?.client_id[0]?.currency === "USD") {
      if (item?.job_id?.job_type === "Full Time") {
        console.log("ddddUSD", item?.client_billing);
        result = Number(item?.expected_ctc * (item?.job_id?.client_id[0]?.fulltime_commission ? item?.job_id?.client_id[0]?.fulltime_commission / 100 : 0.0833));
      } else {
        if (item?.job_id?.salaryType === "Monthly") {
          if (item.salary_type === "LPA") {
            result = item?.client_billing * 83  - item?.expected_ctc / 12;
          } else if(item.salary_type =="Monthly") {
            result = item?.client_billing * 83 - item?.expected_ctc;
          }
          else{
            result = item?.client_billing * 83 - item?.expected_ctc*160;

          }
        } else if (item?.job_id?.salaryType === "Per Hour") {
          if (item.salary_type === "LPA") {
            result = item?.client_billing * 83 *160 - item?.expected_ctc / 12;
          } else if(item.salary_type =="Monthly") {
            result = item?.client_billing * 83*160 - item?.expected_ctc ;
          }
          else{
            result = item?.client_billing * 83*160 - item?.expected_ctc *160;

          }
        }
      }
    } else {
      if (item?.job_id?.job_type === "Full Time") {
        console.log("ddddUSD", item?.client_billing);
        result = Number(item?.expected_ctc * (item?.job_id?.client_id[0]?.fulltime_commission ? item?.job_id?.client_id[0]?.fulltime_commission / 100 : 0.0833));
      } else {
        if (item?.job_id?.salaryType === "Monthly") {
          
          if (item.salary_type === "LPA") {
             
            result = item?.client_billing - item?.expected_ctc / 12;    
          } else if(item.salary_type =="Monthly") {
          
            result = item?.client_billing  - item?.expected_ctc;
          }
          else{
            result = item?.client_billing  - item?.expected_ctc*160;

          }
        } 
        else if (item?.job_id?.salaryType === "Yearly") {
          
          if (item.salary_type === "LPA") {
             
            result = item?.client_billing/12 - item?.expected_ctc / 12;    
          } else if(item.salary_type =="Monthly") {
          
            result = item?.client_billing  - item?.expected_ctc;
          }
          else{
            result = item?.client_billing  - item?.expected_ctc*160;

          }
        }
        else if (item?.job_id?.salaryType === "Per Hour") {
          if (item.salary_type === "LPA") {
            result = item?.client_billing  *160 - item?.expected_ctc / 12;
          } else if(item.salary_type =="Monthly") {
            result = item?.client_billing *160 - item?.expected_ctc ;
          }else{
            result = item?.client_billing *160 - item?.expected_ctc *160;

          }
        }
      }
    }
    const formattedResult = result.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).replace(/(\.00|,)$/, '');

    // item?.job_id?.client_id[0]?.currency =="USD"
    //  ? 
    // item?.job_id?.job_type  =="Full Time" ? 
    //   (console.log("ddddUSD",item?.client_billing),
    //   Number(item?.expected_ctc *(item?.job_id?.client_id[0]?.fulltime_commission?item?.job_id?.client_id[0]?.fulltime_commission/100:0.0833)).toLocaleString('en-IN', {
    //     style: 'currency',
    //     currency: 'INR',
    //   }).replace(/(\.00|,)$/, ''))
    //   :  Number( 
    //    item?.job_id?.salaryType =="Monthly"?
    //    item.salary_type =="LPA"?
    //    (
       
    //     item?.client_billing*82/12 -item?.expected_ctc/12
    //   )
    //   :
    //   item.salary_type =="Monthly"?
    //   (
        
    //     item?.client_billing*82 -item?.expected_ctc
    //   )
    //   :
    //   (
       
    //     item?.client_billing*82*160 -item?.expected_ctc/12
    //   )
    //    :
    //    item?.job_id?.salaryType =="Per Hour"?
    //    item.salary_type =="LPA"?
    //    (
       
    //     item?.client_billing*82/12 -item?.expected_ctc/12
    //   )
    //   :
    //   item.salary_type =="Monthly"?
    //   (
       
    //     item?.client_billing*82 -item?.expected_ctc/12
    //   )
    //   :
    //   (
       
    //     item?.client_billing*82*160 -item?.expected_ctc/12
    //   )
    //    :

    //    item?.client_billing*160*82 -item?.expected_ctc/12  ).toLocaleString('en-IN', {
    //    style: 'currency',
    //    currency: 'INR',
    //  }).replace(/(\.00|,)$/, '')
    //  :
      
       
        
        
    //     item?.job_id?.job_type =="Full Time" ?
    //     (
          
    //   console.log("ddddUSD",  Number(item?.expected_ctc *(item?.job_id?.client_id[0]?.fulltime_commission?item?.job_id?.client_id[0]?.fulltime_commission/100:0.0833)),
          
        
    //     Number(item?.expected_ctc *(item?.job_id?.client_id[0]?.fulltime_commission?item?.job_id?.client_id[0]?.fulltime_commission/100:0.0833)).toLocaleString('en-IN', {
    //      style: 'currency',
    //      currency: 'INR',
    //    }).replace(/(\.00|,)$/, '')))
    //    :
    //    item?.salary_type =="Monthly" ? 
    //    (
    //     console.log("dddd",item?.client_billing),
    //     Number(item?.client_billing? item?.job_id?.salaryType =="Monthly"?item?.client_billing - item?.expected_ctc:item.client_billing*160 -item?.expected_ctc:0).toLocaleString('en-IN', {
    //      style: 'currency',
    //      currency: 'INR',
    //    })
       
    //    )
    //     :
    //     item?.salary_type =="Per Hour" ? 
    //     Number(item?.client_billing?item?.job_id?.salaryType =="Monthly"?item?.client_billing -item?.expected_ctc*160 :item?.client_billing *160 -item?.expected_ctc*160:0.0833).toLocaleString('en-IN', {
    //      style: 'currency',
    //      currency: 'INR',
    //    }).replace(/(\.00|,)$/, '')  
    //    :  Number( 
    //     item?.job_id?.salaryType =="Monthly"?
        
    //     item?.client_billing -item?.expected_ctc/12
    //     :
    //     item?.client_billing*160-item?.expected_ctc/12  ).toLocaleString('en-IN', {
    //     style: 'currency',
    //     currency: 'INR',
    //   }).replace(/(\.00|,)$/, '') // Remove ".00" or "," at the end
        
   
   
        return formattedResult
       }

  const mapAllCandidateData = (candidates) => {
    
   
    return candidates.map((item, i) => ({
      key: i,
      candidate_name: `${item?.first_name} ${item?.last_name}`,
      job_title:item?.job_id?.job_title,
      contact_no: item?.phone_no,
      email_id:item?.email_id, 
      profit:profit(item),
      candidate_owner: item?.candidate_owner?.name,
      skils:item?.job_id?.skils,
      status: item?.status,
   
      resume:item?.resume,
      action: item?._id,
    }));
  };
  const mapCandidateData = (candidates, table) => {
    
   
    return candidates.map((item, i) => ({
      key: i,
      candidate_name: `${item?.first_name} ${item?.last_name}`,
      job_title:item?.job_id?.job_title,
      contact_no: item?.phone_no,
      email_id:item?.email_id,

      candidate_owner: item?.Owner,
      skils:item?.job_id?.skils,
      status: item?.status,
   
      resume:item?.resume,
      action: item?._id,
    }));
  };
  const mapDataByTable = (table, dataMap) => {
    const candidates = dataMap[table];
    if (candidates) {
      switch (table) {
        case "AllCandidates":
          return mapAllCandidateData(candidates, table);
        case "screening":
        case "submission":
        case "interview":
        case "offered":
        case "jioned":
          return mapCandidateData(candidates, table);
    
  
        default:
          return [];
      }
    } 
      return [];
    }
  

  const data = mapDataByTable(table, {
    
    AllCandidates:allCandidates,
    screening:viewjob[0]?.screening,
    submission:viewjob[0]?.submission,
    interview: viewjob[0]?.interview,
    offered:viewjob[0]?.offered,
    joined
   
  });

  let  SerachData=[]
  if(searchcandidates){
    SerachData =data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchcandidates?.toLowerCase())
    ))
  } 

  
 
 return( 
     <>
     <Table
      columns={tableColumns}
      pageSize={5} 
      dataSource={ searchcandidates? SerachData:data}
    scroll={{ x: 900 }}
      />
    
      
        </>
    ) 
}


export default CandidatesTable;