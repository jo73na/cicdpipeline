import React, { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Input, Select, Button, message, Card } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Stepper, Step, StepLabel, StepContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import JobContext from '../../../Providers/JobProvider';
import ViewJobContext from '../../../Providers/ViewJob';

 
const { Option } = Select;
const indianCities = [
  "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad", "Ambala", "Amritsar",
].sort();
 
const EditDirectHiring = ({ jobId, closeForm }) => {
  const [form] = Form.useForm();
  const [initialData, setInitialData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [contractType, setContractType] = useState("");
  const [job_description, setjob_description] = useState("");
  const [displaySalary, setDisplaySalary] = useState('');
  const [job_type, setjob_type] = useState("");
  const { jobSingle, handleClickjobTable, skill,clients, init, handleClientChange } = useContext(JobContext);
  const {editJob} = useContext(ViewJobContext);
  const [primarySelected, setPrimarySelected] = useState(jobSingle.primarySelected);
  const [secondarySelected, setSecondarySelected] = useState(jobSingle.secondarySelected);
  const [salaryType, setSalaryType] = useState(jobSingle.salaryType || "LPA");


 
  // Get context and required functions


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
  // Fetch job data when component mounts
  useEffect(() => {
    if (jobId) {
      handleClickjobTable(jobId);
      setActiveStep(0);
    }
  }, [jobId]);
 
  // Populate form when jobSingle data changes
  useEffect(() => {
    if (jobSingle && Object.keys(jobSingle).length > 0) {
      setInitialData(jobSingle);
      const formattedSalary = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(jobSingle.salary || 0);
      if (jobSingle && jobSingle.salaryType) {
        setSalaryType(jobSingle.salaryType);
      }
      // Set form values
      form.setFieldsValue({
        contractType: jobSingle.contractType,
        job_id: jobSingle.job_id,
        job_title: jobSingle.job_title,
        required_no_of_candidates: jobSingle.required_no_of_candidates,
        job_location: jobSingle.job_location,
        notice_period:jobSingle.notice_period,
        exp_from: jobSingle.exp_from,
        exp_to: jobSingle.exp_to,
        salary: jobSingle.salary,
        salaryType: jobSingle.salaryType || "LPA",
        skils: jobSingle.skils,
        client_id: jobSingle.client_id[0]?._id,
        vendor_clientbillable: jobSingle.vendor_clientbillable,
        end_client: jobSingle.end_client,
        poc: jobSingle.poc,
        
      });
 
      // Set other state values
      setContractType(jobSingle.contractType);
      setjob_description(jobSingle.job_description || '');
      setDisplaySalary(formattedSalary);
      setPrimarySelected(jobSingle.primarySelected);
  setSecondarySelected(jobSingle.secondarySelected);
    }
  }, [jobSingle, form]);

  const handleCancel = () => {
    form.setFieldsValue({
      contractType: initialData.contractType,
      job_id: initialData.job_id,
      job_title: initialData.job_title,
      required_no_of_candidates: initialData.required_no_of_candidates,
      job_location: initialData.job_location,
      notice_period: initialData.notice_period,
      exp_from: initialData.exp_from,
      exp_to: initialData.exp_to,
      salary: initialData.salary,
      skils: initialData.skils,
      client_id: initialData.client_id[0]?._id,
    });

    setContractType(initialData.contractType);
    setjob_description(initialData.job_description || "");
    setPrimarySelected(initialData.primarySelected);
    setSecondarySelected(initialData.secondarySelected);
    message.info("Form reset to initial data.");
  };
 
  // Validation functions remain the same
  const jobInfoFields = [
    'contractType',
    'job_id',
    'job_title',
    'required_no_of_candidates',
    'job_location',
    'notice_period'
  ];
 
  const experienceFields = [
    'exp_from',
    'exp_to',
    'salary', 
    'salary_type',
    'skils'
  ];

    const clientFields = ["client_id", "vendor_clientbillable", "end_client", "poc"];
 
  const descriptionFields = ['job_description'];
 
  const stepValidationFields = {
    0: jobInfoFields,
    1: experienceFields,
    2: clientFields,
    3: descriptionFields,
  };
 
  const handleChangeSalary = (e) => {
    setSalaryType(e);
  };
  const validateCurrentStep = async () => {
    try {
      const currentFields = stepValidationFields[activeStep];
      if (!currentFields) return true;
 
      if (activeStep === 0) {
        if (!contractType) {
          message.error("Please select a contract type!");
          return false;
        }
        await form.validateFields(jobInfoFields);
      }
 
      else if (activeStep === 1) {
        const values = await form.validateFields(experienceFields);
        const expFrom = values.exp_from;
        const expTo = values.exp_to;
        if (expTo < expFrom) {
          message.error("Maximum experience should be greater than minimum experience!");
          return false;
        }
 
        const salaryAmount = values.salary;
        if (salaryAmount <= 0) {
          message.error("Salary amount must be greater than 0!");
          return false;
        }
      }
 
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
 
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };
  useEffect(() => {
    init()
  }, [])

  const handlePrimaryClick = (type) => {
    setPrimarySelected(type);
    // Reset secondary selection when primary changes
    if (type === "Internal") {
      setSecondarySelected("Direct Hiring");
    } else {
      setSecondarySelected("External Staffing");
    }
  };
  
  const handleSecondaryClick = (type) => {
    setSecondarySelected(type);
  };
 
  const handleSubmit = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      try {
        const values = await form.validateFields();
  
        const salary = formData.salary ? Number(formData.salary.replace(/,/g, "")) : 0;
        const vendorClientBillable = formData.vendor_clientbillable ? Number(formData.vendor_clientbillable.replace(/,/g, "")) : 0;
  
        const finalData = {
          ...formData,
          ...values,
          salary,
          vendor_clientbillable: vendorClientBillable,
          salaryType,
          primarySelected,
          secondarySelected,
          job_description,
        };
  
  
        // Call editJob with the finalData
        const updatedJob = await editJob(finalData, jobId); // Ensure you're passing the jobId here
  
        // Update the local state with the updated job data
        setFormData(updatedJob); // Update the local state with the new job data
  
        // Optionally, refresh the job table if needed
        await handleClickjobTable(jobId); // This might still be useful for other parts of the UI
        message.success("Job updated successfully!");
        closeForm();
      } catch (error) {
        message.error("Failed to update job: " + error.message);
      }
    }
  };

  useEffect(() => {
    if (jobSingle && jobSingle.job_type) {
      const derivedSalaryType = jobSingle.job_type === "Full Time" 
        ? "LPA" 
        : jobSingle.job_type === "Contract"
        ? "Monthly"
        : "LPA";
  
    }
  }, [jobSingle]);
  

    const useStyles = makeStyles(() => ({
    root: {
      "& .MuiStepIcon-active": { color: "black" },
      "& .MuiStepIcon-root": { color: "black" }
    }
  }));
 
  const c = useStyles();
 
  // Steps configuration (same structure as DirectHiringForm)
  const getSteps = () => {
  const steps = [
    {
      label: "Job Info",
      description: "Update basic job information",
      content: (
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Form.Item
              name="contractType"
              label="Hiring Mode"
              rules={[{ required: true, message: "Please select Hiring Mode" }]}
            >
              <Select
                placeholder="Select Hiring Mode"
                onChange={(value) => setContractType(value)}
               
              >
                <Option value="Full Time">Full Time</Option>
                <Option value="Contract">Contract</Option>
                <Option value="Both">Both</Option>
              </Select>
            </Form.Item>
          </Col>
 
          {contractType && (
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
              {(secondarySelected === "Talent Deployment" || secondarySelected === "External Staffing") && (
                <Col span={8}>
                  <Form.Item
                    name="notice_period"
                    label="Notice Period"
                    rules={[{ required: true, message: "Notice Period is required!" }]}
                  >
                    <Select
                      placeholder="Select the notice period"
                    >
                      <Option value="Join Immediately">Join Immediately</Option>
                      <Option value="Less than 15 days">Less than 15 days</Option>
                      <Option value="Less than 30 days">Less than 30 days</Option>
                      <Option value="Less than 60 Days">Less than 60 Days</Option>
                    </Select>
                  </Form.Item>
                </Col>
              )}
    
            </>
          )}
        </Row>
        // ... (same content as DirectHiringForm with form fields)
      )
    },
    {
        label: "Experience & Salary",
        description: "Update experience and salary requirements",
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
          <Col span={8}>
          <Form.Item
              label="Salary"
              name="salary"
              rules={[{ required: true, message: "Please Enter Salary" }]}
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
                  <Select
                    value={salaryType}
                    onChange={(value) => {
                      setSalaryType(value);
                      form.setFieldsValue({ salaryType: value }); // Sync with form
                    }}
                  >
                    <Option value="LPA">LPA</Option>
                    <Option value="Monthly">Monthly</Option>
                    <Option value="Per Hour">Hourly</Option>
                  </Select>
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
      description: "Update job description",
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
    }
  ];if (secondarySelected === "Talent Deployment" || secondarySelected === "External Staffing") {
    steps.splice(2, 0,    
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
                            value={salaryType}
                            onChange={(value) => {
                              setSalaryType(value);
                              form.setFieldsValue({ salaryType: value }); // Sync with form
                            }}
                          >
                            <Option value="LPA">LPA</Option>
                            <Option value="Monthly">Monthly</Option>
                            <Option value="Per Hour">Hourly</Option>
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
        },);
  }
  
  
  return steps;
}
 
  // Rest of the component remains the same...
  // (Steps configuration and return statement remain unchanged)
  const getPrimaryCardStyle = (cardType) => ({
    backgroundColor: primarySelected === cardType ? "black" : "white",
    borderColor: primarySelected === cardType ? "black" : "lightgrey",
    cursor: "pointer",
    textAlign: "center",
    alignContent: "center",
    borderRadius: "10px",
    width: "280px",
    height: "50px",
    opacity: primarySelected && primarySelected !== cardType ? 0.3 : 1,
    transition: "all 0.3s ease",
    boxShadow: primarySelected === cardType ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
  });
 
  // Card style generator for secondary selection
  const getSecondaryCardStyle = (cardType) => ({
    backgroundColor: secondarySelected === cardType ? "black" : "white",
    borderColor: secondarySelected === cardType ? "black" : "lightgrey",
    cursor: "pointer",
    textAlign: "center",
    alignContent: "center",
    borderRadius: "10px",
    width: cardType === "External Staffing" ? "130px" : "120px",
    height: "40px",
    opacity: secondarySelected && secondarySelected !== cardType ? 0.3 : 1,
    transition: "all 0.3s ease",
    boxShadow: secondarySelected === cardType ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
  });
 
  return (
    <Form form={form} layout="vertical">
    <div>
      <Row gutter={16} justify="space-around" className="mt-3" style={{ marginRight: "120px" }}>
        <Col span={6}>
          <Card onClick={() => handlePrimaryClick("Internal")} style={getPrimaryCardStyle("Internal")}>
            <h5 style={{ color: primarySelected === "Internal" ? "white" : "black", margin: 0, fontWeight: "500" }}>
              Internal
            </h5>
          </Card>
        </Col>
        <Col span={6}>
          <Card onClick={() => handlePrimaryClick("External")} style={getPrimaryCardStyle("External")}>
            <h5 style={{ color: primarySelected === "External" ? "white" : "black", margin: 0, fontWeight: "500" }}>
              External
            </h5>
          </Card>
        </Col>
      </Row>

      {primarySelected === "Internal" && (
        <Row className="mt-4" style={{ marginLeft: "85px" }}>
          <Col span={5}>
            <Card style={getSecondaryCardStyle("Direct Hiring")} onClick={() => handleSecondaryClick("Direct Hiring")}>
              <h5 style={{ color: secondarySelected === "Direct Hiring" ? "white" : "black", margin: 0, fontWeight: "500" }}>
                Direct Hiring
              </h5>
            </Card>
          </Col>
          <Col span={5}>
            <Card style={getSecondaryCardStyle("Talent Deployment")} onClick={() => handleSecondaryClick("Talent Deployment")}>
              <h5 style={{ color: secondarySelected === "Talent Deployment" ? "white" : "black", margin: 0, fontWeight: "500" }}>
                Talent Deployment
              </h5>
            </Card>
          </Col>
        </Row>
      )}

      {primarySelected === "External" && (
        <Row align={"end"} className="mt-4" style={{ marginRight: "105px" }}>
          <Col span={6}>
            <Card style={getSecondaryCardStyle("External Staffing")} onClick={() => handleSecondaryClick("External Staffing")}>
              <h5 style={{ color: secondarySelected === "External Staffing" ? "white" : "black", margin: 0, fontWeight: "500" }}>
                External Staffing
              </h5>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  
      <Stepper activeStep={activeStep} orientation="vertical" className={c.root}>
        {getSteps().map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <div style={{ marginBottom: "-20px" }}>{step.content}</div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
  
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button type='button' className='btn btn-danger light ms-1 btn-sm'
          onClick={handleCancel}
          style={{
            borderRadius: "10px",
            marginRight: 8
          }}
        >
          Cancel
        </button>
  
        {activeStep > 0 && (
          <Button
            onClick={handleBack}
            style={{
              marginRight: 8,
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white"
            }}
          >
            Back
          </Button>
        )}
  
        {activeStep < getSteps().length - 1 && (
          <Button
            type="primary"
            onClick={handleNext}
            style={{ borderRadius: "10px" }}
          >
            Next
          </Button>
        )}
  
        {activeStep === getSteps().length - 1 && (
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ borderRadius: "10px" }}
          >
            Update
          </Button>
        )}
      </div>
    </Form>
  );
};
 
export default EditDirectHiring;
