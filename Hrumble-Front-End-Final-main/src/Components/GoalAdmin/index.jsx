import  { useState } from 'react';
import { Table, Button, Drawer, Form, Input, DatePicker, Select } from 'antd';
import { useEffect } from 'react';
import LeaveContext from '../../Providers/Leaves';
import { useContext } from 'react';
import moment from 'moment';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';



const {Search}=Input
const GoalAdmin = () => {
  const {fetchavailableLeaves,totalleaves,Addleaverequest,fetchrequestleaves,requestleaves}=useContext(LeaveContext)
  // const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: 'Goal Name', dataIndex: 'goal_name', key: 'goal_name' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    { title: 'No. of Days', dataIndex: 'numberOfDays', key: 'numberOfDays' },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Approved by', dataIndex: 'approvedBy', key: 'approvedBy' },
  ];

  const data=[]
  requestleaves?.map((item,i)=>{
    data.push({
      key:i+1,
      leaveTitle:item?.leave_id?.leave_title,
      startDate:moment(item?.startDate).format(' DD-MM-YYYY'),
      endDate:moment(item?.endDate).format(' DD-MM-YYYY'),
      numberOfDays:item.no_of_days,
      reason:item?.reason,
      approvedBy:item.approved_by? item?.approved_by?.name:"-",
      status:item.status,   
      action:item._id,

    })
  })


  const leavedata=[]
  totalleaves?.map((item)=>{
    leavedata.push({
    label:item.leave_title,
    value:item._id
    })
  })

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {

    const timeDifference = values?.endDate?.$d?.getTime() - values?.startDate?.$d?.getTime();

// Convert milliseconds to days
const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
console.log('daysDifference',daysDifference)

let senddata={
  ...values,
   no_of_days: parseInt(daysDifference < 1? 1: daysDifference),
   endDate:  values?.endDate?.$d,
   startDate:  values?.startDate?.$d
}
   Addleaverequest(senddata)
  
    form.resetFields();
    onClose();
  };

  useEffect(() => {
  
   fetchavailableLeaves()
   fetchrequestleaves()
   
  }, [])
  

  return (
    <div>

<p className='heading_text'>Goals</p>

<div
className='d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm'>
<Search className="input_search" allowClear placeholder="Search by Goal " enterButton 
   />
 <div className='d_f a_i_c'>
 <Button type="primary" className='btn create_btn' onClick={showDrawer} style={{ marginBottom: '16px' }}>
        + Add Goal
      </Button>
 {/* <Button type='primary' className='btn create_btn' onClick={handleopenDrawerJob}></Button> */}
 </div>
</div> 
    
      <Table dataSource={data} columns={columns} />

      <Drawer
        title="Add Goal"
        width={600}
        onClose={onClose}
        visible={visible}                                       
        bodyStyle={{ paddingBottom: 80 }}
        
      >
        <Form form={form} layout="vertical" onFinish={onFinish} className='applay_leave'>
         <div className='col_2 m_t_20'>
         <Form.Item
          
            name="goal_name" 
            label="Goal  Name"
            rules={[{ required: true, message: 'Please enter Leave Title' }]}
          >
      
               <Input placeholder='Goal Name'/>
             
         
          </Form.Item>
         </div>

         <div className='col_1 g_20'>
         <Form.List name="candidateskills"
          >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name }) => (
                <>
                   <div className="lable_center">
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap:"20px",
                      marginTop: "-12px"
                    
                      

                      
                    }}
                  >
                    <div className="input_skill">
                      <Form.Item
                        label="Select Goal Type"
                        name={[name, "goal type"]}
                        rules={[
                          { required: true, message: "Goal Type is required" },
                        ]}
                      >
                       <Select
                        placeholder="Select Goal Type"
                        style={{
                            width:"280px"
                        }}
                        options={[{
                             label:"Submissions",
                             value:"Submissions"
                        },
                        {
                            label:"Selections",
                            value:"Selections"
                       },
                       {
                        label:"Onboard",
                        value:"Onboard"
                   },
                   {
                    label:"Revenue",
                    value:"Revenue"
               },  
                   
                    
                    
                    
                    ]}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item label="Target">
                        <Input
                         placeholder='Enter Target'
                          style={{
                            width:"200px"
                        }}/>
                      </Form.Item>
                    </div>

                 
                    <DeleteOutlined style={{marginTop:"0px"}} onClick={() => remove(name)} />
                  </div>
                </div>
               
                </>
             
              ))}
              
                
                 <p className='c_primary'
                  style={{
                    cursor:"pointer",
                    marginTop:"-30px"
                  }}
                  onClick={()=>add()}>  + Add Another Goal Type</p> 
               
               
                
            </>
          )}
        </Form.List>
        </div>
        <div
         className='col_2 g_20'>
        <Form.Item
            name="assign_goal"
            label="Assign To"
            rules={[{ required: true, message: 'Please select Assign ' }]}
          >
            <Select
             placeholder="Please Select Team member"/>
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            // rules={[{ required: true, message: 'Please select Assign ' }]}
          >
            <Select
             placeholder="Please Select Team member"/>
          </Form.Item>  
        </div>

          {/* <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select Start Date' }]}
          >
            <DatePicker />
          </Form.Item> 

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select End Date' }]}
          >
            <DatePicker />
          </Form.Item>
         </div>

          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: 'Please enter Reason' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item> */}

          <Form.Item>
          <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button className="btn_cancel"
          onClick={onClose} >
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
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default GoalAdmin;
