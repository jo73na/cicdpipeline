
import { useState, useEffect,useContext } from "react";
import {
  Button,
  Form,
  Input,
  
} from "antd";
import { message,Tabs,Rate,Modal } from "antd";
import { useParams } from "react-router-dom";
import BasicDetailAdd from "../JobDashboard/BasicDetailAddCandidate";

import { useForm } from 'antd/lib/form/Form';
import CandidateContext from "../../Providers/Candidate";
import UploadDocuments from "./CandidateViewPage/UploadDocments";




  const AssignEditCandidatesPopup =({}) => {
    const {candidateSingle,jobsAssignTable,job_id,handleLogcreate} = useContext(CandidateContext);
    
   let findData=jobsAssignTable?.find((e)=>e._id==job_id)
   console.log("jobsingle",findData)
    const [value, setValue] = useState(candidateSingle[0]?.phone_no);
    const [buttonLodaing, setButtonLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [ResumeArray, setResumeArray] = useState(false);
    const [hiringtype, setHiringtype] = useState(candidateSingle[0]?.mode_of_hiring);

    const [active, setactive] = useState("1");
    let skillsdata = [];
    findData?.skils?.map((skill) => {
      skillsdata.push({
        skill: skill,
        years: "",
        months: "",
      });
    });
   
    const [form] = useForm();
  
    const params = useParams();

 
  const [fileError,setFileError] = useState(false)


  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_no: "",
    total_experience: "",
    offer_details: "",
    notice_period: "",
    expected_ctc: "",
    current_ctc: "",
    relevent_experience: "",
    resume: "",
  });

  const defaultFileList = [
    {
      uid: "1",
      name: candidateSingle[0]?.resume,
      status: "done", // Set the status to 'done' for default files
      url: `https://apiv1.technoladders.com/${candidateSingle[0]?.resume}`, // Set the URL of the default file
    },
  ];
  const props = {
    name: "file",
    multiple: true,
    defaultFileList,
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
        
        setData({ ...data, resume: info.file.originFileObj });
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setData({ ...data, resume: info.file.originFileObj });
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

    //  setButtonLoading(true);
  
 
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
   formdata.append(`current_location`,values["current_location"] );
    
 
     
 
 
 
    
 
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
     formdata.append("image", data.resume);
     formdata.append("resume",values["resume"]);
     formdata.append("attachment_name",values["attachment_name"]);
     formdata.append("job_id", job_id);
     formdata.append("candidateoriginal_id", candidateSingle[candidateSingle.length-1]?.candidateoriginal_id?._id);

         handleLogcreate(formdata);
    //  api.create(
    //      dispatch,
    //      [start, success, failure, "crudadd"],
    //      "candidate/logcreate",
    //      formdata,
    //      (err, res) => {
    //        if (err) {
    //          console.log("err", err);
    //          notification.error({
    //            message: err?.message,
    //            duration: 1,
    //          });
    //          setButtonLoading(false);
    //        }
        
    //          if (res) {
                
    //             setButtonLoading(false);
          
    //               notification.success({
    //                 message: res?.data?.message,
    //                 duration: 1,
    //               });
    //        }
    //      }
    //    );
 
     // api.Update("candidate", viewdata?._id, formdata).then((res) => {
     //   if (res) {
     //    onEditClose();
     //    setValue("");
     //   setButtonLoading(false);
 
     //     notification.success({
     //       message: res?.data?.message,
     //       duration: 1,
     //     });
     //      window.location.reload()
     //     // init();
     //   }
     // });
  //  }; 
    }
 
   }
  }

  const Skillmatrix =()=>{
    
    return <div>
             {/* <Card className="zive-addjob-rating"> */}
            
               <Form.List name="candidateskills">
                 {(fields, { add, remove }) => (
                   <>
                     {fields.map(({ key, name }) => (
                     <div className="lable_center">
                        
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
            l type="primary"
            className="btn"
            htmlType="submit"
            loading={buttonLodaing}
        
          >
            Update
          </Button>
        </div>
          
             {/* </Card> */}
           </div>

  
   

 }


 console.log("hiringtype",hiringtype);

  const items=[
    {
      label: 'Basic Details',
      
      key: '1',
      // children: < />
      children:<BasicDetailAdd Assign="Assign"  ResumeArray={ResumeArray} hiringtype={hiringtype} info={props}  setHiringtype={setHiringtype} form={form} setValue={setValue} setopen={setOpen}/>
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
    // setValue(candidateSingle[0]?.phone_no);

    form.setFieldsValue({
      ...candidateSingle[0],
      current_ctc:"",
      expected_ctc:"",
      attachment_name:"",
      candidateskills:skillsdata,
 
      
   });
   setResumeArray(candidateSingle[0]?.candidateoriginal_id?.resumeArray||[])
   
   
  }, [candidateSingle]);

   const handleCancel=()=>{
    setOpen(false)
   }

  return (

 

    <div className="container mt-4">

<Modal 
    title={`Resume`}
    open={open}  onCancel={handleCancel}
    okButtonProps={{ style: { display: 'none' } }}
    cancelButtonProps={{ style: { display: 'none' } }}
    
    >

      <UploadDocuments handleCancel={handleCancel} valueprops="ResumeDocuments" isModalOpen={open}  onClose={handleCancel} />
    </Modal>
      <Form layout="vertical" onFinish={onFinish}  form={form}> 
      <Tabs defaultActiveKey="1" items={items} activeKey={active} style={{ zIndex: 1 }} onChange={handleChamgeTap} />
     

       
      </Form>
    </div>
  );
}

export default AssignEditCandidatesPopup
