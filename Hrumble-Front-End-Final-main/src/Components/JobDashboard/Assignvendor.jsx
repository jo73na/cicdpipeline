import { useContext, useEffect, useState } from 'react';
import { Form, Checkbox, Button, Select, Input, Space, Radio } from 'antd';
import JobContext from '../../Providers/JobProvider';
import { useForm } from 'antd/es/form/Form';
import { Option } from 'antd/es/mentions';

const AssignVendor = ({onCancel}) => {
  const { handleAssignVendorTeam, fetchJob, teams, selectusers, vendorbutton, fetchVendor, handleAssignVendor, vendor, setFilterdata, filterData, handleopenfilter, setPagination, fetchClient, recruiter, clientFilter } = useContext(JobContext);
  const plainOptions = ['opened', 'closed', 'Hold'];

  const [value, setValue] = useState("");
  const [assign, setAssign] = useState("");
  const [salaryType, setSalaryType] = useState("Monthly");
  const defaultCheckedList = ['opened', 'closed'];
  const [form] = useForm();
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  console.log("userssss::", selectusers);

  const handleFinish = (values) => {
    console.log("Form Values:", values);
    let send = {
      ...values,
      vendor_clientbillable: Number(values["vendor_clientbillable"]?.replace(/,/g, '') || ""),
      vendor_salary_type: salaryType,
      name: values["name"]?.replace(/,/g, '') || "",
    };

    const onSuccess = () => {
      console.log("Vendor assigned successfully");
    
      form.resetFields();
      setAssign("");
      setValue("");
     
    };

    // Call the appropriate function based on the selected value
    if (value === "Team") {
      handleAssignVendorTeam(send, form, onSuccess);
    } else {
      handleAssignVendor(send, form, onSuccess);
    }
    if (onCancel) {
      onCancel(); // Close the modal
    }
  };

  useEffect(() => {
    fetchVendor();
    console.log("vendor Check:", fetchVendor);
  }, []);

  const handleCancel = () => {
    form.resetFields();
    setAssign("");
    setValue("");
    if (onCancel) {
      onCancel();
    }
  }

  const handleChangeSalary = (e) => {
    setSalaryType(e);
    form.setFieldsValue({ salaryType: e }); // Set the salaryType in the form
  }

  const handleChangeAssign = (e) => {
    setAssign(e);
  }

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className='m_t_20'>
      <Form
        form={form}
        onFinish={handleFinish}
        layout='vertical'>

        <Form.Item
          label="Assign"
          name="assign_type"
          rules={[
            {
              required: true,
              message: "Please Select Assign!",
            },
          ]}
        >
          <Select placeholder="Select Assign"
            showSearch
            allowClear
            onChange={handleChangeAssign}>
            <Option value="Internal" label="Internal">
              <Space>Internal</Space>
            </Option>
            <Option value="External" label="External">
              <Space>External</Space>
            </Option>
          </Select>
        </Form.Item>

        {
          assign == "Internal" ?
            <>
              <Form.Item
                name="Assign_type"
              >
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={"Internal"}>Assign to Individual</Radio>
                  <Radio value={"Team"}>Assign to team</Radio>
                </Radio.Group>
              </Form.Item>
              {
                value == "Internal" &&
                <Form.Item
                  label="Assign To"
                  name="assign">
                  <Select
                    mode="multiple"
                    options={selectusers}
                  />
                </Form.Item>
              }
              {
                value == "Team" &&
                <Form.Item
                  label="Assign To"
                  name="assign"
                >
                  <Select
                    mode="multiple"
                    options={teams} />
                </Form.Item>
              }
            </>
            : assign == "External" ?
              <>
                <Form.Item
                  label="Assign To"
                  name="assign">
                  <Select
                    placeholder="Select Vendor"
                    allowClear
                    mode='multiple'
                    showSearch
                    options={vendor} />
                </Form.Item>

                <Form.Item label="Budget" name="vendor_clientbillable"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Client Budget!",
                    },
                  ]}
                  getValueFromEvent={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                    return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
                  }}
                >
                  <Input
                    addonBefore={<p className="m_10">₹</p>}
                    
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

                {/* Hidden field to store salaryType */}
                <Form.Item name="salaryType" style={{ display: 'none' }}>
                  <Input value={salaryType} />
                </Form.Item>
              </>
              : ""
        }

        <div className='d_f g_10 j_c_f_e'>
          <button type='button' className='btn btn-danger light ms-1 btn-sm' onClick={handleCancel}>Cancel</button>
          <button type='primary' className='btn-primary btn btn-sm' htmlType='submit' loading={vendorbutton}>Save</button>
        </div>
      </Form>
    </div>
  );
};

export default AssignVendor;