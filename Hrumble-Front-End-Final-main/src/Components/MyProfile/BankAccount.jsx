import React, { useState } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Button,
  Upload,
  message,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Country, State, City } from "country-state-city";
 
const BankAccount = () => {
  const [form] = Form.useForm();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
 
  // Fetch Countries
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
 
  // Fetch States based on selected country
  const stateOptions =
    selectedCountry &&
    State.getStatesOfCountry(selectedCountry).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
 
  // Fetch Cities based on selected state and country
  const cityOptions =
    selectedState &&
    City.getCitiesOfState(selectedCountry, selectedState).map((city) => ({
      value: city.name,
      label: city.name,
    }));
 
  // Handle upload
  const beforeUpload = (file) => {
    const isSupported =
      file.type === "application/pdf" ||
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg";
    if (!isSupported) {
      message.error("Only PDF, PNG, JPG, or JPEG files are allowed.");
      return Upload.LIST_IGNORE;
    }
    return isSupported;
  };
 
  const handleFinish = (values) => {
    console.log("Bank Account Details Submitted:", values);
    message.success("Bank account details saved successfully!");
  };
 
  return (
    <div style={{ marginTop: "20px" }}>
      <h6 style={{ color: "#30409F" }}>Bank Account Details</h6>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={[16, 16]}>
          {/* Bank Name */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={[{ required: true, message: "Please enter the bank name!" }]}
            >
              <Input className="employeeForm" placeholder="Enter Bank Name" />
            </Form.Item>
          </Col>
 
          {/* Account Number */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[
                { required: true, message: "Please enter the account number!" },
                { pattern: /^\d+$/, message: "Account number must be numeric!" },
              ]}
            >
              <Input
                className="employeeForm"
                placeholder="Enter Account Number"
              />
            </Form.Item>
          </Col>
 
          {/* Branch Name */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="branchName"
              label="Branch Name"
              rules={[{ required: true, message: "Please enter the branch name!" }]}
            >
              <Input className="employeeForm" placeholder="Enter Branch Name" />
            </Form.Item>
          </Col>
        </Row>
 
        <Row gutter={[16, 16]}>
          {/* IFSC Code */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="ifscCode"
              label="IFSC Code"
              rules={[
                { required: true, message: "Please enter the IFSC code!" },
                {
                  pattern: /^[A-Za-z]{4}\d{7}$/,
                  message: "Invalid IFSC code format! (e.g., SBIN0001234)",
                },
              ]}
            >
              <Input
                className="employeeForm"
                placeholder="Enter IFSC Code"
                style={{ textTransform: "uppercase" }}
              />
            </Form.Item>
          </Col>
 
          {/* Branch Address */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="branchAddress"
              label="Branch Address"
              rules={[
                { required: true, message: "Please enter the branch address!" },
              ]}
            >
              <Input.TextArea
                className="employeeForm"
                placeholder="Enter Branch Address"
                autoSize={{ minRows: 2 }}
              />
            </Form.Item>
          </Col>
        </Row>
 
        <Row gutter={[16, 16]}>
          {/* Country */}
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: "Please select your country!" }]}
            >
              <Select
                className="employeeForm"
                options={countryOptions}
                placeholder="Select Country"
                onChange={(value) => {
                  setSelectedCountry(value);
                  setSelectedState(null);
                }}
              />
            </Form.Item>
          </Col>
 
          {/* State */}
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "Please select your state!" }]}
            >
              <Select
                className="employeeForm"
                options={stateOptions}
                placeholder="Select State"
                onChange={(value) => setSelectedState(value)}
                disabled={!selectedCountry}
              />
            </Form.Item>
          </Col>
 
          {/* City */}
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please select your city!" }]}
            >
              <Select
                className="employeeForm"
                options={cityOptions}
                placeholder="Select City"
                disabled={!selectedState}
              />
            </Form.Item>
          </Col>
 
          {/* Zip Code */}
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="zipcode"
              label="Zip Code"
              rules={[
                { required: true, message: "Please enter the zip code!" },
                {
                  pattern: /^\d+$/,
                  message: "Zip code must be numeric!",
                },
              ]}
            >
              <Input className="employeeForm" placeholder="Enter Zip Code" />
            </Form.Item>
          </Col>
        </Row>
 
        {/* Upload Supporting Documents */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="supportingDocuments"
              label="Supporting Documents"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[
                {
                  required: true,
                  message: "Please upload supporting documents!",
                },
              ]}
            >
              <Upload
                name="documents"
                action="/upload.do"
                listType="picture"
                maxCount={1}
                beforeUpload={beforeUpload}
              >
                <Button icon={<UploadOutlined />}>
                  Upload PDF, PNG, or JPG
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
 
        <Row>
          <Col span={24}>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button htmlType="reset" onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
 
export default BankAccount;