import { Button,  Form, Input, Upload,Modal, Select, Tabs, Checkbox  } from 'antd'

import  { useContext, useEffect, useState } from 'react'

 
import { PlusOutlined } from '@ant-design/icons';
import { Country }  from 'country-state-city-slim';
// import { BASE } from './../../Utils/api';

import CompanyContext from '../../Providers/Company';
import { useForm } from 'antd/es/form/Form';

import { Drawer } from 'antd/lib';

const BASE = import.meta.env.VITE_BASE; 

const AddComapny = ({handleopenDrawerCompany}) => { 
  const [form]=useForm()
   const {fetchCompanySingle,companySingle,handleSendEdit,handleAddComany}=useContext(CompanyContext)
   const [previewOpen, setPreviewOpen] = useState(false);
   const [selectedModules, setSelectedModules] = useState([]);
   const [drawerOpen, setDrawerOpen] = useState(false);
   const [previewImage, setPreviewImage] = useState('');
   const [previewTitle, setPreviewTitle] = useState('');
  const [active, setactive] = useState("1");

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



  const handleCheckboxChange = (checked, access) => {
    setSelectedModules(prevSelected => {
      if (checked) {
        // Add the access module to the selected list
        return [...prevSelected, access];
      } else {
        // Remove the access module from the selected list
        return prevSelected.filter(module => module.module !== access.module);
      }
    });
  };


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
        companySingle?.accessList?.map((item,index)=>{
           let find = accessList.find((i)=>i.module == item?.module)
            if(find){
        form.setFieldsValue({
             [item?.module]:true
        })
                
            }
        })
        
       }, [companySingle])

       const handlefinish =(values)=>{
         console.log("handlefinish",values)
        if(active =="1"){
           setactive("2")
        }
        else{
          console.log("handlefinish",values)
          console.log("handlefinish",selectedModules)
          var formdata =new FormData()

          selectedModules?.forEach((module, index) => {
            Object.keys(module).forEach(key => {
              if (Array.isArray(module[key])) {
                // Append array values individually
                module[key].forEach((item, idx) => {
                  formdata.append(`accessList[${index}][${key}][${idx}]`, item);
                });
              } else {
                formdata.append(`accessList[${index}][${key}]`, module[key]);
              }
            })})
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
       
         handleAddComany(formdata,form,handleopenDrawerCompany) 
         setFileList([])
         setFile("")
        }
       }

       const handleOpenTheme =()=>{
        setDrawerOpen(true)
      }


        const onCloseDrawer =()=>{
          setDrawerOpen(false)
        }

        const accessList= [
          {
            module:"Employee",
            url:"/infopage",
            icon:"UserOutlined",
            component:"EmployeeDashboard",
            
            
            permissions:[
              "View All Employees",
              "Edit Employee Details",
              "Delete Employee Record"
        
            ]
          },
          {
            module:"Clients",
            url:"/clients",
            icon:"clientlogo",
            component:"ClientDashboard",
            permissions:[
              "Add Client",
              "Add Project",
              "Assign Employee"
        
            ]
          },
          {
            module:"Jobs",
            component:"JobDashboard",
            url:"/jobs",
            permissions:[
              "Create Job",
              "Add Candidate",
              "View Job Detail",
              "Update Status",
              "View Candidate Info",
              "DownloadCandidate",
              "View Profit",
             
              "viewClient",
              "AssignIcon",
              "Edit",
              "ViewFilter",
        
            
        
            ],
            icon:"JobsLogo",
          },
          {
            module:"Zive X",
            component:"Candidates",
            url:"/candidates",
          
            permissions:[
              "viewCandidate"
          
            ],
            icon:"candidatesLogo",
          },
          {
            module:"Upload",
            component:"AddCandidate",
            url:"/addcandidate",
          
            permissions:[
              "viewCandidate"
          
            ],
            icon:"PlusOutlined",
          },
          {
            module:"Reports",
            component:"pbf",
            url:"/pbf-report",
          
            permissions:[
              "viewReport",
              "viewClient",
              "viewFilter"
          
            ],
            icon:"ReconciliationOutlined",
          },
          {
            module:"Timesheet",
            component:"TimesheetDashboard",
        
            url:"/TimesheetAdmin",
            icon:"TimesheetLogo",
        
        
            permissions:[
              "View Timesheet",
              "Add Log Hours",
              "View Reports",
             
        
            ]
          },
          {
            module:"Leaves",
            url:"/leave-admin",
            icon:"LeavesLogo",
            permissions:[
              "New Requests",
              "Leaves History",
              "Approval Status",
              "Leave Management",
              "View Candidate Info"
             
        
            ]
          },
          {
            module:"Accounts",
            url:"/invoice-expence",
            icon:"Invoicelogo",
            component:"Accounts",
            children:[
               {
                 name :"Invoice",
                 path:"/invoice",
            icon:"InvoiceLogo",
        
               },
               {
                name :"Expense",
                path:"/expense",
            icon:"ExpenseLogo",
        
              },
        
             
            ],
            permissions:[
              "Add Invoice",
              "Record Payment",
              "Add Expense",
             
             
        
            ]
          },
          {
            module:"Leads",
             url:"/leads",
             component:"Invoicelogo",
             icon:"Invoicelogo",
             children:[
              {
                name :"Company",
                path:"/account",
             icon:"Invoicelogo",
        
              },
              {
               name :"Contacts",
               path:"/contacts",
           icon:"candidatesLogo",
        
             },
            {
              name:"Spaces",
              path:"/space",
              component:"Space",
              icon:"SpaceLogo",
            }
             ],
            permissions:[
              "View Company"
          
            ]
          },
          {
            module:"Contacts",
             url:"/contacts",
             component:"ProfilesEmployee",
             icon:"candidatesLogo",
            
            permissions:[
              "View Contacts",
          
            ]
          },
          {
            module:"Team",
             url:"/teams",
             component:"ProfilesEmployee",
             icon:"TeamLogo",
            
            permissions:[
              "View Team",
          
            ]
          },
          // {
          //   module:"Reports",
          //   url:"/Reports",
          //    icon:"ReportsLogo",
        
          //   permissions:[
          //     "Invoice Summary",
          //     "Expense Summary",
          //     "Payment Summary",
          //     "Profit vs Loss"
             
             
        
          //   ]
          // },
          {
            module:"FileManager",
            url:"/filemanager",
            icon:"FolderOpenOutlined",
            component:"FileMngrDashboard",
            permissions:[
              "Employee Documents",
              "Accounts",
              "Timesheet",
              "SOW"
             
             
        
            ]
          },
          {
            module:"User Management",
             url:"/usermanagement",
             component:"UserManageMent",
             icon:"candidatesLogo",
            
            permissions:[
              "Add Employee",
              "Create New Role",
              "Assign User"
        
            ]
          },
          {
            module:"Settings",
            url:"/setting",
            icon:"Settingslogo",
            component:"Setting",
            permissions:[
              "View Settings",
             
        
            ]
          },
          {
            module:"Company",
            url:"/company",
            icon:"Companylogo",
            component:"Company",
            permissions:[
              "View Company",
             
        
            ]
          },
          // {
          //   module:"UserSettings",
          //    url:"/editEmployee",
          //    component:"EditEmployee",
          //    icon:"UserManageMentLogo",
            
          //   permissions:[
        
          //   ]
          // }
        ]


        const Access = () => {
          return (
            active=="2" &&

            <>
                
                <div className='col_4  m_t_10 m_b_10'>
                {
                   accessList?.map((access)=>{
                    return <div className='d_f g_10 m_t_1 m_b_10'>
                     <Form.Item
                      name={access.module}
                      valuePropName="checked"
                      getValueFromEvent={(e) => {
                        handleCheckboxChange(e.target.checked, access);
                        return e.target.checked;
                      }}
                      >
                       <Checkbox>{access.module}</Checkbox>
                     </Form.Item>
                     
                   
                </div>
                   })
                }
                </div>

                <div style={{
        display: "flex",
        gap:"10px",
        justifyContent:"flex-end"
    }}>
    <button type="button" className="btn btn-sm btn-danger" >Back</button>

    <button  className="btn btn-sm btn-primary"htmlType="submit">Save</button>
    </div>
              
               
             
            </>
          );
        }; 


        const items = [
          {
            label: "Basic Details",
      
            key: "1",
            children: 
               <>
                     <div className='d_f g_30'>
        <Form.Item
     className="m_t_2"
        label="Organization Logo"
       name="logo"
      //  rules={[
      //    {
      //      required: true,
      //      message: "Please Upload Resume!",
      //    },
      //  ]}
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
        <div className='col_2 col_1_sm g_10 g_5_sm'>
          <Form.Item label="Organization" name="organization">
              <Input placeholder='Enter Organization' />
          </Form.Item>
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
        
        </div>
        <div
         className='col_2 g_20 col_1_sm g_5_sm'>
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
          <Form.Item label="Company ID" name="company_id">
              <Input placeholder='Enter Company ID'  />
          </Form.Item>
        </div>
        <Form.Item label="Tax ID" name="tax_id">
              <Input placeholder='Enter Tax ID'  />
          </Form.Item>
        <div className='col_1 g_20 col_1_sm g_5_sm'>
           <p
            style={{
               fontSize:"12px"
            }}>Organization Address</p>
         
              <div className='m_t_1'
              >
            
              <Form.Item name ="address_sreet">
              <Input.TextArea  />
              </Form.Item>
              <Form.Item name="street">
              <Input className='m_t_10' placeholder='Street' />
              </Form.Item>
              <div className='col_2 g_10 m_t_1'>
              <Form.Item name="city">
              <Input className=''  placeholder='Enter City'/>
              </Form.Item>
              <Form.Item name="pincode">
              <Input className=''  placeholder='Enter Pincode'/>
              </Form.Item>
              </div>
              <div className='col_2 g_20 m_t_1'>
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
       
        </div>
        {/* <div className='m_t_10'>
          <Form.Item label="Tax ID" name="tax_id">
              <Input placeholder='Enter Tax ID'  />
          </Form.Item>
        </div> */}

        <div style={{
        display: "flex",
        gap:"10px",
        justifyContent:"flex-end"
    }}>
    <button type="button" className="btn btn-sm btn-danger" >Cancel</button>

    <button  className="btn btn-sm btn-primary"htmlType="submit">next</button>
    </div>

               </>
          },
          {
            label: "Access Modules",
            key: "2",
            children: <Access />,
          },
        ];


        const handleChangeTap = (key) => {
          setactive(key);
        };
       
  return (
    <>
    
     
      
     

        
       <div className="m_t_10">
        
       <Form
        form ={form}
        onFinish={handlefinish}
        layout='vertical'>


<Tabs
          defaultActiveKey="1"
          items={items}
          activeKey={active}
          style={{ zIndex: 1 }}
          onChange={handleChangeTap}
        />
        {/* <Form.Item label ="Organization Logo">
         

        </Form.Item> */}
   
      </Form>
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
    
    {/* <Drawer
        title="Edit Theme Customize "
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        visible={drawerOpen}
        width={400}
      >
       <SettingDrawer onCloseDrawer ={onCloseDrawer}/>
      </Drawer>  */}
    
    </>
    
  )
}

export default AddComapny