import { useState,useContext,useEffect} from 'react';

import Loader from '../../Utils/Loader';

import { Button,Select,Upload, Input,Space,message,Drawer,Form,Table,InputNumber} from 'antd';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const { Option } = Select;
const { Dragger } = Upload;


// import CandidateTable from './candidateTable';
import CandidateContext from '../../Providers/Candidate';
import CandidateImport from './BulkimportCandidate';
import PostmanAdd from './PostmanAdd';
// import CandidateBasicInfo from './CandidateBasicInfo';
// import AssignTable from './AssignTable';
// import AssignEditCandidatesPopup from './AssignEditCandidate';
// import AddCandidatesPopup from './AddCandidate';






const AllCandidatesNew=()=>{
 const [form]=Form.useForm();
 const {loadingaddbutton,candidatestotal,postmanDrawer,postmanOpen,AllcandidatesSearch,handleAddCandidatepage,skillSearch,setLoading,Allcandidate,Allcandidates,candidateLoading,openDrawer,handleOpenDrawer,handleOpenDrawerassign,openAssign,assignEditCandidate,handleClickEditAssign,handleAllcandidateSearch,handleopenDrawerforAdd,openAddCandidateDrawer,handleSkillSearch} = useContext(CandidateContext);
 const [filteredData,setFilterData]=useState([])
 const [value, setValue] = useState("");
 const [fileError, setFileError] = useState(false);
 const [resume, setResume] = useState("");
 

 const props = {
    name: "file",
    multiple: false,
    action: "https://apiv1.technoladders.com/test",
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

//Tabs Items

  


 

 
 const handleChangePhoennumber = (value, data, event, formattedValue) => {
    setValue(formattedValue);
  };


//  Pie Chart Start here
 let data=[{}]
//  Pie Chart ends here


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
      formdata.append("candidate_id", 1000+candidatestotal?.length);
     
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
     


      handleAddCandidatepage(formdata,form)
 }

 const [jsonData, setJsonData] = useState('');
 const [parsedData, setParsedData] = useState(null);

 const handleInputChange = (event) => {
   setJsonData(event.target.value);
 };

 const handleParseJson = () => {
   try {
     const parsedJson = JSON.parse(jsonData);
     setParsedData(parsedJson);
     console.log("parsedJson",parsedJson)
   } catch (error) {
     console.error('Error parsing JSON:', error);
     setParsedData(null);
   }
 };
 
 return( 
     <>

     {/* Drawer Open For CandidateView */}
   
  <Drawer
    title="Add Candidate"
    placement="right"
    onClose={postmanOpen}
    closable={postmanDrawer}
    size="large"
    
    open={postmanDrawer}
    height={50}
    width={450}
    
  >
     <PostmanAdd/>
  </Drawer>

  <Drawer
    title="Import Data"
    placement="right"
    onClose={handleopenDrawerforAdd}
    closable={openAddCandidateDrawer}
    size="large"
    
    open={openAddCandidateDrawer}
    height={50}
    width={650}
    
  >
    <CandidateImport handleopenDrawerforAdd={handleopenDrawerforAdd}/>
     {/* <AddCandidatesPopup/> */}
  </Drawer>

    
     
     {
        candidateLoading && <Loader />
     }
      
      <div className='d_f a_i_c g_10'>
      <p className='heading_text'>Add Candidate</p>
       <button type='primary' className='btn btn-warning btn-sm' 
       onClick={handleopenDrawerforAdd}>+ Bulk Import </button>
        <button type='primary' className='btn btn-primary btn-sm' 
       onClick={postmanOpen}>+ Import Link </button>
       </div>

      {/* <div
      className='d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm f_w_w_md'>
      <Search className="input_search" allowClear placeholder="Search by Candidate Name / ID" enterButton 
      onChange={handleAllcandidateSearch} 
      />
       <Search className="input_search" allowClear placeholder="Search by Skill" enterButton 
      onChange={handleSkillSearch} 
      />
       <div className='d_f a_i_c'>
       <Button type='primary' className='btn create_btn' 
       onClick={handleopenDrawerforAdd}>+ Add Candidate </Button>
       </div>
      </div>       */}
      

    
    <div className='tab m_t_10 m_b_10 p_10 responsive_table addcandidate_new '>
   <Form onFinish={onFinish} form={form}
    className='m_10'
    layout='vertical'>
    <div className='col_4 g_20 col_2_md g_5_md col_1_sm g_5_sm m_t_1_sm'>
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
    <div className='col_4 g_20 col_1_sm g_5_sm col_3_xl g_10_xl col_2_md g_5_md m_t_1_sm '>
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
         
    </div>
    <div className='col_4 g_20 col_1_sm g_5_sm col_3_xl g_10_xl col_2_md g_5_md m_t_1_sm '>
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
    <div className='col_4 g_20 col_1_sm g_5_sm col_3_xl g_10_xl col_2_md g_5_md m_t_1_sm'>
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
     <div className ="col_4 g_20 col_1_sm g_5_sm col_3_xl g_10_xl col_2_md g_5_md m_t_1_sm">
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
    <div style={{
          display:"flex",
          justifyContent:"flex-end",
          // gap:"10px 10px"
       }}>
             <button type="primary" className="btn btn-primary btn-sm" htmlType="submit"
              loading={loadingaddbutton}>
             Save
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
    {/* <Tabs items={items} defaultActiveKey="1" tabBarExtraContent={tableExtra}/> */}
    </div>
     
  


      
        </>
    )
}


export default AllCandidatesNew;