import { Button, Form, Input, Upload,notification } from 'antd'

 
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
 
import  { useContext, useState,useEffect } from 'react'
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { BASE, BASE_URL } from './../../../Utils/api';
import CandidateContext from '../../../Providers/Candidate';
 
const UploadDocuments = ({isModalOpen,handleCancel,valueprops,onClose}) => {
 
  const {candidateSingle,handleEditresumeOnly,handleEditResume,handleViewCandidate}=useContext(CandidateContext)
   
    const [form] = useForm();
 
 
 
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
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileLists, setFileList] = useState([]);

 
 
 
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
 
  const handleChange = (index, {fileList}) => {
    console.log("filelist",fileList)
    console.log("index",index)
    const newFileLists = [...fileLists];
    newFileLists[index] = fileList;
    console.log("newfilelist",newFileLists)
    setFileList(newFileLists);
    // Add any additional logic you need when the file list changes
  };
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
 
  const onFinish = (values) => {
    const formData = new FormData();
    if(valueprops=="ResumeDocuments"){
    values.resume.forEach((resumeItem, index) => {
      // Append values from each "resume" item
   
        formData.append(`resume[${index}][attachment_name]`, resumeItem.attachment_name);
 
        // Append files from the corresponding "resume" item in fileLists
        const fileList = fileLists[index] || [];
        fileList.forEach((file, fileIndex) => {
          formData.append(`resume[${index}]upload_file`, file.originFileObj);
        });

      
      })
      axios.put(`${BASE_URL}/candidate/resumecreate/${candidateSingle[0]?.candidateoriginal_id?._id}`, formData)
      .then((res) => {
 
       if(res.data.data){
        onClose()
        notification.success({
          message: "Updated Successfully",
          duration:1,
        });
        handleViewCandidate(res.data.data._id)
        handleCancel()

 
 
      }})
      .catch((err) => {
        console.log("err", err);
      });
    }
      if(valueprops=="EmployeeDocuments"){
        values.resume.forEach((resumeItem, index) => {
          // Append values from each "resume" item
       
            formData.append(`EmployeeDocuments[${index}][attachment_name]`, resumeItem.attachment_name);
     
            // Append files from the corresponding "resume" item in fileLists
            const fileList = fileLists[index] || [];
            fileList.forEach((file, fileIndex) => {
              formData.append(`EmployeeDocuments[${index}]upload_file`, file.originFileObj);
            });
    
          
          })
          axios.put(`${BASE_URL}/candidate/employeedocumentscreate/${candidateSingle[0]?.candidateoriginal_id?._id}`, formData)
          .then((res) => {
     
           if(res.data.data){
            onClose()
            notification.success({
              message: "Updated Successfully",
              duration:1,
            });
            handleViewCandidate(res.data.data._id)
            handleCancel()
    
     
     
          }})
          .catch((err) => {
            console.log("err", err);
          });
      }

      if(valueprops =="PersonalDocuments"){
        values.resume.forEach((resumeItem, index) => {
          // Append values from each "resume" item
       
            formData.append(`PersonalDocuments[${index}][attachment_name]`, resumeItem.attachment_name);
     
            // Append files from the corresponding "resume" item in fileLists
            const fileList = fileLists[index] || [];
            fileList.forEach((file, fileIndex) => {
              formData.append(`PersonalDocuments[${index}]upload_file`, file.originFileObj);
            });
    
          
          })
          axios.put(`${BASE_URL}/candidate/personaldocumentscreate/${candidateSingle[0]?.candidateoriginal_id?._id}`, formData)
          .then((res) => {
     
           if(res.data.data){
            onClose()
            notification.success({
              message: "Updated Successfully",
              duration:1,
            });
            handleViewCandidate(res.data.data._id)
            handleCancel()
    
     
     
          }})
          .catch((err) => {
            console.log("err", err);
          });
      }
 
    // switch (previewTitle) {
    //   case "resume":
     
    //     break;
 
    //   // Handle other cases if needed
 
    //   default:
    //     break;
    // }
 
    let id=candidateSingle[0]?.candidateoriginal_id?._id
    console.log("id",id)
    // Now you can send formData using your API request library (e.g., axios, fetch)
 
  };
 
 
 


  const resumename = (data) => {
    const match = data.match(/(\d+)([a-zA-Z0-9_[\] -]+\.[a-zA-Z0-9]+)/);
  
    // Check if there is a match and extract the desired parts
    if (match) {
      const numericPart = match[1]; // "17024865174681702377542774"
      const alphanumericPart = match[2]; // "naukri_sowmyak[4y_11m].docx"
      
      console.log('Numeric Part:', numericPart);
      console.log('Alphanumeric Part:', alphanumericPart);
      
      // Return the alphanumeric part if needed
      return alphanumericPart;
    } else {
      console.log("No match found.");
      const fileNameWithExtension = data.split('\\').pop();

      // Remove the file extension
      const fileNameWithoutExtension = fileNameWithExtension.split('.').slice(0, -1).join('.');
    
      return fileNameWithoutExtension;
    
    }
  };
  useEffect(() => {
 
   
    console.log("candidateSingle[0]?.resumeArray", valueprops);
 
    const setResumeValues = async () => {
 
   
      if(valueprops=="ResumeDocuments"){
 
        // candidateSingle[0]?.candidateoriginal_id?.resumeArray?.length==0 &&
     
        let filelistdata=[]

       
        const setvalue = await Promise.all(
          candidateSingle[0]?.candidateoriginal_id?.resumeArray?.length>0 ?
          candidateSingle[0]?.candidateoriginal_id?.resumeArray?.map(async (item, i) => {
            const image = await Promise.all(
              item.image?.map(async (item) => {
                return {
                  id:item._id,
                  name:resumename(item?.filepath),
                  url: `${BASE}${item?.filepath||""}`,
                };
              })
            );
   
            filelistdata.push(image)
       
           
            return { attachment_name: item.name };
          }) :[{attachment_name:"Naukri Resume"}]
        );
 
 
        setFileList(filelistdata)
   
        form.setFieldsValue({
          resume: setvalue,
        });
       }
 
     if(valueprops=="EmployeeDocuments"){
      form.resetFields()
      setFileList([])
      let filelistdata=[]
      const setvalue = await Promise.all(
        candidateSingle[0]?.candidateoriginal_id?.EmployeeDocuments?.length>0 ?
        candidateSingle[0]?.candidateoriginal_id?.EmployeeDocuments?.map(async (item, i) => {
          const image = await Promise.all(
            item.image?.map(async (item) => {
              return {
                id:item._id,
                name: resumename(item?.filepath),
                url: `${BASE}${item?.filepath}`,
              };
            })
          );
 
          filelistdata.push(image)
     
         
          return { attachment_name: item.name };
        }):[{}]
      );
 
 
      setFileList(filelistdata)
 
      form.setFieldsValue({
        resume: setvalue,
      });
     }
     if(valueprops=="PersonalDocuments"){
      let filelistdata=[]
 
    
      const setvalue = await Promise.all(
        candidateSingle[0]?.candidateoriginal_id?.PersonalDocuments?.length>0 ?
          candidateSingle[0]?.candidateoriginal_id?.PersonalDocuments?.map(async (item, i) => {
          const image = await Promise.all(
            item.image?.map(async (item) => {
              return {
                id:item._id,
                name: resumename(item?.filepath),
                url: `${BASE}${item?.filepath}`,
              };
            })
          );
 
          filelistdata.push(image)
     
         
          return { attachment_name: item.name };
        }) :[{}]
      );
 
 
      setFileList(filelistdata)
 
      form.setFieldsValue({
        resume: setvalue,
      });
   
     }
 
    };
 
    setResumeValues();
  }, [candidateSingle,valueprops]);
 
  console.log("filesList",fileLists)
 
 
  const handleRemove = (e) => {
    console.log("llll",e)
 
    axios.put(`${BASE_URL}/candidate/removeimage/${candidateSingle[0]?.candidateoriginal_id?._id}/${e?.id}`)
    .then((res) => {
       // Access the response data
    })
    .catch((err) => {
      console.log("err", err);
    });
    // Find the index of the file in the current fileList
    // const index = fileList.indexOf(file);
 
    // // If the file is found, remove it from the fileList
    // if (index !== -1) {
    //   const newFileList = [...fileList];
    //   newFileList.splice(index, 1);
    //   setFileList(newFileList);
    // }
  };
 
    const lenth =previewTitle =="resume" ? 1: 8
 
  // Upload Function ends here
 
  return (
    <div>
        <Form layout='vertical' onFinish={onFinish} form={form}
       
        >

        
        <Form.List name="resume" label="Contact" initialValue={[{}]}>
        {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField },index) => (
            <>
              {/* <div className='col_1 g_5_sm p_t_20'> */}
             
            <div className='col_3  g_20'>
            <Form.Item label="Attachment Name"   name={[name, 'attachment_name']}
                rules={[
                  {
                    required:true,
                    message:"Enter name",
                  }
                ]}>
                  <Input placeholder="Enter Name" />
                </Form.Item>
            
               
                
                <Form.Item label=" "   name={[name, 'uplaod_file']}>
                <Upload
                 onRemove={handleRemove}
             action={`${BASE}test`}
            
            fileList={fileLists[index] || []}
            onPreview={handlePreview}
            onChange={({fileList}) => handleChange(index,{fileList})}
          >
           + Upload
          </Upload>
          {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
          </Modal> */}
                </Form.Item>
           
              <MinusCircleOutlined onClick={() => remove(name)} />
       
      
              </div>
           </>
       
          ))}
          <Form.Item>
           <div className="col_3 p_t_10">
           <p
           style={{
            cursor: 'pointer'
           }}
           className='c_primary'
            onClick={() => {
              add();
              setFileList([...fileLists, []]);
            }}
           
          >
               <PlusOutlined />  Another Document
            </p>
           </div>
          </Form.Item>
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
          <Button className="btn_cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
           type="primary"  

            className="btn"
            htmlType="submit"
          
          >
            Save
          </Button>
        </div>
            </Form>
    </div>
  )
}
 
export default UploadDocuments