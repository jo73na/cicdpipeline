// import {useContext,useEffect} from 'react';




// import { Input, Tabs,Drawer } from 'antd';
// import EmployeMentDetails from './EmploymentDetails';
// import {MailFilled,MobileFilled,LeftOutlined} from "@ant-design/icons";

// import { useParams } from 'react-router-dom';
// import CandidateContext from '../../../Providers/Candidate';
// import Skills from './skill';
// import CandiateTimeLine from '../Timeline';
// import WorkExperience from './WorkExperience';
// import Education from './Educations';
// import Projects from './projects';
// import BasicDetailEdit from './EditCandidateinfo';
// import WorkExperienceEdit from './WorkExperienceEdit';
// import EducationEdit from './EducationEdit';
// import ProjectEdit from './EditProject';
// import Resume from './Resume';
// import EditResume from '../EditResume';
// import AssignEditCandidatesPopup from '../AssignEditCandidate';
// import AssignTable from '../AssignTable';

// // import CandidateTable from './candidateTable';
// // import CandidateContext from '../../Providers/Candidate';
// // import CandidateBasicInfo from './CandidateBasicInfo';
// // import AssignTable from './AssignTable';
// // import AssignEditCandidatesPopup from './AssignEditCandidate';
// // import AddCandidatesPopup from './AddCandidate';
// // import EditResume from './EditResume';
// import { useNavigate } from 'react-router-dom';


// const { Search } = Input;




// const CandidateViewPage=()=>{
// //  const {setopenresumeDrawer,resumeDrawer,searchCandidateOwner,AllcandidatesSearch,skillSearch,handleDateChange,candidateOwner,setLoading,Allcandidate,Allcandidates,candidateLoading,openDrawer,handleOpenDrawer,handleOpenDrawerassign,openAssign,assignEditCandidate,handleClickEditAssign,handleAllcandidateSearch,handleopenDrawerforAdd,openAddCandidateDrawer,handleSkillSearch} = useContext(CandidateContext);

//  const {openAssign,handleClickEditAssign,assignEditCandidate,handleOpenDrawerassign,setopenresumeDrawer,resumeDrawer,handleClickProject,openProjectDrawer,openEducationDrawer,handleClickEducation,openworkexperiencepopup,setworkexperiencePopup,handleViewCandidate,candidateSingle,openEmployeementDetilsDrawer,setOpenEmployementDetilsPopup}=useContext(CandidateContext)
// const params =useParams()

// //Tabs Items

// const navigate=useNavigate()

 


 


// //  const handleDateChange = (date, dateString) => {
// //   // dateString will contain the formatted date in "DD-MM-YYYY" format
// //   console.log('Selected Date:', dateString);
// // };

// //  Pie Chart Start here

// //  Pie Chart ends here

// const items=[   {
//     key: '1',
//     label: 'Employment Details',
//    children:<EmployeMentDetails />,
//   },
//   {
//     key: '2',
//     label: 'Professional Skills',
//  children:<Skills/>,
//   },
 
//   {
//     key: '4',
//     label: 'Work Experience',
//  children:<WorkExperience/>
//   },
//   {
//     key: '5',
//     label: 'Education',
//   children:<Education/>,
//   },
//   {
//     key: '6',
//     label: 'Projects',
//   children:<Projects/>,
//   },
//   {
//     key: '7',
//     label: 'Resume',
//   children:<Resume/>,
//   },
//   {
//     key: '3',
//     label: 'Time Line',
//     children: <CandiateTimeLine candidateSingle={candidateSingle}/>
// //   children:<CandidateTable handlePageChange={handlePageChange} pagination={pagination} setPagination={setPagination} filteredData={filteredData} setFilterData={setFilterData}/>,
//   },
// ]

// useEffect(() => {
//     // Function to load and display PDF file
//      handleViewCandidate(params.id)   
//   }, []); 

//   console.log("assign",assignEditCandidate);
//  return( 
//      <>

//      {/* Drawer Open For CandidateView */}
//      <Drawer
//     title="Assign Candidate To New Job"
//     placement="right"
//     onClose={(e)=>handleOpenDrawerassign()}
//     closable={openAssign}
//     size="large"
    
//     open={openAssign}
//     height={50}
//     width={650}
    
//   >
//      <AssignTable/>
//   </Drawer>
//      <Drawer
//     title="Edit Candidate"
//     placement="right"
//     onClose={(e)=>handleClickEditAssign()}
//     closable={assignEditCandidate}
//     size="large"
    
//     open={assignEditCandidate}
//     height={50}
//     width={650}
    
//   >
//      <AssignEditCandidatesPopup/>
//   </Drawer>
//      <Drawer
//     title="Edit Candidate"
//     placement="right"
//      onClose={()=>setOpenEmployementDetilsPopup(false)}
//     closable={openEmployeementDetilsDrawer}
//     size="large"
    
//     open={openEmployeementDetilsDrawer}
//     height={50}
//     width={650}
    
//   >
//      <BasicDetailEdit/>
//   </Drawer>

//   <Drawer
//     title="Edit Work Experience"
//     placement="right"
//      onClose={()=>setworkexperiencePopup(false)}
//     closable={openworkexperiencepopup}
//     size="large"
    
//     open={openworkexperiencepopup}
//     height={50}
//     width={750}
    
//   >
//      <WorkExperienceEdit/>
//   </Drawer>

//   <Drawer
//     title="Edit Education"
//     placement="right"
//      onClose={handleClickEducation}
//     closable={openEducationDrawer}
//     size="large"
    
//     open={openEducationDrawer}
//     height={50}
//     width={750}
    
//   >
//      <EducationEdit/>
//   </Drawer>
//   <Drawer
//     title="Edit Project"
//     placement="right"
//      onClose={handleClickProject}
//     closable={openProjectDrawer}
//     size="large"
    
//     open={openProjectDrawer}
//     height={50}
//     width={750}
    
//   >
//      <ProjectEdit/>
//   </Drawer>

//   <Drawer
//     // title="Candidate View"
//     placement="right"
//     onClose={()=>setopenresumeDrawer(false)}
//     closable={false}
//     size="small"
    
//     open={resumeDrawer}
//     height={50}
//      width={700}
    
//   >
//     <EditResume/> 
//   </Drawer>
     

//       {/* <p className='heading_text'>Candidates</p>

//       <div
//       className='d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm f_w_w_md'>
   
//       </div>    */}

   
     

    
//     <div className='tab  m_b_10 p_10 responsive_table'>

//       <div className='p_10' style={{
//         backgroundColor: "rgb(221, 229, 233)"
//       }}>
//         <div className='d_f j_c_s_b a_i_c'>
//          <div className='d_f f_d_c f_w_w w_80_p '>
//          <p className='heading_text m_5' ><LeftOutlined className='back' onClick={()=>navigate(-1)}/>{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.first_name} {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.last_name}</p>
//          <div className='d_f g_10 m_5'>
//                 <p><span><MailFilled className='c_primary' /> </span>{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.email_id}</p>
//                 <p><span><MobileFilled className='c_primary'/></span>{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.phone_no}</p>
//             </div>
//          </div>
//          <div className=''>
//          <button className='save_btn_1' type='primary'
//          onClick={(e)=>handleOpenDrawerassign()}
//         > + Assign To New Job</button>
//          </div>
       

//         </div>
     
          

       
//             <div>
//       <div id="pdf-container"></div>
//       <div id="docx-container"></div>
//     </div>
        
        
//       </div>
//     <Tabs items={items} defaultActiveKey="1" className='p_10'/> 

//     </div>
     


      
//         </>
//     )
// }


// export default CandidateViewPage;

import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Accordion, Dropdown, Nav, Tab } from 'react-bootstrap';


// import PDF from "../../../images/New/Pdffile.svg"
 import Image from "/images/user.jpg"
 import Avathor from "/images/1.jpg"
 import BlueTick from "/images/blue-tick.png"
 import AvathorMale from "/images/CandidateMale.jpg"





import { Drawer, Empty, Typography, message,Upload } from 'antd';

import AssignTable from '../AssignTable';
import AssignEditCandidatesPopup from '../AssignEditCandidate';
import Loader from './../../../Utils/Loader';
// import { BASE } from '../../../Utils/api';
import CandidateContext from '../../../Providers/Candidate';
import mammoth from 'mammoth';
import * as DocxPreview from 'docx-preview';
import ProjectEdit from './EditProject';
import WorkExperienceEdit from './WorkExperienceEdit';
import { InboxOutlined } from '@ant-design/icons';
 const {Dragger}=Upload

 const BASE = import.meta.env.VITE_BASE; 
 
console.log("fffff",DocxPreview); 


const file = `${BASE}uploads/naukri_avinashlavale[3y_0m].pdf`
const type = 'pdf'

const CandidateViewPage = () => {

	const [htmlContent, setHtmlContent] = useState('');
    const [error, setError] = useState('');
    const [resumeexist, setResume] = useState('');
	const navigate =useNavigate()
     const [view,setView]=useState(false)
     const params =useParams()
    const {setOpenAssign,openAssign,handleClickEditAssign,assignEditCandidate,handleViewCandidate,Loading,candidateSingle,handleOpenDrawerassign
	,handleClickProject,openProjectDrawer,openEducationDrawer,handleClickEducation,handleClickWorkExperience,openworkexperiencepopup,setworkexperiencePopup,openEmployeementDetilsDrawer}=useContext(CandidateContext)
	const previewElementRef = useRef(null);
	const previewContainer = useRef(null);

	const displayResumePreview = (content) => {
        const previewElement = previewElementRef.current;
		let fileType=content.split('.').pop()
        if (fileType.includes('pdf')) {
            // PDF file
          return <p> <embed src={content} type="application/pdf" width="100%" height="100%"></embed></p> ;
        } else if (fileType.includes('doc') || fileType.includes('officedocument')) {
            // DOCX file
			<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        } else {
            // Unsupported file type
           <p>Preview not available for this file type.</p>;
        }
    };
	const docs = [
		{ uri:`${BASE}uploads/naukri_avinashlavale[3y_0m].pdf` } // Remote file
	, // Local File
	  ];
    const [parsedData, setParsedData] = useState(null);

    const parseResume = (resumeText) => {
        // Placeholder parsing logic using regular expressions
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        const phoneRegex = /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
        const skillsRegex = /\b(?:javascript|react|node\.js|html|css|...)\b/gi; // Adjust as needed

        const email = resumeText.match(emailRegex);
        const phone = resumeText.match(phoneRegex);
        const skills = resumeText.match(skillsRegex);

        return { email: email ? email[0] : null, phone: phone ? phone[0] : null, skills: skills ? skills : [] };
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            const resumeText = event.target.result;
            const parsed = parseResume(resumeText);
            setParsedData(parsed);
        };

        reader.readAsText(file);
    };


    function  PostComment(item){

        return(
            <ul className="post-comment d-flex mt-1 mb-0">
                <li>
                    <label className="me-3"><Link to={"#"}><i class="fa-solid fa-briefcase me-2"></i> 
					{`${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.to_exp_from || 0} Years ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.to_exp_to ||0} Months ` ||"-"}
                      </Link></label>
                </li>
                <li>
                    <label className="me-3"><Link to={"#"}><i class="fa-solid fa-wallet me-2"></i>
					{`${candidateSingle?.length>0 ? candidateSingle[candidateSingle.length-1]?.current_ctc:0} ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.job_id?candidateSingle[candidateSingle.length-1]?.job_id.salaryType:"LPA"}`||"-"}</Link></label>
                </li>
                <li>
                    <label className="me-3"><Link to={"#"}><i class="fa-solid fa-location-dot me-2"></i>
                    {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.current_location ||"-"}
    </Link></label>	
                </li>
			
            </ul>
        )
    }


	const resumename = (data) => {
		const match = data.match(/(\d+)([a-zA-Z0-9_[\] -]+\.[a-zA-Z0-9]+)/);
	  
		// Check if there is a match and extract the desired parts
		if (match) {
		  const numericPart = match[1]; // "17024865174681702377542774"
		  const alphanumericPart = match[2]; // "naukri_sowmyak[4y_11m].docx"
		  
		  console.log('Numeric Part:', numericPart);
		  console.log('Alphanumeric Part:', alphanumericPart);
			  // Return the alphanumeric part if needed
		  return alphanumericPart;
		} else {
		  console.log("No match found.");
		  const fileNameWithExtension = data.split('\\').pop();
	
		  // Remove the file extension
		  const fileNameWithoutExtension = fileNameWithExtension.split('.').slice(0, -1).join('.');
		
		  return fileNameWithoutExtension;
		
		}
	  };

    useEffect(() => {
        // Function to load and display PDF file
        handleViewCandidate(params.id)   
      }, []); 


	  const props = {
		name: 'file',
		multiple: true,
		action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
		onChange(info) {
		  const { status } = info.file;
		  if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		  }
		  if (status === 'done') {
			var formdata = new FormData()
			setResume (info.file.originFileObj)
			formdata.append("image",info.file.originFileObj)
			 
			message.success(`${info.file.name} file uploaded successfully.`);
		  } else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		  }
		},
		onDrop(e) {
		  console.log('Dropped files', e.dataTransfer.files);
		},
	  };


	    

	  const resume = async () => {
	    const fileUrl = 'uploads/169933861626916992701846061699012873433mahesh_resume.docx';

                // Fetch the DOCX file
                const response = await fetch(`${BASE}${fileUrl}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                // Read the file as an ArrayBuffer
                const arrayBuffer = await response.arrayBuffer();

                // Convert DOCX to HTML using Mammoth
			  DocxPreview.renderAsync(arrayBuffer, previewContainer.current);
                const result = await mammoth.convertToHtml({ arrayBuffer });
                setHtmlContent(result.value);   
	  }
	  useEffect(() => {
		 resume()
	      
	  },[candidateSingle])

	  const ondata =(data)=>{
    
		const inputDate = new Date(data);
	
	const formattedDate = inputDate.toLocaleString('en-US', {
	  year: 'numeric',
	  month: 'short',
	  day: 'numeric',
	  hour: 'numeric',
	  minute: '2-digit',
	  hour12: true,
	});
	
	 return formattedDate
	
		
	   }


	const TimelineColors =["primary","info","danger","success","warning","dark"]
	const TimelineColorText =["text-primary","info","danger","success","warning","dark"]
	
	const renderFileViewer = (file) => {
        if (!file) {
            return <p>Loading file...</p>;
        }
		let fileType=file.split('.').pop()

        if (fileType.includes('pdf')) {
            // Handle PDF
            return <iframe src={file} title="PDF Viewer" style={{ width: '100%', height: '100%', border: 'none' }} />;
        } else if (fileType.includes('image')) {
            // Handle Image
            return <img src={file} alt="Image preview" style={{ width: '100%', height: 'auto' }} />;
        } else if (fileType.includes('text') || fileType.includes('csv')) {
            // Handle Text/CSV
            return <pre id="text-content" className="text-file" style={{ whiteSpace: 'pre-wrap', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', overflow: 'auto', height: '100%' }}>
                {/* Text files need to be read as text */}
                {file}
            </pre>;
        } else if (fileType.includes('doc') || fileType.includes('officedocument')) {
            // Handle DOC/DOCX using Office viewer
            return <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(file)}`} title="DOC Viewer" style={{ width: '100%', height: '100%', border: 'none' }} />;
        } else {
            // Fallback for unsupported files
            return (
                <div className="unsupported" style={{ padding: '16px', color: '#ff4d4f' }}>
                    <p>Unsupported file type: {fileType}</p>
                    <a href={file} download>Download File</a>
                </div>
            );
        }
    };
    return (
        <>           
           {
			 Loading ?
			  <Loader/>
			  :
			  <div className="container-fluid"> 
			    <div className="d-flex justify-content-between align-items-center mb-4">
	  <h4 className="heading mb-0"
	   style={{
		 cursor:"pointer"
	   }}
	   onClick={()=>navigate(-1)}><i class="fa-solid fa-chevron-left"
		
	   style={
		  {
			  cursor:"pointer"
		  }
	   }></i > {`Candidates/${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.first_name} ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.last_name}`}</h4>


	
  </div>           
			  <div class="card profile-overview">
					<div class="card-body d-flex">
						<div class="clearfix">
							<div class="d-inline-block position-relative me-sm-4 me-3 mb-3 mb-lg-0">
								<img src={AvathorMale} alt="" class="rounded-4 profile-avatar"/>
								<span class="fa fa-circle border border-3 border-white text-success position-absolute bottom-0 end-0 rounded-circle"></span>
							</div>
						</div>
						<div class="clearfix d-xl-flex flex-grow-1">
							<div class="clearfix pe-md-5">
								<h3 class="fw-semibold mb-1">{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.first_name} {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.last_name} <img src={BlueTick} alt="Blue Tick"/></h3>
								{PostComment(candidateSingle)}
								<ul class="d-flex flex-wrap align-items-center">
									{/* <li class="me-3 d-inline-flex align-items-center"><i class="las la-user me-1 fs-18"></i>Web Designer</li>
									<li class="me-3 d-inline-flex align-items-center"><i class="las la-map-marker me-1 fs-18"></i>420 City Path, AU 123-456</li>
									<li class="me-3 d-inline-flex align-items-center"><i class="las la-envelope me-1 fs-18"></i>info@gmail.com</li>
									<li class="me-3 d-inline-flex align-items-center"><i class="las la-envelope me-1 fs-18"></i>info@gmail.com</li> */}
									


								</ul>
								<ul className="canidate-location">
									  <li>
									  <span className="card__info__stats"> <i class="fa-solid fa-clock me-2"></i> Relevent Experience: </span>

									  {`${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.re_exp_from||0} Years ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.re_exp_to||0} Months `||"-"}
									  <span className="card__info__stats"
									   style={{
										 marginLeft: "10px"
									   }}> <i class="fa-solid fa-indian-rupee-sign me-2"></i> Expected  Salary : </span>

									  {`${candidateSingle?.length>0 ? candidateSingle[candidateSingle.length-1]?.expected_ctc||0:0} ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.job_id?candidateSingle[candidateSingle.length-1]?.job_id.salaryType:"LPA"}`||"-"}
									  </li>
									  <li>
									  <span className="card__info__stats"><i class="fa-solid fa-clock-rotate-left me-2"></i> Notice Period: </span>

									  {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.notice_period ||"-"}
									  <span className="card__info__stats"
									   style={{
										 marginLeft: "10px"
									   }}> <i class="fa-solid fa-file me-2"></i> Offer Details : </span>
                                      {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.offer_details ||"-"}
 									  </li>
									

                               <li>
                                       <span className="card__info__stats"> <i class="fa-solid fa-location-dot me-2"></i>  Preferred Locations: </span>
                  {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.preferred_location?.map((item)=>
                  <span className="color_gray" style={{display:"inline-block"}} >{item},&nbsp;</span>)}
                                       
                                   </li>
                        
                                   <li>
									{
										view ?

								         <>
										 		<span className="card__info__stats"><i class="fa-solid  fa-envelope me-2"></i> </span>

{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.email_id ||"-"}
<span className="card__info__stats"
 style={{
   marginLeft: "10px"
 }}><i class="fa-solid fa-phone me-2"></i>  </span>
{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.phone_no ||"-"}
										 </>
										:
										<button onClick ={()=>setView(true)} className="btn btn-info btn-sm " style={{
											marginRight:"20px"
										 }} > <i class="fa-solid fa-eye "></i> Access Emaill & Phone Number</button>
										
									}
								 
								   </li>
                               </ul> 
								{/* <div
								 className='d_f f_d_c'>
								<div class="d-md-flex d-none flex-wrap">
									<div class="border outline-dashed rounded p-2 d-flex align-items-center me-3 mt-3">
										<div class="avatar avatar-md style-1 bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12 1V23" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</div>
										<div class="clearfix ms-2">
											<h3 class="mb-0 fw-semibold lh-1">$1,250</h3>
											<span class="fs-14"> Current Salary</span>
										</div>
									</div>
									<div class="border outline-dashed rounded p-2 d-flex align-items-center me-3 mt-3">
										<div class="avatar avatar-md style-1 bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</div>
										<div class="clearfix ms-2">
											<h3 class="mb-0 fw-semibold lh-1">125</h3>
											<span class="fs-14"> Expected Salary</span>
										</div>
									</div>
									<div class="border outline-dashed rounded p-2 d-flex align-items-center me-3 mt-3">
										<div class="avatar avatar-md style-1 bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</div>
										<div class="clearfix ms-2">
											<h3 class="mb-0 fw-semibold lh-1">25</h3>
											<span class="fs-14">Total Experience</span>
										</div>
									</div>
									
								</div>
								<div class="d-md-flex d-none flex-wrap">
									<div class="border outline-dashed rounded p-2 d-flex align-items-center me-3 mt-3">
										<div class="avatar avatar-md style-1 bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12 1V23" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</div>
										<div class="clearfix ms-2">
											<h3 class="mb-0 fw-semibold lh-1">No</h3>
											<span class="fs-14">Offer Details</span>
										</div>
									</div>
									<div class="border outline-dashed rounded p-2 d-flex align-items-center me-3 mt-3">
										<div class="avatar avatar-md style-1 bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</div>
										<div class="clearfix ms-2">
											<h3 class="mb-0 fw-semibold lh-1">125</h3>
											<span class="fs-14">New Referrals</span>
										</div>
									</div>
									<div class="border outline-dashed rounded p-2 d-flex align-items-center me-3 mt-3">
										<div class="avatar avatar-md style-1 bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</div>
										<div class="clearfix ms-2">
											<h3 class="mb-0 fw-semibold lh-1">25</h3>
											<span class="fs-14">New Deals</span>
										</div>
									</div>
									
								</div>
									</div>		 */}
														</div>
							<div class="clearfix mt-3 mt-xl-0 ms-auto d-flex flex-column col-xl-3">
								<div class="clearfix mb-3 text-xl-end">
									
									<p onClick={(e)=>handleOpenDrawerassign()} class="btn btn-primary ms-2 btn-sm">Assign To New Job</p>
								</div>
								
							</div>
						</div>
					</div>
					<div class="card-footer py-0">
					<div className="profile-tab">
								  <div className="custom-tab-1">
									  <Tab.Container defaultActiveKey='Posts'>					
										  <Nav as='ul' className="nav nav-tabs">
											  <Nav.Item as='li' className="nav-item">
												  <Nav.Link to="#my-posts" eventKey='Posts'>Employment Details</Nav.Link>
											  </Nav.Item>
											  <Nav.Item as='li' className="nav-item">
												  <Nav.Link to="#about-me"  eventKey='About'>Resume</Nav.Link>
											  </Nav.Item>
											  <Nav.Item as='li' className="nav-item">
												  <Nav.Link to="#profile-settings" eventKey='Setting'>Timeline</Nav.Link>
											  </Nav.Item>
										  </Nav>
										  <Tab.Content>
											  <Tab.Pane id="my-posts"  eventKey='Posts'>
											  <div className="profile-about-me mt-2">
													 
														 {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.summary &&
														   <div className="pt-4 border-bottom-1 pb-3">
														   <h4 className="text-primary f_b_h">Profile Summary</h4>
														   <p>
														   {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.summary} 
														   </p>
													   </div>
}

													 
												  </div>
											  <div className="profile-skills mb-5 mt-3">
  
													  <h4 className="text-primary mb-4 f_b_h">Skills</h4>
  {candidateSingle[candidateSingle.length-1]?.skills?.length>0 &&candidateSingle[candidateSingle.length-1]?.skills.filter((e)=>e).map((e,i)=> e &&
   													  <Link to="/app-profile" className="btn btn-primary light btn-xs mb-2 me-2">{e}</Link>
														 )}           

													  
													  
												  </div>
												  <div className="row">
		   
		   <div className='col-xl-12 '>
		   <h4 className="text-primary f_b_h">Experience</h4>
		   <div 
      onClick={handleClickWorkExperience}
      className="color_primary"
       style={{
        fontWeight: 600,
        display:"flex",
		justifyContent:"flex-end",
        cursor: 'pointer'
      }}>
         Edit
      </div>
  
		   <div
				//  style={{ height: "370px" }}
				 id="DZ_W_TimeLine1"
				 className="widget-timeline dz-scroll style-1   ps--active-y"
			   >
				    {candidateSingle[0]?.workExperiences?.length>0 ? 
			   <>
			     
			     <ul className="timeline">
			 {
                   candidateSingle[0]?.workExperiences?.map((work,i)=>{
				 return (
					<li>
					<div className={`timeline-badge ${TimelineColors[i]}`}></div>
					<Link
					  className="timeline-panel "
					 
					>
					  <h6 className="mb-0">
					  {work.designation} 
						<strong className="text-info"> ({work.expType=="F" && "Full Time"})</strong>
					  </h6>
					  <span  style={{
						 fontWeight:700,
						 color:"black"
					  }}>{work.Organization||work.organization||""} ({work.startDate?.replace("'","")}-{work.endDate.replace("'","")}) </span> 
					  <span
					   style={{
						color:"black"
					   }}>{work?.profile||""}</span>

					  
					  
					  {/* <p className="mb-0">
						Quisque a consequat ante Sit amet magna at volutapt...
					  </p> */}
					</Link>
				  </li>
				 )
					

				 })
			 }
			{/* <li>
			  <div className="timeline-badge primary"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				 <h6 className="mb-0">
				  Youtube, a video-sharing website, goes live{" "}
				  <strong className="text-primary">$500</strong>.
				</h6>
				<span>10 minutes ago</span>
				<span>10 minutes ago</span>
			   
			  </Link>
			</li>
			<li>
			  <div className="timeline-badge info"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				<span>20 minutes ago</span>
				<h6 className="mb-0">
				  New order placed{" "}
				  <strong className="text-info">#XF-2356.</strong>
				</h6>
				<p className="mb-0">
				  Quisque a consequat ante Sit amet magna at volutapt...
				</p>
			  </Link>
			</li>
			<li>
			  <div className="timeline-badge danger"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				<span>30 minutes ago</span>
				<h6 className="mb-0">
				  john just buy your product{" "}
				  <strong className="text-warning">Sell $250</strong>
				</h6>
			  </Link>
			</li>
			<li>
			  <div className="timeline-badge success"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				<span>15 minutes ago</span>
				<h6 className="mb-0">
				  StumbleUpon is acquired by eBay.{" "}
				</h6>
			  </Link>
			</li>
			<li>
			  <div className="timeline-badge warning"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				<span>20 minutes ago</span>
				<h6 className="mb-0">
				  Mashable, a news website and blog, goes live.
				</h6>
			  </Link>
			</li>
			<li>
			  <div className="timeline-badge dark"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				<span>20 minutes ago</span>
				<h6 className="mb-0">
				  Mashable, a news website and blog, goes live.
				</h6>
			  </Link>
			</li> */}
		  </ul>
			   </>
		:
		<Empty
		image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
		imageStyle={{
		//   height: 60,
		}}
		description={
		  <Typography.Text>
			  No  Experience data Found
		  </Typography.Text>
		}
	  >
		<button type="primary" className="btn btn-primary btn-sm mb-4"
		 onClick={handleClickWorkExperience}>+ Add  Experience </button>
	  </Empty>
	}
				
			   </div>
		   </div>
		   {/* <div className='col-xl-12'>
			   <div className="card">
				   <div className="card-body profile-accordion pb-0">
					   <Accordion className="accordion" id="accordionExample2">
						   <Accordion.Item className="accordion-item">
							   <Accordion.Header as="h2" className="accordion-header" id="headingOne2">												  
								   Following												  
							   </Accordion.Header>
							   <Accordion.Body id="collapseOne2" className="accordion-collapse collapse show">													
								   {followers.map((item, index)=>(
									   <div className="products mb-3" key={index}>
										   <img src={item.image} className="avatar avatar-md" alt="" />
										   <div>
											   <h6><Link to={"#"}>{item.title}</Link></h6>
											   <span>{item.subtitle}</span>	
										   </div>	
									   </div>
								   ))}
							   </Accordion.Body>
						   </Accordion.Item>
					   </Accordion>
				   </div>
			   </div>
		   </div>
		   <div className='col-xl-12'>
			   <div className="card">
				   <div className="card-body profile-accordion pb-0">
					   <Accordion  id="accordionExample4">
						   <Accordion.Item className="accordion-item">
							   <Accordion.Header as="h2" className="accordion-header" id="headingOne4">												  
								   Interest												  
							   </Accordion.Header>
							   <Accordion.Body id="collapseOne4" className="accordion-collapse collapse show" >
								   <div className="profile-interest">
									   <LightGallery
										   onInit={onInit}
										   speed={500}
										   plugins={[lgThumbnail, lgZoom]}
										   elementClassNames="row sp4"
									   >
										   
										   {galleryBlog.map((item,index)=>(
											   <div data-src={item.image} className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1" key={index}>
												   <img src={item.image} style={{width:"100%"}} alt="gallery"/>
											   </div>
										   ))}
									   </LightGallery>	
								   </div>
							   </Accordion.Body>
						   </Accordion.Item>
					   </Accordion>
				   </div>
			   </div>
		   </div>
		   <div className="col-xl-12">
			   <div className="card">
				   <div className="card-body profile-accordion pb-0">
					   <Accordion >
						   <Accordion.Item className="accordion-item">
							   <Accordion.Header as="h2" >												  
								   Our Latest News												  
							   </Accordion.Header>
							   <Accordion.Body >
								   <div className="accordion-body">
									   <div className="profile-news">
										   {mediaBlog.map((item, index)=>(
											   <div className="media pt-3 pb-3" key={index}>
												   <img src={item.image} alt="image" className="me-3 rounded" width="75" />
												   <div className="media-body">
													   <h6 className="m-b-5"><Link to="/post-details" className="text-black">Collection of textile samples</Link></h6>
													   <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
												   </div>
											   </div>
										   ))}															
									   </div>
								   </div>
							   </Accordion.Body>
						   </Accordion.Item>
					   </Accordion>
				   </div>
			   </div>
		   </div>
		   <div className="col-xl-12">
			   <div className="card">
				   <div className="card-body profile-accordion pb-0">
					   <Accordion>
						   <Accordion.Item className="accordion-item">
							   <Accordion.Header as="h2">												  
								   Friends												  
							   </Accordion.Header>
							   <Accordion.Body id="collapseOne6">													
								   <div className="friend-list">
									   {friends.map((item, ind)=>(
										   <img src={item.image} className="avatar avatar-md" alt=""  key={ind}/>
									   ))}															
								   </div>													
							   </Accordion.Body>
						   </Accordion.Item>
					   </Accordion>
				   </div>
			   </div>
		   </div> */}
	   </div>
	   <div className="row mt-1">
		   
		   <div className='col-xl-12 '>
		   <h4 className="text-primary">Projects</h4>
           <div className="d_f f_w_w j_c_f_e">

 

            </div> 
		   <div
				
				 id="DZ_W_TimeLine1"
				 className="widget-timeline dz-scroll style-1   ps--active-y"
			   >
				    {candidateSingle[0]?.projects?.length>0 ? 
			 <ul className="timeline">
			 {
                   candidateSingle[0]?.projects?.map((project,i)=>{
					  if(project.designation){
						return<li>
						<div className={`timeline-badge ${TimelineColors[i]}`}></div>
						<Link
						  className="timeline-panel text-muted"
						  to="/widget-basic"
						>
						  <h6 className="mb-0">
						  {`${project.client&&  `${project.client} -` }`||""} {project.project||""}
						  
							{/* <strong className="text-info"> ({project.expType=="F" && "Full Time"})</strong> */}
						  </h6>
						  <p>({project?.site} - {project?.employmentNature||""})</p>
						  <p>{project?.details||""}</p>
 
						
	
						  
						  
						  {/* <p className="mb-0">
							Quisque a consequat ante Sit amet magna at volutapt...
						  </p> */}
						</Link>
					  </li>
					 }
				 else{ 
					return <li>
					<div className={`timeline-badge ${TimelineColors[i]}`}></div>
					<Link
					  className="timeline-panel text-muted"
					
					>
					  <h6 className="mb-0">
					  <p className="key_Skill"> {`${project.client&&  `${project.client} -` }`||""} {project.project||""}</p>
					  
						{/* <strong className="text-info"> ({work.expType=="F" && "Full Time"})</strong> */}
					  </h6>
					  <p>( {project?.employmentNature||""})</p>
					  <p>{project?.details||""}</p>

					

					  
					  
					  {/* <p className="mb-0">
						Quisque a consequat ante Sit amet magna at volutapt...
					  </p> */}
					</Link>
				  </li>
				 }
					

				 })
			 }
			{/* <li>
			  <div className="timeline-badge primary"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				 <h6 className="mb-0">
				  Youtube, a video-sharing website, goes live{" "}
				  <strong className="text-primary">$500</strong>.
				</h6>
				<span>10 minutes ago</span>
				<span>10 minutes ago</span>
			   
			  </Link>
			</li>
			<li>
			  <div className="timeline-badge info"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				<span>20 minutes ago</span>
				<h6 className="mb-0">
				  New order placed{" "}
				  <strong className="text-info">#XF-2356.</strong>
				</h6>
				<p className="mb-0">
				  Quisque a consequat ante Sit amet magna at volutapt...
				</p>
			  </Link>
			</li>
			<li>
			  <div className="timeline-badge danger"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				<span>30 minutes ago</span>
				<h6 className="mb-0">
				  john just buy your product{" "}
				  <strong className="text-warning">Sell $250</strong>
				</h6>
			  </Link>
			</li>
			<li>
			  <div className="timeline-badge success"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				<span>15 minutes ago</span>
				<h6 className="mb-0">
				  StumbleUpon is acquired by eBay.{" "}
				</h6>
			  </Link>
			</li>
			<li>
			  <div className="timeline-badge warning"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				<span>20 minutes ago</span>
				<h6 className="mb-0">
				  Mashable, a news website and blog, goes live.
				</h6>
			  </Link>
			</li>
			<li>
			  <div className="timeline-badge dark"></div>
			  <Link
				className="timeline-panel text-muted"
				to="/widget-basic"
			  >
				<span>20 minutes ago</span>
				<h6 className="mb-0">
				  Mashable, a news website and blog, goes live.
				</h6>
			  </Link>
			</li> */}
		  </ul>
		:
		<Empty
		image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
		imageStyle={{
		//   height: 60,
		}}
		description={
		  <Typography.Text>
			  No Projects Found
		  </Typography.Text>
		}
	  >
		<button type="primary" className="btn btn-primary btn-sm mb-4"
		 onClick={handleClickProject}>+ Add Projects </button>
	  </Empty>
	  }
				
			   </div>
		   </div>
		   {/* <div className='col-xl-12'>
			   <div className="card">
				   <div className="card-body profile-accordion pb-0">
					   <Accordion className="accordion" id="accordionExample2">
						   <Accordion.Item className="accordion-item">
							   <Accordion.Header as="h2" className="accordion-header" id="headingOne2">												  
								   Following												  
							   </Accordion.Header>
							   <Accordion.Body id="collapseOne2" className="accordion-collapse collapse show">													
								   {followers.map((item, index)=>(
									   <div className="products mb-3" key={index}>
										   <img src={item.image} className="avatar avatar-md" alt="" />
										   <div>
											   <h6><Link to={"#"}>{item.title}</Link></h6>
											   <span>{item.subtitle}</span>	
										   </div>	
									   </div>
								   ))}
							   </Accordion.Body>
						   </Accordion.Item>
					   </Accordion>
				   </div>
			   </div>
		   </div>
		   <div className='col-xl-12'>
			   <div className="card">
				   <div className="card-body profile-accordion pb-0">
					   <Accordion  id="accordionExample4">
						   <Accordion.Item className="accordion-item">
							   <Accordion.Header as="h2" className="accordion-header" id="headingOne4">												  
								   Interest												  
							   </Accordion.Header>
							   <Accordion.Body id="collapseOne4" className="accordion-collapse collapse show" >
								   <div className="profile-interest">
									   <LightGallery
										   onInit={onInit}
										   speed={500}
										   plugins={[lgThumbnail, lgZoom]}
										   elementClassNames="row sp4"
									   >
										   
										   {galleryBlog.map((item,index)=>(
											   <div data-src={item.image} className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1" key={index}>
												   <img src={item.image} style={{width:"100%"}} alt="gallery"/>
											   </div>
										   ))}
									   </LightGallery>	
								   </div>
							   </Accordion.Body>
						   </Accordion.Item>
					   </Accordion>
				   </div>
			   </div>
		   </div>
		   <div className="col-xl-12">
			   <div className="card">
				   <div className="card-body profile-accordion pb-0">
					   <Accordion >
						   <Accordion.Item className="accordion-item">
							   <Accordion.Header as="h2" >												  
								   Our Latest News												  
							   </Accordion.Header>
							   <Accordion.Body >
								   <div className="accordion-body">
									   <div className="profile-news">
										   {mediaBlog.map((item, index)=>(
											   <div className="media pt-3 pb-3" key={index}>
												   <img src={item.image} alt="image" className="me-3 rounded" width="75" />
												   <div className="media-body">
													   <h6 className="m-b-5"><Link to="/post-details" className="text-black">Collection of textile samples</Link></h6>
													   <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
												   </div>
											   </div>
										   ))}															
									   </div>
								   </div>
							   </Accordion.Body>
						   </Accordion.Item>
					   </Accordion>
				   </div>
			   </div>
		   </div>
		   <div className="col-xl-12">
			   <div className="card">
				   <div className="card-body profile-accordion pb-0">
					   <Accordion>
						   <Accordion.Item className="accordion-item">
							   <Accordion.Header as="h2">												  
								   Friends												  
							   </Accordion.Header>
							   <Accordion.Body id="collapseOne6">													
								   <div className="friend-list">
									   {friends.map((item, ind)=>(
										   <img src={item.image} className="avatar avatar-md" alt=""  key={ind}/>
									   ))}															
								   </div>													
							   </Accordion.Body>
						   </Accordion.Item>
					   </Accordion>
				   </div>
			   </div>
		   </div> */}
	   </div>
											  </Tab.Pane>
											  <Tab.Pane id="about-me" eventKey='About'>
												  {/* <div className="profile-about-me">
													  <div className="pt-4 border-bottom-1 pb-3">
														  <h4 className="text-primary">About Me</h4>
														  <p className="mb-2">
															  A wonderful serenity has taken possession of my
															  entire soul, like these sweet mornings of spring
															  which I enjoy with my whole heart. I am alone, and
															  feel the charm of existence was created for the
															  bliss of souls like mine.I am so happy, my dear
															  friend, so absorbed in the exquisite sense of mere
															  tranquil existence, that I neglect my talents.
														  </p>
														  <p>
															  A collection of textile samples lay spread out on
															  the table - Samsa was a travelling salesman - and
															  above it there hung a picture that he had recently
															  cut out of an illustrated magazine and housed in a
															  nice, gilded frame.
														  </p>
													  </div>
												  </div>
												  <div className="profile-skills mb-5">
													  <h4 className="text-primary mb-2">Skills</h4>
													  <Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1"> Admin</Link>
													  <Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1" > Dashboard</Link>
													  <Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Photoshop</Link>
													  <Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Bootstrap</Link>
													  <Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Responsive</Link>
													  <Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Crypto</Link>
												  </div>
												  <div className="profile-lang  mb-5">
													  <h4 className="text-primary mb-2">Language</h4>
													  <Link to="/app-profile" className="text-muted pe-3 f-s-16">
														  <i className="flag-icon flag-icon-us" />English
													  </Link>
													  <Link to="/app-profile" className="text-muted pe-3 f-s-16">
														  <i className="flag-icon flag-icon-fr" />French
													  </Link>
													  <Link to="/app-profile" className="text-muted pe-3 f-s-16">
														  <i className="flag-icon flag-icon-bd" />Bangla
													  </Link>
												  </div> */}
												  
												  <div>
												  <div>

	     {
			 candidateSingle[0]?.resume ?
			  <>
			  
			   <div id="resume-preview" ref={previewElementRef}></div>
			{displayResumePreview(`${BASE}${candidateSingle[0]?.resume}`)}
			<div
			 className='d_f a_i_c j_c_c'>
				 <div ref={previewContainer} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }} />
			{/* <div className='col_' dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
                
			</div>
			  </>
			  :
			 <div
			   style={{
				 width:" 400px",
				 border:"dashed 1px #ccc",
				 margin:"30px"
				
			   }}>
				  <Dragger {...props}>
			  <p className="ant-upload-drag-icon">
				<InboxOutlined />
			  </p>
			  <p className="ant-upload-text">Click or drag file to this area to upload</p>
			  <p className="ant-upload-hint">
				Support for a single or bulk upload. Strictly prohibited from uploading company data or other
				banned files.
			  </p>
			</Dragger>
			 </div>
			
		 }


            {/* You can call displayResumePreview(content) whenever needed, for example via a button click or file upload */}
        </div>
            

											
												 

			{/* <iframe src={`https://docs.google.com/gview?url=${BASE}${candidateSingle[0]?.resume}&embedded=true`}></iframe> */}
												  {/* <iframe src={`${BASE}uploads/suraj-kumar_mobile-developer.docx`} width="100%" height="500px" /> */}
     
      </div>
	
												  {/* <div className="profile-personal-info">
													  <h4 className="text-primary mb-4">
														  Personal Information
													  </h4>
													  <div className="row mb-2">
														  <div className="col-3">
															  <h5 className="f-w-500"> Name<span className="pull-right">:</span></h5>
														  </div>
														  <div className="col-9">
															  <span>Mitchell C.Shay</span>
														  </div>
													  </div>
													  <div className="row mb-2">
														  <div className="col-3">
															  <h5 className="f-w-500">Email<span className="pull-right">:</span></h5>
														  </div>
														  <div className="col-9">
															  <span>example@examplel.com</span>
														  </div>
													  </div>
													  <div className="row mb-2">
														  <div className="col-3">
															  <h5 className="f-w-500">Availability<span className="pull-right">:</span></h5>
														  </div>
														  <div className="col-9">
															  <span>Full Time (Free Lancer)</span>
														  </div>
													  </div>
													  <div className="row mb-2">
														  <div className="col-3">
															  <h5 className="f-w-500">Age<span className="pull-right">:</span></h5>
														  </div>
														  <div className="col-9">
															  <span>27</span>
														  </div>
													  </div>
													  <div className="row mb-2">
														  <div className="col-3">
															  <h5 className="f-w-500">  Location<span className="pull-right">:</span></h5>
														  </div>
														  <div className="col-9">
															  <span>Rosemont Avenue Melbourne, Florida</span>
														  </div>
													  </div>
													  <div className="row mb-2">
														  <div className="col-3">
															  <h5 className="f-w-500">Year Experience<span className="pull-right">:</span></h5>
														  </div>
														  <div className="col-9">
															  <span>07 Year Experiences</span>
														  </div>
													  </div>
												  </div> */}
											  </Tab.Pane>
											  <Tab.Pane id="profile-settings" eventKey='Setting'>
											  <div className="row mt-5">
		   
		   <div className='col-xl-12 '>
		   {/* <h4 className="text-primary">Experience</h4> */}
         
		   <div
                  style={{ height: "370px" }}
                  id="DZ_W_TimeLine"
                  className="widget-timeline dz-scroll height370 ps--active-y"
                >
                  <ul className="timeline">
				  {
				 candidateSingle?.length>0 && candidateSingle?.map((item,i)=>(
                    <li>
					<div className={`timeline-badge ${TimelineColors[i]}`}></div>
					<div
					  className="timeline-panel text-muted"
					  to="/widget-basic"
					>
					  <span>{ondata(item?.createdAt)}</span>
					  {
						 item?.job_id ?
						 <h6 className="mb-1">
						 Assigned Job :
						<strong className={`text-primary me-2`}>
						{
                    item?.job_id ?
                    `${item?.job_id?.job_title}( ${item?.job_id?.job_id})`
                      :
                      "-"
                  }</strong>

					  </h6> :""
					  }
					
					  <h6 className="mb-1">
						 Created By :
						<strong className={`text-primary me-2`}>
						{item?.candidate_owner?.name}
				</strong>

					  </h6>
					  <h6 className="mb-1">
						  Status :
						<strong className={`text-primary me-2`}>
						{item?.status}
				</strong>

					  </h6>
					  {
						 item?.resume && 
						 <h6 className="mb-1">
						  Assigned Resume:
					    <div
						  className='d-flex flex-column p-1'>
                          
    {/* <img src={PDF} className="mt-1 mb-1" width={50} height={50} /> */}
    <a href={`${BASE}${item?.resume||""}`}>
     {resumename(item.resume)||""}</a>   
						</div>

					  </h6>
					  }
					  
		
					</div>
				  </li>

				  ))}

                    {/* <li>
                      <div className="timeline-badge primary"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>10 minutes ago</span>
                        <h6 className="mb-0">
                          Youtube, a video-sharing website, goes live{" "}
                          <strong className="text-primary">$500</strong>.
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge info"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>20 minutes ago</span>
                        <h6 className="mb-0">
                          New order placed{" "}
                          <strong className="text-info">#XF-2356.</strong>
                        </h6>
                        <p className="mb-0">
                          Quisque a consequat ante Sit amet magna at volutapt...
                        </p>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge danger"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>30 minutes ago</span>
                        <h6 className="mb-0">
                          john just buy your product{" "}
                          <strong className="text-warning">Sell $250</strong>
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge success"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>15 minutes ago</span>
                        <h6 className="mb-0">
                          StumbleUpon is acquired by eBay.{" "}
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge warning"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>20 minutes ago</span>
                        <h6 className="mb-0">
                          Mashable, a news website and blog, goes live.
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge dark"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>20 minutes ago</span>
                        <h6 className="mb-0">
                          Mashable, a news website and blog, goes live.
                        </h6>
                      </Link>
                    </li> */}
                  </ul>
                </div>
		   </div>
		
	   </div>
											  </Tab.Pane>
										  </Tab.Content>	
									  </Tab.Container>		
								  </div>
							  </div>
					</div>
				</div>
			   
				 
					  
  
			  </div>

			  
		   }
		         <Drawer
    title={`Assign Candidate To New Job`}
    placement="right"
    onClose={()=>setOpenAssign(!openAssign)}
    closable={openAssign}
    size="large"
    
    open={openAssign}
    height={50}
    width={650}
    
  >
     <AssignTable/>
  </Drawer>
  <Drawer
    title="Edit Candidate"
    placement="right"
    onClose={(e)=>handleClickEditAssign()}
    closable={assignEditCandidate}
    size="large"
    
    open={assignEditCandidate}
    height={50}
    width={650} 
    
  >
     <AssignEditCandidatesPopup/>
  </Drawer> 

  <Drawer
    title="Edit Project"
    placement="right"
     onClose={handleClickProject}
    closable={openProjectDrawer}
    size="large"
    
    open={openProjectDrawer}
    height={50}
    width={750}
    
  >
     <ProjectEdit/>
  </Drawer>


    <Drawer
    title="Edit Work Experience"
    placement="right"
     onClose={()=>setworkexperiencePopup(false)}
    closable={openworkexperiencepopup}
    size="large"
     
    open={openworkexperiencepopup}
    height={50}
    width={750}
    
  >
     <WorkExperienceEdit/>
   </Drawer>
        </>
    );
};



// function  PostComment(){
// 	return(
// 		<ul className="post-comment d-flex mt-3 text-center">
// 			<li>
// 				<label className="me-3"><Link to={"#"}><i className="fa-regular fa-heart me-2"></i>Like</Link></label>
// 			</li>
// 			<li>
// 				<label className="me-3"><Link to={"#"}><i className="fa-regular fa-message me-2"></i>Comment</Link></label>
// 			</li>
// 			<li>
// 				<label className="me-3"><Link to={"#"}><i className="fa-solid fa-share me-2"></i>Share</Link></label>	
// 			</li>
// 		</ul>
// 	)
// }

export default CandidateViewPage;