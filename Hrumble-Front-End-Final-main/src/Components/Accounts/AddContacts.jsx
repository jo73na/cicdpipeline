import { Button, Form, Input, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
// import SalesandMargettingContext from '../../Providers/SalesandMargetting'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SalesandMargettingContext from '../../Providers/SalesandMargetting';


const AddContacts = () => {

      const {selectAccount,AccountSelect,buttonloadingcontact,AddContactPopup,handleFinishcontact,buttonloadingconatct}=useContext(SalesandMargettingContext)
     const [form]=Form.useForm()
  const [value,setValue]= useState("")
   const onFinsh =(values)=>{

     let senddata ={
       ...values,
       phone_no :
       value?.replace("-", "")
     
     }
    handleFinishcontact(senddata,form)
   }


   const handleChangePhoennumber = (value, data, event, formattedValue) => {
    setValue(formattedValue);
  };

    
   const statge =[{
    label:"Cold",
    value:"Cold"
   },
   {
    label:"Approching",
    value:"Approching"
   },
   {
    label:"Replied",
    value:"Replied"
   },
   {
    label:"Interested",
    value:"Interested"
   },
   {
    label:"Not Interested",
    value:"Not Interested"
   },
   {
    label:"Un Responsive",
    value:"Un Responsive"
   },
   {
    label:"Do Not Contact",
    value:"Do Not Contact"
   },
   {
    label:"Bad Data",
    value:"Bad Data"
   },
   {
    label:"Changed Job",
    value:"Changed Job"
   },



]


useEffect(() => {
    AccountSelect()
}, [])

    
  return (
    <Form
    className='m_t_20'
    layout='vertical'
    onFinish={onFinsh}
     form={form}>
   <div>

      <div className='col_2 g_20 col_1_sm g_5_sm'>
      <Form.Item
                     label="First Name"
                     name= "first_name"
                     rules={[
                       { required: true, message: "First Name is Required" },
                     ]}
                   >
                     <Input placeholder='Type the First Name'/>
                   </Form.Item>
                   <Form.Item
                     label="Last Name"
                     name= "last_name"
                     rules={[
                       { required: true, message: "Last Name is Required" },
                     ]}
                   >
                     <Input placeholder='Type the Last Name'/>
                   </Form.Item>
                   {/* <Form.Item
                     label="Email ID"
                     name= "email_id"
                     rules={[
                       { required: true, message: "Email ID is Required" },
                     ]}
                   >
                     <Input type='email'/>
                   </Form.Item> */}
      

      </div>
      <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
        <Form.Item label="Email" name="email_id"
          // rules={[{ required: true, message: "Email is required" }]}
          >
          
          <Input placeholder="Enter Email Address" />
        </Form.Item>

        <Form.Item label="Phone Number" name="phone_no"
          //  rules={[{ required: true, message: "Phone Number is required" }]}
           >
          <PhoneInput
            country={"in"}
            isValid={(value, country) => {
              if (value.match(/12345/)) {
                return console.log(
                  "llll",
                  "Invalid value: " + value + ", " + country.name
                );
              } else if (value.match(/1234/)) {
                return console.log("lll22", false);
              } else {
                return console.log("lll28882", true, value);
              }
            }}
            placeholder="Enter phone number"
            value={value}
            onChange={handleChangePhoennumber}
          />
        </Form.Item>
      </div>
      <div className='col_1  col_1_sm g_5_sm m_t_1'>
      <Form.Item label="Job Title" name="job_title">
            <Input
             placeholder='"Director of Sales","VP or Margetting",etc'/>
        </Form.Item>
      
                   
      

      </div>
      <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
      <Form.Item label="Account" name="account_id">
             <Select
              placeholder='Select Account'
              options ={selectAccount}/>
        </Form.Item>
        <Form.Item label="Contact Stage" name="stage">
        <Select
              placeholder='Select Contact Stage'
               options={statge}/>
       
        </Form.Item>
      
                   
      

      </div>

      <div className='col_1  col_1_sm g_5_sm'>
      <Form.Item
                     label="Linkedin URL"
                     name= "linkedin_url"
                   
                   >          
                     <Input placeholder='Copy & paste their Linkedin URL(e.g. linkedin.com/accountname)'/>
                   </Form.Item>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                   {/* <Form.Item
                     label="Email ID"
                     name= "email_id"
                     rules={[
                       { required: true, message: "Email ID is Required" },
                     ]}
                   >
                     <Input type='email'/>
                   </Form.Item> */}
      

      </div>
      <div className='col_1 g_20 col_1_sm g_5_sm'>
      
                 
      

      </div>
     {/* <Card className="zive-addjob-rating"> */}

   

     <div
       style={{
         margin: "10px",
         display: "flex",
         gap: "10px",
         justifyContent: "flex-end",
       }}
     > 
       <button type="button" className="btn  btn-danger btn-sm" 
        onClick={AddContactPopup}>
         Cancel
       </button>
       <button
        loading={buttonloadingcontact}
        type="primary"  

         className="btn btn-primary btn-sm"
         htmlType="submit"
         // loading={loadingaddbutton}
       >
         Save
       </button>
     </div>

     {/* </Card> */}
   </div>
   </Form>
  )
}

export default AddContacts