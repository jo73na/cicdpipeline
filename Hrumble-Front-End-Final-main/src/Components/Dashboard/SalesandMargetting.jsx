import React, { useContext, useEffect, useState } from 'react'


 import Items from "/images/items.png"

import EmployeeTimeTracker from './Timer'



import { Card, Col, Row, Tab } from 'react-bootstrap'



import CompanyChart from './CompanyChart'
import ContactsChart from './Contacts'
import DashboardContext from '../../Providers/DashboardProvider'
import CookieUtil from '../../Utils/Cookies'
import Interview from './Interview'
import Loader from '../../Utils/Loader'


export const SalesandMarketting = () => {
     const {fetchSales,clientSubmissionCount,Loading}=useContext(DashboardContext)
      console.log("clientSubmissionCountclientSubmissionCount",clientSubmissionCount,)
    let data =JSON.parse(CookieUtil.get("admin"))
    useEffect(() => {
        fetchSales("Week")
     },[])
  return (
     
      Loading ?
      <Loader/>
      :
   
      <div className='container-fluid'>
      {/* <h6 className='text-primary'> Sales Dashboard</h6> */}
   
 
         <div className="row">  
         <div className="col-xl-4">
         
              <div className="card ">
          
          <div className="card-body">
              <div className="text-center">
                  <img src={Items} alt="" />
              </div>
              <h4>Hii {data?.name} Welcome to Your Dashboard</h4>

          </div>
      </div>
             
       
     </div> 
     <div className="col-xl-4 ">
   
            								
             <EmployeeTimeTracker/>
            
            
        
 </div>
 <div className="col-xl-4">
 <div className="row">
     <div className="col-xl-12">
         <Interview other="other" />
     </div>
     <div className="col-xl-12">
         {/* <AllProjectBlog /> */}
     </div>
 </div>
</div>
         
           
             <div className='col-xl-12'>
                  <div className='row'>
                  <div className="col-xl-12">
                  <div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
               <Row>
                 <Col xl="6">
                     <Card name="accordion-one" className="dz-card">
                         <Tab.Container defaultActiveKey="Preview">
                          
                           <Tab.Content className="tab-content" id="myTabContent">
                             <Tab.Pane eventKey="Preview">
                                     <CompanyChart/>
                                    
                             </Tab.Pane>    
  
                           </Tab.Content>    
                         </Tab.Container>  
                     </Card>
                 </Col>
                 <Col xl="6">
                     <Card name="accordion-one" className="dz-card">
                         <Tab.Container defaultActiveKey="Preview">
                        
                           <Tab.Content className="tab-content" id="myTabContent">
                             <Tab.Pane eventKey="Preview">
                                     <ContactsChart/>
                                    
                             </Tab.Pane>    
  
                           </Tab.Content>    
                         </Tab.Container>  
                     </Card>
                 </Col>
                    
             
               </Row>{" "}                     
             </div>  
                                 </div>
                    
             </div>
             </div>
             <div className="col-xl-4">
                 {/* <ToDoList /> */}
             </div>
            

         </div>									
    

   </div>
  )
}
