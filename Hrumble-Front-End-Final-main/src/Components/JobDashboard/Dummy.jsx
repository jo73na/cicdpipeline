// import {  Form, Row, Col, Input, Select, Button, message, Modal, Cascader } from "antd";
// import { useState,useEffect, useContext } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   StepContent,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// import {  DollarOutlined } from "@ant-design/icons";
// import { BiRupee } from "react-icons/bi";
// import JobContext from '../../../Providers/JobProvider';
// import {FormItem} from '../../../Utils/Formelements';
 
// const { Option } = Select;
 
// const TalentDeploymentForm = ({onDiscard,primarySelected, secondarySelected}) => {
 
//   const [form] = Form.useForm();
//   const [contractType, setContractType] = useState("");
//   const [formData, setFormData] = useState({});
//   const [activeStep, setActiveStep] = useState(0);
//   const [salaryType, setSalaryType] = useState("LPA");
//   const [job_description, setjob_description] = useState("");
//   const [currency, setCurrency] = useState("INR");
 
//   // New state for modal
//   const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
//   const [currentResourceIndex, setCurrentResourceIndex] = useState(null);
//   const [tempDescription, setTempDescription] = useState("");
//   const [noticeType, setNoticeType] = useState("");
//  const {addJob, clients,handleClientChange, EndClientdata,Pocdata} = useContext(JobContext);

 
 
//   const jobInfoFields = [
//     'contractType',
//     'job_id',
//     'job_title',
//     'required_no_of_candidates',
//     'notice_period',
//     'job_location',
   
//   ];
//    // Step 2: Experience & Salary Fields
//    const experienceFields = [
//     'exp_from',
//     'exp_to',
//     ['salary', 'amount'],
//     ['salary', 'type']
//   ];
// // step 3: Client Details
//   const clientFields =[
//     'client_id',
//     'clientBudget',
//     'end_client',
//     'poc',
//   ];
 
//    // Step 4: Job Description Field
//    const descriptionFields = ['job_description'];
 
// // Map steps to their required fields
// const stepValidationFields = {
//   0: jobInfoFields,
//   1: experienceFields,
//   2: clientFields,
//   3: descriptionFields
// };
 
//   // Comprehensive list of Indian cities
//   const indianCities = [
//     "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad", "Ambala", "Amritsar",
//     "Aurangabad", "Bangalore", "Bareilly", "Belgaum", "Bhilai", "Bhiwandi",
//     "Bhopal", "Bhubaneswar", "Bikaner", "Bilaspur", "Chandigarh", "Chennai",
//     "Coimbatore", "Cuttack", "Dehradun", "Delhi", "Dhanbad", "Durgapur",
//     "Erode", "Faridabad", "Firozabad", "Ghaziabad", "Goa", "Gorakhpur",
//     "Gulbarga", "Guntur", "Gurgaon", "Guwahati", "Gwalior", "Hubli", "Hyderabad",
//     "Indore", "Jabalpur", "Jaipur", "Jalandhar", "Jammu", "Jamnagar", "Jamshedpur",
//     "Jhansi", "Jodhpur", "Kakinada", "Kannur", "Kanpur", "Kochi", "Kolhapur",
//     "Kolkata", "Kota", "Kozhikode", "Kurnool", "Lucknow", "Ludhiana", "Madurai",
//     "Mangalore", "Meerut", "Mumbai", "Mysore", "Nagpur", "Nashik", "Nellore",
//     "Noida", "Patna", "Pondicherry", "Pune", "Raipur", "Rajkot", "Ranchi",
//     "Rourkela", "Salem", "Sangli", "Shimla", "Siliguri", "Solapur", "Srinagar",
//     "Surat", "Thiruvananthapuram", "Thrissur", "Tiruchirappalli", "Tirunelveli",
//     "Tiruppur", "Ujjain", "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam",
//     "Warangal"
//   ].sort();
 
 
//   const handleChangedescription = (value) => {
//     setjob_descriptionResource(value);
//   };
 
// // Function to format the input with commas
// const formatSalary = (value) => {
//   if (!value) return '';
//   return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// };

// // Function to remove commas from the formatted string
// const removeCommas = (value) => {
//   return value.replace(/,/g, '');
// };

 
//   useEffect(() => {
//     if (contractType === "Full Time") {
//       setSalaryType("LPA"); // For Full Time, default salary type is LPA
//     } else if (contractType === "Contract") {
//       setSalaryType("Monthly"); // For Contract, default salary type is Monthly
//     } else if (contractType === "Both") {
//       setSalaryType("LPA"); // For Both, default salary type is LPA
//     }
//   }, [contractType]);
 
//   const validateCurrentStep = async () => {
//     try {
//       const currentFields = stepValidationFields[activeStep];
//       if (!currentFields) return true;
 
//       // Step 1 Validation
//      // Step 1 Validation
// if (activeStep === 0) {
//   // Commented out the required validation for contractType
//   // if (!contractType) {
//   //   message.error("Please select a contract type!");
//   //   return false;
//   // }
//   // await form.validateFields(jobInfoFields);
// }

// // Step 2 Validation
// else if (activeStep === 1) {
//   const values = await form.validateFields(experienceFields);
//   // Commented out the experience range validation
//   // const expFrom = values.exp_from;
//   // const expTo = values.exp_to;
//   // if (expTo < expFrom) {
//   //   message.error("Maximum experience should be greater than minimum experience!");
//   //   return false;
//   // }
//   // Commented out the salary validation
//   // const salaryAmount = values.salary?.amount;
//   // if (salaryAmount <= 0) {
//   //   message.error("Salary amount must be greater than 0!");
//   //   return false;
//   // }
// }

// // Step 3 Validation
// else if (activeStep === 2) {
//   const values = await form.validateFields(clientFields);
//   // Commented out the client budget validation
//   // const Cbudget = values.clientBudget;
//   // if (Cbudget <= 0) {
//   //   message.error("Budget should be greater than 0!");
//   //   return false;
//   // }
//   // Commented out the check for at least one client detail filled
//   // else if (!values.client_id && !values.clientBudget && !values.end_client && !values.poc) {
//   //   message.error("Please fill at least one of the client details!");
//   //   return false;
//   // }
//   await form.validateFields(clientFields);
// }

// // Step 4 Validation
// else if (activeStep === 3) {
//   // Commented out the job description validation
//   // if (!job_description || job_description.replace(/<[^>]*>/g, '').trim().length < 100) {
//   //   message.error("Job description must be at least 100 characters long!");
//   //   return false;
//   // }
//   // form.setFieldsValue({ job_description });
// }
 
//       return true;
//     } catch (error) {
//       if (error.errorFields) {
//         const errorMessages = error.errorFields.map(field => field.errors[0]).join(', ');
//         message.error(`Please fix the following errors: ${errorMessages}`);
//       } else {
//         message.error("Please fill all required fields correctly!");
//       }
//       return false;
//     }
//   };
 
//   const showDescriptionModal = (index) => {
//     setCurrentResourceIndex(index);
//     const currentDesc = form.getFieldValue(['jobs', index, 'description']) || '';
//     setTempDescription(currentDesc);
//     setIsDescriptionModalVisible(true);
//   };
 
//   const handleModalOk = () => {
//     if (currentResourceIndex !== null) {
//       form.setFieldsValue({
//         jobs: form.getFieldValue('jobs').map((job, index) => {
//           if (index === currentResourceIndex) {
//             return { ...job, description: tempDescription };
//           }
//           return job;
//         })
//       });
//     }
//     setIsDescriptionModalVisible(false);
//   };
 
//   const handleModalCancel = () => {
//     setIsDescriptionModalVisible(false);
//     setTempDescription("");
//     setCurrentResourceIndex(null);
//   };
 
//   const handleNext = async () => {
//     const isValid = await validateCurrentStep();
//     if (isValid) {
//       const currentValues = form.getFieldsValue();
//       setFormData({ ...formData, ...currentValues });
//       setActiveStep(prev => prev + 1);
//     }
//   };
 
//   const handleBack = () => {
//     setActiveStep(prev => prev - 1);
//   };
 
//   const handleSubmit = async (formValues) => {
//     const isValid = await validateCurrentStep();
  
//     if (isValid) {
//       try {
//         // Validate the form fields and get the latest values
//         const validatedValues = await form.validateFields();
  
//         // Ensure the salary fields are correctly structured
//         const cleanedAmount = removeCommas(validatedValues.salary?.amount);
//         const salaryType = validatedValues.salary?.type || formData.salary?.type;
  
//         // Construct the final data object
//         const finalData = {
//           ...formData,
//           ...validatedValues,
//           salary: {
//             amount: cleanedAmount ? parseFloat(cleanedAmount) : 0, // Convert to number
//             type: salaryType,
//           },
//           primarySelected,
//           secondarySelected,
//           job_description,
//         };
  
//         // Ensure both `type` and `amount` are included before sending
//         if (!finalData.salary.amount || !finalData.salary.type) {
//           throw new Error("Salary type and amount are required");
//         }
  
//         console.log("Final Form Data:", finalData);
  
//         // Submit the data to the backend
//         await addJob(finalData, form);
//         message.success("Form submitted successfully!");
//       } catch (error) {
//         console.error("Form submission error:", error);
//         message.error("Please check all fields!");
//       }
//     }
//   };
  
 
//   useEffect(() => {
//     if (contractType === "Full Time") { // Full Time
//       setSalaryType("LPA");
//       // Set the salary type in the form
//       form.setFieldsValue({
//         salary: {
//           ...form.getFieldValue('salary'),
//           type: "LPA"
//         }
//       });
//     } else if (contractType === "Contract") { // Contract
//       setSalaryType("Monthly");
//       form.setFieldsValue({
//         salary: {
//           ...form.getFieldValue('salary'),
//           type: "Monthly"
//         }
//       });
//     } else if (contractType === "Both") { // Both
//       setSalaryType("LPA");
//       form.setFieldsValue({
//         salary: {
//           ...form.getFieldValue('salary'),
//           type: "LPA"
//         }
//       });
//     }
//   }, [contractType, form]);
 
 
//   const steps = [
//     {
//       label: "Job Details",
     
//       content: (
//         <div className="step-content">
         
//           <Row gutter={[16, 16]}>
//             <Col span={8}>
//               <Form.Item
//                 name="contractType"
//                 label="Hiring Mode"
//                 rules={[{ required: true, message: "Please select Hiring Mode type!" }]}
//               >
//                 <Select
//                   placeholder="Select Hiring Mode Type"
//                    onChange={ value => setContractType(value)}
//                 >
//                   <Option value="Full Time">Full Time</Option>
//                   <Option value="Contract">Contract</Option>
//                   <Option value="Both">Both</Option>
 
//                 </Select>
//               </Form.Item>
//             </Col>
//             {contractType && (
//               <>
//                 <Col span={8}>
//                   <Form.Item
//                     name="job_id"
//                     label="Job ID"
//                     rules={[
//                       { required: true, message: "Please input the Job ID!" },
//                       {
//                         pattern: /^[a-zA-Z0-9]+$/,
//                         message: "Job ID must be alphanumeric!"
//                       },
//                       {
//                         min: 4,
//                         message: "Job ID must be at least 4 characters!"
//                       }
//                     ]}
//                   >
//                     <Input placeholder="Enter Job ID" />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item
//                     name="job_title"
//                     label="Job Title"
//                     rules={[
//                       { required: true, message: "Please input the Job Title!" },
//                       { min: 3, message: "Job title must be at least 3 characters!" },
//                       { max: 100, message: "Job title cannot exceed 100 characters!" }
//                     ]}
//                   >
//                     <Input placeholder="Enter Job Title" />
//                   </Form.Item>
//                 </Col>
//               </>
//             )}
//           </Row>
 
//           <Row gutter={[16, 16]}>
//           {contractType && (
//             <>
//             <Col span={8}>
//               <Form.Item
//                 name="required_no_of_candidates"
//                 label="No. of Candidates"
//                 rules={[
//                   { required: true, message: "Enter number of candidates!" },
//                   {
//                     type: "number",
//                     min: 1,
//                     max: 100,
//                     transform: (value) => Number(value),
//                     message: "Please enter a valid number between 1 and 100!"
//                   }
//                 ]}
//               >
//                 <Input type="number" placeholder="Enter number of candidates" />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="job_location"
//                 label="Job Location"
//                 rules={[
//                   { required: true, message: "Please select at least one city!" },
//                   { type: 'array', min: 1, message: 'Please select at least one location!' }
//                 ]}
//               >
//                 <Select
//                   mode="multiple"
//                   allowClear
//                   showSearch
//                   placeholder="Select cities in India"
//                   filterOption={(input, option) =>
//                     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                   }
//                 >
//                   {indianCities.map((city) => (
//                     <Option key={city} value={city}>
//                       {city}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="notice_period"
//                 label="Notice Period"
//                 rules={[{ required: true, message: "Notice Period" }]}
//               >
//                 <Select
//                   placeholder="Select the notice period "
//                   onChange={value =>setNoticeType(value)}
//                 >
//                   <Option value="1">Less than 15 days</Option>
//                   <Option value="2">Less than 30 days</Option>
//                   <Option value="3">Less than 60 Days</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             </>
//             )}
//           </Row>
 
//         </div>
//       )
//     },
//     {
//       label: "Experience & Skills",
//       formFields: ["expFrom", "expTo", "skills", "requiredSkills", "optionalSkills"],
//       content: (
//         <div className="step-content">
         
//           <Row gutter={[16, 16]} align={"bottom"}>
//           <Col span={4}>
//             <Form.Item
//               name="exp_from"
//               label="Experience"
//               rules={[{ required: true, message: "Please select minimum experience!" }]}
//             >
//               <Select placeholder="Select Min Experience">
//                 {[...Array(21)].map((_, i) => (
//                   <Option key={i} value={i}>
//                     {i} Year{i !== 1 ? "s" : ""}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <div style={{marginBottom: '30px', textAlign: 'center'}}>To</div>
//           <Col span={4}>
//             <Form.Item
//               name="exp_to"
//               label=""
//               rules={[
//                 { required: true, message: "Please select maximum experience!" },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     const minExp = getFieldValue("exp_from");
//                     if (!value || value >= minExp) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error("Maximum experience should be greater than minimum experience!")
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Select placeholder="Select Max Experience">
//                 {[...Array(21)].map((_, i) => (
//                   <Option key={i} value={i}>
//                     {i} Year{i !== 1 ? "s" : ""}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={14}>
//             <Form.Item label="Salary" required>
//               <Input.Group compact>
//                 <Form.Item
//                   name={["salary", "amount"]}
//                   noStyle
//                   rules={[
//                     { required: true, message: "Please input the Salary!" },
//                     {
//                       validator: (_, value) => {
//                         const numValue = Number(value.replace(/,/g, ''));
//                         if (isNaN(numValue) || numValue <= 0) {
//                           return Promise.reject("Please enter a valid salary amount!");
//                         }
//                         return Promise.resolve();
//                       }
//                     }
//                   ]}
//                 >
//                   <Input
//                     style={{ width: "30%" }}
//                     placeholder="Enter Salary (CTC)"
//                     onChange={(e) => {
//                       const formattedValue = formatSalary(e.target.value);
//                       form.setFieldsValue({
//                         salary: {
//                           ...form.getFieldValue('salary'),
//                           amount: formattedValue
//                         }
//                       });
//                     }}
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   name={["salary", "type"]}
//                   noStyle
//                   rules={[{ required: true, message: "Please select the Salary Type!" }]}
//                 >
//                   {contractType === "Full Time" ? (
//                     // For Full Time: Show LPA as text
//                     <Input
//                       style={{ width: "25%" }}
//                       value="LPA"
//                       disabled
//                     />
//                   ) : (
//                     // For Contract or Both: Show appropriate dropdown
//                     <Select
//                       placeholder="Select Type"
//                       style={{ width: "25%" }}
//                       defaultValue={contractType === "Both" ? "LPA" : undefined}
//                     >
//                       {(contractType === "Both" || contractType === "Full Time") &&
//                         <Option value="LPA">LPA</Option>
//                       }
//                       {(contractType === "Contract" || contractType === "Both") && (
//                         <>
//                           <Option value="Monthly">Monthly</Option>
//                           <Option value="Hourly">Hourly</Option>
//                         </>
//                       )}
//                     </Select>
//                   )}
//                 </Form.Item>
//               </Input.Group>
//             </Form.Item>
//           </Col>
 
//           </Row>
//         </div>
//       )
//     },
//     {
//       label: "Client Details",
//       formFields: ["client_id", "clientBudget", "end_client", "poc", "assignTeam"],
//       content: (
//         <div className="step-content">
//           <Row gutter={[16, 16]}>
//             <Col span={8}>
//             <FormItem
//                 label="Client Name"
//                 name="client_id"
              
                
//                 rules={[
//                   {
//                     required: false,
//                     message: "Please Select Client Name!",
//                   },
//                 ]}
//               >
//                 <Cascader
                  
//                  placeholder="Select Client" options={clients}
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
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="clientBudget"
//                 label="Client Budget"
//                 rules={[
//                   { required: true, message: "Please enter client budget!" },
//                   {
//                     type: "number",
//                     min: 1,
//                     transform: (value) => Number(value),
//                     message: "Please enter a valid budget amount!"
//                   }
//                 ]}
//               >
//                 <Input type="number" placeholder="Enter client budget" />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <FormItem label="End Client" name="end_client">
//                   <Select
                 
//                   placeholder="Select EndClient"
//                   width={180}
//                   showSearch
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>
//                 }
//                  options={EndClientdata}
//                 />
//               </FormItem>
//             </Col>
//           </Row>
 
//           <Row gutter={[16, 16]}>
//             <Col span={8}>
//              <FormItem label="Point of Contact" name="poc">
//                   <Select
//                   style={{
//                     width: 180,
//                   }}
//                   placeholder="Select POC"
//                   showSearch
//                   mode="tags"
//                   dropdownRender={(menu) => <>{menu}</>}
//                   options={Pocdata}
//                 />
//                 </FormItem>
//             </Col>
//           </Row>
 
//         </div>
//       )
//     },
//     {
//       label: "Job Description",
//       description: "Provide a detailed job description",
//       content: (
//         <>
//           <ReactQuill
//             theme="snow"
//             value={job_description}
//             onChange={setjob_description}
//             style={{ height: "150px", width: "auto", marginBottom: "60px" }}
//           />
//           <Form.Item
//             name="job_description"
//             rules={[
//               {
//                 validator: async () => {
//                   if (!job_description || job_description.length < 100) {
//                     throw new Error("Job description must be at least 100 characters long!");
//                   }
//                 },
//               },
//             ]}
//             style={{ display: "none" }}
//           >
//             <Input />
//           </Form.Item>
//         </>
//       ),
//     },
//   ];
 
//   const useStyles = makeStyles(() => ({
//     root: {
//        "& .MuiStepIcon-active": { color: "black" },
//       // "& .MuiStepIcon-completed": { color: "black" },
//       "& .MuiStepIcon-root": { color: "black" }
//     }
//   }));
 
//   const c = useStyles();
 
//   return (
//     <div className="hiring-form-container">
//       <Form
//         form={form}
//         layout="vertical"
//          onFinish={handleSubmit}
//         className="hiring-form"
//       >
//        <Stepper activeStep={activeStep} orientation="vertical" className={c.root}>
//       {steps.map((step, index) => (
//         <Step key={step.label}>
//           <StepLabel >{step.label}</StepLabel>
//           <StepContent>
//             <div style={{ marginBottom: "-20px" }}>{step.content}</div>
//           </StepContent>
//         </Step>
//       ))}
//     </Stepper>
 
//     <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
//   {/* Discard Button */}
//   <Button
//     onClick={onDiscard}
//     style={{
//       background: "#FF5E5E",
//       borderColor: "white",
//       color: "#ffdede",
//       borderRadius: "10px",
//       marginRight: 8,
//       transition: "background 0.3s ease, color 0.3s ease",
//     }}
//     className="discard-button"
//   >
//     Discard
//   </Button>
 
//   {/* Back Button */}
//   {activeStep > 0 && (
//     <Button
//       onClick={handleBack}
//       style={{
//         marginRight: 8,
//         borderRadius: "10px",
//         backgroundColor: "black",
//         color: "white",
//         transition: "background 0.3s ease, color 0.3s ease",
//       }}
//       className="back-button"
//     >
//       Back
//     </Button>
//   )}
 
//   {/* Next Button */}
//   {activeStep < steps.length - 1 && (
//     <Button type="primary" onClick={handleNext} style={{ borderRadius: "10px" }}>
//       Next
//     </Button>
//   )}
 
//   {/* Submit Button */}
//   {activeStep === steps.length - 1 && (
//     <Button type="primary" onClick={handleSubmit} style={{ borderRadius: "10px" }}>
//       Submit
//     </Button>
//   )}
 
//         </div>
//       </Form>
 
//       <style jsx>{`
//         .hiring-form-container {
//           padding: 24px;
//           background: #fff;
//         }
//         .hiring-form {
//           max-width: 1200px;
//           margin: 0 auto;
//         }
//         .steps-container {
//           margin-bottom: 24px;
//         }
//         .steps-content {
//           margin-top: 24px;
//           padding: 24px;
//           background: #fff;
//           border: 1px solid #f0f0f0;
//           border-radius: 4px;
//         }
//         .step-title {
//           margin-bottom: 24px;
//           font-size: 18px;
//           font-weight: 600;
//         }
//         .steps-action {
//           margin-top: 24px;
//           text-align: right;
//         }
//         .editor-container {
//           margin-bottom: 50px;
//         }
//         .ql-editor {
//           min-height: 200px;
//         }
//       `}</style>
//     </div>
//   );
// };
 
// export default TalentDeploymentForm;






// /////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { Form, Row, Col, Input, Select, Button, message } from "antd";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { Stepper, Step, StepLabel, StepContent} from "@mui/material";
// import {makeStyles } from "@mui/styles";
 
 
 
// const { Option } = Select;
// const indianCities = [
//   "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad", "Ambala", "Amritsar",
//     "Aurangabad", "Bangalore", "Bareilly", "Belgaum", "Bhilai", "Bhiwandi",
//     "Bhopal", "Bhubaneswar", "Bikaner", "Bilaspur", "Chandigarh", "Chennai",
//     "Coimbatore", "Cuttack", "Dehradun", "Delhi", "Dhanbad", "Durgapur",
//     "Erode", "Faridabad", "Firozabad", "Ghaziabad", "Goa", "Gorakhpur",
//     "Gulbarga", "Guntur", "Gurgaon", "Guwahati", "Gwalior", "Hubli", "Hyderabad",
//     "Indore", "Jabalpur", "Jaipur", "Jalandhar", "Jammu", "Jamnagar", "Jamshedpur",
//     "Jhansi", "Jodhpur", "Kakinada", "Kannur", "Kanpur", "Kochi", "Kolhapur",
//     "Kolkata", "Kota", "Kozhikode", "Kurnool", "Lucknow", "Ludhiana", "Madurai",
//     "Mangalore", "Meerut", "Mumbai", "Mysore", "Nagpur", "Nashik", "Nellore",
//     "Noida", "Patna", "Pondicherry", "Pune", "Raipur", "Rajkot", "Ranchi",
//     "Rourkela", "Salem", "Sangli", "Shimla", "Siliguri", "Solapur", "Srinagar",
//     "Surat", "Thiruvananthapuram", "Thrissur", "Tiruchirappalli", "Tirunelveli",
//     "Tiruppur", "Ujjain", "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam",
//     "Warangal"
// ].sort();
 
// const DirectHiringForm = ({ onDiscard }) => {
//   const [form] = Form.useForm();
//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({});
//   const [contractType, setContractType] = useState("");
//   const [salaryType, setSalaryType] = useState("LPA");
//   const [jobDescription, setJobDescription] = useState("");
//   const [isFullTime, setIsFullTime] = useState(true);
 
//   // Step 1: Job Info Fields
//   const jobInfoFields = [
//     'contractType',
//     'job_id',
//     'job_title',
//     'required_no_of_candidates',
//     'job_location',
//     'tenure'
//   ];
//   const formatSalary = (value) => {
//     if (!value) return '';
//     value = value.replace(/[^\d]/g, '');
//     const formattedValue = value.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
//     return formattedValue;
//   };
 
//   const handleFullTimeChange = (e) => {
//     if(e== "Full Time") {
//       setIsFullTime(true);
//     }
//     else setIsFullTime(false);
//   }
//   // Step 2: Experience & Salary Fields
//   const experienceFields = [
//     'exp_from',
//     'exp_to',
//     ['salary', 'amount'],
//     ['salary', 'type']
//   ];
 
//   // Step 3: Job Description Field
//   const descriptionFields = ['jobDescription'];
 
//   // Map steps to their required fields
//   const stepValidationFields = {
//     0: jobInfoFields,
//     1: experienceFields,
//     2: descriptionFields
//   };
 
//   useEffect(() => {
//     if (contractType === "1") {
//       setSalaryType("LPA");
//     } else if (contractType === "2") {
//       setSalaryType("Monthly");
//     } else if (contractType === "3") {
//       setSalaryType("LPA");
//     }
//   }, [contractType]);
 
//   // Validation function for each step
//   const validateCurrentStep = async () => {
//     try {
//       const currentFields = stepValidationFields[activeStep];
//       if (!currentFields) return true;
 
//       // Step 1 Validation
//       if (activeStep === 0) {
//         if (!contractType) {
//           message.error("Please select a contract type!");
//           return false;
//         }
//         await form.validateFields(jobInfoFields);
//       }
 
//       // Step 2 Validation
//       else if (activeStep === 1) {
//         const values = await form.validateFields(experienceFields);
       
//         // Validate experience range
//         const expFrom = values.exp_from;
//         const expTo = values.exp_to;
//         if (expTo < expFrom) {
//           message.error("Maximum experience should be greater than minimum experience!");
//           return false;
//         }
 
//         // Validate salary
//         const salaryAmount = values.salary?.amount;
//         if (salaryAmount <= 0) {
//           message.error("Salary amount must be greater than 0!");
//           return false;
//         }
//       }
 
//       // Step 3 Validation
//       else if (activeStep === 2) {
//         if (!jobDescription || jobDescription.replace(/<[^>]*>/g, '').trim().length < 100) {
//           message.error("Job description must be at least 100 characters long!");
//           return false;
//         }
//         form.setFieldsValue({ jobDescription });
//       }
 
//       return true;
//     } catch (error) {
//       if (error.errorFields) {
//         const errorMessages = error.errorFields.map(field => field.errors[0]).join(', ');
//         message.error(`Please fix the following errors: ${errorMessages}`);
//       } else {
//         message.error("Please fill all required fields correctly!");
//       }
//       return false;
//     }
//   };
 
//   const handleNext = async () => {
//     const isValid = await validateCurrentStep();
//     if (isValid) {
//       const currentValues = form.getFieldsValue();
//       setFormData({ ...formData, ...currentValues });
//       setActiveStep(prev => prev + 1);
//     }
//   };
 
//   const handleBack = () => {
//     setActiveStep(prev => prev - 1);
//   };
 
//   const handleSubmit = async () => {
//     const isValid = await validateCurrentStep();
//     if (isValid) {
//       try {
//         const values = await form.validateFields();
//         const finalData = {
//           ...formData,
//           ...values,
//           jobDescription
//         };
//         console.log("Final Form Data:", finalData);
//         message.success("Form submitted successfully!");
//       } catch (error) {
//         message.error("Please check all fields!");
//       }
//     }
//   };
 
//   useEffect(() => {
//     if (contractType === "1") { // Full Time
//       setSalaryType("LPA");
//       // Set the salary type in the form
//       form.setFieldsValue({
//         salary: {
//           ...form.getFieldValue('salary'),
//           type: "LPA"
//         }
//       });
//     } else if (contractType === "2") { // Contract
//       setSalaryType("Monthly");
//       form.setFieldsValue({
//         salary: {
//           ...form.getFieldValue('salary'),
//           type: "Monthly"
//         }
//       });
//     } else if (contractType === "3") { // Both
//       setSalaryType("LPA");
//       form.setFieldsValue({
//         salary: {
//           ...form.getFieldValue('salary'),
//           type: "LPA"
//         }
//       });
//     }
//   }, [contractType, form]);
 
 
//   const useStyles = makeStyles(() => ({
//     root: {
//        "& .MuiStepIcon-active": { color: "black" },
//       // "& .MuiStepIcon-completed": { color: "black" },
//       "& .MuiStepIcon-root": { color: "black" }
//     }
//   }));
 
//   const c = useStyles();
 
//   const steps = [
//     {
//       label: "Job Info",
//       description: "Enter basic job information",
//       content: (
//         <Row gutter={[16, 16]}>
//           <Col span={6}>
//             <Form.Item
//               name="contractType"
//               label="Hiring Mode"
//               rules={[{ required: true, message: "Please select Hiring Mode" }]}
//             >
//               <Select
//                 placeholder="Select Hiring Mode"
//                 onChange={(value) => setContractType(value)}
//               >
//                 <Option value="1">Full Time</Option>
//                 <Option value="2">Contract</Option>
//                 <Option value="3">Both</Option>
//               </Select>
//             </Form.Item>
//           </Col>
 
//           {contractType && (
//             <>
//               <Col span={6}>
//                 <Form.Item
//                   name="jobId"
//                   label="Job ID"
//                   rules={[
//                     { required: true, message: "Please input the Job ID!" },
//                     { pattern: /^[a-zA-Z0-9]+$/, message: "Job ID must be alphanumeric!" }
//                   ]}
//                 >
//                   <Input placeholder="Enter Job ID" />
//                 </Form.Item>
//               </Col>
 
//               <Col span={6}>
//                 <Form.Item
//                   name="jobTitle"
//                   label="Job Title"
//                   rules={[
//                     { required: true, message: "Please input the Job Title!" },
//                     { min: 3, message: "Job title must be at least 3 characters!" }
//                   ]}
//                 >
//                   <Input placeholder="Enter Job Title" />
//                 </Form.Item>
//               </Col>
 
//               <Col span={6}>
//                 <Form.Item
//                   name="number_of_candidates"
//                   label="Number of Candidates"
//                   rules={[
//                     { required: true, message: "Please enter number of candidates!" },
//                     {
//                       validator: (_, value) => {
//                         const numValue = Number(value);
//                         if (isNaN(numValue) || numValue <= 0) {
//                           return Promise.reject("Number must be greater than 0!");
//                         }
//                         return Promise.resolve();
//                       }
//                     }
//                   ]}
//                 >
//                   <Input type="number" min="1" placeholder="Enter number of candidates" />
//                 </Form.Item>
//               </Col>
 
//               <Col span={6}>
//                 <Form.Item
//                   name="location"
//                   label="Location"
//                   rules={[
//                     { required: true, message: "Please select at least one location!" },
//                     { type: 'array', min: 1, message: "Please select at least one location!" }
//                   ]}
//                 >
//                   <Select mode="multiple" placeholder="Select location">
//                     {indianCities.map((city) => (
//                       <Option key={city} value={city}>
//                         {city}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
//               {/* <Col span={6}>
//                 <Form.Item
//                   name="tenure"
//                   label="Tenure (months)"
//                   rules={[
//                     { required: true, message: "Please enter tenure!" },
//                     {
//                       validator: (_, value) => {
//                         const numValue = Number(value);
//                         if (isNaN(numValue) || numValue <= 0) {
//                           return Promise.reject("Tenure must be at least 1 month!");
//                         }
//                         return Promise.resolve();
//                       }
//                     }
//                   ]}
//                 >
//                   <Input type="number" min="1" placeholder="Enter tenure" />
//                 </Form.Item>
//               </Col> */}
//             </>
//           )}
//         </Row>
//       )
//     },
//     {
//       label: "Experience & Salary",
//       description: "Specify experience and salary requirements",
//       content: (
//         <Row gutter={[16, 16]} align="bottom">
//           <Col span={4}>
//             <Form.Item
//               name="exp_from"
//               label="Experience"
//               rules={[{ required: true, message: "Please select minimum experience!" }]}
//             >
//               <Select placeholder="Select Min Experience">
//                 {[...Array(21)].map((_, i) => (
//                   <Option key={i} value={i}>
//                     {i} Year{i !== 1 ? "s" : ""}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <div style={{marginBottom: '30px', textAlign: 'center'}}>To</div>
//           <Col span={4}>
//             <Form.Item
//               name="exp_to"
//               label=""
//               rules={[
//                 { required: true, message: "Please select maximum experience!" },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     const minExp = getFieldValue("exp_from");
//                     if (!value || value >= minExp) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error("Maximum experience should be greater than minimum experience!")
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Select placeholder="Select Max Experience">
//                 {[...Array(21)].map((_, i) => (
//                   <Option key={i} value={i}>
//                     {i} Year{i !== 1 ? "s" : ""}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
 
//           {/* Keep experience fields the same */}
//           <Col span={14}>
//             <Form.Item label="Salary" required>
//               <Input.Group compact>
//                 <Form.Item
//                   name={["salary", "amount"]}
//                   noStyle
//                   rules={[
//                     { required: true, message: "Please input the Salary!" },
//                     {
//                       validator: (_, value) => {
//                         const numValue = Number(value.replace(/,/g, ''));
//                         if (isNaN(numValue) || numValue <= 0) {
//                           return Promise.reject("Please enter a valid salary amount!");
//                         }
//                         return Promise.resolve();
//                       }
//                     }
//                   ]}
//                 >
//                   <Input
//                     style={{ width: "30%" }}
//                     placeholder="Enter Salary (CTC)"
//                     onChange={(e) => {
//                       const formattedValue = formatSalary(e.target.value);
//                       form.setFieldsValue({
//                         salary: {
//                           ...form.getFieldValue('salary'),
//                           amount: formattedValue
//                         }
//                       });
//                     }}
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   name={["salary", "type"]}
//                   noStyle
//                   rules={[{ required: true, message: "Please select the Salary Type!" }]}
//                 >
//                   {contractType === "1" ? (
//                     // For Full Time: Show LPA as text
//                     <Input
//                       style={{ width: "25%" }}
//                       value="LPA"
//                       disabled
//                     />
//                   ) : (
//                     // For Contract or Both: Show appropriate dropdown
//                     <Select
//                       placeholder="Select Type"
//                       style={{ width: "25%" }}
//                       defaultValue={contractType === "3" ? "LPA" : undefined}
//                     >
//                       {(contractType === "3" || contractType === "1") &&
//                         <Option value="LPA">LPA</Option>
//                       }
//                       {(contractType === "2" || contractType === "3") && (
//                         <>
//                           <Option value="Monthly">Monthly</Option>
//                           <Option value="Hourly">Hourly</Option>
//                         </>
//                       )}
//                     </Select>
//                   )}
//                 </Form.Item>
//               </Input.Group>
//             </Form.Item>
//           </Col>
//         </Row>
//       )
//     },
 
//     {
//       label: "Job Description",
//       description: "Provide a detailed job description",
//       content: (
//         <>
//           <ReactQuill
//             theme="snow"
//             value={jobDescription}
//             onChange={(value) => {
//               setJobDescription(value);
//               form.setFieldsValue({ jobDescription: value });
//             }}
//             style={{ height: "150px", marginBottom: "60px" }}
//           />
//           <Form.Item
//             name="jobDescription"
//             rules={[
//               {
//                 validator: async (_, value) => {
//                   const strippedValue = value?.replace(/<[^>]*>/g, '').trim() || '';
//                   if (strippedValue.length < 100) {
//                     throw new Error("Job description must be at least 100 characters long!");
//                   }
//                 },
//               },
//             ]}
//             style={{ display: "none" }}
//           >
//             <Input />
//           </Form.Item>
//         </>
//       )
//     },
//   ];
 
//   return (
//     <Form form={form} layout="vertical">
//       <Stepper activeStep={activeStep} orientation="vertical"  className={c.root} >
//         {steps.map((step, index) => (
//           <Step key={step.label}  >
//             <StepLabel >{step.label}</StepLabel>
//             <StepContent>
//               <div style={{ marginBottom: "-20px" }}>{step.content}</div>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
 
//       <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
//         <Button
//           onClick={onDiscard}
//           style={{
//             background: "#FF5E5E",
//             borderColor: "white",
//             color: "#ffdede",
//             borderRadius: "10px",
//             marginRight: 8
//           }}
//           className="discard-button"
//         >
//           Discard
//         </Button>
 
//         {activeStep > 0 && (
//           <Button
//             onClick={handleBack}
//             style={{
//               marginRight: 8,
//               borderRadius: "10px",
//               backgroundColor: "black",
//               color: "white"
//             }}
//             className="back-button"
//           >
//             Back
//           </Button>
//         )}
 
//         {activeStep < steps.length - 1 && (
//           <Button
//             type="primary"
//             onClick={handleNext}
//             style={{ borderRadius: "10px" }}
//           >
//             Next
//           </Button>
//         )}
 
//         {activeStep === steps.length - 1 && (
//           <Button
//             type="primary"
//             onClick={handleSubmit}
//             style={{ borderRadius: "10px" }}
//           >
//             Submit
//           </Button>
//         )}
//       </div>
//     </Form>
//   );
// };
 
// export default DirectHiringForm;


//////////
   



import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Steps, Row, Col } from 'antd';

const { Step } = Steps;

const ExternalStaffingForm = ({ primarySelected, secondarySelected, onDiscard }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  // State for step-specific fields
  const [experienceFields, setExperienceFields] = useState({});
  const [clientFields, setClientFields] = useState({});

  // Handler for next step
  const handleNext = async () => {
    try {
      // Validate the current form fields before proceeding
      await form.validateFields();
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  // Handler for previous step
  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Stepper content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Form.Item
              name="experience"
              label="Experience"
              rules={[{ required: true, message: 'Please enter experience!' }]}
            >
              <Input />
            </Form.Item>
          </>
        );
      case 1:
        return (
          <>
            <Form.Item
              name="clientName"
              label="Client Name"
              rules={[{ required: true, message: 'Please enter client name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="clientBudget"
              label="Client Budget"
              rules={[{ required: true, message: 'Please enter client budget!' }]}
            >
              <Input />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Steps current={currentStep}>
        <Step title="Experience Fields" />
        <Step title="Client Fields" />
      </Steps>

      <Form form={form} layout="vertical">
        {renderStepContent()}
        <Row justify="space-between" className="mt-4">
          {currentStep > 0 && (
            <Button onClick={handlePrev}>Previous</Button>
          )}
          {currentStep < 1 && (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentStep === 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default ExternalStaffingForm;
