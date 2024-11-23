import { useContext, useEffect, useState } from 'react';
import { Form, Button, Select, Input, Space, Radio, Badge } from 'antd';
import JobContext from '../../Providers/JobProvider';
import { useForm } from 'antd/es/form/Form';
import { Option } from 'antd/es/mentions';

const AssignVendor = ({ onClose }) => {
  const {
    jobSingle,
    handleAssignVendorTeam,
    fetchJob,
    teams,
    selectusers,
    vendorbutton,
    fetchVendor,
    handleAssignVendor,
    vendor,
    handleopenfilter,
  } = useContext(JobContext);

  const [primarySelected, setPrimarySelected] = useState(jobSingle.primarySelected);
  const [secondarySelected, setSecondarySelected] = useState(jobSingle.secondarySelected);
  const [form] = useForm();
  const [value, setValue] = useState("");
  const [salaryType, setSalaryType] = useState("Monthly");
  const [isFormVisible, setIsFormVisible] = useState(true); 

  useEffect(() => {
    fetchVendor();
    console.log("Job Single:", jobSingle); // Log the entire jobSingle object
    setPrimarySelected(jobSingle.primarySelected);
    setSecondarySelected(jobSingle.secondarySelected);
  }, [jobSingle]); // Dependency on jobSingle to update when it changes

  const handleFinish = async (values) => {
    let send = {
      ...values,
      vendor_clientbillable: Number(values["vendor_clientbillable"]?.replace(/,/g, '') || ""),
      vendor_salary_type: salaryType,
      name: values["name"]?.replace(/,/g, '') || "",
    };

    if (value === "Team") {
      await handleAssignVendorTeam(send, form);
      setIsFormVisible(false); // Close the form after successful save
    } else {
      await handleAssignVendor(send, form);
      setIsFormVisible(false); // Close the form after successful save
    }
    onClose();
  };

  const handleJobtypeChange = (e) => {
    setSalaryType(e === "Full Time" ? "LPA" : "Monthly");
  };

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  // Determine if we should show the form fields based on primarySelected
  const isInternal = primarySelected === "Internal";
  const isExternal = primarySelected === "External";

  return (
    <div className='m_t_20'>
      <Form form={form} onFinish={handleFinish} layout='vertical'>
        
        {/* Conditional rendering for badges or select */}
        <Form.Item>
          {primarySelected ? (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
             <Badge count={primarySelected} style={{ backgroundColor: 'rgb(54, 128, 45)', height: "30px", width: "120px",alignContent:"center" }} />
             <Badge count={secondarySelected} style={{ backgroundColor: 'rgb(82, 110, 72)', height: "30px", width: "120px",alignContent:"center" }} />
           </div>
          ) : (
            <Select
              placeholder="Select Assign"
              showSearch
              allowClear
              onChange={(value) => {
                setPrimarySelected(value); // Update primarySelected based on dropdown selection
              }}
            >
              <Option value="Internal">Internal</Option>
              <Option value="External">External</Option>
            </Select>
          )}
        </Form.Item>

        {/* Show the appropriate form fields based on primarySelected */}
        {isInternal && (
          <>
            <Form.Item name="Assign_type">
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={"Internal"}>Assign to Individual</Radio>
                <Radio value={"Team"}>Assign to team</Radio>
              </Radio.Group>
            </Form.Item>
            {value === "Internal" && (
              <Form.Item label="Assign To" name="assign">
                <Select mode="multiple" options={selectusers} />
              </Form.Item>
            )}
            {value === "Team" && (
              <Form.Item label="Assign To" name="assign">
                <Select mode="multiple" options={teams} />
              </Form.Item>
            )}
          </>
        )}

        {isExternal && (
          <>
            <Form.Item label="Assign To" name="assign">
              <Select 
                placeholder="Select Vendor"
                allowClear
                mode='multiple'
                showSearch
                options={vendor}
              />
            </Form.Item>
            <Form.Item label="Budget" name="vendor_clientbillable"
              rules={[{ required: true, message: "Please Enter Budget!" }]}
              getValueFromEvent={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
              }}
            >
              {salaryType === "Full Time" ? (
                <Input
                  addonBefore={<p className="m_10">₹</p>}
                  addonAfter={<p className="m_10">LPA</p>}
                  placeholder="1,00,000"
                />
              ) : (
                <Input
                  className='salary'
                  addonBefore={<p className="m_10">₹</p>}
                  placeholder={salaryType === "Per Hour" ? "1,000" : "1,00,000"}
                  addonAfter={
                    <Select
                      defaultValue={salaryType}
                      style={{ width: 100 }}
                      onChange={handleJobtypeChange}
                    >
                      <Option value="Monthly">Monthly</Option>
                      <Option value="Per Hour">Hourly</Option>
                      <Option value="LPA">LPA</Option>
                    </Select>
                  }
                />
              )}
            </Form.Item>
          </>
        )}

        <div className='d_f g_10 j_c_f_e'>
          <button type='button' className='btn btn-danger light ms-1 btn-sm' onClick={onClose}>Cancel</button>
          <button type='primary' className='btn-primary btn btn-sm' htmlType='submit' loading={vendorbutton}>Save</button>
        </div>
      </Form>
    </div>
  );
};

export default AssignVendor;