import { Button, Form, Select, TimePicker, message } from 'antd'
import {useContext,useEffect} from 'react'

import axios from "axios"
import Dragger from 'antd/es/upload/Dragger';
import { useForm } from "antd/lib/form/Form";
import { BASE_URL } from '../../Utils/api'
import FaqContext from '../../Providers/Faq';
import dayjs from 'dayjs';






export default function AddTimesheet({onAddEmployeeClose,onSave,args,edit,setscreenshot,setFileError}) {
 const {projectsByClient,getClients,clients,setProjectsByClient,employee}=useContext(FaqContext)

//  const [projectData, setProjectData] = useState([]);
 console.log("clients",clients)

 const emplyeedata=[{label:"All",value:"All"},...employee]


 const projectdata=[]
 projectsByClient?.map((item)=>{
  projectdata.push({
     value:item._id,
     label:item.project_name
   })
 })

 const [form] = useForm();


 const options = [{
  label:"0:00",value:"0:00"
 }];

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

   
    const onFinish = (values) => {
        // Pass the form values to the parent component
        onSave(values,args,form);
      };



useEffect( ()=> {

  getClients()
},[]); 


useEffect( () => {
   form.resetFields()

 
    if(edit){
  
      const defaultValues = args?.data?.startend_time?.map((dateString) => dayjs(dateString))||[];
       
       return form.setFieldsValue({
          client_id:args?.data?.client_id?._id,
          logged_houres:args?.data?.logged_houres,
          project_id:args?.data?.project_id?._id,
          start:defaultValues,

          employee_id:args?.data?.employee_id,



      
       })
       
    }
    else{
    console.log("argsssssss",args)

      form.setFieldsValue({
        employee_id:args?.employee_id,
    })
    }
    
    
 

}, [args])


const filenamechange=(data)=>{
  const fileNameWithExtension = data?.split('\\').pop();
  
  // Remove the file extension
  const fileNameWithoutExtension = fileNameWithExtension?.split('.').slice(0, -1).join('.');

  return fileNameWithoutExtension;
}

let fileList = [
    {
      uid: "1",
      name: filenamechange(args?.data?.timesheet)||"",
      status: "done", // Set the status to 'done' for default files
      url: `https://apiv1.technoladders.com/${args?.data?.timesheet||""}`, // Set the URL of the default file
    },
  ]; 
 console.log("filelist",fileList)
 console.log("edit",edit)
  let props = {
    name: "file",
    multiple: false,
    ...(edit && args?.data?.timesheet && {defaultFileList:fileList}) ,
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
          setscreenshot (info.file.originFileObj)
      }
      if (status === "done") {
        setscreenshot (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };


const onChageClient = async(value) => {
    
 
  

    // Fetch projects for the selected client and update the projects state
    await  axios.get(`${BASE_URL}/projects?client_id=${value}`)
    .then((response) => {
      const data = response.data.data;
  
      // Check if data is an array before calling .map
      // if (Array.isArray(data)) {
      //   const projectsData = data.map((item) => ({
      //     label: item?.project_name,
      //     value: item?._id,
      //   }));
  
         setProjectsByClient(data)
      
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
  } 

  

    
  return (
    <div>
        <Form form={form} layout='vertical' onFinish={onFinish} initialValues={{candidateskills:[{}]}}>
         <div className='col_2 g_20 m_t_10'>
           <Form.Item label="Employee Name" name="employee_id">
              <Select
               options={emplyeedata} disabled/>
           </Form.Item>
         </div>
       
       
            <div className='col_2 g_20 m_t_1'>

                   
            <Form.Item
                        label="Client"
                        name= "client_id"
                        rules={[
                          { required: true, message: "Please Select  Client" },
                        ]}
                      >
                        <Select 
                        placeholder="Select Client"
                     
                         options={clients}
                         allowClear
                         onChange={(e)=>onChageClient(e)}
                         />
                      </Form.Item>
            <Form.Item label="project"
                      name="project_id">
                         <Select placeholder="Select project"
                        
                           options={projectdata}/>
                      </Form.Item>
            </div>
            <div className='col_2 g_20 m_t_1'>
            <Form.Item
                      className=""
                      label="Start & End Time"
                      name= "start"
                      rules={[
                        { required: true, message: "Timings is required" },
                      ]}
                    >

<TimePicker.RangePicker
style={{width: '290px'}}
            showTime={{ format: 'hh:mm', use12Hours:true }}
            changeOnBlur
             
            />

                      


                    </Form.Item>
            <Form.Item
                      className=""
                      label="Log Hours"
                      name="logged_houres"
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
            </div>

            <div className='col_2 g_20 m_t_1'>
            <Form.Item
      className="m_t_2"
        label="Screenshot (Every Friday)"
        name="timesheet"
      
      >
        <Dragger {...props}>
        <p className="ant-upload-hint addcandidate_hint"><span className="browse">+ Upload</span> Support format .PDF,.PNG,.JPG</p> 

          {/* <p className="ant-upload-hint">Support format .PDF,.PNG,.JPG</p> */}
        </Dragger>
      </Form.Item>
            </div>
        

                 
                 
              

                 
                
                
            
             
               
                
          
     


      
          <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button className="btn_cancel" onClick={onAddEmployeeClose}>
            Cancel
          </Button>
          <Button
           type="primary"

            className="btn btn-primary"
            htmlType="submit"
         
          >
            Save
          </Button>
        </div>
     
        </Form>
    </div>
  )
}
