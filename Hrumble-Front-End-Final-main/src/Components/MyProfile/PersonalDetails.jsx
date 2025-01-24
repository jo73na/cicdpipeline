import React, { useState, useContext, useEffect } from "react";
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
import { ArrowLeft} from 'lucide-react'
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Country, State, City } from "country-state-city";
import EmployeeContext from '../../Providers/EmployeeProvider';
import CookieUtil from '../../Utils/Cookies';
import moment from 'moment'
import { useParams, useNavigate, useLocation } from "react-router-dom";

 
 
const BASE = import.meta.env.VITE_BASE;
 
 
const PersonalDetails = ({onNextTab}) => {
  const {id} = useParams();
  // Get the "id" parameter from the URL
  const location = useLocation();
  const navigate = useNavigate();
  let role = CookieUtil.get("role");
  // const [form] = Form.useForm();
  console.log("PersonalDetails:" , id)
  const [mainForm] = Form.useForm();
  const [emergencyForm] = Form.useForm();
  const [familyForm] = Form.useForm();
  const { personalEmp,
    fetchPersonalDetail,
    editPersonal,
    Loading,
    employId, addEmployee, fetchEmployFull,FetchEmployeeTable,employeeLogindata,fetchEmploy, editEmployee  } = useContext(EmployeeContext);
 
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [permanentAddressChecked, setPermanentAddressChecked] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [adminID, setAdminID] = useState(null);
  const [finalData, setFinalData] = useState(null);
 
 
  const isEditing = (record) => record.key === editingKey;
 
 
  console.log("SingleEmployee:::", employeeLogindata)
  console.log("id :" , id)
 
   const handleBackClick = () => {
      if (role === "SuperAdmin" || role === "Admin") {
        navigate("/infopage");
      } else {
        navigate("/dashboard");
      }
    };
   useEffect(() => {
      FetchEmployeeTable();
    }, []);
 
 
  useEffect(() => {
    const adminIdFromCookie = CookieUtil.get("admin_id");
    if (id || adminIdFromCookie) {
      setAdminID(id || adminIdFromCookie);
      fetchEmploy(id || adminIdFromCookie);
    } else {
      console.error("Admin ID not found in cookies");
    }
  }, []);
   
   
 
  useEffect(() => {
    if (employeeLogindata?.basic) {
      const { basic } = employeeLogindata;
     
     
     
      mainForm.setFieldsValue({
        employeeId: basic.employee_id,
        department: basic.department,
        designation: basic.designation,
        firstName: basic.firstname,
        lastName: basic.lastname,
        email: basic.email,
        phoneNumber: basic.mobile,
        dob: basic.dob ? moment(basic.dob) : null,
        gender: basic.gender,
        bloodGroup: basic.blood_group,
        Marritalstatus: basic.marital_status,
        aadharNumber: basic.aadhar_num,
        esicNumber: basic.esic_num,
        uanNumber: basic.uan_num,
        panNumber: basic.pan_num,
        presentAddress: basic.present_addr,
        presentCountry: basic.present_country,
        presentState: basic.present_state,
        presentCity: basic.present_district,
        presentZipcode: basic.present_zipcode,
        permanentAddress: basic.permanent_addr,
        permanentCountry: basic.permanent_country,
        permanentState: basic.permanent_state,
        permanentCity: basic.permanent_district,
        permanentZipcode: basic.permanent_zipcode,
       
        profilePicture: basic.display_profile_file ? [{
          uid: 'profile',
          name: 'profile.jpg',
          status: 'done',
          url: `${BASE}${basic.display_profile_file}`,
        }] : [],
        aadharUpload: basic.aadhar_file ? [{
          uid: 'aadhar',
          name: 'aadhar.pdf',
          status: 'done',
          url: `${BASE}${basic.aadhar_file}`,
        }] : [],
        panUpload: basic.pan_file ? [{
          uid: 'pan',
          name: 'pan.pdf',
          status: 'done',
          url: `${BASE}${basic.pan_file}`,
        }] : [],
        uanUpload: basic.uan_file ? [{
          uid: 'uan',
          name: 'uan.pdf',
          status: 'done',
          url: `${BASE}${basic.uan_file}`,
        }] : [],
        esicUpload: basic.esic_file ? [{
          uid: 'esic',
          name: 'esic.pdf',
          status: 'done',
          url: `${BASE}${basic.esic_file}`,
        }] : [],
      });
 
     
      if (basic.emergencyContacts && basic.emergencyContacts.length > 0) {
        const emergencyContacts = basic.emergencyContacts.map(contact => ({
          key: contact._id,
          relationship: contact.relationship,
          name: contact.name,
          phoneNumber: contact.phoneNumber,
        }));
        setDataSource(emergencyContacts);
      }
    }
  }, [employeeLogindata, mainForm]);
 
  const handleAdd = () => {
    const newRow = {
      key: Date.now().toString(),
      relationship: "",
      name: "",
      phoneNumber: "",
      isNew: true,
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
      const row = await emergencyForm.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
 
      if (index > -1) {
        const item = newData[index];
        // Merge the edited row with existing row data
        const updatedRow = { ...item, ...row };
        newData.splice(index, 1, updatedRow);
        setDataSource(newData); // Update local state
        setEditingKey(""); // Exit editing mode
 
        // Send updated row to the backend
        await editEmployee(updatedRow, id|| adminID);
        // message.success("Contact saved successfully!");
      }
    } catch (err) {
      console.error("Validation Failed:", err);
    }
  };
 
  const edit = (record) => {
    emergencyForm.setFieldsValue({ ...record });
    setEditingKey(record.key);
    // editEmployee(record, id || adminID);
  };
 
  const cancel = () => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => item.key === editingKey);
  
    if (index > -1 && newData[index].isNew) {
      // If the row is newly created, remove it
      newData.splice(index, 1);
      setDataSource(newData);
    }
    
    setEditingKey(""); // Exit editing mode
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
                message: "Phone number must be exactly 10 digits!",
              },
            ]}
            style={{ margin: 0 }}
          >
            <Input
              className="employeeForm"
              placeholder="Phone Number"
              maxLength={10} // Limit input to 10 characters
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />
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
            <Button
              type="link"
              onClick={() => edit(record)}
              disabled={editingKey !== ""}
            >
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
      const addressFields = mainForm.getFieldsValue([
        "presentAddress",
        "presentCountry",
        "presentState",
        "presentCity",
        "presentZipcode",
      ]);
      mainForm.setFieldsValue({
        permanentAddress: addressFields.presentAddress,
        permanentCountry: addressFields.presentCountry,
        permanentState: addressFields.presentState,
        permanentCity: addressFields.presentCity,
        permanentZipcode: addressFields.presentZipcode,
      });
    }
  };
 
  const handleSave = () => {
    mainForm
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
      const emergencyContacts = dataSource.map(contact => ({
        relationship: contact.relationship,
        name: contact.name,
        phoneNumber: contact.phoneNumber
      }));
 
      const transformedValues = {
        firstname: values.firstName,
        lastname: values.lastName,
        email_id: values.email,
        employee_id: values.employeeId,
        dob: values.dob?.format('YYYY-MM-DD'),
        gender: values.gender,
        mobile: values.phoneNumber,
        marital_status: values.Marritalstatus,
        blood_group: values.bloodGroup,
        aadhar_num: values.aadharNumber,
        pan_num: values.panNumber,
        uan_num: values.uanNumber,
        esic_num: values.esicNumber,
        present_addr: values.presentAddress,
        present_country: values.presentCountry,
        present_state: values.presentState,
        present_district: values.presentCity,
        present_zipcode: values.presentZipcode,
        permanent_addr: values.permanentAddress,
        permanent_country: values.permanentCountry,
        permanent_state: values.permanentState,
        permanent_district: values.permanentCity,
        permanent_zipcode: values.permanentZipcode,
        designation: values.designation,
        department: values.department
      };
 
      const formData = new FormData();
      Object.keys(transformedValues).forEach(key => {
        if (transformedValues[key] !== undefined && transformedValues[key] !== null) {
          formData.append(key, transformedValues[key]);
        }
      });
 
      // Append emergency contacts individually
      emergencyContacts.forEach((contact, index) => {
        formData.append(`emergencyContacts[${index}][relationship]`, contact.relationship);
        formData.append(`emergencyContacts[${index}][name]`, contact.name);
        formData.append(`emergencyContacts[${index}][phoneNumber]`, contact.phoneNumber);
      });
 
      // Append file uploads
      if (values.profilePicture?.[0]?.originFileObj) {
        formData.append('display_profile_file', values.profilePicture[0].originFileObj);
      }
      if (values.aadharUpload?.[0]?.originFileObj) {
        formData.append('aadhar_file', values.aadharUpload[0].originFileObj);
      }
      if (values.panUpload?.[0]?.originFileObj) {
        formData.append('pan_file', values.panUpload[0].originFileObj);
      }
      if (values.uanUpload?.[0]?.originFileObj) {
        formData.append('uan_file', values.uanUpload[0].originFileObj);
      }
      if (values.esicUpload?.[0]?.originFileObj) {
        formData.append('esic_file', values.esicUpload[0].originFileObj);
      }
 
      await editEmployee(formData, adminID);
      message.success('Personal details updated successfully!');
    } catch (error) {
      console.error('Form submission error:', error);
      message.error('Failed to update personal details');
    }
  };
 
 
  return (
    <Form
    form={mainForm}
      layout="vertical"
      onFinish={handleFormSubmit}
      onFinishFailed={(errorInfo) => {
        console.log('Form validation failed:', errorInfo);
        message.error('Please fill all required fields correctly');
      }}
>
<div style={{ marginTop: "10px", color: "#30409F" }}>
  <h4
     color='black'
       type="link"
       onClick={handleBackClick}
       className="flex items-center text-gray-600 hover:text-gray-900"
      //  icon={<ArrowLeft className="mr-1" size={20}  style={{color:"black"}}/>}
     >
       Basic Info
     </h4>
</div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
       
            name="employeeId"
            label="Employee ID"
            rules={[{ required: false, message: "Please input your Employee ID!" }]}
          >
            <Input  style={{ backgroundColor: '#F5F5F5', color: 'black' }}  disabled={true} className="employeeForm" placeholder="Enter Employee ID" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: false, message: "Please input your Department!" }]}
          >
            <Input    disabled={true} style={{ backgroundColor: '#F5F5F5', color: 'black' }}  className="employeeForm" placeholder="Enter Department" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="designation"
            label="Designation"
            rules={[{ required: false, message: "Please input your Designation!" }]}
          >
            <Input  disabled={true} style={{ backgroundColor: '#F5F5F5', color: 'black' }}   className="employeeForm" placeholder="Enter Designation" />
          </Form.Item>
        </Col>
      </Row>
 
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: false, message: "Please input your First Name!" }]}
          >
            <Input  disabled={true} style={{ backgroundColor: '#F5F5F5', color: 'black' }}   className="employeeForm" placeholder="Enter First Name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: false, message: "Please input your Last Name!" }]}
          >
            <Input  disabled={true} style={{ backgroundColor: '#F5F5F5', color: 'black' }}  className="employeeForm" placeholder="Enter Last Name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
 
        <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: false, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid Email!" },
            ]}
          >
            <Input disabled={true}  style={{ backgroundColor: '#F5F5F5', color: 'black' }}  className="employeeForm" placeholder="Enter Email" />
          </Form.Item>
        </Col>
      </Row>
 
      <Row gutter={[16, 16]}>
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
        <Col xs={24} sm={12} md={8}>
         <Form.Item
  name="dob"
  label="Date of Birth"
  rules={[{ required: true, message: "Please select your Date of Birth!" }]}
>
  <DatePicker
    format="YYYY-MM-DD"
    style={{ width: "100%" }}
    disabledDate={(current) => current && current > moment().endOf("day")}
  />
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
              <Radio value="Married">Married</Radio>
              <Radio value="UnMarried">UnMarried</Radio>
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
         
          name="file"
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
          <p className="">Drag & drop or click to upload</p>
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
          name="file"
          action={`${BASE}test`}
          listType="file"
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
          <Button icon={<UploadOutlined />} className="custom-upload-button">Upload Aadhar PDF</Button>
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
          name="file"
          action={`${BASE}test`}
          listType="file"
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
          <Button icon={<UploadOutlined />}className="custom-upload-button">Upload ESIC PDF</Button>
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
          name="file"
          action={`${BASE}test`}
          listType="file"
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
          <Button icon={<UploadOutlined />}className="custom-upload-button">Upload UAN PDF</Button>
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
            pattern: /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/,
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
          name="file"
          action={`${BASE}test`}
          listType="file"
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
          <Button icon={<UploadOutlined />}className="custom-upload-button">Upload PAN PDF</Button>
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
      <Input.TextArea className="employeeForm" placeholder="Enter Present Address" />
    </Form.Item>
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Form.Item
          name="presentCountry"
          label="Country"
          rules={[{ required: true, message: "Please select your Country!" }]}
        >
          <Select
            showSearch
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
      <Col span={8}>
        <Form.Item
          name="presentState"
          label="State"
          rules={[{ required: true, message: "Please select your State!" }]}
        >
          <Select
            showSearch
            options={stateOptions}
            placeholder="Select State"
            onChange={(value) => setSelectedState(value)}
            disabled={!selectedCountry}
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="presentCity"
          label="City"
          rules={[{ required: false, message: "Please select your City!" }]}
        >
          <Select
            showSearch
            options={cityOptions}
            placeholder="Select City"
            disabled={!selectedState}
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item
      name="presentZipcode"
      label="Zipcode"
      rules={[{ required: false, message: "Please enter your Zipcode!" }]}
    >
      <Input className="employeeForm" placeholder="Enter Zipcode" />
    </Form.Item>
  </Col>
 
  <Col xs={24} sm={12} md={12}>
  <div style={{ display: "flex", alignItems: "center", marginBottom: "0px" }}>
    <h6 style={{ margin: 0, marginRight: "16px" }}>Permanent Address</h6>
    <Checkbox
      onChange={handleCheckboxChange}
      checked={permanentAddressChecked}
    >
      Same as Present Address
    </Checkbox>
  </div>
 
  <Form.Item
    name="permanentAddress"
    label="Address"
    rules={[{ required: true, message: "Please enter your Address!" }]}
  >
    <Input.TextArea className="employeeForm" placeholder="Enter Permanent Address" />
  </Form.Item>
 
  <Row gutter={[16, 16]}>
    <Col span={8}>
      <Form.Item
        name="permanentCountry"
        label="Country"
        rules={[{ required: true, message: "Please select your Country!" }]}
      >
        <Select
          showSearch
          options={countryOptions}
          placeholder="Select Country"
          filterOption={(input, option) =>
            option?.label.toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item
        name="permanentState"
        label="State"
        rules={[{ required: true, message: "Please select your State!" }]}
      >
        <Select
          showSearch
          options={stateOptions}
          placeholder="Select State"
          filterOption={(input, option) =>
            option?.label.toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item
        name="permanentCity"
        label="City"
        rules={[{ required: false, message: "Please select your City!" }]}
      >
        <Select
          showSearch
          options={cityOptions}
          placeholder="Select City"
          filterOption={(input, option) =>
            option?.label.toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
    </Col>
  </Row>
 
  <Form.Item
    className="employeeForm"
    name="permanentZipcode"
    label="Zipcode"
    rules={[{ required: false, message: "Please enter your Zipcode!" }]}
  >
    <Input className="employeeForm" placeholder="Enter Zipcode" />
  </Form.Item>
</Col>
 
 
</Row>
 
      <Row gutter={2}>
      <div style={{ marginTop: "20px" }}>
      <h6 style={{ color: "#30409F" }}>Emergency Contacts</h6>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Emergency Contact
      </Button>
      <Form form={emergencyForm} component={false} >
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
      {/* <Row gutter={2}>
      <div style={{ marginTop: "20px" }}>
      <h6 style={{ color: "#30409F" }}>Family Contacts</h6>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Family Contact
      </Button>
      <Form form={familyForm} component={false}>
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
 
      </Row> */}
 
      <Divider />
       <div className="toolbar"  style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight:'30px'
        }}>
               <Button
        type="primary"
        htmlType="submit"
        onClick={() => {
          mainForm
           
            .validateFields()
            .then((values) => {
              console.log("Form Submitted:", values);
     
              // Trigger the onNextTab callback to navigate to the next tab
              if (typeof onNextTab === 'function') {
                onNextTab(); // Move to the next tab
              }
              mainForm.submit();
            })
            .catch((error) => {
              console.error("Validation Failed:", error);
              message.error("Please fill all required fields.");
            });
        }}
      >
        Save and Next
      </Button>
     
                </div>
 
    </Form>
  );
};
 
export default PersonalDetails;