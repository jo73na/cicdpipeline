import  { useEffect, useState } from 'react';
 
import { Table,  Form, Input,Radio, Select, DatePicker, Button, Modal, Dropdown, Menu } from 'antd';
import { useContext } from 'react';

import { LeftOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
 
 
 
import dayjs from 'dayjs';
import { DeleteOutlined } from '@ant-design/icons';
import InvoiceExpenceContext from '../../../Providers/InvoiceExpence';


 
 
const AddInvoice = () => {
   const {handlesendInvoice,expence,fethSelect,clientSelect,fetchcontact,clientSent}=useContext(InvoiceExpenceContext)
//  const {expence,handleAddExpense,handleFinishExpence,fetchExpence,expencegraph,Loading} =useContext(InvoiceExpenceContext)
 const[radiovalue,setRadiovalue]=useState("new")
 const[saveSelect,setSaveSelect]=useState("Save & Sent")
 const[customer,setCustomer]=useState("")
 const[total,setTotal]=useState(0)
 const[select,setSelect]=useState(0)
 const[totalGst,settotalGst]=useState(0)
 const[radioValue,setRadioValue]=useState("TCS")
 const[modelradio,setmodelRadio]=useState("continue")
 const[openmodal,setOpenModel]=useState(false)
 const[adjestment,setAdjestment]=useState(0)
 const [tableData, setTableData] = useState([
  {
    key: 1, // Use a unique key for each row
    subject: "", // Default values for other columns
    quantity: "",
    hours: "",
    rate: "",
    taxamount:0,
    tax: 18, // Default value for tax
    amount: 0,
  }
]);
 
  const [form] = Form.useForm();
  const [modelform] = Form.useForm();
  const navigate=useNavigate()
//  console.log("expencegraph",expencegraph)
 
    // Add more data as needed];
 
 
 
 
 
  // const handleFinish = (values,form) => {
  //  console.log("expenceAddemployee",values)
  //  var formdata=new FormData()
 
  //  formdata.append("expense_type",values["expense_type"])
  //  formdata.append("employee_id",values["employee_id"])
  //  formdata.append("expense_cost",values["expense_cost"])
  //  formdata.append("expense_desc",values["expense_desc"])
  //  formdata.append("expense_date",values["date"]?.$d)
  //  formdata.append("attachment",attachment)
  //  handleFinishExpence(formdata,form)
 
 
  // }
 
  const handleDeleteRow = (key) => {
    const updatedTableData = tableData.filter((row) => row.key !== key);
    setTableData(updatedTableData);
  };
 
 
 
   const handlechangeRadio=(e)=>{
     console.log("e",e)
    setRadiovalue(e?.target.value)
   }
 
   const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      // ... other properties for subject column
    },
    {
      title: 'Item & Description',
      dataIndex: 'subject',
      key: 'subject',
      width:300,
        render: (text, record) => (
        <Input
         value={record?.subject}
        height="200px"
        onChange={(e) => handleRowChange(record, 'subject', e)}
 
        />
      ),
      // ... other properties for subject column
    },
    {
      title: 'Quantity/Hours',
      dataIndex: 'quantity',
      key: 'quantity',
         render: (text, record) => (
        <Input
        placeholder='0'
         value={record.quantity} style={{
          width: '200px',
         
        }}
        onChange={(e) => handleRowChange(record, 'quantity')}
 
        />
      ),
    },
 
    {
      title: 'Rate (₹)',
      dataIndex: 'rate',
      key: 'rate',
      render: (text, record) => (
        <Input
        placeholder='0'
 
        value={record.rate} style={{
          width: '200px',
        }}
        onChange={(e) => handleRowChange(record, 'rate', e.target.value)}
 
        />
      ),
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
      key: 'tax',
      render: (text, record) => (
        <Select
        value={record.tax} style={{
          width: '200px',
        }}
         options={[{
           label: "IGST18 (18%)",
           value:18
         },
         {
          label: "IGST15 (15%)",
          value:15
        }]}
        onChange={(e) => handleRowChange(record, 'taxamount', e)}
 
        />
      ),
 
    },
    {
      title: 'Tax Amount',
      dataIndex: 'taxamount',
      key: 'taxamount',
      render :(text, record) =>new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(text)
     
   
 
    },
    {
      title: 'Amount  (₹)',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) =>new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format( record.quantity * record.rate)
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div  onClick={() => handleDeleteRow(record.key)} style={{
           cursor:"pointer"
        }}>
           <DeleteOutlined  className='c_primary'  />
        </div>
      ),
    },
 
  ];
 
  const addRow = () => {
    const newRow = {
      key: tableData.length + 1, // Use a unique key for each row
      subject: "For the month of January  ", // Default values for other columns
      quantity: 0,
      hours: 0,
      rate: 0,
      taxamount:0,
      tax: 18, // Default value for tax
      amount: 0,
    };
 
    setTableData([...tableData, newRow]);
  };
  const handleRowChange = (record, dataIndex, value) => {
    console.log("yyyy",value)
    // Update the state with the new value
    const updatedTableData = tableData.map((row) => {
      if (row.key === record.key) {
        if(dataIndex =="taxamount"){
          return {
            ...row,
            ["tax"]:value,
            [dataIndex]: (row.quantity * row.rate)* value/100  
            }}
          else{
            return {
              ...row,
              tax:"",
              taxamount:0,
              [dataIndex]: value?.target? value?.target?.value:value,
            };
          }
        }
     
       return row;
   
 
 
      })
      setTableData(updatedTableData);
    // Calculate total amount
  };
  const calculateTotalAmount = () => {
    let totalAmount =0
    let totalgst =0
    tableData.reduce((total, item) => {
      totalAmount += (item.quantity || 0) * (item.rate || 0);
      totalgst += item.taxamount || 0;
      return total; // Return the accumulated value
    }, 0);
 
    setTotal(totalAmount)
    form.setFieldsValue({
      total_amount:new Intl.NumberFormat('en-IN', {
        // style: 'currency',
        currency: 'INR'
      }).format(totalAmount),
      sub_total:new Intl.NumberFormat('en-IN', {
        // style: 'currency',
        currency: 'INR'
      }).format(totalAmount) ,
      igst_amount:new Intl.NumberFormat('en-IN', {
        // style: 'currency',
        currency: 'INR'
      }).format(totalgst)
    })
    settotalGst(totalgst)
  };
 useEffect(() => {
    calculateTotalAmount();
 
     
 }, [tableData])
 
  const onChangeRadio=(e)=>{
    setRadioValue(e.taget.value)
  }
  const hanlechangSelect=(e)=>{
   setSelect(total* e /100)
  }
 
 
 
   const handleChangeAdjustment=(e)=>{
     setAdjestment(e.target.value)
   }
 
   useEffect(() => {
       fethSelect()
       form.setFieldsValue({
         invoice_number:`TLS/23-24 -${expence?.length+1||1}`
       })
       modelform.setFieldsValue({
        prefix:`TLS/23-24`,
        next:`${expence?.length+1||1}`
       })
   }, [])
 
   const handleChangeTerms = (e) => {
    let currentDate = dayjs();
 
    switch (e) {
      case "Net 30":
        // Get the current date
 
        // Add 30 days to the current date
        let dueDate1 = currentDate.add(30, 'day');  
        // Set the due_date field in the form
        form.setFieldsValue({ due_date: dueDate1 });
        break;
        case "Net 45":
          // Get the current date
         
   
          // Add 30 days to the current date
          let dueDate2 = currentDate.add(45, 'day');  
          // Set the due_date field in the form
          form.setFieldsValue({ due_date: dueDate2 });
          break;
          case "Net 60":
           let dueDate3 = currentDate.add(60, 'day');  
         
            form.setFieldsValue({ due_date: dueDate3 });
            break;
 
            case "Due End of Month":
 
              // Set the due date to the end of the current month
              let endOfMonthDate = currentDate.endOf('month');
              form.setFieldsValue({ due_date: endOfMonthDate });
              break;
              case "Due End of Next Month":
                // Set the due date to the end of the next month
                let endOfNextMonthDate = currentDate.add(1, 'month').endOf('month');
                form.setFieldsValue({ due_date: endOfNextMonthDate });
                break;
       
            case "Due on Receipt":
           
                form.setFieldsValue({ due_date: currentDate });
                break;
 
      default:
        break;
    }
  };
 
 
  const handleopenModel =()=>{
    setOpenModel(!openmodal)
  }
 
   const onChangeRadiomodel=(e)=>{
    console.log("e",e.target.value)
    if(e.target.value == "manual"){
    setmodelRadio(e.target.value)
    form.setFieldsValue({
      invoice_number:""
    })
     
    }
    else{
    setmodelRadio(e.target.value)
 
      form.setFieldsValue({
        invoice_number:`TLS/23-24 -${expence?.length+1||1}`
      })
    }
     
   }
 
 
   const handleSelect = (e) => {
     if(e.key == "Save and Sent"){
      setSaveSelect(e.key)
      fetchcontact(customer)
 
 
     }
     setSaveSelect(e.key)
 
    // You can perform any action based on the selected item here
  };
 
   const menu = (
    <Menu onClick={handleSelect}>
       {
        saveSelect !== "Save and Sent" ?
        <Menu.Item key="Save and Sent">Save and Sent</Menu.Item>:
        <Menu.Item key="Save Only">Save Only</Menu.Item>
       }
     
    </Menu>
  );
 
   const handleFinish =(values)=>{
     console.log("handleFinish",values)
     let send ={
      ...values,
      due_date:values?.due_date?.$d,
      invoice_date:values?.invoice_date?.$d,
      total_amount:Number(values?.total_amount?.replace(/,/g, '')),
      status:"Sent",
      tableData
     }
     handlesendInvoice(send,form)
     
 
   }
     
 
    
  return (
   
   
   
   
    <>
    <div className='container-fluid'>
    <p className='heading_text'><LeftOutlined className='back' onClick={()=>navigate(-1)}/>Add Invoice</p>
       
       <div className='card p_10'>
         <Form
          layout='vertical'
          onFinish={handleFinish}
          form={form}>
  
 {/*          
         <Form.Item label="Invoice Type" name="invoice_type"
           rules={[{ required: true, message: "Select Invoice Type" }]}
          
         >
         <Radio.Group
          value={radiovalue}
          onChange={handlechangeRadio}>
       <Radio value="new">Create New Invoice</Radio>
       <Radio value="exist">Add Existing Invoice</Radio>
  
     </Radio.Group>
         </Form.Item> */}
         {
           radiovalue  == "new" ?
            <>
            
            <div className='col_4 g_20'>
            <Form.Item
             label="Customer Name"
              name="client_id"
             >
              <Select placeholder="Select Customer"
              onChange={(e)=>setCustomer(e)}
                
               options={clientSelect}/>
            </Form.Item>
            </div>
            <div className='col_4 g_20'>
            <Form.Item
             name="invoice_number"
             label="Invoice Number">
              <Input placeholder='TLSINV-'
               addonAfter={<p className="m_10"
                onClick={handleopenModel}
               style={{
                 cursor:"pointer",
               }}><SettingOutlined /> </p>}
               />
            </Form.Item>
            <Form.Item
             label="Order Number"
              name="order_number">
              <Input placeholder='Enter Order Number'/>
            </Form.Item>
            </div>
            <div className='col_4 g_20'>
            <Form.Item
             label="Invoice Date"
              name="invoice_date">
              <DatePicker placeholder='Select Date'
                 style={{
                   width: "290px"
                 }}/>
            </Form.Item>
            <Form.Item
             label="Terms"
              name="terms">
              <Select placeholder='Select Terms'
               onChange={handleChangeTerms}
               options={[{
                  label:"Net 30",
                  value:"Net 30"
               },
               {
                 label:"Net 45",
                 value:"Net 45"
              },{
               label:"Net 60",
               value:"Net 60"
            },{
             label:"Due End of Month",
             value:"Due End of Month",
  
          },
          {
           label:"Due End of Next Month",
           value:"Due End of Next Month",
  
        },
        {
         label:"Due on Recepit",
         value:"Due on Receipt",
  
      },
               ]}/>
            </Form.Item>
            <Form.Item
             label="Due Date"
              name="due_date">
              <DatePicker placeholder='Select Date'
               style={{
                 width: "290px"
               }}/>
            </Form.Item>
            </div>
            <div className='col_3 g_20'>
            <Form.Item
             label="Subject"
              name="subject">
              <Input.TextArea placeholder='Tell your customer what this invoice is for'/>
            </Form.Item>
  
            
        
            </div>
             <Table dataSource={tableData}
              pagination={false  }  columns={columns.map((col) => ({
               ...col,
               onCell: (record) => ({
                 record,
                 dataIndex: col.dataIndex,
                 value: record[col.dataIndex],
                 onChange: (value) => handleRowChange(record, col.dataIndex, value),
               }),
             }))}
           />
             <p onClick={addRow} className='c_primary m_t_10 m_l_10'> + Add Row</p>
             <div className=' col_2 g_30 m_t_20 invoice_align'>
  
                <div>
                  <Form.Item
                   label="Terms & Conditions"
                    name="termand_conditions">
                   <Input.TextArea/>
                  </Form.Item>
                </div>
                <div className='card p_20 expense_total'>
          
      <div className='col_2'>
        <p style={{
          fontSize: '15px',
          fontWeight:"600"
        }}>Sub Total</p>
        <Form.Item
         name="sub_total">
        <Input
         name="sub_total"
         readOnly
         // className='c_black'
  
          value={new Intl.NumberFormat('en-IN', {
           // style: 'currency',
           currency: 'INR'
         }).format(total)}
          style={{
           marginTop:"-10px",
           textAlign: "end",
           border: 'none',
           color: "#303030 ",
           width:"260px"
  
          }}/>
        </Form.Item>
      </div>
      <div className='col_2 m_t_10 m_t_1'>
        <p
          style={{
           fontSize: '15px',
           fontWeight:"600"
         }}>IGST Amount</p>
         <Form.Item
          name ="igst_amount">
         <Input
         readOnly
          value={new Intl.NumberFormat('en-IN', {
           // style: 'currency',
           currency: 'INR'
         }).format(totalGst)}
          style={{
           marginTop: "-10px",
           textAlign: "end",
           border: 'none',
           width:"260px"
  
          }}/>
         </Form.Item>
      </div>
      <div className='col_2 m_t_10'>
        <div className='d_f f_d_c g_5'>
        <Radio.Group onChange={onChangeRadio} value={radioValue}>
       <Radio value="TDS">TDS</Radio>
       <Radio value="TCS">TCS</Radio>
  
    
     </Radio.Group>
     <Select
      style={{
       marginLeft: "-10px",
  
      }}
      onChange={hanlechangSelect}
      options={
        [{
         label:"Professional Fees 10%",
         value:10
        }]
      
      }/>
        </div>
       <Input
         readOnly
         value={new Intl.NumberFormat('en-IN', {
          // style: 'currency',
          currency: 'INR'
        }).format(select||0)}
         style={{
          marginTop: "-10px",
          textAlign: "end",
          border: 'none',
          width:"260px"
  
         }}/>
      
      </div>
      <div className='col_2 m_t_5'>
       <div className="d_f f_d_c g_5">
         <p   style={{
          fontSize: '15px',
          fontWeight:"600"
        }}>Adjustments</p>
         <Input
           style={{
             marginLeft: "-10px",
      
            }}
          onChange={handleChangeAdjustment}/>
       </div>
       <Input
         readOnly
         value={new Intl.NumberFormat('en-IN', {
           // style: 'currency',
          currency: 'INR'
        }).format(adjestment)}
         style={{
         //  marginTop: "-10px",
          textAlign: "end",
          border: 'none',
          width:"260px"
  
         }}/>
      </div>
      <div className='col_2 m_t_10'>
       <p className='heading_text'>Total Amount (₹)</p>
       <Form.Item
         name="total_amount"
       >
  
          
       <Input
         readOnly
         value={new Intl.NumberFormat('en-IN', {
           style: 'currency',
          currency: 'INR'
        }).format(Math.max(total, 0))}
         className='heading_text'
         style={{
          marginTop: "-10px",
          textAlign: "end",
          border: 'none',
          width:"260px"
  
         }}/>
       </Form.Item>
      
      </div>
                  
                </div>
  
  
  
        
  
             </div>
             <div
         style={{
           margin: "10px",
           marginTop: "20px",
           display: "flex",
           gap: "10px",
           justifyContent: "flex-end",
         }}
       >
         <button
        
         className="btn btn-danger">Cancel</button>
         <button className="btn btn-info">Save as Draft</button>
         <div className='d_f'>
         <button className="btn btn-primary" type='primary'
          htmlType="submit"
          style={{
           borderRadius: '5px'
          }} >{saveSelect}</button>
        
         <Dropdown overlay={menu} trigger={['click']}
         >
       <button  className="btn btn-primary"
        style={{
         marginLeft: '-10px',
         borderRadius:"5px"
        }} 
        ><DownOutlined /></button>
     </Dropdown>
         </div>
         {/* <Select
          className='invoice_Select'
           defaultValue={saveSelect}
           style={{
             width: "130px",
           }}
           options={[
             {
               label:"Save and Sent",
               value: "Save and Sent"
             },
             {
               label:"Save Only",  
               value: "Save Only"
             }
           ]}
  
          /> */}
          {
            saveSelect === "Save and Sent" ?
            <div>
            <Select
  
            placeholder="Select Sent Person"
            options={clientSent}
            />
           </div> :""
          }
            
            
        
       </div>
  
            
            </>
  
            
           :
           <p>sathish</p>
         }
         </Form>
       </div>
  
       <Modal
      title="Configure Invoice Number Preferences"
     open={openmodal}  onCancel={handleopenModel}
     okButtonProps={{ style: { display: 'none' } }}
     cancelButtonProps={{ style: { display: 'none' } }}
    
     >
       <p> Your invoice numbers are set on auto-generate mode to save your time.</p>
       <p>Are you sure about changing this setting?</p>
       <Form
        form={modelform}
        layout='vartical'>
       <Radio.Group onChange={onChangeRadiomodel} value={modelradio}
        style={{
         display:"flex",
         flexDirection:"column"
        }}>
       <Radio value="continue">Continue auto-generating invoice numbers</Radio>
       {
         modelradio == "continue" &&
         <div className='col_2 g_30'>
         <Form.Item
          label="Prefix"
           name="prefix">
            <Input
            value={`TLS/23-24 -${expence?.length+1 || 1}`}
             placeholder='TLS/23-24/'/>
         </Form.Item>
         <Form.Item
          name="next"
          
          label="Next Number">
            <Input
             placeholder='1'/>
         </Form.Item>
         </div>
       }
      
        
       <Radio value="manual">Enter invoice numbers manually</Radio>
       {/* {
         modelradio == "manual" &&
         <div className='col_2 g_30'>
        <Form.Item
         label="Prefix"
          name="manual_prefix">
           <Input
            placeholder='TLS/23-24/'/>
        </Form.Item>
        <Form.Item
         label="Next Number"
         name="manual_next"
         >
           <Input placeholder='1'/>
        </Form.Item>
        </div>
       } */}
  
    
     </Radio.Group>
  
       </Form>
    
        <div
         style={{
           display:"flex",
           justifyContent:"flex-end"
         }}>
        <Button type="primary" onClick={handleopenModel}>Save</Button>
        </div>
       {/* <UploadDocuments handleCancel={handleCancel} isModalOpen={isModalOpen} valueprops={valueprops} onClose={onClose} showModal={showModal}/> */}
     </Modal>
    </div>
    
       
     
      </>
 
 
  );
};
 
export default AddInvoice;