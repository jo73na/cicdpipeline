
import { Button, Switch,Checkbox,Form,notification, Divider, Input, Select } from 'antd'
import React,{useContext, useEffect, useState} from 'react'
import { FromCheckBoxGroup } from './Form';
import UserManagementContext from '../../Providers/UserMangement';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';



const AddDepartment = ({input}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [formUpdate] = Form.useForm();
  const {rollSingle,handleAddRole,RollList}=useContext(UserManagementContext)
 const navigate=useNavigate()
 console.log("roleSingle",rollSingle)


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };





//   formUpdate.setFieldsValue(rollSingle)

   let accessList= [
    {
      module:"Employee",
      permissions:[
        "View All Employees",
        "Edit Employee Details",
        "Delete Employee Record"

      ]
    },
    {
      module:"Clients",
      permissions:[
        "Add Client",
        "Add Project",
        "Assign Employee"

      ]
    },
    {
      module:"Jobs",
      permissions:[
        "Create Job",
        "Add Candidate",
        "View Job Detail",
        "Update Status",
        "View Candidate Info",
        "DownloadCandidate",
        "View Profit",

      ]
    },
    {
      module:"Candidates",
      permissions:[
        "viewCandidate" ],
      icon:"UserManageMentLogo",
    },
    {
      module:"Timesheet",
      permissions:[
        "View Timesheet",
        "Add Log Hours",
        "View Reports",
       

      ]
    },
    {
      module:"Leaves",
      permissions:[
        "New Requests",
        "Leaves History",
        "Approval Status",
        "Leave Management",
        "View Candidate Info"
       

      ]
    },
    {
      module:"Accounts",
      permissions:[
        "Add Invoice" ,
        "Record Payment",
        "Add Expense",
       
       

      ]
    },
    {
      module:"Reports",
      permissions:[
        "Invoice Summary",
        "Expense Summary",
        "Payment Summary",
        "Profit vs Loss"
       
       

      ]
    },
    {
      module:"FileManager",
      permissions:[
        "Employee Documents",
        "Accounts",
        "Timesheet",
        "SOW"
       
       

      ]
    },
    {
      module:"UserSettings",
      permissions:[
        "OnBoarding"]
    },
    {
      module:"UserManagement",
      permissions:[
        "Add Employee",
        "Create New Role",
        "Assign User"

      ]
    }
  ]

    const data = [
      { "1.4 Delete Employee Record": true, "1.3 Edit Employee Details": false, "1.1 View All Employees": true },
      { "1.4 Delete Employee Record": true, "1.1 View All Employees": true, "1.3 Edit Employee Details": true }
    ];
    
    // Extract keys with true values
    const trueKeysArray = data.map(obj =>
      Object.keys(obj).filter(key => obj[key] === true)
    );
    
    console.log("truekeys",trueKeysArray)
    const [switchValues, setSwitchValues] = useState([]);

    // Function to handle switch changes
    const handleSwitchChange = (e, permission, moduleIndex) => {
      const updatedSwitchValues = [...switchValues]; // Create a copy of the state array
    
      // If the module object doesn't exist in the copy, create it
      if (!updatedSwitchValues[moduleIndex]) {
        updatedSwitchValues[moduleIndex] = {
          [permission]: e.target, // Create the permission key with its value
        };
      } else {
        updatedSwitchValues[moduleIndex] = {
          ...updatedSwitchValues[moduleIndex], // Copy the existing module object
          [permission]: e, // Update the specific permission value
        };
      }
    
      setSwitchValues(updatedSwitchValues); // Update the state with the new array
    };

   
    
    console.log("switchvalues",switchValues)

//   useEffect(() => {
//     formUpdate.setFieldsValue(
//       rollSingle
//     )
//   }, [rollSingle])
//    const onFinish=(values)=>{
//       let data={
//         ...values,
//         name:roleSingle?.name
//       }
//       api.update(dispatch,[start,success,failure,"crudupdate"],"roles",roleSingle?._id,data,(err,res)=>{
//         if(res){
//           api.getSingle(dispatch,[start,success,failure,"roleSingle"],"roles",roleSingle?._id,(err,res)=>{

//           })  
          
   
//          notification.success({
//              message: res?.data?.message,
//              duration:1,
//            });
       
//       }
        
//      })

//    }

 const onFinish=(values)=>{
     
    handleAddRole(values)
    navigate(-1)

 }
 const options =[]
  console.log("ffffffroleist",RollList)
  RollList?.map((item)=>{
  options.push({
    label:item?.name,
    value :item._id
  })})
  
  return (
   <>
     <p className='heading_text'><LeftOutlined className='back' onClick={()=>navigate(-1)}/>Add Department</p>
     
     <div className='zive-usermanagement-default'>
       <Form
                form={formUpdate}
                onFinish={onFinish}
                
                  layout="vertical"
                 className=""
               >
               <div className='col_4 g_20  m_t_20 m_l_20'>
               <Form.Item label="Role" name="parent_id">
                  <Select placeholder='Select parent'
                     options={options}
                  />
               </Form.Item>
               <Form.Item label="Department Name" name="name">
                  <Input placeholder='Enter Name'/>
               </Form.Item> 
               </div>
               {accessList?.map((item, index) => {
                   return (
                     
                     <div key={index} className="col_1 user_management "
                      style={{
                         marginTop:"-30px"
                      }}>
                        <Divider />
                       <div className='col_2'>
                       <h3 className='usermanagement_h3' style={{
                          padding:"30px"
                       }}>{item?.module}</h3>
                       <FromCheckBoxGroup
                         
                         name={item.module}
                         options={item?.permissions?.map((o) => ({
                           label: o,
                           value: o,
                         }))}
                       />
                       </div>
                       
                     </div>
                   );
                 })}
 
 
                
                
                
 <div style={{
                   margin: "10px",
                   display: "flex",
                   gap:"10px",
                   justifyContent: "flex-end"
             }}>
 
             <Button className="btn_cancel">Cancel</Button>
                 <Button className="btn" htmlType="submit">Save</Button>
 
             </div>
    
   
 
           
 
               </Form>
        
       
      
       
 
        {/* <label>1. Employees</label>
       <label><Switch defaultChecked /> Yes</label>
       <div>
       <label>1.1 View All Employees <Switch  value="1.1 View All Employees"/> Yes</label> 
       <label>1.1 View All Employees <Switch defaultChecked /> Yes</label>
       <label>1.1 View All Employees <Switch defaultChecked /> Yes</label>
       <label>1.1 View All Employees <Switch defaultChecked /> Yes</label>
       </div>  */}
      
 {/*    
     <div className='col_3'>
 
    
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>1.3 Edit Employee Details</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>1.4 Delete Employee Record</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4 m_t_40'>
       <label>2. Clients</label>
       <label><Switch defaultChecked /> Yes</label>
       <label>2.1 Add Client</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>2.2 Add Project</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>2.3 Assign Employee</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4 m_t_40'>
       <label>3. Jobs</label>
       <label><Switch defaultChecked /> Yes</label>
       <label>3.1 Create Job</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>3.2 Add Candidate</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>3.3 View Job Detail</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>3.4 Update Status</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>3.5 View Candidate Info</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4 m_t_40'>
       <label>4. Timesheet</label>
       <label><Switch defaultChecked /> Yes</label>
       <label>4.1 View Timesheet</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>4.2 Add Log Hours</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>4.3 View Reports</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4 m_t_40'>
       <label>5. Leaves</label>
       <label><Switch defaultChecked /> Yes</label>
       <label>5.1 New Requests</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>5.2 Leaves History</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>5.3 Approval Status</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>5.4 Leave Management</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>5.5 View Candidate Info</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4 m_t_20'>
       <label>6. Accounts</label>
       <label><Switch defaultChecked /> Yes</label>
       <label>6.1 Add Invoice</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>6.2 Record Payment</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>6.3 Add Expense</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4 m_t_40'>
       <label>7. Reports</label>
       <label><Switch defaultChecked /> Yes</label>
       <label>7.1 Invoice Summary</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>7.2 Expense Summary</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>7.3 Payment Summary</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>7.4 Profit vs Loss</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4 m_t_40'>
       <label>8. File Manager</label>
       <label><Switch defaultChecked /> Yes</label>
       <label>8.1 Employee Documents</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>8.2 Accounts</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>8.3 Timesheet</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>8.4 SOW</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4 m_t_40'>
       <label>9. User Management</label>
       <label><Switch defaultChecked /> Yes</label>
       <label>9.1 Add Employee</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>9.2 Create New Role</label>
       <label><Switch defaultChecked /> Yes</label>
     </div>
     <div className='col_4'>
       <label> </label>
       <label> </label>
       <label>9.3 Assign User</label>
       <label><Switch defaultChecked /> Yes</label>
     </div> */}
     <div className='d-flex zive-usermanagement-default-btn m_t_40'>
     {/* <Button className='zive-btn-cancel'>Cancel</Button> */}
    
     </div>
   </div></>
    // <div className='zive-usermanagement-default'>
    //     <div className='zive-usermanagement-default m_t_20'>
    //         <label>Set Default Permissions</label>
    //     </div>
    //     <div className='col_4 m_t_20'>
    //         <label>1. Employees</label>
    //         <label><Switch defaultChecked /> Yes</label>
    //         <label>1.1 View All Employees</label>
    //         <label><Switch defaultChecked /> Yes</label>
    //     </div>
    //     <div className='col_4'>
    //         <label></label>
    //         <label></label>
    //         <label>1.2 Add Employees</label>
    //         <label><Switch defaultChecked /> Yes</label>
    //     </div>
    //     <div className='col_4'>
    //         <label></label>
    //         <label></label>
    //         <label>1.3 Edit Employee Details</label>
    //         <label><Switch defaultChecked /> Yes</label>
    //     </div>
    //     <div className='col_4 m_t_40'>
    //         <label>2. Clients</label>
    //         <label><Switch defaultChecked /> Yes</label>
    //         <label>2.1 Add Client</label>
    //         <label><Switch defaultChecked /> Yes</label>
    //     </div>
    //     <div className='col_4'>
    //         <label></label>
    //         <label></label>
    //         <label>2.2 Add Project</label>
    //         <label><Switch defaultChecked /> Yes</label>
    //     </div>
    //     <div className='col_4 m_t_40'>
    //         <label>3. Invoices</label>
    //         <label><Switch defaultChecked /> Yes</label>
    //         <label>3.1 Add Invoice</label>
    //         <label><Switch defaultChecked /> Yes</label>
    //     </div>
    //     <div className='col_4'>
    //         <label></label>
    //         <label></label>
    //         <label>3.2 View Invoices</label>
    //         <label><Switch defaultChecked /> Yes</label>
    //     </div>
    //     <div className='d-flex zive-usermanagement-default-btn m_t_40'>
    //     <Button className='zive-btn-cancel' >Cancel</Button>
    //     <Button className='zive-btn-save'>Save Changes</Button>
    //     </div>
    // </div>
  )
}
export default AddDepartment
