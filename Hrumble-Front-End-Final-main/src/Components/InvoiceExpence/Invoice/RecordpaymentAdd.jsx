import  { useState } from 'react'
import {  Button,  DatePicker,  Form, Input,  Radio,  Select,  message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useEffect } from 'react';
import { useContext } from 'react';
import InvoiceExpenceContext from '../../../Providers/InvoiceExpence';

const RecordPaymentAdd = ({handleDrawerClose}) => {
    const [form] = Form.useForm();
    const [radio,setRadio]=useState("Salary")
     const {invoiceSingle}=useContext(InvoiceExpenceContext)
    const {RecordPaymentAddemployee,addexpensebutton,handleSendRecordPayment}=useContext(InvoiceExpenceContext)

   

      const handleFinish =(values)=>{
        handleSendRecordPayment(values)
    }
      useEffect(() => {
         form.setFieldsValue({
          client_id:invoiceSingle?.client_id?.name,
          amount_billed:invoiceSingle?.total_amount,
          

         })
        //   fetchRecordPaymentAddinit()
      }, [])

       const handlChangeRadio =(e)=>{
          setRadio(e.target.value)
       }

       
      
  return (
    <Form form={form} onFinish={handleFinish}
    layout='vertical'>
     <div className='col_2 g_20 col_1_sm g_5_sm m_t_20'>
     <Form.Item
           
       name="client_id"
       label="Customer Name"
     
     >
       <Input/>
     </Form.Item>
     <Form.Item
       name="received_amount"
       label="Payments Received"
     
     >
       <Input/>
     </Form.Item>
  
     </div>
     <div className='col_2  g_20 col_1_sm g_5_sm expence_picker'>
    <Form.Item
       name="amount_billed"
       label="Amount Billed (₹)"
       rules={[{ required: true, message: 'Please enter Amount Billed ' }]}
     >
       <Input  placeholder='3,36,000.00' />
     </Form.Item>
   
     </div>
     <div className='col_2 m_t_1 g_20 col_1_sm g_5_sm'>
        <div>Amount Received (₹)</div>
        <Form.Item
         label=""
         name ="received_amount">
        <Input
          placeholder='0.00'/>
        </Form.Item>

    

     
     </div>
     <div className='col_2 m_t_1 g_20 col_1_sm g_5_sm'>
        <div>Bank Charges (If any) (₹)</div>
        <Form.Item
         name ="bank_charges">
             <Input
          placeholder='0.00'/>
        </Form.Item>

    

     
     </div>
     {/* <div className='col_2 m_t_1 g_20 col_1_sm g_5_sm'>
        <div>Tax Deducted</div>
        <Form.Item
       name="expense_type"
       label="Expense Type"
       rules={[{ required: true, message: 'Please select Expense Type' }]}
     >
       <Radio.Group
        onChange ={handlChangeRadio}>
         <Radio value="Salary">Salary</Radio>
         <Radio value="Others">Others</Radio>
       </Radio.Group>
     </Form.Item>

    

     
     </div> */}
     <div className='col_2  g_20 col_1_sm g_5_sm expence_picker'>
    <Form.Item
       name="exchange_rate"
       label="Exchange Rate"
       rules={[{ required: true, message: 'Please enter Exchange Rate ' }]}
     >
       <Input  placeholder='0.00' />
     </Form.Item>
   
     </div>
     <div className='col_2 m_t_1 g_20 col_1_sm g_5_sm'>
        <div>Invoice Amount Receivable in INR (₹)</div>
        <Form.Item
         label=""
         name ="total_amount">
        <Input
          placeholder='0.00'/>
        </Form.Item>

    

     
     </div>
     <div className='col_2 g_20 col_1_sm g_5_sm m_t_20'>
     <Form.Item
           
       name="payment_date"
       label="Payment Date"
     
     >
        <DatePicker  style={{
           width:"220px"
        }}/> 
     </Form.Item>
     <Form.Item
       name="payment_mode"
       label="Payment Mode "
     
     >
       <Select
        options ={[
          {
           lable:"Online",
           value:"Online"
        },
        {
          lable:"Offline",
          value:"Offline"
       },

        ]}/>
     </Form.Item>
  
     </div>
     <div className='col_2 g_20 col_1_sm g_5_sm '>
     <Form.Item
       name="deposite_to"
       label="Deposite To "
     
     >
       <Select
        options ={
          [
            {
              lable:"Bank",
              value:"Bank"
            },
            {
              lable:"Cash",
              value:"Cash"
            },
            {
              lable:"Wallet",
              value:"Wallet"
            },
            {
              lable:"Cheque",
              value:"Cheque"
            },
          ]
        }
      />
     </Form.Item>
     </div>

     <Form.Item
       name="payment_reference"
       label="Reference"
     
     >
        <Input.TextArea>
        </Input.TextArea>
     </Form.Item>

     <Form.Item
       name="payment_notes"
       label="Notes"
     
     >
        <Input.TextArea>
        </Input.TextArea>
     </Form.Item>
      
     {/* <div className='col_2  g_20 col_1_sm g_5_sm expence_picker'>
    <Form.Item
       name="paid_amount"
       label="Invoice Amount Receivable
       in INR (₹)"
       rules={[{ required: true, message: 'Please enter Paid Amount ' }]}
     >
       <Input  placeholder='0.00' />
     </Form.Item>
   
     </div> */}
   
     


    
     <div
   style={{
     margin: "10px",
     display: "flex",
     gap: "10px",
     justifyContent: "flex-end",
   }}
 >
   <button className="btn btn-danger btn-sm" onClick={handleDrawerClose}>Cancel</button>
   <button  className="btn btn-primary" htmlType="submit">
      Save
   </button> 
 </div>
   </Form>
  )
}

export default RecordPaymentAdd