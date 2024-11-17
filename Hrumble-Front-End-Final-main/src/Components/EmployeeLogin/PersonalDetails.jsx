import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, Space, Upload, message } from 'antd'
import { Option } from 'antd/es/mentions'
import Dragger from 'antd/es/upload/Dragger'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import EmployeeContext from '../../Providers/EmployeeProvider';
import JobContext from '../../Providers/JobProvider';
import Loader from '../../Utils/Loader';
import dayjs from 'dayjs';
import { BASE } from '../../Utils/api';
import moment from 'moment';
// import { Country, State, City } from 'country-state-city';
import { Country, State }  from 'country-state-city-slim';
import { useParams } from 'react-router-dom';
import CookieUtil from '../../Utils/Cookies';

const PersonalDetails = ({resetTo25}) => {

  const {editPersonal,Loading,addbuttonEmply,personalEmp,fetchPersonalDetail,defaultfilelist,employeeLogindata}=useContext(EmployeeContext)
  const {location} = useContext(JobContext);

  console.log("personal---",personalEmp)

  let params = useParams();

  let displayPicture = [
    {
      uid: "1",
      name: personalEmp?.display_profile_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${personalEmp?.display_profile_file}`, // Set the URL of the default file
        }
  ]; 

  let aadharfile = [
    {
      uid: "2",
      name: personalEmp?.aadhar_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${personalEmp?.aadhar_file}`, // Set the URL of the default file
        }
  ]; 

  let panfile = [
    {
      uid: "3",
      name: personalEmp?.pan_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${personalEmp?.pan_file}`, // Set the URL of the default file
        }
  ];

  let esicfile = [
    {
      uid: "4",
      name: personalEmp?.esic_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${personalEmp?.esic_file}`, // Set the URL of the default file
        }
  ];

  let uanfile = [
    {
      uid: "5",
      name: personalEmp?.uan_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${personalEmp?.uan_file}`, // Set the URL of the default file
        }
  ];

  // console.log("personalDet22",employeeLogindata)
  
  const [form] = Form.useForm();

  const[upload,setUpload]=useState("")
  const[Aadharupload,setAadharUpload]=useState("")
  const[panupload,setPanUpload]=useState("")
  const[esicupload,setEsicUpload]=useState(null)
  const[uanupload,setUanUpload]=useState("")

  const [fileList, setFileList] = useState([]);
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);

  const[country,setCountry]=useState("")
  const[state,setState]=useState([])
  const[city,setCity]=useState([]) 

  const[country1,setCountry1]=useState("")
  const[state1,setState1]=useState([])
  const[city1,setCity1]=useState([]) 

    let countryList=Country.getAllCountries()
    let countrydata=[]
    let countrydata1=[]

  const dateFormat = 'YYYY/MM/DD';
  const [defaultDate, setDefaultDate] = useState(dayjs());

  const handleDateChange = (date) => {
    // Update the default date when the user selects a new date
    setDefaultDate(date);
  };

  // Country , State function starts here

  countryList?.map((item)=>{
    countrydata.push({
       label:item?.name,
       value:`${item?.name},${item?.isoCode}`
    })
   })

   countryList?.map((item)=>{
    countrydata1.push({
       label:item?.name,
       value:`${item?.name},${item?.isoCode}`
    })
   })

  const selectCountryChange=(e,reset)=>{
    
    if(reset){
       form.setFieldsValue({
           state:"",
           city:""
       })
    }
   
      setCountry(e?.split(",")[1])
     let state=State.getStatesOfCountry(e?.split(",")[1])
      let setstatedata=state?.map((item)=>(
       {
         label:item?.name,
         value:`${item?.name},${item?.isoCode}`
       }
          
       
      ))
      setState(setstatedata)
 }

 const selectCountryChange1=(e,reset)=>{
    
  if(reset){
     form.setFieldsValue({
         state:"",
         city:""
     })
  }
 
    setCountry1(e?.split(",")[1])
   let state=State.getStatesOfCountry(e?.split(",")[1])
    let setstatedata=state?.map((item)=>(
     {
       label:item?.name,
       value:`${item?.name},${item?.isoCode}`
     }
        
     
    ))
    setState1(setstatedata)
}

 const handlestateChange=(e)=>{
     
  City.getCitiesOfState(country,e?.split(",")[1])
  
  let cityapidata =City.getCitiesOfState(country,e?.split(",")[1])
     let setcitydata=cityapidata?.map((item)=>(
      {
        label:item?.name,
        value:item?.name
      }
         
      
     ))
     setCity(setcitydata)
}

const handlestateChange1=(e)=>{
     
  City.getCitiesOfState(country1,e?.split(",")[1])
  
  let cityapidata =City.getCitiesOfState(country1,e?.split(",")[1])
     let setcitydata=cityapidata?.map((item)=>(
      {
        label:item?.name,
        value:item?.name
      }
         
      
     ))
     setCity1(setcitydata)
}

  // Country , State function ends here



  const onFinish = (Values) => {
  var formdata = new FormData();

  console.log("v---------------------->",Values)
    
  formdata.append("edittype",Values["personal"]);
  formdata.append("employee_id", Values["employee_id"]);
  formdata.append("firstname", Values["firstname"]);
  formdata.append("lastname", Values["lastname"]);
  formdata.append("mobile",Values["mobile"]);
  formdata.append("email",Values["email"]);
  formdata.append("dob",Values["dob"]);
  formdata.append("gender",Values["gender"]);
  formdata.append("blood_group",Values["blood_group"]);
  formdata.append("marital_status",Values["marital_status"]);
  upload && formdata.append("display_profile_file",upload)
  formdata.append("aadhar_num",Values["aadhar_num"])
  Aadharupload && formdata.append("aadhar_file",Aadharupload)
  formdata.append("pan_num",Values["pan_num"])
  panupload && formdata.append("pan_file",panupload)
  formdata.append("uan_num",Values["uan_num"])
  uanupload && formdata.append("uan_file",uanupload)
  formdata.append("esic_num",Values["esic_num"])
  esicupload && formdata.append("esic_file",esicupload)
  formdata.append("present_addr",Values["present_addr"])
  formdata.append("present_country",Values["present_country"])
  formdata.append("present_state",Values["present_state"])
  formdata.append("present_district",Values["present_district"])
  formdata.append("present_zipcode",Values["present_zipcode"])
  formdata.append("permanent_addr",Values["permanent_addr"])
  formdata.append("permanent_country",Values["permanent_country"])
  formdata.append("permanent_state",Values["permanent_state"])
  formdata.append("permanent_district",Values["permanent_district"])
  // formdata.append("form_completion",Values["form_completion"])

  console.log("xxxxxxx----------->",formdata)

  

  let emergencyContacts = Values["emergencyContacts"];  

  emergencyContacts?.forEach((item, index) => {
          for (const key in item) {
            formdata.append(`emergencyContacts[${index}][${key}]`, item[key]);
          }
        });

   let familyDetails = Values["familyDetails"];  

        familyDetails?.forEach((item, index) => {
          for (const key in item) {
            formdata.append(`familyDetails[${index}][${key}]`, item[key]);
          }
        });

  console.log("fff----------->",formdata)

  editPersonal(formdata,params?.id)
  }
      console.log("url",personalEmp?.display_profile_file?.originalname)

  useEffect(() => {

    console.log("perssss",personalEmp)
    let setData = {
      employee_id: personalEmp?.employee_id!=="undefined"? personalEmp?.employee_id : " ",
      firstname: personalEmp?.firstname!=="undefined"? personalEmp?.firstname : " ",
      lastname: personalEmp?.lastname!=="undefined"? personalEmp?.lastname : " ",
      mobile: personalEmp?.mobile!=="undefined"? personalEmp?.mobile : " ",
      dob: moment(personalEmp?.dob, 'YYYY-MM-DD'),
      email: personalEmp?.email!=="undefined"? personalEmp?.email : " ",
      gender: personalEmp?.gender!=="undefined"? personalEmp?.gender : " ",
      blood_group: personalEmp?.blood_group!=="undefined"? personalEmp?.blood_group : " ",
      marital_status: personalEmp?.marital_status!=="undefined"? personalEmp?.marital_status : " ",
      aadhar_num: personalEmp?.aadhar_num!=="undefined"? personalEmp?.aadhar_num : " ",
      pan_num: personalEmp?.pan_num!=="undefined"? personalEmp?.pan_num : " ",
      esic_num: personalEmp?.esic_num!=="undefined"? personalEmp?.esic_num : " ",
      uan_num: personalEmp?.uan_num!=="undefined"? personalEmp?.uan_num : " ",
      present_addr: personalEmp?.present_addr!=="undefined"? personalEmp?.present_addr : " ",
      permanent_addr: personalEmp?.permanent_addr!=="undefined"? personalEmp?.permanent_addr : " ",
      present_country: personalEmp?.present_country!=="undefined"? personalEmp?.present_country : " ",
      present_state: personalEmp?.present_state!=="undefined"? personalEmp?.present_state : " ",
      permanent_country: personalEmp?.permanent_country!=="undefined"? personalEmp?.permanent_country : " ",
      permanent_state: personalEmp?.permanent_state!=="undefined"? personalEmp?.permanent_state : " ",
      present_district: personalEmp?.present_district!=="undefined"? personalEmp?.present_district : " ",
      present_zipcode: personalEmp?.present_zipcode!=="undefined"? personalEmp?.present_zipcode : " ",
      permanent_district: personalEmp?.permanent_district!=="undefined"? personalEmp?.permanent_district : " ",
      permanent_zipcode: personalEmp?.permanent_zipcode!=="undefined"? personalEmp?.permanent_zipcode : " ",
      emergencyContacts: personalEmp?.emergencyContacts,
      familyDetails: personalEmp?.familyDetails,
      
      // form_completion: personalEmp?.form_completion,

    }

    // Check if dob is available before setting the fields value
   
      form.setFieldsValue(setData);
    
  }, [personalEmp]);


  useEffect(() => {

    let role = CookieUtil.get("role")

    let id = CookieUtil.get("admin_id")

    if(role=="Employee"){
      fetchPersonalDetail(id);
    }
    else{
      fetchPersonalDetail(params?.id);
    }  
},[]);

useEffect(() => {
  
},[Loading])

const [showUploadLabel, setShowUploadLabel] = useState(true);

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      setShowUploadLabel(false);
    }
  };

  // file upload function starts here

  const props = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: displayPicture,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setUpload (info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setUpload (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props1 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: aadharfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setAadharUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setAadharUpload (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };


  const props2 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: panfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setPanUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setPanUpload(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props3 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: esicfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setEsicUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setEsicUpload(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props4 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: uanfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setUanUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setUanUpload(info.file.originFileObj);

      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  var formdata = new FormData();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onChange1 = ({ fileList: newFileList1 }) => {
    setFileList1(newFileList1);
  };

  // const onChange2 = ({ fileList: newFileList2 }) => {
  //   setFileList2(newFileList2);
  // };

  // const onChange3 = ({ fileList: newFileList3 }) => {
  //   setFileList3(newFileList3);
  // };
  // const onChange4 = ({ fileList: newFileList4 }) => {
  //   setFileList4(newFileList4);
  // };


  // file upload function ends here

  // Date change format starts here

  // const originalDateString = "2023-12-07T07:27:59.000Z";
  // const originalDate = new Date(originalDateString);

  // const options = { day: 'numeric', month: 'short', year: 'numeric' };

  // const formattedDate = originalDate.toLocaleDateString('en-US', options);

  // Date change format ends here

  return (
    <div className='p_10'>
      {
        Loading ? <Loader /> :
      
   
      <Form layout='vertical' onFinish={onFinish} form={form}>
        <label className='card_header'>Basic Info</label>
        <p className='zive-onboarding-para'>Add your basic information here.</p>
        <div className='col_5 col_1_sm p_t_15'>
        <Form.Item label="Employee ID" name="employee_id">
            <Input placeholder='001' />
        </Form.Item>
        </div>
        <div className='col_4 g_20 col_1_sm g_5_sm'>
            <Form.Item label="First Name" name="firstname">
                <Input />
            </Form.Item>
            <Form.Item label="Last Name" name="lastname">
                <Input />
            </Form.Item>
            <Form.Item label="Phone Number" name="mobile">
                <Input />
            </Form.Item>
        </div>
        <div className='col_4 g_20 col_1_sm g_5_sm'>
            <Form.Item label="Email" name="email"
            rules={[
              {
                required:true,
                message:"Enter Email"
              }
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="DOB" name="dob">
                <DatePicker format={dateFormat} />
            </Form.Item>
            <Form.Item label="Gender" name="gender"
            rules={[
              {
                required:true,
                message:"Enter Gender"
              }
            ]}>
                <Radio.Group>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                </Radio.Group>
            </Form.Item>
        </div>
        <div className='col_4 g_20 col_1_sm g_5_sm'>
            <Form.Item label="Blood Group" name="blood_group">
                <Input />
            </Form.Item>
            <Form.Item label="Maritial Status" name="marital_status"  >
                <Radio.Group>
                    <Radio value="Married">Married</Radio>
                    <Radio value="Unmarried">Unmarried</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item> </Form.Item>
        </div>
        <div className='col_4 col_1_sm g_5_sm'>
        <Form.Item label="Profile Picture" name="display_profile_file"
        >
        <Dragger className='d_f f_w_w' {...props}>
            <UploadOutlined className='zive-project-uploadicon'/>
            <p className="ant-upload-text">Drag Your file here or <span className="profile-browse">Browse</span></p>
            <p className="ant-upload-hint">
                Support format .PDF,.PNG,.JPG
            </p>
        </Dragger>
        </Form.Item>
        </div>
        <div className='col_4 g_20 col_2_md col_2_sm g_5_sm'>
        <Form.Item label="Aadhar Number" name="aadhar_num">
            <Input placeholder='Enter Aadhar Number' />
        </Form.Item>
        <Form.Item label=" "name="aadhar_file" >
        <Upload {...props1}>
                  <>
                  
                  {!Aadharupload && (
                    <label className='zive-personal-upload-label'> + Upload <span className='zive-personal-upload-supported d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  )}
                  
                  </></Upload>
        </Form.Item>
        </div>
        <div className='col_4 g_20 col_2_md col_2_sm g_5_sm'>
        <Form.Item label="Pan Number" name="pan_num">
            <Input placeholder='Enter Pan Number' />
        </Form.Item>
        <Form.Item label=" " name="pan_file">
        <Upload {...props2}>
                  <>
                  {!panupload && (
                    <label className='zive-personal-upload-label'> + Upload <span className='zive-personal-upload-supported d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  )}
                  </>
                </Upload>
        </Form.Item>
        </div>
        <div className='col_4 g_20 col_2_md col_2_sm g_5_sm'>
        <Form.Item label="ESIC Number" name="esic_num">
            <Input placeholder='Enter ESIC Number' />
        </Form.Item>
        <Form.Item label=" " name="esic_file">
      <Upload {...props3}>
        <>
          {!esicupload && (
            <label className='zive-personal-upload-label'> + Upload <span className='zive-personal-upload-supported d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
          )}
        </>
      </Upload>
    </Form.Item>
        </div>
        <div className='col_4 g_20 col_2_md col_2_sm g_5_sm'>
        <Form.Item label="UAN Number" name="uan_num">
            <Input placeholder='Enter UAN Number' />
        </Form.Item>
        <Form.Item label=" " name="uan_file">
        <Upload {...props4}>
                  <>
                  {!uanupload && (
                    <label className='zive-personal-upload-label'> + Upload <span className='zive-personal-upload-supported d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  )}
                   
                  </></Upload>
        </Form.Item>
        </div>

        <hr className='zive-hr-line' />

        <div className='p_t_15'>
            <label className='card_header'>Contact Info</label>
            <p className='zive-onboarding-para d_f f_w_w'>Add your address,emergency contact & family info here.</p>
            <div className='col_2 p_t_15'>
                <label className='zive-personalDetails-addressH'>Present Address</label>
                <label className='zive-personalDetails-addressH'>Permanent Address <Checkbox className='zive-personalDetails-addressCh'>Check if both the address are same</Checkbox></label>
            </div>
            <div className='col_2 g_20 p_t_15 col_1_sm g_5_sm'>
            <Form.Item label="Add Address Line 1" name="present_addr" className='zive-onboarding-addressIn'>
                <Input placeholder='Door No, Apartment, Building, Floor etc.'/>
            </Form.Item>
            <Form.Item label="Add Address Line 2" name="permanent_addr" className='zive-onboarding-addressIn'>
                <Input placeholder='Door No, Apartment, Building, Floor etc.' />
            </Form.Item>
            </div>
            <div className='col_4 g_20 col_1_sm g_5_sm'>
                <Form.Item label="Country" name="present_country">
                    <Select 
                      onChange={selectCountryChange}
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
                      options={countrydata} />
                </Form.Item>
                <Form.Item label="State/Province" name="present_state">
                  <Select 
                    onChange={handlestateChange}
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
                    options={state} />
                </Form.Item>
                <Form.Item label="Country" name="permanent_country">
                    <Select 
                      onChange={selectCountryChange1}
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
                      options={countrydata1} />
                </Form.Item>
                <Form.Item label="State/Province" name="permanent_state">
                  <Select 
                    onChange={handlestateChange1}
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
                    options={state1} />
                </Form.Item>
            </div>
            <div className='col_4 g_20 col_1_sm g_5_sm'>
                <Form.Item label="City" name="present_district">
                  <Select 
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
                                options={city} />
                </Form.Item>
                <Form.Item label="Zip/Postal Code" name="present_zipcode">
                  <Input placeholder='Enter Code' />
                </Form.Item>
                <Form.Item label="City" name="permanent_district">
                  <Select 
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
                                options={city1} />
                </Form.Item>
                <Form.Item label="Zip/Postal Code" name="permanent_zipcode">
                  <Input placeholder='Enter Code' />
                </Form.Item>
            </div>
        </div>
        
        <hr className='zive-hr-line' />

        <div className='p_t_15'>
            <label className='card_header'>Emergency Contact</label>
            <p className='zive-onboarding-para'>Add your address,emergency contact & family info here.</p>
        </div>

        <div className="col_1 p_t_20 col_1_sm">

            <Form.List name="emergencyContacts" label="Contact">
    {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }) => (
        <Space
          
          key={key}
        >
          <div className='d_f f_w_w g_80 g_5_sm'>
          <Form.Item
            {...restField}
            label="Relationship"
            name={[name, 'relationship']}
            rules={[
              {
                required: true,
                message: 'Missing  name',
              },
            ]}
          >
            <Input placeholder=" Relationship" />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Name"
            name={[name, 'relationship_name']}
           
          >
            <Input placeholder='Enter Name' />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Phone Number"
            name={[name, 'phone_no']}
           
          >
            <Input placeholder='Enter Number'  />
          </Form.Item>
          <MinusCircleOutlined onClick={() => remove(name)} />
          </div>
        </Space>
      ))}
      <Form.Item>
       <div className="col_3">
       <Button className="btn_cancel w_40_p" type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
           Add Emergency Contact
        </Button>
       </div>
      </Form.Item>
    </>
  )}
</Form.List>
        </div>

      <hr className='zive-hr-line' />

      <div>
        <div className='p_t_15'>
          <label className='card_header'>Family Details</label>
          <p className='zive-onboarding-para'>Add your address,emergency contact & family info here.</p>
        </div>
        <div className="col_1 p_t_20 col_1_sm">

            <Form.List name="familyDetails" label="Contact">
    {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }) => (
        <Space
          
          key={key}
        >
          <div className='d_f f_w_w g_80 g_5_sm'>
          <Form.Item
            {...restField}
            label="Relationship"
            name={[name, 'relationship']}
            rules={[
              {
                required: true,
                message: 'Missing  name',
              },
            ]}
          >
            <Input placeholder=" Relationship" />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Name"
            name={[name, 'name']}
           
          >
            <Input placeholder='Enter Name'  />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Occupation"
            name={[name, 'occupation']}
            
          >
            <Input placeholder="Enter Occupation" />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Phone Number"
            name={[name, 'phone_no']}
           
          >
            <Input placeholder='Enter Number' />
          </Form.Item>
          <MinusCircleOutlined onClick={() => remove(name)} />
          </div>
        </Space>
      ))}
      <Form.Item>
       <div className="col_3">
       <Button className="btn_cancel w_40_p" type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
           Add Family Details
        </Button>
       </div>
      </Form.Item>
    </>
  )}
  </Form.List>
        </div>
      </div>
      {/* <div className='zive-profile-button j_c_c_sm'>
        <Button className='btn' type='primary' htmlType='submit' onClick={resetTo25} loading={addbuttonEmply}>Save & Next</Button>
      </div> */}
      </Form>
}
    </div>
  )
}

export default PersonalDetails