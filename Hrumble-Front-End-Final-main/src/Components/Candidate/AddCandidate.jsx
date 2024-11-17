import { useState, useEffect, useContext } from "react";
import { Button, Form, Input } from "antd";
import { message, Tabs, Rate } from "antd";

import { useForm } from "antd/lib/form/Form";
import {PlusOutlined,MinusCircleOutlined} from "@ant-design/icons"
import CandidateContext from "../../Providers/Candidate";
import BasicDetailEdit from "./candidateBasicAdd";


const AddCandidatesPopup = () => {
  const { candidatestotal,handleAddCandidatepage,loadingaddbutton,loadingAssign} = useContext(CandidateContext);
  const [value, setValue] = useState("");
 
   const [hiringtype, setHiringtype] = useState("");

  const [active, setactive] = useState("1");
  let skillsdata = [];
 
  console.log(skillsdata, "skillsdata");
  const [form] = useForm();

 
  const [fileError, setFileError] = useState(false);
  const [resume, setResume] = useState("");

  const props = {
    name: "file",
    multiple: false,
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
          setResume (info.file.originFileObj)
      }
      if (status === "done") {
        message.success(`${info.file.name} file upload successfully.`);

         setResume (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  function capitalizeFirstLetterOnly(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
}

  const onFinish = (values) => {
   
    if (fileError) {
      message.error(
        "Invalid file type. Please upload a PDF, JPG, PNG, DOC, or DOCX."
      );
    } else {
      if (active == "1") {
        return setactive("2");
      } else {
         
        var formdata = new FormData();

        let candiateskills = values["candidateskills"];

        candiateskills.forEach((item, index) => {
          for (const key in item) {
            formdata.append(`candidateskills[${index}][${key}]`, item[key]);
          }
        });

        formdata.append("email_id", values["email_id"]);
        formdata.append("last_name", capitalizeFirstLetterOnly(values["last_name"])||"");
        formdata.append("first_name",capitalizeFirstLetterOnly(values["first_name"]) ||"");
        formdata.append(
          "phone_no",
          value?.replace("-", "")
        ); 
        formdata.append("offer_details", values["offer_details"]);
       
        formdata.append("notice_period", values["notice_period"]);
        formdata.append("expected_ctc", values["expected_ctc"]);
        formdata.append("current_ctc", values["current_ctc"]);
        formdata.append("to_exp_from", values["to_exp_from"] || 0);
        formdata.append("to_exp_to", values["to_exp_to"] || 0);
        formdata.append("re_exp_to", values["re_exp_to"] || 0);
        formdata.append("re_exp_from", values["re_exp_from"] || 0);
        formdata.append("remarks", values["remarks"] || "");
        formdata.append("image", resume);
       


        handleAddCandidatepage(formdata,form,setactive)

       
      }
    }
  };

  const Skillmatrix = () => {
    return (
      <div>
        {/* <Card className="zive-addjob-rating"> */}

        <Form.List name="candidateskills">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name }) => (
                <>
                   <div className="lable_center">
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      marginTop: "-15px",
                      

                      justifyContent: "space-around",
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
                        <Input  />
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item label="Yeats of Experience">
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
                    <MinusCircleOutlined style={{marginTop:"-30px"}} onClick={() => remove(name)} />
                  </div>
                </div>
               
                </>
             
              ))}
               <Form.Item>
                <Button
                  type="primary"
                  className="btn_cancel w_30_p"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Skill
                </Button>
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
          <Button className="btn_cancel" onClick={() => setactive("1")}>
            Back
          </Button>
          <Button
           type="primary"  

            className="btn"
            htmlType="submit"
            loading={loadingaddbutton}
          >
            Save
          </Button>
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
        <BasicDetailEdit
        setHiringtype={setHiringtype}
        hiringtype={hiringtype}
        setValue={setValue}
        value={value}
        form={form}
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
    form.setFieldsValue({
      candidate_id:1000+candidatestotal?.length,
      candidateskills: skillsdata,
    });
  }, [candidatestotal]);

  return (
    <div className="container mt-4">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Tabs
          defaultActiveKey="1"
          items={items}
          activeKey={active}
          
          onChange={handleChamgeTap}
        />
      </Form>
    </div>
  );
};

export default AddCandidatesPopup;
