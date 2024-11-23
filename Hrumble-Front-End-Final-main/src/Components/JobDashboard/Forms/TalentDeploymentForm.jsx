import {
  Space,
  Cascader,
  Row,
  Col,
  Select,
  Input,
  Button,
  message,
} from "antd";
import { Form } from "antd";
import { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Stepper, Step, StepLabel, StepContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import JobContext from "../../../Providers/JobProvider/index";

const { Option } = Select;
const TalentDeploymentForm = ({
  onDiscard,
  primarySelected,
  secondarySelected, resetForm
}) => {
  const [form] = Form.useForm();
  const [job_type, setjob_type] = useState("");
  const [formData, setFormData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [salaryType, setSalaryType] = useState("LPA");
  const [job_description, setjob_description] = useState("");
  const [noticeType, setNoticeType] = useState("");
  const {
    addJob,
    addbuttonJob,
    clients,
    handleClientChange,
    skill,
    location,
    poc,
    endclient,
    setAddButton,
    init,
  } = useContext(JobContext);
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
  const clientsData = menuThree(null, clients);
  const jobInfoFields = [
    "job_type",
    "job_id",
    "job_title",
    "required_no_of_candidates",
    "notice_period",
    "job_location",
  ];
  // Step 2: Experience & Salary Fields
  const experienceFields = ["exp_from", "exp_to", "salary", "salaryType"];
  // step 3: Client Details
  const clientFields = ["client_id", "vendor_clientbillable", "end_client", "poc"];

  // Step 4: Job Description Field
  const descriptionFields = ["job_description"];

  // Map steps to their required fields
  const stepValidationFields = {
    0: jobInfoFields,
    1: experienceFields,
    2: clientFields,
    3: descriptionFields,
  };

  // Comprehensive list of Indian cities
  const indianCities = [
    "Agra",
    "Ahmedabad",
    "Ajmer",
    "Aligarh",
    "Allahabad",
    "Ambala",
    "Amritsar",
    "Aurangabad",
    "Bangalore",
    "Bareilly",
    "Belgaum",
    "Bhilai",
    "Bhiwandi",
    "Bhopal",
    "Bhubaneswar",
    "Bikaner",
    "Bilaspur",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Cuttack",
    "Dehradun",
    "Delhi",
    "Dhanbad",
    "Durgapur",
    "Erode",
    "Faridabad",
    "Firozabad",
    "Ghaziabad",
    "Goa",
    "Gorakhpur",
    "Gulbarga",
    "Guntur",
    "Gurgaon",
    "Guwahati",
    "Gwalior",
    "Hubli",
    "Hyderabad",
    "Indore",
    "Jabalpur",
    "Jaipur",
    "Jalandhar",
    "Jammu",
    "Jamnagar",
    "Jamshedpur",
    "Jhansi",
    "Jodhpur",
    "Kakinada",
    "Kannur",
    "Kanpur",
    "Kochi",
    "Kolhapur",
    "Kolkata",
    "Kota",
    "Kozhikode",
    "Kurnool",
    "Lucknow",
    "Ludhiana",
    "Madurai",
    "Mangalore",
    "Meerut",
    "Mumbai",
    "Mysore",
    "Nagpur",
    "Nashik",
    "Nellore",
    "Noida",
    "Patna",
    "Pondicherry",
    "Pune",
    "Raipur",
    "Rajkot",
    "Ranchi",
    "Rourkela",
    "Salem",
    "Sangli",
    "Shimla",
    "Siliguri",
    "Solapur",
    "Srinagar",
    "Surat",
    "Thiruvananthapuram",
    "Thrissur",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tiruppur",
    "Ujjain",
    "Vadodara",
    "Varanasi",
    "Vijayawada",
    "Visakhapatnam",
    "Warangal",
  ].sort();

  useEffect(() => {
    if (job_type === "Full Time") {
      setSalaryType("LPA"); // For Full Time, default salary type is LPA
    } else if (job_type === "Contract") {
      setSalaryType("Monthly"); // For Contract, default salary type is Monthly
    } else if (job_type === "Both") {
      setSalaryType("LPA"); // For Both, default salary type is LPA
    }
  }, [job_type]);

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

        const expFrom = values.exp_from;
        const expTo = values.exp_to;
        if (expTo < expFrom) {
          message.error(
            "Maximum experience should be greater than minimum experience!"
          );
          return false;
        }

        const salaryAmount = values.salary;
        if (salaryAmount <= 0) {
          message.error("Salary amount must be greater than 0!");
          return false;
        }
      }

      // Step 3 Validation
      else if (activeStep === 2) {
        const values = await form.validateFields(clientFields);

        const Cbudget = values.vendor_clientbillable;
        if (Cbudget <= 0) {
          message.error("Budget should be greater than 0!");
          return false;
        } else if (
          !values.client_id &&
          !values.clientBudget &&
          !values.end_client &&
          !values.poc
        ) {
          message.error("Please fill at least one of the client details!");
          return false;
        }
        await form.validateFields(clientFields);
      }

      // Step 4 Validation
      else if (activeStep === 3) {
        if (
          !job_description ||
          job_description.replace(/<[^>]*>/g, "").trim().length < 100
        ) {
          message.error(
            "Job description must be at least 100 characters long!"
          );
          return false;
        }
        form.setFieldsValue({ job_description });
      }

      return true;
    } catch (error) {
      if (error.errorFields) {
        const errorMessages = error.errorFields
          .map((field) => field.errors[0])
          .join(", ");
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
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
 
  const handleSubmit = async () => {

      // Validate the current step
      const isValid = await validateCurrentStep();
      if (isValid) {
        // Validate form fields
        const values = await form.validateFields();
  
        // Ensure formData is defined and has the expected structure
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
 

  const handleChangeSalary = (e) => {
    setSalaryType(e);
  };

  useEffect(() => {
    if (job_type === "Full Time") {
      // Full Time
      setSalaryType("LPA");
      // Set the salary type in the form
      form.setFieldsValue({
        salary: null,
        vendor_clientbillable: null,
      });
    } else if (job_type === "Contract") {
      // Contract
      setSalaryType("Monthly");
      form.setFieldsValue({
        salary: null,
        vendor_clientbillable: null,
      });
    } else if (job_type === "Both") {
      // Both
      setSalaryType("LPA");
      form.setFieldsValue({
        salary: null,
        vendor_clientbillable: null,
      });
    }
  }, [job_type, form]);

  useEffect(() => {
    init();
  }, []);

  const steps = [
    {
      label: "Job Details",

      content: (
        <div className="step-content">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="job_type"
                label="Hiring Mode"
                rules={[
                  {
                    required: true,
                    message: "Please select Hiring Mode type!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Hiring Mode Type"
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
                <Col span={8}>
                  <Form.Item
                    name="job_id"
                    label="Job ID"
                    rules={[
                      { required: true, message: "Please input the Job ID!" },
                      {
                        pattern: /^[a-zA-Z0-9]+$/,
                        message: "Job ID must be alphanumeric!",
                      },
                      {
                        min: 4,
                        message: "Job ID must be at least 4 characters!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Job ID" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="job_title"
                    label="Job Title"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Job Title!",
                      },
                      {
                        min: 3,
                        message: "Job title must be at least 3 characters!",
                      },
                      {
                        max: 100,
                        message: "Job title cannot exceed 100 characters!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Job Title" />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>

          <Row gutter={[16, 16]}>
            {job_type && (
              <>
                <Col span={8}>
                  <Form.Item
                    name="required_no_of_candidates"
                    label="No. of Candidates"
                    rules={[
                      {
                        required: true,
                        message: "Enter number of candidates!",
                      },
                      {
                        type: "number",
                        min: 1,
                        max: 100,
                        transform: (value) => Number(value),
                        message:
                          "Please enter a valid number between 1 and 100!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Enter number of candidates"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="job_location"
                    label="Job Location"
                    rules={[
                      {
                        required: true,
                        message: "Please select at least one city!",
                      },
                      {
                        type: "array",
                        min: 1,
                        message: "Please select at least one location!",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      showSearch
                      placeholder="Select cities in India"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {indianCities.map((city) => (
                        <Option key={city} value={city}>
                          {city}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="notice_period"
                    label="Notice Period"
                    rules={[{ required: true, message: "Notice Period" }]}
                  >
                    <Select
                      placeholder="Select the notice period "
                      onChange={(value) => setNoticeType(value)}
                    >
                      <Option value="Join Immediately">Join Immediately</Option>
                      <Option value="Less than 15 days">Less than 15 days</Option>
                      <Option value="Less than 30 days">Less than 30 days</Option>
                      <Option value="Less than 60 Days">Less than 60 Days</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
        </div>
      ),
    },
    {
      label: "Experience & Skills",
      formFields: ["expFrom", "expTo", "skills"],
      content: (
        <div className="step-content">
          <Row gutter={[16, 16]} align={"bottom"}>
            <Col span={4}>
              <Form.Item
                name="exp_from"
                label="Experience"
                rules={[
                  {
                    required: true,
                    message: "Please select minimum experience!",
                  },
                ]}
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
            <div style={{ marginBottom: "30px", textAlign: "center" }}>To</div>
            <Col span={4}>
              <Form.Item
                name="exp_to"
                label=""
                rules={[
                  {
                    required: true,
                    message: "Please select maximum experience!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const minExp = getFieldValue("exp_from");
                      if (!value || value >= minExp) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Maximum experience should be greater than minimum experience!"
                        )
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
                  {
                    required: true,
                    message: "Please Select Skills!",
                  },
                ]}
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
        </div>
      ),
    },
    {
      label: "Client Details",
      formFields: [
        "client_id",
        "clientBudget",
        "end_client",
        "poc",
        "assignTeam",
      ],
      content: (
        <div className="step-content">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Client Name"
                name="client_id"
                rules={[
                  {
                    required: true,
                    message: "Please Select Client Name!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Client"
                  options={clientsData}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label.toLowerCase() ?? "").includes(
                      input.toLowerCase()
                    )
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  dropdownRender={(menu) => (
                    <div style={{ width: "300px" }}>{menu}</div>
                  )}
                  onChange={handleClientChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Client Budget"
                name="vendor_clientbillable"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Client Budget!",
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
                      <p
                        className="addon-field"
                      
                      >
                        LPA
                      </p>
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
                        style={{
                          width: "75px",
                          fontSize: "12px",
                          borderRadius: "5px",
                        }}
                        dropdownStyle={{ borderRadius: "5px" }} // Adds border radius to dropdown options
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
            <Col span={8}>
              <Form.Item
                name="end_client"
                label="End Client"
                rules={[
                  { required: false, message: "Please input the End Client!" },
                ]}
              >
                <Input placeholder="Enter End Client" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="poc"
                label="Point of Contact"
                rules={[
                  {
                    required: false,
                    message: "Please input the Point of Contact!",
                  },
                ]}
              >
                <Input placeholder="Enter Point of Contact" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      label: "Job Description",
      description: "Provide a detailed job description",
      content: (
        <>
          <ReactQuill
            theme="snow"
            value={job_description}
            onChange={setjob_description}
            style={{ height: "150px", marginBottom: "60px" }}
          />
          <Form.Item
            name="job_description"
            rules={[
              {
                validator: async () => {
                  if (!job_description || job_description.length < 100) {
                    throw new Error(
                      "Job description must be at least 100 characters long!"
                    );
                  }
                },
              },
            ]}
            style={{ display: "none" }}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
  ];

  const useStyles = makeStyles(() => ({
    root: {
      "& .MuiStepIcon-active": { color: "black" },
      // "& .MuiStepIcon-completed": { color: "black" },
      "& .MuiStepIcon-root": { color: "black" },
    },
  }));

  const c = useStyles();

  return (
    <div className="hiring-form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="hiring-form"
      >
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className={useStyles().root}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <div style={{ marginBottom: "-20px" }}>{step.content}</div>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
        >
          <Button
            onClick={onDiscard}
            style={{
              background: "#FF5E5E",
              borderColor: "white",
              color: "#ffdede",
              borderRadius: "10px",
              marginRight: 8,
            }}
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
                color: "white",
              }}
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

      <style jsx>{`
        .hiring-form-container {
          padding: 24px;
          background: #fff;
        }
        .hiring-form {
          max-width: 1200px;
          margin: 0 auto;
        }
        .step-title {
          margin-bottom: 24px;
          font-size: 18px;
          font-weight: 600;
        }
        .editor-container {
          margin-bottom: 50px;
        }
        .quill {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .ql-container {
          flex: 1;
          overflow-y: auto;
        }
        .ql-editor {
          min-height: 100%;
        }
      `}</style>
    </div>
  );
};

export default TalentDeploymentForm;
