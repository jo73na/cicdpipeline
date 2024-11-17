import { Button, Form, Input, Select, InputNumber, Space } from "antd";
import { Upload } from "antd";
import Upload1 from "/images/Upload.svg";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const { Dragger } = Upload;
const { Option } = Select;

export default function BasicDetailEdit({ value, setValue, info,}) { 


  const handleChangePhoennumber = (value, data, event, formattedValue) => {
    setValue(formattedValue);
  };

 


  return (
    <>
      <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
      <Form.Item
          label="Candidate_id"
          name="candidate_id"
         
        >
          <Input disabled />
        </Form.Item>
        </div>

      <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item name="last_name" label="Last Name">
          <Input placeholder="Last Name" />
        </Form.Item>
      </div>

      <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
        <Form.Item label="Email" name="email_id"
           rules={[
            {
              required: true,
              message: "Email is required!",
            },
            {
              
              type: "email",
              message: "Please Enter valid E-mail!",
            },
          ]}
       >
          <Input placeholder="Enter Email Address" />
        </Form.Item>

        <Form.Item label="Phone Number" name="phone_no">
          <PhoneInput
            country={"in"}
            isValid={(value, country) => {
              if (value?.match(/12345/)) {
                return console.log(
                  "llll",
                  "Invalid value: " + value + ", " + country.name
                );
              } else if (value?.match(/1234/)) {
                return console.log("lll22", false);
              } else {
                return console.log("lll28882", true, value);
              }
            }}
            placeholder="Enter phone number"
            value={value}
            onChange={handleChangePhoennumber}
          />
        </Form.Item>
      </div>

      <div className="col_2 m_t_1 col_1_sm g_5_sm">
        <div className="">
          <Form.Item label="Total Experience">
            <div className="d_f a_i_c g_5">
              <Form.Item name="to_exp_from">
                <InputNumber placeholder="" type="number" />
              </Form.Item>
              <p
                style={{
                  marginTop: "-20px",
                }}
              >
                Years
              </p>
              <Form.Item name="to_exp_to">
                <InputNumber type="number" defaultValue={0} />
              </Form.Item>
              <p
                style={{
                  marginTop: "-20px",
                }}
              >
                Months
              </p>
            </div>
          </Form.Item>
        </div>
        <Form.Item label="Relevent Experience">
          <div className="d_f a_i_c g_5">
            <Form.Item name="re_exp_from">
              <InputNumber placeholder="" type="number" />
            </Form.Item>
            <p
              style={{
                marginTop: "-20px",
              }}
            >
              Years
            </p>
            <Form.Item name="re_exp_to">
              <InputNumber type="number" defaultValue={0} />
            </Form.Item>
            <p
              style={{
                marginTop: "-20px",
              }}
            >
              Months
            </p>
          </div>
        </Form.Item>
      </div>

      <div className="col_2 g_20_y m_t_t col_1_sm g_5_sm salary">
        {/* <Form.Item label="Mode Of Hiring" name="mode_of_hiring"
         rules={[{ required: true, message: "Mode of Hiring is required" }]}>
          <Select onChange={handleChangeHiring} placeholder="Select Hiring">
            <Option value="Full Time" label="Full Time">
              <Space>Full Time</Space>
            </Option>
            <Option value="Contract" label="">
              <Space>Contract</Space>
            </Option>
          </Select>
        </Form.Item>
        {
          hiring =="Contract"&&
          <Form.Item label="Salary Type" name="salaryType"
          rules={[{ required: true, message: "Salary Type  is required" }]}
          >
          <Select onChange={handleChangeHiringType} placeholder="Select Salary Type">
            <Option value="Monthly" label="Full Time">
              <Space>Monthly</Space>
            </Option>
            <Option value="Per Hour" label="">
              <Space>Hourly</Space>
            </Option>
          </Select>
        </Form.Item>
        } */}

        <Form.Item
          label="Current Salary"
          name="current_ctc"
          
          rules={[{ required: true, message: "Current Salary is required" }]}
        >
          {/* {hiring !== "Full Time" ? (
            <Input
            disabled={!hiringtype?true:false }
              type="number"
              placeholder={
                  hiringtype=="Monthly"?"1,00,000":"1,000" 
              }
              
                addonAfter={<p className="m_10">{hiringtype}</p>
              }
            />
          ) : ( */}

            <Input
              type="number"
              

               placeholder="1,00,000" 
              addonAfter={<p className="m_10">LPA</p>}
            />
          {/* )} */}
        </Form.Item>
      {/* </div> */}

      {/* <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm salary"> */}
        <Form.Item
          label="ECTC"
          name="expected_ctc"
          rules={[{ required: true, message: "Expected Salary is required" }]}
        >
          {/* {hiring !== "Full Time" ? (
            <Input
              type="number"
          disabled={!hiringtype?true:false }

              placeholder={
                hiringtype=="Monthly"?"1,00,000":"1,000" 
              }
             
                addonAfter={<p className="m_10">{hiringtype}</p>
                  
              }
            />
          ) : 
          ( */}
            <Input
              type="number"
              
              placeholder="1,00,000"
              addonAfter={<p className="m_10">LPA</p>}
            />
          {/* )} */}
        </Form.Item>

        <Form.Item
          label="Notice Period"
          name="notice_period"
          rules={[{ required: true, message: "Notice Period is required" }]}
        >
          <Select placeholder="Select">
            <Option value="Immediately" label="Immediately">
              <Space>Immediately</Space>
            </Option>
            <Option value="Less than 15 days" label="Less than 15 days">
              <Space>Less than 15 days</Space>
            </Option>
            <Option value="Less than 30 days" label="Less than 30 days">
              <Space>Less than 30 days</Space>
            </Option>
            <Option value="45 days" label="45 days">
              <Space>45 days</Space>
            </Option>
            <Option value="60 days" label="60 days">
              <Space>60 days</Space>
            </Option>
            <Option value="90 days" label="90 days">
              <Space>90 days</Space>
            </Option>
          </Select>
        </Form.Item>
      {/* </div> */}
      {/* <div className="col_2 m_t_1 col_1_sm g_5_sm"> */}
        <Form.Item
          label="Offer Details"
          name="offer_details"
          rules={[{ required: true, message: "Offer Details is required" }]}
        >
          <Input placeholder="Add Offer Details" />
        </Form.Item>
      </div>

      <div className="col_2 m_t_1 col_1_sm g_5_sm">
        <Form.Item
          label="Resume"
          name="resume"
          rules={[
            {
              required: true,
              message: "Please Upload Resume!",
            },
          ]}
        >
          <Dragger {...info}>
            <p className="ant-upload-drag-icon">
              <img src={Upload1} className="d_i_b" />
            </p>
            
            <p className="ant-upload-text">
              Drag Your file here or <span className="browse">Browse</span>
            </p>
            <p className="ant-upload-hint">Support format .PDF,.PNG,.JPG</p>
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
        <Button className="btn_cancel">Cancel</Button>
        <Button type="primary" className="btn" htmlType="submit">
          Next
        </Button> 
      </div>
    </>
  );
}
