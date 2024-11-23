// import { useContext,useState,useEffect} from 'react';
// import JobContext from '../../Providers/JobProvider';
// import {Space,Cascader, Tabs, Divider, DatePicker, Form, Radio, Modal,Typography} from "antd"
// import ReactQuill from 'react-quill';

// import 'react-quill/dist/quill.snow.css';
// import { Button, Input, FormItem ,Select} from '../../Utils/Formelements';
// import { useForm } from 'antd/es/form/Form';
// import { Nav, Tab } from 'react-bootstrap';
// import { SVGICON } from '../../Utils/SVGICON';
// import BasicJobAdd from './BasicJobAdd';
// import { MobileStepper, Step, StepContent, StepLabel, Stepper } from '@mui/material';
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// const { TabPane } = Tabs;
// const { RangePicker } = DatePicker;



// const AddJob=({handleopenDrawerJob})=>{
//  const {addJob,addbuttonJob,clients,handleClientChange,skill,location,poc,endclient,setAddButton,init} = useContext(JobContext);
//  const [jobType, setJobType] = useState("Full Time");
//  const [salaryType, setSalaryType] = useState("Monthly");
//  const [TabActive, setTabActive] = useState("");
//  const [job_description, setJobDescription] = useState("");
//  const [currency, setCurrency] = useState("INR");
//  const [finaldata, setFinalData] = useState({});
//  const [form] = useForm();
//  const [form1] = useForm();
//  const [active, setactive] = useState("1");




//  const options = [{
//   label:0,
//   value:0
//  }];
//      for (let i = 1; i <= 20; i++) {
//     options.push({
//       label:i,
//       value: i,
//     });
//   }

//   const menuThree = (parent, menu) => {
//     const filter = menu?.filter((e) => {
//       return String(e?.parent?._id||null) === String(parent) });
//       console.log(filter,("filter"));
//       const list = filter?.map((e) => {
//         return {
//           label: e?.name,
//           value: e?._id,
//           children: menuThree(e?._id, menu)
           
//         }})
//         return list
        
     
//     ;}

//     let skillsdata = [];
//     skill?.map((item,i) => {
//      skillsdata.push({
//       key:i,
//        label: item?.name,
//        value: item?.name,
//      });
//    });
//    let locationsdata=[]
//    location?.map((item,i) => {
//      locationsdata.push({
//       key:i,
//        label: item?.name,
//        value: item?.name,
//      });
//    });
//    let Pocdata=[]
//    poc?.contact_persons?.map((item) => {
//     Pocdata.push({
//       label: item?.name,
//       value: item?.name,
//     });
//   });
//   let EndClientdata=[]
//   endclient?.map((item) => {
//    EndClientdata.push({
//      label: item?.name,
//      value: item?.name
//    });
//  });

//     const clientsData= menuThree(null,clients)

//     const handleJobtypeChange=(e)=>{
//       if(e =="Full Time"){
//         setSalaryType("LPA")  
//       setJobType(e)
          
//       } 
//       else{
//       setJobType(e)

//       }
//     }
//     const handleChangeSalary =(e)=>{
//       setSalaryType(e)
//     }
//     const handleChangedescription = (value) => {
//       setJobDescription(value)
//     };
//     const onAddJobSubmit=(values)=>{
//         console.log("Values",values)
//          let final ={
//            ...finaldata,
//            ...values
//          }
//          setFinalData(final)
//        if (activeStep === 2) {
//     // Safely extract values from `values` and handle default cases
//     const salary = values["salary"]
//         ? Number(values["salary"].replace(/,/g, ''))
//         : "";
//     const Totalbudget =final["total_budget"]
//     ? Number(final["total_budget"].replace(/,/g, ''))
//     : "";
//     const projectStartDate =  final?.duration ? final?.duration[0]?.$d :null;
//     const projectEndDate =  final?.duration ? final?.duration[1]?.$d : null;
//     const expTo = values["exp_to"] || 0;
//     const requiredNoOfCandidates = values["required_no_of_candidates"] || 0;
//     const salaryType = salaryType || "";
//     const jobDescription = job_description || "";
//     const activeTab = TabActive || "";

//     // Prepare the data object
//     const sendData = {
//         ...finaldata,
//         ...values,
//         salary,
//         project_startdate: projectStartDate,
//         project_enddate: projectEndDate,
//         total_budget: Totalbudget,
//         exp_to: expTo,
//         currency,
//         required_no_of_candidates: requiredNoOfCandidates,
//         salaryType,
//         job_description: jobDescription,
//         active_tab: activeTab
//     };

//     // Call the `addJob` function with the prepared data and form
//     addJob(sendData, form);

//     // Reset form fields
//     setJobDescription("");
//     setSalaryType("Monthly");
// }
//            else{
//             setActiveStep(activeStep+1)
    
//            }
//        }
     
       
//       // setAddButton(true)
    
     


//       useEffect(() => {
//         init()
//       }, [])


//       const customInputStyle = {
//         '& .ant-input:focus, & .ant-input-focused': {
//           borderColor: '#ff4d4f', // Primary red color
//           boxShadow: '0 0 0 2px rgba(255, 77, 79, 0.2)',
//         },
//       };


//       const BasicDetailAdd = () => {
//         return (
//             <h1>ssssss</h1>
          
//         );
//       };

//       const items = [
//         {
//           label: "Basic Details",
    
//           key: "1",
//           children: 
//             <BasicDetailAdd
//             // setValue={setValue}
//             // form={form}
//             // hiringtype={hiringtype}
//             // setHiringtype={setHiringtype}
//             // value={value}
//             // resume={resume}
//             //  info={props}
//             />
//         },
//         {
//           label: "Skill Matrix",
//           key: "2",
//           children:  <h2>ssssss</h2>,
//         },
//       ];

//        const handleChangeTap =(e)=>{
//             setactive(e)
//        }

//        const [modalVisible, setModalVisible] = useState(false);
//        const [currentIndex, setCurrentIndex] = useState(null);
//        const [description, setDescription] = useState('');
//        const [skills, setSkills] = useState('');
//        const [activeTab, setActiveTab] = useState('description');
//        const [activeStep, setActiveStep] = useState(0);

//        const handleNext = () => {
//          setActiveStep((prevActiveStep) => prevActiveStep + 1);
//        };
     
//        const handleBack = () => {
//          setActiveStep((prevActiveStep) => prevActiveStep - 1);
//        };

      
     
//        const handleDescriptionChange = (e) => {
//          setDescription(e.target.value);
//        };
     
//        const showModal = (index) => {
//          console.log("External Staffing",index)
//          const job = form1.getFieldValue(['jobs', index]);
  
//     setSkills(job?.skills || '');
//     setActiveTab('description');

//          setCurrentIndex(index);
//          setDescription(form1.getFieldValue(['jobs', index, 'description']) || '');
//          setModalVisible(true);
//        };



//   const handleNext1 = () => {
//     if (activeTab === 'description') {
//       setActiveTab('skills');
//     }
//   };

//   const handleBack1 = () => {
//     if (activeTab === 'skills') {
//       setActiveTab('description');
//     }
//   };


//   const handleChangeCurrency =(e)=>{
//          setCurrency(e.target.value)   
//   }

     
//   const handleOk = () => {
//     if (currentIndex !== null) {
//       const updatedJobs = [...form1.getFieldValue('jobs')];
//       updatedJobs[currentIndex] = {
//         ...updatedJobs[currentIndex],
//         description,
//         skills,
//       };
//       form1.setFieldsValue({ jobs: updatedJobs });
//     }
//     setModalVisible(false);
//     setDescription('');
//     setSkills('');
//   };
     
//        const handleCancel = () => {
//          setModalVisible(false);
//          setDescription('');
//          setSkills('');
//        };
     
//        const steps = [
//         {
//           label: 'Basic Details',
//           description: <>
//             <BasicJobAdd locationsdata={locationsdata} salaryType={salaryType} handleChangeSalary={handleChangeSalary} handleopenDrawerJob={handleopenDrawerJob} options={options} form={form} onAddJobSubmit={onAddJobSubmit} jobType={jobType} handleJobtypeChange={handleJobtypeChange}  />
             
//           </>,
//         },
//         {
//           label: 'Job Description',
//           description:
//              <>
//                    <FormItem label="Job Description" name="job_description"
//         rules={[
//           {
//             required: true,
//             message: "Please Enter Job Description !",
//           },
//         ]}>
//                 <ReactQuill
//                   theme="snow"
//                   className="job_description"
//                   name="job_description"
//                   value={job_description}
//                   onChange={handleChangedescription}
//                 />
//      </FormItem>
//      <div className='d_f j_c_f_e g_10 '
          
//           >
//             <button type="button" className='btn btn-danger btn-sm' onClick={()=>setActiveStep(activeStep-1)}>
//               Back
//             </button>
//             <button
//             className='btn btn-primary btn-sm'
            
//               type="submit"
              
//             >
//               Add Skill
//             </button>
//           </div>
//              </>
//         },
//         {
//           label: 'Skills',
//           description: 
//            <>
//                     <div
//                         className='col_2 g_20 mt-3'>
//                        <FormItem label="Skills" name="skils"
//         rules={[
//           {
//             required: true,
//             message: "Please Select Skills!",
//           },
//         ]}>
//                 <Select
                 
//                   placeholder="Select Skill"
//                   showSearch
                  
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>}
//                   options={skillsdata}
//                 />
//               </FormItem>
//                        </div>
//                        <div className='d_f j_c_f_e g_10 '
          
//           >
//             <button type="button" className='btn btn-danger btn-sm' onClick={()=>setActiveStep(activeStep-1)}>
//               Back
//             </button>
//             <button
//             className='btn btn-primary btn-sm'
//                type='primary'
//               htmlType="submit"
//               loading={addbuttonJob}
//             >
//               save
//             </button>
//           </div>
//            </>
//         }
//       ];

//       const steps1 = [
//         {
//           label: 'Basic Details',
//           description: <>
//                 <div
//                  className='col_5 g_20'>
//                 <FormItem
//                 label="Project Name"
//                 name="project_name"
              
                
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please Enter Project Name!",
//                   },
//                 ]}
//               >
//                 <Input placeholder='Enter Project Name'/>
//               </FormItem>
//           <FormItem label="Experience"
//            name="duration"
//            >
//               <RangePicker />
//           </FormItem>
          
//           <FormItem label="Budget"
//            name="total_budget"
//          >
           
         
//            <Input
//            addonBefore={
//               <Select defaultValue="INR"
//                onChange={handleChangeCurrency}>
//                   <Option value="INR">INR</Option>
//                   <Option value="USD">USD</Option>
//                   <Option value="EUR">EUR</Option>
//                   <Option value="GBP">GBP</Option>
//                   <Option value="JPY">JPY</Option>
//                   <Option value="CAD">CAD</Option>
//                   <Option value="AUD">AUD</Option>
//               </Select>
               
          
//            }
           
            
          
           
            
//            />
//           </FormItem>
      

      
//                 </div>
//                     <label>Resource Allocation</label>
//                 <Form.List
//            label=""
//           name="jobs"
//           initialValue={[
//             {
//               jobTitle: '',
//               duration: '',
//               workLocation: '',
//               budget: '',
//               description: '',
//               skills:"",
//             },
//           ]}
//         >
//           {(fields, { add, remove }) => (
//             <>
//               {fields.map(({ key, name, fieldKey, ...restField }) => (
                
//                   <>
//                     <div className='col_6 g_20'>
//                        <Form.Item
//                     label="Job Title"
//                     {...restField}
//                     name={[name, 'jobTitle']}
//                     fieldKey={[fieldKey, 'jobTitle']}
//                     rules={[{ required: true, message: 'Missing job title' }]}
//                   >
//                     <Input placeholder="Job Title" />
//                   </Form.Item>

//                  <div style={{
//                   marginTop:"-10px"
//                  }}>
//                  <FormItem label="Experience" className='h_10 h_100_sm '
//                       rules={[
//     {
//       required: true,
//       message: "Please Select Experience!",
//     },
//   ]}
//   hasFeedback
//   validateStatus={
//     form.getFieldError("exp_from") 
//       ? "error"
//       : ""
//   }>
//            <div className="d_f a_i_c experience g_10 f_w_w_sm g_5_sm "
//             style={{
//                marginTop:"-3px"
//             }}>
//                 <FormItem name="exp_from"  >
//                   <Select options={options}
//                      />
//                 </FormItem>
//                 <FormItem>to</FormItem>
//                 <FormItem name="exp_to">
//                   <Select options={options} defaultValue={0}/>
//                 </FormItem>
//               </div>
//            </FormItem>
//                  </div>

//                   <Form.Item
//                     {...restField}
//                     label="Work Location"
                    

//                     name={[name, 'workLocation']}
//                     fieldKey={[fieldKey, 'workLocation']}
//                     rules={[{ required: true, message: 'Missing work location' }]}
//                   >
//                     <Input placeholder="Work Location" />
//                   </Form.Item>

//                   <Form.Item
//                     {...restField}
//                     label="Budget"

//                     name={[name, 'budget']}
//                     fieldKey={[fieldKey, 'budget']}
//                     getValueFromEvent={(e) => {
//                       console.log("ffff",e)
//                      const numericValue = e.target.value.replace(/[^0-9]/g, '');
//                      return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
//                    }}
//                     rules={[{ required: true, message: 'Missing budget' }]}
//                   >
//                     <Input placeholder="Budget" />
//                   </Form.Item>

//                   <Form.Item label="No of Posistions"
//              name="no_of_positions"
//            >
//              <Input
            
             
              
//              />
//             </Form.Item>

//                    <div
//                     className='d_f g_10 a_i_c'>
//                    <Form.Item
//                     {...restField}
//                     name={[name, 'description']}
//                     fieldKey={[fieldKey, 'description']}
//                   >
//                     <button
//                      className='btn btn-primary btn-sm m_t_30'
//                       type="button"
//                       onClick={() => showModal(name)}
//                     >
//                       Add Description
//                     </button>
//                   </Form.Item>

//                   <MinusCircleOutlined
//                     onClick={() => remove(name)}
//                     style={{ fontSize: '16px', color: '#ff4d4f' }}
//                   />
//                    </div>
//                     </div>
//                   </>

               
//               ))}

//               <Form.Item>
//                 <button
//                   type="button"
//                    className='btn btn-warning btn-sm'
//                   onClick={() => add()}
//                   icon={<PlusOutlined />}
//                 >
//                   + Add Another Resources
//                 </button>
//               </Form.Item>
//             </>
//           )}
//         </Form.List>
//          <div
//           className='d_f j_c_f_e a_i_c'>
//          <Form.Item>
//           <button type="submit" className='btn btn-sm btn-primary' htmlType="submit">
//             Save
//           </button>
//         </Form.Item>
//          </div>
//           </>,
//         },
//         {
//           label: 'Job Description',
//           description:
//              <>
//                    <FormItem label="Job Description" name="job_description"
//         rules={[
//           {
//             required: true,
//             message: "Please Enter Job Description !",
//           },
//         ]}>
//                 <ReactQuill
//                   theme="snow"
//                   className="job_description"
//                   name="job_description"
//                   value={job_description}
//                   onChange={handleChangedescription}
//                 />
//      </FormItem>
//      <div className='d_f j_c_f_e g_10 '
          
//           >
//             <button type="button" className='btn btn-danger btn-sm' onClick={()=>setActiveStep(activeStep-1)}>
//               Back
//             </button>
//             <button
//             className='btn btn-primary btn-sm'
            
//               type="submit"
              
//             >
//               Add Skill
//             </button>
//           </div>
//              </>
//         },
//         {
//           label: 'Skills',
//           description: 
//            <>
//                     <div
//                         className='col_2 g_20 mt-3'>
//                        <FormItem label="Skills" name="skils"
//         rules={[
//           {
//             required: true,
//             message: "Please Select Skills!",
//           },
//         ]}>
//                 <Select
                 
//                   placeholder="Select Skill"
//                   showSearch
                  
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>}
//                   options={skillsdata}
//                 />
//               </FormItem>
//                        </div>
//                        <div className='d_f j_c_f_e g_10 '
          
//           >
//             <button type="button" className='btn btn-danger btn-sm' onClick={()=>setActiveStep(activeStep-1)}>
//               Back
//             </button>
//             <button
//             className='btn btn-primary btn-sm'
//                type='primary'
//               htmlType="submit"
//               loading={addbuttonJob}
//             >
//               save
//             </button>
//           </div>
//            </>
//         }
//       ];

//       const [value, setValue] = useState("1");
      
//  return( 
//      <>
//              <div
//               className="add_job">
               
               
//              <lable>Select One </lable>
//              <Tab.Container >
//              <Nav as="ul" className="nav nav-pills success-tab" id="pills-tab" role="tablist"
//                 onSelect={(key) => setTabActive(key)}>
//   {(() => {
//     if (TabActive === "Direct Hiring") {
//       return (
//         <Nav.Item as="li">
//           <Nav.Link as="button" eventKey="Direct Hiring">
//             {SVGICON.SocialHeart}
//             <span>Direct Hiring</span>
//           </Nav.Link>
//         </Nav.Item>
//       );
//     } else if (TabActive === "Project based hiring") {
//       return (
//         <Nav.Item as="li">
//           <Nav.Link as="button" eventKey="Project based hiring">
//             {SVGICON.Folder}
//             <span>Project based hiring</span>
//           </Nav.Link>
//         </Nav.Item>
//       );
//     } else if (TabActive === "Talent Deployment") {
//       return (
//         <Nav.Item as="li">
//           <Nav.Link as="button" eventKey="Talent Deployment">
//             {SVGICON.SaleChart}
//             <span>Talent Deployment</span>
//           </Nav.Link>
//         </Nav.Item>
//       );
//     } else if (TabActive === "External Staffing") {
//       return (
//         <Nav.Item as="li">
//           <Nav.Link as="button" eventKey="External Staffing">
//             {SVGICON.Mobile}
//             <span>External Staffing</span>
//           </Nav.Link>
//         </Nav.Item>
//       );
//     } else {
//       return (
//         <>
//           <Nav.Item as="li">
//             <Nav.Link as="button" eventKey="Direct Hiring">
//               {SVGICON.SocialHeart}
//               <span>Direct Hiring</span>
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item as="li">
//             <Nav.Link as="button" eventKey="Project based hiring">
//               {SVGICON.Folder}
//               <span>Project based hiring</span>
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item as="li">
//             <Nav.Link as="button" eventKey="Talent Deployment">
//               {SVGICON.SaleChart}
//               <span>Talent Deployment</span>
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item as="li">
//             <Nav.Link as="button" eventKey="External Staffing">
//               {SVGICON.Mobile}
//               <span>External Staffing</span>
//             </Nav.Link>
//           </Nav.Item>
//         </>
//       );
//     }
//   })()}
// </Nav>

//                  {/* <p>Sathish</p> */}
//                  {/* <Form layout="vertical" >
      
//       </Form>  */}
      
//                 <Tab.Content>
//                     <Tab.Pane eventKey={'Direct Hiring'}>                                
//                     <div className="profile-tab">
// 								<div className="custom-tab-1">
// 									<Tab.Container defaultActiveKey={"All"}
							
// 							  >	
                
//            {/* <Divider >Basic Details</Divider> */}
//            <Form
//             form={form}
//              onFinish={onAddJobSubmit}
//               layout="vertical">
//            <Stepper activeStep={activeStep} orientation="vertical">
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel
            
//             >
//               {step.label}
//             </StepLabel>
//             <StepContent>
//                <p>{step.description}</p>
//               {/* <Typography>{step.description}</Typography> */}
             
//                 <div>
//                   {/* <Button
//                     variant="contained"
//                     onClick={handleNext}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     {index === steps.length - 1 ? 'Finish' : 'Continue'}
//                   </Button>
//                   <Button
//                     disabled={index === 0}
//                     onClick={handleBack}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     Back
//                   </Button> */}
//                 </div>
             
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
                
//                 </Form>
        
            
// 										{/* <Nav as='ul' className="nav nav-tabs">
// 											<Nav.Item as='li' className="nav-item">
// 												<Nav.Link to="#my-posts" eventKey='All'>Basic Detail</Nav.Link>
// 											</Nav.Item>
// 											<Nav.Item as='li' className="nav-item">
// 												<Nav.Link to="#about-me"  eventKey='Sent'>Job Description</Nav.Link>
// 											</Nav.Item>
// 											<Nav.Item as='li' className="nav-item">
// 												<Nav.Link to="#about-me"  eventKey='Paid'>Skills</Nav.Link>
// 											</Nav.Item>
									
// 										</Nav>
// 										<Tab.Content>
// 											<Tab.Pane id="my-posts"  eventKey='All'>
//      <div className='mt-3'>
      
    
      

// 		</div>											   
// 											</Tab.Pane>
// 											<Tab.Pane id="about-me" eventKey='Sent'>
			   
//           <div className="col_1 g_20">
//           <FormItem label="Job Description" name="job_description"
//         rules={[
//           {
//             required: true,
//             message: "Please Enter Job Description !",
//           },
//         ]}>
//                 <ReactQuill
//                   theme="snow"
//                   className="job_description"
//                   name="job_description"
//                   value={job_description}
//                   onChange={handleChangedescription}
//                 />
//      </FormItem>
//           </div>
//           <div className='d_f j_c_f_e g_10 '
          
//           >
//             <button type="button" className='btn btn-danger btn-sm' onClick={handleopenDrawerJob}>
//               Cancel
//             </button>
//             <button
//             className='btn btn-primary btn-sm'
//                type='primary'
//               htmlType="submit"
//               loading={addbuttonJob}
//             >
//              + Add Skill
//             </button>
//           </div>
           
                       
	 
												 
// 											</Tab.Pane>
// 											<Tab.Pane id="profile-settings" eventKey='Paid'>
//                        <div
//                         className='col_2 g_20 mt-3'>
//                        <FormItem label="Skills" name="skils"
//         rules={[
//           {
//             required: true,
//             message: "Please Select Skills!",
//           },
//         ]}>
//                 <Select
                 
//                   placeholder="Select Skill"
//                   showSearch
                  
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>}
//                   options={skillsdata}
//                 />
//               </FormItem>
//                        </div>
//                        <div className='d_f j_c_f_e g_10 '
          
//           >
//             <button type="button" className='btn btn-danger btn-sm' onClick={handleopenDrawerJob}>
//               Cancel
//             </button>
//             <button
//             className='btn btn-primary btn-sm'
//                type='primary'
//               htmlType="submit"
//               loading={addbuttonJob}
//             >
//               save
//             </button>
//           </div>
						   
												 
// 											</Tab.Pane>
				
				   
										
// 										</Tab.Content>	 */}
                   
// 									</Tab.Container>		
// 								</div>
// 							</div>	       
//                     </Tab.Pane>
//                     <Tab.Pane eventKey={'Project based hiring'}>
//                     <div className="profile-tab">
								
//                     <Radio.Group onChange={(e)=>setValue(e.target.value)} value={value}>
//       <Radio value="1">In House Project</Radio>
//       <Radio value="2">Client Project</Radio>
    
//     </Radio.Group>
                    
//                      {
//                        value == "1"  &&
//                        <>
//                             <Form
//             form={form1}
//              onFinish={onAddJobSubmit}
//               layout="vertical">
//            <Stepper activeStep={activeStep} orientation="vertical">
//         {steps1.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel
             
//             >
//               {step.label}
//             </StepLabel>
//             <StepContent>
//                <p>{step.description}</p>
//               {/* <Typography>{step.description}</Typography> */}
             
//                 <div>
//                   {/* <Button
//                     variant="contained"
//                     onClick={handleNext}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     {index === steps.length - 1 ? 'Finish' : 'Continue'}
//                   </Button>
//                   <Button
//                     disabled={index === 0}
//                     onClick={handleBack}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     Back
//                   </Button> */}
//                 </div>
             
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
                
//                 </Form>
//                        </>


                       

//                      }
// 							</div>	 
//                     </Tab.Pane>
//                     <Tab.Pane eventKey={'Talent Deployment'}>
//                     <div className="profile-tab">
// 								<div className="custom-tab-1">
             
// 									<Tab.Container defaultActiveKey={"All"}
							
// 							  >					
// 										<Nav as='ul' className="nav nav-tabs">
// 											<Nav.Item as='li' className="nav-item">
// 												<Nav.Link to="#my-posts" eventKey='All'>Basic Detail</Nav.Link>
// 											</Nav.Item>
// 											<Nav.Item as='li' className="nav-item">
// 												<Nav.Link to="#about-me"  eventKey='Sent'>Job Description</Nav.Link>
// 											</Nav.Item>
// 											<Nav.Item as='li' className="nav-item">
// 												<Nav.Link to="#about-me"  eventKey='Paid'>Skills</Nav.Link>
// 											</Nav.Item>
									
// 										</Nav>
// 										<Tab.Content>
// 											<Tab.Pane id="my-posts"  eventKey='All'>
//      <div className='mt-3'>
      
//         <div
//          className='col_4 g_20'>
//                <FormItem label="Client Name" name="client_id" 
            
//               rules={[
//                 {
//                   required: true,
//                   message: "Please Select Client Name!",
//                 },
               
//               ]}>
//              <Input
//              placeholder=""
             
              
//              />
//             </FormItem>
//             <FormItem label="Project Duration"
//              name="project_duration"
//              >
//              <DatePicker
//               style={{
//                  width:"280px"
//               }}
//              placeholder="Select Project Duration "
             
             
              
//              />
//             </FormItem>
//             <FormItem label="Work Location"
//              name="job_title"
//               >
//              <Input
//              placeholder=" Enter Job Title"
             
              
//              />
//             </FormItem>
//             <FormItem label="No of Posistions"
//              name="no_of_positions"
//            >
//              <Input
            
             
              
//              />
//             </FormItem>
//         </div>
      
//         <div
//          className='col_4 g_20'>
//            <FormItem
//                 label="Job Type"
//                 name="job_type"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please Enter Job Type!",
//                   },
//                 ]}
//               >
//                 <Select placeholder="Select Job Type"
                
//                 showSearch
//                allowClear
//                options={[
//                 {
//                  label:"Full Time",
//                  value:"Full Time"
//                },
//                {
//                 label:"Part Time",
//                 value:"Part Time"
//               },{
//                 label:"Contract",
//                 value:"Contract"
//               },

//               ]}
//                  onChange={handleJobtypeChange}>
                
//                 </Select>
//             </FormItem>

//             <FormItem label="Experience" className='h_10 h_100_sm'    rules={[
//     {
//       required: true,
//       message: "Please Select Experience!",
//     },
//   ]}
//   hasFeedback
//   validateStatus={
//     form.getFieldError("exp_from") 
//       ? "error"
//       : ""
//   }>
//            <div className="d_f a_i_c experience g_10 f_w_w_sm g_5_sm">
//                 <FormItem name="exp_from"  >
//                   <Select options={options}
//                      />
//                 </FormItem>
//                 <FormItem>to</FormItem>
//                 <FormItem name="exp_to">
//                   <Select options={options} defaultValue={0}/>
//                 </FormItem>
//               </div>
//            </FormItem>
//             <FormItem label="Client Budget" name="salary"
                 
//                  rules={[
//                   {
//                     required: true,
//                     message: "Please Enter Client Budget!",
//                   },
//                 ]}
//                 getValueFromEvent={(e) => {
//                    console.log("ffff",e)
//                   const numericValue = e.target.value.replace(/[^0-9]/g, '');
//                   return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
//                 }}
//                 >
//               {jobType == "Full Time" ? (
//                     <Input
//                     addonAfter={
//                       <p className="m_10">LPA</p>
                        
                   
//                     }
                    
//                     placeholder="1,00,000"  />
//                   ) : (
//                     <Input
                    
//                       className='salary'
//                       placeholder={salaryType=="Per Hour"? "1,000":"1,00,000"}
//                       addonAfter={
//                         <Select
//                          defaultValue={salaryType}
//                           style={{ width: 100 }}
//                            onChange={handleChangeSalary}
//                         >
//                           <Option value="Monthly">Monthly</Option>
//                           <Option value="Per Hour">Hourly</Option>
//                         </Select>
//                       }
//                     />
//                   )}
//                 </FormItem>
//                   <FormItem label="Joining Availability" name="joing_avaliability">
//                 <Select placeholder="Select Joining Availability"
//                  allowClear
//                   showSearch
//                  optionFilterProp="children"
//                  filterOption={(input, option) =>
//                  (option?.label.toLowerCase()?? "").includes(input.toLowerCase())
//                  }
//                  filterSort={(optionA, optionB) =>
//                  (optionA?.label ?? "")
//                  .toLowerCase()
//                  .localeCompare((optionB?.label ?? "").toLowerCase())
//                  }
                
//                 >
//                   <Option value="Immediately" label="Immediately">
//                     <Space>Immediately</Space>
//                   </Option>
//                   <Option value="Less Then 15 Days" label="Less Then 15 Days">
//                     <Space>Less Then 15 Days</Space>
//                   </Option>
//                   <Option value="Less Then 30 Days" label="Less Then 30 Days">
//                     <Space>Less Then 30 Days</Space>
//                   </Option>
//                   <Option value="More Then 30 Days" label="More Then 30 Days">
//                     <Space>More Then 30 Days</Space>
//                   </Option>
//                 </Select>
//               </FormItem>


         
         
         
//         </div>
//         <div className='d_f j_c_f_e g_10 '
          
//           >
//             <button type="button" className='btn btn-danger btn-sm' onClick={handleopenDrawerJob}>
//               Cancel
//             </button>
//             <button
//             className='btn btn-primary btn-sm'
//                type='primary'
//               htmlType="submit"
//               loading={addbuttonJob}
//             >
//               Next
//             </button>
//           </div>

// 		</div>											   
// 											</Tab.Pane>
// 											<Tab.Pane id="about-me" eventKey='Sent'>
			   
//           <div className="col_4 g_20">
//           <FormItem label="Job ID"
//              name="job_id"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please Enter Job ID!",
//                 },
//               ]}>
//              <Input
              
// activeBorderColor="red"



             
           
//               placeholder=' Enter Job ID'/>
//             </FormItem>
//             <FormItem label="Job Title"
//              name="job_title"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please Enter Job Title!",
//                 },
//                 {
//                   pattern: new RegExp(/^[a-zA-Z\s]+$/),
//                   message: "field does not accept numbers",
//                 },
//               ]}>
//              <Input
//              placeholder=" Enter Job Title"
             
              
//              />
//             </FormItem>
       
//           </div>
//           <FormItem label="Job Description" name="job_description"
//         rules={[
//           {
//             required: true,
//             message: "Please Enter Job Description !",
//           },
//         ]}>
//                 <ReactQuill
//                   theme="snow"
//                   className="job_description"
//                   name="job_description"
//                   value={job_description}
//                   onChange={handleChangedescription}
//                 />
//      </FormItem>
//           <div className='d_f j_c_f_e g_10 '
          
//           >
//             <button type="button" className='btn btn-danger btn-sm' onClick={handleopenDrawerJob}>
//               Cancel
//             </button>
//             <button
//             className='btn btn-primary btn-sm'
//                type='primary'
//               htmlType="submit"
//               loading={addbuttonJob}
//             >
//               Next
//             </button>
//           </div>
           
                       
	 
												 
// 											</Tab.Pane>
// 											<Tab.Pane id="profile-settings" eventKey='Paid'>
//                        <div
//                         className='col_2 g_20 mt-3'>
//                        <FormItem label="Skills" name="skils"
//         rules={[
//           {
//             required: true,
//             message: "Please Select Skills!",
//           },
//         ]}>
//                 <Select
                 
//                   placeholder="Select Skill"
//                   showSearch
                  
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>}
//                   options={skillsdata}
//                 />
//               </FormItem>
//                        </div>
//                        <div className='d_f j_c_f_e g_10 '
          
//           >
//             <button type="button" className='btn btn-danger btn-sm' onClick={handleopenDrawerJob}>
//               Cancel
//             </button>
//             <button
//             className='btn btn-primary btn-sm'
//                type='primary'
//               htmlType="submit"
//               loading={addbuttonJob}
//             >
//               save
//             </button>
//           </div>
						   
												 
// 											</Tab.Pane>
				
				
										
// 										</Tab.Content>	
// 									</Tab.Container>		
                 
// 								</div>
// 							</div>	 
//                     </Tab.Pane>
//                     <Tab.Pane eventKey={'External Staffing'}>
               
//                     </Tab.Pane>
                 
//                 </Tab.Content>               
//             </Tab.Container>

          
         
//              </div>
//              <Modal
//         title="Add Description and Skills"
//         visible={modalVisible}
//         footer={null}
//         onCancel={handleCancel}
//         width={600}
//       >
//         <Tabs activeKey={activeTab} onChange={setActiveTab}>
//           <TabPane tab="Description" key="description">
//             <Form layout="vertical">

//             <Form.Item label="Job Description" name="job_description"
//         rules={[
//           {
//             required: true,
//             message: "Please Enter Job Description !",
//           },
//         ]}>
//                 <ReactQuill
//                   theme="snow"
//                   className="job_description"
//                   name="job_description"
//                   value={description}
//                   onChange={(e) => setDescription(e)}
//                 />
//      </Form.Item>
              
//             </Form>
//           </TabPane>
//           <TabPane tab="Skills" key="skills">
//             <Form layout="vertical">
//               <div
//                style={{
//                  zIndex: 1,
//                }}>
//               <Form.Item label="Skills" name="skils"
//         rules={[
//           {
//             required: true,
//             message: "Please Select Skills!",
//           },
//         ]}>
//                 <Select
//                   style={{
//                      width:"280px",
//                      zIndex:1
//                   }}
                  
//                   placeholder="Select Skill"
//                   showSearch
                  
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>}
//                   options={skillsdata}
//                 />
//               </Form.Item>
//               </div>
//             </Form>
//           </TabPane>
//         </Tabs>
//         <div style={{ marginTop: 16 }}
//          className='d_f j_c_f_e a_i_c'>
//           <button
//             onClick={handleBack1}
//              className='btn btn-sm btn-danger'
//             disabled={activeTab === 'description'}
//             style={{ marginRight: 8  }}
//           >
//             Back
//           </button>
//           {activeTab === 'skills' ? (
//             <button className='btn btn-sm btn-primary' type="submit" onClick={handleOk}>
//               Save
//             </button>
//           ) : (
//             <button className='btn btn-sm btn-primary' type="primary" onClick={handleNext1}>
//                + Add Skill
//             </button>
//           )}
//         </div>
//       </Modal>
//        {/* <Form
//       onFinish={onAddJobSubmit}
//       form={form}
//         layout='vertical'>
//          <div className='col_2 g_20 col_1_sm g_5_sm m_t_10 '>
//             <FormItem label="Job ID"
//              name="job_id"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please Enter Job ID!",
//                 },
//               ]}>
//              <Input
              
// activeBorderColor="red"



             
           
//               placeholder=' Enter Job ID'/>
//             </FormItem>
//          </div>
//          <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
//             <FormItem label="Job Title"
//              name="job_title"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please Enter Job Title!",
//                 },
//                 {
//                   pattern: new RegExp(/^[a-zA-Z\s]+$/),
//                   message: "field does not accept numbers",
//                 },
//               ]}>
//              <Input
//              placeholder=" Enter Job Title"
             
              
//              />
//             </FormItem>
//             <FormItem
//                 label="Job Type"
//                 name="job_type"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please Enter Job Type!",
//                   },
//                 ]}
//               >
//                 <Select placeholder="Select Job Type"
                
//                 showSearch
//                allowClear
//                options={[
//                 {
//                  label:"Full Time",
//                  value:"Full Time"
//                },
//                {
//                 label:"Part Time",
//                 value:"Part Time"
//               },{
//                 label:"Contract",
//                 value:"Contract"
//               },

//               ]}
//                  onChange={handleJobtypeChange}>
                
//                 </Select>
//             </FormItem>
            
//          </div>
//          <div className='col_2 g_20 col_1_sm g_5_sm m_t_1 '>
       
//            <FormItem label="Experience" className='h_10 h_100_sm'    rules={[
//     {
//       required: true,
//       message: "Please Select Experience!",
//     },
//   ]}
//   hasFeedback
//   validateStatus={
//     form.getFieldError("exp_from") 
//       ? "error"
//       : ""
//   }>
//            <div className="d_f a_i_c experience g_10 f_w_w_sm g_5_sm">
//                 <FormItem name="exp_from"  >
//                   <Select options={options}
//                      />
//                 </FormItem>
//                 <FormItem>to</FormItem>
//                 <FormItem name="exp_to">
//                   <Select options={options} defaultValue={0}/>
//                 </FormItem>
//               </div>
//            </FormItem>
//            <FormItem
//                 label="Client Name"
//                 name="client_id"
              
                
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please Select Client Name!",
//                   },
//                 ]}
//               >
//                 <Cascader
//                   style={{
//                     width:"280px"
//                   }}
//                  placeholder="Select Client" options={clientsData}
//                            showSearch
//                            optionFilterProp="children"
//           filterOption={(input, option) =>
//           (option?.label.toLowerCase()?? "").includes(input.toLowerCase())
//           }
//           filterSort={(optionA, optionB) =>
//           (optionA?.label ?? "")
//           .toLowerCase()
//           .localeCompare((optionB?.label ?? "").toLowerCase())
//           }
//                   dropdownRender={(menu) => (
//                     <div style={{ width: '300px' }}>{menu}</div>
//                   )}
//                  onChange={handleClientChange} 
//                  />
//               </FormItem>
//          </div>
//          <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
       
//          <FormItem label="End Client" name="end_client">
//                   <Select
                 
//                   placeholder="Select EndClient"
//                   width={260}
//                   showSearch
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>
//                 }
//                  options={EndClientdata}
//                 />
//               </FormItem>
//               <FormItem label="POC" name="poc">
//                   <Select
//                   style={{
//                     // width: 300,
//                   }}
//                   placeholder="Select POC"
//                   showSearch
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>}
//                   options={Pocdata}
//                 />
//                 </FormItem>
//     </div>
//     <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
       
//     <FormItem label="Job Location" name="job_location"
//        rules={[
//         {
//           required: true,
//           message: "Please Select Job Location!",
//         },
//       ]}>
//                   <Select
                  
//                   placeholder="Select Location"
//                   showSearch
//                   allowClear
//                   optionFilterProp="children"
//  filterOption={(input, option) =>
//  (option?.label.toLowerCase()?? "").includes(input.toLowerCase())
//  }
//  filterSort={(optionA, optionB) =>
//  (optionA?.label ?? "")
//  .toLowerCase()
//  .localeCompare((optionB?.label ?? "").toLowerCase())
//  }
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>}
//                   options={locationsdata}
//                 />
//               </FormItem>
//               <FormItem label="Client Budget" name="salary"
                 
//                  rules={[
//                   {
//                     required: true,
//                     message: "Please Enter Client Budget!",
//                   },
//                 ]}
//                 getValueFromEvent={(e) => {
//                    console.log("ffff",e)
//                   const numericValue = e.target.value.replace(/[^0-9]/g, '');
//                   return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
//                 }}
//                 >
//               {jobType == "Full Time" ? (
//                     <Input
//                     addonAfter={
//                       <p className="m_10">LPA</p>
                        
                   
//                     }
                    
//                     placeholder="1,00,000"  />
//                   ) : (
//                     <Input
                    
//                       className='salary'
//                       placeholder={salaryType=="Per Hour"? "1,000":"1,00,000"}
//                       addonAfter={
//                         <Select
//                          defaultValue={salaryType}
//                           style={{ width: 100 }}
//                            onChange={handleChangeSalary}
//                         >
//                           <Option value="Monthly">Monthly</Option>
//                           <Option value="Per Hour">Hourly</Option>
//                         </Select>
//                       }
//                     />
//                   )}
//                 </FormItem>
//   </div>
//   <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
//           <FormItem
//                 label="Required No. of Candidates"
//                 name="required_no_of_candidates"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please Enter Required No. of Candidates!",
//                   },
//                 ]}
//               >
//                 <Input placeholder="Enter Value" type="number" />
//               </FormItem>
//               <FormItem label="Joining Availability" name="joing_avaliability">
//                 <Select placeholder="Select Joining Availability"
//                  allowClear
//                   showSearch
//                  optionFilterProp="children"
//                  filterOption={(input, option) =>
//                  (option?.label.toLowerCase()?? "").includes(input.toLowerCase())
//                  }
//                  filterSort={(optionA, optionB) =>
//                  (optionA?.label ?? "")
//                  .toLowerCase()
//                  .localeCompare((optionB?.label ?? "").toLowerCase())
//                  }
                
//                 >
//                   <Option value="Immediately" label="Immediately">
//                     <Space>Immediately</Space>
//                   </Option>
//                   <Option value="Less Then 15 Days" label="Less Then 15 Days">
//                     <Space>Less Then 15 Days</Space>
//                   </Option>
//                   <Option value="Less Then 30 Days" label="Less Then 30 Days">
//                     <Space>Less Then 30 Days</Space>
//                   </Option>
//                   <Option value="More Then 30 Days" label="More Then 30 Days">
//                     <Space>More Then 30 Days</Space>
//                   </Option>
//                 </Select>
//               </FormItem>
//      </div>
//      <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
//      <FormItem label="Skills" name="skils"
//         rules={[
//           {
//             required: true,
//             message: "Please Select Skills!",
//           },
//         ]}>
//                 <Select
                 
//                   placeholder="Select Skill"
//                   showSearch
                  
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>}
//                   options={skillsdata}
//                 />
//               </FormItem>
//      </div>
//      <div className='col_1 g_20 col_1_sm g_5_sm m_t_1'>
//      <FormItem label="Job Description" name="job_description"
//         rules={[
//           {
//             required: true,
//             message: "Please Enter Job Description !",
//           },
//         ]}>
//                 <ReactQuill
//                   theme="snow"
//                   className="job_description"
//                   name="job_description"
//                   value={job_description}
//                   onChange={handleChangedescription}
//                 />
//      </FormItem>
//      </div>

//      <div className='d_f j_c_f_e g_10 '
          
//           >
//             <button type="button" className='btn btn-danger btn-sm' onClick={handleopenDrawerJob}>
//               Cancel
//             </button>
//             <button
//             className='btn btn-primary btn-sm'
//                type='primary'
//               htmlType="submit"
//               loading={addbuttonJob}
//             >
//               Save
//             </button>
//           </div>
     
//        </Form> */}
    
      
//         </>
//     ) 
// }


// export default AddJob;


import { useContext,useState,useEffect} from 'react';
import JobContext from '../../Providers/JobProvider';
import {Space,Cascader} from "antd"
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { Button, Input,Form, FormItem ,Select} from '../../Utils/Formelements';
import { useForm } from 'antd/es/form/Form';



const AddJob=({handleopenDrawerJob})=>{
 const {addJob,addbuttonJob,clients,handleClientChange,skill,location,poc,endclient,setAddButton,init} = useContext(JobContext);
 const [jobType, setJobType] = useState("Full Time");
 const [salaryType, setSalaryType] = useState("Monthly");
 const [job_description, setJobDescription] = useState("");
 const [form] = useForm();



 const options = [{
  label:0,
  value:0
 }];
     for (let i = 1; i <= 20; i++) {
    options.push({
      label:i,
      value: i,
    });
  }

  const menuThree = (parent, menu) => {
    const filter = menu?.filter((e) => {
      return String(e?.parent?._id||null) === String(parent) });
      console.log(filter,("filter"));
      const list = filter?.map((e) => {
        return {
          label: e?.name,
          value: e?._id,
          children: menuThree(e?._id, menu)
           
        }})
        return list
        
     
    ;}

    let skillsdata = [];
    skill?.map((item,i) => {
     skillsdata.push({
      key:i,
       label: item?.name,
       value: item?.name,
     });
   });
   let locationsdata=[]
   location?.map((item,i) => {
     locationsdata.push({
      key:i,
       label: item?.name,
       value: item?.name,
     });
   });
   let Pocdata=[]
   poc?.contact_persons?.map((item) => {
    Pocdata.push({
      label: item?.name,
      value: item?.name,
    });
  });
  let EndClientdata=[]
  endclient?.map((item) => {
   EndClientdata.push({
     label: item?.name,
     value: item?.name
   });
 });

    const clientsData= menuThree(null,clients)
    console.log('clientsData:', clientsData);

    const handleJobtypeChange=(e)=>{
      if(e =="Full Time"){
        setSalaryType("LPA")  
      setJobType(e)
          
      } 
      else{
      setJobType(e)

      }
    }
    const handleChangeSalary =(e)=>{
      setSalaryType(e)
    }
    const handleChangedescription = (value) => {
      setJobDescription(value)
    };
    const onAddJobSubmit=(values)=>{
      setAddButton(true)
    
      let sendData ={
         ...values,
         salary:Number(values["salary"]?.replace(/,/g, '')||""),
         exp_to:values["exp_to"]||0,
        required_no_of_candidates:values["required_no_of_candidates"]?values["required_no_of_candidates"]:0,
         salaryType:salaryType,
         job_description:job_description,
      }
console.log(salary);
      addJob(sendData,form)
      setJobDescription("")
      setSalaryType("Monthly")
  
      }


      useEffect(() => {
        init()
      }, [])


      const customInputStyle = {
        '& .ant-input:focus, & .ant-input-focused': {
          borderColor: '#ff4d4f', // Primary red color
          boxShadow: '0 0 0 2px rgba(255, 77, 79, 0.2)',
        },
      };
      
 return( 
     <>
       <Form
      onFinish={onAddJobSubmit}
      form={form}
        layout='vertical'>
         <div className='col_2 g_20 col_1_sm g_5_sm m_t_10 '>
            <FormItem label="Job ID"
             name="job_id"
              rules={[
                {
                  required: true,
                  message: "Please Enter Job ID!",
                },
              ]}>
             <Input
              
activeBorderColor="red"



             
           
              placeholder=' Enter Job ID'/>
            </FormItem>
         </div>
         <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
            <FormItem label="Job Title"
             name="job_title"
              rules={[
                {
                  required: true,
                  message: "Please Enter Job Title!",
                },
                {
                  pattern: new RegExp(/^[a-zA-Z\s]+$/),
                  message: "field does not accept numbers",
                },
              ]}>
             <Input
             placeholder=" Enter Job Title"
             
              
             />
            </FormItem>
            <FormItem
                label="Job Type"
                name="job_type"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Job Type!",
                  },
                ]}
              >
                <Select placeholder="Select Job Type"
                
                showSearch
               allowClear
               options={[
                {
                 label:"Full Time",
                 value:"Full Time"
               },
               {
                label:"Part Time",
                value:"Part Time"
              },{
                label:"Contract",
                value:"Contract"
              },

              ]}
                 onChange={handleJobtypeChange}>
                
                </Select>
            </FormItem>
            
         </div>
         <div className='col_2 g_20 col_1_sm g_5_sm m_t_1 '>
       
           <FormItem label="Experience" className='h_10 h_100_sm'    rules={[
    {
      required: true,
      message: "Please Select Experience!",
    },
  ]}
  hasFeedback
  validateStatus={
    form.getFieldError("exp_from") 
      ? "error"
      : ""
  }>
           <div className="d_f a_i_c experience g_10 f_w_w_sm g_5_sm">
                <FormItem name="exp_from"  >
                  <Select options={options}
                     />
                </FormItem>
                <FormItem>to</FormItem>
                <FormItem name="exp_to">
                  <Select options={options} defaultValue={0}/>
                </FormItem>
              </div>
           </FormItem>
           <FormItem
                label="Client Name"
                name="client_id"
              
                
                rules={[
                  {
                    required: true,
                    message: "Please Select Client Name!",
                  },
                ]}
              >
                <Cascader
                  style={{
                    width:"280px"
                  }}
                 placeholder="Select Client" options={clientsData}
                           showSearch
                           optionFilterProp="children"
          filterOption={(input, option) =>
          (option?.label.toLowerCase()?? "").includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
          }
                  dropdownRender={(menu) => (
                    <div style={{ width: '300px' }}>{menu}</div>
                  )}
                 onChange={handleClientChange} 
                 />
              </FormItem>
         </div>
         <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
       
         <FormItem label="End Client" name="end_client">
                  <Select
                 
                  placeholder="Select EndClient"
                  width={260}
                  showSearch
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>
                }
                 options={EndClientdata}
                />
              </FormItem>
              <FormItem label="POC" name="poc">
                  <Select
                  style={{
                    // width: 300,
                  }}
                  placeholder="Select POC"
                  showSearch
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={Pocdata}
                />
                </FormItem>
    </div>
    <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
       
    <FormItem label="Job Location" name="job_location"
       rules={[
        {
          required: true,
          message: "Please Select Job Location!",
        },
      ]}>
                  <Select
                  
                  placeholder="Select Location"
                  showSearch
                  allowClear
                  optionFilterProp="children"
 filterOption={(input, option) =>
 (option?.label.toLowerCase()?? "").includes(input.toLowerCase())
 }
 filterSort={(optionA, optionB) =>
 (optionA?.label ?? "")
 .toLowerCase()
 .localeCompare((optionB?.label ?? "").toLowerCase())
 }
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={locationsdata}
                />
              </FormItem>
              <FormItem label="Client Budget" name="salary"
                 
                 rules={[
                  {
                    required: true,
                    message: "Please Enter Client Budget!",
                  },
                ]}
                getValueFromEvent={(e) => {
                   console.log("ffff",e)
                  const numericValue = e.target.value.replace(/[^0-9]/g, '');
                  return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
                }}
                >
              {jobType == "Full Time" ? (
                    <Input
                    addonAfter={
                      <p className="m_10">LPA</p>
                        
                   
                    }
                    
                    placeholder="1,00,000"  />
                  ) : (
                    <Input
                    
                      className='salary'
                      placeholder={salaryType=="Per Hour"? "1,000":"1,00,000"}
                      addonAfter={
                        <Select
                         defaultValue={salaryType}
                          style={{ width: 100 }}
                           onChange={handleChangeSalary}
                        >
                          <Option value="Monthly">Monthly</Option>
                          <Option value="Per Hour">Hourly</Option>
                        </Select>
                      }
                    />
                  )}
                </FormItem>
  </div>
  <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
          <FormItem
                label="Required No. of Candidates"
                name="required_no_of_candidates"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Required No. of Candidates!",
                  },
                ]}
              >
                <Input placeholder="Enter Value" type="number" />
              </FormItem>
              <FormItem label="Joining Availability" name="joing_avaliability">
                <Select placeholder="Select Joining Availability"
                 allowClear
                  showSearch
                 optionFilterProp="children"
                 filterOption={(input, option) =>
                 (option?.label.toLowerCase()?? "").includes(input.toLowerCase())
                 }
                 filterSort={(optionA, optionB) =>
                 (optionA?.label ?? "")
                 .toLowerCase()
                 .localeCompare((optionB?.label ?? "").toLowerCase())
                 }
                
                >
                  <Option value="Immediately" label="Immediately">
                    <Space>Immediately</Space>
                  </Option>
                  <Option value="Less Then 15 Days" label="Less Then 15 Days">
                    <Space>Less Then 15 Days</Space>
                  </Option>
                  <Option value="Less Then 30 Days" label="Less Then 30 Days">
                    <Space>Less Then 30 Days</Space>
                  </Option>
                  <Option value="More Then 30 Days" label="More Then 30 Days">
                    <Space>More Then 30 Days</Space>
                  </Option>
                </Select>
              </FormItem>
     </div>
     <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
     <FormItem label="Skills" name="skils"
        rules={[
          {
            required: true,
            message: "Please Select Skills!",
          },
        ]}>
                <Select
                 
                  placeholder="Select Skill"
                  showSearch
                  
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={skillsdata}
                />
              </FormItem>
     </div>
     <div className='col_1 g_20 col_1_sm g_5_sm m_t_1'>
     <FormItem label="Job Description" name="job_description"
        rules={[
          {
            required: true,
            message: "Please Enter Job Description !",
          },
        ]}>
                <ReactQuill
                  theme="snow"
                  className="job_description"
                  name="job_description"
                  value={job_description}
                  onChange={handleChangedescription}
                />
     </FormItem>
     </div>

     <div className='d_f j_c_f_e g_10 '
          
          >
            <button type="button" className='btn btn-danger btn-sm' onClick={handleopenDrawerJob}>
              Cancel
            </button>
            <button
            className='btn btn-primary btn-sm'
               type='primary'
              htmlType="submit"
              loading={addbuttonJob}
            >
              Save
            </button>
          </div>
     
       </Form>
    
      
        </>
    ) 
}


export default AddJob;
