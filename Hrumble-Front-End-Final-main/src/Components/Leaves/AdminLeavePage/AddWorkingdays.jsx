import React, { useContext, useState } from 'react';
import { Table, Input, InputNumber, Form ,Select,} from 'antd';
import LeaveContext from '../../../Providers/Leaves';
import { useEffect } from 'react';

const { Option } = Select;


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {

    // const handleInputChange = (value, dataIndex) => {
    //     // const { form, record } = restProps;
    //     // Update 'Working Hours' based on the entered 'Working Days' value
    //     if (dataIndex === 'workingDays') {
    //       const workingHours = value * 8;
    //       form.setFieldsValue({
    //         workingHours,
    //       });
    //     }
    
    //     // Call the original onChange function if available
    //     if (restProps.onChange) {
    //       restProps.onChange(value);
    //     }
    //   };
  const inputNode =
    inputType === 'number' ? <InputNumber  /> : <Input />;
   
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AddWorkingDays = ({setCurrentYear,currentYear}) => {

  const dataSource = Array.from({ length: 12 }, (_, index) => ({
    key: index + 1,
    month: new Date(2023, index, 1).toLocaleString('en-us', { month: 'long' }),
    workingDays: 0,
  }));
  const [form] = Form.useForm();
  const {Leave,AddworkingDays}=useContext(LeaveContext)
  console.log("leave",Leave)
  const [data, setData] = useState(Leave?.length>0? Leave.workingDays:dataSource);
  const [editingKey, setEditingKey] = useState('');


const years = Array.from({ length: 21 }, (_, index) => currentYear - 10 + index);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      month: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      // Calculate and update 'Working Hours' based on the input 'Working Days'
      row.workingHours = row.workingDays * 8;

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        console.log(newData);
        AddworkingDays({year:currentYear,workingDays:newData});
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }

      // Update 'Working Hours' state
    //   setWorkingHours(newData.map((item) => item.workingHours));
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // ... (remaining code)

  const getTableData = () => {
    const tableData = form.getFieldsValue();
    console.log('Table Data:', data);
  };

  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Working Days',
      dataIndex: 'workingDays',
      key: 'workingDays',
      editable: true,
    },
    {
        title: 'Working Hours',
        dataIndex: 'workingHours',
        key: 'workingHours',
      },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <a onClick={cancel}>Cancel</a>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'workingDays' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


useEffect(() => {
   if(Leave){
     setData(Leave.workingDays)
   }
   else{
    setData(dataSource)

   }
}, [Leave])

  return (
   <>
   
   <div className='col_3'>
                     <Form.Item>
                     <Select
                    //  onChange={handleChangeSearch}
                                    defaultValue={currentYear}>
                                    {years.map((year) => (
                                      <Option key={year} value={year}>
                                        {year}
                                      </Option>
                                    ))}
                                    </Select>
                     </Form.Item>
                </div>
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
      {/* <Button type="primary" onClick={getTableData}>
        Get Table Data
      </Button>  */}
    </Form>
   </>
  );
};



export default AddWorkingDays;
