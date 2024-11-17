import { useContext} from 'react';


import {  Button, Form, Input, DatePicker, Select } from 'antd';
import LeaveContext from '../../../Providers/Leaves';



const { Option } = Select;




const AddHoliday=({setData,setDrawerVisible})=>{
//  const { memoizedResult,searchjob,job,Loading,handleChangeSearch,openaddjob,setOpenaddjob} = useContext(JobContext);
const [form] = Form.useForm();
 const {AddHoliday}=useContext(LeaveContext)


//Tabs Items



const onFinish = (values) => {
    console.log('Submitted values:', values);
    
    // Add the values to the table data
    // AddHoliday()
    // // Close the drawer
    // setDrawerVisible(false);
  };


//  Pie Chart Start here

//  Pie Chart ends here


 return( 
     <>

      <Form form={form} onFinish={onFinish}>
          <Form.Item name="title" label="Holiday Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker format="YYYY-MM-DD" />
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
          <Button className="btn_cancel" >
            Cancel
          </Button>
          <Button
           type="primary"

            className="btn"
            htmlType="submit"
            // loading={buttonLodaing}
          >
            Save
          </Button>
        </div>
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
          </Form.Item>
        </Form>
    
     


      
        </>
    )
}


export default AddHoliday;