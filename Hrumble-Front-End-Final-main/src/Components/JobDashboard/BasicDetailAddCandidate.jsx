import { useContext, useEffect, useState} from "react";
import { Button, Form, Input, Select, InputNumber, Space, Radio,Divider, DatePicker} from "antd";
import { Upload } from "antd";

import brief from "/images/briefcasebag.svg"
import schoolbag from "/images/schoolbag.svg"

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import ViewJobContext from "../../Providers/ViewJob";
import CandidateContext from "../../Providers/Candidate";
import {InboxOutlined,CloudUploadOutlined} from "@ant-design/icons"







const { Dragger } = Upload;
const { Option } = Select;

export default function BasicDetailEdit({setopen,Assign,ResumeArray, mode="",salarytype="", value, setValue, info,form,hiringtype,setHiringtype,handleClickEditAssign }) {


const { jobSingle,locationData } = useContext(ViewJobContext);
const {candidateSingle,loadingAssign}=useContext(CandidateContext)
candidateSingle[0]?.candidateoriginal_id?.resumeArray


let locationsdata=[]
locationData?.map((item,i) => {
  locationsdata.push({
   key:i,
    label: item?.name,
    value: item?.name,
  });
});
console.log("location",locationData)

let resumeArray=[]
candidateSingle[0]?.candidateoriginal_id?.resumeArray?.map((item,i) => {
  resumeArray.push({
   key:i,
    label: item?.name,
    value: item?.name,
  });
});



  const [hiring, setHiring] = useState(mode);
  const [resumePlacholder, setResumePlaceholder] = useState("");

  const handleChangePhoennumber = (value, data, event, formattedValue) => {
    setValue(formattedValue);
  };

  const handleChangeHiring = (e) => {

   console.log("radio",e)
     
    if(e.target.value =="Full Time"){
       
       return setHiringtype("LPA"),
      setHiring(e.target.value),
    form.setFieldsValue({salary_Type:""})


    }
    setHiring(e.target.value);
    form.setFieldsValue({salary_Type:""})
   
    setHiringtype("")

    
  };
  const handleChangeHiringType = (e) => {
    setHiringtype(e);
    form.setFieldsValue({expected_ctc:"",current_ctc:""})
    

  };

 const handlechangeResume=(e)=>{
  
   setResumePlaceholder(e)
 }

//  const init = async()=>{
//   let locationapi =`${BASE_URL}/location`
   
//   await axios.get(locationapi).then((resp) => {
//     setLocation(resp.data.data);
// })}
useEffect(() => {
   if(mode){
    setHiring(mode)
   
   }
   else{
    setHiring("")
   }
}, [])


const props = {
  name: 'file',
  multiple: false,
  maxCount: 1,
  action: '/upload.do', // Replace with your actual upload URL
  showUploadList: { showRemoveIcon: true },
  beforeUpload: (file) => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error(`${file.name} is not a pdf file`);
    }
    return isPdf || Upload.LIST_IGNORE;
  },
};




  return (
    <>

  <div
   className="col_1 g_10">
  <Form.Item label="Resume"  name="resume"
       rules={[
        {
          required: true,
          message: "Please Upload Resume!",
        },
      ]}>
            <Upload {...info}>
          <>
          
        
          <label className='profileInfo-upload-new btn btn-warning btn-sm'  ><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
      
          </></Upload>
      </Form.Item>
  </div>
   <div
    className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
   <Form.Item className="" label="Date of Submission" name="data_of_submission"
      rules={[
        {
            required:true,
            message:"Enter Date of Submission"
        }
    ]}>
        <DatePicker  
         style={{
          width:"260px",
          border: 'none', // Remove the default border
          borderBottom: '2px solid #d9d9d9', // Set the border-bottom style
          borderRadius: 0, // Remove border-radius to make it consistent with border-bottom
        }} />
      </Form.Item>
   </div>
      <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input placeholder="First Name"
             style={{
          
              border: 'none', // Remove the default border
              borderBottom: '2px solid #d9d9d9', // Set the border-bottom style
              borderRadius: 0, // Remove border-radius to make it consistent with border-bottom
            }} />
        </Form.Item>

        <Form.Item name="last_name" label="Last Name"
          rules={[{ required: true, message: "Last Name is required" }]}
          >
          <Input placeholder="Last Name"
            style={{
          
              border: 'none', // Remove the default border
              borderBottom: '2px solid #d9d9d9', // Set the border-bottom style
              borderRadius: 0, // Remove border-radius to make it consistent with border-bottom
            }} 
           />
        </Form.Item>
      </div>

      <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
        <Form.Item label="Email" name="email_id"
          rules={[{ required: true, message: "Email is required" }]}
          >
          
          <Input placeholder="Enter Email Address" 
            style={{
          
              border: 'none', // Remove the default border
              borderBottom: '2px solid #d9d9d9', // Set the border-bottom style
              borderRadius: 0, // Remove border-radius to make it consistent with border-bottom
            }} />
        </Form.Item>

        <Form.Item label="Phone Number" name="phone_no"
           rules={[{ required: true, message: "Phone Number is required" }]}
           >
          <PhoneInput
            country={"in"}
            isValid={(value, country) => {
              if (value.match(/12345/)) {
                return console.log(
                  "llll",
                  "Invalid value: " + value + ", " + country.name
                );
              } else if (value.match(/1234/)) {
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
      <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
        <Form.Item label="Current Location" name="current_location"
          rules={[{ required: true, message: "Current Location is required" }]}>
              <Select
              
            
                  placeholder="Select Location"
                  showSearch
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={locationsdata}
                />
        </Form.Item>

        <Form.Item label="Preferred Location" name="preferred_location">
        <Select
                  
                  placeholder="Select Location"
                  showSearch
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={locationsdata}
                />
        </Form.Item>
      </div>

      <div className="col_2 m_t_1 g_20 col_1_sm g_5_sm">
        <div className="">
          <Form.Item label="Total Experience">
            <div className="d_f a_i_c g_5">
              <Form.Item name="to_exp_from">
                <Input placeholder="" 
                 style={{
                  width:"60px"
                 }} />
              </Form.Item>
              <p
                style={{
                  // marginTop: "-20px",
                }}
              >
                Years
              </p>
              <Form.Item name="to_exp_to">
                <Input  defaultValue={0}
                 style={{
                  width:"60px"
                 }} />
              </Form.Item>
              <p
                style={{
                  // marginTop: "-20px",
                }}
              >
                Months
              </p>
            </div>
          </Form.Item>
        </div>
        <Form.Item label="Relevant Experience">
          <div className="d_f a_i_c g_5">
            <Form.Item name="re_exp_from">
              <Input placeholder=""
                style={{
                  width:"60px"
                 }} />
            </Form.Item>
            <p
              style={{
                // marginTop: "-20px",
              }}
            >
              Years
            </p>
            <Form.Item name="re_exp_to">
              <Input  defaultValue={0}
                style={{
                  width:"60px",
                  // marginTop:"10px"
                 }} />
            </Form.Item>
            <p
              style={{
                // marginTop: "-20px",
              }}
            >
              Months
            </p>
          </div>
        </Form.Item>
      </div>

      <div className="col_1 g_20_y col_1_sm g_5_sm salary m_t_1" style={
        {
          marginTop: "-30px"
      }
      }>

  { jobSingle?.job_type !=="Full Time" &&  
<Form.Item label="Mode Of Hiring" name="mode_of_hiring"
         rules={[{ required: true, message: "Mode of Hiring is required" }]}>
          <div>
            <Radio.Group className='d_f g_50' onChange={handleChangeHiring} value={hiring}>
                <Radio.Button className='search-radio-box' value="Full Time">
                <div className='d_f g_20'>
                    <div>
                        <label className='search-radio-heading'>Full Time </label>
                        <p className='search-radio-text'> FTE with Technoladders</p>
                    </div>
                    <div className='p_t_20'>
                        <img src={brief} className='search-brief-icon' />  
                    </div>
                </div>
                </Radio.Button>
                <Radio.Button className='search-radio-box' value="Contract">
                <div className='d_f g_20'>
                    <div>
                        <label className='search-radio-heading'> Contract</label>
                        <p className='search-radio-text'> Consultants / Freelancers</p>
                    </div>
                    <div className='p_t_20'>
                        <img src={schoolbag} className='search-brief-icon' />  
                    </div>
                </div>
                </Radio.Button>
            </Radio.Group>
         </div>
        </Form.Item>
}
        </div>
        {/* <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
      

        


    }*/}
        

        <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">

        {/* {
          jobSingle?.job_type !=="Full Time" &&
          <Form.Item label="Client Billable" name="client_billing"
          rules={[{ required: true, message: "Client Billable is required" }]}
          getValueFromEvent={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, '');
            return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
          }}
          
          >
                  
            <Input
           
              
              placeholder={
                jobSingle?.salaryType=="Monthly"?"1,00,000":"1,000" 
              }
              addonBefore={<p className="m_10">{jobSingle?.client_id?jobSingle?.client_id[0]?.currency =="USD"? "$":"₹":"₹"}</p>}
              
                addonAfter={<p className="m_10">{jobSingle?.salaryType} </p>
              }
            />
          
        
           </Form.Item>
        } */}

        {
         (hiring === "Contract" || hiring === "Contract to hire") &&

       <>
          
          {/* <Form.Item
          

  >
              <Select placeholder="fff"/>
          </Form.Item> */}
          <Form.Item
  label="Salary Type"
  name="salary_Type"
  extra={ !hiringtype ? "Select Salary Type" : undefined}

  rules={[{ required: true, message: "Salary Type is required" }]}
>
  <Select
    allowClear
    
  
     onChange={handleChangeHiringType}
  >
    <Option value="Monthly" label="Full Time">
      <Space>Monthly</Space>
    </Option>
    <Option value="Per Hour" label="">
      <Space>Hourly</Space>
    </Option>
  </Select>
</Form.Item>

       </>
       
        }
      </div>
      <div className="col_2 g_20 m_t_1">
        <Form.Item
          label="Current Salary"
          name="current_ctc"
          
          rules={[{ required: true, message: "Current Salary is required" }]}
          getValueFromEvent={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, '');
            return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
          }}
        >
          { jobSingle?.job_type !=="Full Time" && hiring !== "Full Time" ? (
            <Input
            
            disabled={!hiringtype?true:false }
              
              placeholder={
                  hiringtype=="Monthly"?"1,00,000":"1,000" 
              }
              
                addonAfter={<p className="m_10">{hiringtype}</p>
              }
            />
          ) : (
            <Input
             
              // disabled={!hiringtype?true:false}

               placeholder="1,00,000" 
              addonAfter={<p className="m_10">LPA</p>}
            />
          )}
        </Form.Item>
      {/* </div> */}

      {/* <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm salary"> */}
        <Form.Item
        className=""
          label="Expected Salary"
          name="expected_ctc"
          rules={[{ required: true, message: "Expected Salary is required" }]}
          getValueFromEvent={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, '');
            return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
          }}
        >
          { jobSingle?.job_type !=="Full Time" && hiring !== "Full Time" ? (
            <Input
          
              
          disabled={!hiringtype?true:false }

              placeholder={
                hiringtype=="Monthly"?"1,00,000":"1,000"  
              }
             
                addonAfter={<p className="m_10">{hiringtype}</p>
                  
              }
            />
          ) : (
            <Input
          
             
              // disabled={!hiringtype?true:false}
              placeholder="1,00,000"
              addonAfter={<p className="m_10">LPA</p>}
            />
          )}
        </Form.Item>
      </div>
        {/* </div> */}
    <div className="col_2 m_t_1 g_20 col_1_sm g_5_sm">
        {/* <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm"> */}
        <Form.Item
        className=""
          label="Notice Period"
          name="notice_period"
          rules={[{ required: true, message: "Notice Period is required" }]}
        >
          <Select placeholder="Select Notice Period">
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
      {/* </div> */}

  
      {/* <div className="col_2 m_t_1 col_1_sm g_5_sm"> */}
        <Form.Item
        className=""
          label="Offer Details"
          name="offer_details"
          rules={[{ required: true, message: "Offer Details is required" }]}
        >
          <Input placeholder="Add Offer Details"
           style={{
          
            border: 'none', // Remove the default border
            borderBottom: '2px solid #d9d9d9', // Set the border-bottom style
            borderRadius: 0, // Remove border-radius to make it consistent with border-bottom
          }}  />
        </Form.Item>
      {/* </div> */}
      {/* </div> */}
       {
        Assign 
        ?
        <div className="col_1 m_t_2 col_1_sm g_5_sm" style={{
          marginBottom: "180px"
        }}>
        <Form.Item
  label="Select Resume"
  name="attachment_name"
  rules={[
    {
      required: true,
      message: "Please Select Resume Attachment Name!",
    },
  ]}
  extra={ !resumePlacholder ? "Select Attachment Name" : undefined}
>
  <Select
  onChange={handlechangeResume}
    allowClear
    style={{
      width: 300,
    }}
    dropdownRender={(menu) => (
      <>
        {menu}
        <Divider
          style={{
            margin: '8px 0',
          }}
        />
        <Space
          style={{
            padding: '0 8px 4px',
          }}
        >
          <div className='resume-dragger1' onClick={() => setopen(true)}>
              <div
                style={{
                   textAlign:"center"
                }}>
              <label>
              <p className="ant-upload-drag-icon p_t_20">
                <InboxOutlined />
              </p>
              <p className="ant-upload-resume-text p_t_5">Click this area to upload</p>
            </label>
              </div>
          </div>
        </Space>
      </>
    )}
    options={resumeArray}
    defaultValue="Attachment Name"
  />
</Form.Item>



      </div>
      

      :
      // <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">

   <>
   <Form.Item
   className=""
        label="Attachment Name"
        name="attachment_name"
        rules={[
          {
            required: true,
            message: "Please Enter Attachment Name",
          },
        ]}
      >
       <Input placeholder="Resume Attachment Name" 
        style={{
          
          border: 'none', // Remove the default border
          borderBottom: '2px solid #d9d9d9', // Set the border-bottom style
          borderRadius: 0, // Remove border-radius to make it consistent with border-bottom
        }} />
      </Form.Item>

    
      {/* <Form.Item
      className="m_t_2"
        label="Resume"
        name="resume"
        rules={[
          {
            required: true,
            message: "Please Upload Resume!",
          },
        ]}
      >
        <Dragger {...info}
         className="m_t_5">
        
          <p className="ant-upload-hint addcandidate_hint">
            <span className="browse">+ Upload</span> 
           
             </p> 
        </Dragger>
      </Form.Item> */}
   </>
  
       } </div>
     
{/*        <div className="resume-upload">
        <div>
          <Button className="uploadResume resman-btn-primary resman-btn-small">Upload Resume</Button>
        </div>
       </div>
        */}

      <div
        style={{
          margin: "10px",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
              <Button className="btn_cancel btn-sm" onClick={Assign? (e)=>handleClickEditAssign():""}>Cancel</Button>

        <Button type="primary" className="btn-sm btn-primary" htmlType="submit"
        loading={Assign? loadingAssign:false}>
          Next
        </Button> 
      </div>
    </>


  );
}