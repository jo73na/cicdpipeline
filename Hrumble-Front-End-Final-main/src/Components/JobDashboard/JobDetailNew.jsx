// import React from 'react'
// import './../../assets/Css/MasterCss.css'
// import { useContext, useState } from 'react'
// import ViewJobContext from '../../Providers/ViewJob';
// import { LockOutlined, EnvironmentOutlined, EditOutlined } from '@ant-design/icons';
// import EditJobDetail from './EditJobDetail';
// import { Drawer } from 'antd';
// import CookieUtil from '../../Utils/Cookies';

// const JobDetailNew = () => {

//     const { jobSingle } = useContext(ViewJobContext);
//     const role = CookieUtil.get("role");
//     const admin_id = CookieUtil.get("admin_id");
//     let finddata =jobSingle?.assigneddata?.find((e) => e.assign === admin_id);
//     const [open, setOpen] = useState(false);
//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };


//     let skill=<ul className="zive-jobDetail-skills mt-2 m_t_10">
  
//     {jobSingle?.skils?.map((e,i)=><li key={i}>{e}</li>)}           
//     </ul>

// let description=  <div>

// <span className="desctiption_border"></span>
// <div className="description_content mt-2" dangerouslySetInnerHTML={{ __html: jobSingle?.job_description }} />

// </div>

//   return (
//     <div>
//         <Drawer
//     title="Edit Job Description"
//     placement="right"
//     closable={true}
//     size="large"
//     className="zive-addclient"
//     onClose={onClose}
//     open={open}
//     height={50}
//     width={650}
    
//   >
//     <EditJobDetail onClose={onClose} />
//   </Drawer>

//     <div className='d_f f_w_w g_15'>
//       <div className='card p_20 ' style={{
//             flex:2
//         }}>
//         <div className='d_f j_c_s_b'>
//         <label className='heading_text-col '>{jobSingle?.job_title || "-"}</label>
//         {
//            role != "Vendor" &&
//         <span className='zive-jobDetail-editicon' onClick={showDrawer}> <EditOutlined /> Edit</span>

//         }
//         </div>
//         <p className='jobDetail-clientName'>{jobSingle?.end_client || "-"}</p>
//         <div className='d_f f_w_w g_30 p_t_15 m_b_5'>
//             <label className='zive-jobDetailNew-exp'><LockOutlined /> <span className='jobDetailNew-labels'> {`${jobSingle?.exp_from} Yrs   -  ${jobSingle?.exp_to} Yrs` || "-"}</span></label>
//             <label>|</label>
//              {
//                 role == "Vendor" ?
//             <label>₹ <span className='jobDetailNew-labels'> {`${finddata?.vendor_clientbillable||"0"}  ${finddata?.vendor_salary_type||""}` || '-'}</span></label>

//               :
//             <label>₹ <span className='jobDetailNew-labels'> {`${jobSingle?.salary} - ${jobSingle?.salaryType}` || '-'}</span></label>

//              }


//         </div>
//          <ul className='profileInfo-list-gap'>
//          {
//           jobSingle?.assigneddata?.map((item)=>
//            <li className='p_t_10'>
//               <label className='title_new'>{item?.assign?.name}</label>
//               <label className='text_new'>₹{`${item?.vendor_clientbillable||"0"}  ${item?.vendor_salary_type||""}`}</label>
//            </li>)
//          }
//          </ul>
       
//         <div className='p_t_10'>
//         <label className='jobDetailNew-labels'><EnvironmentOutlined /> {jobSingle?.job_location.map((item,i)=><span key={i} className=''>{item},&nbsp;</span>) || "-"}</label>
//         </div>
//         <hr className='jobDetailHrLine m_t_20' />
//         <div className='d_f f_w_w g_30 p_t_20'>
//             <label>Availability : <span className='zive-jobDetail-card1-label'>{jobSingle?.joing_avaliability || "-"}</span></label>
//             <label>|</label>
//             <label>Open Positions : <span className='zive-jobDetail-card1-label'>{jobSingle?.required_no_of_candidates || "-"}</span></label>
//             <label>|</label>
//             {
//                 role  == "Vendor" ?
//             <label>Job Type : <span className='jobDetailNew-labels'>{finddata?.job_type}</span></label>
              
//             :
//             <label>Job Type : <span className='jobDetailNew-labels'>{jobSingle?.job_type}</span></label>
//              } </div>
//       </div>
//       <div className='card p_20' style={
//         {
//             flex:1
//         }}>
//             <label className='zive-jobDetail-desc'>Skills</label>
//             <p>{skill}</p>
//       </div>
//     </div>
//     <div className='card p_20 m_t_10'>
//         <label className='zive-jobDetail-desc'>Description</label>
//         <p className='p_t_10'>{description}</p>
//     </div>
//     </div>
//   )
// }

// export default JobDetailNew
import  { useContext, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom';
import ViewJobContext from '../../Providers/ViewJob';
import { Button, Drawer, Popover } from 'antd';
// import ViewJobContext from '../../../context/ViewJobContext';
import EditJobDetail from './EditJobDetail';
import dayjs from 'dayjs';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useEffect } from 'react';
import CookieUtil from '../../Utils/Cookies';







const JobDetailNew = () => {
    const { jobSingle,editButtonJob,showEmployeModalEdit } = useContext(ViewJobContext);
     const navigate =useNavigate()
   const [copy,setCopy]=useState(false)
   const [copyButton,setCopyButton]=useState(false)
   const role = CookieUtil.get("role");
   const admin_id = CookieUtil.get("admin_id");


        let vendardata =jobSingle?.assigneddata?.find((e) => e.assign?._id === admin_id);
    console.log(("8byoukbh",vendardata))

   const params =useParams()
   console.log('End Client:', jobSingle?.end_client);
  
    let description=  <div>

    <span className="desctiption_border"></span>
    <div className="description_content mt-2" dangerouslySetInnerHTML={{ __html: jobSingle?.job_description }} />
    
    </div>
  
    
  const aboutme = [
   
    ...(role !== "Vendor" && jobSingle?.client_id?.[0]?.name
    ? [{ title: 'Company Name', icon: 'fa-solid fa-city', subtitle: jobSingle.client_id[0].name },
    {title:'Job Type', icon:'fa-solid fa-book', subtitle:jobSingle?.job_type},

    {title:'Salary', icon:'fa-solid fa-indian-rupee-sign', subtitle:`${jobSingle?.vendor_clientbillable} - ${jobSingle?.salaryType}` || '-'},
    { title: 'End Client', icon: 'fa-solid fa-building-user', subtitle: jobSingle?.end_client?.length > 0 ? jobSingle.end_client.join(', ') : "-" },    

  ]
    : [
    {title:'Job Type', icon:'fa-solid fa-book', subtitle:jobSingle?.job_type},
    {title:'Experience', icon:'fa-solid fa-hand-holding-heart', subtitle: `${jobSingle?.exp_from} Yrs   -  ${jobSingle?.exp_to} Yrs` || "-"},
    {title:'Budget', icon:'fa-solid fa-indian-rupee-sign', subtitle:`${jobSingle.salary} - ${jobSingle?.salary_type ?? jobSingle?.salaryType}` || '-'},
]),

    {title:'Location', icon:'fa-solid fa-location-dot', subtitle:jobSingle?.job_location.map((item,i)=><span key={i} className=''>{item},&nbsp;</span>) || "-"},
    {title:'Date posted:', icon:'fa-solid fa-clock', subtitle:dayjs(jobSingle?.createdAt).format("DD-MM-YYYY")||"-"},
    // {title:'Blood Group', icon:'fa-solid fa-layer-group', subtitle:'A+'},
    // {title:'Blood Group', icon:'fa-solid fa-layer-group', subtitle:'A+'},
    // {title:'Blood Group', icon:'fa-solid fa-layer-group', subtitle:'A+'},
];
function  PostComment(){
    return(
        <ul className="post-comment d-flex mt-1">
              <li>
                <label className="me-3"><Link to={"#"}><i className=" fa-solid  fa-person-dress me-2"></i>{
                     role == "Vendor" ?
                      "Technoladders"
                      :
                      jobSingle?.client_id[0]?.name
                }
                </Link></label>
            </li>
            <li>
                <label className="me-3"><Link to={"#"}><i className=" fa-solid  fa-location-dot me-2"></i>{jobSingle?.job_location.map((item,i)=><span key={i} className=''>{item},&nbsp;</span>) || "-"}</Link></label>
            </li>
         
         
          
        </ul>
    )
}

 useEffect (() => {
      setCopyButton(false)
      setCopy(false)
 },[params.id])
     
  return (
    <>
      <div className="container-fluid">	
      <div className="d-flex justify-content-between align-items-center mb-4">
    <h4 className="heading mb-0"><i className="fa-solid fa-chevron-left"
      onClick={()=>navigate(-1)}
     style={
        {
            cursor:"pointer"
        }
     }></i > {`Jobs/${jobSingle?.job_title}`}</h4>
  {
     role != "Vendor" &&
     <div className="d-flex align-items-center">
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

{!copyButton ? (
   <button className='btn btn-info btn-sm' onClick={() => setCopyButton(true)}>
     <span>Copy link</span>
   </button>
 ) : (
   <div style={{ padding: "4px", display:"flex", alignItems:"center", gap:"2px",background: "#e1e1e2" }}>
         <span className="me-1">{`http://localhost:5173/jobapplay/${jobSingle?._id}`}</span>

     <CopyToClipboard text={`http://localhost:5173/jobapplay/${jobSingle?._id}`} onCopy={()=>setCopy(true)}>
       <div>
         <Popover placement="top" content={copy ? "Copied" : "Copy Link"}>
           <span onClick={()=>setCopy(true)}>
             {copy ? (
               <i className="fa-solid fa-check text-primary"></i>
             ) : (
               <i className="fa-solid fa-clipboard"></i>
             )}
           </span>
         </Popover>
       </div>
     </CopyToClipboard>
   </div>
 )
             }

     <Link to className="btn btn-primary btn-sm ms-2"
         onClick={showEmployeModalEdit}

         // onClick={()=>userdata.current.showEmployeModal()}
     >Edit
     </Link>
 </div>
  }
</div>
      </div>
    <div className="row m-3">
   
    <div className="col-xl-9 col-xxl-8">
        <div className="row">
        <div className="col-xl-12">
                <div className="card">
                    <div className="card-body ">
                    <div className="d-flex align-items-center g-5">
                                                        {/* <h2 className='fa-solid fa-briefcase text-primary'></h2> */}
                                                        {/* <img src={IMAGES.contact1} className="avatar avatar-xl" alt="" /> */}
                                                        <div className=" cat-name"
                                                         style ={{
                                                            marginLeft: "8px"
                                                         }}>
													<h4 className="text-primary">{jobSingle?.job_title}</h4>
                                                     
                                                             
                                                             <PostComment/>
                                                        </div>	
                                                        <span className={`badge light border-0 badge-success`} style={{
                                                                right:" 160px",
                                                                top: "26px",
                                                                position: "absolute"
                                                        }}> 
                                                         {role  == "Vendor" ?
                                                         vendardata?.job_type
                                                        :
                                                        jobSingle?.job_type}</span>
                                                        <span className={`badge light border-0 badge-success`} style={{
                                                                right:" 20px",
                                                                top: "26px",
                                                                position: "absolute"
                                                        }}> 
                                                         {role  == "Vendor" ?
                                                         vendardata?.job_type
                                                        :
                                                        jobSingle?.secondarySelected}</span>
                                                 
                                                         
                                                    </div>
                    </div>
                     <div>
								 {
                                     role =="SuperAdmin" &&
                                     <div
                                     className='p-3'>
                                    <h4 className="text-primary mb-2 ">Assigned</h4>
                              <div>
                              {jobSingle?.assigneddata?.map((e,i)=>
                                                      <Link key={i} to="" className="btn btn-primary light btn-xs mb-1 me-1"> {e?.assign?.name||""}</Link>
                                                      )}   
                              </div>
                                    </div>
                                 }
                     </div>
                    <div className="profile-skills  p-3">
													<h4 className="text-primary mb-2">Skills</h4>
                                                    {jobSingle?.skils?.map((e,i)=>
													<Link key={i} to="" className="btn btn-primary light btn-xs mb-1 me-1"> {e}</Link>
                                                    )}           
    
													{/* <Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1"> Admin</Link>
													<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1" > Dashboard</Link>
													<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Photoshop</Link>
													<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Bootstrap</Link>
													<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Responsive</Link>
													<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Crypto</Link> */}
												</div>
                    <div className="profile-about-me p-3">
													<div className="pt-4 border-bottom-1 pb-3">
														<h4 className="text-primary">Description</h4>
														 {description}
													</div>
												</div>
											
                </div>
          
            </div>
            {/* {productBlog.map((item, ind)=>(
                <Fragment key={ind}>
                    <div className="col-xl-12" >
                        <div className="card">
                            <HeaderBlog />
                            <div className="card-body pt-0">
                                <div className="post-img">
                                    <img src={item.bigimg} />	
                                </div>
                                <div className="post-see d-flex align-items-center mt-3">
                                <ul>
                                    <div className="avatar-list avatar-list-stacked">
                                        <img src={IMAGES.contact1} className="avatar rounded-circle" alt="" />
                                        <img src={IMAGES.contact7} className="avatar rounded-circle" alt="" />
                                        <img src={IMAGES.contact7} className="avatar rounded-circle" alt="" />
                                    </div>
                                </ul>
                                <h6 className="mb-0 ms-3">+3 people see this post</h6>
                                </div>
                                <div className="mt-3">
                                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
                                </div>
                                <PostComment />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card">
                            <HeaderBlog />
                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="post-img">
                                            <img src={item.halfimage1} className="me-3" />	
                                        </div>	
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="post-img">
                                            <img src={item.halfimage2} className="ms-3" />	
                                        </div>	
                                    </div>
                                </div>
                                <div className="post-see d-flex align-items-center mt-3">
                                    <ul>
                                        <div className="avatar-list avatar-list-stacked">
                                            <img src={IMAGES.contact1} className="avatar rounded-circle" alt="" />{" "}
                                            <img src={IMAGES.contact7} className="avatar rounded-circle" alt="" />{" "}
                                            <img src={IMAGES.contact6} className="avatar rounded-circle" alt="" />
                                        </div>
                                    </ul>
                                    <h6 className="mb-0 ms-3">+3 people see this post</h6>
                                </div>
                                <div className="mt-3">
                                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
                                </div>
                                <PostComment />
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))}							 */}
                
        </div>
        
    </div>
    <div className="col-xl-3 col-xxl-4">
        <div className="row">
         
            <div className='col-xl-12 '>
                <div className="card">
                    <div className="card-body profile-accordion pb-0">
                    <div className="about-me">
														<h4 className="text-primary mb-2">Job Information :</h4>
                           
														<ul>
															{aboutme.map((item, ind)=>(
																<li key={ind}>
																	<i className={item.icon}></i>
																	<div>
																		<h6>{item.title}</h6>
																		<span>{item.subtitle}</span>
																	</div>
																</li>
															))}
															
															{/* <li className="second-head text-black">Activity</li> */}
															{/* <div>
																<Link to={"#"} className="btn btn-block bg-facebook mb-2"><i className="fa-brands fa-facebook-f me-2"></i>Facebook</Link>
																<Link to={"#"} className="btn btn-block bg-whatsapp mb-2"><i className="fa-brands fa-whatsapp me-2"></i>WhatsApp</Link>
																<Link to={"#"} className="btn btn-block bg-facebook mb-2"><i className="fa-brands fa-skype me-2"></i>Skype</Link>
															</div> */}
														</ul>
													</div>	
                    </div>
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
                            </Accordion.Item
                        </Accordion>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
</div>	

<Drawer
        title="Edit Job"
        placement="right"
        onClose={showEmployeModalEdit}
        // loading={true}
        closable={editButtonJob}
        // size="large"
        
        open={editButtonJob}
        height={50}
        width={660}
        
    >
    <EditJobDetail/>
  </Drawer>
</>		
  

  )
}

export default JobDetailNew
