import React, { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Input, Select, Button, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Stepper, Step, StepLabel, StepContent} from "@mui/material";
import {makeStyles } from "@mui/styles";
import JobContext from '../../../Providers/JobProvider';


 
 
 
const { Option } = Select;
const indianCities = [
  "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad", "Ambala", "Amritsar",
    "Aurangabad", "Bangalore", "Bareilly", "Belgaum", "Bhilai", "Bhiwandi",
    "Bhopal", "Bhubaneswar", "Bikaner", "Bilaspur", "Chandigarh", "Chennai",
    "Coimbatore", "Cuttack", "Dehradun", "Delhi", "Dhanbad", "Durgapur",
    "Erode", "Faridabad", "Firozabad", "Ghaziabad", "Goa", "Gorakhpur",
    "Gulbarga", "Guntur", "Gurgaon", "Guwahati", "Gwalior", "Hubli", "Hyderabad",
    "Indore", "Jabalpur", "Jaipur", "Jalandhar", "Jammu", "Jamnagar", "Jamshedpur",
    "Jhansi", "Jodhpur", "Kakinada", "Kannur", "Kanpur", "Kochi", "Kolhapur",
    "Kolkata", "Kota", "Kozhikode", "Kurnool", "Lucknow", "Ludhiana", "Madurai",
    "Mangalore", "Meerut", "Mumbai", "Mysore", "Nagpur", "Nashik", "Nellore",
    "Noida", "Patna", "Pondicherry", "Pune", "Raipur", "Rajkot", "Ranchi",
    "Rourkela", "Salem", "Sangli", "Shimla", "Siliguri", "Solapur", "Srinagar",
    "Surat", "Thiruvananthapuram", "Thrissur", "Tiruchirappalli", "Tirunelveli",
    "Tiruppur", "Ujjain", "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam",
    "Warangal"
].sort();
 
const DirectHiringForm = ({ onDiscard, primarySelected, secondarySelected, resetForm }) => {
  const [form] = Form.useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [job_type, setjob_type] = useState("");
  const [salaryType, setSalaryType] = useState("LPA");
  const [job_description, setjob_description] = useState("");
 const {addJob, init,skill} = useContext(JobContext);

 const options = [
  {
    label: 0,
    value: 0,
  },
];
for (let i = 1; i <= 20; i++) {
  options.push({
    label: i,
    value: i,
  });
}

const menuThree = (parent, menu) => {
  if (parent === null) {
    return menu.map((e) => {
      return {
        label: e?.name,
        value: e?._id,
        children: [], // Since there's no hierarchy, no children
      };
    });
  }
  const filter = menu?.filter(
    (e) => String(e?.parent?._id || null) === String(parent)
  );
  const list = filter?.map((e) => {
    return {
      label: e?.name,
      value: e?._id,
      children: menuThree(e?._id, menu), // Recursive call for children
    };
  });

  return list;
};
let skillsdata = [];
skill?.map((item, i) => {
  skillsdata.push({
    key: i,
    label: item?.name,
    value: item?.name,
  });
});
  // Step 1: Job Info Fields
  const jobInfoFields = [
    'job_type',
    'job_id',
    'job_title',
    'required_no_of_candidates',
    'job_location',
    'tenure'
  ];

  
  // Step 2: Experience & Salary Fields
  const experienceFields = [
   "exp_from", "exp_to", "salary", "salaryType", "skils"
  ];
 
  // Step 3: Job Description Field
  const descriptionFields = ['job_description'];
 
  // Map steps to their required fields
  const stepValidationFields = {
    0: jobInfoFields,
    1: experienceFields,
    2: descriptionFields
  };
 

 
  // Validation function for each step
  const validateCurrentStep = async () => {
    try {
      const currentFields = stepValidationFields[activeStep];
      if (!currentFields) return true;
 
      // Step 1 Validation
      if (activeStep === 0) {
        if (!job_type) {
          message.error("Please select a contract type!");
          return false;
        }
        await form.validateFields(jobInfoFields);
      }
 
      // Step 2 Validation
      else if (activeStep === 1) {
        const values = await form.validateFields(experienceFields);
       
        // Validate experience range
        const expFrom = values.exp_from;
        const expTo = values.exp_to;
        if (expTo < expFrom) {
          message.error("Max exp should be greater than Min exp!");
          return false;
        }
 
        // Validate salary
        const salaryAmount = values.salary;
        if (salaryAmount <= 0) {
          message.error("Salary amount must be greater than 0!");
          return false;
        }
      }
 
      // Step 3 Validation
      else if (activeStep === 2) {
        if (!job_description || job_description.replace(/<[^>]*>/g, '').trim().length < 100) {
          message.error("Job description must be at least 100 characters long!");
          return false;
        }
        form.setFieldsValue({ job_description });
      }
 
      return true;
    } catch (error) {
      if (error.errorFields) {
        const errorMessages = error.errorFields.map(field => field.errors[0]).join(', ');
        message.error(`Please fix the following errors: ${errorMessages}`);
      } else {
        message.error("Please fill all required fields correctly!");
      }
      return false;
    }
  };
 
  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      const currentValues = form.getFieldsValue();
      setFormData({ ...formData, ...currentValues });
      setActiveStep(prev => prev + 1);
    }
  };
  
  const handleChangeSalary = (e) => {
    setSalaryType(e);
  };
 
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };
 
 
  const handleSubmit = async () => {
 
      // Validate the current step
      const isValid = await validateCurrentStep();
      if (isValid) {
        // Validate form fields
        const values = await form.validateFields();
  
        const salary = formData.salary ? Number(formData.salary.replace(/,/g, "")) : 0;
        const vendorClientBillable = formData.vendor_clientbillable ? Number(formData.vendor_clientbillable.replace(/,/g, "")) : 0;
  
        // Construct final data object
        const finalData = {
          ...formData,
          ...values,
          salary,
          vendor_clientbillable: vendorClientBillable,
          salaryType,
          primarySelected,
          secondarySelected,
        };
  
        // Submit the form data
        await addJob(finalData);
        message.success("Form submitted successfully!");
        resetForm(); // Reset form after successful submission
        onDiscard(); // Close the form
      }
    
  };
 
 
  useEffect(() => {
    const currentSalaryType = job_type === "Full Time" ? "LPA" : "Monthly";
    setSalaryType(currentSalaryType);
  
    // Set the salary type in the form
    form.setFieldsValue({
      salaryType: currentSalaryType,
    });
  }, [job_type, form]);
  
  useEffect(() => {
    const currentSalaryType = job_type === "Full Time" ? "LPA" : "Monthly";
    if (salaryType !== currentSalaryType) {
      setSalaryType(currentSalaryType);
      form.setFieldsValue({
        salaryType: currentSalaryType,
      });
    }
  }, [job_type, form]);
 
  useEffect(() => {
    init()
  }, [])
 
  const useStyles = makeStyles(() => ({
    root: {
       "& .MuiStepIcon-active": { color: "black" },
      // "& .MuiStepIcon-completed": { color: "black" },
      "& .MuiStepIcon-root": { color: "black" }
    }
  }));
 
  const c = useStyles();

  
 
  const steps = [
    {
      label: "Job Info",
      description: "Enter basic job information",
      content: (
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Form.Item
              name="job_type"
              label="Hiring Mode"
              rules={[{ required: true, message: "Please select Hiring Mode" }]}
            >
              <Select
                placeholder="Select Hiring Mode"
                onChange={(value) => setjob_type(value)}
                
              >
                <Option value="Full Time">Full Time</Option>
                <Option value="Contract">Contract</Option>
                <Option value="Both">Both</Option>
              </Select>
            </Form.Item>
          </Col>
 
          {job_type && (
            <>
              <Col span={6}>
                <Form.Item
                  name="job_id"
                  label="Job ID"
                  rules={[
                    { required: true, message: "Please input the Job ID!" },
                    { pattern: /^[a-zA-Z0-9]+$/, message: "Job ID must be alphanumeric!" }
                  ]}
                >
                  <Input placeholder="Enter Job ID" />
                </Form.Item>
              </Col>
 
              <Col span={6}>
                <Form.Item
                  name="job_title"
                  label="Job Title"
                  rules={[
                    { required: true, message: "Please input the Job Title!" },
                    { min: 3, message: "Job title must be at least 3 characters!" }
                  ]}
                >
                  <Input placeholder="Enter Job Title" />
                </Form.Item>
              </Col>
 
              <Col span={6}>
                <Form.Item
                  name="required_no_of_candidates"
                  label="Number of Candidates"
                  rules={[
                    { required: true, message: "Please enter number of candidates!" },
                    {
                      validator: (_, value) => {
                        const numValue = Number(value);
                        if (isNaN(numValue) || numValue <= 0) {
                          return Promise.reject("Number must be greater than 0!");
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" min="1" placeholder="Enter number of candidates" />
                </Form.Item>
              </Col>
 
              <Col span={6}>
                <Form.Item
                  name="job_location"
                  label="Job Location"
                  rules={[
                    { required: true, message: "Please select at least one location!" },
                    { type: 'array', min: 1, message: "Please select at least one location!" }
                  ]}
                >
                  <Select mode="multiple" placeholder="Select location">
                    {indianCities.map((city) => (
                      <Option key={city} value={city}>
                        {city}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      )
    },
    {
      label: "Experience & Salary",
      description: "Specify experience and salary requirements",
      content: (
        <Row gutter={[16, 16]} align="bottom">
          <Col span={4}>
            <Form.Item
              name="exp_from"
              label="Experience"
              rules={[{ required: true, message: "Please select minimum experience!" }]}
            >
              <Select placeholder="Select Min Experience">
                {[...Array(21)].map((_, i) => (
                  <Option key={i} value={i}>
                    {i} Year{i !== 1 ? "s" : ""}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <div style={{marginBottom: '30px', textAlign: 'center'}}>To</div>
          <Col span={4}>
            <Form.Item
              name="exp_to"
              label=""
              rules={[
                { required: true, message: "Please select maximum experience!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const minExp = getFieldValue("exp_from");
                    if (!value || value >= minExp) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Maximum experience should be greater than minimum experience!")
                    );
                  },
                }),
              ]}
            >
              <Select placeholder="Select Max Experience">
                {[...Array(21)].map((_, i) => (
                  <Option key={i} value={i}>
                    {i} Year{i !== 1 ? "s" : ""}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
 
          {/* Keep experience fields the same */}
          <Col span={9}>
          <Form.Item
                 label="Salary"
                name="salary"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Salary",
                  },
                ]}
                getValueFromEvent={(e) => {
                  // Ensure `e.target.value` is defined and a string
                  const value = e?.target?.value || "";
                  const numericValue = value.replace(/[^0-9]/g, ""); // Extract numeric characters
                  return numericValue
                    ? `${parseFloat(numericValue).toLocaleString("en-IN")}`
                    : ""; // Return formatted number or empty string
                }}
              >
                <Input
                  addonAfter={
                    job_type === "Full Time" ? (
                      <p className="addon-field">LPA</p>
                    ) : (
                      <Select
                        defaultValue={
                          job_type === "Contract"
                            ? "Monthly"
                            : job_type === "Both"
                            ? "LPA"
                            : undefined
                        }
                        className="addon-select"
                        onChange={handleChangeSalary}
                      >
                        {(job_type === "Both" ||
                          job_type === "Full Time") && (
                          <Option value="LPA">LPA</Option>
                        )}
                        {(job_type === "Both" ||
                          job_type === "Contract") && (
                          <>
                            <Option value="Monthly">Monthly</Option>
                            <Option value="Per Hour">Hourly</Option>
                          </>
                        )}
                      </Select>
                    )
                  }
                  placeholder={salaryType === "Per Hour" ? "1,000" : "1,00,000"}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Skills"
                name="skils"
                rules={[
                  { required: true, message: "Please select Skills!" },
                  { type: 'array', min: 1, message: "Please select Skills!" }]}
              >
                <Select
                  placeholder="Select Skill"
                  showSearch
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={skillsdata}
                />
              </Form.Item>
            </Col>
        </Row>
      )
    },
 
    {
      label: "Job Description",
      description: "Provide a detailed job description",
      content: (
        <>
          <ReactQuill
            theme="snow"
            value={job_description}
            onChange={(value) => {
              setjob_description(value);
              form.setFieldsValue({ job_description: value });
            }}
            style={{ height: "150px", marginBottom: "60px" }}
          />
          <Form.Item
            name="job_description"
            rules={[
              {
                validator: async (_, value) => {
                  const strippedValue = value?.replace(/<[^>]*>/g, '').trim() || '';
                  if (strippedValue.length < 100) {
                    throw new Error("Job description must be at least 100 characters long!");
                  }
                },
              },
            ]}
            style={{ display: "none" }}
          >
            <Input />
          </Form.Item>
        </>
      )
    },
  ];
 
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Stepper activeStep={activeStep} orientation="vertical"  className={c.root} >
        {steps.map((step, index) => (
          <Step key={step.label}  >
            <StepLabel >{step.label}</StepLabel>
            <StepContent>
              <div style={{ marginBottom: "-20px" }}>{step.content}</div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
 
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <Button
          onClick={onDiscard}
          style={{
            background: "#FF5E5E",
            borderColor: "white",
            color: "#ffdede",
            borderRadius: "10px",
            marginRight: 8
          }}
          className="discard-button"
        >
          Discard
        </Button>
 
        {activeStep > 0 && (
          <Button
            onClick={handleBack}
            style={{
              marginRight: 8,
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white"
            }}
            className="back-button"
          >
            Back
          </Button>
        )}
 
        {activeStep < steps.length - 1 && (
          <Button
            type="primary"
            onClick={handleNext}
            style={{ borderRadius: "10px" }}
          >
            Next
          </Button>
        )}
 
        {activeStep === steps.length - 1 && (
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ borderRadius: "10px" }}
          >
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};
 
export default DirectHiringForm;