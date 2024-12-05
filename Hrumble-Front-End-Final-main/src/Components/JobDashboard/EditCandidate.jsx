
import  { useState, useEffect,useContext } from "react";
import {
  Button,
  Form,
  Input,
  
} from "antd";
import { message,Tabs,Rate } from "antd";
import { useParams } from "react-router-dom";
import BasicDetailAdd from "./BasicDetailAddCandidate";
import ViewJobContext from "../../Providers/ViewJob";
import { useForm } from 'antd/lib/form/Form';
// import { BASE } from "../../Utils/api";

const BASE = import.meta.env.VITE_BASE; 


  const EditCandidatesPopup =() => {
    const { jobSingle,CandidateView,handleEditCandidate} = useContext(ViewJobContext);
    console.log("kkkk",CandidateView)
   
    const [value, setValue] = useState(``);
    // const [buttonLodaing, setButtonLoading] = useState(false);
  const [hiringtype, setHiringtype] = useState(CandidateView?.salary_type||"Monthly");

    const [active, setactive] = useState("1");
    let skillsdata = [];
    jobSingle?.skils?.map((skill) => {
      skillsdata.push({
        skill: skill,
        years: "",
        months: "",
      });
    });
    
    const [form] = useForm();
  
    const params = useParams();

 
  const [fileError,setFileError] = useState(false)
  const [resume, setResume] = useState("");





   let defaultFileList = [
    {
      uid: "1",
      name: CandidateView.resume|| "resume",
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${CandidateView?.resume}`, // Set the URL of the default file
    },
  ]; 
  const props = {
    name: "file",
    multiple: true,
    defaultFileList,
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
        
        setResume(info.file.originFileObj);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setResume(info.file.originFileObj);

      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
 


 
 

  const onFinish = (values) => {
    
   if(fileError){
    message.error("Invalid file type. Please upload a PDF, JPG, PNG, DOC, or DOCX.")
   }
   else{
    if(active=="1"){
      return setactive("2")
   } 
   else{
    console.log("values",values)
   
    var formdata = new FormData();

    let candiateskills = values['candidateskills']
    let preferred_location =values["preferred_location"]
   
  
    candiateskills.forEach((item, index) => {
      for (const key in item) {
        formdata.append(`candidateskills[${index}][${key}]`, item[key]);
      }
    });
    preferred_location?.forEach((item, index) => {
       
      formdata.append(`preferred_location[${index}]`, item);
   
  });
  console.log("fff",values["current_location"])
  values["current_location"]?.length>0 &&
  formdata.append(`current_location`,values["current_location"][0] );
   

    



   

    formdata.append("email_id", values["email_id"]);
    formdata.append("last_name", values["last_name"]);
    formdata.append("first_name", values["first_name"]);
    formdata.append("mode_of_hiring", values["mode_of_hiring"]||"");
    values["client_billing"]&&formdata.append("client_billing", Number(String(values["client_billing"])?.replace(/,/g, '')||""));

    formdata.append("salary_type", hiringtype||"");
     value && formdata.append(
      "phone_no",
       value.replace("-", "")
    );
    formdata.append("offer_details", values["offer_details"]);
    formdata.append("notice_period", values["notice_period"]);
    formdata.append("expected_ctc", Number(String(values["expected_ctc"])?.replace(/,/g, '')));
    formdata.append("current_ctc", Number(String(values["current_ctc"])?.replace(/,/g, '')));
    formdata.append("to_exp_from", values["to_exp_from"]||0);
    formdata.append("to_exp_to", values["to_exp_to"]||0);
    formdata.append("re_exp_to", values["re_exp_to"]||0); 
    formdata.append("re_exp_from", values["re_exp_from"]||0); 
    formdata.append("remarks", values["remarks"]||"");
    formdata.append("image", resume|| CandidateView?.resume)
    formdata.append("job_id", params?.id);
   console.log( value.replace("-", ""))
   console.log(CandidateView?.phone_no)
     handleEditCandidate(formdata)

   
  }
   }

  }

  const Skillmatrix =()=>{
    
    return <div>
             {/* <Card className="zive-addjob-rating"> */}
            
               <Form.List name="candidateskills">
                 {(fields) => (
                   <>
                     {fields.map(({ key, name }) => (
                     <div className="lable_center" key={key}>
                        
                       <div style={{
                         display:"flex",
                         flexWrap:"wrap",
                         marginTop:"-15px",
                      
                         
                        justifyContent:"space-around"
                       }}>
                       
                         <div className="input_skill">
                           <Form.Item label="Skill"
                           name={[name, 'skill']}
                           rules={[{ required: true, message: "Skill is required" }]} >
                     <Input readOnly/>

                           </Form.Item>
                         </div>
                          <div>
                     
                         <Form.Item label="Years of Experience"
                          
                         >
                         <div className="d_f g_10">
                <Form.Item name={[name, 'years']}
                rules={[{ required: true, message: "Years is required" }]}
                      >
                              <Input style={{
                             width:"100px"
                           }} placeholder="Years"/>
                           </Form.Item>
                          
                           <Form.Item name={[name, 'months']}
                rules={[{ required: true, message: "Month is required" }]}
                >
                        <Input style={{
                             width:"100px"
                           }} placeholder="Month"/>
</Form.Item>

                </div>
                         </Form.Item>
                       </div>

                       <Form.Item
                         className="zive-addjob-rating-margin"
                         label="Rating"
                         name={[name, 'rating']}
                rules={[{ required: true, message: "Rating is required" }]}

                         >
                         <Rate />
                         </Form.Item>
                          
                       </div>
                     </div>
                                       
                        
                          
                            
                      
                      
                        
                      
                     ))}
                     {/* <Form.Item>
                       <Button
                         type="dashed"
                         onClick={() => add()}
                         block
                         icon={<PlusOutlined />}
                       >
                         Add field
                       </Button>
                     </Form.Item> */}
                   </>
                 )}
               </Form.List>

               <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button className="btn_cancel" onClick={()=>setactive("1")}>
            Back
          </Button>
          <Button
            type="primary"
            className="btn btn-primary"
            htmlType="submit"
            // loading={buttonLodaing}
        
          >
            Update
          </Button>
        </div>
          
             {/* </Card> */}
           </div>

  
   

 }


  const items=[
    {
      label: 'Basic Details',
      
      key: '1',
      // children: < />
      children:<BasicDetailAdd mode={CandidateView?.mode_of_hiring} info={props} setValue={setValue} value={value} hiringtype={hiringtype}setHiringtype={setHiringtype} form={form} />
      // children: <BasicInfo setActive={setActive} form={form} setClients={setClients} setPhoneno={setPhoneno} setaddrowdata={setaddrowdata} />,
    },
    {
      label: 'Skill Matrix',
      key: '2',
       children:<Skillmatrix/>
    },
]

const handleChamgeTap =(key)=>{
  setactive(key)
}

  useEffect(() => {
  
    // setValue(CandidateView?.phone_no);
    // jobsingle?.skils?.map((skill)=>{
    //   skillsdata.push({
    //     skill:skill,
    //     years:"",
    //     months:"",
      
  
    //   });
    // })
    form.setFieldsValue({
      ...CandidateView,
      salary_Type:CandidateView?.salary_type||"Monthly",
      current_location:CandidateView?.current_location?[CandidateView?.current_location]:[],
       
      candidateskills:CandidateView?.candidateskills?.length >0 ? CandidateView?.candidateskills:skillsdata
 
      
   });
  
   
  }, [CandidateView]);

  
  

  return (
    <div className="container mt-4">
      <Form layout="vertical" onFinish={onFinish}  form={form}> 
      <Tabs defaultActiveKey="1" items={items} activeKey={active} style={{ zIndex: 1 }} onChange={handleChamgeTap} />


       
      </Form>
    </div>
  );
}

export default EditCandidatesPopup
