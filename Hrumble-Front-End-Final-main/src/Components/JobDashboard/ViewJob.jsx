import React, {useState, useRef, useEffect, useContext} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Dropdown,Tab, Nav } from 'react-bootstrap';

import CountUp from 'react-countup';
import { Drawer, Modal } from 'antd';
import AddInterViewPopup from './AddInterview';
import CandidateView from './Candidateview';

import AddCandidate from './AddCandidate';
import EditCandidate from './EditCandidate';
import { SVGICON } from './../../Utils/SVGICON';
import Loader from '../../Utils/Loader';
import ViewJobContext from '../../Providers/ViewJob';
import UserManagementContext from '../../Providers/UserMangement';
import { Breadcrumb } from '../UtlilsComponent/Breadcrumb';
import { CSVLink } from 'react-csv';


// const tableData = [
//     {id: '01', invid:'INV-100023456', assign: '3', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
//     {id: '02', invid:'INV-100023567', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'Low'},    
//     {id: '03', invid:'INV-100023987', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete', select:'Medium'},    
//     {id: '04', invid:'INV-100023420', assign: '3', status:'In Progress', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project', select:'Low'},    
//     {id: '05', invid:'INV-100023436', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
//     {id: '06', invid:'INV-100023123', assign: '5', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert',select:'Low'},    
//     {id: '07', invid:'INV-100023987', assign: '4', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete',select:'Medium'},    
//     {id: '08', invid:'INV-100023852', assign: '3', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project',select:'High' },    
//     {id: '09', invid:'INV-100023741', assign: '5', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress',select:'Low' },    
//     {id: '10', invid:'INV-100023963', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'High'},
//     {id: '11', invid:'INV-100023123', assign: '5', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert',select:'Low'},    
//     {id: '12', invid:'INV-100023987', assign: '4', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete',select:'Medium'},    
//     {id: '13', invid:'INV-100023852', assign: '3', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project',select:'High' },    
//     {id: '14', invid:'INV-100023741', assign: '5', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress',select:'Low' },    
//     {id: '15', invid:'INV-100023963', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'High'}, 
// 	{id: '16', invid:'INV-100023456', assign: '3', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
//     {id: '17', invid:'INV-100023567', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'Low'},    
//     {id: '18', invid:'INV-100023987', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete', select:'Medium'},    
//     {id: '19', invid:'INV-100023420', assign: '3', status:'In Progress', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project', select:'Low'},    
//     {id: '20', invid:'INV-100023436', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
 




const ViewJob = () => {	
	 let params =useParams()
    const navigate=useNavigate()
   const [status,setStaus]=useState("")
   const [copy,setCopy]=useState(false)
     const { permission } = useContext(UserManagementContext);
  console.log("permission", permission);
  let filter = permission?.find((item) => item?.name == "Jobs");

     const {setViewCandidateDrawer,AddInterView,handleInterviewClose,viewInterviewDrawer,viewall,handleClickjobTable,Loading,jobSingle,viewjobCount,allCandidates,handleStatusEdit,addButtonCan,setAddButtonCan,showEmployeModal,setEditButtonJob,showEmployeModalEdit,editButtonJob,editButtonCanEmploy,viewCandidateDrawer,handleCloseviewDrawer,showCandidateModalEdit,setEditButtonCanEmploy,handleopenCandidateDrawer}=useContext(ViewJobContext)

	 const cardCounter = [
		{number:  viewjobCount[0]?.submissionCount , countText:'purple', title:'Internal Submission'},
		{number: viewjobCount[0]?.clientSubmissionCount,countText:'warning',  title:'Client Submission'},
		{number: viewjobCount[0]?.interviewCount,countText:'danger',  title:'Interviewed'},
		{number:  viewjobCount[0]?.offerCount,countText:'success',  title:'Offered'},
		{number:  viewjobCount[0]?.joinedCount,countText:'danger',  title:'Joined'},
		{number: '0', countText:'primary', title:'Filled'},

		// {number: '16',countText:'danger',  title:'Pending'},
	];

  let tableData =[]
    const headers = [
        { label: "Candidate Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Phone No", key: "phone" },
        { label: "Status", key: "status" },
        // { label: "Created On", key: "created_at" },
        // { label: "Status", key: "status" },
        // { label: "Client Submissions", key: "ClientSubmission" },
    ];
    
 
  
    const csvlink = {
        headers : headers,
        data : tableData,
        filename: "csvfile.csv"
    }
   

 
 


    useEffect(() => {
        handleClickjobTable(params?.id)
        setCopy(false) 

    },[])


     const Submissionsoptions =[
        "Screening Submitted",
        // "Submitted",
      
       "Internal Duplicate",
      
       "Internal screen Reject",
      
       "Client submission",

     ]
     const clientsubmissionoptions=[
        // "Client submission",
        "Client Duplicate",
       
        "Client screen Reject",
        "L1 schedule",
        
      
       
        
       
      
 
      ]

      const Interviewoptions =[
        "L1 feedback pending",
      
        "L1 No show",
       
        "L1 select",
       
        "L1 Hold",
       
        "L1 Reject",
        "L2 schedule",
      ]

       const InterviewL2Options =[
        "L2 feedback pending",
      
       "L2 No show",
         
      "L2 select",
      
       "L2 Hold",
      
      "L2 Reject",
      "L3 schedule",

      
       ]
       const InterviewL3options=[
        "L3 feedback pending",
        "L3 No show",
       
       "L3 select",
       
        "L3 Hold",
       
       "L3 Reject",
       ]

  

      const offeredoptions =[
        "Offered",
      
        "Joined",
       
      ]


       let redColor=[
       "Internal screen Reject",
       "Internal Duplicate",
       "Client screen Reject",
        
       "Client Duplicate",

       "L1 Reject",
      "L3 Reject",
      "L2 Reject",



         
       ]
       let greeColor=[
       "Client submission",
       "Joined",
       "Offered",
      "L3 select",
      "L1 select",
      "L2 select",
      "Submitted",



           
       ]
        let yellowColor=[
       " Position Hold",
        "L3 Hold",
        "L3 No show",
        "L3 feedback pending",
        "L2 Hold",
        "L2 No show",
        "L1 Hold",
        "L2 feedback pending",
        "L1 No show",      
     "L1 feedback pending",




        ]

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
	const getStatusConfig = (status) => {
	
		switch (status) {
         case "Applied":
		 return ["process", "", "", "", ""];
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

      const handlestatusCheck =(status,id)=>{
       if( status == "Client submission" || status === "L1 schedule" || status === "L2 schedule" || status === "L3 schedule"){
        setStaus(status)
        AddInterView(id)
       }
       else{
        handleStatusEdit({status},id)
           
       }


      }



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
               result = item?.client_billing * 82  - item?.expected_ctc / 12;
             } else if(item.salary_type =="Monthly") {
               result = item?.client_billing * 82 - item?.expected_ctc;
             }
             else{
               result = item?.client_billing * 82 - item?.expected_ctc*160;
   
             }
           } else if (item?.job_id?.salaryType === "Per Hour") {
             if (item.salary_type === "LPA") {
               result = item?.client_billing * 82 *160 - item?.expected_ctc / 12;
             } else if(item.salary_type =="Monthly") {
               result = item?.client_billing * 82*160 - item?.expected_ctc ;
             }
             else{
               result = item?.client_billing * 82*160 - item?.expected_ctc *160;
   
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
           } else if (item?.job_id?.salaryType === "Per Hour") {
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


          const handleOpenDrawer=(e,id)=>{
            // e.preventDefault();
            handleopenCandidateDrawer(id)
        }


   
        let breadcrumb =[ {
            title: <Link to="/">Home</Link> ,
          },
          {
            title: <Link to="/jobs">Jobs</Link> ,
          },
          {
            title:  <Link to={`/jobs/${params.id}`}> {jobSingle?.job_title}</Link> ,
            active:true
          },

        ]
    
	return (
        <>
        {
            Loading ?
            <Loader/>
            :
            <div className="container-fluid">	
        <div className="row">
                <Tab.Container defaultActiveKey={'Grid'} >
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="heading mb-0">
     <Breadcrumb breadcrumb={breadcrumb}/>

 </h4>

                      
                    </div>
                    <div> 
                    <div className="">
                            {/* <Nav as="ul" className="nav nav-pills mix-chart-tab user-m-tabe" id="pills-tab">
                                <Nav.Item as="li" className="nav-item" role="presentation">
                                    <Nav.Link as="button" className="nav-link" eventKey={'List'}>
                                        {SVGICON.List}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li" className="nav-item" >
                                    <Nav.Link as="button" className="nav-link" eventKey={'Grid'}>
                                        {SVGICON.GridDots}										
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav> */}
                 <div
                  className='d_f j_c_f_e mb-1'>  
                                    <CSVLink {...csvlink} className="btn btn-primary light btn-sm "><i className="fa-solid fa-file-excel" /> Export Report </CSVLink>                             

             
             <Link to ={`/jobdetail/${jobSingle?._id}`} className="btn btn-success btn-sm ms-2"
                            >Job Description
                            </Link>
                            <Link to className="btn btn-primary btn-sm ms-2"
                                 onClick={showEmployeModal}
                            >+ Add Candidate
                            </Link>
                        </div>

            
                 </div>
                            

                    </div>
                 
                
                </Tab.Container>
            </div>			
           
                <div className="">
                    <div className="card">
                        <div className="card-body px-3 py-4">
                            <div className="row ">
                                {cardCounter.map((item, index)=>(
                                    <div className="col-xl-2 col-sm-4 col-7" key={index}>
                                        <div className="task-summary">
                                            <div className="d-flex align-items-baseline">
                                                <CountUp className={`mb-0 fs-28 fw-bold me-2 text-${item.countText}`}  end={item.number} duration={'5'} />
                                                <h6 className='mb-0'>{item.title}</h6>
                                            </div>
                                            {/* <p>Tasks assigne</p> */}
                                        </div>
                                    </div>
                                ))}

                            </div>	
                        </div>	
                    </div>	
                </div>
                <div className="card">
        <div className="card-header border-0 pb-0 flex-wrap">
            {/* <h4 className="heading mb-0">Literary success</h4> */}
        </div>
        <div className="card-body px-2 pb-0">
             <div>
             <Tab.Container defaultActiveKey={'Social'}>
                <Nav as="ul" className="nav nav-pills success-tab" id="pills-tab" role="tablist">
                    <Nav.Item as="li" >
                        <Nav.Link as="button" eventKey={'Social'}>
                            {SVGICON.SocialHeart}
                            <span>All</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" >
                        <Nav.Link as="button" eventKey={'Screening'}>
                            {SVGICON.Folder}
                            <span>Screening</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" >
                        <Nav.Link as="button" eventKey={'Submission'}>
                            {SVGICON.SaleChart}
                            <span>Submission</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" >
                        <Nav.Link as="button" eventKey={'Interview'}>
                            {SVGICON.Mobile}
                            <span>Interview</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" >
                        <Nav.Link as="button" eventKey={'Offered'}>
                            {SVGICON.FolderHeart}
                            <span>Offered</span>
                        </Nav.Link>
                    </Nav.Item>
                
                    <Nav.Item as="li" >
                        <Nav.Link as="button" eventKey={'Joined'}>
                            {SVGICON.FolderHeart}
                            <span>Joined</span>
                        </Nav.Link>
                    </Nav.Item>
                    
                </Nav> 
                 {/* <p>Sathish</p> */}
                <Tab.Content>
                    <Tab.Pane eventKey={'Social'}>                                
                        <div className="table-responsive">
                            <table className="table  card-table border-no success-tbl">
                                <thead>
                                    <tr>
                                        <th>Candidate Name</th>
                                        <th>Contact No</th>
                                        <th>Email address</th>
                                        <th>Candidate Owner</th>
                                        {

                                 filter?.options?.includes("View Profit") && 
                                         <th>Profit</th>
                                       } 
                                        <th>Progress</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allCandidates?.map((item, ind)=>{
                                        tableData.push({
                                            name:item.first_name+item.last_name,
                                            email:item.email_id,
                                            phone:item?.phone_no,
                                            status:item.status

                                        })

                                        return (
                                            <tr>
                                            <td>
                                            <div className="d-flex align-items-center">
                                                    {/* <img src={item.image} className="avatar avatar-xl" alt="" /> */}
                                                    <div className="ms-2 cat-name" onClick={(e)=>handleOpenDrawer(e,item?._id)}>
                                                        <p className="mb-0">{`${item.first_name} ${item.last_name||""}`}</p>	
                                                        {/* <span>{item.subtitle}</span> */}
                                                    </div>	
                                                </div>
                                            </td>
                                            <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td>
                                            <td>{ item?.candidate_owner?.name}</td>
                                            {
  
  filter?.options?.includes("View Profit") && 
  <td><span>{profit(item)}</span></td>
      } 
                                            
                                            <td>{generateProgressBar(getStatusConfig(item?.status))}</td>
                                            {/* <td>
                                                <div className="d-flex align-items-center">                                                    
                                                    <Sparklines data={Data} className="peity-line2">
                                                        <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                    </Sparklines>
                                                </div>	
                                            </td> */}
                                            {/* <td>{item.view}%</td> */}
                                            <td>
  
         {/* <span className="badge badge-secondary light border-0 ms-1">{item?.status}</span> */}
                                                  
                                            <Dropdown className="task-dropdown-2"
                                            onClick={()=>AddInterView(item?._id)}
                                             >
                                                            <Dropdown.Toggle as="div" className={
                                                               greeColor.includes(item.status)?
                                                               "Complete"
                                                               :
                                                               redColor.includes(item.status)?
                                                               "Pending":
                                                               "Testing"
                                                               
                                                            }>{item.status}</Dropdown.Toggle>
                                                            {/* <Dropdown.Menu className='task-drop-menu' onClick={()=>AddInterView(item?._id)}>
                                                          
                                                                              <Dropdown.Item active={item.status === status}  onClick={()=>AddInterView(item?._id)}>
  
                                                                              </Dropdown.Item>
                                                              </Dropdown.Menu> */}
                                           
                                                        </Dropdown>		
                                                
                                                </td>
                                            <td>
                                            <div className='d_f g_10 a_i_c'>
                                             <i class="fa-solid fa-eye text-primary"
                                             onClick={(e)=>handleOpenDrawer(e,item?._id)}
  
                                               style ={{
                                                cursor:"pointer"
                                              }}></i>
                                             <i class="fa-solid fa-pen-to-square text-primary"
                                              style ={{
                                                cursor:"pointer"
                                              }}
                                              onClick={(e) => showCandidateModalEdit(item?._id)}></i>
                                             </div>
                                            </td>
                                        </tr>
                                        )
                                       
})}
                                </tbody>
                            </table>
                        </div>                                
                    </Tab.Pane>
                    <Tab.Pane eventKey={'Screening'}>
                        <div className="table-responsive">
                            <table className="table  card-table border-no success-tbl">
                                <thead>
                                <th>Candidate Name</th>
                                        <th>Contact No</th>
                                        <th>Email address</th>
                                        <th>Candidate Owner</th>
                                        
                                        <th>Status</th>
                                        {/* <th>Action</th> */}
                                </thead>
                                <tbody>
                                {viewall[0]?.screening?.map((item, ind)=>(
                                        <tr>
                                            <td>
                                            <div className="d-flex align-items-center">
                                                    {/* <img src={item.image} className="avatar avatar-xl" alt="" /> */}
                                                    <div className="ms-2 cat-name" onClick={(e)=>handleOpenDrawer(e,item?._id)}>
                                                        <p className="mb-0">{item.first_name|| "" + item.last_name||""}</p>	
                                                        {/* <span>{item.subtitle}</span> */}
                                                    </div>	
                                                </div>
                                            </td>
                                            <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td>
                                            <td>{ item?.Owner}</td>
                                             <td>
                                                        <span className="badge badge-primary light border-0 me-1">{item.status}</span>

                                             </td>
                                            {/* <td>-</td> */}
                                            {/* <td>{generateProgressBar(getStatusConfig(item?.status))}</td> */}
                                            {/* <td>
                                                <div className="d-flex align-items-center">                                                    
                                                    <Sparklines data={Data} className="peity-line2">
                                                        <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                    </Sparklines>
                                                </div>	
                                            </td> */}
                                            {/* <td>{item.view}%</td> */}
                                           
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>  
                    </Tab.Pane>
                    <Tab.Pane eventKey={'Submission'}>
                        <div className="table-responsive">
                            <table className="table  card-table border-no success-tbl">
                                <thead>
                                    <tr>
                                    <th>Candidate Name</th>
                                        <th>Contact No</th>
                                        <th>Email address</th>
                                        <th>Candidate Owner</th>
                                       
                                        <th>Status</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                {viewall[0]?.submission?.map((item, ind)=>(
                                        <tr>
                                            <td>
                                            <div className="d-flex align-items-center">
                                                    {/* <img src={item.image} className="avatar avatar-xl" alt="" /> */}
                                                    <div className="ms-2 cat-name" onClick={(e)=>handleOpenDrawer(e,item?._id)}>
                                                        <p className="mb-0">{item.first_name|| "" + item.last_name||""}</p>	
                                                        {/* <span>{item.subtitle}</span> */}
                                                    </div>	
                                                </div>
                                            </td>
                                            <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td>
                                            <td>{ item?.Owner}</td>
                                             <td>
                                                        <span className="badge badge-primary light border-0 me-1">{item.status}</span>

                                             </td>
                                            {/* <td>-</td> */}
                                            {/* <td>{generateProgressBar(getStatusConfig(item?.status))}</td> */}
                                            {/* <td>
                                                <div className="d-flex align-items-center">                                                    
                                                    <Sparklines data={Data} className="peity-line2">
                                                        <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                    </Sparklines>
                                                </div>	
                                            </td> */}
                                            {/* <td>{item.view}%</td> */}
                                          
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 
                    </Tab.Pane>
                    <Tab.Pane eventKey={'Interview'}>
                        <div className="table-responsive">
                            <table className="table  card-table border-no success-tbl">
                                <thead>
                                <tr>
                                        <th>Candidate Name</th>
                                        <th>Contact No</th>
                                        <th>Email address</th>
                                        <th>Candidate Owner</th>
                                        
                                        <th>Status</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                {viewall[0]?.interview?.map((item, ind)=>(
                                        <tr>
                                            <td>
                                            <div className="d-flex align-items-center">
                                                    {/* <img src={item.image} className="avatar avatar-xl" alt="" /> */}
                                                    <div className="ms-2 cat-name" onClick={(e)=>handleOpenDrawer(e,item?._id)}>
                                                        <p className="mb-0">{item.first_name|| "" + item.last_name||""}</p>	
                                                        {/* <span>{item.subtitle}</span> */}
                                                    </div>	
                                                </div>
                                            </td>
                                            <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td>
                                            <td>{ item?.Owner}</td>
                                           
                                             <td>
                                                        <span className="badge badge-primary light border-0 me-1">{item.status}</span>

                                             </td>
                                            {/* <td>-</td> */}
                                            {/* <td>{generateProgressBar(getStatusConfig(item?.status))}</td> */}
                                            {/* <td>
                                                <div className="d-flex align-items-center">                                                    
                                                    <Sparklines data={Data} className="peity-line2">
                                                        <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                    </Sparklines>
                                                </div>	
                                            </td> */}
                                            {/* <td>{item.view}%</td> */}
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 
                    </Tab.Pane>
                    <Tab.Pane eventKey={'Offered'}>
                        <div className="table-responsive">
                            <table className="table  card-table border-no success-tbl">
                                <thead>
                                <tr>
                                        <th>Candidate Name</th>
                                        <th>Contact No</th>
                                        <th>Email address</th>
                                        <th>Candidate Owner</th>
                                        {/* <th>Profit</th> */}
                                        {/* <th>Progress</th> */}
                                        <th>Status</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewall[0]?.offered.map((item, ind)=>(
                                            <tr>
                                            <td>
                                            <div className="d-flex align-items-center">
                                                    {/* <img src={item.image} className="avatar avatar-xl" alt="" /> */}
                                                    <div className="ms-2 cat-name" onClick={(e)=>handleOpenDrawer(e,item?._id)}>
                                                        <p className="mb-0">{item.first_name|| "" + item.last_name||""}</p>	
                                                        {/* <span>{item.subtitle}</span> */}
                                                    </div>	
                                                </div>
                                            </td>
                                            <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td>
                                            <td>{ item?.Owner}</td>
                                           
                                             <td>
                                                        <span className="badge badge-primary light border-0 me-1">{item.status}</span>

                                             </td>
                                            {/* <td>-</td> */}
                                            {/* <td>{generateProgressBar(getStatusConfig(item?.status))}</td> */}
                                            {/* <td>
                                                <div className="d-flex align-items-center">                                                    
                                                    <Sparklines data={Data} className="peity-line2">
                                                        <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                    </Sparklines>
                                                </div>	
                                            </td> */}
                                            {/* <td>{item.view}%</td> */}
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey={'Joined'}>
                        <div className="table-responsive">
                            <table className="table  card-table border-no success-tbl">
                                <thead>
                                <tr>
                                        <th>Candidate Name</th>
                                        <th>Contact No</th>
                                        <th>Email address</th>
                                        <th>Candidate Owner</th>
                                        {/* <th>Profit</th> */}
                                        {/* <th>Progress</th> */}
                                        <th>Status</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewall[0]?.offered.map((item, ind)=>(
                                            <tr>
                                            <td>
                                            <div className="d-flex align-items-center">
                                                    {/* <img src={item.image} className="avatar avatar-xl" alt="" /> */}
                                                    <div className="ms-2 cat-name" onClick={(e)=>handleOpenDrawer(e,item?._id)}>
                                                        <p className="mb-0">{item.first_name|| "" + item.last_name||""}</p>	
                                                        {/* <span>{item.subtitle}</span> */}
                                                    </div>	
                                                </div>
                                            </td>
                                            <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td>
                                            <td>{ item?.Owner}</td>
                                           
                                             <td>
                                                        <span className="badge badge-primary light border-0 me-1">{item.status}</span>

                                             </td>
                                            {/* <td>-</td> */}
                                            {/* <td>{generateProgressBar(getStatusConfig(item?.status))}</td> */}
                                            {/* <td>
                                                <div className="d-flex align-items-center">                                                    
                                                    <Sparklines data={Data} className="peity-line2">
                                                        <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                    </Sparklines>
                                                </div>	
                                            </td> */}
                                            {/* <td>{item.view}%</td> */}
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                </Tab.Content>               
            </Tab.Container>
             </div>
            {/* <div>
                                        <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
                                    </div> */}
        </div>
     </div>   	
                {/* <div className='col-xl-12'>
                    <div className="card">            
                        <div className="card-body p-0">
                            <div className="table-responsive active-projects task-table">   
                                <div className="tbl-caption d-flex justify-content-between align-items-center">
                                    <h4 className="heading mb-0">Task</h4>
                                    <div>
                                        <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
                                    </div>
                                </div>    
                                <div id="task-tbl_wrapper" className="dataTables_wrapper no-footer">
                                    <table id="empoloyeestbl2" className="table ItemsCheckboxSec dataTable no-footer mb-2 mb-sm-0">
                                        <thead>
                                            <tr>
                                                <th className="sorting_asc_15" >
                                                    <div className="form-check custom-checkbox ms-0">
                                                        <input type="checkbox" className="form-check-input checkAllInput" required="" 																
                                                            onClick={()=>handleCheckedAll(unchecked)}
                                                        />
                                                        <label className="form-check-label" htmlFor="checkAll"></label>
                                                    </div>
                                                </th>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Assigned To</th>
                                                <th>Tags</th>
                                                <th className="text-end">Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {statusPriority.map((item, index)=>(
                                                <tr key={index}>
                                                    <td className="sorting_25">
                                                        <div className="form-check custom-checkbox">
                                                            <input type="checkbox" className="form-check-input" 																	
                                                                id={`user-${item.id}`}
                                                                checked={item.inputchecked}
                                                                onChange={()=>handleChecked(item.id)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`user-${item.id}`}></label>
                                                        </div>
                                                    </td>
                                                    <td><span>{index + 101}</span></td>
                                                    <td>
                                                        <div className="products">
                                                            <div>
                                                                <h6>{item.title}</h6>
                                                                <span>{item.invid}</span>
                                                            </div>	
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Dropdown className="task-dropdown-2">
                                                            <Dropdown.Toggle as="div" className={item.status}>{item.status}</Dropdown.Toggle>
                                                            <Dropdown.Menu className='task-drop-menu'>
                                                                <Dropdown.Item  onClick={()=>handleAction(item.id,'In Progress')}>In Progress</Dropdown.Item>
                                                                <Dropdown.Item onClick={()=>handleAction(item.id,'Pending')}>Pending</Dropdown.Item>
                                                                <Dropdown.Item onClick={()=>handleAction(item.id,'Testing')}>Testing</Dropdown.Item>
                                                                <Dropdown.Item onClick={()=>handleAction(item.id,'Complete')}>Complete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>															
                                                    </td>
                                                    <td><span>{item.startdate}</span></td>
                                                    <td>
                                                        <span>{item.enddate}</span>
                                                    </td>
                                                    <td>
                                                        <div className="avatar-list avatar-list-stacked">
                                                            {item.assign === "3" ? 																
                                                                <>
                                                                    <img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
                                                                    <img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
                                                                    <img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />
                                                                </>
                                                            : 
                                                            item.assign === "4" ? 
                                                                <>
                                                                    <img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
                                                                    <img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
                                                                    <img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />
                                                                    <img src={IMAGES.contact1} className="avatar avatar-md rounded-circle" alt="" />
                                                                </>
                                                            :

                                                                <>
                                                                    <img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
                                                                    <img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
                                                                    <img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />{" "}
                                                                    <img src={IMAGES.contact2} className="avatar avatar-md rounded-circle" alt="" />{" "}
                                                                    <img src={IMAGES.contact1} className="avatar avatar-md rounded-circle" alt="" />
                                                                </>																	
                                                            }
                                                        </div>
                                                    </td>	
                                                    <td>
                                                        <span className="badge badge-primary light border-0 me-1">Issue</span>
                                                        <span className="badge badge-secondary light border-0 ms-1">HTML</span>
                                                    </td>
                                                    <td className="text-end">															
                                                        <Dropdown className="task-dropdown-2">
                                                            <Dropdown.Toggle as="div" className={item.select}>{item.select}</Dropdown.Toggle>
                                                            <Dropdown.Menu className='task-drop-menu'>
                                                                <Dropdown.Item onClick={()=>handleSelect(item.id,'High')}>High</Dropdown.Item>
                                                                <Dropdown.Item onClick={()=>handleSelect(item.id,'Medium')}>Medium</Dropdown.Item>
                                                                <Dropdown.Item onClick={()=>handleSelect(item.id,'Low')}>Low</Dropdown.Item>																	
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        
                                    </table>
                                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                                        <div className='dataTables_info'>
                                            Showing {lastIndex-recordsPage + 1} to{" "}
                                            {tableData.length < lastIndex ? tableData.length : lastIndex}
                                            {" "}of {tableData.length} entries
                                        </div>
                                        <div
                                            className="dataTables_paginate paging_simple_numbers justify-content-center"
                                            id="example2_paginate"
                                        >
                                            <Link
                                                className="paginate_button previous disabled"
                                                to="#"                                        
                                                onClick={prePage}
                                            >
                                                <i className="fa-solid fa-angle-left" />
                                            </Link>
                                            <span>                                      
                                                {number.map((n , i )=>(
                                                    <Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
                                                        onClick={()=>changeCPage(n)}
                                                    > 
                                                        {n}                                                

                                                    </Link>
                                                ))}
                                            </span>
                                            <Link
                                                className="paginate_button next"
                                                to="#"                                        
                                                onClick={nextPage}
                                            >
                                                <i className="fa-solid fa-angle-right" />
                                            </Link>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
        
        </div>		
        }	


<Modal
title=""
placement="right"
visible={viewInterviewDrawer}
onCancel={handleInterviewClose}
okButtonProps={{ style: { display: 'none' } }}
cancelButtonProps={{ style: { display: 'none' } }}


// open={viewInterviewDrawer}
height={50}
width={700}

>
<AddInterViewPopup status={status}/>
</Modal>

<Drawer
    title="Candidate View"
    placement="right"
    onClose={()=>setViewCandidateDrawer(false)}
    //  loading={true}
    closable={viewCandidateDrawer}
    // size="large"
    
    open={viewCandidateDrawer}
    height={50}
    width={650}
    
    >
    {
        Loading ? <Loader /> :
        <CandidateView />
    }
    </Drawer>

    
    <Drawer
    title="Add Candidate"
    placement="right"
    onClose={showEmployeModal}
    // loading={true}
    closable={addButtonCan}
    // size="large"
    
    open={addButtonCan}
    height={50}
    width={660}
    
>
<AddCandidate />
</Drawer>

<Drawer
    title="Edit Candidate"
    placement="right"
    onClose={showCandidateModalEdit}
    // loading={true}
    closable={editButtonCanEmploy}
    // size="large"
    
    open={editButtonCanEmploy}
    height={50}
    width={660}
    
>
<EditCandidate/>
</Drawer>

    </>
	);


    
};

export default ViewJob;