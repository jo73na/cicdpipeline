import  { useState, useEffect, useContext } from "react";
import { Button, Form, Input,message, Tabs, Rate, Progress, Upload } from "antd";

import { useParams } from "react-router-dom";
import BasicDetailAdd from "./BasicDetailAddCandidate";
import ViewJobContext from "../../Providers/ViewJob";
import { useForm } from "antd/lib/form/Form";
import JobContext from "../../Providers/JobProvider";
// import { BASE, BASE_URL } from "../../Utils/api";
import axios from "axios";

const BASE = import.meta.env.VITE_BASE_URL; 
const BASE_URL = import.meta.env.VITE_BASE_URL; 

const AddCandidatesPopup = () => {
  const {setLocationData, jobSingle,handleAddCandidate,addbuttonCandidate,setAddButtonCandidate,showEmployeModal} = useContext(ViewJobContext);
 const {setLocation}=useContext(JobContext)
 
  const [hiringtype, setHiringtype] = useState("");
  const [add, setadd] = useState(false);

  const [value, setValue] = useState("");

  const [active, setactive] = useState("1");
  let skillsdata = [];
 
  console.log(skillsdata, "skillsdata");
  const [form] = useForm();

  const params = useParams();

  const [fileError, setFileError] = useState(false);
  const [resume, setResume] = useState("");

  const props = {
    name: "file",
    multiple: false,
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
      
          // setData({ ...data, resume: info.file.originFileObj });
          setResume (info.file.originFileObj)
          handleSendResume(info.file.originFileObj)
      }
      if (status === "done") {
                setResume (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      setResume("")
      console.log("Dropped files", e.dataTransfer.files);
    },
  };


  const init = async()=>{
    
    let locationapi =`${BASE_URL}/location`
     
    await axios.get(locationapi).then((resp) => {
      setLocationData(resp.data.data);

  })}
 useEffect(() => {
   init()
 }, [])


   const  handleSendResume = async(resumefile)=>{
    let apiUrl =`${BASE}resumeparser`


    var formData = new FormData();
    formData.append('file', resumefile);
      await axios.post(apiUrl,formData).then((res)=>{
         if(res.data){
           form.setFieldsValue({
             first_name: res.data.firstName||"",
             last_name: res.data.lastName,
             email_id:res.data.primaryEmail,
             phone_no:`+91 ${res.data.phone}`
          
           })
           setValue(`+91 ${res.data.phone}`)

         }
         setadd(true)
      })
     
  
    
  }
  

 

  const onFinish = (values) => {
  
    if (fileError) {
      setAddButtonCandidate(true)
      message.error(
        "Invalid file type. Please upload a PDF, JPG, PNG, DOC, or DOCX."
      );
    setAddButtonCandidate(false)

    } else {
      if (active == "1") {
        return setactive("2");
      } else {
        setAddButtonCandidate(true)
         
        var formdata = new FormData();

        let candiateskills = values["candidateskills"];
        let preferred_location =values["preferred_location"]

        candiateskills.forEach((item, index) => {
          for (const key in item) {
            formdata.append(`candidateskills[${index}][${key}]`, item[key]);
          }
        });
        preferred_location?.forEach((item, index) => {
       
            formdata.append(`preferred_location[${index}]`, item);
         
        });
        values["current_location"]?.length>0 &&
        formdata.append(`current_location`,values["current_location"][0] );


        formdata.append("email_id", values["email_id"]);
        formdata.append("last_name", values["last_name"]||"");
        formdata.append("first_name", values["first_name"]||"");
        formdata.append("mode_of_hiring", values["mode_of_hiring"]||"");
        // values["client_billing"]&&formdata.append("client_billing", Number(values["client_billing"]?.replace(/,/g, '')||""));
        formdata.append("salary_type", hiringtype||"LPA");
        formdata.append("attachment_name", values["attachment_name"]);
        formdata.append(
          "phone_no",
          value?.replace("-", "")
        );
        formdata.append("offer_details", values["offer_details"]);
        formdata.append("notice_period", values["notice_period"]);
        formdata.append("expected_ctc", Number(values["expected_ctc"]?.replace(/,/g, '')));
        formdata.append("current_ctc", Number(values["current_ctc"]?.replace(/,/g, '')));
        formdata.append("to_exp_from",Number( values["to_exp_from"]) || 0);
        formdata.append("to_exp_to", Number(values["to_exp_to"]) || 0);
        formdata.append("re_exp_to",  Number(values["re_exp_to"]) || 0);
        formdata.append("re_exp_from", Number(values["re_exp_from"]) || 0);
        // formdata.append("re_exp_from",Number( values["re_exp_from"]) || 0);
        formdata.append("remarks", values["remarks"] || "");
        formdata.append("client_id", jobSingle?.client_id[0]?._id|| "");
        formdata.append("image", resume);
        formdata.append("job_id", params?.id);
        formdata.append("date_of_submission", values["data_of_submission"]?.$d);


        handleAddCandidate(formdata,form,setactive)
        showEmployeModal()
       
      }
    }
  };

  const Skillmatrix = () => {
    return (
      active=="2" &&
      <div>
        {/* <Card className="zive-addjob-rating"> */}

        <Form.List name="candidateskills">
          {(fields) => (
            <>
              {fields.map(({key , name }) => (
                <div className="lable_center" key={key}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap:"10px"

                      
                    }}
                  >
                    <div className="input_skill">
                      <Form.Item
                        label="Skill"
                        name={[name, "skill"]}
                        rules={[
                          { required: true, message: "Skill is required" },
                        ]}
                      >
                        <Input readOnly />
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item label="Experience">
                        <div className="d_f g_10">
                          <Form.Item
                            name={[name, "years"]}
                            rules={[
                              { required: true, message: "Years is required" },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100px",
                              }}
                              placeholder="Years"
                            />
                          </Form.Item>

                          <Form.Item
                            name={[name, "months"]}
                            rules={[
                              { required: true, message: "Month is required" },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100px",
                              }}
                              placeholder="Month"
                            />
                          </Form.Item>
                        </div>
                      </Form.Item>
                    </div>

                    <Form.Item
                      className="zive-addjob-rating-margin"
                      label="Rating"
                      name={[name, "rating"]}
                      rules={[
                        { required: true, message: "Rating is required" },
                      ]}
                    >
                      <Rate />
                    </Form.Item>
                  </div>
                </div>
              ))}
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
          <button
             type="button"
           className="btn btn-danger btn-sm" onClick={() => setactive("1")}>
            Back
          </button>
          <button
         

            className="btn btn-primary btn-sm"
            htmlType="submit"
            loading={addbuttonCandidate}
          >
            Save
          </button>
        </div>

        {/* </Card> */}
      </div>
    );
  };

  const items = [
    {
      label: "Basic Details",

      key: "1",
      children: 
        <BasicDetailAdd
        setValue={setValue}
        form={form}
        hiringtype={hiringtype}
        setHiringtype={setHiringtype}
        value={value}
        resume={resume}
         info={props}
        />
    },
    {
      label: "Skill Matrix",
      key: "2",
      children: <Skillmatrix />,
    },
  ];

  const handleChamgeTap = (key) => {
    setactive(key);
  };

  useEffect(() => {
    jobSingle?.skils?.map((skill) => {
      skillsdata.push({
        skill: skill,
        years: "",
        months: "",
      });
    });
    form.setFieldsValue({
      candidateskills: skillsdata,
    });
  }, [active]);

  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false);

  const props1 = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    showUploadList: false,
    beforeUpload: (file) => {
      const isPdfOrDoc = file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (!isPdfOrDoc) {
        message.error(`${file.name} is not a pdf or doc file`);
      }
      return isPdfOrDoc || Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        setUploading(true);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setFile(info.file.originFileObj);
        setUploading(false);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setUploading(false);
      }
    },
    customRequest({ file, onSuccess }) {
      setTimeout(() => {
        onSuccess("ok");
      }, 1000);
    }
  };


  const handleRemove = () => {
    setFileList([]);  // Clear the file list
    message.info('File removed successfully');
  };


  return (
    <div className="container mt-4">




       <Form layout="vertical" onFinish={onFinish} form={form}>
        <Tabs
          defaultActiveKey="1"
          items={items}
          activeKey={active}
          style={{ zIndex: 1 }}
          onChange={handleChamgeTap}
        />
      </Form> 

 
  {/* <div style={{ backgroundColor: '#88a67e1a', padding: '20px', borderRadius: '8px', width: '350px', color: 'white' }}>
      <h3 style={{ marginBottom: '16px', color: '#88a67e', fontWeight:700 }}>Upload Resume </h3>

      <Dragger {...props1} style={{ border: '1px dashed #535353', borderRadius: '8px', backgroundColor: "#88a67e" }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: '#fff' }} />
        </p>
        <p style={{ color: '#fff' }}>Drag & Drop or <a style={{ color: '#f8b940' }}>Choose file</a> to upload</p>
        <p style={{ color: '#fff' }}>PDF or DOC/DOCX Max 3.0Mb</p>
      </Dragger>

      {fileList.length > 0 && (
        <div style={{ marginTop: '15px', backgroundColor: '#88a67e', padding: '5px', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#f0f0f0', marginBottom: '8px', display:"flex", justifyContent:"space-between", alignItems:"center" }}>
             <span>{fileList[0].name}</span>
             <i class="fa-solid fa-trash text-danger"/>
             
           

          </p>
          <p style={{ color: '#ffff' }}>{(fileList[0].size / 1024 / 1024).toFixed(2)} Mb</p>
          {uploading ? (
             <>
              <div
               className="d_f g_10">
            <Progress percent={99}  strokeColor="#FFD700"  showInfo={false}  />
       
              </div>
             </>
          ) : (
            <div style={{ backgroundColor: '#505050', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '100%', backgroundColor: '#f8b940', height: '100%' }}></div>
            </div>
          )}
       
        </div>
      )}
    </div> */}


    

       {/* <div
        className ="d_f j_c_f_e g_10">
             <button className ="btn btn-sm btn-primary" onClick={handleSendResume}> Save</button>
       </div>
  </> */}

    
    </div>
  );
};

export default AddCandidatesPopup;
