import {  DatePicker, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useContext } from "react";


import dayjs from "dayjs";
import Dragger from "antd/es/upload/Dragger";

import Loader from "../../Utils/Loader";




const { RangePicker } = DatePicker;
const { Option } = Select;

const AssignEmployeeEditPopup = ({ params,handleopenDrawerEdit }) => {
  const [sow, setSow] = useState("");

  const [form] = Form.useForm();
  // Custom Variables
  const [salaryType, setsalaryType] = useState("");
  const [hiringtype, sethiringtype] = useState("");

  const {
    assignLoading,
    assignSingle,
    handleAssignEmployeeEdit,
    projectSingle,
    employeeget,
    employee,
    handlechangeEmployee,
    employeejobdata,
    handlechangeJob,
    clientbillable,
  } = useContext(ClientContext);
   console.log("asss",assignSingle)

  let employeeData = [];
  employee?.map((item) => {
    employeeData.push({
      label: item.firstname + item?.lastname,
      value: item?._id,
    });
  });

  let defaultFileList = [
    {
      uid: "1",
      name: assignSingle?.sow,
      status: "done", // Set the status to 'done' for default files
      url: `https://apiv1.technoladders.com/${assignSingle?.sow}`, // Set the URL of the default file
    },
  ];

  const props = {
    name: "file",
    multiple: false,
    ...(assignSingle?.sow && { defaultFileList }),
    action: `https://apiv1.technoladders.com/test`,
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
        setSow(info.file.originFileObj);
      }
      if (status === "done") {
        setSow(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop() {},
  };

  const handleChangeSalary = (e) => {
    setsalaryType(e);
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
    formdata.append("project_id", projectSingle?._id);
    formdata.append("expected_Ctc_type", hiringtype);
    formdata.append("sow", sow);

    // let senddata={
    //    ...values,
    //   expected_ctc :Number(String(values["expected_ctc"])?.replace(/,/g, '')),
    //   clientbilling_salarytype:salaryType,
    //   // startDate:values["duration"][0]?.$d,
    //   client_id:projectSingle?.client_id,
    //   project_id:projectSingle?._id,
    //   // endtDate:values["duration"][1]?.$d,
    //   expected_Ctc_type:hiringtype,

    // }

    handleAssignEmployeeEdit(formdata, form, params);
  };

  useEffect(() => {
    employeeget();
  }, []);

  useEffect(() => {
    console.log("llllljjjjjj", clientbillable);
    setsalaryType(clientbillable?.job_id?.salaryType);
    sethiringtype(clientbillable?.salary_type);

    // if (clientbillable) {
    //   const initialValues = {
    //     client_billing: clientbillable.client_billing,
    //     expected_ctc: clientbillable.expected_ctc,
    //     // Add other fields as needed
    //   };
    //   form.setFieldsValue(initialValues);
    // }
  }, [clientbillable]);

  useEffect(() => {
    if (assignSingle) {
      form.resetFields();

      handlechangeEmployee(assignSingle.employee_id);
      handlechangeJob(assignSingle.job_id, assignSingle.employee_id);
      form.setFieldsValue({
        ...assignSingle,
        duration: [dayjs(assignSingle.startDate), dayjs(assignSingle.endDate)],
      });
    }
  }, [assignSingle]);

  console.log("salaryType", salaryType);

  return assignLoading ? (
    <Loader />
  ) : (
    <div>
      <Form layout="vertical" onFinish={onSubmit} form={form}>
        <div className="col_1 col_1_sm m_t_5">
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
                  message: "Missing  Employee",
                },
              ]}
            >
              <Select
                placeholder="Select Employee"
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
                  message: "Missing Duration",
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
						<button  className="btn btn-danger btn-sm me-3" onClick={handleopenDrawerEdit} >Cancel</button>

						<button className="btn btn-primary btn-sm" htmlType="submit" >Submit</button>{" "}
					</div>
      </Form>
    </div>
  );
};

export default AssignEmployeeEditPopup;
