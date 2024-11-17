import React, { useState } from 'react';
import { Card, Button, Table, Drawer, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import { useContext } from 'react';
import LeaveContext from '../../../Providers/Leaves';
import { useEffect } from 'react';


const { Option } = Select;

const HolidayManagement = () => {

 const {AddHoliday,fetchHolidayleaves,holidayleaves}= useContext(LeaveContext)
  // const [data, setData] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const[currentYear,setCurrentYear]=useState(new Date().getFullYear())

const years = Array.from({ length: 21 }, (_, index) => currentYear - 10 + index);

  const columns = [
    {
      title: 'Holiday List',
      dataIndex: 'holidayTitle',
      key: 'holidayTitle',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];
 let data=[]
  holidayleaves?.map((item)=>{
    data.push({
      holidayTitle: item.title,
      Date: moment(item?.StartTime).format(' DD-MM-YYYY'),
      day:item.day,
      description:item.description
    })
  })

  useEffect(() => {
    fetchHolidayleaves()
  }, [])
  

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const onFinish = (values) => {
    console.log('Submitted values:', values);

    const currentDate = new Date(values?.date[0]?.$d);

    // Function to format a date as "YYYY-MM-DD"
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
    
      return `${year}-${month}-${day}`;
    };
    
    // Format the current date
    const currentDateString = formatDate(currentDate);
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);
    
    // Function to format a date as "YYYY-MM-DD"
    const formatDate1 = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
    
      return `${year}-${month}-${day}`;
    };
    
    // Format yesterday's date
    const yesterdayDateString = formatDate1(yesterdayDate);

    const providedStartTime = `${yesterdayDateString}T18:30:00.000Z`;
    const providedEndTime = `${currentDateString}T18:30:00.000Z`;


let senddata={
   ...values,
   StartTime:providedStartTime,
   EndTime:providedEndTime,
}
AddHoliday(senddata)

    // Add the values to the table data
    // setData([...data, values]);
    // // Close the drawer
setDrawerVisible(false);
  };

  return (
    <div>
        <div className='col_3 m_b_5'>
        <Select
                    //  onChange={handleChangeSearch}
                                    defaultValue={currentYear}>
                                    {years.map((year) => (
                                      <Option key={year} value={year}>
                                        {year}
                                      </Option>
                                    ))}
                                    </Select>
        </div>
       <Card title="" extra={<button type="primary" className ="btn btn-primary btn-sm" onClick={showDrawer}> + Add Holiday</button>}>
       <Table dataSource={data} columns={columns} />
     </Card>

      <Drawer
        title="Add Holiday"
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        visible={drawerVisible}
        width={400}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item className='m_t_10' name="title" label="Holiday Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker.RangePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="day" label="Day" rules={[{ required: true }]}>
            <Select>
              <Option value="Monday">Monday</Option>
              <Option value="Tuesday">Tuesday</Option>
              <Option value="Wednesday">Wednesday</Option>
              <Option value="Thursday">Thursday</Option>
              <Option value="Friday">Friday</Option>
              <Option value="Saturday">Saturday</Option>
              <Option value="Sunday">Sunday</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
          <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button  type ="button" className="btn btn-danger btn-sm"
           onClick={onCloseDrawer} >
            Cancel
          </button>
          <button
           type="primary"

            className="btn btn-primary btn-sm"
            htmlType="submit"
            // loading={buttonLodaing}
          >
            Save
          </button>
        </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default HolidayManagement;
