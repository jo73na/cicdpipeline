import {  DatePicker, Form, Input, Select, message } from "antd";

import { useEffect, useState } from "react";
import { useContext } from "react";



import Dragger from "antd/es/upload/Dragger";


const BASE = import.meta.env.VITE_BASE;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AssignEmployeePopup = ({ params,handleopenDrawer}) => {
  const [form] = Form.useForm();
  // Custom Variables
  const [salaryType, setsalaryType] = useState("");
  const [hiringtype, sethiringtype] = useState("");
  const [sow, setSow] = useState("");

  const {
    assignSingle,
    handleAssignEmployee,
    projectSingle,
    employeeget,
    employee,
    handlechangeEmployee,
    employeejobdata,
    handlechangeJob,
    clientbillable,
  } = useContext(ClientContext);
  console.log("assign", assignSingle);

  let employeeData = [];
  employee?.map((item) => {
    employeeData.push({
      label: item.firstname + item?.lastname,
      value: item?._id,
    });
  });

  const handleChangeSalary = (e) => {
    setsalaryType(e);
  };

  const props = {
    name: "file",
    multiple: false,

    action: `${BASE}test`,
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
        setSow(info.file.originFileObj);
      }
      if (status === "done") {
        message.success(`${info.file.name} file upload successfull.`);

        setSow(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop() {},
  };

  //  let employeeJobData=[]
  //  employee?.map((item)=>{
  //   employeejobdata.push({
  //     label:item.job_title,
  //     value:item?._id
  //    })
  //  })
  const onSubmit = (values) => {
    console.log("values", values);

    var formdata = new FormData();
    formdata.append(
      "expected_ctc",
      Number(String(values["expected_ctc"])?.replace(/,/g, ""))
    );
    formdata.append("client_id", projectSingle?._id);
    formdata.append("employee_id", values["employee_id"]);
    formdata.append("job_id", values["job_id"]);
    formdata.append("client_billing", values["client_billing"]);
    formdata.append("clientbilling_salarytype",salaryType);
    // formdata.append("project_id", projectSingle?._id);
    formdata.append("expected_Ctc_type", hiringtype);
    formdata.append("endtDate", values["duration"][1]?.$d);
    formdata.append("startDate", values["duration"][0]?.$d);
    formdata.append("sow", sow);
    // let senddata={
    //    ...values,
    //   expected_ctc :Number(String(values["expected_ctc"])?.replace(/,/g, '')),
    //   clientbilling_salarytype:salaryType,
    //   startDate:values["duration"][0]?.$d,
    //   client_id:projectSingle?.client_id,
    //   project_id:projectSingle?._id,
    //   endtDate:values["duration"][1]?.$d,
    //   expected_Ctc_type:hiringtype,

    // }
    handleAssignEmployee(formdata, form, params);
  };

  useEffect(() => {
    employeeget();
  }, []);

  useEffect(() => {
    setsalaryType(clientbillable?.job_id?.salaryType);
    sethiringtype(clientbillable?.salary_type);

    if (clientbillable) {
      const initialValues = {
        client_billing: clientbillable.client_billing,
        expected_ctc: clientbillable.expected_ctc,
        // Add other fields as needed
      };
      form.setFieldsValue(initialValues);
    }
  }, [clientbillable]);

  console.log("salaryType", salaryType);

  return (
    <div>
      <Form layout="vertical" onFinish={onSubmit} form={form}>
        <div className="col_1 col_1_sm m_t_5">
          {/*                    
                    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ name, ...restField }) => (
           <>
           
            <div className='d_f g_10 assign_employee'>
            <Form.Item
                {...restField}
                label="Employee"
                name={[name, 'name']}
                
                rules={[
                  {
                    required: true,
                    message: 'Missing  name',
                  },
                ]}
              >
                <Select placeholder="Select Employee"
                 options={employeeData} />
              </Form.Item>

              <Form.Item
                {...restField}
                label="Job"
                name={[name, 'job_id']}
                
                rules={[
                  {
                    required: true,
                    message: 'Missing  job_id',
                  },
                ]}
              >
                <Select placeholder="Select Job"
                 options={employeeData} />
              </Form.Item>
              <Form.Item
                {...restField}
                label="Client Billing"
                name={[name, 'client_billing']}
                rules={[
                  {
                    required: true,
                    message: 'Missing Duration',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                {...restField}
                label="Duration"
                name={[name, 'duration']}
                rules={[
                  {
                    required: true,
                    message: 'Missing Duration',
                  },
                ]}
              >
                 <RangePicker/>
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </div>
         
          
            </>
          ))}
          <Form.Item>
          <p
           style={{
            cursor: 'pointer'
           }}
           className='c_primary'
            onClick={() => {
              add();
              // setFileList([...fileLists, []]);
            }}
           
          >
               <PlusOutlined />  Add More
            </p>
          </Form.Item>
        </>
      )}
    </Form.List> */}

          <div className="col_2 g_20 col_sm_1 g_5_sm">
            <Form.Item
              label="Employee"
              name="employee_id"
              rules={[
                {
                  required: true,
                  message: "Missing  Employee",
                },
              ]}
            >
              <Select
                placeholder="Select Employee"
                onChange={handlechangeEmployee}
                options={employeeData}
              />
            </Form.Item>

            <Form.Item
              label="Job"
              name="job_id"
              rules={[
                {
                  required: true,
                  message: "Missing  Job",
                },
              ]}
            >
              <Select
                placeholder="Select Job"
                onChange={handlechangeJob}
                options={employeejobdata}
              />
            </Form.Item>
          </div>

          <div className="col_2 g_20">
          {
              clientbillable?.job_id?.job_type == "Contract"  &&
            <Form.Item
              label="Client Billing"
              name="client_billing"
              rules={[
                {
                  required: true,
                  message: "Missing Client Billimg",
                },
              ]}
            >
              {clientbillable?.job_id?.job_type == "Full Time" ? (
                <Input
                  addonAfter={<p className="m_10">LPA</p>}
                  placeholder="1,00,000"
                  type="number"
                />
              ) : (
                <Input
                  type="number"
                  className="salary"
                  placeholder={salaryType == "Per Hour" ? "1,000" : "1,00,000"}
                  addonAfter={
                    <Select
                      defaultValue={salaryType}
                      value={salaryType}
                      style={{ width: 100 }}
                      onChange={handleChangeSalary}
                    >
                      <Option value="Monthly">Monthly</Option>
                      <Option value="Per Hour">Hourly</Option>
                    </Select>
                  }
                />
              )}
            </Form.Item>
}
            <Form.Item
              className=""
              label="ECTC"
              name="expected_ctc"
              rules={[
                { required: true, message: "Expected Salary is required" },
              ]}
              getValueFromEvent={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                return `${parseFloat(numericValue).toLocaleString("en-IN")}`;
              }}
            >
              {clientbillable?.mode_of_hiring !== "Full Time" ? (
                <Input
                  placeholder={hiringtype == "Monthly" ? "1,00,000" : "1,000"}
                  addonAfter={<p className="m_10">{hiringtype}</p>}
                />
              ) : (
                <Input
                  placeholder="1,00,000"
                  addonAfter={<p className="m_10">LPA</p>}
                />
              )}
            </Form.Item>
          </div>
          <div className="col_2 g_20">
            <Form.Item
              label="Duration"
              name="duration"
              rules={[
                {
                  required: true,
                  message: "Missing Duration",
                },
              ]}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item
             label="End Client" name ="end_client">
                <Select
                 options={[{
                   lable:"Keyndral",
                   value:"Keyndral"
                 }]}/>
            </Form.Item>
          </div>
          <div className="col_2 g_20">
            {/* <Form.Item
              label="Duration"
              name="duration"
              rules={[
                {
                  required: true,
                  message: "Missing Duration",
                },
              ]}
            >
              <RangePicker />
            </Form.Item> */}
            <Form.Item label="Attachments (Eg: SOW)" name="sow">
              <Dragger {...props}>
                <p className="ant-upload-hint addcandidate_hint">
                  <span className="browse">+ Upload</span> Support format
                  .PDF,.PNG,.JPG
                </p>
              </Dragger>
            </Form.Item>
          </div>
        </div>

        <div
         className="d_f j_c_f_e">
						<button  className="btn btn-danger btn-sm me-3" onClick={handleopenDrawer}>Cancel</button>

						<button htmlType="submit" className="btn btn-primary btn-sm" >Submit</button>{" "}
					</div>
      </Form>
    </div>
  );
};

export default AssignEmployeePopup;
