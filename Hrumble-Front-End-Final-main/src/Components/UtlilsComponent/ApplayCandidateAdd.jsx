import { Form, Input, Select, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";
import Dragger from "antd/es/upload/Dragger";
import PhoneInput from "react-phone-input-2";
import { useState ,useContext} from 'react';
import CandidateContext from "../../Providers/Candidate";
import { useParams } from "react-router-dom";

const BASE = import.meta.env.VITE_BASE;
const ApplayCandidateAdd = () => {
    const {handleapplayCandidatepage}=useContext(CandidateContext)
     const [form]=useForm()
      const params =useParams()

     const [value, setValue] = useState("");
     const [fileError, setFileError] = useState(false);
     const [resume, setResume] = useState("");

     const props = {
        name: "file",
        multiple: false,
        action: `${BASE}test`,
        beforeUpload: (file) => {
          // Define the allowed file types (e.g., PDF, PNG, JPG)
          const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      
          // Check if the uploaded file's type is in the allowedTypes array
          if (!allowedTypes.includes(file.type)) {
              message.error("Invalid file type. Please upload a PDF, JPG, PNG, DOC, or DOCX.")
            return (
              setFileError(true),
              false
            ) // Prevent the file from being uploaded
          }
      
          return (
              setFileError(false),
              true
            ) ; // Allow the file to be uploaded
        },
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setResume (info.file.originFileObj)
          }
          if (status === "done") {
                    setResume (info.file.originFileObj);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log("Dropped files", e.dataTransfer.files);
        },
      };

      function capitalizeFirstLetterOnly(str) {
        return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
    }

      const onFinish =(values)=>{
        if (fileError) {
            message.error(
              "Invalid file type. Please upload a PDF, JPG, PNG, DOC, or DOCX."
            );
          } 
          var formdata = new FormData();
          let candiateskills = values["skills"]?.split(",");
          let prefferedLocation = values["preferred_location"]?.split(",");
    
          candiateskills.forEach((item, index) => {
           
              formdata.append(`skills[${index}]`, item);
         
          });
          prefferedLocation.forEach((item, index) => {
           
            formdata.append(`preferred_location[${index}]`, item);
       
        });
    
         
    
          formdata.append("email_id", values["email_id"]);
          formdata.append("last_name", capitalizeFirstLetterOnly(values["last_name"])||"");
          formdata.append("first_name",capitalizeFirstLetterOnly(values["first_name"]) ||"");
          formdata.append(
            "phone_no",
            value?.replace("-", "")
          );
          formdata.append("offer_details", values["offer_details"]);
        //   formdata.append("candidate_id", 1000+candidatestotal?.length);
         
          formdata.append("notice_period", values["notice_period"]);
          formdata.append("expected_ctc", values["expected_ctc"]);
          formdata.append("current_ctc", values["current_ctc"]);
          formdata.append("to_exp_from", Number(values["to_exp_from"]) || 0);
          formdata.append("to_exp_to", Number(values["to_exp_to"]) || 0);
          formdata.append("re_exp_to", Number(values["re_exp_to"] )|| 0);
          formdata.append("re_exp_from", Number(values["re_exp_from"]) || 0);
          formdata.append("remarks", values["remarks"] || "");
          formdata.append("attachment_name",values["attachment_name"] ||"Naukri")
        
          formdata.append("current_location", values["current_location"]?.split(",") || "");
    
          formdata.append("image", resume);
          formdata.append("job_id", params?.id);
         
    
    
          handleapplayCandidatepage(formdata,form)
     }

     const handleChangePhoennumber = (value, data, event, formattedValue) => {
        setValue(formattedValue);
      };
     return (
       <>
           <div className="container">
              <div className="d_f j_c_s_b a_i_c m_b_10">
                 <img src="/images/technoladderslogo.png" width={100} height={100}/>
                  <button className ="btn btn-primary">Contact Us</button>
              </div>
          

        </div>

         <div
          className="container-fluid">
               <div className='tab m_t_10 m_b_10 p_10 responsive_table 
          m-5 d_f j_c_c a_i_c '>
         <div>
         <h1 className="text-center mt_5 mb_2">Personal Details</h1>
         <Form onFinish={onFinish} form={form}
         className='m_10'
         layout='vertical'>
         <div style ={{
               maxWidth: "700px",
               marginLeft: "auto",
               marginRight: "auto",
         }}>
           <div
            className="col_2 g_10">
           <Form.Item
              label='First Name'
                
                name="first_name"
                rules={[{ required: true, message: "First Name is required" }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
               label="Last Name"
               name="last_name">
               <Input placeholder="Last Name" />
             </Form.Item>
           </div>
           <div className='col_2 g_20 col_1_sm g_5_sm col_1_xl g_10_xl col_1_md g_5_md m_t_1_sm m_t_1'>
         <Form.Item name="email_id"
          label="Email"
                 rules={[
                  {
                    required: true,
                    message: "Email is required!",
                  },
                  {
                    
                    type: "email",
                    message: "Please Enter valid E-mail!",
                  },
                ]}
             >
                <Input placeholder="Enter Email Address" />
              </Form.Item>
              <Form.Item  name="phone_no"
               label="Phone No">
                 <PhoneInput
                   country={"in"}
                   style={{ width: '100%' }}
                   isValid={(value, country) => {
                     if (value?.match(/12345/)) {
                       return console.log(
                         "llll",
                         "Invalid value: " + value + ", " + country.name
                       );
                     } else if (value?.match(/1234/)) {
                       return console.log("lll22", false);
                     } else {
                       return console.log("lll28882", true, value);
                     }
                   }}
                   placeholder="Enter phone number"
                   value={value}
                   onChange={handleChangePhoennumber}
                 />
               </Form.Item>
            
              
         </div>
          <div className="col_2 g_10">
          <Form.Item label="Total Experience " >
                 <div className="d_f a_i_c j_c_c g_5 candidate  p_t_5 m_t_1">
                   <Form.Item name="to_exp_from">
                     <Input placeholder=""  />
                   </Form.Item>
                   <p
                     style={{
                       marginTop: "-20px",
                     }}
                   >
                     Years
                   </p>
                   <Form.Item name="to_exp_to">
                     <Input  defaultValue={0} />
                   </Form.Item>
                   <p
                     style={{
                       marginTop: "-20px",
                     }}
                   >
                     Months
                   </p>
                 </div>
               </Form.Item>
               <Form.Item label="Relevent Experience" >
               <div className="d_f a_i_c g_5 candidate p_t_10 m_t_1">
                 <Form.Item name="re_exp_from">
                   <Input placeholder=""  />
                 </Form.Item>
                 <p
                   style={{
                     marginTop: "-20px",
                   }}
                 >
                   Years
                 </p>
                 <Form.Item name="re_exp_to">
                   <Input  defaultValue={0} />
                 </Form.Item>
                 <p
                   style={{
                     marginTop: "-20px",
                   }}
                 >
                   Months
                 </p>
               </div>
             </Form.Item>
          </div>

           <div
            className="col_2 g_10">
                     <Form.Item
            label="Current Salary"
                  
                  name="current_ctc"
                  
                  rules={[{ required: true, message: "Current Salary is required" }]}
                >
                  {/* {hiring !== "Full Time" ? (
                    <Input
                    disabled={!hiringtype?true:false }
                      type="number"
                      placeholder={
                          hiringtype=="Monthly"?"1,00,000":"1,000" 
                      }
                      
                        addonAfter={<p className="m_10">{hiringtype}</p>
                      }
                    />
                  ) : ( */}
        
                    <Input
                      type="number"
                      
        
                       placeholder="1,00,000" 
                      addonAfter={<p className="m_10">LPA</p>}
                    />
                  {/* )} */}
                </Form.Item>
                <Form.Item
                label="Expected Ctc"
              
              name="expected_ctc"
              rules={[{ required: true, message: "Expected Salary is required" }]}
            >
              {/* {hiring !== "Full Time" ? (
                <Input
                  type="number"
              disabled={!hiringtype?true:false }
     
                  placeholder={
                    hiringtype=="Monthly"?"1,00,000":"1,000" 
                  }
                 
                    addonAfter={<p className="m_10">{hiringtype}</p>
                      
                  }
                />
              ) : 
              ( */}
                <Input
                  type="number"
                  
                  placeholder="1,00,000"
                  addonAfter={<p className="m_10">LPA</p>}
                />
              {/* )} */}
            </Form.Item>
           </div>
           <div className="col_1">
           <Form.Item 
             label="Notice Period"
                 
                 name="notice_period"
                 rules={[{ required: true, message: "Notice Period is required" }]}
               >
                 <Select placeholder="Select">
                   <Option value="Immediately" label="Immediately">
                     <Space>Immediately</Space>
                   </Option>
                   <Option value="Less than 15 days" label="Less than 15 days">
                     <Space>Less than 15 days</Space>
                   </Option>
                   <Option value="Less than 30 days" label="Less than 30 days">
                     <Space>Less than 30 days</Space>
                   </Option>
                   <Option value="45 days" label="45 days">
                     <Space>45 days</Space>
                   </Option>
                   <Option value="60 days" label="60 days">
                     <Space>60 days</Space>
                   </Option>
                   <Option value="90 days" label="90 days">
                     <Space>90 days</Space>
                   </Option>
                 </Select>
               </Form.Item>
           </div>
           <div
            className="col_2 g_10">
                     
               <Form.Item
               label="Offer Details"
           
           name="offer_details"
           rules={[{ required: true, message: "Offer Details is required" }]}
         >
           <Input placeholder="Add Offer Details" />
         </Form.Item>
         <Form.Item
         label="Skills"
           
           name="skills"
           rules={[{ required: true, message: "Skills is required" }]}
         >
           <Input.TextArea placeholder='example Html,css' />
         </Form.Item>
           </div>
           <div
            className="col_2 g_10">
                     
                     <Form.Item
         label="Current Location"
           
           name="current_location"
         
         >
           <Input.TextArea placeholder='example:Coimbatore' />
         </Form.Item>
         <Form.Item
         label="Preferred Location"
           
           name="preferred_location"
           
         >
           <Input.TextArea placeholder='Coimbatore,Banglore' />
         </Form.Item>
           </div>
           <div className ="col_1 m_t_1_sm">
         
         <Form.Item
              label="Resume"
              className='m_t_15'
              name="resume"
             rules={[
               {
                 required: true,
                 message: "Please Upload Resume!",
               },
             ]}
           >
             <Dragger {...props}>
               <p className="ant-upload-hint addcandidate_hint"><span className="browse">+ Upload</span></p> 
                 
             </Dragger>
           </Form.Item>
     
          </div>
         </div>
        
        
          
         <div style={{
               display:"flex",
               justifyContent:"flex-end",
               // gap:"10px 10px"
            }}>
                  <button type="primary" className="btn btn-primary btn-sm" htmlType="submit"
                //    loading={loadingaddbutton}
                   >
                  Submit Application
             </button> 
             </div>
        {/* <Table
             
             rowClassName={() => 'editable-row'}
             bordered
             dataSource={data}
             scroll={{ x: true }} 
             columns={columns}
           /> */}
        </Form>

         </div>
         {/* <Tabs items={items} defaultActiveKey="1" tabBarExtraContent={tableExtra}/> */}
         </div>
         </div>
       </>
      

     )

}

 export default ApplayCandidateAdd