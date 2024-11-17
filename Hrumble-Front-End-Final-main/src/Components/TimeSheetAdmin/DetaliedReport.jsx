import {Button, Form, Select} from 'antd'
import React,{useEffect} from 'react'

import { Option } from 'antd/es/mentions';
import axios from 'axios';
import { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Aggregate, Group, AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import { useContext } from 'react';
import FaqContext from '../../Providers/Faq';
import { BASE_URL } from '../../Utils/api';
import { useForm } from 'antd/es/form/Form';


export default function DetailedReportAdmin() {


 const {employee,getClients,clients,projectsByClient}=useContext(FaqContext)

  const[report,setReport]=useState([])
  const[filter,setFilter]=useState({
     year:2024,
    employee_id:"",
     month:"",
     client_id:"",
     project_id:"",

  })
//  const [clients,setClients]=useState([])
 const [projectData, setProjectData] = useState([]);
 const [selectedEmployee, setSelectedEmployee] = useState('All');
  const[form]=useForm()
  const[currentYear,setCurrentYear]=useState(new Date().getFullYear())
  const emplyeedata=[{label:"All",value:"All"},...employee]


  
 let clientsData=[]
 clients?.map((item)=>{
    clientsData.push({
       value:item?._id,
       label:item?.name
    })
 })
 const projectdata=[]
 projectsByClient?.map((item)=>{
  projectdata.push({
     value:item._id,
     label:item.project_name
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

   

//    useEffect( async() => {
//     let params={ 
//         year:currentYear,
//         emplyee_id:"65a0d65791ceb3b5baa0316c"}
//       await axios.get("http://localhost:8080/api/v1/events/report",{params}).then((response)=>{
//         setReport(response.data.data)
        
//      })
//    }, [])


   const handleChangeEmployee= async(e)=>{


    if(e !== "All"){
      let params={ 
         ...filter,
        employee_id:e}
        setFilter((prevFilter) => ({
          ...prevFilter,
          employee_id: e
        }));
      await axios.get(`${BASE_URL}/events/report`,{params}).then((response)=>{
        setReport(response.data.data)
        
     })
    } 
    else{
      let params={ 
        year:currentYear,
        employee_id:e
       }
       setFilter((prevFilter) => ({
        ...prevFilter,
        employee_id: e
      }));

      axios.get(`${BASE_URL}/events/report`,{params}).then((response)=>{
        setReport(response.data.data)
    })
    }
   
   }
   const handleChangemonth= async(e)=>{


    if(e !== "All"){
      let params={ 
         ...filter,
        month:e}
        setFilter((prevFilter) => ({
          ...prevFilter,
          month:e
        }));
      await axios.get(`${BASE_URL}/events/report`,{params}).then((response)=>{
        setReport(response.data.data)
        
     })
    } 
    else{
      let params={ 
        year:currentYear,
        month:e
       }
       setFilter((prevFilter) => ({
        ...prevFilter,
        month: e
      }));

      axios.get(`${BASE_URL}/events/report`,{params}).then((response)=>{
        setReport(response.data.data)
    })
    }
   
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
   const pageSettings = { pageCount: 5 };
   const groupSettings = { showDropArea: false, columns: ['monthName'],

 captionTemplate: (props) => {
  
  let houres=customSum(props.items)
 
  return <span>{ props.items[0].monthName} {currentYear} -({houres})</span>;
 }
}

 
 
   function groupCaptionTemplate(props) {
     const field = props.field;

     if (field === 'CategoryName') {
         return <span>Custom Group Header for CategoryName: {props.Key}</span>;
     }

     return <span>{props.Key}</span>; // Default behavior for other fields
 }

 const init = async()=>{
        
    await axios.get(`${BASE_URL}/events/report`,{params:{type:"Approved"}}).then((response)=>{
    setReport(response.data.data) 
 
    
 })
  getClients()}
   
 useEffect(() => {
    init()

}, [])

 const onChageClient = async(value) => {
    
    // Update the selected client state
  

    // Fetch projects for the selected client and update the projects state
     await axios.get(`${BASE_URL}/projects?client_id=${value}`)
    .then((response) => {
      const data = response.data.data;
  
      // Check if data is an array before calling .map
      if (Array.isArray(data)) {
        const projectsData = data.map((item) => ({
          label: item?.project_name,
          value: item?._id,
        }));
  
        setProjectData (projectsData)
      } else {
        console.error("Data is not an array:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
  }



  const handleFinish= async(values)=>{
     console.log("values",values)
     let filter ={
           year:values["year"],
         
        ...(values["month"] && {month:values["month"]}),

        ...(values["employee_id"] && {employee_id:values["employee_id"]}),
        ...(values["client_id"] && {client_id:values["client_id"]}),
        ...(values["project_id"] && {project_id:values["project_id"]}),



     }
     console.log("filter",filter)
    let params={ 
        ...filter
}
      await axios.get(`${BASE_URL}/events/report`,{params}).then((response)=>{
        setReport(response.data.data)
        
     })
  }
  const handleClear=()=>{
    setFilter({
      year:2024,
      employee_id:"",
     month:"",
     client_id:"",
     project_id:"",
    })

    init()
    form.resetFields()
  }
 const nonEmptyValuesCount = Object.values(filter).filter(value => value !== '').length;
 console.log("Object.values(filter)",nonEmptyValuesCount)
 console.log("Object.values(filter)",filter)

  return (
    <div>


          <div className='row my-3 m_t_10'>
          <div className='col'>
              
              <Form layout='vertical'
               onFinish={handleFinish}
                form={form}>
                  <div className='col_6 g_10'>
                      
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
                           onChange={handleChangemonth}
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
                             
                            options={emplyeedata}
                            />
                          </Form.Item>
                     
                      
                          <Form.Item name="client_id" label="Client">
                              <Select placeholder="Select Client"
                              showSearch
                              allowClear
                              onChange={onChageClient}
                              options={clientsData}/> 
                                 
                           
                          </Form.Item>
                          <Form.Item className='' name ="project_id" label="Projects">
                              <Select placeholder="Select Projects"
                               showSearch
                               allowClear
                              //  onChange={onChageProject}
                              options={projectData}/> 
                                 
                           
                          </Form.Item>
                     
                      {
                         nonEmptyValuesCount > 1 &&
                        <Button type="primary"  className=' btn m_t_30'
                        // htmlType='submit'
                        onClick={handleClear}
                        >
                          Clear Filter
                       </Button>
                      }
                  </div>
  
                  <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={report} allowPaging={true} pageSettings={pageSettings} allowGrouping={true} groupSettings={groupSettings} groupCaptionTemplate={groupCaptionTemplate}  
          >
            <ColumnsDirective>
              <ColumnDirective field='monthName' headerText='' width='70'></ColumnDirective>
              <ColumnDirective field='projectName' headerText='Month' width='150'></ColumnDirective>
              
  
              <ColumnDirective field='totalLoggedHours' headerText='Logged Hours' width='150' textAlign='Right'></ColumnDirective>

            </ColumnsDirective>
            <AggregatesDirective>
              <AggregateDirective>
               
              </AggregateDirective>
            
            </AggregatesDirective>
            <Inject services={[Page, Aggregate, Group]}/>
          </GridComponent>
        </div>
      </div>
                 
              </Form>
             
          </div>
        </div>
       
    
    </div>
  )
}
