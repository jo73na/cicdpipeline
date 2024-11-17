import { Button, Form, Select, TimePicker } from 'antd'
import { useEffect, useState } from 'react'

// import { UploadOutlined } from '@ant-design/icons';
import {DeleteOutlined} from "@ant-design/icons"
import axios from "axios"

import dayjs from 'dayjs';

import { useForm } from "antd/lib/form/Form";

import { BASE_URL } from '../../Utils/api'
import CookieUtil from '../../Utils/Cookies';





export default function AddLogHoursPopup({onSave,args,edit}) {
 const [clients,setClients]=useState([])
 const [projectsByClient, setProjectsByClient] = useState([]);
 const [projectData, setProjectData] = useState([]);
 console.log("clients",clients)

 const [form] = useForm();
 const initialValue = '12:30';

 const options = [{
  label:"0:00",value:"0:00"

 }
  
 ];

 for (let hour = 1; hour <= 20; hour++) {
   options.push({ label: `${hour}:00`, value: `${hour}:00` });
   options.push({ label: `${hour}:30`, value: `${hour}:30` });
 }

//  let clientsData=[]
//  clients?.map((item)=>{
//     clientsData.push({
//        value:item?._id,
//        label:item?.name
//     })
//  })
    // for time Component
    const format = 'HH:mm';
    console.log("args",args)

    const onFinish = (values) => {
      
        // Pass the form values to the parent component
        onSave(values.candidateskills,args,form);
      };


 let  skills=[{
    value:"HTml",label:"HTML"
  },
  {
    value:"Css",label:"Css"
  },{
    value:"Js",label:"js"
  },

]
  const token =CookieUtil.get("admin_token")
 const init = async()=>{
  const clientsResponse = await axios.get( `${BASE_URL}/clients/getselectassign`,{
    headers: {
      Authorization: `Bearer ${token}`,
      // Other headers if needed
    },});
  setClients(clientsResponse.data.data);

  // Fetch projects
  const projectsResponse = await axios.get(`${BASE_URL}/projects`);

  if (projectsResponse?.data?.data) {
    // If projects data exists, map it to a new structure
    const projectsData = projectsResponse.data.data.map((item) => ({
      label: item?.project_name,
      value: item?._id,
    }));
   

    setProjectsByClient(projectsData);
 } }

useEffect( () => {
   init()
}, []); 


useEffect( () => {

 
    if(edit){
   console.log("argsjjjj",args)

  //  const startend_time = ["2024-02-14T03:05:01.600Z", "2024-02-14T03:06:47.240Z"];
   const defaultValues = args?.data?.startend_time?.map((dateString) => dayjs(dateString))||[];

       return form.setFieldsValue({
        candidateskills:[{
          client_id:args?.data?.client_id?._id,
          logged_houres:args?.data?.logged_houres,
          start:defaultValues,
          project_id:args?.data?.project_id?._id,



        }]
       })
    }
    form.setFieldsValue({
      candidateskills:[{}]
    })
    
 

}, [args])


const onChageClient =(value,key) => {
    
    // Update the selected client state
  

    // Fetch projects for the selected client and update the projects state
    axios.get(`${BASE_URL}/projects?client_id=${value}`)
    .then((response) => {
      const data = response.data.data;
  
      // Check if data is an array before calling .map
      if (Array.isArray(data)) {
        const projectsData = data.map((item) => ({
          label: item?.project_name,
          value: item?._id,
        }));
  
        setProjectData((prevProjectData) => {
            const updatedData = [...prevProjectData];
            updatedData[key] = projectsData;
            return updatedData;
          });
      } else {
        console.error("Data is not an array:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
  } 

  console.log("ppp",projectData)

    
  return (
    <div>
        <Form form={form} layout='vertical' onFinish={onFinish} initialValues={{candidateskills:[{}]}}>
        <div className='container m_t_10'>
        <div className='row'>
            <div className='col-6'>
    
            </div>
        </div>

        <Form.List name="candidateskills">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name,key}) => (
                <>
                   <div className="lable_center">
                  <div
                   className='d_f a_i_c g_20'
                  >
                    
                      <Form.Item
                        label="Client"
                        name={[name, "client_id"]}
                        rules={[
                          { required: true, message: "Client is required" },
                        ]}
                      >
                        <Select 
                        placeholder="Select Client"
                        style={{
                            width:"150px"
                        }}
                         options={clients}
                         allowClear
                         onChange={(e)=>onChageClient(e,key)}
                         />
                      </Form.Item>
                 
                    <div>
                      <Form.Item label="Project"
                      name={[name, "project_id"]}>
                         <Select placeholder="Select project"
                          style={{
                            width:"150px" 
                        }}
                           options={projectData[key] || projectsByClient}/>
                      </Form.Item      >
                    </div>
                    <div>
                      
                    <Form.Item
                      className=""
                      label="Start & End Time"
                      name={[name, "start"]}
                      rules={[
                        { required: true, message: "Timings is required" },
                      ]}
                    >

<TimePicker.RangePicker
            showTime={{ format: 'hh:mm', use12Hours:true }}
            changeOnBlur
             
            />

                      


                    </Form.Item>
                    </div>

                    <Form.Item
                      className=""
                      label="Log Hours"
                      name={[name, "logged_houres"]}
                      rules={[
                        { required: true, message: "Log Hours is required" },
                      ]}
                    >

                       <Select
                        placeholder="Select Log Hours"
                        allowClear={true}
                        options={options} 
                        
                        />

                      

{/* <TimePicker
      defaultValue={moment(initialValue, 'HH:mm')}
      // OR
      // value={moment(initialValue, 'HH:mm')}
      format='HH:mm'
    /> */}
                          {/* <Input min={0} placeholder="Enter log hours" /> */}
             {/* <TimePicker defaultValue={dayjs('12:08', format)} format={format} className='zive-timesheet-addlog-hours' /> */}
                      
                    </Form.Item>
                    <DeleteOutlined  onClick={() => remove(name)} />
                  </div>
                </div>
               
                </>
             
              ))}
               <Form.Item>
                <p
                style={{
                  cursor: 'pointer'
                }}

                className='c_primary'
                  type="primary"
                  // className="btn_cancel w_30_p"
                  onClick={() => add()}
              
                  // icon={<PlusOutlined />}
                >
                  + Add More
                </p>
              </Form.Item>
               
                
            </>
          )}
        </Form.List>


        {/* <div className='row'>
            <div className='col-6'>
            <Form.Item name="client" label="Client">
                <Select placeholder='Enter Title'> 
                <Option value="deloitee"> Deloitte</Option>
                <Option value="tcs"> TCS</Option>
                </Select>
            </Form.Item>
            </div>
            <div className='col-6'>
                <Form.Item name="project" label="Project">
                    <Select placeholder='Enter Title'>
                        <Option value='web'>Web Application</Option>
                        <Option value='zive'>Zive</Option>
                    </Select>
                </Form.Item>
            </div>
        </div>
        <div className='row'>
            <div className='col-6'>
            <Form.Item name="hours" label="Hours Logged">
             <TimePicker defaultValue={dayjs('12:08', format)} format={format} className='zive-timesheet-addlog-hours' />
            </Form.Item>
            </div>
        </div>
        <div className='row'>
            <div className='col-5'>
            <Form.Item name="screenshot" label="Screenshot (Every Friday)">
                <Dragger className='zive-timesheet-addlog-dragger'>
                <UploadOutlined />
                <p>Drag your file here or <Link>Browse</Link></p>
                <p>Supported format .PDF, .PNG, .JPG</p>
                </Dragger>
            </Form.Item>
            </div>
        </div> */}
          <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button className="btn_cancel">
            Back
          </Button>
          <Button
           type="primary"

            className="btn btn-primary"
            htmlType="submit"
         
          >
            Save
          </Button>
        </div>
        </div>
        </Form>
    </div>
  )
}
