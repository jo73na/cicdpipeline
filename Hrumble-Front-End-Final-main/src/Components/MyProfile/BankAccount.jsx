import React, { useState, useContext, useEffect } from "react";
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
import CookieUtil from '../../Utils/Cookies';
import EmployeeContext from '../../Providers/EmployeeProvider';
import { useNavigate } from "react-router-dom";
 
 
const BASE = import.meta.env.VITE_BASE;
 
const BankAccount = ({id}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const { employeeLogindata, fetchEmploy, editEmployee,FetchEmployeeTable } = useContext(EmployeeContext);
  const [adminID, setAdminID] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
     useEffect(() => {
          FetchEmployeeTable();
        }, []);
 
  useEffect(() => {
    const adminIdFromCookie = CookieUtil.get("admin_id");
    if ( id || adminIdFromCookie) {
      setAdminID(id || adminIdFromCookie);
      fetchEmploy(id || adminIdFromCookie);
    } else {
      console.error("Admin ID not found in cookies");
    }
  }, []);
 
  useEffect(() => {
    // When employeeLoginData is updated, set form fields
    if (employeeLogindata?.bankDetails) {
      const { bankDetails } = employeeLogindata;
 
      form.setFieldsValue({
        bankName: bankDetails.bankName,
        fullname: bankDetails.fullname,
        accountNumber: bankDetails.accountNumber,
        branchName: bankDetails.branchName,
        branchAddress: bankDetails.branchAddress,
        ifscCode: bankDetails.ifscCode,
        zipcode: bankDetails.zipcode,
        supportingDocuments: bankDetails.supportingDocuments ? [{
          url: `${BASE}${bankDetails.supportingDocuments}`,
          name: bankDetails.supportingDocuments.split("\\").pop(),
        }] : [],
        country: bankDetails.country,
        state: bankDetails.state,
        city: bankDetails.city,
      });
 
     
      setSelectedCountry(bankDetails.country);
      setSelectedState(bankDetails.state);
    }
  }, [employeeLogindata]);
 
 
 
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
      return false; // Reject the file
    }
    return true; // Allow the file
  };
 
  const handleFileChange = ({ file }) => {
    console.log("File Status:", file.status);
    console.log("File Response:", file.response);
 
    if (file.status === 'done') {
      const filePath = file.response?.filePath || ''; // Ensure 'filePath' matches your backend's key
      console.log("File Path:", filePath);
      form.setFieldsValue({
        supportingDocuments: [file], // Ensure this is an array and matches your form field
      });
    } else if (file.status === 'error') {
      message.error("Failed to upload file");
    }
  };
  const handleFinish = async (values) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
     
      // // Append form values to FormData
      // Object.keys(values).forEach(key => {
      //   if (key === "supportingDocuments") {
      //     // Append the file object directly if it exists
      //     if (values[key]?.[0]?.originFileObj) {
      //       formData.append(key, values[key][0].originFileObj);
      //     }
      //   } else {
      //     formData.append(key, values[key]);
      //   }
      // });
 
      // // Append adminID to FormData
      // formData.append("adminID", id || adminID);
 
      // // Call the editEmployee function with the FormData
      // await editEmployee(formData, id || adminID);
      //       // Notify the parent about form completion
      //       if (onFormChange) {
      //         onFormChange({
      //           bankName: values.bankName,
      //           accountNumber: values.accountNumber,
      //           branchName: values.branchName,
      //           branchAddress: values.branchAddress,
      //           ifscCode: values.ifscCode,
      //           zipcode: values.zipcode,
      //           country: values.country,
      //           state: values.state,
      //           city: values.city,
      //           supportingDocuments: !!values.supportingDocuments?.length,
      //         });
      //       }
 
      Object.keys(values).forEach(key => {
        if (key === "supportingDocuments") {
          if (values[key]?.[0]?.originFileObj) {
            formData.append(key, values[key][0].originFileObj);
          }
        } else {
          formData.append(key, values[key]);
        }
      });
 
      formData.append("adminID", id || adminID);
 
      // Save the data
      await editEmployee(formData, id || adminID);
      message.success('Bank account details updated successfully!');
 
 
               // Force a refresh of the data before navigation
      await Promise.all([
        FetchEmployeeTable(),
        fetchEmploy(id || adminID)
      ]);
 
      // Small delay to ensure state updates are processed
      setTimeout(() => {
        // Use window.location for a full page reload
        window.location.href = `/viewprofile/${id || adminID}`;
      }, 500);
    } catch (error) {
      console.error('Form submission error:', error);
      message.error('Failed to update bank account details');
    }finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <div style={{ marginTop: "20px" }}>
      <h6 style={{fontSize:"16px", color:"rgb(48, 64, 159)", fontFamily:"poppins", marginBottom:"6px", fontWeight:"500"}}>Bank Account Details</h6>
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
                    {/* Bank Name */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="fullname"
              label="Name"
              rules={[{ required: true, message: "Please enter the  name as per passbook!" }]}
            >
              <Input className="employeeForm" placeholder="Enter Name as per passbook" />
            </Form.Item>
          </Col>
 
          {/* Account Number
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[
                { required: true, message: "Please enter the account number!" },
                { pattern: /^[0-9]{9,18}$/, message: "Account number must be numeric!" },
              ]}
            >
              <Input
                className="employeeForm"
                placeholder="Enter Account Number"
                type="password"
              />
            </Form.Item>
          </Col>
           {/* valid the Account Number */}
           {/* <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[
                { required: true, message: "Please enter the account number!" },
                { pattern: /^[0-9]{9,18}$/, message: "Account number must be numeric!" },
              ]}
            >
              <Input
                className="employeeForm"
                placeholder="Enter Account Number"
             
              />
            </Form.Item>
          </Col>  */}

          {/* Account Number */}
<Col xs={24} sm={12} md={8}>
  <Form.Item
    name="accountNumber"
    label="Account Number"
    rules={[
      { required: true, message: "Please enter the account number!" },
      { pattern: /^[0-9]{9,18}$/, message: "Account number must be numeric!" },
    ]}
  >
    <Input
      className="employeeForm masked-input"
      placeholder="Enter Account Number"// Use "text" instead of "password"
      inputMode="numeric" // Numeric keyboard on mobile devices
      autoComplete="off" // Prevent autofill behavior
    />
  </Form.Item>
</Col>

{/* Validate the Account Number */}
<Col xs={24} sm={12} md={8}>
  <Form.Item
    name="confirmAccountNumber"
    label="Confirm Account Number"
    dependencies={['accountNumber']}
    rules={[
      { required: true, message: "Please confirm the account number!" },
      { pattern: /^[0-9]{9,18}$/, message: "Account number must be numeric!" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('accountNumber') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("The account numbers do not match!"));
        },
      }),
    ]}
  >
    <Input
      className="employeeForm"
      placeholder="Confirm Account Number"
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
                autoSize={{ minRows: 1.2 }}
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
              showSearch
                className="employeeForm"
                options={countryOptions}
                placeholder="Select Country"
                onChange={(value) => {
                  setSelectedCountry(value);
                  setSelectedState(null);
                }}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
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
              <Select className="employeeForm"
                options={stateOptions}
                placeholder="Select State"
                onChange={(value) => setSelectedState(value)}
                disabled={!selectedCountry}
                showSearch
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
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
                showSearch
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
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
                              required: false,
                              message: "Please upload supporting documents!",
                            },
                          ]}
                        >
                          <Upload
                            name="file"
                            action={`${BASE}test`}
                            listType="file"
                            maxCount={1}
                            beforeUpload={beforeUpload}
                            onChange={handleFileChange}
                          >
                            <Button icon={<UploadOutlined />}className='custom-upload-button'>
                              Upload PDF, PNG, or JPG
                            </Button>
                          </Upload>
                        </Form.Item>
          </Col>
        </Row>
 
        <Row gutter={24}>
          <Col span={24}>
            <Space>
              <Button type="primary" htmlType="submit"    loading={isSubmitting}
                disabled={isSubmitting} >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              <Button htmlType="reset" onClick={() => form.resetFields()}  disabled={isSubmitting}>
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