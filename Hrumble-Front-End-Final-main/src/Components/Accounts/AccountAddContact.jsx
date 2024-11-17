import { Button, Form, Input, Select } from 'antd'
import React, { useContext, useState } from 'react'
// import SalesandMargettingContext from '../../Providers/SalesandMargetting'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useParams } from 'react-router-dom';
import SalesandMargettingContext from '../../Providers/SalesandMargetting';
import { useEffect } from 'react';

const AccountAddContacts = ({edit}) => {

      const {handleEditaccountContact,contactSingle,buttonloadingcontact,AddContactPopup,handleFinishaccountContact,buttonloadingconatct}=useContext(SalesandMargettingContext)
     const [form]=Form.useForm()
  const [value,setValue]= useState("")
  let params =useParams()
   const onFinsh =(values)=>{
     if(edit){
      let senddata ={
        ...values,
        account_id:params.id,
        phone_no :
        value?.replace("-", "")
      
      }
    handleEditaccountContact(senddata,form,params.id)

     }
     else{
      let senddata ={
        ...values,
        account_id:params.id,
        phone_no :
        value?.replace("-", "")
      
      }
     handleFinishaccountContact(senddata,form,params.id)
     }

 
   }


   const handleChangePhoennumber = (value, data, event, formattedValue) => {
    setValue(formattedValue);
  };


  useEffect(() => {
      if(edit){
          console.log("contactSingle",contactSingle)
         form.setFieldsValue(contactSingle)
      }
  }, [edit,contactSingle])
  

    
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
   
      <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
      <Form.Item label="Job Title" name="title">
            <Input
             placeholder='"Director of Sales","VP or Margetting",etc'/>
        </Form.Item>
      {/* <Form.Item label="Account" name="account_id">
             <Select
              placeholder='Select Account'
              options ={[
                {
                    label:"Example Account",
                    value:"Example Account"
                }
              ]}/>
        </Form.Item> */}
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
      className='d_f j_c_f_e a_i_c g_10'>
                                <button  className="btn btn-danger light ms-1 btn-sm" onClick={AddContactPopup}>Cancel</button>
                                <button htmlType="submit" className="btn btn-primary  btn-sm" loading ={buttonloadingcontact} >Submit</button>

                            </div>
   

     {/* </Card> */}
   </div>
   </Form>
  )
}

export default AccountAddContacts