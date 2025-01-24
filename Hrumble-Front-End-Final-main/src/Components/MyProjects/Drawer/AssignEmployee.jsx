import React, { useEffect, useState, useContext } from 'react';
import { Form, Input, Row, Col, Button, InputNumber, Select, DatePicker, Table, Space, Modal, Upload, Cascader,} from 'antd';
import { UserPlus, Trash2, Plus, FolderOutput } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import ImportEmployee from './ImportEmployee';
import EmployeeContext from '../../../Providers/EmployeeProvider';
import ClientContext from '../../../Providers/ClientProvider';
import CookieUtil from '../../../Utils/Cookies';
import { UploadOutlined,  SettingOutlined } from '@ant-design/icons';

const BASE = import.meta.env.VITE_BASE;

const { RangePicker } = DatePicker;
const { Option } = Select;

const AssignEmployee = ({ projectDetails }) => {
  const [form] = Form.useForm();
  const [employeeRows, setEmployeeRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [billingType, setBillingType] = useState('Monthly');
  const [fileList, setFileList] = useState([]); // Track file list for SOW upload
  const { fetchEmployFull, employeeLogindata, FetchEmployeeTable } = useContext(EmployeeContext);
  const { handleAddProject, handleAssignEmployees } = useContext(ClientContext);
  const adminId = CookieUtil.get('admin_id');

  console.log("projectDetail",projectDetails)
  console.log("fileList", fileList);
  useEffect(() => {
    if (projectDetails) {
      form.setFieldsValue({
        employeesNeeded: projectDetails.employees_needed,
        employeesAssigned: projectDetails.assignedEmployees.length

      });
    }
  }, [projectDetails, form]);

  useEffect(() => {
    FetchEmployeeTable();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddEmployee = () => {
    setEmployeeRows([...employeeRows, {
      key: Date.now(),
      employee: undefined,
      duration: undefined,
      clientBilling: { amount: 0, billingType: 'monthly', currency: 'USD' },
    }]);
  };

  const handleDeleteEmployee = (key) => {
    setEmployeeRows(employeeRows.filter(row => row.key !== key));
  };

  const handleDateRangeChange = (index, dates) => {
    if (dates && dates[0] && dates[1]) {
      const newRows = [...employeeRows];
      newRows[index].duration = {
        startDate: dates[0],
        endDate: dates[1],
        days: differenceInDays(dates[1].toDate(), dates[0].toDate()) + 1
      };
      setEmployeeRows(newRows);
    }
  };

  const handleBillingChange = (index, value, field) => {
    const newRows = [...employeeRows];
    newRows[index].clientBilling[field] = value;
    setEmployeeRows(newRows);
  };

  const handleSowUpload = (info) => {
    if (info.file.status === 'done') {
      const fileUrl = info.file.response.url; // Assume server returns the file URL
      const newRows = [...employeeRows];
      newRows[info.file.uid].sow = fileUrl;
      setEmployeeRows(newRows);
    }
  };

  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'employee',
      key: 'employee',
      render: (_, record, index) => (
        <Select
          showSearch
          placeholder="Select employee"
          style={{ width: '100%' }}
          onChange={(value, option) => {
            const newRows = [...employeeRows];
            newRows[index].employee = {
              employee_id: option.key,
              name: value
            };
            setEmployeeRows(newRows);
          }}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {employeeLogindata.map(emp => (
            <Select.Option key={emp._id} value={`${emp.firstname} ${emp.lastname}`}>
              {emp.firstname} {emp.lastname}
            </Select.Option>
          ))}
        </Select>
      )
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (_, record, index) => (
        <RangePicker
          onChange={(dates) => handleDateRangeChange(index, dates)}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'days',
      render: (_, record) => (
        <span>{record.duration?.days || 0} days</span>
      )
    },
    {
      title: 'Client Billing',
      dataIndex: 'client_billing',
      key: 'client_billing',
      render: (_, record, index) => {
        // Get the currency symbol dynamically based on the projectDetails.currency
        const currencySymbol =
          projectDetails.client_id.currency === 'USD'
            ? '$'
            : projectDetails.client_id.currency === 'INR'
            ? '₹'
            : '';

        return (
          <Form.Item
            name="clientBilling"
            rules={[{ required: true, message: 'Please enter client billing!' }]}
          >
            <Input
              addonBefore={
                <Select
                  defaultValue={projectDetails.client_id.currency || 'USD'}
                  style={{
                    width: 60,
                  }}
                >
                  <Option value="USD">{currencySymbol}</Option>
                  <Option value="INR">{currencySymbol}</Option>
                </Select>
              }
              addonAfter={
                <Select
                  defaultValue={billingType}
                  style={{
                    width: 60,
                  }}
                  onChange={(value) => setBillingType(value)}
                >
                  <Option value="Monthly">Monthly</Option>
                  <Option value="Hourly">Hourly</Option>
                </Select>
              }
              placeholder="Enter amount"
              onChange={(e) => handleBillingChange(index, e.target.value, 'amount')}
            />
          </Form.Item>
        );
      },
    },
    {
      title: 'SOW',
      dataIndex: 'sow',
      key: 'sow',
      render: (_, record, index) => (
        <Form.Item
          name="upload"
          // label="Upload"
          valuePropName="fileList"
          // extra="Upload the SOW file"
        >
          <Upload
            name="file"
            action={`${BASE}test`} 
            fileList={fileList}
            onChange={handleSowUpload}
            customRequest={() => {}}
            onRemove={(file) => {
              setFileList(prevFileList => Array.isArray(prevFileList) ? prevFileList : []);
            }}
            listType="picture"
          >
            <Button icon={<UploadOutlined size={18}/>}>Upload</Button>
          </Upload>
        </Form.Item>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          icon={<Trash2 className="h-5 w-5 text-red-500" size={18} />}
          onClick={() => handleDeleteEmployee(record.key)}
        />
      )
    }
  ];

  const onFinish = (values) => {
    const currentDateTime = new Date().toISOString();

    const formData = {
      projectId: projectDetails._id,
      employees: employeeRows.map((row) => ({
        employee_id: row.employee.employee_id,
        name: row.employee.name,
        duration: row.duration,
        clientBilling: row.clientBilling,
        assignedBy: adminId,
        assignedAt: currentDateTime,
        sow: row.sow, // Include the SOW URL here
      })),
    };

    console.log('Form submitted:', formData);
    handleAssignEmployees(formData);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="p-4"
      >
        <Row gutter={16} align="middle" className="mb-4">
          <Col>
            <UserPlus className="h-6 w-6 text-blue-500" />
          </Col>
          <Col>
            <h2>Assign Employees</h2>
          </Col>
        </Row>

        <Row gutter={16} className="mb-4">
          <Col span={6}>
            <Form.Item
              label="No. of Employees Needed"
              name="employeesNeeded"
            >
              <InputNumber min={0} className="employeeForm" disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="No. of Employees Assigned"
              name="employeesAssigned"
            >
              <InputNumber min={0} className="employeeForm" disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <FolderOutput style={{ marginTop: "58px", marginLeft: "100px" }} onClick={showModal} />
          </Col>
        </Row>

        <Row gutter={16} className="mb-4">
          <Col span={24}>
            <div className="mb-2">
              <Button
                type="dashed"
                onClick={handleAddEmployee}
                icon={<Plus className="h-4 w-4" />}
              >
                Add Employee
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={employeeRows}
              pagination={false}
              className="mb-4"
            />
          </Col>
        </Row>

        <Row justify="end">
          <Space>
            <Button onClick={() => {
              form.resetFields();
              setEmployeeRows([]);
            }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Row>
      </Form>

      <Modal
        title="Import Data"
        open={isModalOpen}
        onCancel={handleCancel}
        width={700}
        footer={null}
      >
        <ImportEmployee />
      </Modal>
    </>
  );
};

export default AssignEmployee;
