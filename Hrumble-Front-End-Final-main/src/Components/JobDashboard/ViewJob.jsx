import  {useState,  useEffect, useContext} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Dropdown,Tab, Nav } from 'react-bootstrap';
import {Button, Spin, Space , Tooltip, message} from 'antd';
import { MailOutlined, CopyOutlined } from '@ant-design/icons';
import AiForm from "./AIntegration/AiForm"
import { FileText ,Download} from 'lucide-react';
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
import jsPDF from 'jspdf';
import CandidateView from './Candidateview'
import { FaMale, FaPaperclip } from 'react-icons/fa'; // Internal Submission
import { FaUserCheck } from 'react-icons/fa'; // Client Submission
import { FaVideo } from 'react-icons/fa'; // Interview Count
import { FaUserPlus } from 'react-icons/fa'; // Joined Count
import { FaClipboardList,FaAddressCard ,FaMapMarkerAlt} from 'react-icons/fa'; 
import CookieUtil from '../../Utils/Cookies';
import JobContext from '../../Providers/JobProvider';
import moment from 'moment';

 
 
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
     const admin_id = CookieUtil.get("admin_id");
 
  console.log("permission", permission);
  let filter = permission?.find((item) => item?.name == "Jobs");
 
     const {setViewCandidateDrawer,AddInterView,handleInterviewClose,viewInterviewDrawer,viewall,handleClickjobTable,Loading,jobSingle,viewjobCount,allCandidates,handleStatusEdit,addButtonCan,setAddButtonCan,showEmployeModal,setEditButtonJob,showEmployeModalEdit,editButtonJob,editButtonCanEmploy,viewCandidateDrawer,handleCloseviewDrawer,showCandidateModalEdit,setEditButtonCanEmploy,handleopenCandidateDrawer, handleClick,}=useContext(ViewJobContext)
    
console.log("CandidateView:::", CandidateView);

     const numberBoxStyle = {
      backgroundColor: '#e6f2ff', // Light blue background
      padding: '4px 8px',
      borderRadius: '4px',
      fontWeight: '500',
      color: '#007bff' // Primary color text
    };
 
    console.log("AllCandidates:::", allCandidates)
  let tableData =[]
    const headers = [
        { label: "Candidate Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Phone No", key: "phone" },
        { label: "Status", key: "status" },
    ];
   
    const csvlink = {
        headers : headers,
        data : tableData,
        filename: "csvfile.csv"
    }
    const colors = ['primary', 'info', 'danger', 'success', 'warning', 'dark'];
 
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
        console.log("Profit:::", item);
       
       let result;
       if (item?.job_id?.client_id[0]?.currency === "USD") {
         if (item?.job_id?.secondarySelected === "External Staffing") {
        //    console.log("ddddUSD", item?.client_billing);
           result = Number(item?.expected_ctc * (item?.job_id?.client_id[0]?.fulltime_commission  / 100));
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
         if (item?.job_id?.secondarySelected === "External Staffing") {
        //    console.log("ddddUSD", item?.client_billing);
           result = Number(item?.expected_ctc * (item?.job_id?.client_id[0]?.fulltime_commission/ 100));
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
 
        let breadcrumb =[ 
          {
            title: <Link to="/jobs">Jobs</Link> ,
          },
          {
            title:  <Link to={`/jobs/${params.id}`}> {jobSingle?.job_title}</Link> ,
            active:true
          },
 
        ]
 
 
        const extractOverallScore = (analysisText) => {
            if (!analysisText) return null;
         
            try {
              // Multiple regex patterns to catch different score formats
              const scorePatterns = [
                /Overall\s*Score\s*[:]\s*(\d+)/i,
                /Total\s*Score\s*[:]\s*(\d+)/i,
                /Match\s*Score\s*[:]\s*(\d+)/i
              ];
         
              for (let pattern of scorePatterns) {
                const match = analysisText.match(pattern);
                if (match && match[1]) {
                  return match[1];
                }
              }
             
              return null;
            } catch (error) {
              console.error('Error extracting score:', error);
              return null;
            }
          };
 
        const handleAnalyzeResume = (e, itemId, resume) => {
            e.stopPropagation(); // Prevent row selection
            setAnalyzingId(itemId);
            setIsAnalyzing(true);
            setIsResume(resume);
          };
       
          const handleAnalysisComplete = (result) => {
            const overallScore = extractOverallScore(result.rawText);
            setAnalysisResults(prev => ({
              ...prev,
              [result.id]: {
                ...result,
                overallScore: extractOverallScore(result.rawText)
              }
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
 
          const downloadAnalysisPDF = (analysisText) => {
            if (!analysisText) {
              message.error('No analysis result available');
              return;
            }
         
            try {
              // Create a new jsPDF instance
              const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
              });
         
              // Page dimensions
              const pageWidth = doc.internal.pageSize.getWidth();
              const pageHeight = doc.internal.pageSize.getHeight();
              const margins = 20;
              const maxLineWidth = pageWidth - (margins * 2);
         
              // Professional color scheme
              const colors = {
                primary: [41, 128, 185],    // Professional blue
                text: [44, 62, 80],          // Dark blue-gray
                watermark: [200, 200, 200]   // Light gray for watermark
              };
         
              // Watermark function for all pages
              const addWatermark = () => {
                doc.setTextColor(200,200,200);
                doc.setFontSize(20);
                doc.setFont('helvetica');
                doc.text('HRUMBLES.AI', pageWidth / 2, pageHeight / 2, {
                  angle: -45,
                  align: 'center',
                  maxWidth: pageWidth
                });
              };
         
              // Header function for all pages
              const addHeader = (pageNum, totalPages) => {
                // Company name
                doc.setFontSize(10);
                doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
                doc.setFont('helvetica', 'bold');
                doc.text('Hrumbles.ai - Resume Analysis', margins, 15);
         
                // Page number
                doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margins, 15, {
                  align: 'right'
                });
         
                // Separator line
                doc.setLineWidth(0.3);
                doc.line(margins, 20, pageWidth - margins, 20);
              };
         
              // Title for the document
              doc.setFontSize(16);
              doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
              doc.setFont('helvetica', 'bold');
              doc.text('Resume Analysis Report', margins, 30);
         
              // Prepare content
              doc.setFontSize(11);
              doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
              doc.setFont('helvetica', 'normal');
              const splitText = doc.splitTextToSize(analysisText, maxLineWidth);
              let verticalPosition = 45;
              for (let i = 0; i < splitText.length; i++) {
                // Check if we need a new page
                if (verticalPosition > pageHeight - margins) {
                  doc.addPage();
                  addWatermark();
                  addHeader(doc.internal.getNumberOfPages(), Math.ceil(splitText.length / 40));
                  verticalPosition = 30;
                }
         
                // Add text
                doc.text(splitText[i], margins, verticalPosition);
                verticalPosition += 7; // Compact line spacing
              }
              doc.setPage(1);
              addWatermark();
              addHeader(1, Math.ceil(splitText.length / 40));
  
              doc.save(`Resume_Analysis_${new Date().toISOString().split('T')[0]}.pdf`);
         
            } catch (error) {
              console.error('PDF download failed', error);
              message.error('Failed to download PDF');
            }
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
            
            <div className="container-fluid" style={{marginTop:"10px"}}>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className='card' style={{height: "350px"}}>
            
          <div className='card-header bg-primary text-white'> 
              Job Overview
            </div>
            <div className='card-body px-3 py-4' 
            style={{
              maxHeight:'300px',
              overflowY: "auto",
            }}>
              <div className="card-body px-3 py-2">
              <h4 className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <FaPaperclip className="me-2" style={{ color: '#007bff' }} />
                  Job Title:
                </div>
                <span className="font-w500 text-primary">
                  {jobSingle?.job_title || ""}
                </span>
              </h4>
              </div>
              <div className="card-body px-3 py-2">
              <h4 className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <FaUserCheck className="me-2" style={{ color: '#28a745' }} />
                  Job ID:
                </div>
                <span>
                  {jobSingle?.job_id || ""}
                </span>
              </h4>
              </div>
              <div className="card-body px-3 py-2">
              <h4 className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <FaVideo className="me-2" style={{ color: '#dc3545' }} />
                  Hiring Mode:
                </div>
                <span>
                  {jobSingle?.job_type || ""}
                </span>
              </h4>
              </div>
              <div className="card-body px-3 py-2">
              <h4 className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <FaUserPlus className="me-2" style={{ color: '#ffc107' }} />
                  Job Type:
                </div>
                <span>
                  {jobSingle?.secondarySelected|| ""}
                </span>
              </h4>
              </div>
              {/* <h4 className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <FaClipboardList className="me-2" style={{ color: '#17a2b8' }} />
                    Created By:
                </div>
                <span>
                  {""|| ""}
                </span>
              </h4> */}
               <div className="card-body px-3 py-2">
              <h4 className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <FaUserPlus className="me-2" style={{ color: '#17a2b8' }} />
                    Client Name:
                </div>
                <span>
                  {jobSingle?.client_id?.[0]?.name|| ""}
                </span>
              </h4>
              </div>
              <div className="card-body px-3 py-2">
              <h4 className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt className="me-2" style={{ color: '#17a2b8' }} />
                    Job Location:
                </div>
                <span style={numberBoxStyle}>
                 {jobSingle?.job_location|| ""}
                </span>
              </h4>
              </div>
              <div className="card-body px-3 py-2">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <FaMale className="me-2" style={{ color: '#17a2b8' }} />
                    Candidates Required:
                </div>
                <span style={numberBoxStyle}>
                  {jobSingle?.required_no_of_candidates|| ""}
                </span>
              </div></div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
      <div className="card" style={{ height: "350px" }}>
        <div className="card-header bg-secondary text-white">
          Submission Overview
        </div>
        <div className="card-body px-3 py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <FaPaperclip className="me-2" style={{ color: '#007bff' }} />
              Internal Submission:
            </div>
            <span style={numberBoxStyle}>
              {viewjobCount[0]?.submissionCount || 0}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <FaUserCheck className="me-2" style={{ color: '#28a745' }} />
              Client Submission:
            </div>
            <span style={numberBoxStyle}>
              {viewjobCount[0]?.clientSubmissionCount || 0}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <FaVideo className="me-2" style={{ color: '#dc3545' }} />
              Interviewed:
            </div>
            <span style={numberBoxStyle}>
              {viewjobCount[0]?.interviewCount || 0}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <FaUserPlus className="me-2" style={{ color: '#ffc107' }} />
              Joined:
            </div>
            <span style={numberBoxStyle}>
              {viewjobCount[0]?.joinedCount || 0}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-0">
            <div className="d-flex align-items-center">
              <FaClipboardList className="me-2" style={{ color: '#17a2b8' }} />
              Offer:
            </div>
            <span style={numberBoxStyle}>
              {viewjobCount[0]?.offerCount || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
        <div className="col-xl-4  col-lg-6">
        <div className="card" style={{ height: "350px" }}>
            {/* <div className="card shadow"> */}
              <div className="card-header bg-black text-white">
                Recent Activity
                              
              </div>
              <div className="card-body">
                <div
                  style={{ height: "270px" }}
                  id="DZ_W_TimeLine1"
                  className="widget-timeline dz-scroll style-1 height370  ps--active-y"
                >
                  <ul className="timeline">
                  {allCandidates
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) 
  .map((item, index) => {
    const color = colors[index % colors.length];
    return (
      <li key={item.id || index}>
        <div className={`timeline-badge ${color}`}></div>
        <Link className="timeline-panel text-muted">
          {item.status === "Submitted" ? (
            <span>{moment(item.createdAt).fromNow()}</span>
          ) : (
            <span>{moment(item.updatedAt).fromNow()}</span>
          )}
          <h6 className="mb-0">
            {item.first_name} {item.last_name}
          </h6>
        
          <p className="mt-1">Current Status {item.status}</p>
          <h8 className="">
            <strong className={`text-${color}`}>
              {moment(item?.updatedAt).format("MMM DD, YYYY, h:mm A")}
            </strong>
          </h8>
          <p className="mt-1">Submitted by {item?.candidate_owner?.name}</p>
          <h8 className="">
            <strong className={`text-${color}`}>
              {moment(item?.createdAt).format("MMM DD, YYYY, h:mm A")}
            </strong>
          </h8>
        </Link>
      </li>
    );
  })}

                  </ul>
                </div>
           
            {/* </div> */}
          </div>
                      </div></div>
      </div>
    </div>
                <div className="card">
        <div className="card-header border-0 pb-0 flex-wrap">
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
                                      
                                            status:item.status
                                        })
                                        return (
                                            <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
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
<td>
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
    disabled={!!analysisResults[item?._id]} // Disable if already analyzed
  >
    {isAnalyzing && analyzingId === item?._id
      ? 'Validating...'
      : (analysisResults[item?._id]
        ? `Completed`
        : 'Validate Resume')}
  </Button>
            {isAnalyzing && analyzingId === item?._id && (
  <AiForm
    key={item?._id}
    id={item?._id}
    resume={item?.resume}
    job_description={stripHtml(item?.job_id?.job_description)}
    onAnalysisComplete={handleAnalysisComplete}
  />
)}
  {analysisResults[item?._id] && (
    <div className="ml-2 flex items-center">
      <Tooltip title="View Analysis">
        <FileText
          className="cursor-pointer text-blue-600"
          onClick={() => openAnalysisModal(analysisResults[item?._id])}
        />
      </Tooltip>
      <Tooltip title="Download Analysis">
        <Download
          className="ml-2 cursor-pointer text-green-600"
          onClick={() => downloadAnalysisPDF(analysisResults[item?._id].rawText)}
        />
      </Tooltip>
    </div>
  )}
          </td>                               <td>            
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
                                            <div
  className="d_f g_10 a_i_c"
  onClick={() => navigate(`/jobs/${item?._id}`)}
  onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
  onMouseLeave={(e) => (e.target.style.cursor = "default")}
>
  <div
    className="icon-box icon-box-xs"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "30px", // Adjust the height as needed
      width: "30px", // Adjust the width as needed
      borderRadius: "20%",
      backgroundColor:"#321F69",
      // Optional: makes the background circular
    }}
  >
    <i className="fa-solid fa-eye " style={{color:"white" }}></i>
  </div>
                                            <div
                                                className="icon-box icon-box-xs"
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  height: "30px", // Adjust the height as needed
                                                  width: "30px", // Adjust the width as needed
                                                  borderRadius: "20%",
                                                  backgroundColor:"#321F69",
                                                  // Optional: makes the background circular
                                                }}>
                                             <i class="fa-solid fa-pen-to-square "
                                              style ={{
                                                color:"white",
                                                cursor:"pointer"
                                              }}
                                              onClick={(e) => showCandidateModalEdit(item?._id)}></i>
                                             </div>
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
                             
                                        <th>Candidate Owner</th>
                                        <th>Status</th>
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
                                  
                                        <th>Candidate Owner</th>
                                   
                                        <th>Status</th>
                                 
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
                             
                                        <th>Candidate Owner</th>
                                      
                                        <th>Status</th>
                                       
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
          <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
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