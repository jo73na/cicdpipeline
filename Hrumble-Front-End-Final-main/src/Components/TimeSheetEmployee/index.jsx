
import { Nav, Tab } from 'react-bootstrap'

// import AdminTimeSheet from './AdminTimeSheet'
import { useContext } from 'react'

import { useEffect } from 'react'
import { useState } from 'react'
// import Request from './Request'
// import NonBillable from './NonBillable'
// import TimesheetReportAdmin from './TimesheetReports'
import TimesheetTable from './TimesheetTable'
import TimesheetReport3 from './Report'

import FaqContext from './../../Providers/Faq/index';
import { SVGICON } from '../../Utils/SVGICON'
import Loader from '../../Utils/Loader'

const EmployeeTimesheet = () => {
    const {epmloeescdularAdmin,fethRequests,setReport,epmloeescdularNonbillable,Loading}=useContext(FaqContext)

    const [salary_type, setSalaryType] = useState('Billable')
    const [active,setActive]=useState("Overview")
   const [pending,setPending]=useState(0)


     
     
  return (
    <div className="container-fluid">
         <div className='row'>
             <div className='col-xl-12'>
             <div className="card">
    <div className="card-header border-0 pb-0 flex-wrap">
        {/* <h4 className="heading mb-0">Literary success</h4> */}
    </div>
    <div className="card-body">
         <div>
         <Tab.Container defaultActiveKey={active
        }
         onSelect ={(key)=>setActive(key)}>
            <Nav as="ul" className="nav nav-pills success-tab" id="pills-tab" role="tablist">
                <Nav.Item as="li" >
                    <Nav.Link as="button" eventKey={'Overview'}>
                        {SVGICON.SocialHeart}
                        <span>Over View </span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" >
                    <Nav.Link as="button" eventKey={'Reports'}>
                        {SVGICON.Folder}
                        <span>Reports</span>
                    </Nav.Link>
                </Nav.Item>
                
               
                
            </Nav> 
             {/* <p>Sathish</p> */}
            <Tab.Content>
                <Tab.Pane eventKey={'Overview'}>
                    {
                        Loading ?
                         <Loader/>
                         :
                                             
                     < div className='m-3'>
                         <TimesheetTable setPending={setPending}  />
                        </div>   
                    }                                
                </Tab.Pane>
                <Tab.Pane eventKey={'Reports'}>
                     {Loading ?
                    <Loader/>:
              active == "Reports"  &&  <div className='m-3'>
              <TimesheetReport3/>
             </div>
                   
}
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

export default EmployeeTimesheet