import React, { useState, useContext } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  Upload,
  Button,
  Divider,
  Space,
 
  Checkbox,
  Popconfirm,
  message,
  Table,
} from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Country, State, City } from "country-state-city";
import EmployeeContext from '../../Providers/EmployeeProvider';

const BASE = import.meta.env.VITE_BASE; 

 
const PersonalDetails = () => {
  const [form] = Form.useForm();
  const { personalEmp,
    fetchPersonalDetail,
    editPersonal,
    Loading,
    employId, addEmployee, fetchEmployFull,employeeLogindata  } = useContext(EmployeeContext);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [permanentAddressChecked, setPermanentAddressChecked] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState("");
 
  const isEditing = (record) => record.key === editingKey;
 
  const handleAdd = () => {
    const newRow = {
      key: Date.now().toString(), // Unique key for the row
      relationship: "",
      name: "",
      phoneNumber: "",
    };
    setDataSource((prev) => [...prev, newRow]);
    setEditingKey(newRow.key);
  };
 
  const handleDelete = (key) => {
    setDataSource((prev) => prev.filter((row) => row.key !== key));
    message.success("Contact deleted successfully!");
  };
 
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
 
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey("");
        message.success("Contact saved successfully!");
      }
    } catch (err) {
      console.error("Validation Failed:", err);
    }
  };
 
  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };
 
  const cancel = () => {
    setEditingKey("");
  };
 
  const columns = [
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="relationship"
            rules={[{ required: true, message: "Please enter relationship!" }]}
            style={{ margin: 0 }}
          >
            <Input className="employeeForm" placeholder="Relationship" />
          </Form.Item>
        ) : (
          record.relationship
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter name!" }]}
            style={{ margin: 0 }}
          >
            <Input className="employeeForm" placeholder="Name" />
          </Form.Item>
        ) : (
          record.name
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter phone number!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits!",
              },
            ]}
            style={{ margin: 0 }}
          >
            <Input className="employeeForm" placeholder="Phone Number" />
          </Form.Item>
        ) : (
          record.phoneNumber
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type="link" onClick={() => save(record.key)}>
              Save
            </Button>
            <Button type="link" onClick={cancel}>
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="link" onClick={() => edit(record)} disabled={editingKey !== ""}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => handleDelete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
 
  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
 
 
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
 
  // Handle address checkbox
  const handleCheckboxChange = (e) => {
    setPermanentAddressChecked(e.target.checked);
    if (e.target.checked) {
      const addressFields = form.getFieldsValue([
        "presentAddress",
        "presentCountry",
        "presentState",
        "presentCity",
        "presentZipcode",
      ]);
      form.setFieldsValue({
        permanentAddress: addressFields.presentAddress,
        permanentCountry: addressFields.presentCountry,
        permanentState: addressFields.presentState,
        permanentCity: addressFields.presentCity,
        permanentZipcode: addressFields.presentZipcode,
      });
    }
  };
 
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        message.success("Data saved successfully!");
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  ///////////////////////
  // useEffect(() => {
  //   if (employId) {
  //     fetchPersonalDetail(employId);
  //   }
  // }, [employId]);

  // useEffect(() => {
  //   if (personalEmp) {
  //     form.setFieldsValue({
  //       ...personalEmp,
  //       dob: personalEmp.dob ? moment(personalEmp.dob) : null,
  //       emergencyContacts: personalEmp.emergencyContacts || []
  //     });
  //   }
  // }, [personalEmp]);

  const handleFormSubmit = async (values) => {
    try {
      // Transform form values to match backend schema
      const transformedValues = {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        employee_id: values.employeeId,
        dob: values.dob.toDate(),
        gender: values.gender,
        mobile: values.phoneNumber,
        marital_status: values.Marritalstatus,
        blood_group: values.bloodGroup,
        
        // Document numbers
        aadhar_num: values.aadharNumber,
        pan_num: values.panNumber,
        uan_num: values.uanNumber,
        esic_num: values.esicNumber,

        // Present address
        present_addr: values.presentAddress,
        present_country: values.presentCountry,
        present_state: values.presentState,
        present_district: values.presentCity,
        present_zipcode: values.presentZipcode,

        // Permanent address
        permanent_addr: values.permanentAddress,
        permanent_country: values.permanentCountry,
        permanent_state: values.permanentState,
        permanent_district: values.permanentCity,
        permanent_zipcode: values.permanentZipcode,

        // Files will be handled separately through FormData
        designation: values.designation,
        department: values.department,

        emergencyContacts: values.emergencyContacts?.map(contact => ({
          relationship: contact.relationship,
          name: contact.name,
          phoneNumber: contact.phoneNumber
        }))
      };

      // Handle file uploads
      const formData = new FormData();
      if (values.profilePicture?.[0]) {
        formData.append('display_profile_file', values.profilePicture[0].originFileObj);
      }
      if (values.aadharUpload?.[0]) {
        formData.append('aadhar_file', values.aadharUpload[0].originFileObj);
      }
      if (values.panUpload?.[0]) {
        formData.append('pan_file', values.panUpload[0].originFileObj);
      }
      if (values.uanUpload?.[0]) {
        formData.append('uan_file', values.uanUpload[0].originFileObj);
      }
      if (values.esicUpload?.[0]) {
        formData.append('esic_file', values.esicUpload[0].originFileObj);
      }

      await addEmployee(transformedValues, employId);
      message.success('Personal details updated successfully!');
    } catch (error) {
      message.error('Failed to update personal details');
      console.error('Error:', error);
    }
  };

 
  return (
    <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
      <h6 style={{ marginTop: "10px", color: "#30409F" }}>Basic Info</h6>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
       
            name="employeeId"
            label="Employee ID"
            rules={[{ required: true, message: "Please input your Employee ID!" }]}
          >
            <Input     className="employeeForm" placeholder="Enter Employee ID" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Please input your Department!" }]}
          >
            <Input    className="employeeForm" placeholder="Enter Department" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="designation"
            label="Designation"
            rules={[{ required: true, message: "Please input your Designation!" }]}
          >
            <Input    className="employeeForm" placeholder="Enter Designation" />
          </Form.Item>
        </Col>
      </Row>
 
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please input your First Name!" }]}
          >
            <Input    className="employeeForm" placeholder="Enter First Name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input your Last Name!" }]}
          >
            <Input    className="employeeForm" placeholder="Enter Last Name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
              { pattern: /^[0-9]{10}$/, message: "Phone number must be 10 digits" },
            ]}
          >
            <Input    className="employeeForm" placeholder="Enter Phone Number" />
          </Form.Item>
        </Col>
      </Row>
 
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid Email!" },
            ]}
          >
            <Input    className="employeeForm" placeholder="Enter Email" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="dob" label="Date of Birth" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
 
      <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="bloodGroup"
        label="Blood Group"
        rules={[{ required: true, message: "Please select your Blood Group!" }]}
      >
        <Select
        style={{marginLeft:"2px"}}
          className="employeeForm"
          placeholder="Select Blood Group"
          options={[
            { label: "A+", value: "A+" },
            { label: "A-", value: "A-" },
            { label: "B+", value: "B+" },
            { label: "B-", value: "B-" },
            { label: "O+", value: "O+" },
            { label: "O-", value: "O-" },
            { label: "AB+", value: "AB+" },
            { label: "AB-", value: "AB-" },
          ]}
        />
      </Form.Item>
    </Col>
 
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="Marritalstatus" label="Marrital Status" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="male">Married</Radio>
              <Radio value="female">UnMarried</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
      style={{
        height:"150px",
        width:"150px"
      }}
        name="profilePicture"
        label="Profile Picture"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload your Profile Picture!" }]}
      >
        <Upload.Dragger
         
          name="profile"
          action={`${BASE}test`}
          beforeUpload={(file) => {
            const isImage =
              file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
            if (!isImage) {
              message.error("Only JPG/PNG files are allowed!");
              return Upload.LIST_IGNORE;
            }
            return isImage;
          }}
          maxCount={1}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Drag & drop or click to upload</p>
        </Upload.Dragger>
      </Form.Item>
    </Col>
  </Row>
 
  {/* Aadhar Number */}
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="aadharNumber"
        label="Aadhar Number"
        rules={[
          { required: true, message: "Please input your Aadhar Number!" },
          { pattern: /^\d{12}$/, message: "Aadhar Number must be 12 digits!" },
        ]}
      >
        <Input
          className="employeeForm"
          maxLength={12}
          placeholder="Enter Aadhar Number"
        />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="aadharUpload"
        label="Upload Aadhar Document"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload your Aadhar Document!" }]}
      >
        <Upload
          name="aadhar"
          action="/upload.do"
          listType="picture"
          maxCount={1}
          beforeUpload={(file) => {
            const isPDF = file.type === "application/pdf";
            if (!isPDF) {
              message.error("Only PDF files are allowed!");
              return Upload.LIST_IGNORE;
            }
            return isPDF;
          }}
        >
          <Button icon={<UploadOutlined />}>Upload Aadhar PDF</Button>
        </Upload>
      </Form.Item>
    </Col>
  </Row>
 
  {/* ESIC Number */}
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="esicNumber"
        label="ESIC Number"
        rules={[
          { required: true, message: "Please input your ESIC Number!" },
          {
            pattern: /^\d{2}\d{2}\d{3}\d{7}\d{3}$/,
            message: "ESIC Number must be 17 digits!",
          },
        ]}
      >
        <Input className="employeeForm" maxLength={17} placeholder="Enter ESIC Number" />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="esicUpload"
        label="Upload ESIC Document"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload your ESIC Document!" }]}
      >
        <Upload
          name="esic"
          action="/upload.do"
          listType="picture"
          maxCount={1}
          beforeUpload={(file) => {
            const isPDF = file.type === "application/pdf";
            if (!isPDF) {
              message.error("Only PDF files are allowed!");
              return Upload.LIST_IGNORE;
            }
            return isPDF;
          }}
        >
          <Button icon={<UploadOutlined />}>Upload ESIC PDF</Button>
        </Upload>
      </Form.Item>
    </Col>
  </Row>
 
  {/* UAN */}
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="uanNumber"
        label="UAN Number"
        rules={[
          { required: true, message: "Please input your UAN Number!" },
          {
            pattern: /^[1][0-9]{11}$/,
            message: "UAN Number must start with 1 and be 12 digits long!",
          },
        ]}
      >
        <Input className="employeeForm" maxLength={12} placeholder="Enter UAN Number" />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="uanUpload"
        label="Upload UAN Document"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload your UAN Document!" }]}
      >
        <Upload
          name="uan"
          action="/upload.do"
          listType="picture"
          maxCount={1}
          beforeUpload={(file) => {
            const isPDF = file.type === "application/pdf";
            if (!isPDF) {
              message.error("Only PDF files are allowed!");
              return Upload.LIST_IGNORE;
            }
            return isPDF;
          }}
        >
          <Button icon={<UploadOutlined />}>Upload UAN PDF</Button>
        </Upload>
      </Form.Item>
    </Col>
  </Row>
 
  {/* PAN Card */}
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="panNumber"
        label="PAN Number"
        rules={[
          { required: true, message: "Please input your PAN Number!" },
          {
            pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
            message: "Please enter a valid PAN Number (e.g., ABCDE1234F)",
          },
        ]}
      >
        <Input
          className="employeeForm"
          maxLength={10}
          placeholder="Enter PAN Number"
          style={{ textTransform: "uppercase" }}
        />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="panUpload"
        label="Upload PAN Document"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload your PAN Document!" }]}
      >
        <Upload
          name="pan"
          action="/upload.do"
          listType="picture"
          maxCount={1}
          beforeUpload={(file) => {
            const isPDF = file.type === "application/pdf";
            if (!isPDF) {
              message.error("Only PDF files are allowed!");
              return Upload.LIST_IGNORE;
            }
            return isPDF;
          }}
        >
          <Button icon={<UploadOutlined />}>Upload PAN PDF</Button>
        </Upload>
      </Form.Item>
    </Col>
  </Row>
 
      <Divider />
      <h6>Contact Info</h6>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12}>
          <h6>Present Address</h6>
          <Form.Item
            name="presentAddress"
            label="Address"
            rules={[{ required: true, message: "Please enter your Address!" }]}
          >
            <Input.TextArea     className="employeeForm" placeholder="Enter Present Address" />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="presentCountry"
                label="Country"
                rules={[{ required: true, message: "Please select your Country!" }]}
              >
                <Select
                  options={countryOptions}
                  placeholder="Select Country"
                  onChange={(value) => {
                    setSelectedCountry(value);
                    setSelectedState(null);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="presentState"
                label="State"
                rules={[{ required: true, message: "Please select your State!" }]}
              >
                <Select
                  options={stateOptions}
                  placeholder="Select State"
                  onChange={(value) => setSelectedState(value)}
                  disabled={!selectedCountry}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="presentCity"
                label="City"
                rules={[{ required: true, message: "Please select your City!" }]}
              >
                <Select
                  options={cityOptions}
                  placeholder="Select City"
                  disabled={!selectedState}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="presentZipcode"
            label="Zipcode"
            rules={[{ required: true, message: "Please enter your Zipcode!" }]}
          >
            <Input    className="employeeForm" placeholder="Enter Zipcode" />
          </Form.Item>
        </Col>
 
        <Col xs={24} sm={12} md={12}>
          <h6>Permanent Address</h6>
         
          <Form.Item
            name="permanentAddress"
            label="Address"
            rules={[{ required: true, message: "Please enter your Address!" }]}
          >
            <Input.TextArea    className="employeeForm" placeholder="Enter Permanent Address" />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="permanentCountry"
                label="Country"
                rules={[{ required: true, message: "Please select your Country!" }]}
              >
                <Select  options={countryOptions} placeholder="Select Country" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="permanentState"
                label="State"
                rules={[{ required: true, message: "Please select your State!" }]}
              >
                <Select options={stateOptions} placeholder="Select State" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
             
                name="permanentCity"
                label="City"
                rules={[{ required: true, message: "Please select your City!" }]}
              >
                <Select options={cityOptions} placeholder="Select City" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
          className="employeeForm"
            name="permanentZipcode"
            label="Zipcode"
            rules={[{ required: true, message: "Please enter your Zipcode!" }]}
          >
            <Input    className="employeeForm" placeholder="Enter Zipcode" />
          </Form.Item>
        </Col>
        <Col
    xs={24}
    sm={12}
    md={4}
    style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
  >
    <Checkbox
      onChange={handleCheckboxChange}
      checked={permanentAddressChecked}
      style={{ marginBottom: "10px" }}
    >
      Same as Present Address
    </Checkbox>
  </Col>
      </Row>
      <Row gutter={2}>
      <div style={{ marginTop: "20px" }}>
      <h6 style={{ color: "#30409F" }}>Emergency Contacts</h6>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Emergency Contact
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: ({ children, ...props }) => {
                const { record, editable, dataIndex } = props;
                const editableContent = editable && isEditing(record) ? (
                  <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                      { required: true, message: `Please enter ${dataIndex}!` },
                    ]}
                  >
                    <Input className="employeeForm" />
                  </Form.Item>
                ) : (
                  children
                );
                return <td {...props}>{editableContent || children}</td>;
              },
            },
          }}
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </div>
 
      </Row>
 
      <Divider />
      <Button type="primary" htmlType="submit" loading={Loading}>
        Save
      </Button>
    </Form>
  );
};
 
export default PersonalDetails;
 