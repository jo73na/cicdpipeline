import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";

import { useContext } from "react";
import DashboardContext from "./../../Providers/DashboardProvider/index";
// import {
//   HtmlEditor,
//   Image,
//   Inject,
//   Link,
//   QuickToolbar,
//   RichTextEditorComponent,
//   Toolbar,
// } from "@syncfusion/ej2-react-richtexteditor";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

import { useRef } from "react";
import LoadingContext from "../../Providers/Loading";

const MailSend = ({handlesend }) => {
  const {  mailsendbutton, handleinit, Ccdata, Todata } =
    useContext(DashboardContext);
  // const { loggedsend, breakloggedsend } = useContext(LoadingContext);

  let rteRef = useRef(null);

  console.log("Ccdata", Ccdata);
  console.log("Todata", Todata);
  const [form] = useForm();
  const handleFinish = (values) => {
    let send = {
      ...values,
      description: ""
     
    };
    console.log("form", send);
    

    handlesend(send, form);
  };

  useEffect(() => {
    handleinit();
  }, []);

  // Function to get the value of the RichTextEditor

  return (
    <>
      <div className=" m_t_30">
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            label="To"
            name="To"
            rules={[{ required: true, message: "Select To " }]}
          >
            <Select allowClear mode="multiple" showSearch options={Ccdata} />
          </Form.Item>
          <Form.Item label="Cc" name="Cc">
            <Select allowClear mode="multiple" showSearch options={Ccdata} />
          </Form.Item>
          <Form.Item label="Subject " name="subject">
            <Input />
          </Form.Item>

          {/* <RichTextEditorComponent id="ajaxloadRTE" ref={rteRef}>
            <Inject
              services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]}
            />
          </RichTextEditorComponent> */}

          {/* <AjaxContent/> */}
          {/* <ReactQuill
       onChange={handlechangedescription}/> */}

          <div
            style={{
              marginTop: "60px",
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <Button className="btn_cancel">Cancel</Button>

            <Button
              type="primary"
              className="btn"
              htmlType="submit"
              loading={mailsendbutton}
            >
              Send
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default MailSend;
