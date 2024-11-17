import { Button, Form, Input, Select, Upload, message } from 'antd'
import { Option } from 'antd/lib/mentions'
import  { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { BASE } from '../../Utils/api'
// import { Country, State, City } from 'country-state-city';
import { Country, State }  from 'country-state-city-slim';
import { useParams } from 'react-router-dom'
import Loader from '../../Utils/Loader'
import CookieUtil from '../../Utils/Cookies'

const BankDetails = ({handlePrev,setGoSteps,goSteps}) => {

  const {editPersonal,Loading,employeeLogindata,addbuttonEmply,bankDetailEmp,fetchBankDetails,employeesingle} = useContext(EmployeeContext);

  console.log("bank",bankDetailEmp)

  let params = useParams();

  let chequefile = [
    {
      uid: "1",
      name: bankDetailEmp?.cheque_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${bankDetailEmp?.cheque_file}`, // Set the URL of the default file
        }
  ]; 

  const [chequeupload,SetChequeUpload]= useState("");

  const [fileList, setFileList] = useState([]);

  const[country,setCountry]=useState("")
  const[state,setState]=useState([])
  const[city,setCity]=useState([])

  let countryList=Country.getAllCountries()
  let countrydata=[]

  countryList?.map((item)=>{
    countrydata.push({
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

  let [form] = Form.useForm();

  const onFinish = (Values) => {
    
    var formdata = new FormData();

    let _id =CookieUtil.get("admin_id")

    formdata.append("edittype",Values["bank"]);
    formdata.append("name_as_in_bank",Values["name_as_in_bank"]);
    formdata.append("account_num",Values["account_num"]);
    formdata.append("bank_name",Values["bank_name"]);
    formdata.append("branch_name",Values["branch_name"]);
    formdata.append("ifsc_code",Values["ifsc_code"]);
    formdata.append("branch_addr",Values["branch_addr"]);
    formdata.append("bank_country",Values["bank_country"])
    formdata.append("bank_state",Values["bank_state"])
    formdata.append("bank_city",Values["bank_city"])
    formdata.append("bank_zipcode",Values["bank_zipcode"])

    chequeupload && formdata.append("cheque_file",chequeupload);

    console.log("bankkkk",formdata)
    editPersonal(formdata,_id)
  }

  const props = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: chequefile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          SetChequeUpload (info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         SetChequeUpload (info.file.originFileObj);

      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };


  useEffect(() => {

    let setData = {
      name_as_in_bank: bankDetailEmp?.name_as_in_bank!=="undefined" ? bankDetailEmp?.name_as_in_bank : " ",
      account_num: bankDetailEmp?.account_num!=="undefined" ? bankDetailEmp?.account_num : " ",
      bank_name: bankDetailEmp?.bank_name!=="undefined" ? bankDetailEmp?.bank_name : " ",
      branch_name: bankDetailEmp?.branch_name!=="undefined" ? bankDetailEmp?.branch_name : " ",
      ifsc_code: bankDetailEmp?.ifsc_code!=="undefined" ? bankDetailEmp?.ifsc_code : " ",
      branch_addr: bankDetailEmp?.branch_addr!=="undefined" ? bankDetailEmp?.branch_addr : " ",
      bank_country: bankDetailEmp?.bank_country!=="undefined" ? bankDetailEmp?.bank_country : " ",
      bank_state: bankDetailEmp?.bank_state!=="undefined" ? bankDetailEmp?.bank_state : " ",
      bank_city: bankDetailEmp?.bank_city!=="undefined" ? bankDetailEmp?.bank_city : " ",
      bank_zipcode: bankDetailEmp?.bank_zipcode!=="undefined" ? bankDetailEmp?.bank_zipcode : " ",
    }
    
    form.setFieldsValue(setData)

  },[bankDetailEmp])

  useEffect(() => {
    let role = CookieUtil.get("role")

    let id = CookieUtil.get("admin_id")

    if(role=="Employee"){
      fetchBankDetails(id);
    }
    else{
      fetchBankDetails(params?.id);
    }  
  },[])

  return (

    Loading ? <Loader /> :

    <div className='p_10'>
      
      <label className='zive-jobDetail-desc'>Bank Account Details</label>
      <p className='zive-onboarding-para'>Add your bank account details here.</p>
      <Form layout='vertical' onFinish={onFinish} form={form}>
      <div className='col_4 g_20 p_t_15 col_1_sm g_5_sm'>
        <Form.Item label="Name as in Bank" name="name_as_in_bank">
          <Input placeholder='Enter your name' />
        </Form.Item>
      </div>
      <div className='col_4 g_20 col_1_sm g_5_sm'>
        <Form.Item label="Account Number" name="account_num">
          <Input placeholder='Enter Account Number' />
        </Form.Item>
        <Form.Item label="Bank Name" name="bank_name">
          <Input placeholder='Enter Bank Name' />
        </Form.Item>
      </div>
      <div className='col_4 g_20 col_1_sm g_5_sm'>
        <Form.Item label="Branch Name" name="branch_name">
          <Input placeholder='Enter Branch Name' />
        </Form.Item>
        <Form.Item label="IFSC Code" name="ifsc_code">
          <Input placeholder='Enter IFSC Code' />
        </Form.Item>
      </div>
      <div className='col_2 col_1_sm g_5_sm'>
        <Form.Item label="Branch Address" name="branch_addr">
          <Input placeholder='Enter Branch Address' />
        </Form.Item> 
      </div>
      <div className='col_4 g_20 col_1_sm g_5_sm'>
        <Form.Item label="Country" name="bank_country">
          <Select placeholder="Select Country" onChange={selectCountryChange}
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
        <Form.Item label="State/Province" name="bank_state">
          <Select placeholder="Select State" onChange={handlestateChange}
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
      </div>
      <div className='col_4 g_20 col_1_sm g_5_sm'>
        <Form.Item label="City" name="bank_city">
          <Select placeholder="Select City" showSearch
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
        <Form.Item label="Zip/Postal code" name="bank_zipcode">
          <Input placeholder='Enter Zip Code' />
        </Form.Item>
      </div>
      <div className='col_4 g_20 col_1_sm g_5_sm'>
        <Form.Item label="Supporting Document(Optional)" name="cheque_file">
          <Input placeholder='Cancel Cheque / Passbook first page' disabled={true} />
        </Form.Item>
        <Form.Item label=" " name="cheque_file">
                <Upload {...props}
            
            >
              <>
              {!chequeupload && (
                <label className='zive-personal-upload-label'> + Upload File</label>
              )}
                
              </></Upload>

          </Form.Item>
      </div>
      <hr className='zive-hr-line' />
      <div className="text-end toolbar toolbar-bottom p-2">
        <Button className="btn btn-secondary sw-btn-prev me-1" onClick={handlePrev}>Prev</Button>
        <Button className="btn btn-primary sw-btn-next ms-1" htmlType="submit">Submit</Button>
      </div>
      </Form>

    </div>
  )
}

export default BankDetails
