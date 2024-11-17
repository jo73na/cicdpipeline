import React, { useEffect, useState } from 'react';

import { Table, Button, Drawer, Form, Input, Select } from 'antd';
import ExpenceAdd from '../Expence/ExpenceAdd';
import { useContext } from 'react';
import InvoiceExpenceContext from '../../../Providers/InvoiceExpence';

import Loader from './../../../Utils/Loader';

import InvoiceGrap from './InvoiceGrap';  
import { useNavigate } from 'react-router-dom';
import InvoiceDetails from './InvoiceInfo';
import moment from 'moment';
import RecordPaymentAdd from './RecordpaymentAdd';


const InvoiceTable = () => {
 const {handleClosepaymnet,recordopen,expence,handleAddExpense,handleviewInvoice,fetchInvoice,invoice,handleFinishExpence,fetchExpence,expencegraph,Loading} =useContext(InvoiceExpenceContext)
 const [drawerVisible, setDrawerVisible] = useState(false);
 const [invoiceVisible, setDrawerInvoice] = useState(false);
 const navigate=useNavigate()
  const [fileError, setFileError] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [form] = Form.useForm();
 console.log("expencegraph",expencegraph)


  const handleDrawerClick=(id)=>{
    handleviewInvoice(id)
    setDrawerInvoice(true)

  }
  const columns = [
    {
      title: 'Invoice Date',
      dataIndex: 'invoice_date',
      key: 'invoice_date',
    },
    {
      title: 'Invoice No',
      dataIndex: 'invoice_number',
      key: 'invoice_number',
      render:(text,record)=>(
        <a onClick={(e)=>handleDrawerClick(record?.action)}>{text}</a>
      )
    },
    {
      title: 'Customer',
      dataIndex: 'client_id',
      key: 'client_id',
    },
    {
      title: 'Billed',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
    },
    {
      title:"Status",
      dataIndex: 'status',
      render:(text,record)=>(
       <div className='green'>
          <Select
          // onChange={(e)=>handleChangestatus(e,record)}
        className={`${record?.status =="overdue"?"status_closed":record?.status =="Send"?"status_hold":"status_selectbox"}` }
        value={record?.status}
         style={{
           width:"90px"
         }}
          options={[
            {
            label:"Send",
            value:"send"
          },
          {
            label:"Paid",
            value:"paid"
          },
          {
            label:"Overdue",
            value:"overdue"
          },
        
        
        ]}
         
         />
       </div>
      )
        
      
  }
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //       <p className='d_f a_i_c g_5' style={{color:"#E10102" ,cursor:"pointer"}} onClick={(e)=>handleDrawerClose(e,record?.action)}
    //        ><img src={Vector}/> Edit</p>
      
    //       // <Icon className='clients-table-icon' component = {BreifCaseAdd} />
        
    //     ),
    //   },
  ];

  const data = [
    {
    invoice_date:"24 Dec, 2022",
    invoice_no:"INV-2580",
    client:"Artech",
    billed:"₹ 50,000",
    paid:"-",
    balance:"-",
    due_date:"24 Dec, 2022",
   status:"Send",

    
    }
    // Sample data for the table
  ]
  invoice?.map((item)=>{
    data.push({
      ...item,
      paid:item.received||"-",
      balance:item.balance||"-",
      action:item?._id,
      due_date:moment(item?.due_date).format(' DD-MM-YYYY'),
      invoice_date:moment(item?.invoice_date).format(' DD-MM-YYYY')

    })
  })

    // Add more data as needed];
    // expence?.map((item,i)=>{
    //   data.push({
    //       key:i+1,
    //       ...item,
    //       date:moment(item?.expense_date).format(' DD-MM-YYYY')
    //   })
    // })
  



  const handleDrawerClose = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleFinish = (values,form) => {
   console.log("expenceAddemployee",values)
   var formdata=new FormData()

   formdata.append("expense_type",values["expense_type"])
   formdata.append("employee_id",values["employee_id"])
   formdata.append("expense_cost",values["expense_cost"])
   formdata.append("expense_desc",values["expense_desc"])
   formdata.append("expense_date",values["date"]?.$d)
   formdata.append("attachment",attachment)
   handleFinishExpence(formdata,form)
  
  
  }


  useEffect(() => {
    fetchInvoice()  
  }, [])
  return (
   
   
    Loading  ?  <Loader/> 
    :
    <>
       
         <div
         className='d_f a_i_f_s f_d_c_xs g_5 f_d_c_sm '>
         <Input.Search className="input_search" allowClear placeholder="Search Invoices" enterButton   />
          <div className='d_f a_i_c'>
          <Button type='primary' className='btn create_btn' onClick={()=>navigate("/addinvoice")}>+ Add Invoice</Button>
          </div>
         </div>   

          <div className='d_f g_40'>
            <div className=''
            style={{
              width:"100%"
            }}
            >
               {/* <p>Expense Data</p> */}
            <InvoiceGrap/>
            </div>
      
          </div>
      <Table dataSource={data} columns={columns} />
     
   
      <Drawer
        title="Add Invoice"
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        visible={drawerVisible}
        width={600}
      >
         <ExpenceAdd setFileError={setFileError} setAttachment={setAttachment}  handleDrawerClose={handleDrawerClose} handleFinish={handleFinish}/>
      </Drawer>
      <Drawer
        title="Invoice"
        placement="right"
        closable={true}
        onClose={()=>setDrawerInvoice(false)}
        open={invoiceVisible}
        width={800}
      >
        <InvoiceDetails/>
         {/* <ExpenceAdd setFileError={setFileError} setAttachment={setAttachment}  handleDrawerClose={handleDrawerClose} handleFinish={handleFinish}/> */}
      </Drawer>

      <Drawer
        title="Record Payment"
        placement="right"
        closable={true}
        onClose={handleClosepaymnet}
        open={recordopen}
        width={500}
      >
        <RecordPaymentAdd/>
         {/* <ExpenceAdd setFileError={setFileError} setAttachment={setAttachment}  handleDrawerClose={handleDrawerClose} handleFinish={handleFinish}/> */}
      </Drawer>
      </>
      

 
  );
};

export default InvoiceTable;
