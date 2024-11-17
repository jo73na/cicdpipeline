import { Button,  Form, Input, Upload,Modal, Select  } from 'antd'

import  { useContext, useEffect, useState } from 'react'

 
import { PlusOutlined } from '@ant-design/icons';
import { Country }  from 'country-state-city-slim';
import { BASE } from './../../Utils/api';

import CompanyContext from '../../Providers/Company';
import { useForm } from 'antd/es/form/Form';
import SettingDrawer from './SettingDrawer';
import { Drawer } from 'antd/lib';



const Setting = () => { 
  const [form]=useForm()
   const {fetchCompanySingle,companySingle,handleSendEdit,}=useContext(CompanyContext)
   const [previewOpen, setPreviewOpen] = useState(false);
   const [drawerOpen, setDrawerOpen] = useState(false);
   const [previewImage, setPreviewImage] = useState('');
   const [previewTitle, setPreviewTitle] = useState('');
   const [file, setFile] = useState('');
   let countryList=Country.getAllCountries()
   let countrydata  =[]


   const industryselect =[{
    label:"Agency or Sales House",
    value:"Agency or Sales House",
   },
   {
    label:"Agriculture",
    value:"Agriculture",
   },
   {
    label:"Art and Design",
    value:"Art and Design",
   },
   {
    label:"Automotive",
    value:"Automotive",
   },
   {
    label:"Construction",
    value:"Construction",
   },
   {
    label:"Consulting",
    value:"Consulting",
   },
   {
    label:"Consumer Pakaged Goods ",
    value:"Consumer Pakaged Goods",
   },
   {
    label:"Education ",
    value:"Education",
   },
   {
    label:"Engineering",
    value:"Engineering",
   },
   {
    label:"Entertainment",
    value:"Entertainment",
   },
   {
    label:"Financial Services",
    value:"Financial Services",
   },
   {
    label:"Food Services",
    value:"Food Services",
   },
   {
    label:"Gaming",
    value:"Gaming",
   },
   {
    label:"Services",
    value:"Services",
   },
   {
    label:"Technology",
    value:"Technology",
   },
   {
    label:"Telecommunication",
    value:"Telecommunication",
   },
   {
    label:"Travel/Hospitality",
    value:"Travel/Hospitality",
   },
   {
    label:"Web design",
    value:"Web design",
   },
   {
    label:"Web Development",
    value:"Web Development",
   },
   {
    label:"Manufacturing",
    value:"Manufacturing",
   },
  ]


countryList?.map((item)=>{
 countrydata.push({
    label:item?.name,
    value:`${item?.name},${item?.isoCode}`
 })
})

   const getBase64 = (file) =>
   new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = (error) => reject(error);
   });

    

     

      const [fileList, setFileList] = useState([
       
      ]);

      const handleCancel = () => setPreviewOpen(false);
      const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
      };
      const handleChange = (info) => {
        setFileList(info.fileList);
        setFile(info.file.originFileObj);
      }
      const uploadButton = (
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
        >
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </button>
      );



    


       useEffect(() => {
        fetchCompanySingle()
        
       }, [])
       useEffect(() => {
        console.log("companySingle",companySingle)
        form.setFieldsValue(companySingle)
        companySingle?.logo ?
        setFileList([
          {
            uid: "1",
            name: companySingle?.logo,
            status: "done", // Set the status to 'done' for default files
            url: `${BASE}${companySingle?.logo}`, // Set the URL of the default file
          },
        ])
        :
        setFileList[{}]
        
       }, [companySingle])

       const handlefinish =(values)=>{
         console.log("handlefinish",values)
         var formdata =new FormData()
         formdata.append("organization",values.organization)
         formdata.append("industry",values.industry||"")
         formdata.append("location",values.location||"")
         formdata.append("address_sreet",values.address_sreet||"")
         formdata.append("state",values.state||"")
         formdata.append("city",values.city||"")
         formdata.append("street",values.street||"")
         formdata.append("pincode",values.pincode||"")
         formdata.append("phone_number",values.phone_number||"")
         formdata.append("company_id",values.company_id||"")
         formdata.append("tax_id",values.tax_id||"")
         file && ( formdata.append("logo",file))
         handleSendEdit(formdata)  
       }

       const handleOpenTheme =()=>{
        setDrawerOpen(true)
      }


        const onCloseDrawer =()=>{
          setDrawerOpen(false)
        }
       
  return (
    <>
     <p className="heading_text">Settings</p>
     
      
      <div className='col_2'>

        
       <div className='card p_10'>
         <div className='d_f j_c_f_e'>
         <Button type ="primary" className='btn' onClick ={handleOpenTheme}>Theme Customize</Button>

         </div>
       <Form
        form ={form}
        onFinish={handlefinish}
        layout='vertical'>
        {/* <Form.Item label ="Organization Logo">
         

        </Form.Item> */}
        <div className='d_f g_30'>
        <Form.Item
     className="m_t_2"
        label="Organization Logo"
       name="logo"
       rules={[
         {
           required: true,
           message: "Please Upload Resume!",
         },
       ]}
     >
    
     <Upload
        action={`${BASE}test`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
    
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
     </Form.Item>
        </div>
        <div>
          <Form.Item label="Organization" name="organization">
              <Input placeholder='Enter Organization' />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Industry" name="industry">
             <Select
               placeholder="Select Industry"
               options={industryselect}
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
           
              />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Organization Location" name="location">
              <Select placeholder='Address' 
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
        </div>
        <div className='d_f g_30'>
          <label style={{
                fontWeight: "700"
          }}>Organization Address</label>
         
              <div className=''>
              <Form.Item name ="address_sreet">
              <Input.TextArea  />
              </Form.Item>
              <Form.Item name="street">
              <Input className='m_t_10' placeholder='Street' />
              </Form.Item>
              <div className='d_f g_10 m_t_1'>
              <Form.Item name="city">
              <Input className=''  placeholder='Enter City'/>
              </Form.Item>
              <Form.Item name="pincode">
              <Input className=''  placeholder='Enter Pincode'/>
              </Form.Item>
              </div>
              <div className='d_f g_20 m_t_1'>
              <Form.Item name="state">
              <Input className=''  placeholder='Enter State'/>
              </Form.Item>
              <Form.Item name="phone_number">
              <Input className=''  placeholder='Enter Phone Number'/>
              </Form.Item>
             
              </div>
              </div>
             
              

        
        </div>
        <div className='m_t_10'>
          <Form.Item label="Company ID" name="company_id">
              <Input placeholder='Enter Company ID'  />
          </Form.Item>
        </div>
        <div className='m_t_10'>
          <Form.Item label="Tax ID" name="tax_id">
              <Input placeholder='Enter Tax ID'  />
          </Form.Item>
        </div>

        <div style={{
        display: "flex",
        gap:"10px",
        justifyContent:"flex-end"
    }}>
    <Button  className="btn_cancel" >Cancel</Button>

    <Button type="primary" className="btn"htmlType="submit">Save</Button>
    </div>
      </Form>
       </div>
      </div>

     {/* <div className='d_f j_c_f_e m_5'>
        <Button type='primary' className='btn ' onClick={handleopenDrawer}>Add Company Details</Button>
     </div>
     <Table dataSource={[]} columns={columns} />

     <div>

     </div> */}
      
    {/* <div className='col_2'>
        <div className='card p_10'>
        <Form
     layout='vertical'>
        <div className='col_2'>
       
           <Form.Item label="Company Name" >
             <Input/>
           </Form.Item> 
         
        </div>
        <div className=''>
        <Form.Item label="Company Address" >
             <Input.TextArea/>
           </Form.Item>
        </div>
        <div className=''>
        <Form.Item
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
        <Dragger {...props}>
          {/* <p className="ant-upload-drag-icon">
            <img src={Upload1} className="d_i_b" />
          </p> */}
          
          {/* {/* <p className="ant-upload-text">
            Drag Your file here or <span className="browse">Browse</span>
          </p> */}
          {/* <p className="ant-upload-hint addcandidate_hint"><span className="browse">+ Upload</span> Support format .PDF,.PNG,.JPG</p> 
        </Dragger>
      </Form.Item>
        </div>
        <div></div>

        </Form>
        </div>
      <div className=''>
     
      </div>
        <div></div> */}
    
    <Drawer
        title="Edit Theme Customize "
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        visible={drawerOpen}
        width={400}
      >
       <SettingDrawer onCloseDrawer ={onCloseDrawer}/>
      </Drawer> 
    
    </>
    
  )
}

export default Setting