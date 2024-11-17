import React, { useEffect, useState } from 'react';

import { Table, Button, Drawer, Form,  Input,  Tooltip } from 'antd';

import ExpenceAdd from './ExpenceAdd';
import { useContext } from 'react';
import DownloadIcon from "/images/Download.svg"

import InvoiceExpenceContext from '../../../Providers/InvoiceExpence';
import ExpenseGrap from './ExpenseGrap';
import Loader from './../../../Utils/Loader';
import moment from 'moment';

import { BASE } from '../../../Utils/api';

const ExpenseTable = () => {
 const {expence,handleAddExpense,handleFinishExpence,fetchExpence,expencegraph,Loading} =useContext(InvoiceExpenceContext)
 const [drawerVisible, setDrawerVisible] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [form] = Form.useForm();
 console.log("expencegraph",expencegraph)
  const columns = [
    {
      title: 'Expense For',
      dataIndex: 'expense_for',
      key: 'expense_for',
    },
    {
      title: 'Type',
      dataIndex: 'expense_type',
      key: 'expense_type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Expense Cost (₹)',
      dataIndex: 'expense_cost',
      key: 'expense_cost',
      render :(text, record) =>new Intl.NumberFormat('en-IN', {
        // style: 'currency',
        currency: 'INR'
      }).format(text)
    },
    {
      title: 'Description',
      dataIndex: 'expense_desc',
      key: 'expense_desc',
    },
    {
      title: '',
      dataIndex: 'action',
     render:  (text, record) => (
      <div style={{
        display:"flex",
        gap:"10px 10px"
     }}>
         
     
        {
          record?.expense_attachment ?
          <a href={`${BASE}${record?.expense_attachment}`} target="_blank" rel="noopener noreferrer" download>
          <Tooltip placement="bottomRight" title="Download">
           
               <img src={DownloadIcon}/> 
               </Tooltip>
     </a> :"-"
            
        }
            

     </div>
    )

  },
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
    // Sample data for the table
  ]

    // Add more data as needed];
    expence?.map((item,i)=>{
      data.push({
          key:i+1,
          ...item,
          expense_for:item?.employee_id? `${item.employee_id?.firstname}${item.employee_id?.lastname}`:item.others_type,
          date:moment(item?.expense_date).format(' DD-MM-YYYY')
      })
    })
  

  const handleAddExpenseClick = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleFinish = (values,form) => {
   console.log("expenceAddemployee",values)
   var formdata=new FormData()

   formdata.append("expense_type",values["expense_type"])
   values["employee_id"] &&formdata.append("employee_id",values["employee_id"])
   formdata.append("expense_cost",values["expense_cost"])
   formdata.append("expense_desc",values["expense_desc"])
   formdata.append("expense_date",values["date"]?.$d)
   formdata.append("others_type",values["others_type"])
   formdata.append("attachment",attachment)
   handleFinishExpence(formdata,form)
   handleDrawerClose()
  
  
  }


  useEffect(() => {
    fetchExpence()  
  }, [])
  return (
   
   
    Loading  ?  <Loader/> 
    :
    <>
       
         <div
         className='d_f a_i_f_s f_d_c_xs g_5 f_d_c_sm '>
         <Input.Search className="input_search" allowClear placeholder="Search Expenses" enterButton   />
          <div className='d_f a_i_c'>
          <Button type='primary' className='btn create_btn' onClick={handleAddExpenseClick}>+ Add Expense</Button>
          </div>
         </div>   

          <div className='d_f g_40'>
            <div className=''
            style={{
              width:"100%"
            }}
            >
               {/* <p>Expense Data</p> */}
            <ExpenseGrap/>
            </div>
      
          </div>
      <Table dataSource={data} columns={columns} />
     
   
      <Drawer
        title="Add Expense"
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        visible={drawerVisible}
        width={600}
      >
         <ExpenceAdd setFileError={setFileError} setAttachment={setAttachment}  handleDrawerClose={handleDrawerClose} handleFinish={handleFinish}/>
      </Drawer>
      </>

 
  );
};

export default ExpenseTable;
