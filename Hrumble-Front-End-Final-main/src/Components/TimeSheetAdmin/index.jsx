// import {Tabs } from 'antd'
// import React, { useContext, useEffect } from 'react'

// import TimesheetReportAdmin from './TimesheetAdminReport'
// import TimelineGrouping from './TimesheetAdmin'
// import { useState } from 'react'
// import FaqContext from '../../Providers/Faq'
// import Request from './Request'
// import NonBillable from './NonBillableRequest'
// import axios from 'axios'
// import { BASE_URL } from '../../Utils/api'
// // import TimesheetTable from './TimesheetTable'



// export default function  TimeSheetAdmin() {
//     const {epmloeescdularAdmin,fethRequests,setReport,epmloeescdularNonbillable}=useContext(FaqContext)
// const [salary_type, setSalaryType] = useState('Billable')
  
//     const [args, setargs] = useState({});
//     const [active, setActive] = useState("1");
//     const [edit, setEdit] = useState(false);
  
   
//     const items = [
//         {
//           key: '1',
//           label: 'Timesheet',
//           children: <TimelineGrouping setSalaryType ={setSalaryType} salary_type={salary_type}  args={args} edit={edit} setargs={setargs} setEdit={setEdit}/>
//         },
//         {
//           key: '2',
//           label: 'Reports',
//           children: <TimesheetReportAdmin />
//         },
//         {
//           key: '3',
//           label: 'Billable Requests',
//           children: <Request />
//         },
//         {
//           key: '4',
//           label: 'Non Billable Requests',
//           children: <NonBillable/>
//         },
//     ]

//     // const onAddEmployeeClose = () => {
//     //     setAddEmployeeDrawer(false);
//     //     setEdit(false)

//     //   };

//     //   const handleSave =  async(values,args,form) => {
//     //     // Process the form data and update the scheduler data
//     //    console.log("values",values)
//     //     var formdata=new FormData()
//     //     formdata.append("client_id",values["client_id"])
//     //     formdata.append("project_id",values["project_id"])
//     //     formdata.append("logged_houres",values["logged_houres"])
//     //     formdata.append("employee_id",values["employee_id"])
//     //     formdata.append("StartTime",args.data.StartTime)
//     //     formdata.append("EndTime",args.data.EndTime)
//     //     formdata.append("timesheet",screenshot)
    
       
    
//     //    if(edit){
      
//     //     await axios.put(`${BASE_URL}/events/adminedit/${args?.data?._id}`,formdata,
//     //   ).then( async(res)=>{
//     //        await epmloeescdularAdmin()
//     //        setAddEmployeeDrawer(false);
//     //        form.resetFields();
//     //        setargs({})
           
           
           
//     //      })
//     //    }
//     //    else{
//     //     await axios.post(`${BASE_URL}/events/adminadd`,formdata,).then( async(res)=>{
//     //        await epmloeescdularAdmin()
//     //        setAddEmployeeDrawer(false);
        
//     //        form.resetFields();
           
           
           
//     //      })
//     //    }
    
        
//     //   };
//     const init = async()=>{
//       let params={
//         type:"Approved"
//       }
//       await axios.get(`${BASE_URL}/events/employeewisereport`,{params}).then((response)=>{
//       setReport(response.data.data)
      
//    })
//   }

//      useEffect(() => {
//         if(active == "1"){
//           if(salary_type =="Billable"){
//         epmloeescdularAdmin()
//           }
//           else{
//             epmloeescdularNonbillable()
//           }
           
//         }
//         if(active =="2"){
//           init() 
//         }
        
//      }, [active])
     
//    const handleChange=(e)=>{
//       console.log("e",e)
//       setActive(e)
//    }
//   return (
//     <div>

// {/* <Drawer
//         title="Add Log Hours"
//         placement="right"
//         closable={true}
//         size="medium"
//         width={650}
//         onClose={onAddEmployeeClose}
//         open={openAddEmployeeDrawer}
       
//       >
//         <AddTimesheet
//          onSave={handleSave} 
//         args={args} edit={edit} setscreenshot={setscreenshot} setAddEmployeeDrawer={setAddEmployeeDrawer}/>
//       </Drawer> */}
//         {/* <div className='row'>
//             <div className='col'>
//                 <label>Timesheet</label>
//             </div>
//         </div> */}
       
//             <div className='card p_10'>
            
//                 <Tabs  activeKey={active} onChange={handleChange} items={items} />
            
//             </div>
        
//     </div>
//   )
// }



import { Nav, Tab } from 'react-bootstrap'

 import AdminTimeSheet from './AdminTimeSheet'
import { useContext } from 'react'
// import TimeSheetContext from '../../../context/TimeSheetContext'
import { useEffect } from 'react'
import { useState } from 'react'
import Request from './Request'
import NonBillable from './NonBillableRequest'
// import TimesheetReportAdmin from './TimesheetReports'
import { SVGICON } from '../../Utils/SVGICON'

import FaqContext from '../../Providers/Faq'
import TimesheetReportAdmin from './TimesheetAdminReport'

const TimeSheetAdmin = () => {
    const {epmloeescdularAdmin,fethRequests,setReport,epmloeescdularNonbillable}=useContext(FaqContext)

    const [salary_type, setSalaryType] = useState('Billable')

     useEffect(() => {
        epmloeescdularAdmin()
       
     }, [])
     
  return (
    <div className="container-fluid">
         <div className='row'>
             <div className='col-xl-12'>
             <div className="card">
    <div className="card-header border-0 pb-0 flex-wrap">
        {/* <h4 className="heading mb-0">Literary success</h4> */}
    </div>
    <div className="card-body ">
         <div>
         <Tab.Container defaultActiveKey={'Social'}>
            <Nav as="ul" className="nav nav-pills success-tab" id="pills-tab" role="tablist">
                <Nav.Item as="li" >
                    <Nav.Link as="button" eventKey={'Social'}>
                        {SVGICON.SocialHeart}
                        <span>Over View </span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" >
                    <Nav.Link as="button" eventKey={'Project'}>
                        {SVGICON.Folder}
                        <span>Reports</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" >
                    <Nav.Link as="button" eventKey={'Sale'}>
                        {SVGICON.SaleChart}
                        <span>Billable</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" >
                    <Nav.Link as="button" eventKey={'Mobile'}>
                        {SVGICON.Mobile}
                        <span>NonBillable</span>
                    </Nav.Link>
                </Nav.Item>
               
                
            </Nav> 
             {/* <p>Sathish</p> */}
            <Tab.Content>
                <Tab.Pane eventKey={'Social'}>                                
                      <div className='m-3'>
                       {/* <TimelineGrouping/> */}
                      <AdminTimeSheet salary_type={salary_type} setSalaryType ={setSalaryType}/> 
                        </div>                            
                </Tab.Pane>
                <Tab.Pane eventKey={'Project'}>
                    <div className='m-3'>
                      
                    <TimesheetReportAdmin/>
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey={'Sale'}>
                     <Request/>
                  
                </Tab.Pane>
                <Tab.Pane eventKey={'Mobile'}>
                     <NonBillable/>
                </Tab.Pane>
             
            </Tab.Content>               
        </Tab.Container>
         </div>
        {/* <div>
                                    <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
                                </div> */}
    </div>
 </div>   
            </div>

         </div>
    </div>
  )
}

export default TimeSheetAdmin
