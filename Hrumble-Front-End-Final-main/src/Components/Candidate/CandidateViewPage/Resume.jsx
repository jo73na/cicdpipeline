import { useContext,useState} from "react";
import CandidateContext from "../../../Providers/Candidate";
import { Collapse, Modal } from "antd";
import { DownCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form,message} from 'antd';
import EmployeeDocInfo from "./EmployeeDocInfo";
import PersonalDocInfo from "./PersonalDocInfo";

// import EditUploadDocuments from "./EditUploadDocments";

import ResumeInfo from "./ResumeInfo";
import UploadDocuments from "./UploadDocments";







const Resume = () => {
  const {candidateSingle,handleEditresumeOnly,handleEditResume}=useContext(CandidateContext)
  const[upload,setUpload]=useState("")
  const [open, setOpen] = useState(false);
  const [valueprops, setvalueprops] = useState("");
  const [open1, setOpen1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDrawer = (e) => {
    setvalueprops(e),
    setIsModalOpen(true);
  };

  

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      key: '1',
      label: 'Resumes',
      children: <ResumeInfo  onchangeButton={showDrawer} />,
      extra: <DownCircleOutlined />
    },
    {
      key: '2',
      label: 'Employee Documents',
      children: <EmployeeDocInfo onchangeButton={showDrawer} />,
      extra: <DownCircleOutlined />
    },
    {
      key: '3',
      label: 'Personal Documents',
      children: <PersonalDocInfo onchangeButton={showDrawer} />,
      extra: <DownCircleOutlined />
    },
    // {
    //   key: '4',
    //   label: 'Others',
    //   children: <OthersDocInfo onchangeButton={showDrawer}  />,
    //   extra: <DownCircleOutlined />
    // },
  ];

 
  const onClose = () => {
    setOpen(false);
  };

  const showDrawer1 = () => {
    setOpen1(true);
  };
  const onClose1 = () => {
    setOpen1(false);
  };

  // Upload Function starts here

  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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

  // Upload Function ends here

  const props = {
    name: "file",
    multiple: false,
    action: "https://apiv1.technoladders.com/test",
  
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
  
  };

  const resumename = (data) => {
    console.log("resume",data)
    const extractedString = data?.match(/\/(\d+)([a-zA-Z0-9_[\] -]+\.[a-zA-Z0-9]+)/);
    const result = extractedString ? extractedString[2] : data;
    return result;
  };

const ondata =(data)=>{
  
  const inputDate = new Date(data);

const formattedDate = inputDate.toLocaleString('en-US', {
year: 'numeric',
month: 'short',
day: 'numeric',
hour: 'numeric',
minute: '2-digit',
hour12: true,
});

return formattedDate

  
 }

 const [form]=Form.useForm();
 const onFinish=()=>{

    console.log("excel,",upload)
    var formdata = new FormData()
    formdata.append("image",upload)
   
    handleEditresumeOnly(formdata,form,candidateSingle[0]?.candidateoriginal_id?._id)
     setUpload("")
 }

//  Modal Function starts here

 

  return (
    <>
     
      
       {/* <div className='d_f f_w_w j_c_f_s'> */}
        
       {
        
    //        candidateSingle?.length>0 && 
    //        <>
    //         {candidateSingle[0]?.resume && <div
    //        onClick={()=>handleEditResume(candidateSingle[0]?.candidateoriginal_id?._id)}
    //         style={{
    //          textAlign: 'end',
    //          cursor: 'pointer'
    //        }}>
    //           Edit
    //        </div>}
    //       { candidateSingle.map((candidate,i)=>{
    //        return(
    //          <>
    //         {
    //             candidate.resume ?
    //             <div key={i}>
    //             <p>
    //             <img className='m_b_5' src={Pdf_file}/>
   
    //               <a href={
    // `${BASE}${candidate?.resume?candidate?.resume:""}` }>{resumename(candidate?.resume)}</a></p>
    // <p>Uploaded On :{ondata(candidate?.updatedAt)}</p>
                
    //             </div> :
    //              <>

    //                 <Form 
    //               layout='vertical'
    //               onFinish={onFinish}
    //                form={form}>
           
             
           
           
    //            <div className='col_2 m_t_30'>

    //                {/* <label className='zive-employeeImport-uploadtext'>Upload File</label> */}
                  
                  
    //                    <Form.Item label="Upload Resume"
    //                    name="resume"
    //                       rules={[
    //                        {
    //                          required: true,
    //                          message: "Please Upload Resume!",
    //                        },
    //                      ]}>
    //                    <Dragger {...props}>
    //                    <UploadOutlined className='zive-project-uploadicon'/>
    //                    <p className='zive-employeeImport-draglabel my-3'>Drag your file here or <Link className='c_primary'>Browse</Link></p>
    //                    <p className='zive-employeeImport-supportedLabel my-3'>Supported format .xlsx</p>
    //                </Dragger>
                   
    //                    </Form.Item>
                 
    //        </div>
           
               
            
             
    //        <div
    //                style={{
    //                  margin: "10px",
    //                  display: "flex",
    //                  gap: "10px",
    //                  justifyContent: "flex-end",
    //                }}
    //              >
    //                <Button className="btn_cancel">Cancel</Button>
    //                <Button type="primary" className="btn" htmlType="submit"
    //                 // loading={addResumeButton}
    //                 >
    //                  Save
    //                </Button> 
    //              </div>
           
    //        </Form>  
    //              </>  
                 
               
                
         
    //         }
        
    //          </>
             
    //          )
    //        })}
    //        </>
         
         
           
      
       }
       
   {/* </div> */}
   
      <Form layout="vertical">
   <div>
   <Modal 
    // title={`${valueprops}`}
    visible={isModalOpen}
    onCancel={handleCancel}
    okButtonProps={{ style: { display: 'none' } }}
    cancelButtonProps={{ style: { display: 'none' } }}
    className="rotate-modal"
    >

      <UploadDocuments handleCancel={handleCancel} isModalOpen={isModalOpen} valueprops={valueprops} onClose={onClose} showModal={showModal}/>
    </Modal>
  

          {/* <div className="p_20">
            <Button type="primary" onClick={showDrawer}>
               + Upload Documents
            </Button>
            <div className="d_f f_w_w j_c_f_e">
              <label onClick={showDrawer1} className="employeeDashboard-edit-btn"><EditOutlined /> Edit</label>
            </div>
          </div>
           */}

          </div>
          </Form>

      <div>
        <Collapse ghost items={items} />
      </div>
    </>
  );
};

export default Resume;
