import { Badge, Button, Card, DatePicker, Dropdown, Form, Pagination, Radio, Select, Space, Table } from 'antd'
import React,{useEffect} from 'react'
import { CalendarOutlined, DownOutlined, InfoCircleOutlined, UpOutlined, DownloadOutlined} from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Aggregate, Group, AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import { BASE_URL } from '../../Utils/api';
import CookieUtil from '../../Utils/Cookies';


export default function TimesheetReport3() {




  const[employee,setEmployee]=useState([])
 const [clients,setClients]=useState([])
 const [projectData, setProjectData] = useState([]);


  const[currentYear,setCurrentYear]=useState(new Date().getFullYear())
  const emplyeedata=[{label:"All",value:"All"}]
  employee?.map((item)=>{
    emplyeedata.push({
      value:item._id,
      label:item.firstname+item.lastname
    })
  })

  
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

    { label: 'January', value: 0 },
    { label: 'February', value: 1 },
    { label: 'March', value: 2 },
    { label: 'April', value: 3 },
    { label: 'May', value: 4 },
    { label: 'June', value: 5 },
    { label: 'July', value: 6 },
    { label: 'August', value: 7 },
    { label: 'September', value: 8 },
    { label: 'October', value: 9 },
    { label: 'November', value: 10 },
    { label: 'December', value: 11 },
  ];

    
       
        const data = [];
        for (let i = 0; i < 3; ++i) {
          data.push({
            key: i.toString(),
            name: 'sathish',
            platform: '',
            version: '',
            upgradeNum: '',
            creator: '',
            createdAt: '',
          });
        }

     const handleChangeYear=(e)=>{
       setCurrentYear(e)
     }

     const handleChangeMonth=(e)=>{
      console.log("e",e)
   }

   useEffect(() => {
    let token =CookieUtil.get("admin_id")
    let params={ 
        year:currentYear,
        employee_id:token}
      axios.get(`${BASE_URL}/events/report`,{params}).then((response)=>{
        setEmployee(response.data.data)
        
     })
   }, [])


  //  const handleChangeEmployee=(e)=>{


  //   if(e !== "All"){
  //     let params={ 
  //       year:currentYear,
  //       emplyee_id:e}
  //     axios.get("http://localhost:8080/api/v1/events/report",{params}).then((response)=>{
  //       setEmployee(response.data.data)
        
  //    })
  //   } 
  //   else{
  //     let params={ 
  //       year:currentYear,
  //      }
  //     axios.get("http://localhost:8080/api/v1/events/report",{params}).then((response)=>{
  //       setEmployee(response.data.data)
  //   })
  //   }
   
  //  }

   const pageSettings = { pageCount: 5 };
   const groupSettings = { showDropArea: false, columns: ['monthName'],
   captionTemplate: (props) => {
     console.log("hhh",props)
     return <span>{ props.items[0]?.monthName} 2024</span>;
 }
 };

 
   function groupFooterSum(props) {
       return (<span>Total units: {props.Sum}</span>);
   }
   function groupFootertCount(props) {
       return (<span>Discontinued: {props.TrueCount}</span>);
   }
   function groupcFootertMax(props) {
       return (<span>Maximum: {props.Max}</span>);
   }
   function groupCaptionTemplate(props) {
     const field = props?.field;

     if (field === 'CategoryName') {
         return <span>Custom Group Header for CategoryName: {props.Key}</span>;
     }

     return <span>{props?.Key}</span>; // Default behavior for other fields
 }
   
 useEffect(() => {
    axios.get(`${BASE_URL}/clients`).then((response) => {
        setClients(response.data.data);
    })

}, [])

 const onChageClient =(value) => {
    
    // Update the selected client state
  

    // Fetch projects for the selected client and update the projects state
    axios.get(`${BASE_URL}/projects?client_id=${value}`)
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


  return (
    <div>
      <div className='row my-3'>
        <div className='col'>
            
            <Form layout='vertical'>
                <div className='col_4 g_30'>
                    
                        <Form.Item name="year" label="Year">
                        <Select placeholder="Select Year"
                           allowClear
                           showSearch
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
                           allowClear
                           showSearch
                         onChange={handleChangeYear}
                           options={months}/>
    
  
                        </Form.Item>
                   
                    
                        <Form.Item name="name" label="Client">
                            <Select placeholder="Select Client"
                            allowClear
                            showSearch
                            onChange={onChageClient}
                            options={clientsData}/> 
                               
                         
                        </Form.Item>
                        <Form.Item className='m_t_1'  label="Projects">
                            <Select placeholder="Select Projects"
                            // onChange={onChageClient}
                            options={projectData}/> 
                               
                         
                        </Form.Item>
                   
                 
                </div>

                <div className='control-pane'>
      <div className='control-section'>
        <GridComponent dataSource={employee} allowPaging={true} pageSettings={pageSettings} allowGrouping={true} groupSettings={groupSettings} groupCaptionTemplate={groupCaptionTemplate}  
        >
          <ColumnsDirective>
            <ColumnDirective field='monthName' headerText='' width='70'></ColumnDirective>
            <ColumnDirective field='projectName' headerText='project Name' width='150'></ColumnDirective>
            <ColumnDirective field='totalLoggedHours' headerText='Logged Hours' width='150' textAlign='Right'></ColumnDirective>

            {/* <ColumnDirective field='QuantityPerUnit' headerText='Quantity per unit' width='180' textAlign='Right'></ColumnDirective>
            <ColumnDirective field='UnitsInStock' headerText='Units In Stock' width='150' textAlign='Right'></ColumnDirective>
            <ColumnDirective field='Discontinued' headerText='Discontinued' displayAsCheckBox={true} width='150' textAlign='Center'></ColumnDirective> */}
          </ColumnsDirective>
          <AggregatesDirective>
            <AggregateDirective>
             
            </AggregateDirective>
          
          </AggregatesDirective>
          <Inject services={[Page, Aggregate, Group]}/>
        </GridComponent>
      </div>
    </div>
                {/* <div className='row'>
                    <div className='col zive-timesheet-report-card-center'>
                    <Card className='zive-timesheet-report-card'>
                        <div className='d-flex justify-content-between'>
                        <div>
                        <label className='zive-timesheet-report-card-summary'>Summary:</label>
                        </div>
                        <div className='d-flex'>
                        <label className='zive-timesheet-report-card-120 '>120</label>
                        <label className='zive-timesheet-report-card-days'>Working Days</label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <circle cx="4" cy="4" r="4" fill="#E10102"/>
                        </svg>
                        <label className='zive-timesheet-report-card-05'>05</label>
                        <label className='zive-timesheet-report-card-employeesfont'>Employees</label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <circle cx="4" cy="4" r="4" fill="#E10102"/>
                      </svg>
                        <label className='zive-timesheet-report-card-4800'>4,800:00</label>
                        <label className='zive-timesheet-report-card-workinghours'>Working Hours</label>
                        </div>
                        <div>
                        <InfoCircleOutlined className='zive-timesheet-report-card-infoicon'/>
                        </div>
                        </div>
                    </Card>
                    </div>
                </div> */}
                <hr/>
                {/* <div className='row'>
                    <div className='col'>
                          <div className='d-flex'>
                            <label>August 2022 - January 2023</label>
                            </div>
                            <div className='d-flex justify-content-end'>
                            <UpOutlined className='mx-2 zive-timesheet-report-upicon' />
                            <label className='mx-2 zive-timesheet-report-button-collapse' type='button' >Collapse All</label>
                            <DownloadOutlined className='mx-2 zive-timesheet-report-downloadicon' />
                            </div>
                    </div>
                </div> */}
            </Form>
           
        </div>
      </div>
    </div>
  )
}
