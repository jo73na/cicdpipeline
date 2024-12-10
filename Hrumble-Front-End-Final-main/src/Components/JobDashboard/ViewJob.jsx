import  {useState,  useEffect, useContext} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Dropdown,Tab, Nav } from 'react-bootstrap';
import {Button, Spin, Space , Tooltip, message} from 'antd';
import { MailOutlined, CopyOutlined } from '@ant-design/icons';
import AiForm from "./AI_INTEGRATION/AiForm";
import { FileText } from 'lucide-react';
import CountUp from 'react-countup';
import { Drawer, Modal } from 'antd';
import AddInterViewPopup from './AddInterview';
import AddCandidate from './AddCandidate';
import EditCandidate from './EditCandidate';
import { SVGICON } from './../../Utils/SVGICON';
import Loader from '../../Utils/Loader';
import ViewJobContext from '../../Providers/ViewJob';
import UserManagementContext from '../../Providers/UserMangement';
import { Breadcrumb } from '../UtlilsComponent/Breadcrumb';
import { CSVLink } from 'react-csv';
 
 
const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
 
 
const ViewJob = () => {
     let params =useParams()
     const navigate=useNavigate()
    const [isresume, setIsResume] = useState();
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] = useState();
     const [copy,setCopy]=useState(false)
     const { permission } = useContext(UserManagementContext);
     const [isTooltipVisible, setIsTooltipVisible] = useState(false);
     const [isAnalyzing, setIsAnalyzing] = useState(false);
     const [analyzingId, setAnalyzingId] = useState(null);
   
 
     const [analysisResults, setAnalysisResults] = useState({});
     const [modalVisible, setModalVisible] = useState(false);
     const [currentAnalysisResult, setCurrentAnalysisResult] = useState(null);
 
  console.log("permission", permission);
  let filter = permission?.find((item) => item?.name == "Jobs");
 
     const {CandidateView,setViewCandidateDrawer,AddInterView,handleInterviewClose,viewInterviewDrawer,viewall,handleClickjobTable,Loading,jobSingle,viewjobCount,allCandidates,handleStatusEdit,addButtonCan,setAddButtonCan,showEmployeModal,setEditButtonJob,showEmployeModalEdit,editButtonJob,editButtonCanEmploy,viewCandidateDrawer,handleCloseviewDrawer,showCandidateModalEdit,setEditButtonCanEmploy,handleopenCandidateDrawer, handleClick}=useContext(ViewJobContext)
     const cardCounter = [
        {number:  viewjobCount[0]?.submissionCount , countText:'purple', title:'Internal Submission'},
        {number: viewjobCount[0]?.clientSubmissionCount,countText:'warning',  title:'Client Submission'},
        {number: viewjobCount[0]?.interviewCount,countText:'danger',  title:'Interviewed'},
        {number:  viewjobCount[0]?.offerCount,countText:'success',  title:'Offered'},
        {number:  viewjobCount[0]?.joinedCount,countText:'danger',  title:'Joined'},
        {number: '0', countText:'primary', title:'Filled'},
        // {number: '16',countText:'danger',  title:'Pending'},
    ];
 
    // console.log(CandidateView.resume);
 
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
 
           
 
      const profit =(item)=>{
       
       let result;
       if (item?.job_id?.client_id[0]?.currency === "USD") {
         if (item?.job_id?.job_type === "Full Time") {
        //    console.log("ddddUSD", item?.client_billing);
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
        //    console.log("ddddUSD", item?.client_billing);
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
        const handleAnalyzeResume = (e, itemId, resume) => {
            e.stopPropagation(); // Prevent row selection
            setAnalyzingId(itemId);
            setIsAnalyzing(true);
            setIsResume(resume);
          };
       
          const handleAnalysisComplete = (result) => {
            setAnalysisResults(prev => ({
              ...prev,
              [result.id]: result
            }));
            setIsAnalyzing(false);
            setAnalyzingId(null);
          };
       
          const openAnalysisModal = (result) => {
            setCurrentAnalysisResult(result);
            setModalVisible(true);
          };
       
          const closeAnalysisModal = () => {
            setModalVisible(false);
            setCurrentAnalysisResult(null);
          };
   
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
                                        {/* <th>Contact No</th>
                                        <th>Email address</th> */}
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
                                            // email:item.email_id,
                                            // phone:item?.phone_no,
                                            status:item.status
                                        })
 
                                        return (
                                            <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    {/* <img src={item.image} className="avatar avatar-xl" alt="" /> */}
                                                    <div className="ms-2 cat-name d-flex align-items-center" onClick={(e)=>handleOpenDrawer(e,item?._id)}>
                                                        <p className="mb-0 me-2">{`${item.first_name} ${item.last_name||""}`}</p>
                                                     
                                                         
                                                    </div>
                                                </div>
                                            </td>
                                             
     
   
                                            <td>{ item?.candidate_owner?.name}</td>
                                            {
  filter?.options?.includes("View Profit") &&
  <td><span>{profit(item)}</span></td>
      }
{/* {generateProgressBar(getStatusConfig(item?.status))} */}
<td>
            {/* Button for triggering resume analysis */}
            <Button
              style={{
                borderRadius: '8px',
                backgroundColor: 'black',
                color: 'white',
                position: 'relative'
              }}
              type="primary"
              onClick={(e) => handleAnalyzeResume(e, item?._id, item?.resume)}
              loading={isAnalyzing && analyzingId === item?._id}
            >
              {isAnalyzing && analyzingId === item?._id
                ? 'Analyzing...'
                : (analysisResults[item?._id]
                  ? 'View Report'
                  : 'Analyze Resume')}
            </Button>
 
            {/* Hidden AiForm for analysis */}
            {(isAnalyzing || !analysisResults[item?._id]) && (
              <AiForm
                key={item?._id}
                id={item?._id}
                resume={item?.resume}
                job_description={stripHtml(item?.job_id?.job_description)}
                onAnalysisComplete={handleAnalysisComplete}
              />
            )}
 
            {/* Conditional rendering for analysis result tooltip */}
            {analysisResults[item?._id] && (
              <Tooltip title="View Analysis">
                <FileText
                  className="ml-2 cursor-pointer text-blue-600 absolute"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                  onClick={() => openAnalysisModal(analysisResults[item?._id])}
                />
              </Tooltip>
            )}
          </td>                                          
                                             
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
                                        {/* <th>Contact No</th>
                                        <th>Email address</th> */}
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
                                            {/* <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td> */}
                                            <td>{ item?.Owner}</td>
                                             <td>
                                                        <span className="badge badge-primary light border-0 me-1">{item.status}</span>
 
                                             </td>
                                          
                                           
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
                                        {/* <th>Contact No</th>
                                        <th>Email address</th> */}
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
                                            {/* <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td> */}
                                            <td>{ item?.Owner}</td>
                                             <td>
                                                        <span className="badge badge-primary light border-0 me-1">{item.status}</span>
 
                                             </td>
                                    
                                         
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
                                        {/* <th>Contact No</th>
                                        <th>Email address</th> */}
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
                                            {/* <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td> */}
                                            <td>{ item?.Owner}</td>
                                           
                                             <td>
                                                        <span className="badge badge-primary light border-0 me-1">{item.status}</span>
 
                                             </td>
                                          
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
                                        {/* <th>Contact No</th>
                                        <th>Email address</th> */}
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
                                            {/* <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td> */}
                                            <td>{ item?.Owner}</td>
                                             <td>
                                                        <span className="badge badge-primary light border-0 me-1">{item.status}</span>
                                             </td>
                                       
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
                                        {/* <th>Contact No</th>
                                        <th>Email address</th> */}
                                        <th>Candidate Owner</th>
                                        {/* <th>Profit</th>
                                        <th>Progress</th> */}
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
                                            {/* <td>{item?.phone_no}</td>
                                            <td>{item.email_id}</td> */}
                                            <td>{ item?.Owner}</td>
                                             <td>
                                                        <span className="badge badge-primary light border-0 me-1">{item.status}</span>
                                             </td>
                                          
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                </Tab.Content>              
            </Tab.Container>
             </div>
        </div>
     </div>    
        </div>      
        }  
 
<Modal
        title="Resume Analysis"
        open={modalVisible}
        onCancel={closeAnalysisModal}
        footer={null}
        width={800}
      >
        {currentAnalysisResult && (
          <div>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {currentAnalysisResult.rawText}
            </pre>
          </div>
        )}
      </Modal>
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