import {  Button, Form,Select } from 'antd'
import React,{useEffect} from 'react'

import { Option } from 'antd/es/mentions';
import axios from 'axios';
import { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Aggregate, Group,  AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import { useContext } from 'react';
import { useForm } from 'antd/es/form/Form';
import FaqContext from '../../Providers/Faq';
import { BASE_URL } from '../../Utils/api';


export default function EmployeeWiseReportAdmin({billable}) {
    const [form] = useForm();
 const {employee,setReport,report,nonbillable}=useContext(FaqContext)

 const [clients,setClients]=useState([])

 const [search, setsearch] = useState({});

 const [selectedEmployee, setSelectedEmployee] = useState('All');

  const[currentYear,setCurrentYear]=useState(new Date().getFullYear())
  const emplyeedata=[{label:"All",value:"All"},...employee]
 

  
 let clientsData=[]
 clients?.map((item)=>{
    clientsData.push({
       value:item?._id,
       label:item?.name
    })
 })
  const years = Array.from({ length: 21 }, (_, index) => currentYear - 10 + index);
  const months = [
    { label: 'All', value: "All"},

    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ];

    
      
     
        
      
     const handleChangeYear=(e)=>{
       setCurrentYear(e)
     }

   


    const init = async()=>{
        let params={
          type:"Approved"
        }
        await axios.get(`${BASE_URL}/events/employeewisereport`,{params}).then((response)=>{
        setReport(response.data.data)
        
     })
    }
    const initBillable = async()=>{
      let params={
        type:"Approved"
      }
      await axios.get(`${BASE_URL}/events/nonbillablereport`,{params}).then((response)=>{
      setReport(response.data.data)
      
   })
  }

   useEffect( () => {
    if(billable){
      initBillable()
    }
    else{
    init()


    }
   }, [])




   const handleChangeEmployee= async(e)=>{
     setSelectedEmployee(e)

    if(e !== "All"){
      let params={ 
        year:currentYear,
        employee_id:e,
        type:"Approved"

      }
      if(billable){
        await axios.get(`${BASE_URL}/events/nonbillablereport`,{params}).then((response)=>{
          setReport(response.data.data)
          
       })
      }
      else{
      await axios.get(`${BASE_URL}/events/employeewisereport`,{params}).then((response)=>{
        setReport(response.data.data)
        
     })}
    } 
    else{
      let params={ 
        year:currentYear,
        employee_id:e,
        type:"Approved"

       }
       if(billable){
        axios.get(`${BASE_URL}/events/nonbillablereport`,{params}).then((response)=>{
          setReport(response.data.data)
      })
       }
       else{


      axios.get(`${BASE_URL}/events/employeewisereport`,{params}).then((response)=>{
        setReport(response.data.data)
    })
  }
    }
   
   }
   const handleMonth= async(e)=>{


    if(e !== "All"){
      let params={ 
        year:currentYear,
       ...(selectedEmployee !=="All" && {employee_id:selectedEmployee}),
       month:e,
       

        type:"Approved"

      }
      if(billable){
        await axios.get(`${BASE_URL}/events/nonbillablereport`,{params}).then((response)=>{
          setReport(response.data.data)
        })}

      
      else{
      await axios.get(`${BASE_URL}/events/employeewisereport`,{params}).then((response)=>{
        setReport(response.data.data)
        
     })}
    } 
    else{
      let params={ 
        year:currentYear,
        ...(selectedEmployee !=="All" && {employee_id:selectedEmployee}),
       
        type:"Approved"

       }
       if(billable){
        axios.get(`${BASE_URL}/events/nonbillablereport`,{params}).then((response)=>{
          setReport(response.data.data)
      })
       }
       else{

      axios.get(`${BASE_URL}/events/employeewisereport`,{params}).then((response)=>{
        setReport(response.data.data)
    })
  }
    }
   
   }

   const pageSettings = { pageCount: 5 };
   const groupSettings = { showDropArea: false, columns: ['monthName'],
   captionTemplate: (props) => {
  
     let houres=customSum(props.items)
     console.log("houres",houres)
     return <span>{ props.items[0].monthName} {currentYear} -({houres})</span>;
 }
 };

 
 
   function groupCaptionTemplate(props) {
     const field = props.field;

     if (field === 'CategoryName') {
         return <span>Custom Group Header for CategoryName: {props.Key}</span>;
     }

     return <span>{props.Key}</span>
 }
   




  const handleFinish= async(values)=>{
     console.log("values",values)
     let filter ={
           year:values["year"],
         
        ...(values["month"] && {month:values["month"]}),

        ...(values["employee_id"] && {employee_id:values["employee_id"]}),
       



     }
    //  console.log("filter",filter)
    setsearch(filter)
    let params={ 
        ...filter,
        type:"Approved"
}
      await axios.get(`${BASE_URL}/events/employeewisereport`,{params}).then((response)=>{
        setReport(response.data.data)
        
     })
  }

   const handleClear=()=>{
    form.resetFields()
    init()
    setsearch({})

   }

   const customSum = (data) => {
    let totalMinutes = 0;

    // Convert 'hh:mm' time values to minutes and sum them up
    data?.forEach((item) => {
      const [hours, minutes] = item.totalLoggedHours.split(':');
      totalMinutes += parseInt(hours) * 60 + parseInt(minutes);
    });

    // Convert the total back to 'hh:mm' format
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMinutesRemainder = totalMinutes % 60;
    const totalTime = `${totalHours}:${totalMinutesRemainder}`;

    return totalTime;
  };

  return (
    <div>
            
            <Form layout='vertical'
            
               onFinish={handleFinish}
               form ={form}
               >
                  <div className='col_6 g_10 a_i_c'>
                      
                          <Form.Item name="year" label="Year">
                          <Select placeholder="Select Year"
                           onChange={handleChangeYear}
                           defaultValue={currentYear}>
        {years.map((year) => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </Select>
                          </Form.Item>
  
                          <Form.Item name="month" label="Month">
                          <Select placeholder="Select Month"
                          showSearch
                          allowClear
                           onChange={handleMonth}
                             options={months}/>
      
    
                          </Form.Item>

                          <Form.Item label="Employee Name"
                          name="employee_id">
                            <Select 
                            showSearch
                            allowClear
                            placeholder="Select Employee"
                           
                              onChange={handleChangeEmployee}
                            value={selectedEmployee}
                             
                            options={billable? nonbillable:emplyeedata}
                            />
                          </Form.Item>
                     
                      
                          {/* <Form.Item name="client_id" label="Client">
                              <Select placeholder="Select Client"
                              onChange={onChageClient}
                              options={clientsData}/> 
                                 
                           
                          </Form.Item>
                          <Form.Item  name ="project_id" label="Projects">
                              <Select placeholder="Select Projects"
                              // onChange={onChageClient}
                              options={projectData}/> 
                                 
                           
                          </Form.Item> */}
                     
                      {/* {
                        Object.values(search)?.length>1  &&
                        <Button type="primary"  className='btn'
                        onClick={handleClear}
                      >
                           Clear Filter
                       </Button>
} */}
                       {/* <Button type="primary"  className='btn'
                       style={{
                        height: '30px'
                       }}
                       htmlType='submit'>
                          Filter
                      </Button> */}
                      
                  </div>

                  </Form>

          <div className='row my-3 m_t_10'>
          <div className='col'>
          
  
                  <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={report} allowPaging={true} pageSettings={pageSettings} allowGrouping={true} groupSettings={groupSettings} groupCaptionTemplate={groupCaptionTemplate}  
          >
            <ColumnsDirective>
              <ColumnDirective field='monthName' headerText='' width='70'></ColumnDirective>
              <ColumnDirective field='projectName' headerText='Month' width='150'></ColumnDirective>
              
  
              <ColumnDirective field='no_of_workingdays' headerText='No. of Working Days' width='150' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='working_days' headerText='Days Worked' width='150' textAlign='Right'></ColumnDirective>

              <ColumnDirective field='days_leave' headerText='Days Leave' displayAsCheckBox={true} width='150' textAlign='Center'></ColumnDirective> 
              <ColumnDirective field='totalLoggedHours' headerText='Logged Hours' width='150' textAlign='Right'></ColumnDirective>

            </ColumnsDirective> 
            <AggregatesDirective>
         
            <AggregateDirective>
              {/* <AggregateColumnsDirective>
                <AggregateColumnDirective field='totalLoggedHours' type='Custom' customAggregate={customSum}> </AggregateColumnDirective>
              </AggregateColumnsDirective> */}
            </AggregateDirective>
          </AggregatesDirective>
            <Inject services={[Page, Aggregate, Group]}/>
          </GridComponent>
        </div>
      </div>
                 
             
          </div>
        </div>
       
    
    </div>
  )
}
